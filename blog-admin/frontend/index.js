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
