// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6tGNnBUiiVEmrk1uKhsV4K7701XnW8vU",
  authDomain: "trijbs.firebaseapp.com",
  projectId: "trijbs",
  storageBucket: "trijbs.firebasestorage.app",
  messagingSenderId: "821837560756",
  appId: "1:821837560756:web:0d28810996e381e59750e1",
  measurementId: "G-LB5H84XX75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);

// Modal elements
const modal = document.getElementById('auth-modal');
const authBtn = document.getElementById('auth-btn');
const closeModal = document.getElementById('close-modal');
const loginForm = document.getElementById('login');
const signupForm = document.getElementById('signup');
const switchToSignup = document.getElementById('switch-to-signup');
const switchToLogin = document.getElementById('switch-to-login');
const loginFormDiv = document.getElementById('login-form');
const signupFormDiv = document.getElementById('signup-form');

// Handler for login button click (show modal)
function handleLoginClick() {
    modal.style.display = 'block';
}

// Handler for logout button click (sign out with error handling)
function handleLogout() {
    signOut(auth).catch((error) => {
        alert('Sign-out error: ' + error.message);
    });
}

// Show modal
authBtn.addEventListener('click', handleLoginClick);

// Close modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal on Escape key
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modal.style.display = 'none';
    }
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Switch to signup form
switchToSignup.addEventListener('click', (e) => {
    e.preventDefault();
    loginFormDiv.style.display = 'none';
    signupFormDiv.style.display = 'block';
});

// Switch to login form
switchToLogin.addEventListener('click', (e) => {
    e.preventDefault();
    signupFormDiv.style.display = 'none';
    loginFormDiv.style.display = 'block';
});

// Handle signup
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    // Email format validation before signup
    if (!email.includes('@') || !email.includes('.')) {
        alert('Enter a valid email address.');
        return;
    }
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Save token in localStorage
            userCredential.user.getIdToken().then(token => {
                localStorage.setItem('authToken', token);
            });
            console.log('User signed up:', userCredential.user);
            alert('Signup successful!');
            modal.style.display = 'none';
        })
        .catch((error) => {
            alert('Error: ' + error.message);
        });
});

// Handle login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    // Email format validation before login
    if (!email.includes('@') || !email.includes('.')) {
        alert('Enter a valid email address.');
        return;
    }
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Save token in localStorage
            userCredential.user.getIdToken().then(token => {
                localStorage.setItem('authToken', token);
            });
            console.log('User logged in:', userCredential.user);
            alert('Login successful!');
            modal.style.display = 'none';
            window.location.href = '/dashboard.html';
        })
        .catch((error) => {
            alert('Error: ' + error.message);
        });
});

// Update UI based on auth state
onAuthStateChanged(auth, (user) => {
    if (user) {
        authBtn.textContent = 'Log Out';
        authBtn.removeEventListener('click', handleLoginClick);
        authBtn.addEventListener('click', handleLogout);
    } else {
        authBtn.textContent = 'Log In';
        authBtn.removeEventListener('click', handleLogout);
        authBtn.addEventListener('click', handleLoginClick);
    }
});

// Dark/Light Mode Toggle
const toggleTheme = document.getElementById('toggle-theme');
if (toggleTheme) {
    toggleTheme.addEventListener('click', () => {
        // Determine current mode
        let currentMode = 'dark';
        if (document.body.classList.contains('light-mode')) {
            currentMode = 'dark';
        } else {
            currentMode = 'light';
        }
        // Remove both classes and add the new one
        document.body.classList.remove('light-mode', 'dark-mode');
        document.body.classList.add(currentMode + '-mode');
        localStorage.setItem('theme', currentMode);
    });

    // Load saved theme on page load and apply the correct class
    window.addEventListener('DOMContentLoaded', () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light' || savedTheme === 'dark') {
            document.body.classList.add(savedTheme + '-mode');
        }
    });
}

// Smooth scroll to anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
