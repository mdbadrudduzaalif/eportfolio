require('../components.js');

describe('Web Components', () => {

    beforeEach(() => {
        document.body.innerHTML = '';
    });

    it('renders <nav-bar> correctly and sets active link', () => {
        const nav = document.createElement('nav-bar');
        document.body.appendChild(nav);

        // Check it has rendered inner HTML
        expect(nav.querySelector('nav')).not.toBeNull();

        // Check active link logic
        const activeLink = nav.querySelector('a.active');
        expect(activeLink).not.toBeNull();
        expect(activeLink.textContent.trim()).toBe('Projects');
        expect(activeLink.getAttribute('aria-current')).toBe('page');
    });

    it('nav-bar falls back to index.html when path is empty or root', () => {
        // Change jsdom url to root
        delete window.location;
        window.location = new URL('http://localhost/');

        const nav = document.createElement('nav-bar');
        document.body.appendChild(nav);

        const activeLink = nav.querySelector('a.active');
        expect(activeLink).not.toBeNull();
        // Since it's an icon, we check the class or aria-label instead of text
        expect(activeLink.classList.contains('nav-home')).toBe(true);
    });

    it('nav-bar correctly identifies active link when query parameters or hashes are present', () => {
        // Mock a URL with a query parameter and hash
        delete window.location;
        window.location = new URL('http://localhost/projects.html?sort=desc#main');

        const nav = document.createElement('nav-bar');
        document.body.appendChild(nav);

        const activeLink = nav.querySelector('a.active');
        expect(activeLink).not.toBeNull();
        expect(activeLink.textContent.trim()).toBe('Projects');
        expect(activeLink.getAttribute('aria-current')).toBe('page');
    });

    it('renders <site-footer> correctly', () => {
        const footer = document.createElement('site-footer');
        document.body.appendChild(footer);
        const currentYear = new Date().getFullYear();

        expect(footer.querySelector('footer')).not.toBeNull();
        expect(footer.querySelector('.footer-copy').textContent).toContain(`© ${currentYear} MD Badrudduza Alif`);
    });

    it('renders <image-lightbox> correctly and can open/close', () => {
        const lightboxComp = document.createElement('image-lightbox');
        document.body.appendChild(lightboxComp);

        const lightboxDiv = lightboxComp.querySelector('.lightbox');
        const img = lightboxComp.querySelector('.lightbox-img');
        const closeBtn = lightboxComp.querySelector('.lightbox-close');

        expect(lightboxDiv).not.toBeNull();
        expect(img).not.toBeNull();
        expect(closeBtn).not.toBeNull();
        expect(lightboxDiv.style.display).toBe('none');
        expect(lightboxDiv.getAttribute('aria-hidden')).toBe('true');

        // Test open
        const testSrc = 'http://localhost/test-image.jpg';
        lightboxComp.open(testSrc);

        expect(lightboxDiv.style.display).toBe('flex');
        expect(img.src).toBe(testSrc);
        expect(lightboxDiv.getAttribute('aria-hidden')).toBe('false');

        // Test close with close button
        closeBtn.click();
        expect(lightboxDiv.style.display).toBe('none');
        expect(lightboxDiv.getAttribute('aria-hidden')).toBe('true');

        // Test close with escape key
        lightboxComp.open(testSrc);
        expect(lightboxDiv.style.display).toBe('flex');
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        expect(lightboxDiv.style.display).toBe('none');
    });
});
