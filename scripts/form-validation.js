// Валидация формы контактов
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            let isValid = true;
            
            // Валидация имени
            if (name === '') {
                showError('name-error', 'Пожалуйста, введите ваше имя');
                isValid = false;
            } else if (name.length < 2) {
                showError('name-error', 'Имя должно содержать минимум 2 символа');
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
            } else if (message.length < 10) {
                showError('message-error', 'Сообщение должно содержать минимум 10 символов');
                isValid = false;
            } else {
                hideError('message-error');
            }
            
            if (isValid) {
                // Эмуляция отправки формы
                simulateFormSubmission(name, email, subject, message);
            }
        });
        
        // Реальная валидация при вводе
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        if (nameInput) {
            nameInput.addEventListener('blur', validateName);
            nameInput.addEventListener('input', clearErrorOnType.bind(null, 'name-error'));
        }
        
        if (emailInput) {
            emailInput.addEventListener('blur', validateEmail);
            emailInput.addEventListener('input', clearErrorOnType.bind(null, 'email-error'));
        }
        
        if (messageInput) {
            messageInput.addEventListener('blur', validateMessage);
            messageInput.addEventListener('input', clearErrorOnType.bind(null, 'message-error'));
        }
    }
    
    function validateName() {
        const name = document.getElementById('name').value.trim();
        if (name === '') {
            showError('name-error', 'Пожалуйста, введите ваше имя');
            return false;
        } else if (name.length < 2) {
            showError('name-error', 'Имя должно содержать минимум 2 символа');
            return false;
        } else {
            hideError('name-error');
            return true;
        }
    }
    
    function validateEmail() {
        const email = document.getElementById('email').value.trim();
        if (email === '') {
            showError('email-error', 'Пожалуйста, введите ваш email');
            return false;
        } else if (!isValidEmail(email)) {
            showError('email-error', 'Пожалуйста, введите корректный email');
            return false;
        } else {
            hideError('email-error');
            return true;
        }
    }
    
    function validateMessage() {
        const message = document.getElementById('message').value.trim();
        if (message === '') {
            showError('message-error', 'Пожалуйста, введите ваше сообщение');
            return false;
        } else if (message.length < 10) {
            showError('message-error', 'Сообщение должно содержать минимум 10 символов');
            return false;
        } else {
            hideError('message-error');
            return true;
        }
    }
    
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        const inputElement = errorElement.previousElementSibling;
        
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        inputElement.style.borderColor = 'var(--error-color)';
    }
    
    function hideError(elementId) {
        const errorElement = document.getElementById(elementId);
        const inputElement = errorElement.previousElementSibling;
        
        errorElement.textContent = '';
        errorElement.style.display = 'none';
        inputElement.style.borderColor = '#e2e8f0';
    }
    
    function clearErrorOnType(elementId) {
        const errorElement = document.getElementById(elementId);
        const inputElement = errorElement.previousElementSibling;
        
        errorElement.textContent = '';
        errorElement.style.display = 'none';
        inputElement.style.borderColor = '#e2e8f0';
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function simulateFormSubmission(name, email, subject, message) {
        const submitButton = document.querySelector('.form__button');
        const originalText = submitButton.textContent;
        
        // Показываем индикатор загрузки
        submitButton.textContent = 'Отправка...';
        submitButton.disabled = true;
        
        // Эмуляция задержки сети
        setTimeout(() => {
            // В реальном приложении здесь будет AJAX запрос
            console.log('Данные формы:', { name, email, subject, message });
            
            // Показываем уведомление об успехе
            showFormNotification('Сообщение успешно отправлено!', 'success');
            
            // Сбрасываем форму
            document.getElementById('contact-form').reset();
            
            // Восстанавливаем кнопку
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    }
    
    function showFormNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `form-notification form-notification--${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 24px;
            border-radius: var(--radius-lg);
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        if (type === 'success') {
            notification.style.backgroundColor = 'var(--success-color)';
        } else {
            notification.style.backgroundColor = 'var(--error-color)';
        }
        
        document.body.appendChild(notification);
        
        // Анимация появления
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Автоматическое скрытие через 4 секунды
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
});