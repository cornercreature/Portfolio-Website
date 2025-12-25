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
    const messageContent = '🚪 | 🛋️ 🛏️ | 🚪 Please make yourself at home!';
    const messageClass = isShelvesPage
        ? 'message-container shelves-message'
        : 'message-container';

    // For shelves page, wrap content in marquee div directly
    const messageHTML = isShelvesPage
        ? `<div class="marquee">${messageContent} ${messageContent}</div>`
        : messageContent;

    header.innerHTML = `
        <div class="header-left">
            <h1 class="site-title">Nicole Sun</h1>
        </div>
        <div class="header-center">
            <p class="shu">|</p>
            <p class="diamond">r</p>
            <div class="${messageClass}">${messageHTML}</div>
            <p class="diamond">r</p>
            <p class="shu">|</p>
        </div>
        <nav class="header-nav" aria-label="Main navigation">
            <a href="main.html">Portfolio</a>
            <a href="about.html">About</a>
            <a href="shelves.html">The Shelves</a>
        </nav>
    `;

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
