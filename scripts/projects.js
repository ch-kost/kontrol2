// Загрузка и отображение данных проектов
(function() {
    const PROJECTS = [
        {
            id: 'portfolio-site',
            title: 'Личный сайт',
            summary: 'Персональный веб-сайт с адаптивным дизайном и семантической версткой.',
            longDescription: 'Персональный веб-сайт с адаптивным дизайном и семантической версткой. Проект включает главную страницу, портфолио работ и контактную форму с валидацией.',
            category: 'html',
            image: 'project1.jpg',
            tags: ['HTML', 'CSS', 'JavaScript'],
            technologies: ['HTML5', 'CSS3', 'Flexbox', 'Grid', 'Accessibility'],
            features: [
                'Адаптивный дизайн под мобильные устройства',
                'Семантическая верстка и структурирование контента',
                'Оптимизация загрузки изображений',
                'Навигация с подсветкой активного раздела'
            ],
            demo: '#',
            code: '#',
            featured: true
        },
        {
            id: 'todo-app',
            title: 'Todo-приложение',
            summary: 'Приложение для управления задачами с локальным хранилищем и фильтрацией.',
            longDescription: 'Приложение для управления задачами с возможностью добавления, редактирования, удаления и фильтрации задач. Данные сохраняются в локальном хранилище браузера.',
            category: 'js',
            image: 'project2.jpg',
            tags: ['JavaScript', 'LocalStorage', 'UI'],
            technologies: ['JavaScript', 'ES6', 'LocalStorage', 'CSS Animations'],
            features: [
                'Добавление и удаление задач',
                'Фильтрация по статусу выполнения',
                'Сохранение данных между сессиями',
                'Адаптивный интерфейс'
            ],
            demo: '#',
            code: '#',
            featured: true
        },
        {
            id: 'shop-prototype',
            title: 'Интернет-магазин',
            summary: 'Прототип интернет-магазина с корзиной товаров и системой фильтров.',
            longDescription: 'Прототип интернет-магазина с функциональностью корзины товаров, системой фильтров и поиском. Реализован на React с использованием современного стека.',
            category: 'react',
            image: 'project3.webp',
            tags: ['React', 'API', 'SPA'],
            technologies: ['React', 'CSS Modules', 'Context API', 'React Router'],
            features: [
                'Каталог товаров и поиск',
                'Корзина покупок и подсчет стоимости',
                'Фильтрация по категориям',
                'Интеграция с внешним API'
            ],
            demo: '#',
            code: '#',
            featured: true
        },
        {
            id: 'bootstrap-portfolio',
            title: 'Портфолио на Bootstrap',
            summary: 'Современное портфолио на Bootstrap 5 с кастомными стилями.',
            longDescription: 'Современное портфолио с использованием Bootstrap 5 и кастомными стилями. Включает анимации, модальные окна и адаптивную сетку.',
            category: 'bootstrap',
            image: 'project2.jpg',
            tags: ['Bootstrap', 'CSS', 'JavaScript'],
            technologies: ['Bootstrap 5', 'SCSS', 'JavaScript', 'Gulp'],
            features: [
                'Готовые компоненты Bootstrap',
                'Плавные CSS-анимации',
                'Адаптивная сетка',
                'Интерактивные модальные окна'
            ],
            demo: '#',
            code: '#',
            featured: false
        }
    ];

    document.addEventListener('DOMContentLoaded', () => initProjects(PROJECTS));

    function initProjects(projects) {
        const previewContainer = document.querySelector('[data-projects-preview]');
        const projectsGrid = document.querySelector('[data-projects-grid]');
        const hasProjectsSection = previewContainer || projectsGrid;

        if (!hasProjectsSection) {
            return;
        }

        const assetsPath = document.body.dataset.assetsPath || '.';

        window.projectData = projects;
        window.projectDataMap = createProjectMap(projects);

        if (previewContainer) {
            renderPreview(projects, previewContainer, assetsPath);
        }

        if (projectsGrid) {
            renderProjects(projects, projectsGrid, assetsPath);
        }

        document.dispatchEvent(new CustomEvent('projects:data-ready', {
            detail: {
                projects,
                assetsPath
            }
        }));
    }

    function createProjectMap(projects) {
        return projects.reduce((acc, project) => {
            acc[project.id] = project;
            return acc;
        }, {});
    }

    function renderPreview(projects, container, assetsPath) {
        const featuredProjects = projects.filter(project => project.featured).slice(0, 3);

        container.innerHTML = '';
        featuredProjects.forEach(project => {
            const card = createProjectCard(project, assetsPath, true);
            container.appendChild(card);
        });
    }

    function renderProjects(projects, container, assetsPath) {
        container.innerHTML = '';
        projects.forEach(project => {
            const card = createProjectCard(project, assetsPath, false);
            container.appendChild(card);
        });
    }

    function createProjectCard(project, assetsPath, isPreview) {
        const card = document.createElement('article');
        card.className = 'project-card';
        card.dataset.category = project.category;
        card.dataset.projectId = project.id;
        card.dataset.title = project.title.toLowerCase();
        card.dataset.description = project.summary.toLowerCase();
        card.dataset.tags = project.tags.map(tag => tag.toLowerCase()).join(' ');

        const imageWrapper = document.createElement('div');
        imageWrapper.className = 'project-card__image';

        const image = document.createElement('img');
        image.src = `${assetsPath}/images/${project.image}`;
        image.alt = project.title;
        image.loading = 'lazy';
        imageWrapper.appendChild(image);

        const content = document.createElement('div');
        content.className = 'project-card__content';

        const title = document.createElement('h3');
        title.className = 'project-card__title';
        title.textContent = project.title;

        const description = document.createElement('p');
        description.className = 'project-card__description';
        description.textContent = project.summary;

        const tagsWrapper = document.createElement('div');
        tagsWrapper.className = 'project-card__tags';
        project.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'tag';
            tagElement.textContent = tag;
            tagsWrapper.appendChild(tagElement);
        });

        let actionElement;
        if (isPreview) {
            actionElement = document.createElement('a');
            actionElement.href = 'pages/projects.html';
            actionElement.className = 'button button--outline project-card__button';
            actionElement.textContent = 'Подробнее';
        } else {
            actionElement = document.createElement('button');
            actionElement.className = 'button button--primary project-modal-btn project-card__button';
            actionElement.dataset.project = project.id;
            actionElement.type = 'button';
            actionElement.textContent = 'Подробнее';
        }

        content.appendChild(title);
        content.appendChild(description);
        content.appendChild(tagsWrapper);
        content.appendChild(actionElement);

        card.appendChild(imageWrapper);
        card.appendChild(content);

        return card;
    }
})();
