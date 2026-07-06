# E-Portfolio

This repository contains the source code for a static HTML, CSS, and Vanilla JavaScript portfolio website.

## Tech Stack
* **HTML5**: Semantic markup
* **CSS3**: Styling with CSS variables for consistent theming. Includes Light/Dark theme toggling.
* **JavaScript**: Vanilla JS Web Components (`<nav-bar>`, `<site-footer>`, `<image-lightbox>`)
* **Jest**: Testing framework configured for DOM manipulation testing with JSDOM

## Folder Structure
* `assets/images/`: Contains all image resources.
* `css/`: Contains the centralized `style.css` stylesheet.
* `js/`: Contains `components.js` for reusable Web Components.

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
