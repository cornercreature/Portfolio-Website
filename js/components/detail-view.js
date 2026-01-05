// ============================================================================
// DETAIL VIEW MANAGEMENT
// ============================================================================

import { PLACEHOLDER_COLORS, ASPECT_RATIO_HEIGHTS } from '../config/constants.js';

/**
 * Creates an image element with proper styling and placeholder
 * @param {Object} workData - The work data object
 * @param {string} imageSrc - The image source URL (optional)
 * @param {number} imageIndex - Index for additional images (0 for main image)
 * @returns {HTMLElement} The configured image element
 */
export function createDetailImage(workData, imageSrc = '', imageIndex = 0) {
    const image = document.createElement('img');

    // Apply CSS class instead of inline styles
    image.className = imageIndex === 0 ? 'detail-image detail-main-image' : 'detail-image';

    // Set placeholder color and height (dynamic values that can't be in CSS)
    const colorIndex = (workData.id + imageIndex) % PLACEHOLDER_COLORS.length;
    image.style.backgroundColor = PLACEHOLDER_COLORS[colorIndex];

    const aspectConfig = ASPECT_RATIO_HEIGHTS[workData.aspectRatio] || ASPECT_RATIO_HEIGHTS.landscape;
    image.style.minHeight = imageIndex === 0 ? aspectConfig.detail : ASPECT_RATIO_HEIGHTS.landscape.detail;

    // Set image source
    if (imageSrc) {
        image.src = imageSrc;
        image.loading = 'lazy';
        image.alt = imageIndex === 0 ? workData.title : `${workData.title} - Image ${imageIndex + 1}`;
    } else {
        image.src = '';
        image.alt = 'Placeholder';
    }

    return image;
}

/**
 * Populates the detail view with work data including title, category, year, collaborators, description, and images
 * @param {Object} workData - The work data object to display
 */
export function populateDetailView(workData) {
    document.querySelector('.detail-title').textContent = workData.title;
    document.querySelector('.detail-category').textContent = workData.category;
    document.querySelector('.year').textContent = workData.year;
    document.querySelector('.collaborators').textContent = workData.collaborators;
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
