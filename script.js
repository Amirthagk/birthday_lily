document.addEventListener("DOMContentLoaded", () => {
    const introOverlay = document.getElementById("intro-overlay");
    const mainContainer = document.getElementById("main-container");
    const bgMusic = document.getElementById("bg-music");
    const stem = document.getElementById("stem");
    const leafLeft = document.getElementById("leaf-left");
    const leafRight = document.getElementById("leaf-right");
    const base = document.getElementById("base");
    const bloom = document.getElementById("bloom");
    const title = document.querySelector(".birthday-title");
    const message = document.querySelector(".birthday-message");
    
    // Canvas Fireflies Setup
    const canvas = document.getElementById("fireflies");
    const ctx = canvas.getContext("2d");
    let width, height, fireflies = [];
    
    function initCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        fireflies = [];
        const numFireflies = window.innerWidth < 768 ? 50 : 150;
        
        for (let i = 0; i < numFireflies; i++) {
            fireflies.push({
                x: Math.random() * width,
                y: Math.random() * height,
                s: Math.random() * 2 + 0.5, // size
                vx: (Math.random() - 0.5) * 0.5, // velocity x
                vy: (Math.random() - 0.5) * 0.5, // velocity y
                alpha: Math.random(),
                pulseSpeed: Math.random() * 0.02 + 0.01
            });
        }
    }
    
    function drawFireflies() {
        ctx.clearRect(0, 0, width, height);
        fireflies.forEach(f => {
            f.x += f.vx;
            f.y += f.vy;
            f.alpha += f.pulseSpeed;
            
            // Wrap around edges
            if (f.x < 0) f.x = width;
            if (f.x > width) f.x = 0;
            if (f.y < 0) f.y = height;
            if (f.y > height) f.y = 0;
            
            const currentAlpha = (Math.sin(f.alpha) + 1) / 2; // pulse effect 0 to 1
            
            ctx.beginPath();
            ctx.arc(f.x, f.y, f.s, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 230, 150, ${currentAlpha})`;
            ctx.shadowBlur = 10;
            ctx.shadowColor = "#ffeb3b";
            ctx.fill();
        });
        requestAnimationFrame(drawFireflies);
    }
    
    window.addEventListener("resize", initCanvas);
    initCanvas();
    drawFireflies();

    // Start Experience on Click
    introOverlay.addEventListener("click", () => {
        // Hide overlay
        introOverlay.style.opacity = 0;
        setTimeout(() => introOverlay.style.display = 'none', 1000);
        
        // Show main container
        mainContainer.classList.remove("hidden");
        
        // Play audio safely
        bgMusic.volume = 0.5;
        bgMusic.play().catch(e => console.log("Audio playback failed:", e));
        
        // Start Animations Sequence
        startSequence();
    });
    
    function startSequence() {
        // 1. Grow stem
        setTimeout(() => {
            stem.classList.add("grow");
        }, 500);
        
        // 2. Grow leaves
        setTimeout(() => {
            leafLeft.classList.add("grow");
            leafRight.classList.add("grow");
            base.style.opacity = 1; // show base softly
        }, 3000);
        
        // 3. Bloom Lily
        setTimeout(() => {
            bloom.classList.add("grow");
        }, 4500);
        
        // 4. Set continuous breathing animation on bloom
        setTimeout(() => {
            bloom.classList.add("breathe");
        }, 8500);
        
        // 5. Show Messages
        setTimeout(() => {
            title.classList.add("show");
            message.classList.add("show");
        }, 9000);
    }
});
