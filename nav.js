class NavBar extends HTMLElement {
    connectedCallback() {
        const page = window.location.pathname.split("/").pop() || "index.html";

        this.innerHTML = `
<nav>
<a href="index.html" class="nav-home ${page === 'index.html' ? 'active' : ''}" aria-label="Home">
<svg class="home-icon" viewBox="0 0 24 24" aria-hidden="true">
<path d="M3 10.5L12 3l9 7.5"></path>
<path d="M5 9.5V21h14V9.5"></path>
<path d="M10 21v-6h4v6"></path>
</svg>
</a>
<div class="nav-links">
<a href="projects.html" class="${page === 'projects.html' ? 'active' : ''}">Projects</a>
<a href="about.html" class="${page === 'about.html' ? 'active' : ''}">About</a>
<a href="education.html" class="${page === 'education.html' ? 'active' : ''}">Education</a>
<a href="resume.html" class="${page === 'resume.html' ? 'active' : ''}">Resume</a>
<a href="contact.html" class="${page === 'contact.html' ? 'active' : ''}">Contact</a>
</div>
</nav>
        `;
    }
}

customElements.define('nav-bar', NavBar);
