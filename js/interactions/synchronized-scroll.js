// ============================================================================
// SYNCHRONIZED SCROLLING
// ============================================================================

/**
 * Sets up synchronized scrolling between left and right columns
 */
export function setupSynchronizedScrolling() {
    const leftColumn = document.querySelector('.portfolio-column-left');
    const rightColumn = document.querySelector('.portfolio-column-right');

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
