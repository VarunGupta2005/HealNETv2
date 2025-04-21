const loginForm = document.querySelector(".login-form");
const registerForm = document.querySelector(".register-form");
const wrapper = document.querySelector(".wrapper");
const loginTitle = document.querySelector(".title-login");
const registerTitle = document.querySelector(".title-register");
const signUpBtn = document.querySelector("#SignUpBtn");
const signInBtn = document.querySelector("#SignInBtn");

function loginFunction() {
    loginForm.style.left = "50%";
    loginForm.style.opacity = 1;
    registerForm.style.left = "150%";
    registerForm.style.opacity = 0;
    wrapper.style.height = "500px";
    loginTitle.style.top = "50%";
    loginTitle.style.opacity = 1;
    registerTitle.style.top = "50px";
    registerTitle.style.opacity = 0;
}

function registerFunction() {
    loginForm.style.left = "-50%";
    loginForm.style.opacity = 0;
    registerForm.style.left = "50%";
    registerForm.style.opacity = 1;
    wrapper.style.height = "580px";
    loginTitle.style.top = "-60px";
    loginTitle.style.opacity = 0;
    registerTitle.style.top = "50%";
    registerTitle.style.opacity = 1;
}

// Utility function to show alerts
function showAlert(message, type = 'error') { // Default type to error
    // Check if an alert element already exists
    let alertBox = document.querySelector('.auth-alert');
    if (!alertBox) {
        // Create the alert element if it doesn't exist
        alertBox = document.createElement('div');
        alertBox.className = 'auth-alert';
        // Prepend it inside the wrapper for better visibility
        wrapper.prepend(alertBox);
    }

    // Set message and style
    alertBox.textContent = message;
    alertBox.className = `auth-alert show ${type}`; // Add 'show' class

    // Automatically hide after 5 seconds
    setTimeout(() => {
        alertBox.classList.remove('show');
        // Optional: Remove the element after fade out if you prefer
        // setTimeout(() => alertBox.remove(), 500); 
    }, 5000);
}

// Handle user registration form submission
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission

    const username = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-pass').value;
    const agreeCheckbox = document.getElementById('agree');

    // Basic Frontend Validation
    if (!username || !email || !password) {
        showAlert('Please fill in all fields.');
        return;
    }
    if (!agreeCheckbox.checked) {
        showAlert('You must agree to the terms and conditions.');
        return;
    }
    // Very basic email format check (more robust validation on backend)
    if (!/\S+@\S+\.\S+/.test(email)) {
        showAlert('Please enter a valid email address.');
        return;
    }
    if (password.length < 6) {
        showAlert('Password must be at least 6 characters long.');
        return;
    }

    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            showAlert('Registration successful! Redirecting...', 'success');
            // Optional: Store token in localStorage if needed for immediate UI changes
            // localStorage.setItem('token', data.token);

            // Redirect to the main application page after a short delay
            setTimeout(() => {
                // Adjust the path as necessary relative to the login folder
                window.location.href = '/app'; // Changed redirect path
            }, 1500); // 1.5 second delay
        } else {
            // Use the error message from the backend if available
            showAlert(data.message || 'Registration failed. Please try again.');
        }
    } catch (error) {
        console.error('Registration Fetch Error:', error);
        showAlert('An error occurred during registration. Please check your connection and try again.');
    }
});

// Handle user login form submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission

    const email = document.getElementById('log-email').value.trim();
    const password = document.getElementById('log-pass').value;

    // Basic Frontend Validation
    if (!email || !password) {
        showAlert('Please enter both email and password.');
        return;
    }

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            showAlert('Login successful! Redirecting...', 'success');
            // Optional: Store token in localStorage if needed
            // localStorage.setItem('token', data.token);

            // Redirect to the main application page
            setTimeout(() => {
                // Adjust the path as necessary relative to the login folder
                window.location.href = '/app'; // Changed redirect path
            }, 1500); // 1.5 second delay
        } else {
            showAlert(data.message || 'Login failed. Please check your credentials.');
        }
    } catch (error) {
        console.error('Login Fetch Error:', error);
        showAlert('An error occurred during login. Please check your connection and try again.');
    }
});