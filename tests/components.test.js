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

    it('renders <site-footer> correctly', () => {
        const footer = document.createElement('site-footer');
        document.body.appendChild(footer);

        expect(footer.querySelector('footer')).not.toBeNull();
        expect(footer.querySelector('.footer-copy').textContent).toContain('© 2026 MD Badrudduza Alif');
    });

    it('renders <image-lightbox> correctly and can open/close', () => {
        const lightboxComp = document.createElement('image-lightbox');
        document.body.appendChild(lightboxComp);

        const lightboxDiv = lightboxComp.querySelector('.lightbox');
        const img = lightboxComp.querySelector('.lightbox-img');

        expect(lightboxDiv).not.toBeNull();
        expect(img).not.toBeNull();
        expect(lightboxDiv.style.display).toBe('none');

        // Test open
        const testSrc = 'http://localhost/test-image.jpg';
        lightboxComp.open(testSrc);

        expect(lightboxDiv.style.display).toBe('flex');
        expect(img.src).toBe(testSrc);

        // Test close
        lightboxComp.close();
        expect(lightboxDiv.style.display).toBe('none');
    });
});
