class NavBar extends HTMLElement {
  connectedCallback() {
    if (this.hasChildNodes()) this.replaceChildren();
    this.innerHTML = `
<nav>
<a href="index.html" class="nav-home" aria-label="Home">
<svg class="home-icon" viewBox="0 0 24 24" aria-hidden="true">
<path d="M3 10.5L12 3l9 7.5"></path>
<path d="M5 9.5V21h14V9.5"></path>
<path d="M10 21v-6h4v6"></path>
</svg>
</a>
<div class="nav-links">
<a href="projects.html">Projects</a>
<a href="about.html">About</a>
<a href="education.html">Education</a>
<a href="resume.html">Resume</a>
<a href="contact.html">Contact</a>
        <button class="theme-toggle" aria-label="Toggle theme">☀️</button>
</div>
</nav>
        `;

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
    this.innerHTML = `
<div class="lightbox" style="display: none;" aria-hidden="true" role="dialog" aria-modal="true" aria-label="Image Lightbox">
<button class="lightbox-close" aria-label="Close lightbox">&times;</button>
<img class="lightbox-img" alt="Enlarged view">
<p class="lightbox-error" style="display:none; color:white;">Image failed to load</p>
</div>
        `;
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
      this.previousFocus = document.activeElement;
      img.src = src;
      img.style.display = "block";
      if (errorText) errorText.style.display = "none";
      lightbox.style.display = "flex";
      lightbox.setAttribute("aria-hidden", "false");
      document.addEventListener("keydown", this._handleKeyDown);
      if (closeBtn) closeBtn.focus();
    }
  }

  close() {
    const lightbox = this.querySelector(".lightbox");
    if (lightbox) {
      lightbox.style.display = "none";
      lightbox.setAttribute("aria-hidden", "true");
      document.removeEventListener("keydown", this._handleKeyDown);
      if (this.previousFocus) this.previousFocus.focus();
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
    this.innerHTML = `
<footer>
<span class="footer-copy">© ${currentYear} MD Badrudduza Alif. All rights reserved.</span>
<span class="footer-links">
<a class="footer-link github-link" href="https://github.com/mdbadrudduzaalif" aria-label="GitHub" title="GitHub" target="_blank" rel="noopener noreferrer">
<img src="assets/images/github.png" class="footer-icon" alt="GitHub">
</a>
<a class="footer-link" href="https://www.linkedin.com/in/md-badrudduza-alif-7a495032a/" aria-label="LinkedIn" title="LinkedIn" target="_blank" rel="noopener noreferrer">
<img src="assets/images/linkedin.png" class="footer-icon" alt="LinkedIn">
</a>
<a class="footer-link" href="https://www.facebook.com/mdbadrudduza.alif" aria-label="Facebook" title="Facebook" target="_blank" rel="noopener noreferrer">
<img src="assets/images/facebook.png" class="footer-icon" alt="Facebook">
</a>
<a class="footer-link" href="https://wa.me/8801704448723" aria-label="WhatsApp" title="WhatsApp" target="_blank" rel="noopener noreferrer">
<img src="assets/images/whatsapp.png" class="footer-icon" alt="WhatsApp">
</a>
</span>
</footer>
        `;
  }
}
customElements.define("site-footer", SiteFooter);

class SecureEmail extends HTMLElement {
  connectedCallback() {
    const encodedEmail = this.getAttribute("data-email");
    if (encodedEmail) {
      try {
        const email = atob(encodedEmail);
        // Avoid innerHTML by using native DOM elements to prevent XSS
        if (this.hasChildNodes()) this.replaceChildren();
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
