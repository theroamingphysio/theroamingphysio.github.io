const contactForm = document.getElementById('contact-form');
const testimonialContainer = document.querySelector('.testimonials');

function addTestimonial(name, message) {
    const testimonialList = document.querySelector('.testimonial-list');
    const newTestimonial = document.createElement('blockquote');
    newTestimonial.innerHTML = `
        <div class="testimonial-img"></div>
        <div>
            <p>${message}</p>
            <p>- ${name}</p>
        </div>
    `;
    testimonialList.appendChild(newTestimonial);
}

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }

    fetch(e.target.action, {
        method: 'POST',
        body: new URLSearchParams(data).toString(),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        mode: 'cors'
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            fetchTestimonials(); // Fetch and update testimonials after form submission
            contactForm.reset();
            alert('Thank you for your message!');
        } else {
            alert('An error occurred. Please try again later.');
        }
    })
    .catch(error => {
        alert('An error occurred. Please try again later.');
        console.error('Error:', error);
    });
});

function fetchTestimonials() {
    fetch('YOUR_SCRIPT_URL') // URL of your Google Apps Script
    .then(response => response.json())
    .then(testimonials => {
        const testimonialList = document.querySelector('.testimonial-list');
        testimonialList.innerHTML = ''; // Clear current testimonials
        testimonials.forEach(testimonial => {
            addTestimonial(testimonial.name, testimonial.message);
        });
    })
    .catch(error => console.error('Error fetching testimonials:', error));
}

// Fetch testimonials when the page loads
document.addEventListener('DOMContentLoaded', fetchTestimonials);
