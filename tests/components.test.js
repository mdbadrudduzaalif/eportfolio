<<<<<<< HEAD
require("../components.js");
=======
require("../js/components.js");
>>>>>>> origin/main

describe("Web Components", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("renders <nav-bar> correctly and sets active link", () => {
    const nav = document.createElement("nav-bar");
    document.body.appendChild(nav);

    // Check it has rendered inner HTML
    expect(nav.querySelector("nav")).not.toBeNull();

    // Check active link logic
    const activeLink = nav.querySelector("a.active");
    expect(activeLink).not.toBeNull();
    expect(activeLink.textContent.trim()).toBe("Projects");
    expect(activeLink.getAttribute("aria-current")).toBe("page");
  });

  it("nav-bar sets no active link when path does not match any href", () => {
    delete window.location;
    window.location = new URL("http://localhost/unknown.html");

    const nav = document.createElement("nav-bar");
    document.body.appendChild(nav);

    const activeLink = nav.querySelector("a.active");
    expect(activeLink).toBeNull();

    const ariaCurrent = nav.querySelector('a[aria-current="page"]');
    expect(ariaCurrent).toBeNull();
  });

  it("nav-bar falls back to index.html when path is empty or root", () => {
    // Change jsdom url to root
    delete window.location;
    window.location = new URL("http://localhost/");

    const nav = document.createElement("nav-bar");
    document.body.appendChild(nav);

    const activeLink = nav.querySelector("a.active");
    expect(activeLink).not.toBeNull();
    // Since it's an icon, we check the class or aria-label instead of text
    expect(activeLink.classList.contains("nav-home")).toBe(true);
  });

<<<<<<< HEAD
  it("nav-bar correctly identities theme toggler button and updates localStorage and body class", () => {
    const nav = document.createElement("nav-bar");
    document.body.appendChild(nav);

    const themeToggleBtn = nav.querySelector(".theme-toggle");
    expect(themeToggleBtn).not.toBeNull();
    expect(themeToggleBtn.textContent).toBe("☀️");
    expect(document.body.classList.contains("theme-light")).toBe(false);

    // Click to enable light theme
    themeToggleBtn.click();
    expect(document.body.classList.contains("theme-light")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("light");
    expect(themeToggleBtn.textContent).toBe("🌙");

    // Click to disable light theme
    themeToggleBtn.click();
    expect(document.body.classList.contains("theme-light")).toBe(false);
    expect(localStorage.getItem("theme")).toBeNull();
    expect(themeToggleBtn.textContent).toBe("☀️");
  });

  it("nav-bar correctly identifies active link when query parameters or hashes are present", () => {
    // Mock a URL with a query parameter and hash
    delete window.location;
    window.location = new URL("http://localhost/projects.html?sort=desc#main");

    const nav = document.createElement("nav-bar");
    document.body.appendChild(nav);

    const activeLink = nav.querySelector("a.active");
    expect(activeLink).not.toBeNull();
    expect(activeLink.textContent.trim()).toBe("Projects");
    expect(activeLink.getAttribute("aria-current")).toBe("page");
  });

  it("renders <site-footer> correctly", () => {
    const footer = document.createElement("site-footer");
    document.body.appendChild(footer);
    const currentYear = new Date().getFullYear();

    expect(footer.querySelector("footer")).not.toBeNull();
    expect(footer.querySelector(".footer-copy").textContent).toContain(
      `© ${currentYear} MD Badrudduza Alif`,
    );
  });

  it("renders <image-lightbox> correctly and can open/close", () => {
    const lightboxComp = document.createElement("image-lightbox");
    document.body.appendChild(lightboxComp);

    const lightboxDiv = lightboxComp.querySelector(".lightbox");
    const img = lightboxComp.querySelector(".lightbox-img");
    const closeBtn = lightboxComp.querySelector(".lightbox-close");

    expect(lightboxDiv).not.toBeNull();
    expect(img).not.toBeNull();
    expect(closeBtn).not.toBeNull();
    expect(lightboxDiv.style.display).toBe("none");
    expect(lightboxDiv.getAttribute("aria-hidden")).toBe("true");

    // Test open
    const testSrc = "http://localhost/test-image.jpg";

    // Add a dummy focused element to test focus restoration
    const dummyBtn = document.createElement("button");
    document.body.appendChild(dummyBtn);
    dummyBtn.focus();

    lightboxComp.open(testSrc);

    expect(lightboxDiv.style.display).toBe("flex");
    expect(img.src).toBe(testSrc);
    expect(lightboxDiv.getAttribute("aria-hidden")).toBe("false");

    // Test ARIA attributes
    expect(lightboxDiv.getAttribute("role")).toBe("dialog");
    expect(lightboxDiv.getAttribute("aria-modal")).toBe("true");
    expect(lightboxDiv.getAttribute("aria-label")).toBe("Image Lightbox");

    // Check if close button is focused
    expect(document.activeElement).toBe(closeBtn);

    // Test close with close button
    closeBtn.click();
    expect(lightboxDiv.style.display).toBe("none");
    expect(lightboxDiv.getAttribute("aria-hidden")).toBe("true");

    // Check if previous focus is restored
    expect(document.activeElement).toBe(dummyBtn);

    // Test close with escape key
    lightboxComp.open(testSrc);
    expect(lightboxDiv.style.display).toBe("flex");
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    expect(lightboxDiv.style.display).toBe("none");
  });

=======
  it("nav-bar correctly identifies active link when query parameters or hashes are present", () => {
    // Mock a URL with a query parameter and hash
    delete window.location;
    window.location = new URL("http://localhost/projects.html?sort=desc#main");

    const nav = document.createElement("nav-bar");
    document.body.appendChild(nav);

    const activeLink = nav.querySelector("a.active");
    expect(activeLink).not.toBeNull();
    expect(activeLink.textContent.trim()).toBe("Projects");
    expect(activeLink.getAttribute("aria-current")).toBe("page");
  });

  it("renders <site-footer> correctly", () => {
    const footer = document.createElement("site-footer");
    document.body.appendChild(footer);
    const currentYear = new Date().getFullYear();

    expect(footer.querySelector("footer")).not.toBeNull();
    expect(footer.querySelector(".footer-copy").textContent).toContain(
      `© ${currentYear} MD Badrudduza Alif`,
    );
  });

  it("renders <image-lightbox> correctly and can open/close", () => {
    const lightboxComp = document.createElement("image-lightbox");
    document.body.appendChild(lightboxComp);

    const lightboxDiv = lightboxComp.querySelector(".lightbox");
    const img = lightboxComp.querySelector(".lightbox-img");
    const closeBtn = lightboxComp.querySelector(".lightbox-close");

    expect(lightboxDiv).not.toBeNull();
    expect(img).not.toBeNull();
    expect(closeBtn).not.toBeNull();
    expect(lightboxDiv.style.display).toBe("none");
    expect(lightboxDiv.getAttribute("aria-hidden")).toBe("true");

    // Test open
    const testSrc = "http://localhost/test-image.jpg";

    // Add a dummy focused element to test focus restoration
    const dummyBtn = document.createElement("button");
    document.body.appendChild(dummyBtn);
    dummyBtn.focus();

    lightboxComp.open(testSrc);

    expect(lightboxDiv.style.display).toBe("flex");
    expect(img.src).toBe(testSrc);
    expect(lightboxDiv.getAttribute("aria-hidden")).toBe("false");

    // Test ARIA attributes
    expect(lightboxDiv.getAttribute("role")).toBe("dialog");
    expect(lightboxDiv.getAttribute("aria-modal")).toBe("true");
    expect(lightboxDiv.getAttribute("aria-label")).toBe("Image Lightbox");

    // Check if close button is focused
    expect(document.activeElement).toBe(closeBtn);

    // Test close with close button
    closeBtn.click();
    expect(lightboxDiv.style.display).toBe("none");
    expect(lightboxDiv.getAttribute("aria-hidden")).toBe("true");

    // Check if previous focus is restored
    expect(document.activeElement).toBe(dummyBtn);

    // Test close with escape key
    lightboxComp.open(testSrc);
    expect(lightboxDiv.style.display).toBe("flex");
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    expect(lightboxDiv.style.display).toBe("none");
  });

>>>>>>> origin/main
  it("does not throw when close() is called and lightbox element is missing", () => {
    const lightboxComp = document.createElement("image-lightbox");
    document.body.appendChild(lightboxComp);
    lightboxComp.innerHTML = ""; // Simulate missing lightbox element
    expect(() => {
      lightboxComp.close();
    }).not.toThrow();
  });
});
