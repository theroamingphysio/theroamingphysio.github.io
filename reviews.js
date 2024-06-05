const contactForm = document.getElementById('contact-form');
const testimonialContainer = document.querySelector('.testimonials');

contactForm.addEventListener('submit', function (e) {
	e.preventDefault();
	const formData = new FormData(e.target);
	const data = {};
	for (const [key, value] of formData.entries()) {
		data[key] = value;
	}

	/* The Fetch API */
	fetch(e.target.action, {
		method: 'POST',
		body: new URLSearchParams(data).toString(),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
		.then(response => {
			if (response.ok) {
				const name = data.name;
				const message = data.message;
				const newTestimonial = document.createElement('blockquote');
				newTestimonial.innerHTML = `
        <p>${message}</p>
        <p>- ${name}</p>`;
				testimonialContainer.appendChild(newTestimonial);
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
