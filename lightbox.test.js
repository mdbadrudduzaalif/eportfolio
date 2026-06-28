const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('Lightbox functionality', () => {
    let dom;
    let window;
    let document;

    beforeEach(() => {
        const html = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf8');
        dom = new JSDOM(html, { runScripts: "dangerously" });
        window = dom.window;
        document = window.document;
    });

    test('closeLightbox sets display to none', () => {
        const lightbox = document.getElementById('lightbox');
        // Initial state
        lightbox.style.display = 'flex';

        window.closeLightbox();

        expect(lightbox.style.display).toBe('none');
    });

    test('openLightbox sets display to flex and sets image src', () => {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');

        const mockImg = document.createElement('img');
        mockImg.src = 'test.jpg';

        window.openLightbox(mockImg);

        expect(lightbox.style.display).toBe('flex');
        expect(lightboxImg.src).toContain('test.jpg');
    });
});
