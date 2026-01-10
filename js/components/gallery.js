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

    // Set height based on aspect ratio
    const aspectConfig = ASPECT_RATIO_HEIGHTS[workData.aspectRatio] || ASPECT_RATIO_HEIGHTS.landscape;
    thumbnail.style.minHeight = aspectConfig.thumbnail;

    // Add thumbnail image or placeholder color
    if (workData.thumbnailSrc) {
        thumbnail.style.backgroundImage = `url('${workData.thumbnailSrc}')`;
        thumbnail.style.backgroundSize = 'cover';
        thumbnail.style.backgroundPosition = 'center';
    } else {
        thumbnail.style.backgroundColor = PLACEHOLDER_COLORS[workData.id % PLACEHOLDER_COLORS.length];
    }

    // Add hover video if provided
    if (workData.hoverVideoSrc) {
        const video = document.createElement('video');
        video.src = workData.hoverVideoSrc;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'cover';
        video.style.position = 'absolute';
        video.style.top = '0';
        video.style.left = '0';
        video.style.opacity = '0';
        video.style.transition = 'opacity 0.3s ease';

        thumbnail.style.position = 'relative';
        thumbnail.appendChild(video);

        // Play video on hover
        workItem.addEventListener('mouseenter', () => {
            video.style.opacity = '1';
            video.play();
        });

        // Stop video and hide on mouse leave
        workItem.addEventListener('mouseleave', () => {
            video.style.opacity = '0';
            video.pause();
            video.currentTime = 0;
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
