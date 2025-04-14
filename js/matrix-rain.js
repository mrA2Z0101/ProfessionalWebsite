/**
 * Matrix Rain Background
 * Creates a matrix-style falling characters effect with no cursor interaction
 * Colors: Primarily cyan blue to match site theme with subtle white highlights
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize matrix rain background
    initMatrixRainBackground();
});

/**
 * Initialize Matrix Rain Background
 */
function initMatrixRainBackground() {
    // Create canvas for matrix rain
    const canvas = document.createElement('canvas');
    canvas.className = 'matrix-rain-canvas';
    document.body.appendChild(canvas);
    
    // Set canvas to full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Get canvas context
    const ctx = canvas.getContext('2d');
    
    // Matrix rain settings
    const fontSize = 9; // Further reduced font size for more subtlety
    // Reduce density by increasing spacing between columns
    const columnSpacing = 2.2; // Further increased spacing for more subtlety
    const columns = Math.ceil(canvas.width / (fontSize * columnSpacing));
    const drops = [];
    const characters = [];
    
    // Generate a set of characters (mix of katakana, numbers, and symbols)
    const katakana = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const latin = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,./<>?';
    
    // Combine character sets with higher probability for katakana
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < katakana.length; j++) {
            characters.push(katakana[j]);
        }
    }
    
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < latin.length; j++) {
            characters.push(latin[j]);
        }
    }
    
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < symbols.length; j++) {
            characters.push(symbols[j]);
        }
    }
    
    // Initialize drops
    for (let i = 0; i < columns; i++) {
        // Randomize starting positions more to create less uniform appearance
        drops[i] = {
            x: (i * fontSize * columnSpacing) + (Math.random() * fontSize * 0.5),
            y: Math.random() * -canvas.height * 2, // Start higher up for more staggered initial appearance
            // Reduce speed for more subtle effect
            speed: 0.3 + Math.random() * 0.8, // Further reduced speed for more subtlety
            // Reduce length for less prominent trails
            length: 2 + Math.floor(Math.random() * 5), // Further reduced length
            characters: [],
            lastCharChangeTime: 0,
            // Add opacity variation for more subtle effect
            opacity: 0.15 + Math.random() * 0.2 // Further reduced opacity range for more subtlety
        };
        
        // Initialize characters for this drop
        for (let j = 0; j < drops[i].length; j++) {
            drops[i].characters.push({
                value: characters[Math.floor(Math.random() * characters.length)],
                // Reduce highlight probability for more subtle effect
                highlight: j === 0 ? (Math.random() > 0.95) : false // Further reduced highlight probability
            });
        }
    }
    
    // Track if we're in light theme
    let isLightTheme = document.documentElement.classList.contains('light-theme');
    
    // Watch for theme changes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'class') {
                isLightTheme = document.documentElement.classList.contains('light-theme');
            }
        });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Recalculate columns
        const newColumns = Math.ceil(canvas.width / (fontSize * columnSpacing));
        
        // Add new columns if needed
        if (newColumns > columns) {
            for (let i = columns; i < newColumns; i++) {
                drops[i] = {
                    x: (i * fontSize * columnSpacing) + (Math.random() * fontSize * 0.5),
                    y: Math.random() * -canvas.height * 2,
                    speed: 0.3 + Math.random() * 0.8,
                    length: 2 + Math.floor(Math.random() * 5),
                    characters: [],
                    lastCharChangeTime: 0,
                    opacity: 0.15 + Math.random() * 0.2
                };
                
                // Initialize characters for this drop
                for (let j = 0; j < drops[i].length; j++) {
                    drops[i].characters.push({
                        value: characters[Math.floor(Math.random() * characters.length)],
                        highlight: j === 0 ? (Math.random() > 0.95) : false
                    });
                }
            }
        }
    });
    
    // Animation loop
    function animate() {
        // More transparent background for more subtle trail effect
        ctx.fillStyle = isLightTheme ? 'rgba(255, 255, 255, 0.015)' : 'rgba(0, 0, 0, 0.015)'; // Further increased transparency
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Set font
        ctx.font = `${fontSize}px 'Source Code Pro', monospace`;
        ctx.textAlign = 'center';
        
        // Update and draw drops
        for (let i = 0; i < drops.length; i++) {
            const drop = drops[i];
            
            // Draw characters in the drop
            for (let j = 0; j < drop.characters.length; j++) {
                const char = drop.characters[j];
                const y = drop.y - j * fontSize;
                
                // Only draw if on screen
                if (y > -fontSize && y < canvas.height) {
                    // Determine color based on position and highlight
                    if (char.highlight) {
                        // Highlighted character (white or bright cyan)
                        ctx.fillStyle = Math.random() > 0.7 ? 'rgba(255, 255, 255, 0.7)' : 'rgba(1, 221, 255, 0.7)'; // Further reduced opacity
                        ctx.shadowColor = '#01ddff';
                        ctx.shadowBlur = 1; // Further reduced glow for subtlety
                    } else if (j === 0) {
                        // First character (bright cyan)
                        ctx.fillStyle = isLightTheme ? 
                            `rgba(0, 153, 179, ${drop.opacity + 0.05})` : // Light theme, further reduced opacity
                            `rgba(1, 221, 255, ${drop.opacity + 0.05})`; // Dark theme, further reduced opacity
                        ctx.shadowBlur = 0;
                    } else {
                        // Trailing characters (fading cyan)
                        const alpha = (1 - (j / drop.length)) * drop.opacity * 0.7; // Further reduced opacity
                        ctx.fillStyle = isLightTheme ? 
                            `rgba(0, 153, 179, ${alpha})` : // Light theme
                            `rgba(1, 221, 255, ${alpha})`; // Dark theme
                        ctx.shadowBlur = 0;
                    }
                    
                    // Draw the character
                    ctx.fillText(char.value, drop.x, y);
                }
            }
            
            // Move drop down
            drop.y += drop.speed;
            
            // Randomly change characters (less frequently for more subtle effect)
            const now = Date.now();
            if (now - drop.lastCharChangeTime > 220) { // Further increased time between changes
                // Change first character
                if (Math.random() > 0.5) { // Reduced probability
                    drop.characters[0].value = characters[Math.floor(Math.random() * characters.length)];
                }
                
                // Occasionally change other characters
                if (Math.random() > 0.98) { // Further reduced probability
                    const randomIndex = 1 + Math.floor(Math.random() * (drop.characters.length - 1));
                    if (randomIndex < drop.characters.length) {
                        drop.characters[randomIndex].value = characters[Math.floor(Math.random() * characters.length)];
                    }
                }
                
                drop.lastCharChangeTime = now;
            }
            
            // Reset drop if it's off screen
            if (drop.y - (drop.length * fontSize) > canvas.height) {
                // Randomize reset position and timing for more natural look
                drop.y = Math.random() * -200 - 50;
                drop.speed = 0.3 + Math.random() * 0.8;
                drop.length = 2 + Math.floor(Math.random() * 5);
                drop.opacity = 0.15 + Math.random() * 0.2; // Further reduced opacity range on reset
                
                // Reset characters
                drop.characters = [];
                for (let j = 0; j < drop.length; j++) {
                    drop.characters.push({
                        value: characters[Math.floor(Math.random() * characters.length)],
                        highlight: j === 0 ? (Math.random() > 0.95) : false
                    });
                }
            }
        }
        
        // Reset shadow blur
        ctx.shadowBlur = 0;
        
        // Continue animation
        requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
}
