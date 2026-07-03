# E-Portfolio

This repository contains the source code for a static HTML, CSS, and Vanilla JavaScript portfolio website.

## Tech Stack
* **HTML5**: Semantic markup
* **CSS3**: Styling with CSS variables for consistent theming
* **JavaScript**: Vanilla JS Web Components (`<nav-bar>`, `<site-footer>`, `<image-lightbox>`)
* **Jest**: Testing framework configured for DOM manipulation testing with JSDOM

## Project Structure
* `index.html`, `about.html`, `contact.html`, `education.html`, `projects.html`, `resume.html`: Standardized HTML pages.
* `style.css`: Contains CSS variables and global styling for the application. Includes variables like `--bg-color`, `--text-color`, `--nav-bg`, etc., for easy theming.
* `components.js`: Houses the Vanilla JavaScript implementation for the web components.
* `tests/components.test.js`: Contains Jest tests for the custom elements.

## Web Components
The portfolio leverages native Web Components for reusability:
* `<nav-bar>`: Renders the site navigation and dynamically determines the active link based on the current URL path.
* `<site-footer>`: Renders a consistent footer displaying copyright info and social links.
* `<image-lightbox>`: A global, accessible lightbox component for displaying images in an overlay when any image with the `data-lightbox` attribute is clicked. It properly manages focus and `aria-hidden` states for accessibility.

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
