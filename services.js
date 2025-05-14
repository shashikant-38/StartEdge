// Service filtering functionality
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const serviceCards = document.querySelectorAll('.service-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const category = button.getAttribute('data-category');

            serviceCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Handle service CTA buttons
    const serviceCtas = document.querySelectorAll('.service-cta');
    serviceCtas.forEach(cta => {
        cta.addEventListener('click', () => {
            const serviceName = cta.closest('.service-card').querySelector('h3').textContent;
            showNotification(`Thank you for your interest in ${serviceName}! We'll contact you soon.`);
        });
    });
}); 