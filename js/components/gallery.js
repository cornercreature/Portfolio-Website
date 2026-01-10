// ============================================================================
// GALLERY RENDERING
// ============================================================================

import { PLACEHOLDER_COLORS, ASPECT_RATIO_HEIGHTS } from '../config/constants.js';
import { portfolioWorks } from '../data/portfolio-data.js';
import { expandWork } from '../views/transitions.js';

/**
 * Creates a work thumbnail element with all associated UI components
 * @param {Object} workData - The work data object
 * @returns {HTMLElement} The complete work item element
 */
export function createWorkThumbnail(workData) {
    const workItem = document.createElement('div');
    workItem.className = `work-item work-item-${workData.position}`;
    workItem.dataset.workId = workData.id;

    // Create thumbnail
    const thumbnail = document.createElement('div');
    thumbnail.className = `work-thumbnail work-thumbnail-${workData.position}`;

    // Set 4:3 aspect ratio for all thumbnails
    thumbnail.style.aspectRatio = '4 / 3';
    thumbnail.style.width = '100%';

    // Add thumbnail image or placeholder color
    if (workData.thumbnailSrc) {
        thumbnail.style.backgroundImage = `url('${workData.thumbnailSrc}')`;
        thumbnail.style.backgroundSize = 'cover';
        thumbnail.style.backgroundPosition = 'center';
        thumbnail.style.backgroundRepeat = 'no-repeat';
    } else {
        thumbnail.style.backgroundColor = PLACEHOLDER_COLORS[workData.id % PLACEHOLDER_COLORS.length];
    }

    // Add hover media (image or video) if provided
    if (workData.hoverSrc) {
        const isVideo = workData.hoverSrc.match(/\.(mp4|webm|mov)$/i);
        const hoverMedia = document.createElement(isVideo ? 'video' : 'img');

        hoverMedia.src = workData.hoverSrc;
        hoverMedia.style.width = '100%';
        hoverMedia.style.height = '100%';
        hoverMedia.style.objectFit = 'cover';
        hoverMedia.style.position = 'absolute';
        hoverMedia.style.top = '0';
        hoverMedia.style.left = '0';
        hoverMedia.style.opacity = '0';
        hoverMedia.style.transition = 'opacity 0.3s ease';

        if (isVideo) {
            hoverMedia.loop = true;
            hoverMedia.muted = true;
            hoverMedia.playsInline = true;
        }

        thumbnail.style.position = 'relative';
        thumbnail.appendChild(hoverMedia);

        // Show hover media on mouse enter
        workItem.addEventListener('mouseenter', () => {
            hoverMedia.style.opacity = '1';
            if (isVideo) {
                hoverMedia.play();
            }
        });

        // Hide hover media on mouse leave
        workItem.addEventListener('mouseleave', () => {
            hoverMedia.style.opacity = '0';
            if (isVideo) {
                hoverMedia.pause();
                hoverMedia.currentTime = 0;
            }
        });
    }

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
export function populateGallery() {
    const leftColumn = document.getElementById('left');
    const rightColumn = document.getElementById('right');

    // Only populate if columns exist (i.e., we're on the portfolio page)
    if (!leftColumn || !rightColumn) return;

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
