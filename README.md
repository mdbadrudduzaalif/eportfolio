# E-Portfolio

This repository contains the source code for a static HTML, CSS, and Vanilla JavaScript portfolio website.

## Tech Stack
* **HTML5**: Semantic markup with `<meta name="theme-color">`
* **CSS3**: Styling with CSS variables for consistent theming, utility classes, and smooth scrolling
* **JavaScript**: Vanilla JS Web Components (`<nav-bar>`, `<site-footer>`, `<image-lightbox>`) with enhanced accessibility and routing fallback logic
* **Jest**: Testing framework configured for DOM manipulation testing with JSDOM

## Local Development
To serve the website locally for development and testing, you can use a simple HTTP server. If you have Python installed, you can run:

```bash
python3 -m http.server
```
Then open `http://localhost:8000` in your web browser.

## Testing
Tests are configured using Jest (v30) and JSDOM (v22).
To execute tests, run:
```bash
npm test
```
