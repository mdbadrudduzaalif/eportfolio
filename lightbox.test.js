const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

describe('Lightbox functionality', () => {
  let dom;
  let document;
  let window;

  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: 'dangerously' });
    document = dom.window.document;
    window = dom.window;
  });

  test('openLightbox changes display to flex and updates img src', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    // Simulate an image element being passed to the function
    const mockImg = document.createElement('img');
    mockImg.src = 'test-image.jpg';

    // Call the function
    window.openLightbox(mockImg);

    // Verify changes
    expect(lightbox.style.display).toBe('flex');
    // JSDOM might resolve the src to a full URL based on about:blank or similar,
    // so we check if it includes the filename.
    expect(lightboxImg.src).toContain('test-image.jpg');
  });

  test('closeLightbox changes display to none', () => {
    const lightbox = document.getElementById('lightbox');

    // Set initial state to flex as if it were open
    lightbox.style.display = 'flex';

    // Call the function
    window.closeLightbox();

    // Verify changes
    expect(lightbox.style.display).toBe('none');
  });
});
