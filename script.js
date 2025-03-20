// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

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

// Show modal
authBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

// Close modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
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
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log('User signed up:', userCredential.user);
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
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log('User logged in:', userCredential.user);
            modal.style.display = 'none';
        })
        .catch((error) => {
            alert('Error: ' + error.message);
        });
});

// Update UI based on auth state
auth.onAuthStateChanged((user) => {
    if (user) {
        authBtn.textContent = 'Log Out';
        authBtn.removeEventListener('click', openModal);
        authBtn.addEventListener('click', () => auth.signOut());
    } else {
        authBtn.textContent = 'Log In';
        authBtn.removeEventListener('click', () => auth.signOut());
        authBtn.addEventListener('click', () => modal.style.display = 'block');
    }
});

function openModal() {
    modal.style.display = 'block';
}