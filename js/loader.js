/**
 * Matrix Rain Loading Animation
 * Creates a cyberpunk-style matrix rain effect with 0's and 1's
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize matrix rain
    initMatrixRain();
    
    // Hide loader after page is fully loaded
    window.addEventListener('load', function() {
        setTimeout(function() {
            const loader = document.getElementById('loader');
            loader.classList.add('hidden');
            
            // Remove loader from DOM after transition completes
            setTimeout(function() {
                loader.style.display = 'none';
            }, 500);
        }, 1000); // Show loading animation for at least 1 second
    });
});

/**
 * Initialize Matrix Rain Animation
 */
function initMatrixRain() {
    const matrixRain = document.getElementById('matrix-rain');
    const windowWidth = window.innerWidth;
    const numColumns = Math.floor(windowWidth / 30); // Column width is 30px
    
    // Create matrix columns
    for (let i = 0; i < numColumns; i++) {
        createMatrixColumn(matrixRain, i, numColumns);
    }
}

/**
 * Create a single matrix column
 */
function createMatrixColumn(container, index, totalColumns) {
    const column = document.createElement('div');
    column.className = 'matrix-column';
    
    // Set column position and animation
    const columnWidth = 100 / totalColumns;
    column.style.left = (index * columnWidth) + '%';
    column.style.width = columnWidth + '%';
    
    // Random animation duration between 3 and 8 seconds
    const duration = 3 + Math.random() * 5;
    column.style.animationDuration = duration + 's';
    
    // Random animation delay
    const delay = Math.random() * 2;
    column.style.animationDelay = delay + 's';
    
    // Add binary digits (0's and 1's)
    const numDigits = Math.floor(Math.random() * 15) + 10; // 10-25 digits per column
    
    for (let i = 0; i < numDigits; i++) {
        const digit = document.createElement('div');
        digit.className = 'matrix-digit';
        
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
