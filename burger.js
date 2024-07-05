// burger.js
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
