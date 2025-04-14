/**
 * Matrix Rain Animation for Profile Image
 * Creates a cyberpunk-style matrix rain effect with 0's and 1's on the profile image
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize matrix rain for profile image
    initProfileMatrixRain();
});

/**
 * Initialize Matrix Rain Animation for Profile Image
 */
function initProfileMatrixRain() {
    // Create container for matrix rain
    const profileContainer = document.querySelector('.profile-image-container');
    
    if (!profileContainer) return;
    
    // Create matrix container
    const matrixContainer = document.createElement('div');
    matrixContainer.className = 'profile-matrix-container';
    
    // Create matrix rain element
    const matrixRain = document.createElement('div');
    matrixRain.className = 'profile-matrix-rain';
    matrixRain.id = 'profile-matrix-rain';
    
    // Append elements
    matrixContainer.appendChild(matrixRain);
    profileContainer.appendChild(matrixContainer);
    
    // Create matrix columns
    createProfileMatrixColumns(matrixRain);
}

/**
 * Create Matrix Columns for Profile Image
 */
function createProfileMatrixColumns(container) {
    const containerWidth = 300; // Width of profile image container
    const columnWidth = 15; // Width of each column in pixels
    const numColumns = Math.floor(containerWidth / columnWidth);
    
    // Create matrix columns
    for (let i = 0; i < numColumns; i++) {
        createProfileMatrixColumn(container, i, numColumns);
    }
}

/**
 * Create a single matrix column for profile image
 */
function createProfileMatrixColumn(container, index, totalColumns) {
    const column = document.createElement('div');
    column.className = 'profile-matrix-column';
    
    // Set column position and animation
    const columnWidth = 100 / totalColumns;
    column.style.left = (index * columnWidth) + '%';
    column.style.width = columnWidth + '%';
    
    // Random animation duration between 2 and 5 seconds
    const duration = 2 + Math.random() * 3;
    column.style.animationDuration = duration + 's';
    
    // Random animation delay
    const delay = Math.random() * 2;
    column.style.animationDelay = delay + 's';
    
    // Add binary digits (0's and 1's)
    const numDigits = Math.floor(Math.random() * 10) + 8; // 8-18 digits per column
    
    for (let i = 0; i < numDigits; i++) {
        const digit = document.createElement('div');
        digit.className = 'profile-matrix-digit';
        
        // Randomly choose 0 or 1
        digit.textContent = Math.random() > 0.5 ? '0' : '1';
        
        // Randomly make some digits brighter
        if (Math.random() < 0.2) {
            digit.classList.add('bright');
        }
        
        column.appendChild(digit);
    }
    
    container.appendChild(column);
}
