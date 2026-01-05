// ============================================================================
// SWIPE GESTURE HANDLING
// ============================================================================

import { SWIPE_CONFIG } from '../config/constants.js';
import { collapseWork } from '../views/transitions.js';

/**
 * Sets up swipe gesture handlers for both touch and trackpad input
 */
export function setupSwipeGestures() {
    // Get DOM elements
    const portfolioDetail = document.querySelector('.portfolio-detail');
    const leftColumn = document.querySelector('.portfolio-column-left');
    const rightColumn = document.querySelector('.portfolio-column-right');

    // Only set up if portfolio elements exist
    if (!portfolioDetail || !leftColumn || !rightColumn) return;

    // Swipe state
    let isSwiping = false;
    let swipeAccumulator = 0;

    // Touch event handlers
    let startX = 0;
    let startY = 0;
    let endX = 0;

    /**
     * Updates the visual feedback during swipe gesture
     * @param {number} swipeDistance - The current swipe distance
     */
    function updateSwipeVisuals(swipeDistance) {
        // No clamping - let swipe distance directly control progress
        const normalizedDistance = Math.max(swipeDistance, 0);
        // Use a larger divisor for smoother, more gradual opening
        const progress = Math.min(normalizedDistance / SWIPE_CONFIG.divisor, 1); // Cap at 1 (100%)

        // Apply subtle easing for more natural feel
        const easedProgress = 1 - Math.pow(1 - progress, 2);

        // Columns slide in from their respective sides with easing
        const leftProgress = easedProgress * 50; // 0 to 50
        leftColumn.style.width = `${leftProgress}%`;

        // Right column comes from right
        rightColumn.style.width = `${leftProgress}%`;

        // Detail view shrinks from center
        portfolioDetail.style.width = `${100 - (leftProgress * 2)}%`;
    }

    /**
     * Resets the swipe state and returns to detail view
     */
    function resetSwipe() {
        // Re-enable transitions for smooth snap back with custom easing
        const springTransition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
        portfolioDetail.style.transition = springTransition;
        leftColumn.style.transition = springTransition;
        rightColumn.style.transition = springTransition;

        // Reset to expanded state
        portfolioDetail.style.width = '';
        leftColumn.style.width = '';
        rightColumn.style.width = '';

        // Clear transitions after animation completes
        setTimeout(() => {
            portfolioDetail.style.transition = '';
            leftColumn.style.transition = '';
            rightColumn.style.transition = '';
        }, 400);
    }

    /**
     * Completes the swipe gesture and closes the detail view
     */
    function finishSwipe() {
        // Smooth completion with ease-out
        const easeTransition = 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
        portfolioDetail.style.transition = easeTransition;
        leftColumn.style.transition = easeTransition;
        rightColumn.style.transition = easeTransition;

        // Close the detail view
        collapseWork();

        // Reset inline styles after transition
        setTimeout(() => {
            portfolioDetail.style.width = '';
            portfolioDetail.style.transition = '';
            leftColumn.style.width = '';
            leftColumn.style.transition = '';
            rightColumn.style.width = '';
            rightColumn.style.transition = '';
        }, 500);
    }

    /**
     * Handles the completion of a touch swipe gesture
     */
    function handleTouchSwipe() {
        const swipeDistanceX = endX - startX;
        const threshold = SWIPE_CONFIG.threshold;

        // Check if swipe distance exceeds threshold (swipe right)
        if (swipeDistanceX > threshold) {
            finishSwipe();
        } else {
            resetSwipe();
        }
    }

    // ========================================
    // Touch Events (Mobile)
    // ========================================

    document.addEventListener('touchstart', (e) => {
        const portfolioMain = document.querySelector('.portfolio-main');
        if (!portfolioMain || !portfolioMain.classList.contains('expanded')) return;

        // Only handle two-finger swipes
        if (e.touches.length === 2) {
            isSwiping = true;
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;

            // Disable transitions for smooth tracking
            portfolioDetail.style.transition = 'none';
            leftColumn.style.transition = 'none';
            rightColumn.style.transition = 'none';
        }
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
        if (!isSwiping) return;

        if (e.touches.length === 2) {
            endX = e.touches[0].clientX;
            const swipeDistance = endX - startX;
            updateSwipeVisuals(swipeDistance);
        }
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        if (!isSwiping) return;

        if (e.touches.length === 0) {
            handleTouchSwipe();
            isSwiping = false;
            swipeAccumulator = 0;
        }
    }, { passive: true });

    // ========================================
    // Trackpad Events (Desktop)
    // ========================================

    document.addEventListener('wheel', (e) => {
        const portfolioMain = document.querySelector('.portfolio-main');
        if (!portfolioMain || !portfolioMain.classList.contains('expanded')) return;

        // Detect horizontal swipe (two-finger trackpad swipe)
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && !e.ctrlKey) {
            e.preventDefault();

            if (!isSwiping) {
                isSwiping = true;
                portfolioDetail.style.transition = 'none';
                leftColumn.style.transition = 'none';
                rightColumn.style.transition = 'none';
            }

            swipeAccumulator += e.deltaX;
            updateSwipeVisuals(-swipeAccumulator);

            // Check if swipe exceeds threshold (swipe right)
            if (swipeAccumulator < -SWIPE_CONFIG.threshold) {
                finishSwipe();
            }

            // Reset timer for incomplete swipes
            clearTimeout(window.swipeResetTimer);
            window.swipeResetTimer = setTimeout(() => {
                if (Math.abs(swipeAccumulator) < SWIPE_CONFIG.threshold) {
                    resetSwipe();
                }
                swipeAccumulator = 0;
                isSwiping = false;
            }, SWIPE_CONFIG.resetDelay);
        }
    }, { passive: false });
}
