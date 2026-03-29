// ============================================================================
// MAIN APPLICATION ENTRY POINT
// ============================================================================

import { initHeader } from './components/header.js';
import { populateGallery } from './components/gallery.js';
import { setupSwipeGestures } from './interactions/swipe-gestures.js';
import { setupHeaderNavigation } from './interactions/header-navigation.js';
import { setupMarquee } from './components/marquee.js';
import { restoreFromUrl, collapseWork } from './views/transitions.js';
import { setupAboutCollapse } from './interactions/about-collapse.js';

/**
 * Initializes the portfolio on page load
 */
function initPortfolio() {
    initHeader();
    setupHeaderNavigation(); // Move after header is created
    populateGallery();
    setupSwipeGestures();
    setupAboutCollapse(); // Collapse about section on scroll
    setupMarquee();
    restoreFromUrl(); // Restore detail view from URL if present

    // Mobile back buttons
    const mobileBack = document.getElementById('mobileBack');
    if (mobileBack) {
        mobileBack.addEventListener('click', collapseWork);
    }

    const mobileBackBottom = document.getElementById('mobileBackBottom');
    if (mobileBackBottom) {
        mobileBackBottom.addEventListener('click', collapseWork);
    }

    const detailBackBottom = document.getElementById('detailBackBottom');
    if (detailBackBottom) {
        detailBackBottom.addEventListener('click', collapseWork);
    }
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
    initPortfolio();
}
