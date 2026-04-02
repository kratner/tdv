// Slide viewer configuration
const CONFIG = {
    totalSlides: 15,
    imageFolder: 'trans-dimensional-voyager-original',
    imagePrefix: 'tdv-',
    imageExtension: '.png',
    autoplayInterval: 3000,
    helpDisplayDuration: 3000
};

// State management
const state = {
    currentSlide: 1,
    isAutoplay: false,
    autoplayTimer: null,
    touchStartX: 0,
    touchEndX: 0
};

// DOM elements
const elements = {
    slideImage: document.querySelector('.slide-image'),
    currentSlideSpan: document.querySelector('.current-slide'),
    totalSlidesSpan: document.querySelector('.total-slides'),
    prevBtn: document.querySelector('.prev-btn'),
    nextBtn: document.querySelector('.next-btn'),
    fullscreenBtn: document.querySelector('.fullscreen-btn'),
    autoplayBtn: document.querySelector('.autoplay-btn'),
    playIcon: document.querySelector('.play-icon'),
    pauseIcon: document.querySelector('.pause-icon'),
    thumbnailContainer: document.querySelector('.thumbnail-container'),
    helpOverlay: document.querySelector('.help-overlay'),
    viewerContainer: document.querySelector('.viewer-container')
};

// Initialize the viewer
function init() {
    elements.totalSlidesSpan.textContent = CONFIG.totalSlides;
    generateThumbnails();
    loadSlide(1);
    attachEventListeners();
    showHelpOverlay();
}

// Generate thumbnail navigation
function generateThumbnails() {
    for (let i = 1; i <= CONFIG.totalSlides; i++) {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'thumbnail';
        thumbnail.dataset.slide = i;
        
        const img = document.createElement('img');
        img.src = getImagePath(i);
        img.alt = `Slide ${i}`;
        img.loading = 'lazy';
        
        const number = document.createElement('div');
        number.className = 'thumbnail-number';
        number.textContent = i;
        
        thumbnail.appendChild(img);
        thumbnail.appendChild(number);
        thumbnail.addEventListener('click', () => goToSlide(i));
        
        elements.thumbnailContainer.appendChild(thumbnail);
    }
}

// Get image path
function getImagePath(slideNumber) {
    const paddedNumber = String(slideNumber).padStart(2, '0');
    return `${CONFIG.imageFolder}/${CONFIG.imagePrefix}${paddedNumber}${CONFIG.imageExtension}`;
}

// Load a specific slide
function loadSlide(slideNumber) {
    if (slideNumber < 1 || slideNumber > CONFIG.totalSlides) return;
    
    state.currentSlide = slideNumber;
    
    // Remove loaded class for transition
    elements.slideImage.classList.remove('loaded');
    
    // Update image
    const img = new Image();
    img.onload = () => {
        elements.slideImage.src = img.src;
        elements.slideImage.alt = `Slide ${slideNumber}`;
        setTimeout(() => {
            elements.slideImage.classList.add('loaded');
        }, 50);
    };
    img.src = getImagePath(slideNumber);
    
    // Update UI
    elements.currentSlideSpan.textContent = slideNumber;
    updateThumbnailActive();
    updateNavigationButtons();
    scrollThumbnailIntoView(slideNumber);
}

// Navigate to a specific slide
function goToSlide(slideNumber) {
    loadSlide(slideNumber);
}

// Navigate to next slide
function nextSlide() {
    if (state.currentSlide < CONFIG.totalSlides) {
        loadSlide(state.currentSlide + 1);
    } else if (state.isAutoplay) {
        // Loop back to first slide when autoplay is on
        loadSlide(1);
    }
}

// Navigate to previous slide
function prevSlide() {
    if (state.currentSlide > 1) {
        loadSlide(state.currentSlide - 1);
    }
}

// Update thumbnail active state
function updateThumbnailActive() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, index) => {
        if (index + 1 === state.currentSlide) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
}

// Update navigation button states
function updateNavigationButtons() {
    elements.prevBtn.disabled = state.currentSlide === 1;
    elements.nextBtn.disabled = state.currentSlide === CONFIG.totalSlides && !state.isAutoplay;
}

// Scroll thumbnail into view
function scrollThumbnailIntoView(slideNumber) {
    const thumbnail = document.querySelector(`.thumbnail[data-slide="${slideNumber}"]`);
    if (thumbnail) {
        thumbnail.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
    }
}

// Toggle autoplay
function toggleAutoplay() {
    state.isAutoplay = !state.isAutoplay;
    
    if (state.isAutoplay) {
        elements.playIcon.classList.add('hidden');
        elements.pauseIcon.classList.remove('hidden');
        startAutoplay();
    } else {
        elements.playIcon.classList.remove('hidden');
        elements.pauseIcon.classList.add('hidden');
        stopAutoplay();
    }
    
    updateNavigationButtons();
}

// Start autoplay
function startAutoplay() {
    stopAutoplay(); // Clear any existing timer
    state.autoplayTimer = setInterval(() => {
        nextSlide();
    }, CONFIG.autoplayInterval);
}

// Stop autoplay
function stopAutoplay() {
    if (state.autoplayTimer) {
        clearInterval(state.autoplayTimer);
        state.autoplayTimer = null;
    }
}

// Toggle fullscreen
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        elements.viewerContainer.requestFullscreen().catch(err => {
            console.error('Error attempting to enable fullscreen:', err);
        });
    } else {
        document.exitFullscreen();
    }
}

// Show help overlay
function showHelpOverlay() {
    elements.helpOverlay.classList.add('show');
    setTimeout(() => {
        elements.helpOverlay.classList.remove('show');
    }, CONFIG.helpDisplayDuration);
}

// Handle keyboard navigation
function handleKeyPress(e) {
    switch(e.key) {
        case 'ArrowLeft':
            prevSlide();
            break;
        case 'ArrowRight':
            nextSlide();
            break;
        case ' ':
            e.preventDefault();
            toggleAutoplay();
            break;
        case 'f':
        case 'F':
            toggleFullscreen();
            break;
        case 'Escape':
            if (state.isAutoplay) {
                toggleAutoplay();
            }
            break;
    }
}

// Handle touch events for swipe
function handleTouchStart(e) {
    state.touchStartX = e.changedTouches[0].screenX;
}

function handleTouchEnd(e) {
    state.touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = state.touchStartX - state.touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next slide
            nextSlide();
        } else {
            // Swipe right - previous slide
            prevSlide();
        }
    }
}

// Attach event listeners
function attachEventListeners() {
    // Navigation buttons
    elements.prevBtn.addEventListener('click', prevSlide);
    elements.nextBtn.addEventListener('click', nextSlide);
    
    // Control buttons
    elements.fullscreenBtn.addEventListener('click', toggleFullscreen);
    elements.autoplayBtn.addEventListener('click', toggleAutoplay);
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyPress);
    
    // Touch events
    elements.slideViewer = document.querySelector('.slide-viewer');
    elements.slideViewer.addEventListener('touchstart', handleTouchStart, { passive: true });
    elements.slideViewer.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    // Stop autoplay when user interacts
    elements.prevBtn.addEventListener('click', () => {
        if (state.isAutoplay) toggleAutoplay();
    });
    elements.nextBtn.addEventListener('click', () => {
        if (state.isAutoplay) toggleAutoplay();
    });
    
    // Show help overlay on hover over controls
    elements.helpOverlay.addEventListener('mouseenter', () => {
        elements.helpOverlay.classList.add('show');
    });
    
    // Handle visibility change (pause autoplay when tab is hidden)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && state.isAutoplay) {
            stopAutoplay();
        } else if (!document.hidden && state.isAutoplay) {
            startAutoplay();
        }
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
