// Portfolio Works Data
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

// Create Work Thumbnail Element
function createWorkThumbnail(workData) {
    const workItem = document.createElement('div');
    // Add both 'work-item' class and position-specific class
    workItem.className = `work-item work-item-${workData.position}`;
    workItem.dataset.workId = workData.id;

    // Create thumbnail with position-specific class
    const thumbnail = document.createElement('div');
    thumbnail.className = `work-thumbnail work-thumbnail-${workData.position}`;

    // Set height based on aspect ratio
    if (workData.aspectRatio === 'portrait') {
        thumbnail.style.minHeight = '700px';
    } else if (workData.aspectRatio === 'landscape') {
        thumbnail.style.minHeight = '400px';
    } else { // square
        thumbnail.style.minHeight = '560px';
    }

    // Add placeholder color based on ID
    const colors = ['#c9d6df', '#dae5e8', '#b8c9d4', '#d4dfe5', '#a8bac7', '#cdd8de'];
    thumbnail.style.backgroundColor = colors[workData.id % colors.length];

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

// Populate Gallery with Works
function populateGallery() {
    const leftSpan = document.getElementById('left');
    const rightSpan = document.getElementById('right');

    // Clear existing content
    leftSpan.innerHTML = '';
    rightSpan.innerHTML = '';

    // Distribute works to left and right columns
    portfolioWorks.forEach(work => {
        const thumbnail = createWorkThumbnail(work);

        if (work.position === 'left') {
            leftSpan.appendChild(thumbnail);
        } else {
            rightSpan.appendChild(thumbnail);
        }
    });
}

// Populate Detail View with Work Data
function populateDetailView(workData) {
    document.querySelector('.detail-title').textContent = workData.title;
    document.querySelector('.detail-category').textContent = workData.category;
    document.querySelector('.detail-text').textContent = workData.description;

    const detailImagesContainer = document.querySelector('.detail-images');

    // Clear existing images
    detailImagesContainer.innerHTML = '';

    // Set placeholder color
    const colors = ['#c9d6df', '#dae5e8', '#b8c9d4', '#d4dfe5', '#a8bac7', '#cdd8de'];

    // Create main image
    const mainImage = document.createElement('img');
    mainImage.className = 'detail-main-image';
    mainImage.style.width = '100%';
    mainImage.style.marginLeft = '0px';
    mainImage.style.marginRight = '0px';
    mainImage.style.marginBottom = '20px';
    mainImage.style.height = 'auto';
    mainImage.style.backgroundColor = colors[workData.id % colors.length];
    mainImage.style.boxSizing = 'border-box';

    // Set height based on aspect ratio
    if (workData.aspectRatio === 'portrait') {
        mainImage.style.minHeight = '600px';
    } else if (workData.aspectRatio === 'landscape') {
        mainImage.style.minHeight = '400px';
    } else {
        mainImage.style.minHeight = '500px';
    }

    // If real image source exists, use it
    if (workData.fullImageSrc) {
        mainImage.src = workData.fullImageSrc;
        mainImage.alt = workData.title;
    } else {
        mainImage.src = '';
        mainImage.alt = 'Placeholder';
    }

    detailImagesContainer.appendChild(mainImage);

    // Add additional images if they exist
    if (workData.images && workData.images.length > 0) {
        workData.images.forEach((imageSrc, index) => {
            const additionalImage = document.createElement('img');
            additionalImage.style.width = '100%';
            additionalImage.style.marginLeft = '0px';
            additionalImage.style.marginRight = '0px';
            additionalImage.style.marginBottom = '20px';
            additionalImage.style.height = 'auto';
            additionalImage.style.backgroundColor = colors[(workData.id + index + 1) % colors.length];
            additionalImage.style.minHeight = '400px';
            additionalImage.style.boxSizing = 'border-box';

            if (imageSrc) {
                additionalImage.src = imageSrc;
                additionalImage.alt = `${workData.title} - Image ${index + 2}`;
            } else {
                additionalImage.src = '';
                additionalImage.alt = 'Placeholder';
            }

            detailImagesContainer.appendChild(additionalImage);
        });
    }
}

// Track currently opened work ID
let currentlyOpenWorkId = null;

// Expand Work - Show Detail View
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

    // Add expanded class to portfolio-main to trigger CSS transition
    document.querySelector('.portfolio-main').classList.add('expanded');

    // Update currently open work ID
    currentlyOpenWorkId = workId;
}

// Collapse Work - Return to Grid View
function collapseWork() {
    const portfolioMain = document.querySelector('.portfolio-main');
    portfolioMain.classList.remove('expanded');
    currentlyOpenWorkId = null;
}

// Handle Swipe Gestures (Two-finger swipe for mobile and trackpad)
function setupSwipeGestures() {
    let twoFingerSwipe = false;
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    let swipeAccumulator = 0;
    let isSwiping = false;

    const portfolioDetail = document.querySelector('.portfolio-detail');
    const leftColumn = document.querySelector('.portfolio-column-left');
    const rightColumn = document.querySelector('.portfolio-column-right');

    // Touch events for mobile - TWO FINGER SWIPE
    document.addEventListener('touchstart', (e) => {
        const portfolioMain = document.querySelector('.portfolio-main');
        if (!portfolioMain || !portfolioMain.classList.contains('expanded')) return;

        // Check if it's a two-finger touch
        if (e.touches.length === 2) {
            twoFingerSwipe = true;
            isSwiping = true;
            // Use the midpoint between the two fingers
            startX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
            startY = (e.touches[0].clientY + e.touches[1].clientY) / 2;

            // Disable CSS transitions for live tracking
            portfolioDetail.style.transition = 'none';
            leftColumn.style.transition = 'none';
            rightColumn.style.transition = 'none';
        } else {
            twoFingerSwipe = false;
        }
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
        const portfolioMain = document.querySelector('.portfolio-main');
        if (!portfolioMain || !portfolioMain.classList.contains('expanded')) return;
        if (!twoFingerSwipe) return;

        // Track movement with two fingers
        if (e.touches.length === 2) {
            endX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
            endY = (e.touches[0].clientY + e.touches[1].clientY) / 2;

            // Update visual feedback in real-time
            updateSwipeVisuals(endX - startX);
        }
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        const portfolioMain = document.querySelector('.portfolio-main');
        if (!portfolioMain || !portfolioMain.classList.contains('expanded')) return;

        if (twoFingerSwipe) {
            handleTouchSwipe();
        }
        twoFingerSwipe = false;
        isSwiping = false;
    }, { passive: true });

    // Trackpad/wheel events for desktop - TWO FINGER TRACKPAD SWIPE
    document.addEventListener('wheel', (e) => {
        const portfolioMain = document.querySelector('.portfolio-main');
        if (!portfolioMain || !portfolioMain.classList.contains('expanded')) return;

        // Check if it's a horizontal swipe (deltaX is significant)
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && !e.ctrlKey) {
            e.preventDefault();

            if (!isSwiping) {
                isSwiping = true;
                // Disable CSS transitions for live tracking
                portfolioDetail.style.transition = 'none';
                leftColumn.style.transition = 'none';
                rightColumn.style.transition = 'none';
            }

            // Accumulate horizontal scroll delta
            swipeAccumulator += e.deltaX;

            // Update visual feedback in real-time
            updateSwipeVisuals(-swipeAccumulator);

            // Swipe right = negative deltaX (content moves left)
            if (swipeAccumulator < -50) {
                finishSwipe();
            }

            // Reset accumulator after a short delay if no more swipes
            clearTimeout(window.swipeResetTimer);
            window.swipeResetTimer = setTimeout(() => {
                if (Math.abs(swipeAccumulator) < 50) {
                    resetSwipe();
                }
                swipeAccumulator = 0;
                isSwiping = false;
            }, 200);
        }
    }, { passive: false });

    function updateSwipeVisuals(swipeDistance) {
        // Use requestAnimationFrame for smooth 60fps updates
        requestAnimationFrame(() => {
            // Clamp swipe distance to max of 300px for visual effect
            const clampedDistance = Math.min(Math.max(swipeDistance, 0), 300);
            const progress = clampedDistance / 300; // 0 to 1

            // Apply easing for more natural feel (ease-out curve)
            const easedProgress = 1 - Math.pow(1 - progress, 3);

            // Detail view fades out as you swipe
            portfolioDetail.style.opacity = 1 - (easedProgress * 0.3);

            // Columns slide in from their respective sides with easing
            const leftProgress = easedProgress * 50; // 0 to 50
            leftColumn.style.width = `${leftProgress}%`;
            leftColumn.style.opacity = easedProgress;

            // Right column comes from right
            rightColumn.style.width = `${leftProgress}%`;
            rightColumn.style.opacity = easedProgress;

            // Detail view shrinks from center
            portfolioDetail.style.width = `${100 - (leftProgress * 2)}%`;
        });
    }

    function resetSwipe() {
        // Re-enable transitions for smooth snap back with custom easing
        const springTransition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
        portfolioDetail.style.transition = springTransition;
        leftColumn.style.transition = springTransition;
        rightColumn.style.transition = springTransition;

        // Reset to expanded state
        portfolioDetail.style.opacity = '';
        portfolioDetail.style.width = '';
        leftColumn.style.width = '';
        leftColumn.style.opacity = '';
        rightColumn.style.width = '';
        rightColumn.style.opacity = '';

        // Clear transitions after animation completes
        setTimeout(() => {
            portfolioDetail.style.transition = '';
            leftColumn.style.transition = '';
            rightColumn.style.transition = '';
        }, 400);
    }

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
            portfolioDetail.style.opacity = '';
            portfolioDetail.style.width = '';
            portfolioDetail.style.transition = '';
            leftColumn.style.width = '';
            leftColumn.style.opacity = '';
            leftColumn.style.transition = '';
            rightColumn.style.width = '';
            rightColumn.style.opacity = '';
            rightColumn.style.transition = '';
        }, 500);
    }

    function handleTouchSwipe() {
        const swipeDistanceX = endX - startX;
        const swipeThreshold = 50; // Increased threshold for better feel

        // Swipe RIGHT with two fingers
        if (swipeDistanceX > swipeThreshold) {
            finishSwipe();
        } else {
            resetSwipe();
        }
    }
}

// Handle About Section Collapse/Expand on Scroll
let lastScrollTop = { left: 0, right: 0 };
let aboutCollapsed = false;

function handleAboutScroll(element, side) {
    const aboutSection = document.querySelector('.about-section');
    const scrollThreshold = 10;
    const currentScrollTop = Math.max(0, element.scrollTop); // Prevent negative values
    const previousScrollTop = lastScrollTop[side];

    // Determine scroll direction
    const scrollingDown = currentScrollTop > previousScrollTop;
    const scrollingUp = currentScrollTop < previousScrollTop;

    // Collapse when scrolling down past threshold
    if (scrollingDown && currentScrollTop > scrollThreshold && !aboutCollapsed) {
        aboutCollapsed = true;
        aboutSection.classList.add('collapsed');
    }

    // Only expand when scrolling up AND at the very top
    if (scrollingUp && currentScrollTop === 0 && aboutCollapsed) {
        aboutCollapsed = false;
        aboutSection.classList.remove('collapsed');
    }

    // Update last scroll position (clamp to 0 minimum)
    lastScrollTop[side] = Math.max(0, currentScrollTop);
}

// Initialize Portfolio on Page Load
document.addEventListener('DOMContentLoaded', () => {
    // Populate the gallery with portfolio works
    populateGallery();

    // Setup swipe gestures for detail view
    setupSwipeGestures();

    // Add event listener to close button (if it exists)
    const closeButton = document.getElementById('closeDetail');
    if (closeButton) {
        closeButton.addEventListener('click', collapseWork);
    }

    // Add scroll event listeners to left and right columns for about section
    const leftSpan = document.getElementById('left');
    const rightSpan = document.getElementById('right');

    // Track which column is being scrolled to prevent feedback loop
    let isScrolling = false;

    if (leftSpan) {
        leftSpan.addEventListener('scroll', () => {
            handleAboutScroll(leftSpan, 'left');

            // Sync scroll position to right column
            if (!isScrolling && rightSpan) {
                isScrolling = true;
                rightSpan.scrollTop = leftSpan.scrollTop;
                setTimeout(() => { isScrolling = false; }, 10);
            }
        });
    }

    if (rightSpan) {
        rightSpan.addEventListener('scroll', () => {
            handleAboutScroll(rightSpan, 'right');

            // Sync scroll position to left column
            if (!isScrolling && leftSpan) {
                isScrolling = true;
                leftSpan.scrollTop = rightSpan.scrollTop;
                setTimeout(() => { isScrolling = false; }, 10);
            }
        });
    }

    // Initialize marquee message
    const messageContainer = document.querySelector('.message-container');
    if (messageContainer) {
        // Get existing text content
        const textContent = messageContainer.textContent;
        // Clear the container
        messageContainer.innerHTML = '';
        // Create marquee wrapper with duplicated content
        const marqueeText = document.createElement('span');
        marqueeText.className = 'marquee';
        // Duplicate the text to create seamless loop
        marqueeText.textContent = textContent + ' ' + textContent;
        messageContainer.appendChild(marqueeText);
    }

    console.log('Portfolio initialized with', portfolioWorks.length, 'works');
});
