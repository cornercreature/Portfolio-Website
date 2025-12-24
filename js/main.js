// ============================================================================
// MAIN APPLICATION ENTRY POINT
// ============================================================================

import { populateGallery } from './components/gallery.js';
import { setupSwipeGestures } from './interactions/swipe-gestures.js';
import { setupSynchronizedScrolling } from './interactions/synchronized-scroll.js';

/**
 * Initializes the portfolio on page load
 */
function initPortfolio() {
    populateGallery();
    setupSwipeGestures();
    setupSynchronizedScrolling();
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
    initPortfolio();
}
