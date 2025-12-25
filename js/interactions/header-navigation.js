// ============================================================================
// HEADER NAVIGATION
// ============================================================================

import { collapseWork } from '../views/transitions.js';

/**
 * Sets up header navigation interactions
 */
export function setupHeaderNavigation() {
    const siteTitle = document.querySelector('.site-title');
    const portfolioLink = document.querySelector('.header-nav a[href="main.html"]');

    if (siteTitle) {
        siteTitle.style.cursor = 'pointer';

        siteTitle.addEventListener('click', () => {
            const currentPage = window.location.pathname;
            const portfolioMain = document.querySelector('.portfolio-main');

            // If in detail view, collapse it
            if (portfolioMain && portfolioMain.classList.contains('expanded')) {
                collapseWork();
            } else if (portfolioMain) {
                // On portfolio page but not in detail view - do nothing
                return;
            } else if (currentPage.includes('about.html') || currentPage.includes('shelves.html')) {
                // On about or shelves page - navigate to main.html
                window.location.href = 'main.html';
            } else {
                // On other pages - navigate to main.html
                window.location.href = 'main.html';
            }
        });
    }

    if (portfolioLink) {
        portfolioLink.addEventListener('click', (e) => {
            const portfolioMain = document.querySelector('.portfolio-main');

            // Only collapse if we're in detail view
            if (portfolioMain && portfolioMain.classList.contains('expanded')) {
                e.preventDefault();
                collapseWork();
            }
        });
    }
}
