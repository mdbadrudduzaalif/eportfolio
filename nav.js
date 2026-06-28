class NavBar extends HTMLElement {
  connectedCallback() {
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
        </div>
      </nav>
    `;

    const currentPath = window.location.pathname;
    const links = this.querySelectorAll('a');

    links.forEach(link => {
      if (link.getAttribute('href') && currentPath.endsWith(link.getAttribute('href'))) {
        link.classList.add('active');
      } else if (currentPath.endsWith('/') && link.getAttribute('href') === 'index.html') {
        link.classList.add('active');
      }
    });
  }
}

customElements.define('nav-bar', NavBar);
