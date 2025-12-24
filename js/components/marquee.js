// ============================================================================
// MARQUEE ANIMATION
// ============================================================================

/**
 * Sets up marquee animation for the message container
 */
export function setupMarquee() {
    const messageContainer = document.querySelector('.message-container');

    if (!messageContainer) return;

    const messageText = messageContainer.textContent;

    // Create marquee wrapper
    const marqueeWrapper = document.createElement('div');
    marqueeWrapper.className = 'marquee';

    // Duplicate the text for seamless loop
    marqueeWrapper.textContent = messageText + ' ' + messageText;

    // Clear original content and add marquee
    messageContainer.textContent = '';
    messageContainer.appendChild(marqueeWrapper);
}
