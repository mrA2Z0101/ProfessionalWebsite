/**
 * Binary Particles Background
 * Creates a background of 0's and 1's that can be pushed around by the cursor
 * Colors: Cyan and White (White turns Black on light background)
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize binary particles background
    initBinaryParticlesBackground();
});

/**
 * Initialize Binary Particles Background
 */
function initBinaryParticlesBackground() {
    // Create canvas for binary particles
    const canvas = document.createElement('canvas');
    canvas.className = 'binary-particles-canvas';
    document.body.appendChild(canvas);
    
    // Set canvas to full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Get canvas context
    const ctx = canvas.getContext('2d');
    
    // Particle settings
    const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 10000); // Adjust density
    const particles = [];
    
    // Mouse position
    let mouseX = 0;
    let mouseY = 0;
    let mouseRadius = 100; // Radius of influence around cursor
    
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
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: 14 + Math.random() * 6, // Size between 14-20px
            speedX: 0,
            speedY: 0,
            value: Math.random() > 0.5 ? '0' : '1',
            color: Math.random() > 0.5 ? '#01ddff' : '#ffffff', // Cyan or White
            originalX: 0,
            originalY: 0,
            returning: false
        });
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    // Track mouse movement
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animation loop
    function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            
            // Calculate distance from mouse
            const dx = mouseX - p.x;
            const dy = mouseY - p.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // If mouse is close, push particle away
            if (distance < mouseRadius) {
                // Save original position if not already saved
                if (!p.returning) {
                    p.originalX = p.x;
                    p.originalY = p.y;
                    p.returning = true;
                }
                
                // Calculate push force (stronger when closer)
                const force = (mouseRadius - distance) / mouseRadius;
                
                // Push away from cursor
                p.speedX -= dx * force * 0.05;
                p.speedY -= dy * force * 0.05;
            } 
            // If particle was pushed and is now far from cursor, return to original position
            else if (p.returning && distance > mouseRadius * 1.5) {
                // Calculate return force
                const returnDx = p.originalX - p.x;
                const returnDy = p.originalY - p.y;
                const returnDistance = Math.sqrt(returnDx * returnDx + returnDy * returnDy);
                
                // If close to original position, stop returning
                if (returnDistance < 5) {
                    p.returning = false;
                    p.speedX *= 0.9;
                    p.speedY *= 0.9;
                } else {
                    // Move towards original position
                    p.speedX += returnDx * 0.01;
                    p.speedY += returnDy * 0.01;
                }
            }
            
            // Apply friction
            p.speedX *= 0.95;
            p.speedY *= 0.95;
            
            // Update position
            p.x += p.speedX;
            p.y += p.speedY;
            
            // Keep particles on screen
            if (p.x < 0) p.x = 0;
            if (p.x > canvas.width) p.x = canvas.width;
            if (p.y < 0) p.y = 0;
            if (p.y > canvas.height) p.y = canvas.height;
            
            // Set font and text alignment
            ctx.font = `${p.size}px 'Courier New', monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            // Determine color based on particle color and theme
            if (p.color === '#ffffff' && isLightTheme) {
                // White particles become black on light theme
                ctx.fillStyle = '#000000';
            } else {
                ctx.fillStyle = p.color;
            }
            
            // Add glow effect
            if (p.color === '#01ddff') {
                ctx.shadowColor = '#01ddff';
                ctx.shadowBlur = 5;
            } else {
                ctx.shadowBlur = 0;
            }
            
            // Draw the particle
            ctx.fillText(p.value, p.x, p.y);
            ctx.shadowBlur = 0;
        }
        
        // Continue animation
        requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
}
