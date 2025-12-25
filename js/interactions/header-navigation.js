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
            const portfolioMain = document.querySelector('.portfolio-main');

            // Only collapse if we're in detail view
            if (portfolioMain && portfolioMain.classList.contains('expanded')) {
                collapseWork();
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
