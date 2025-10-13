// Валидация формы контактов
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        let isValid = true;
        
        // Валидация имени
        if (name === '') {
            showError('name-error', 'Пожалуйста, введите ваше имя');
            isValid = false;
        } else {
            hideError('name-error');
        }
        
        // Валидация email
        if (email === '') {
            showError('email-error', 'Пожалуйста, введите ваш email');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email-error', 'Пожалуйста, введите корректный email');
            isValid = false;
        } else {
            hideError('email-error');
        }
        
        // Валидация сообщения
        if (message === '') {
            showError('message-error', 'Пожалуйста, введите ваше сообщение');
            isValid = false;
        } else {
            hideError('message-error');
        }
        
        if (isValid) {
            // В реальном приложении здесь будет отправка формы
            alert('Сообщение успешно отправлено!');
            contactForm.reset();
        }
    });
    
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    function hideError(elementId) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});