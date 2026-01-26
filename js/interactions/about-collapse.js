// ============================================================================
// ABOUT SECTION COLLAPSE ON SCROLL
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
 * Sets up about section collapse/expand based on column scroll position
 */
export function setupAboutCollapse() {
    const leftColumn = document.querySelector('.portfolio-column-left');
    const rightColumn = document.querySelector('.portfolio-column-right');
    const aboutSection = document.querySelector('.about-section');

    // Only set up if portfolio columns and about section exist
    if (!leftColumn || !rightColumn || !aboutSection) return;

    /**
     * Checks scroll position and toggles about section visibility
     */
    function handleScroll() {
        const leftScrollTop = leftColumn.scrollTop;
        const rightScrollTop = rightColumn.scrollTop;

        // If either column is scrolled down, collapse about section
        if (leftScrollTop > 0 || rightScrollTop > 0) {
            aboutSection.classList.add('collapsed');
        } else {
            // Both columns at top - show about section
            aboutSection.classList.remove('collapsed');
        }
    }

    // Throttle scroll events to fire at most every 16ms (~60fps)
    const throttledHandleScroll = throttle(handleScroll, 16);

    // Listen to both columns
    leftColumn.addEventListener('scroll', throttledHandleScroll);
    rightColumn.addEventListener('scroll', throttledHandleScroll);
}
