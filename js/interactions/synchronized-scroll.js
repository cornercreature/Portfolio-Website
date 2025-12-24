// ============================================================================
// SYNCHRONIZED SCROLLING
// ============================================================================

/**
 * Sets up synchronized scrolling between left and right columns
 */
export function setupSynchronizedScrolling() {
    const leftColumn = document.querySelector('.portfolio-column-left');
    const rightColumn = document.querySelector('.portfolio-column-right');
    const aboutSection = document.querySelector('.about-section');

    let isScrolling = false;

    /**
     * Synchronizes scroll position from source column to target column
     * @param {HTMLElement} sourceColumn - The column being scrolled
     * @param {HTMLElement} targetColumn - The column to synchronize
     */
    function syncScroll(sourceColumn, targetColumn) {
        if (isScrolling) return;

        isScrolling = true;
        targetColumn.scrollTop = sourceColumn.scrollTop;

        // Show/hide about section based on scroll position
        if (aboutSection) {
            if (sourceColumn.scrollTop === 0) {
                // At top - show about section
                aboutSection.classList.remove('collapsed');
            } else if (!aboutSection.classList.contains('collapsed')) {
                // Scrolled down - hide about section
                aboutSection.classList.add('collapsed');
            }
        }

        requestAnimationFrame(() => {
            isScrolling = false;
        });
    }

    // Sync right column when left column scrolls
    leftColumn.addEventListener('scroll', () => {
        syncScroll(leftColumn, rightColumn);
    });

    // Sync left column when right column scrolls
    rightColumn.addEventListener('scroll', () => {
        syncScroll(rightColumn, leftColumn);
    });
}
