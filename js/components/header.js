// ============================================================================
// SHARED HEADER COMPONENT
// ============================================================================

/**
 * Creates and returns the header HTML structure
 * @returns {HTMLElement} The header element
 */
function createHeader() {
    const header = document.createElement('header');
    header.className = 'site-header';

    // Determine message class based on current page
    const currentPage = window.location.pathname;
    const isShelvesPage = currentPage.includes('shelves.html');
    const isAboutPage = currentPage.includes('about.html');
    const isAlwaysOpenPage = isShelvesPage || isAboutPage;
    const messageContent = '🚪 | 🛋️ 🛏️ | 🚪 Please make yourself at home!';
    const messageClass = isAlwaysOpenPage
        ? 'message-container shelves-message'
        : 'message-container';

    // For shelves and about pages, wrap content in marquee div directly
    const messageHTML = isAlwaysOpenPage
        ? `<div class="marquee">${messageContent} ${messageContent}</div>`
        : messageContent;

    header.innerHTML = `
        <div class="header-left">
            <p class="site-title">Nicole Sun</p>
        </div>
        <div class="header-center">
            <p class="shu">|</p>
            <p class="diamond">r</p>
            <div class="${messageClass}">${messageHTML}</div>
            <p class="diamond">r</p>
            <p class="shu">|</p>
        </div>
        <nav class="header-nav" aria-label="Main navigation">
            <a href="main.html"><span class="nav-icon">,</span>Portfolio</a>
            <a href="about.html"><span class="nav-icon">,</span>About</a>
            <a href="shelves.html" style="visibility:hidden;width:0;overflow:hidden;"><span class="nav-icon">,</span>The Shelves</a>
        </nav>
        <button class="mobile-menu-toggle" aria-label="Open menu">☰</button>
    `;

    // Mobile slide-in menu (appended to body so it overlays everything)
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.innerHTML = `
        <button class="mobile-menu-close" aria-label="Close menu">✕</button>
        <nav class="mobile-menu-nav">
            <a href="main.html">Portfolio</a>
            <a href="about.html">About</a>
            <a href="shelves.html" style="visibility:hidden;width:0;overflow:hidden;">The Shelves</a>
        </nav>
    `;
    document.body.appendChild(mobileMenu);

    // Toggle menu open/close
    header.querySelector('.mobile-menu-toggle').addEventListener('click', () => {
        mobileMenu.classList.add('open');
    });

    mobileMenu.querySelector('.mobile-menu-close').addEventListener('click', () => {
        mobileMenu.classList.remove('open');
    });

    return header;
}

/**
 * Inserts the header at the beginning of the body
 */
export function initHeader() {
    const existingHeader = document.querySelector('.site-header');

    // If header already exists in HTML, don't replace it
    if (existingHeader) {
        return;
    }

    // Create and insert new header
    const header = createHeader();
    document.body.insertBefore(header, document.body.firstChild);
}
