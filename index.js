window.onload = function () {
    document.body.classList.remove('loading');
};

// JavaScript functionality can be added here
document.addEventListener('DOMContentLoaded', function () {
    // Example: Scroll to section when navigation link is clicked
    document.querySelectorAll('nav a').forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Burger Menu Functionality
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    const closeBtn = document.querySelector('.close-btn');

    burgerMenu.addEventListener('click', function () {
        this.classList.toggle('change');
        mobileNav.style.display = mobileNav.style.display === 'block' ? 'none' : 'block';
    });

    closeBtn.addEventListener('click', function() {
        burgerMenu.classList.remove('change');
        mobileNav.style.display = 'none';
    });


    // Close mobile nav when clicking outside the menu
    window.addEventListener('click', function (e) {
        if (!e.target.matches('.burger-menu') && !mobileNav.contains(e.target)) {
            burgerMenu.classList.remove('change');
            mobileNav.style.display = 'none';
        }
    });

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        // add code here to handle form submission
        // send data to a server or display a success message
        console.log('Form submitted!');
        contactForm.reset();
    });
});
