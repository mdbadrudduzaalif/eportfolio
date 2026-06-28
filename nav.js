class NavBar extends HTMLElement {
  connectedCallback() {
    const activePage = this.getAttribute('active-page');
    this.innerHTML = `
<nav>
<a href="index.html" class="nav-home${activePage === 'home' ? ' active' : ''}" aria-label="Home">
<svg class="home-icon" viewBox="0 0 24 24" aria-hidden="true">
<path d="M3 10.5L12 3l9 7.5"></path>
<path d="M5 9.5V21h14V9.5"></path>
<path d="M10 21v-6h4v6"></path>
</svg>
</a>
<div class="nav-links">
<a href="projects.html"${activePage === 'projects' ? ' class="active"' : ''}>Projects</a>
<a href="about.html"${activePage === 'about' ? ' class="active"' : ''}>About</a>
<a href="education.html"${activePage === 'education' ? ' class="active"' : ''}>Education</a>
<a href="resume.html"${activePage === 'resume' ? ' class="active"' : ''}>Resume</a>
<a href="contact.html"${activePage === 'contact' ? ' class="active"' : ''}>Contact</a>
</div>
</nav>
`;
  }
}

customElements.define('nav-bar', NavBar);
