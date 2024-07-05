// In your script.js file
/*const blogArticles = [
	{
		title: '5 Exercises to Improve Your Posture',
		date: 'May 15, 2024',
		excerpt: 'Good posture is crucial for overall health. Here are five exercises to help you maintain a healthy posture...',
		link: '#'
	},
	{
		title: 'How to Prevent Workplace Injuries',
		date: 'May 22, 2024',
		excerpt: 'Workplace injuries are common but preventable. Follow these tips to create a safer work environment...',
		link: '#'
	},
	]; */

	// Add more blog article objects here
    // blog.js
const blogContainer = document.querySelector('.blog-articles');
const loadMoreButton = document.querySelector('.load-more');
let currentIndex = 0;
const articlesPerLoad = 2;

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

document.addEventListener('DOMContentLoaded', loadBlogArticles);
loadMoreButton.addEventListener('click', loadBlogArticles);

console.log(localStorage.getItem('blogPosts'));