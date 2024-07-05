// functions.js

/**
 * getServerAddress - gets the Ip Adress: 0.0.0.0 and port: 0000
 * 					of The backend server // Needs a 3rd party mitigator for security
 * @returns URL of server and port.
 */
function getServerAddress() {
	// Fetch server info when the page loads
	return fetch(`${serverUrl}/api/server-info'`)
		.then(response => response.json())
		.then(data => {
			serverUrl = `http://${data.ipAddress}:${data.port}`;
			console.log('Server URL:', serverUrl);
		})
		.catch(error => {
			console.error('Error fetching server info:', error);
			serverUrl = '/'; // Fallback to relative path if fetch fails
		});
};

/**
 * loadBlogArticles - adds blog articles to preview, if any
 * @returns : No blog post avilabe if No blog posts have been added
 * 			and or don't exist in memory
 */
function loadBlogArticles() {
    let blogArticles = JSON.parse(localStorage.getItem('blogPosts')) || [];
    if (!blogArticles.length) {
        blogContainer.innerHTML = '<p>No blog posts available.</p>';
        loadMoreButton.style.display = 'none';
        return;
    }
    const endIndex = currentIndex + articlesPerLoad;
    for (let i = currentIndex; i < endIndex && i < blogArticles.length; i++) {
        const article = blogArticles[i];
        const articleElement = document.createElement('article');
        articleElement.innerHTML = `
        <div class="blog-preview-container">
        <img class="blog-image" src="/blog-admin/backend${article.image}" alt="${article.title}">
        <div class="blog-preview-content">
            <h3>${article.title}</h3>
            <p><em>${article.date}</em> - ${article.excerpt} <a href="#">Read more</a></p>
        </div>
    </div>
        `;
        blogContainer.appendChild(articleElement);
    }
    currentIndex = endIndex;
    if (currentIndex >= blogArticles.length) {
        loadMoreButton.style.display = 'none';
    }
}


/**
 * fetchTestimonials - Fetches Data sets on the reviews posted on 
 * 		the home page from Google Sheets using script extension i wrote.
 */
function fetchTestimonials() {
    fetch('https://script.google.com/macros/s/AKfycbxrhCip6lJoyNPN5zExEhprtisD6KKpUOPXTWbtGVA6LqLzgX0mkp-PdtA8DiDxw54_/exec') // URL of your Google Apps Script
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

/**
 * addTestimonial - Adds fetched testimonials 
 * 					to the reiews and testimonial section.
 */
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

export function getServerAddress() {}
export function loadBlogArticles () {}
export function  fetchTestimonials () {}
export function addTestimonial () {}