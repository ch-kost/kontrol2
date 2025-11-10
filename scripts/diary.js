// Управление дневником с сохранением в localStorage
(function() {
    const STORAGE_KEY = 'portfolio-diary-entries';
    const DEFAULT_ENTRIES = [
        {
            date: '2025-01-15',
            title: 'Верстка макета сайта',
            description: 'Изучение семантической верстки и адаптивного дизайна. Создание макета интернет-магазина с использованием Flexbox и Grid.',
            status: 'completed'
        },
        {
            date: '2025-04-20',
            title: 'JavaScript основы',
            description: 'Переменные, функции, условия и циклы в JavaScript. Решение практических задач на Codewars.',
            status: 'completed'
        },
        {
            date: '2025-06-22',
            title: 'Работа с формами',
            description: 'Валидация форм и обработка пользовательского ввода. Создание формы обратной связи с проверкой данных.',
            status: 'in-progress'
        },
        {
            date: '2025-10-13',
            title: 'Адаптивный дизайн',
            description: 'Медиа-запросы и подход Mobile First. Адаптация существующего проекта под мобильные устройства.',
            status: 'in-progress'
        }
    ];

    document.addEventListener('DOMContentLoaded', function() {
        const diaryForm = document.getElementById('diary-form');
        const timeline = document.querySelector('[data-timeline]');

        if (!timeline) {
            return;
        }

        const storedEntries = loadEntries();
        const entries = storedEntries.length ? storedEntries : DEFAULT_ENTRIES;
        renderEntries(entries, timeline);
        saveEntries(entries);

        if (diaryForm) {
            diaryForm.addEventListener('submit', function(e) {
                e.preventDefault();

                const date = document.getElementById('entry-date').value;
                const status = document.getElementById('entry-status').value;
                const title = document.getElementById('entry-title').value.trim();
                const description = document.getElementById('entry-description').value.trim();

                if (date && title && description) {
                    const newEntry = { date, status, title, description };
                    addEntry(newEntry, timeline);
                    diaryForm.reset();
                    showNotification('Запись успешно добавлена!', 'success');
                } else {
                    showNotification('Пожалуйста, заполните все обязательные поля!', 'error');
                }
            });
        }

        initCourseProgressBars();
    });

    function loadEntries() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch (error) {
            console.error('Не удалось загрузить записи дневника:', error);
            return [];
        }
    }

    function saveEntries(entries) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
        } catch (error) {
            console.error('Не удалось сохранить записи дневника:', error);
        }
    }

    function renderEntries(entries, timeline) {
        timeline.innerHTML = '';
        entries
            .slice()
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .forEach(entry => {
                timeline.appendChild(createTimelineItem(entry));
            });
    }

    function addEntry(entry, timeline) {
        const entries = loadEntries();
        const updatedEntries = [entry, ...entries];
        saveEntries(updatedEntries);

        const entryElement = createTimelineItem(entry);
        timeline.insertAdjacentElement('afterbegin', entryElement);

        entryElement.style.opacity = '0';
        entryElement.style.transform = 'translateY(20px)';
        requestAnimationFrame(() => {
            entryElement.style.transition = 'all 0.3s ease';
            entryElement.style.opacity = '1';
            entryElement.style.transform = 'translateY(0)';
        });
    }

    function createTimelineItem(entry) {
        const statusText = entry.status === 'completed' ? 'Завершено' : 'В процессе';
        const statusClass = entry.status === 'completed' ? 'timeline__status--completed' : 'timeline__status--in-progress';

        const article = document.createElement('article');
        article.className = 'timeline__item';

        const dateElement = document.createElement('div');
        dateElement.className = 'timeline__date';
        dateElement.textContent = formatDate(entry.date);

        const content = document.createElement('div');
        content.className = 'timeline__content';

        const title = document.createElement('h3');
        title.className = 'timeline__title';
        title.textContent = entry.title;

        const description = document.createElement('p');
        description.className = 'timeline__description';
        description.textContent = entry.description;

        const status = document.createElement('span');
        status.className = `timeline__status ${statusClass}`;
        status.textContent = statusText;

        content.appendChild(title);
        content.appendChild(description);
        content.appendChild(status);

        article.appendChild(dateElement);
        article.appendChild(content);

        return article;
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
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;

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

        notification.style.backgroundColor = type === 'success'
            ? 'var(--success-color)'
            : 'var(--error-color)';

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
})();
