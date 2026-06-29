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

    it('renders <site-footer> correctly', () => {
        const footer = document.createElement('site-footer');
        document.body.appendChild(footer);

        expect(footer.querySelector('footer')).not.toBeNull();
        expect(footer.querySelector('.footer-copy').textContent).toContain('© 2026 MD Badrudduza Alif');
    });
});
