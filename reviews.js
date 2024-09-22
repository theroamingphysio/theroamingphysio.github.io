// reviews.js

import { fetchTestimonials, addTestimonial } from "./functions";

const contactForm = document.getElementById('contact-form');
const testimonialContainer = document.querySelector('.testimonials');

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

// Fetch testimonials when the page loads
document.addEventListener('DOMContentLoaded', fetchTestimonials);
