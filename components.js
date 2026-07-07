'use strict';

class NavBar extends HTMLElement {
    connectedCallback() {
        if (this.hasChildNodes()) this.replaceChildren();
        const nav = document.createElement('nav');

        const homeLink = document.createElement('a');
        homeLink.href = 'index.html';
        homeLink.className = 'nav-home';
        homeLink.setAttribute('aria-label', 'Home');

        const svgNS = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS(svgNS, 'svg');
        svg.setAttribute('class', 'home-icon');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('aria-hidden', 'true');

        const path1 = document.createElementNS(svgNS, 'path');
        path1.setAttribute('d', 'M3 10.5L12 3l9 7.5');
        svg.appendChild(path1);

        const path2 = document.createElementNS(svgNS, 'path');
        path2.setAttribute('d', 'M5 9.5V21h14V9.5');
        svg.appendChild(path2);

        const path3 = document.createElementNS(svgNS, 'path');
        path3.setAttribute('d', 'M10 21v-6h4v6');
        svg.appendChild(path3);

        homeLink.appendChild(svg);
        nav.appendChild(homeLink);

        const navLinks = document.createElement('div');
        navLinks.className = 'nav-links';

        const linksData = [
            { href: 'projects.html', text: 'Projects' },
            { href: 'about.html', text: 'About' },
            { href: 'education.html', text: 'Education' },
            { href: 'resume.html', text: 'Resume' },
            { href: 'contact.html', text: 'Contact' }
        ];

        linksData.forEach(data => {
            const a = document.createElement('a');
            a.href = data.href;
            a.textContent = data.text;
            navLinks.appendChild(a);
        });

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

        const links = this.querySelectorAll('a');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href === page) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            }
        });
    }
}
customElements.define('nav-bar', NavBar);

class ImageLightbox extends HTMLElement {
    connectedCallback() {
        if (this.hasChildNodes()) this.replaceChildren();

        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.style.display = 'none';
        lightbox.setAttribute('aria-hidden', 'true');
        lightbox.setAttribute('role', 'dialog');
        lightbox.setAttribute('aria-modal', 'true');
        lightbox.setAttribute('aria-label', 'Image Lightbox');

        const closeBtn = document.createElement('button');
        closeBtn.className = 'lightbox-close';
        closeBtn.setAttribute('aria-label', 'Close lightbox');
        closeBtn.textContent = '×';

        const img = document.createElement('img');
        img.className = 'lightbox-img';
        img.alt = 'Enlarged view';

        lightbox.appendChild(closeBtn);
        lightbox.appendChild(img);
        this.appendChild(lightbox);

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
                this.close();
            }
        });

        // Escape key listener
        this._handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                this.close();
            }
        };
    }

    open(src) {
        const lightbox = this.querySelector('.lightbox');
        const img = this.querySelector('.lightbox-img');
        const closeBtn = this.querySelector('.lightbox-close');

        if (lightbox && img) {
            this._previousFocus = document.activeElement;
            img.src = src;
            lightbox.style.display = 'flex';
            lightbox.setAttribute('aria-hidden', 'false');
            document.addEventListener('keydown', this._handleKeyDown);
            if (closeBtn) {
                closeBtn.focus();
            }
        }
    }

    close() {
        const lightbox = this.querySelector('.lightbox');
        if (lightbox) {
            lightbox.style.display = 'none';
            lightbox.setAttribute('aria-hidden', 'true');
            document.removeEventListener('keydown', this._handleKeyDown);
            if (this._previousFocus) {
                this._previousFocus.focus();
                this._previousFocus = null;
            }
        }
    }
}
customElements.define('image-lightbox', ImageLightbox);

// Global listener for images with data-lightbox attribute
document.addEventListener('click', (e) => {
    if (e.target.matches('img[data-lightbox]')) {
        let lightbox = document.querySelector('image-lightbox');
        if (!lightbox) {
            lightbox = document.createElement('image-lightbox');
            document.body.appendChild(lightbox);
        }
        lightbox.open(e.target.src);
    }
});

class SiteFooter extends HTMLElement {
    connectedCallback() {
        if (this.hasChildNodes()) this.replaceChildren();
        const currentYear = new Date().getFullYear();
        const footer = document.createElement('footer');

        const footerCopy = document.createElement('span');
        footerCopy.className = 'footer-copy';
        footerCopy.textContent = `© ${currentYear} MD Badrudduza Alif. All rights reserved.`;

        const footerLinks = document.createElement('span');
        footerLinks.className = 'footer-links';

        const socialLinks = [
            { href: 'https://github.com/mdbadrudduzaalif', label: 'GitHub', img: 'github.png' },
            { href: 'https://www.linkedin.com/in/md-badrudduza-alif-7a495032a/', label: 'LinkedIn', img: 'linkedin.png' },
            { href: 'https://www.facebook.com/mdbadrudduza.alif', label: 'Facebook', img: 'facebook.png' },
            { href: 'https://wa.me/8801704448723', label: 'WhatsApp', img: 'whatsapp.png' }
        ];

        socialLinks.forEach(link => {
            const a = document.createElement('a');
            a.className = 'footer-link' + (link.label === 'GitHub' ? ' github-link' : '');
            a.href = link.href;
            a.setAttribute('aria-label', link.label);
            a.title = link.label;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';

            const img = document.createElement('img');
            img.src = link.img;
            img.className = 'footer-icon';
            img.alt = link.label;

            a.appendChild(img);
            footerLinks.appendChild(a);
        });

        footer.appendChild(footerCopy);
        footer.appendChild(footerLinks);
        this.appendChild(footer);
    }
}
customElements.define('site-footer', SiteFooter);

class SecureEmail extends HTMLElement {
    connectedCallback() {
        const encodedEmail = this.getAttribute('data-email');
        if (encodedEmail) {
            try {
                const email = atob(encodedEmail);
                this.innerHTML = `<a href="mailto:${email}" style="color: var(--accent); text-decoration: none;">${email}</a>`;
            } catch (e) {
                console.error('Failed to decode email', e);
            }
        }
    }
}
customElements.define('secure-email', SecureEmail);
