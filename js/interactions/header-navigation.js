// ============================================================================
// HEADER NAVIGATION
// ============================================================================

import { collapseWork } from '../views/transitions.js';

/**
 * Sets up header navigation interactions
 */
export function setupHeaderNavigation() {
    const siteTitle = document.querySelector('.site-title');

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
}
