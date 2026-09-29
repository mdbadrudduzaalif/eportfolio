"use strict";

/**
 * Custom Element representing the navigation bar.
 * Provides links to pages and toggles the light/dark theme.
 * Includes accessibility features like a skip link and ARIA attributes.
 */
class NavBar extends HTMLElement {
  connectedCallback() {
    if (this.hasChildNodes()) this.replaceChildren();
    const nav = document.createElement("nav");

    const skipLink = document.createElement("a");
    skipLink.href = "#main-content";
    skipLink.className = "skip-link";
    skipLink.textContent = "Skip to main content";
    nav.appendChild(skipLink);

    const homeLink = document.createElement("a");
    homeLink.href = "index.html";
    homeLink.className = "nav-home";
    homeLink.setAttribute("aria-label", "Home");

    const svg = this._createSVGIcon();
    homeLink.appendChild(svg);
    nav.appendChild(homeLink);

    const navLinks = document.createElement("div");
    navLinks.className = "nav-links";

    const linksData = [
      { href: "projects.html", text: "Projects" },
      { href: "about.html", text: "About" },
      { href: "education.html", text: "Education" },
      { href: "resume.html", text: "Resume" },
      { href: "contact.html", text: "Contact" },
    ];

    linksData.forEach((data) => {
      const a = document.createElement("a");
      a.href = data.href;
      a.textContent = data.text;
      navLinks.appendChild(a);
    });

    const themeToggleBtn = document.createElement("button");
    themeToggleBtn.className = "theme-toggle";
    themeToggleBtn.setAttribute("aria-label", "Toggle theme");
    themeToggleBtn.textContent = "☀️";
    navLinks.appendChild(themeToggleBtn);

    nav.appendChild(navLinks);
    this.appendChild(nav);

    let page = "index.html";
    try {
      const path = window.location.pathname;
      const parsedPage = path.split("/").pop();
      if (parsedPage) {
        page = parsedPage;
      }
    } catch (e) {
      // Fallback
    }

    const links = this.querySelectorAll("a");
    links.forEach((link) => {
      const href = link.getAttribute("href");
      if (href === page) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      } else {
        link.classList.remove("active");
        link.removeAttribute("aria-current");
      }
    });

    this._setupThemeToggle();
  }

  _createSVGIcon() {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("class", "home-icon");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");

    const path1 = document.createElementNS(svgNS, "path");
    path1.setAttribute("d", "M3 10.5L12 3l9 7.5");
    svg.appendChild(path1);

    const path2 = document.createElementNS(svgNS, "path");
    path2.setAttribute("d", "M5 9.5V21h14V9.5");
    svg.appendChild(path2);

    const path3 = document.createElementNS(svgNS, "path");
    path3.setAttribute("d", "M10 21v-6h4v6");
    svg.appendChild(path3);

    return svg;
  }

  _setupThemeToggle() {
    const themeToggleBtnRef = this.querySelector(".theme-toggle");
    if (!themeToggleBtnRef) return;

    const updateThemeColorMeta = (isLight) => {
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute("content", isLight ? "#f8fafc" : "#0f172a");
      }
    };

    themeToggleBtnRef.addEventListener("click", () => {
      document.body.classList.toggle("theme-light");
      const isLight = document.body.classList.contains("theme-light");

      if (isLight) {
        localStorage.setItem("theme", "light");
        themeToggleBtnRef.textContent = "🌙";
      } else {
        localStorage.removeItem("theme");
        themeToggleBtnRef.textContent = "☀️";
      }
      updateThemeColorMeta(isLight);
    });

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      document.body.classList.add("theme-light");
      themeToggleBtnRef.textContent = "🌙";
      updateThemeColorMeta(true);
    } else {
      updateThemeColorMeta(false);
    }
  }
}

customElements.define("nav-bar", NavBar);

/**
 * Custom Element representing an image lightbox.
 * Allows opening and closing images in an accessible dialog overlay.
 */
class ImageLightbox extends HTMLElement {
  connectedCallback() {
    if (this.hasChildNodes()) this.replaceChildren();

    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.style.display = "none";
    lightbox.setAttribute("aria-hidden", "true");
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "Image Lightbox");
    lightbox.setAttribute("aria-hidden", "true");

    const closeBtn = document.createElement("button");
    closeBtn.className = "lightbox-close";
    closeBtn.setAttribute("aria-label", "Close lightbox");
    closeBtn.textContent = "×";

    const img = document.createElement("img");
    img.className = "lightbox-img";
    img.alt = "Enlarged view";

    lightbox.appendChild(closeBtn);
    lightbox.appendChild(img);
    this.appendChild(lightbox);

    lightbox.addEventListener("click", (e) => {
      if (
        e.target === lightbox ||
        e.target.classList.contains("lightbox-close")
      ) {
        this.close();
      }
    });

    // Escape key listener
    this._handleKeyDown = (e) => {
      if (e.key === "Escape") {
        this.close();
      }
    };
  }

  open(src) {
    const lightbox = this.querySelector(".lightbox");
    const img = this.querySelector(".lightbox-img");
    const closeBtn = this.querySelector(".lightbox-close");

    if (lightbox && img) {
      this._previousFocus = document.activeElement;
      img.src = src;
      lightbox.style.display = "flex";
      lightbox.setAttribute("aria-hidden", "false");
      document.addEventListener("keydown", this._handleKeyDown);
      if (closeBtn) {
        closeBtn.focus();
      }
    }
  }

  close() {
    const lightbox = this.querySelector(".lightbox");
    if (lightbox) {
      lightbox.style.display = "none";
      lightbox.setAttribute("aria-hidden", "true");
      document.removeEventListener("keydown", this._handleKeyDown);
      if (this._previousFocus) {
        this._previousFocus.focus();
        this._previousFocus = null;
      }
    }
  }
}
customElements.define("image-lightbox", ImageLightbox);

// Global listener for images with data-lightbox attribute
const handleLightboxEvent = (e) => {
  if (
    e.target.nodeType === 1 &&
    typeof e.target.matches === "function" &&
    e.target.matches("img[data-lightbox]")
  ) {
    let lightbox = document.querySelector("image-lightbox");
    if (!lightbox) {
      lightbox = document.createElement("image-lightbox");
      document.body.appendChild(lightbox);
    }
    lightbox.open(e.target.src);
  }
};

document.addEventListener("click", handleLightboxEvent);
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    if (e.key === " ") {
      e.preventDefault(); // Prevent page scrolling
    }
    handleLightboxEvent(e);
  }
});

/**
 * Custom Element representing the site footer.
 * Displays copyright info and social media links.
 */
class SiteFooter extends HTMLElement {
  connectedCallback() {
    if (this.hasChildNodes()) this.replaceChildren();
    const currentYear = new Date().getFullYear();
    const footer = document.createElement("footer");

    const footerCopy = document.createElement("span");
    footerCopy.className = "footer-copy";
    footerCopy.textContent = `© ${currentYear} MD Badrudduza Alif. All rights reserved.`;

    const footerLinks = document.createElement("span");
    footerLinks.className = "footer-links";

    const socialLinks = [
      {
        href: "https://github.com/mdbadrudduzaalif",
        label: "GitHub",
        img: "assets/images/github.png",
      },
      {
        href: "https://www.linkedin.com/in/md-badrudduza-alif-7a495032a/",
        label: "LinkedIn",
        img: "assets/images/linkedin.png",
      },
      {
        href: "https://www.facebook.com/mdbadrudduza.alif",
        label: "Facebook",
        img: "assets/images/facebook.png",
      },
      {
        href: "https://wa.me/8801704448723",
        label: "WhatsApp",
        img: "assets/images/whatsapp.png",
      },
    ];

    socialLinks.forEach((link) => {
      const a = this._createSocialLink(link);
      footerLinks.appendChild(a);
    });

    footer.appendChild(footerCopy);
    footer.appendChild(footerLinks);
    this.appendChild(footer);
  }

  _createSocialLink(link) {
    const a = document.createElement("a");
    a.className =
      "footer-link" + (link.label === "GitHub" ? " github-link" : "");
    a.href = link.href;
    a.setAttribute("aria-label", link.label);
    a.title = link.label;
    a.target = "_blank";
    a.rel = "noopener noreferrer";

    const img = document.createElement("img");
    img.src = link.img;
    img.className = "footer-icon";
    img.alt = link.label;
    img.setAttribute("loading", "lazy");

    a.appendChild(img);
    return a;
  }
}
customElements.define("site-footer", SiteFooter);

/**
 * Custom Element representing a secure email link.
 * Decodes a base64 encoded email address and renders a mailto link.
 */
class SecureEmail extends HTMLElement {
  connectedCallback() {
    if (this.hasChildNodes()) this.replaceChildren();
    const encodedEmail = this.getAttribute("data-email");
    if (encodedEmail) {
      try {
        const email = atob(encodedEmail);
        const a = document.createElement("a");
        a.href = `mailto:${email}`;
        a.style.color = "var(--accent)";
        a.style.textDecoration = "none";
        a.textContent = email;
        this.appendChild(a);
      } catch (e) {
        console.error("Failed to decode email", e);
      }
    }
  }
}
customElements.define("secure-email", SecureEmail);
