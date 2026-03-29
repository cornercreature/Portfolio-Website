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

    function handleScroll() {
        if (isMobile()) {
            if (window.scrollY > 0) {
                aboutSection.classList.add('collapsed');
            } else {
                aboutSection.classList.remove('collapsed');
            }
        } else {
            const leftScrollTop = leftColumn.scrollTop;
            const rightScrollTop = rightColumn.scrollTop;
            if (leftScrollTop > 0 || rightScrollTop > 0) {
                aboutSection.classList.add('collapsed');
            } else {
                aboutSection.classList.remove('collapsed');
            }
        }
    }

    const throttledHandleScroll = throttle(handleScroll, 16);

    leftColumn.addEventListener('scroll', throttledHandleScroll);
    rightColumn.addEventListener('scroll', throttledHandleScroll);
    window.addEventListener('scroll', throttledHandleScroll);
}
