// ============================================================================
// MARQUEE ANIMATION
// ============================================================================

/**
 * Sets up marquee animation for the message container
 */
export function setupMarquee() {
    const messageContainer = document.querySelector('.message-container');

    if (!messageContainer) return;

    // Skip if marquee already exists (e.g., on shelves page)
    if (messageContainer.querySelector('.marquee')) return;

    const messageText = messageContainer.textContent.trim();

    if (!messageText) return;

    // Create marquee wrapper
    const marqueeWrapper = document.createElement('div');
    marqueeWrapper.className = 'marquee';

    // Duplicate the text for seamless loop
    marqueeWrapper.textContent = messageText + ' ' + messageText;

    // Clear original content and add marquee
    messageContainer.textContent = '';
    messageContainer.appendChild(marqueeWrapper);
}
