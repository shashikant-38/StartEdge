// Authentication functionality
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// Show/Hide Auth Modal
function toggleAuthModal(form) {
    const modal = document.getElementById('authModal');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    if (form === 'login') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }
}

// Login Handler
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Get stored users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateAuthUI();
        closeAuthModal();
        showNotification('Login successful!', 'success');
    } else {
        showNotification('Invalid email or password', 'error');
    }
}

// Register Handler
function handleRegister(event) {
    event.preventDefault();
    
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const businessName = document.getElementById('businessName').value;
    const industry = document.getElementById('industry').value;

    // Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if email already exists
    if (users.some(user => user.email === email)) {
        showNotification('Email already registered', 'error');
        return;
    }

    // Create new user
    const newUser = {
        email,
        password,
        businessName,
        industry
    };

    // Add to users array and save to localStorage
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Set as current user
    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    updateAuthUI();
    closeAuthModal();
    showNotification('Registration successful!', 'success');
}

// Update UI based on auth state
function updateAuthUI() {
    const authButton = document.getElementById('authButton');
    const userProfile = document.getElementById('userProfile');
    const userName = document.getElementById('userName');
    const businessInfo = document.getElementById('businessInfo');

    if (currentUser) {
        authButton.style.display = 'none';
        userProfile.style.display = 'flex';
        userName.textContent = currentUser.businessName;
        businessInfo.textContent = currentUser.industry;
    } else {
        authButton.style.display = 'flex';
        userProfile.style.display = 'none';
    }
}

// Close Modal
function closeAuthModal() {
    const modal = document.getElementById('authModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Logout Handler
function handleLogout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateAuthUI();
    showNotification('Logged out successfully', 'success');
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize profile section
function initializeProfile() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const profileSection = document.getElementById('profileSection');
    const userProfile = document.getElementById('userProfile');
    
    if (currentUser) {
        profileSection.style.display = 'none'; // Initially hidden
        userProfile.style.display = 'flex';
        updateProfileDisplay(currentUser);
    }
}

// Initialize auth state when page loads
document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();
}); 