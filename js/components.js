"use strict";

/**
 * Custom element for the navigation bar.
 * Provides skip-to-content links, page navigation, and a light/dark theme toggle.
 */
class NavBar extends HTMLElement {
  _createSVGIcon() {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("class", "home-icon");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");

    const paths = ["M3 10.5L12 3l9 7.5", "M5 9.5V21h14V9.5", "M10 21v-6h4v6"];

    paths.forEach((d) => {
      const path = document.createElementNS(svgNS, "path");
      path.setAttribute("d", d);
      svg.appendChild(path);
    });

    return svg;
  }

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

    homeLink.appendChild(this._createSVGIcon());
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
      const path = new URL(window.location.href).pathname;
      const parsedPage = path.split("/").pop();
      if (parsedPage) {
        page = parsedPage;
      }
    } catch (e) {
      // Fallback for invalid URLs if any, though location.href is typically valid
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

    const themeToggleBtnRef = this.querySelector(".theme-toggle");
    if (themeToggleBtnRef) {
      themeToggleBtnRef.addEventListener("click", () => {
        document.body.classList.toggle("theme-light");
        if (document.body.classList.contains("theme-light")) {
          localStorage.setItem("theme", "light");
          themeToggleBtnRef.textContent = "🌙";
        } else {
          localStorage.removeItem("theme");
          themeToggleBtnRef.textContent = "☀️";
        }
      });

      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "light") {
        document.body.classList.add("theme-light");
        themeToggleBtnRef.textContent = "🌙";
      }
    }
  }
}

customElements.define("nav-bar", NavBar);

/**
 * Custom element for displaying images in a full-screen lightbox.
 * Accessible via keyboard and screen readers.
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
function handleLightboxEvent(e) {
  if (
    e.target.nodeType === 1 &&
    typeof e.target.matches === "function" &&
    e.target.matches("img[data-lightbox]")
  ) {
    if (
      e.type === "click" ||
      (e.type === "keydown" && (e.key === "Enter" || e.key === " "))
    ) {
      if (e.type === "keydown") {
        e.preventDefault(); // Prevent page scrolling for Space key
      }
      let lightbox = document.querySelector("image-lightbox");
      if (!lightbox) {
        lightbox = document.createElement("image-lightbox");
        document.body.appendChild(lightbox);
      }
      lightbox.open(e.target.src);
    }
  }
}

document.addEventListener("click", handleLightboxEvent);
document.addEventListener("keydown", handleLightboxEvent);

/**
 * Custom element for the site footer.
 * Displays copyright info and social media links.
 */
class SiteFooter extends HTMLElement {
  _createSocialLink(linkData) {
    const a = document.createElement("a");
    a.className =
      "footer-link" + (linkData.label === "GitHub" ? " github-link" : "");
    a.href = linkData.href;
    a.setAttribute("aria-label", linkData.label);
    a.title = linkData.label;
    a.target = "_blank";
    a.rel = "noopener noreferrer";

    const img = document.createElement("img");
    img.src = linkData.img;
    img.className = "footer-icon";
    img.alt = linkData.label;

    a.appendChild(img);
    return a;
  }

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

    socialLinks.forEach((linkData) => {
      footerLinks.appendChild(this._createSocialLink(linkData));
    });

    footer.appendChild(footerCopy);
    footer.appendChild(footerLinks);
    this.appendChild(footer);
  }
}
customElements.define("site-footer", SiteFooter);

/**
 * Custom element to display a base64 encoded email address.
 * Decodes the email and creates a mailto link safely.
 */
class SecureEmail extends HTMLElement {
  connectedCallback() {
    if (this.hasChildNodes()) this.replaceChildren();
    const encodedEmail = this.getAttribute("data-email");
    if (encodedEmail) {
      try {
        const email = atob(encodedEmail);
        const anchor = document.createElement("a");
        anchor.href = `mailto:${email}`;
        anchor.style.color = "var(--accent)";
        anchor.style.textDecoration = "none";
        anchor.textContent = email;
        this.appendChild(anchor);
      } catch (e) {
        console.error("Failed to decode email", e);
      }
    }
  }
}
customElements.define("secure-email", SecureEmail);
