/**
 * Theme Switching Functionality
 * Toggles between dark and light mode
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme toggle
    initThemeToggle();
    
    // Check for saved theme preference
    checkSavedTheme();
});

/**
 * Initialize Theme Toggle Button
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    if (!themeToggle || !themeIcon) return;
    
    themeToggle.addEventListener('click', function() {
        // Toggle light theme class on root element
        document.documentElement.classList.toggle('light-theme');
        
        // Update icon based on current theme
        if (document.documentElement.classList.contains('light-theme')) {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            saveThemePreference('light');
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            saveThemePreference('dark');
        }
        
        // Play click sound if available
        if (typeof clickSound !== 'undefined') {
            clickSound.currentTime = 0;
            clickSound.play();
        }
    });
    
    // Add hover sound effect if available
    themeToggle.addEventListener('mouseenter', function() {
        if (typeof hoverSound !== 'undefined') {
            hoverSound.currentTime = 0;
            hoverSound.play();
        }
    });
}

/**
 * Save Theme Preference to Local Storage
 */
function saveThemePreference(theme) {
    localStorage.setItem('theme', theme);
}

/**
 * Check for Saved Theme Preference
 */
function checkSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeIcon = document.getElementById('theme-icon');
    
    if (savedTheme === 'light') {
        document.documentElement.classList.add('light-theme');
        if (themeIcon) {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }
}
