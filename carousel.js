document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.carousel');
    const services = document.querySelectorAll('.service');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (!carousel) {
        console.error('Carousel element not found. Check your HTML structure and class names.');
        return;
    }

    let currentIndex = 0;
    let startX, startY, distX, distY;
    let isScrolling = false;
    let autoScrollInterval;
    let slidesPerView = 1;
    let isReversed = false;

    function updateSlidesPerView() {
        const containerWidth = carousel.offsetWidth;
        const slideWidth = services[0].offsetWidth;
        slidesPerView = Math.floor(containerWidth / slideWidth);
        return Math.max(1, slidesPerView);
    }

    function updateCarouselPosition(smooth = true) {
        const slideWidth = services[0].offsetWidth;
        const offset = -currentIndex * slideWidth;
        carousel.style.transition = smooth ? 'transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'none';
        carousel.style.transform = `translateX(${offset}px)`;
    }

    function moveCarousel(direction) {
        const totalSlides = services.length;
        currentIndex += direction;

        if (currentIndex < 0) {
            currentIndex = 0;
            isReversed = false;
        } else if (currentIndex >= (totalSlides + 2) - slidesPerView) {
            currentIndex = totalSlides - slidesPerView;
            isReversed = true;
        }

        updateCarouselPosition();
    }

    function startAutoScroll() {
        stopAutoScroll();
        autoScrollInterval = setInterval(() => {
            moveCarousel(isReversed ? -1 : 1);
        }, 6000);
    }

    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    function handleDragStart(e) {
        stopAutoScroll();
        startX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
        startY = e.type.includes('mouse') ? e.pageY : e.touches[0].pageY;
        isScrolling = false;
        distX = 0;
        distY = 0;
        carousel.style.cursor = 'grabbing';
        e.preventDefault();
    }

    function handleDrag(e) {
        if (!startX || !startY) return;
        
        const x = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
        const y = e.type.includes('mouse') ? e.pageY : e.touches[0].pageY;
        
        distX = x - startX;
        distY = y - startY;

        if (!isScrolling) {
            isScrolling = Math.abs(distX) > Math.abs(distY);
            if (!isScrolling) return;
        }

        e.preventDefault();
        const currentTranslate = -currentIndex * services[0].offsetWidth;
        const translate = currentTranslate + distX;
        carousel.style.transform = `translateX(${translate}px)`;
    }

    function handleDragEnd(e) {
        if (!isScrolling) return;

        const slideWidth = services[0].offsetWidth;
        const movedSlides = Math.round(distX / slideWidth);
        moveCarousel(-movedSlides);

        carousel.style.cursor = 'grab';
        startX = null;
        startY = null;
        isScrolling = false;
        startAutoScroll();
    }

    prevBtn.addEventListener('click', () => moveCarousel(-1));
    nextBtn.addEventListener('click', () => moveCarousel(1));

    carousel.addEventListener('mousedown', handleDragStart);
    carousel.addEventListener('touchstart', handleDragStart, { passive: false });
    carousel.addEventListener('mousemove', handleDrag);
    carousel.addEventListener('touchmove', handleDrag, { passive: false });
    carousel.addEventListener('mouseup', handleDragEnd);
    carousel.addEventListener('touchend', handleDragEnd);
    carousel.addEventListener('mouseleave', handleDragEnd);

    carousel.addEventListener('mouseenter', stopAutoScroll);
    carousel.addEventListener('mouseleave', startAutoScroll);

    window.addEventListener('resize', () => {
        slidesPerView = updateSlidesPerView();
        updateCarouselPosition(false);
    });

    slidesPerView = updateSlidesPerView();
    updateCarouselPosition(false);
    startAutoScroll();

    // Prevent text selection
    carousel.addEventListener('selectstart', (e) => e.preventDefault());
});