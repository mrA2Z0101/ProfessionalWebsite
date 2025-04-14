/**
 * Effects Toggle Functionality
 * Toggles visual effects (matrix rain, cursor trail, profile matrix, and custom cursor) on/off
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize effects toggle
    initEffectsToggle();
    
    // Check for saved effects preference
    checkSavedEffectsPreference();
});

/**
 * Initialize Effects Toggle Button
 */
function initEffectsToggle() {
    const effectsToggle = document.getElementById('effects-toggle');
    const effectsIcon = document.getElementById('effects-icon');
    
    if (!effectsToggle || !effectsIcon) return;
    
    effectsToggle.addEventListener('click', function() {
        // Toggle disabled state
        const isDisabled = effectsToggle.classList.toggle('disabled');
        
        // Update effects state
        updateEffectsState(isDisabled);
        
        // Save preference
        saveEffectsPreference(isDisabled ? 'disabled' : 'enabled');
        
        // Play click sound if available and not muted
        if (!isDisabled && typeof clickSound !== 'undefined' && 
            !document.getElementById('sound-toggle')?.classList.contains('muted')) {
            clickSound.currentTime = 0;
            clickSound.play();
        }
    });
    
    // Add hover sound effect if available and not muted
    effectsToggle.addEventListener('mouseenter', function() {
        if (!effectsToggle.classList.contains('disabled') && 
            typeof hoverSound !== 'undefined' && 
            !document.getElementById('sound-toggle')?.classList.contains('muted')) {
            hoverSound.currentTime = 0;
            hoverSound.play();
        }
    });
}

/**
 * Update Effects State
 * @param {boolean} isDisabled - Whether effects should be disabled
 */
function updateEffectsState(isDisabled) {
    // Toggle matrix rain visibility
    toggleMatrixRain(!isDisabled);
    
    // Toggle cursor trail visibility
    toggleCursorTrail(!isDisabled);
    
    // Toggle profile matrix visibility
    toggleProfileMatrix(!isDisabled);
    
    // Toggle custom cursor
    toggleCustomCursor(!isDisabled);
    
    // Add or remove effects-disabled class to html element
    if (isDisabled) {
        document.documentElement.classList.add('effects-disabled');
    } else {
        document.documentElement.classList.remove('effects-disabled');
    }
}

/**
 * Toggle Matrix Rain Visibility
 * @param {boolean} visible - Whether matrix rain should be visible
 */
function toggleMatrixRain(visible) {
    const matrixCanvas = document.querySelector('.matrix-rain-canvas');
    if (matrixCanvas) {
        matrixCanvas.style.display = visible ? 'block' : 'none';
    }
}

/**
 * Toggle Cursor Trail Visibility
 * @param {boolean} visible - Whether cursor trail should be visible
 */
function toggleCursorTrail(visible) {
    // Target the correct container class
    const cursorTrailContainer = document.querySelector('.cursor-trail-container');
    if (cursorTrailContainer) {
        cursorTrailContainer.style.display = visible ? 'block' : 'none';
    }
    
    // Also stop/start the creation of new trail digits
    window.cursorTrailEnabled = visible;
}

/**
 * Toggle Profile Matrix Visibility
 * @param {boolean} visible - Whether profile matrix should be visible
 */
function toggleProfileMatrix(visible) {
    // Target the correct profile matrix elements
    const profileMatrixContainer = document.querySelector('.profile-matrix-container');
    if (profileMatrixContainer) {
        profileMatrixContainer.style.display = visible ? 'block' : 'none';
    }
    
    const profileMatrixRain = document.querySelector('.profile-matrix-rain');
    if (profileMatrixRain) {
        profileMatrixRain.style.display = visible ? 'block' : 'none';
    }
    
    // Also target by ID in case the class selectors don't work
    const profileMatrixRainById = document.getElementById('profile-matrix-rain');
    if (profileMatrixRainById) {
        profileMatrixRainById.style.display = visible ? 'block' : 'none';
    }
}

/**
 * Toggle Custom Cursor
 * @param {boolean} enabled - Whether custom cursor should be enabled
 */
function toggleCustomCursor(enabled) {
    if (enabled) {
        // Restore custom cursor (defined in theme.css)
        document.body.style.cursor = '';
        document.documentElement.style.cursor = '';
    } else {
        // Set default cursor
        document.body.style.cursor = 'default';
        document.documentElement.style.cursor = 'default';
    }
}

/**
 * Save Effects Preference to Local Storage
 */
function saveEffectsPreference(preference) {
    localStorage.setItem('effects', preference);
}

/**
 * Check for Saved Effects Preference
 */
function checkSavedEffectsPreference() {
    const savedPreference = localStorage.getItem('effects');
    const effectsToggle = document.getElementById('effects-toggle');
    
    if (!effectsToggle) return;
    
    if (savedPreference === 'disabled') {
        effectsToggle.classList.add('disabled');
        updateEffectsState(true);
    } else {
        // Default is enabled
        updateEffectsState(false);
    }
}
