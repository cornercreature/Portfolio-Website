// ============================================================================
// PORTFOLIO WORKS DATA
// ============================================================================

const portfolioWorks = [
    {
        id: 1,
        title: "Celestial Navigation",
        category: "Interactive",
        thumbnailSrc: "", // Placeholder - will use CSS background
        fullImageSrc: "",
        images: [], // Array of additional image sources for detail view
        description: "An interactive exploration of celestial bodies and their movements through space. This project combines data visualization with interactive storytelling to create an immersive experience.",
        position: "left",
        aspectRatio: "landscape"
    },
    {
        id: 2,
        title: "Urban Rhythms",
        category: "Graphic",
        thumbnailSrc: "",
        fullImageSrc: "",
        description: "A visual study of patterns and rhythms found in urban environments. Through systematic documentation and design exploration, this project reveals the hidden geometries of city life.",
        position: "right",
        aspectRatio: "landscape"
    },
    {
        id: 3,
        title: "Type in Motion",
        category: "Motion",
        thumbnailSrc: "",
        fullImageSrc: "",
        description: "Experimental typography that explores the relationship between letterforms and movement. This project investigates how motion can enhance typographic communication.",
        position: "left",
        aspectRatio: "landscape"
    },
    {
        id: 4,
        title: "Data Garden",
        category: "Information",
        thumbnailSrc: "",
        fullImageSrc: "",
        description: "A data visualization project that transforms complex environmental data into an organic, garden-like interface. Users can explore climate patterns through an intuitive botanical metaphor.",
        position: "right",
        aspectRatio: "landscape"
    },
    {
        id: 5,
        title: "Computational Weaving",
        category: "Generative Art",
        thumbnailSrc: "",
        fullImageSrc: "",
        description: "Exploring the intersection of traditional weaving patterns and computational design. This project generates unique textile patterns using algorithmic processes inspired by historical craft techniques.",
        position: "left",
        aspectRatio: "landscape"
    },
    {
        id: 6,
        title: "Signal & Noise",
        category: "Interactive Media",
        thumbnailSrc: "",
        fullImageSrc: "",
        description: "An interactive sound visualization that explores the boundary between meaningful signal and random noise. Users can manipulate audio parameters to create unique visual compositions.",
        position: "right",
        aspectRatio: "landscape"
    }
];


// ============================================================================
// CONSTANTS & CONFIGURATION
// ============================================================================

const PLACEHOLDER_COLORS = ['#c9d6df', '#dae5e8', '#b8c9d4', '#d4dfe5', '#a8bac7', '#cdd8de'];

const ASPECT_RATIO_HEIGHTS = {
    portrait: { thumbnail: '700px', detail: '600px' },
    landscape: { thumbnail: '400px', detail: '400px' },
    square: { thumbnail: '560px', detail: '500px' }
};

const SWIPE_CONFIG = {
    threshold: 50,
    divisor: 600,
    resetDelay: 200,
    transitionDelay: 150
};


// ============================================================================
// STATE MANAGEMENT
// ============================================================================

let currentlyOpenWorkId = null;


// ============================================================================
// GALLERY RENDERING
// ============================================================================

/**
 * Creates a work thumbnail element with all associated UI components
 * @param {Object} workData - The work data object
 * @returns {HTMLElement} The complete work item element
 */
function createWorkThumbnail(workData) {
    const workItem = document.createElement('div');
    workItem.className = `work-item work-item-${workData.position}`;
    workItem.dataset.workId = workData.id;

    // Create thumbnail
    const thumbnail = document.createElement('div');
    thumbnail.className = `work-thumbnail work-thumbnail-${workData.position}`;

    // Set height based on aspect ratio
    const aspectConfig = ASPECT_RATIO_HEIGHTS[workData.aspectRatio] || ASPECT_RATIO_HEIGHTS.landscape;
    thumbnail.style.minHeight = aspectConfig.thumbnail;

    // Add placeholder color
    thumbnail.style.backgroundColor = PLACEHOLDER_COLORS[workData.id % PLACEHOLDER_COLORS.length];

    // Create info section
    const workInfo = document.createElement('div');
    workInfo.className = 'work-info';

    const title = document.createElement('h2');
    title.className = 'work-title';
    title.textContent = workData.title;

    const category = document.createElement('h2');
    category.className = 'work-category';
    category.textContent = workData.category;

    workInfo.appendChild(title);
    workInfo.appendChild(category);

    workItem.appendChild(thumbnail);
    workItem.appendChild(workInfo);

    // Add click event listener
    workItem.addEventListener('click', () => expandWork(workData.id));

    return workItem;
}

/**
 * Populates the gallery with all portfolio works, distributing them to left and right columns
 */
function populateGallery() {
    const leftColumn = document.getElementById('left');
    const rightColumn = document.getElementById('right');

    // Clear existing content
    leftColumn.innerHTML = '';
    rightColumn.innerHTML = '';

    // Distribute works to columns
    portfolioWorks.forEach(work => {
        const thumbnail = createWorkThumbnail(work);
        const targetColumn = work.position === 'left' ? leftColumn : rightColumn;
        targetColumn.appendChild(thumbnail);
    });
}


// ============================================================================
// DETAIL VIEW MANAGEMENT
// ============================================================================

/**
 * Creates an image element with proper styling and placeholder
 * @param {Object} workData - The work data object
 * @param {string} imageSrc - The image source URL (optional)
 * @param {number} imageIndex - Index for additional images (0 for main image)
 * @returns {HTMLElement} The configured image element
 */
function createDetailImage(workData, imageSrc = '', imageIndex = 0) {
    const image = document.createElement('img');
    image.style.width = '100%';
    image.style.marginLeft = '0px';
    image.style.marginRight = '0px';
    image.style.marginBottom = '20px';
    image.style.height = 'auto';
    image.style.boxSizing = 'border-box';

    // Set placeholder color
    const colorIndex = (workData.id + imageIndex) % PLACEHOLDER_COLORS.length;
    image.style.backgroundColor = PLACEHOLDER_COLORS[colorIndex];

    // Set height based on aspect ratio
    const aspectConfig = ASPECT_RATIO_HEIGHTS[workData.aspectRatio] || ASPECT_RATIO_HEIGHTS.landscape;
    image.style.minHeight = imageIndex === 0 ? aspectConfig.detail : ASPECT_RATIO_HEIGHTS.landscape.detail;

    // Set image source
    if (imageSrc) {
        image.src = imageSrc;
        image.alt = imageIndex === 0 ? workData.title : `${workData.title} - Image ${imageIndex + 1}`;
    } else {
        image.src = '';
        image.alt = 'Placeholder';
    }

    if (imageIndex === 0) {
        image.className = 'detail-main-image';
    }

    return image;
}

/**
 * Populates the detail view with work data including title, category, description, and images
 * @param {Object} workData - The work data object to display
 */
function populateDetailView(workData) {
    document.querySelector('.detail-title').textContent = workData.title;
    document.querySelector('.detail-category').textContent = workData.category;
    document.querySelector('.detail-text').textContent = workData.description;

    const detailImagesContainer = document.querySelector('.detail-images');
    detailImagesContainer.innerHTML = '';

    // Create main image
    const mainImage = createDetailImage(workData, workData.fullImageSrc, 0);
    detailImagesContainer.appendChild(mainImage);

    // Add additional images if they exist
    if (workData.images && workData.images.length > 0) {
        workData.images.forEach((imageSrc, index) => {
            const additionalImage = createDetailImage(workData, imageSrc, index + 1);
            detailImagesContainer.appendChild(additionalImage);
        });
    }
}


// ============================================================================
// VIEW TRANSITIONS
// ============================================================================

/**
 * Expands a work item to show its detail view
 * @param {number} workId - The ID of the work to expand
 */
function expandWork(workId) {
    const work = portfolioWorks.find(w => w.id === workId);

    if (!work) {
        console.error('Work not found with ID:', workId);
        return;
    }

    // If clicking on the same work that's already open, close it
    if (currentlyOpenWorkId === workId && document.querySelector('.portfolio-main').classList.contains('expanded')) {
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
    currentlyOpenWorkId = workId;
}

/**
 * Collapses the detail view and returns to the grid view
 */
function collapseWork() {
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

    currentlyOpenWorkId = null;
}


// ============================================================================
// SWIPE GESTURE HANDLING
// ============================================================================

/**
 * Sets up swipe gesture handlers for both touch and trackpad input
 */
function setupSwipeGestures() {
    // Get DOM elements
    const portfolioDetail = document.querySelector('.portfolio-detail');
    const leftColumn = document.querySelector('.portfolio-column-left');
    const rightColumn = document.querySelector('.portfolio-column-right');

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


// ============================================================================
// SYNCHRONIZED SCROLLING
// ============================================================================

/**
 * Sets up synchronized scrolling between left and right columns
 */
function setupSynchronizedScrolling() {
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


// ============================================================================
// INITIALIZATION
// ============================================================================

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
