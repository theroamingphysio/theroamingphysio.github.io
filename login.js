// login.js
import { getServerAddress } from "./functions.js";

document.getElementById('loginForm').addEventListener('submit', async (event) => {
	event.preventDefault();

	const username = document.getElementById('username').value;
	const password = document.getElementById('password').value;

	serverURL = getServerAddress();

	try {
		const response = await fetch(`${serverURL}/api/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username, password })
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || 'Network response was not ok');
		}

		const data = await response.json();
		console.log('Login successful:', data);
		// Handle successful login
	} catch (error) {
		console.error('Error during login:', error.message);
		/* Display user Error */
		alert(error.message);
	}
});

/* Hide and Unhide password */
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePassword.addEventListener('click', function () {
	// Toggle the type attribute
	const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
	passwordInput.setAttribute('type', type);
	// Toggle the eye slash icon
	this.classList.toggle('fa-eye-slash');
});

