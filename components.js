class NavBar extends HTMLElement {
  connectedCallback() {
    const active = this.getAttribute('active');
    this.innerHTML = `
<nav>
<a href="index.html" class="nav-home ${active === 'home' ? 'active' : ''}" aria-label="Home">
<svg class="home-icon" viewBox="0 0 24 24" aria-hidden="true">
<path d="M3 10.5L12 3l9 7.5"></path>
<path d="M5 9.5V21h14V9.5"></path>
<path d="M10 21v-6h4v6"></path>
</svg>
</a>

<div class="nav-links">
<a href="projects.html" ${active === 'projects' ? 'class="active"' : ''}>Projects</a>
<a href="about.html" ${active === 'about' ? 'class="active"' : ''}>About</a>
<a href="education.html" ${active === 'education' ? 'class="active"' : ''}>Education</a>
<a href="resume.html" ${active === 'resume' ? 'class="active"' : ''}>Resume</a>
<a href="contact.html" ${active === 'contact' ? 'class="active"' : ''}>Contact</a>
</div>
</nav>
    `;
  }
}

customElements.define('nav-bar', NavBar);
