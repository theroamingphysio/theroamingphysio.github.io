// blog.js

import { loadBlogArticles } from "./functions";

const blogContainer = document.querySelector('.blog-articles');
const loadMoreButton = document.querySelector('.load-more');
let currentIndex = 0;
const articlesPerLoad = 2;

document.addEventListener('DOMContentLoaded', loadBlogArticles);
loadMoreButton.addEventListener('click', loadBlogArticles);

console.log(localStorage.getItem('blogPosts'));