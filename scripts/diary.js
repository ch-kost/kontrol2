// Управление дневником
document.addEventListener('DOMContentLoaded', function() {
    const diaryForm = document.getElementById('diary-form');
    
    if (diaryForm) {
        diaryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const date = document.getElementById('entry-date').value;
            const status = document.getElementById('entry-status').value;
            const title = document.getElementById('entry-title').value.trim();
            const description = document.getElementById('entry-description').value.trim();
            
            if (date && title && description) {
                addDiaryEntry(date, status, title, description);
                diaryForm.reset();
                showNotification('Запись успешно добавлена!', 'success');
            } else {
                showNotification('Пожалуйста, заполните все обязательные поля!', 'error');
            }
        });
    }

    // Инициализация прогресс-баров курсов
    initCourseProgressBars();
});

function addDiaryEntry(date, status, title, description) {
    const timeline = document.querySelector('.timeline');
    const statusText = status === 'completed' ? 'Завершено' : 'В процессе';
    const statusClass = status === 'completed' ? 'timeline__status--completed' : 'timeline__status--in-progress';
    
    const entryHTML = `
        <article class="timeline__item">
            <div class="timeline__date">${formatDate(date)}</div>
            <div class="timeline__content">
                <h3 class="timeline__title">${title}</h3>
                <p class="timeline__description">${description}</p>
                <span class="timeline__status ${statusClass}">${statusText}</span>
            </div>
        </article>
    `;
    
    timeline.insertAdjacentHTML('afterbegin', entryHTML);
    
    // Добавляем анимацию появления
    const newEntry = timeline.firstElementChild;
    newEntry.style.opacity = '0';
    newEntry.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        newEntry.style.transition = 'all 0.3s ease';
        newEntry.style.opacity = '1';
        newEntry.style.transform = 'translateY(0)';
    }, 100);
}

function formatDate(dateString) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', options);
}

function initCourseProgressBars() {
    const progressBars = document.querySelectorAll('.course__progress-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0';
                
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 500);
                
                observer.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

function showNotification(message, type) {
    // Создаем уведомление
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    // Стили для уведомления
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: var(--radius-md);
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
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
    
    // Автоматическое скрытие через 3 секунды
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}