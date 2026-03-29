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

    if (!leftColumn || !rightColumn || !aboutSection) return;

    const isMobile = () => window.matchMedia('(max-width: 768px)').matches;

    function handleColumnScroll(column) {
        if (column.scrollTop > 0) {
            aboutSection.classList.add('collapsed');
        } else {
            aboutSection.classList.remove('collapsed');
        }
    }

    function handleWindowScroll() {
        if (window.scrollY > 0) {
            aboutSection.classList.add('collapsed');
        } else {
            aboutSection.classList.remove('collapsed');
        }
    }

    const throttledLeft = throttle(() => handleColumnScroll(leftColumn), 16);
    const throttledRight = throttle(() => handleColumnScroll(rightColumn), 16);
    const throttledWindow = throttle(handleWindowScroll, 16);

    leftColumn.addEventListener('scroll', throttledLeft);
    rightColumn.addEventListener('scroll', throttledRight);
    window.addEventListener('scroll', throttledWindow);
}
