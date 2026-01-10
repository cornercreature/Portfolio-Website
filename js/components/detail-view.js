// ============================================================================
// DETAIL VIEW MANAGEMENT
// ============================================================================

import { PLACEHOLDER_COLORS, ASPECT_RATIO_HEIGHTS } from '../config/constants.js';

/**
 * Creates a Vimeo embed container
 * @param {string} vimeoId - The Vimeo video ID
 * @param {string} title - The video title
 * @returns {HTMLElement} The Vimeo embed container
 */
function createVimeoEmbed(vimeoId, title) {
    const container = document.createElement('div');
    container.style.padding = '62.55% 0 0 0';
    container.style.position = 'relative';

    const iframe = document.createElement('iframe');
    iframe.src = `https://player.vimeo.com/video/${vimeoId}?badge=0&autopause=0&player_id=0&app_id=58479`;
    iframe.frameBorder = '0';
    iframe.allow = 'autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.style.position = 'absolute';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.title = title;

    container.appendChild(iframe);
    return container;
}

/**
 * Creates an image or video element with proper styling and placeholder
 * @param {Object} workData - The work data object
 * @param {string} mediaSrc - The media source URL (optional)
 * @param {number} imageIndex - Index for additional images (0 for main image)
 * @returns {HTMLElement} The configured media element
 */
export function createDetailImage(workData, mediaSrc = '', imageIndex = 0) {
    // Check if it's a video file
    const isVideo = mediaSrc.match(/\.(mp4|webm|mov)$/i);

    const media = document.createElement(isVideo ? 'video' : 'img');

    // Apply CSS class instead of inline styles
    media.className = imageIndex === 0 ? 'detail-image detail-main-image' : 'detail-image';

    // Set placeholder color and height (dynamic values that can't be in CSS)
    const colorIndex = (workData.id + imageIndex) % PLACEHOLDER_COLORS.length;
    media.style.backgroundColor = PLACEHOLDER_COLORS[colorIndex];

    const aspectConfig = ASPECT_RATIO_HEIGHTS[workData.aspectRatio] || ASPECT_RATIO_HEIGHTS.landscape;
    media.style.minHeight = imageIndex === 0 ? aspectConfig.detail : ASPECT_RATIO_HEIGHTS.landscape.detail;

    // Set media source and attributes
    if (mediaSrc) {
        if (isVideo) {
            media.src = mediaSrc;
            media.controls = true;
            media.loop = true;
            media.muted = true;
            media.playsInline = true;
            media.autoplay = true;
            media.preload = 'auto'; // Load full video
            media.style.width = '100%';
            media.style.objectFit = 'contain';
        } else {
            media.src = mediaSrc;
            media.loading = 'lazy';
        }
        media.alt = imageIndex === 0 ? workData.title : `${workData.title} - Media ${imageIndex + 1}`;
    } else {
        media.src = '';
        media.alt = 'Placeholder';
    }

    return media;
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
    document.querySelector('.for').textContent = workData.for;
    document.querySelector('.deliverables').textContent = workData.deliverables;
    document.querySelector('.detail-text').innerHTML = workData.description.replace(/\n/g, '<br>');

    const detailImagesContainer = document.querySelector('.detail-images');
    detailImagesContainer.innerHTML = '';

    // Create main image or Vimeo embed
    if (workData.heroVimeoId) {
        const vimeoEmbed = createVimeoEmbed(workData.heroVimeoId, workData.title);
        detailImagesContainer.appendChild(vimeoEmbed);
    } else {
        const mainImage = createDetailImage(workData, workData.heroImageSrc, 0);
        detailImagesContainer.appendChild(mainImage);
    }

    // Add additional images if they exist
    if (workData.images && workData.images.length > 0) {
        let imageIndex = 0;
        workData.images.forEach((item) => {
            // Check if item is an array (group) or a single item
            if (Array.isArray(item)) {
                // Create a flex container for the group
                const flexGroup = document.createElement('div');
                flexGroup.style.display = 'inline-flex';
                flexGroup.style.gap = '10px';
                flexGroup.style.width = '100%';
                flexGroup.style.maxWidth = '100%';
                flexGroup.style.overflow = 'hidden';

                item.forEach((mediaItem) => {
                    imageIndex++;
                    let element;

                    // Check if it's a Vimeo object
                    if (typeof mediaItem === 'object' && mediaItem.vimeoId) {
                        element = createVimeoEmbed(mediaItem.vimeoId, workData.title);
                    } else {
                        element = createDetailImage(workData, mediaItem, imageIndex);
                    }

                    element.style.flex = '1';
                    element.style.minWidth = '0';
                    flexGroup.appendChild(element);
                });

                detailImagesContainer.appendChild(flexGroup);
            } else {
                // Single item - check if it's a Vimeo object or string
                imageIndex++;
                let element;

                if (typeof item === 'object' && item.vimeoId) {
                    element = createVimeoEmbed(item.vimeoId, workData.title);
                } else {
                    element = createDetailImage(workData, item, imageIndex);
                }

                detailImagesContainer.appendChild(element);
            }
        });
    }
}
