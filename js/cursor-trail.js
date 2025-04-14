/**
 * Matrix Cursor Trail Animation
 * Creates a cyberpunk-style trail of 0's and 1's that follows the cursor
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize matrix cursor trail
    initMatrixCursorTrail();
    
    // Set default enabled state
    window.cursorTrailEnabled = true;
});

/**
 * Initialize Matrix Cursor Trail
 */
function initMatrixCursorTrail() {
    // Create container for cursor trail
    const trailContainer = document.createElement('div');
    trailContainer.className = 'cursor-trail-container';
    document.body.appendChild(trailContainer);
    
    // Track mouse movement with throttling
    let lastCallTime = 0;
    const throttleDelay = 80; // Increase delay between digit creation (ms)
    
    document.addEventListener('mousemove', function(e) {
        // Only create trail digits if enabled
        if (!window.cursorTrailEnabled) return;
        
        const now = Date.now();
        if (now - lastCallTime >= throttleDelay) {
            lastCallTime = now;
            createTrailDigit(e.clientX, e.clientY, trailContainer);
        }
    });
}

/**
 * Create a digit in the cursor trail
 */
function createTrailDigit(x, y, container) {
    // Create a new digit element
    const digit = document.createElement('div');
    digit.className = 'cursor-trail-digit';
    
    // Randomly choose 0 or 1
    digit.textContent = Math.random() > 0.5 ? '0' : '1';
    
    // Position slightly offset from cursor
    const offsetX = (Math.random() * 20) - 10; // -10 to 10px offset
    const offsetY = (Math.random() * 20) - 10; // -10 to 10px offset
    
    digit.style.left = (x + offsetX) + 'px';
    digit.style.top = (y + offsetY) + 'px';
    
    // Add to container
    container.appendChild(digit);
    
    // Start fade animation
    setTimeout(() => {
        digit.classList.add('fade-out');
    }, 50);
    
    // Remove element after animation completes
    setTimeout(() => {
        container.removeChild(digit);
    }, 850); // Reduced from 1550ms to 850ms for shorter trail
}
