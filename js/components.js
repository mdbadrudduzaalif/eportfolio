class NavBar extends HTMLElement {
  connectedCallback() {
    if (this.hasChildNodes()) this.replaceChildren();

    const skipLink = document.createElement("a");
    skipLink.href = "#main-content";
    skipLink.className = "skip-link";
    skipLink.textContent = "Skip to main content";
    this.appendChild(skipLink);

    const nav = document.createElement("nav");

    const homeLink = document.createElement("a");
    homeLink.href = "index.html";
    homeLink.className = "nav-home";
    homeLink.setAttribute("aria-label", "Home");

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

    const toggleBtn = document.createElement("button");
    toggleBtn.className = "theme-toggle";
    toggleBtn.setAttribute("aria-label", "Toggle theme");
    toggleBtn.textContent = "☀️";
    navLinks.appendChild(toggleBtn);

    nav.appendChild(navLinks);
    this.appendChild(nav);

    const path = window.location.pathname;
    let page = path.split("/").pop();
    if (!page) {
      page = "index.html";
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

    const themeToggleBtn = this.querySelector(".theme-toggle");
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("theme-light");
        if (document.body.classList.contains("theme-light")) {
          localStorage.setItem("theme", "light");
          themeToggleBtn.textContent = "🌙";
        } else {
          localStorage.removeItem("theme");
          themeToggleBtn.textContent = "☀️";
        }
      });

      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "light") {
        document.body.classList.add("theme-light");
        themeToggleBtn.textContent = "🌙";
      }
    }
  }
}
customElements.define("nav-bar", NavBar);

class ImageLightbox extends HTMLElement {
  connectedCallback() {
    if (this.hasChildNodes()) this.replaceChildren();

    const div = document.createElement('div');
    div.className = 'lightbox';
    div.style.display = 'none';
    div.setAttribute('aria-hidden', 'true');
    div.setAttribute('role', 'dialog');
    div.setAttribute('aria-modal', 'true');
    div.setAttribute('aria-label', 'Image Lightbox');

    const button = document.createElement('button');
    button.className = 'lightbox-close';
    button.setAttribute('aria-label', 'Close lightbox');
    button.innerHTML = '&times;';

    const imgEl = document.createElement('img');
    imgEl.className = 'lightbox-img';
    imgEl.alt = 'Enlarged view';

    const p = document.createElement('p');
    p.className = 'lightbox-error';
    p.style.display = 'none';
    p.style.color = 'white';
    p.textContent = 'Image failed to load';

    div.appendChild(button);
    div.appendChild(imgEl);
    div.appendChild(p);

    this.appendChild(div);

    const lightbox = this.querySelector(".lightbox");
    const img = this.querySelector(".lightbox-img");
    const errorText = this.querySelector(".lightbox-error");

    if (img && errorText) {
      img.addEventListener("error", () => {
        img.style.display = "none";
        errorText.style.display = "block";
      });
    }

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
    const errorText = this.querySelector(".lightbox-error");
    const closeBtn = this.querySelector(".lightbox-close");
    if (lightbox && img) {
      this._previouslyFocusedElement = document.activeElement;
      img.src = src;
      img.style.display = "block";
      if (errorText) errorText.style.display = "none";
      lightbox.style.display = "flex";
      lightbox.setAttribute("aria-hidden", "false");
      if (closeBtn) closeBtn.focus();
      document.addEventListener("keydown", this._handleKeyDown);
    }
  }

  close() {
    const lightbox = this.querySelector(".lightbox");
    if (lightbox) {
      lightbox.style.display = "none";
      lightbox.setAttribute("aria-hidden", "true");
      if (this._previouslyFocusedElement) {
        this._previouslyFocusedElement.focus();
        this._previouslyFocusedElement = null;
      }
      document.removeEventListener("keydown", this._handleKeyDown);
    }
  }
}
customElements.define("image-lightbox", ImageLightbox);

// Global listener for images with data-lightbox attribute
document.addEventListener("click", (e) => {
  if (e.target.matches("img[data-lightbox]")) {
    let lightbox = document.querySelector("image-lightbox");
    if (!lightbox) {
      lightbox = document.createElement("image-lightbox");
      document.body.appendChild(lightbox);
    }
    lightbox.open(e.target.src);
  }
});

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
      { href: "https://github.com/mdbadrudduzaalif", label: "GitHub", img: "assets/images/github.png", className: "footer-link github-link" },
      { href: "https://www.linkedin.com/in/md-badrudduza-alif-7a495032a/", label: "LinkedIn", img: "assets/images/linkedin.png", className: "footer-link" },
      { href: "https://www.facebook.com/mdbadrudduza.alif", label: "Facebook", img: "assets/images/facebook.png", className: "footer-link" },
      { href: "https://wa.me/8801704448723", label: "WhatsApp", img: "assets/images/whatsapp.png", className: "footer-link" }
    ];

    socialLinks.forEach(link => {
      const a = document.createElement("a");
      a.className = link.className;
      a.href = link.href;
      a.setAttribute("aria-label", link.label);
      a.title = link.label;
      a.target = "_blank";
      a.rel = "noopener noreferrer";

      const img = document.createElement("img");
      img.src = link.img;
      img.className = "footer-icon";
      img.alt = link.label;

      a.appendChild(img);
      footerLinks.appendChild(a);
    });

    footer.appendChild(footerCopy);
    footer.appendChild(footerLinks);
    this.appendChild(footer);
  }
}
customElements.define("site-footer", SiteFooter);

class SecureEmail extends HTMLElement {
  connectedCallback() {
    if (this.hasChildNodes()) this.replaceChildren();

    const encodedEmail = this.getAttribute('data-email');
    if (encodedEmail) {
      try {
        const decodedEmail = atob(encodedEmail);
        const link = document.createElement('a');
        link.href = `mailto:${decodedEmail}`;
        link.textContent = decodedEmail;
        this.appendChild(link);
      } catch (e) {
        console.error("Failed to decode email", e);
      }
    }
  }
}
customElements.define("secure-email", SecureEmail);
