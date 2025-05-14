// Profile functionality
let isEditMode = false;

function toggleEditMode() {
    isEditMode = !isEditMode;
    const profileInfo = document.querySelector('.profile-info');
    const editProfileForm = document.getElementById('editProfileForm');
    const editProfileBtn = document.querySelector('.edit-profile-btn');
    
    if (isEditMode) {
        profileInfo.style.display = 'none';
        editProfileForm.style.display = 'block';
        editProfileBtn.innerHTML = '<i class="fas fa-times"></i> Cancel';
        populateEditForm();
    } else {
        profileInfo.style.display = 'grid';
        editProfileForm.style.display = 'none';
        editProfileBtn.innerHTML = '<i class="fas fa-edit"></i> Edit Profile';
    }
}

function populateEditForm() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        document.getElementById('editBusinessName').value = currentUser.businessName || '';
        document.getElementById('editIndustry').value = currentUser.industry || '';
    }
}

function handleProfileUpdate(event) {
    event.preventDefault();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (currentUser) {
        const updatedUser = {
            ...currentUser,
            businessName: document.getElementById('editBusinessName').value,
            industry: document.getElementById('editIndustry').value
        };
        
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        updateProfileDisplay(updatedUser);
        toggleEditMode();
        showNotification('Profile updated successfully!');
    }
}

function updateProfileDisplay(user) {
    document.getElementById('profileEmail').textContent = user.email;
    document.getElementById('profileBusinessName').textContent = user.businessName || 'Not set';
    document.getElementById('profileIndustry').textContent = user.industry || 'Not set';
    
    // Update header user info
    document.getElementById('userName').textContent = user.businessName || user.email;
    document.getElementById('businessInfo').textContent = user.industry || '';
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
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
        
        // Add click handler to user profile
        userProfile.addEventListener('click', () => {
            profileSection.style.display = 'block';
            window.scrollTo({
                top: profileSection.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    } else {
        profileSection.style.display = 'none';
        userProfile.style.display = 'none';
    }
}

// Add notification styles
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--accent-color);
        color: var(--white);
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
    }
    
    .notification.show {
        transform: translateY(0);
        opacity: 1;
    }

    #userProfile {
        cursor: pointer;
        transition: var(--transition);
    }

    #userProfile:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(style);

// Initialize profile when page loads
document.addEventListener('DOMContentLoaded', initializeProfile); 