/**
 * Sound Control Functionality
 * Toggles sound effects on and off
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize sound toggle
    initSoundToggle();
    
    // Check for saved sound preference
    checkSavedSoundPreference();
});

/**
 * Initialize Sound Toggle Button
 */
function initSoundToggle() {
    const soundToggle = document.getElementById('sound-toggle');
    const soundIcon = document.getElementById('sound-icon');
    
    if (!soundToggle || !soundIcon) return;
    
    soundToggle.addEventListener('click', function() {
        // Toggle muted state
        const isMuted = soundToggle.classList.toggle('muted');
        
        // Update icon based on current state
        if (isMuted) {
            soundIcon.classList.remove('fa-volume-high');
            soundIcon.classList.add('fa-volume-xmark');
            saveSoundPreference('muted');
        } else {
            soundIcon.classList.remove('fa-volume-xmark');
            soundIcon.classList.add('fa-volume-high');
            saveSoundPreference('unmuted');
        }
        
        // Update global sound state
        updateSoundState(isMuted);
        
        // Play click sound if not muted
        if (!isMuted && typeof clickSound !== 'undefined') {
            clickSound.currentTime = 0;
            clickSound.play();
        }
    });
    
    // Add hover sound effect if available and not muted
    soundToggle.addEventListener('mouseenter', function() {
        if (!soundToggle.classList.contains('muted') && typeof hoverSound !== 'undefined') {
            hoverSound.currentTime = 0;
            hoverSound.play();
        }
    });
}

/**
 * Update Sound State
 * @param {boolean} isMuted - Whether sound should be muted
 */
function updateSoundState(isMuted) {
    // Set volume for all sound elements
    if (typeof clickSound !== 'undefined') {
        clickSound.volume = isMuted ? 0 : 0.3;
    }
    
    if (typeof hoverSound !== 'undefined') {
        hoverSound.volume = isMuted ? 0 : 0.15;
    }
}

/**
 * Save Sound Preference to Local Storage
 */
function saveSoundPreference(preference) {
    localStorage.setItem('sound', preference);
}

/**
 * Check for Saved Sound Preference
 */
function checkSavedSoundPreference() {
    const savedPreference = localStorage.getItem('sound');
    const soundToggle = document.getElementById('sound-toggle');
    const soundIcon = document.getElementById('sound-icon');
    
    if (!soundToggle || !soundIcon) return;
    
    if (savedPreference === 'muted') {
        soundToggle.classList.add('muted');
        soundIcon.classList.remove('fa-volume-high');
        soundIcon.classList.add('fa-volume-xmark');
        updateSoundState(true);
    } else {
        // Default is unmuted
        updateSoundState(false);
    }
}
