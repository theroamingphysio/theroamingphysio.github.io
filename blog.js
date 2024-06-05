// In your script.js file
const blogArticles = [
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
	// Add more blog article objects here
];

const blogContainer = document.querySelector('.blog-articles');
const loadMoreButton = document.querySelector('.load-more');
let currentIndex = 0;
const articlesPerLoad = 2;

function loadBlogArticles() {
	const endIndex = currentIndex + articlesPerLoad;
	for (let i = currentIndex; i < endIndex && i < blogArticles.length; i++) {
		const article = blogArticles[i];
		const articleElement = document.createElement('article');
		articleElement.innerHTML = `
		<h3>${article.title}</h3>
		<p><em>${article.date}</em> - ${article.excerpt} <a href="${article.link}">Read more</a></p>`;
		blogContainer.appendChild(articleElement);
	}
	currentIndex = endIndex;
	if (currentIndex >= blogArticles.length) {
		loadMoreButton.style.display = 'none';
	}
}

loadBlogArticles();

loadMoreButton.addEventListener('click', loadBlogArticles);