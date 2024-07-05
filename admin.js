// admin.js

import { getServerAddress } from "./login";

serverUrl = getServerAddress; // LAter Inut backend server url


document.getElementById('blog-form').addEventListener('submit', function (e) {
    e.preventDefault();
    
    if (!serverUrl) {
        alert('Server information not available. Please try again.');
        return;
    }
    
    const formData = new FormData();
    const imageFile = document.getEl
    
    formData.append('title', document.getElementById('title').value);
    formData.append('date', document.getElementById('date').value);
    formData.append('excerpt', document.getElementById('excerpt').value);
    formData.append('content', document.getElementById('content').value);
    formData.append('image', imageFile);
    
    
    fetch(`${serverUrl}/upload`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.imageUrl) {
            const blogPost = {
                title: document.getElementById('title').value,
                date: document.getElementById('date').value,
                excerpt: document.getElementById('excerpt').value,
                content: document.getElementById('content').value,
                    image: data.imageUrl
                };
                let blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
                blogPosts.push(blogPost);
                localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
                alert('Blog post published!');
                this.reset();
            } else {
                alert('Image upload failed');
            }
        })
        .catch(error => console.error('Error:', error));
});
