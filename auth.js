// Authentication functionality
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// Show/Hide Auth Modal
function toggleAuthModal(form) {
    const modal = document.getElementById('authModal');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (modal.style.display === 'flex') {
        closeAuthModal();
        return;
    }
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    loginForm.classList.remove('active');
    registerForm.classList.remove('active');
    
    if (form === 'login') {
        loginForm.classList.add('active');
    } else {
        registerForm.classList.add('active');
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

// Show notification
function showNotification(message, type) {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize auth state and event listeners when page loads
document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();
    
    // Close modal when clicking outside
    const modal = document.getElementById('authModal');
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeAuthModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeAuthModal();
        }
    });

    // Initialize forms
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
}); 
