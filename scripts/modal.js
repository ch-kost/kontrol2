// Управление модальными окнами
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('project-modal');
    if (!modal) return;
    
    const closeBtn = modal.querySelector('.modal__close');
    const modalBtns = document.querySelectorAll('.project-modal-btn');
    
    // Закрытие модального окна
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // Закрытие при клике вне модального окна
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Закрытие по ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
        }
    });
    
    // Обработка кнопок открытия модального окна
    modalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project');
            loadProjectModal(projectId);
            modal.style.display = 'flex';
        });
    });
});

// Функция для загрузки контента в модальное окно проекта
function loadProjectModal(projectId) {
    const modalBody = document.getElementById('modal-body');
    
    const projects = {
        '1': {
            title: 'Личный сайт',
            description: 'Персональный веб-сайт с адаптивным дизайном и семантической версткой. Проект включает в себя главную страницу, портфолио работ и контактную форму.',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'Flexbox', 'Grid'],
            features: ['Адаптивный дизайн', 'Семантическая верстка', 'Интерактивные элементы', 'Оптимизация для SEO'],
            demoLink: '#',
            codeLink: '#'
        },
        '2': {
            title: 'Todo-приложение',
            description: 'Приложение для управления задачами с возможностью добавления, редактирования, удаления и фильтрации задач. Данные сохраняются в локальном хранилище.',
            technologies: ['JavaScript', 'LocalStorage', 'CSS3', 'HTML5'],
            features: ['Добавление/удаление задач', 'Фильтрация по статусу', 'Локальное хранение данных', 'Адаптивный интерфейс'],
            demoLink: '#',
            codeLink: '#'
        },
        '3': {
            title: 'Интернет-магазин',
            description: 'Прототип интернет-магазина с функциональностью корзины товаров, системой фильтров и поиском. Реализован на React с использованием хуков.',
            technologies: ['React', 'CSS Modules', 'Context API', 'React Router'],
            features: ['Каталог товаров', 'Корзина покупок', 'Фильтрация и поиск', 'Адаптивный дизайн'],
            demoLink: '#',
            codeLink: '#'
        },
        '4': {
            title: 'Портфолио на Bootstrap',
            description: 'Современное портфолио с использованием Bootstrap 5 и кастомными стилями. Включает анимации, модальные окна и адаптивную сетку.',
            technologies: ['Bootstrap 5', 'CSS3', 'JavaScript', 'jQuery'],
            features: ['Адаптивный дизайн', 'Bootstrap компоненты', 'Плавные анимации', 'Оптимизация производительности'],
            demoLink: '#',
            codeLink: '#'
        }
    };
    
    const project = projects[projectId];
    
    if (project) {
        modalBody.innerHTML = `
            <h2>${project.title}</h2>
            <p class="project-description">${project.description}</p>
            
            <div class="project-details">
                <div class="technologies">
                    <h3>Использованные технологии:</h3>
                    <div class="tech-tags">
                        ${project.technologies.map(tech => `<span class="tag">${tech}</span>`).join('')}
                    </div>
                </div>
                
                <div class="features">
                    <h3>Основные функции:</h3>
                    <ul>
                        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="project-links">
                    <a href="${project.demoLink}" class="button button--primary" target="_blank">Демо</a>
                    <a href="${project.codeLink}" class="button button--outline" target="_blank">Исходный код</a>
                </div>
            </div>
        `;
    }
}