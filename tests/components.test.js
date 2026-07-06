require("../js/components.js");

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

  it("renders <site-footer> correctly", () => {
    const footer = document.createElement("site-footer");
    document.body.appendChild(footer);
    const currentYear = new Date().getFullYear();

    expect(footer.querySelector("footer")).not.toBeNull();
    expect(footer.querySelector(".footer-copy").textContent).toContain(
      `© ${currentYear} MD Badrudduza Alif`,
    );
  });

  it("toggles the theme and saves preference on button click", () => {
    // Clear localStorage to start fresh
    localStorage.clear();
    // Start with empty classList
    document.body.className = "";

    const nav = document.createElement("nav-bar");
    document.body.appendChild(nav);

    const toggleBtn = nav.querySelector(".theme-toggle");
    expect(toggleBtn).not.toBeNull();

    // Default state: no theme-light
    expect(document.body.classList.contains("theme-light")).toBe(false);
    expect(localStorage.getItem("theme")).toBeNull();

    // Click: activate theme-light
    toggleBtn.click();
    expect(document.body.classList.contains("theme-light")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("light");

    // Click again: remove theme-light
    toggleBtn.click();
    expect(document.body.classList.contains("theme-light")).toBe(false);
    expect(localStorage.getItem("theme")).toBeNull();
  });

  it("loads the saved theme from localStorage on component load", () => {
    localStorage.setItem("theme", "light");
    document.body.className = "";

    const nav = document.createElement("nav-bar");
    document.body.appendChild(nav);

    expect(document.body.classList.contains("theme-light")).toBe(true);
    const toggleBtn = nav.querySelector(".theme-toggle");
    expect(toggleBtn.textContent).toBe("🌙");
  });

  it("shows error text when lightbox image fails to load", () => {
    const lightboxComp = document.createElement("image-lightbox");
    document.body.appendChild(lightboxComp);

    const img = lightboxComp.querySelector(".lightbox-img");
    const errorText = lightboxComp.querySelector(".lightbox-error");

    expect(img.style.display).not.toBe("none");
    expect(errorText.style.display).toBe("none");

    // Simulate error event
    img.dispatchEvent(new Event("error"));

    expect(img.style.display).toBe("none");
    expect(errorText.style.display).toBe("block");

    // Should reset on reopen
    lightboxComp.open("new-src.jpg");
    expect(img.style.display).toBe("block");
    expect(errorText.style.display).toBe("none");
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

    // Test open
    const testSrc = "http://localhost/test-image.jpg";
    lightboxComp.open(testSrc);

    expect(lightboxDiv.style.display).toBe("flex");
    expect(img.src).toBe(testSrc);

    // Test close with close button
    closeBtn.click();
    expect(lightboxDiv.style.display).toBe("none");

    // Test close with escape key
    lightboxComp.open(testSrc);
    expect(lightboxDiv.style.display).toBe("flex");
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    expect(lightboxDiv.style.display).toBe("none");
  });
});
