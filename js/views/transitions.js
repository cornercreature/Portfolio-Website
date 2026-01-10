// ============================================================================
// VIEW TRANSITIONS
// ============================================================================

import { portfolioWorks } from '../data/portfolio-data.js';
import { SWIPE_CONFIG } from '../config/constants.js';
import { getCurrentlyOpenWorkId, setCurrentlyOpenWorkId } from '../state/app-state.js';
import { populateDetailView } from '../components/detail-view.js';

/**
 * Expands a work item to show its detail view
 * @param {number} workId - The ID of the work to expand
 */
export function expandWork(workId) {
    const work = portfolioWorks.find(w => w.id === workId);

    if (!work) {
        console.error('Work not found with ID:', workId);
        return;
    }

    // If clicking on the same work that's already open, close it
    if (getCurrentlyOpenWorkId() === workId && document.querySelector('.portfolio-main').classList.contains('expanded')) {
        collapseWork();
        return;
    }

    // Populate detail view with work data
    populateDetailView(work);

    // Hide about section
    const aboutSection = document.querySelector('.about-section');
    if (aboutSection) {
        aboutSection.classList.add('collapsed');
    }

    // Add slight pause before starting the transition
    setTimeout(() => {
        document.querySelector('.portfolio-main').classList.add('expanded');
    }, SWIPE_CONFIG.transitionDelay);

    // Update currently open work ID
    setCurrentlyOpenWorkId(workId);

    // Update URL hash
    window.history.pushState(null, '', `#work-${workId}`);
}

/**
 * Collapses the detail view and returns to the grid view
 */
export function collapseWork() {
    const portfolioMain = document.querySelector('.portfolio-main');

    // Show about section
    const aboutSection = document.querySelector('.about-section');
    if (aboutSection) {
        aboutSection.classList.remove('collapsed');
    }

    // Add slight pause before starting the transition
    setTimeout(() => {
        portfolioMain.classList.remove('expanded');
    }, SWIPE_CONFIG.transitionDelay);

    setCurrentlyOpenWorkId(null);

    // Clear URL hash
    window.history.pushState(null, '', window.location.pathname);
}

/**
 * Restores the detail view from URL hash on page load
 */
export function restoreFromUrl() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#work-')) {
        const workId = parseInt(hash.replace('#work-', ''));
        if (!isNaN(workId)) {
            expandWork(workId);
        }
    }
}
