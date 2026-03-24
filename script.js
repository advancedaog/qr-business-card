// Add 3D effect logic dynamically and handle tap logic
document.addEventListener("DOMContentLoaded", () => {
    const cardContainer = document.querySelector('.card');
    let isFlipped = false;

    // Apply a simple vanilla JS tilt effect for modern devices
    // This gives a cool 3D illusion when hovering over the card with a mouse
    const scene = document.querySelector('.scene');
    
    scene.addEventListener("mousemove", (e) => {
        if (isFlipped) return; // don't tilt if flipped
        
        const rect = scene.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element.
        const y = e.clientY - rect.top;  // y position within the element.
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate offset (max tilt ~10 deg)
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        
        cardContainer.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        cardContainer.style.transition = 'none'; // remove transition for smooth follow
    });
    
    // Reset to idle state when mouse leaves
    scene.addEventListener("mouseleave", () => {
        if (isFlipped) return;
        cardContainer.style.transition = 'transform 0.5s ease';
        cardContainer.style.transform = 'rotateX(0) rotateY(0)';
    });

    // Prevent flip when clicking phone/email links explicitly
    const links = document.querySelectorAll('.link');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });

    // Handle the tap / click action on the card
    cardContainer.addEventListener('click', (e) => {
        if (isFlipped) return; // Prevent double trigger
        
        isFlipped = true;
        
        // Ensure smooth flip transition
        cardContainer.style.transition = 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        
        // Add the flip class
        cardContainer.classList.add('is-flipped');
        
        // Redirect logic triggered after animation ends
        setTimeout(() => {
            window.location.href = "https://advancedaog.com"; // Company Website Redirect
        }, 800); 
    });

    // Reset state when coming back from browser history (e.g back button)
    window.addEventListener('pageshow', (e) => {
        if (e.persisted || isFlipped) {
            isFlipped = false;
            cardContainer.classList.remove('is-flipped');
        }
    });
});
