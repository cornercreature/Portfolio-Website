// ============================================================================
// SYNCHRONIZED SCROLLING
// ============================================================================

/**
 * Throttles a function to only execute once per specified delay
 * @param {Function} func - The function to throttle
 * @param {number} delay - Minimum time between executions in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            func.apply(this, args);
        }
    };
}

/**
 * Sets up synchronized scrolling between left and right columns
 */
export function setupSynchronizedScrolling() {
    const leftColumn = document.querySelector('.portfolio-column-left');
    const rightColumn = document.querySelector('.portfolio-column-right');
    const aboutSection = document.querySelector('.about-section');

    // Only set up if portfolio columns exist
    if (!leftColumn || !rightColumn) return;

    let isScrolling = false;

    /**
     * Synchronizes scroll position from source column to target column
     * @param {HTMLElement} sourceColumn - The column being scrolled
     * @param {HTMLElement} targetColumn - The column to synchronize
     */
    function syncScroll(sourceColumn, targetColumn) {
        if (isScrolling) return;

        isScrolling = true;
        const scrollPosition = sourceColumn.scrollTop;
        targetColumn.scrollTop = scrollPosition;

        // Show/hide about section based on scroll position
        if (aboutSection) {
            if (scrollPosition === 0) {
                // At top - show about section
                aboutSection.classList.remove('collapsed');
            } else {
                // Scrolled down - hide about section
                aboutSection.classList.add('collapsed');
            }
        }

        requestAnimationFrame(() => {
            isScrolling = false;
        });
    }

    // Throttle scroll events to fire at most every 16ms (~60fps)
    const throttledSyncLeft = throttle(() => syncScroll(leftColumn, rightColumn), 16);
    const throttledSyncRight = throttle(() => syncScroll(rightColumn, leftColumn), 16);

    // Sync right column when left column scrolls
    leftColumn.addEventListener('scroll', throttledSyncLeft);

    // Sync left column when right column scrolls
    rightColumn.addEventListener('scroll', throttledSyncRight);
}
