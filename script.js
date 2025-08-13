// script.js for EcoFresh website
// Handles the infinite slider and any future interactive features

// Product/category slider logic
window.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('categorySlider');
    if (!slider) return;
    let slides = Array.from(slider.children);
    const slideCount = slides.length;

    // Clone all slides twice for seamless infinite effect
    slides.forEach(slide => {
        slider.appendChild(slide.cloneNode(true));
    });
    slides.forEach(slide => {
        slider.appendChild(slide.cloneNode(true));
    });

    slides = Array.from(slider.children); // update slides
    const slideWidth = slides[0].offsetWidth + 20; // 20px gap
    let animationId;
    let speed = 1.5; // px per frame

    // Start from the first original set
    slider.scrollLeft = slideCount * slideWidth;

    function continuousSlide() {
        slider.scrollLeft += speed;
        // If we've scrolled past the second set, reset to the first set
        if (slider.scrollLeft >= slideWidth * (slideCount * 2)) {
            slider.scrollLeft = slideCount * slideWidth;
        }
        animationId = requestAnimationFrame(continuousSlide);
    }

    // Pause on hover
    slider.addEventListener('mouseenter', () => cancelAnimationFrame(animationId));
    slider.addEventListener('mouseleave', () => continuousSlide());

    // Manual buttons (optional, still work)
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            slider.scrollLeft += slideWidth;
        });
        prevBtn.addEventListener('click', () => {
            slider.scrollLeft -= slideWidth;
        });
    }

    // Start animation
    continuousSlide();
});
