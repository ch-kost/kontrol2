// Управление модальными окнами проектов
(function() {
    let modal;
    let closeBtn;

    document.addEventListener('DOMContentLoaded', initModal);

    function initModal() {
        modal = document.getElementById('project-modal');
        if (!modal) {
            return;
        }

        closeBtn = modal.querySelector('.modal__close');

        closeBtn.addEventListener('click', closeModal);
        window.addEventListener('click', handleOutsideClick);
        document.addEventListener('keydown', handleEscape);
        document.addEventListener('click', handleProjectButtonClick);
    }

    function handleProjectButtonClick(event) {
        const button = event.target.closest('.project-modal-btn');
        if (!button) {
            return;
        }

        const projectId = button.getAttribute('data-project');
        loadProjectModal(projectId);
        openModal();
    }

    function openModal() {
        modal.style.display = 'flex';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    function handleOutsideClick(event) {
        if (event.target === modal) {
            closeModal();
        }
    }

    function handleEscape(event) {
        if (event.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    }

    function loadProjectModal(projectId) {
        const modalBody = document.getElementById('modal-body');
        const projectsMap = window.projectDataMap || createFallbackProjectMap();
        const project = projectsMap[projectId];

        if (!project) {
            modalBody.innerHTML = '<p>Информация о проекте недоступна.</p>';
            return;
        }

        modalBody.innerHTML = `
            <h2>${project.title}</h2>
            <p class="project-description">${project.longDescription}</p>
            <div class="project-details">
                <div class="technologies">
                    <h3>Использованные технологии:</h3>
                    <div class="tech-tags">
                        ${(project.technologies || []).map(tech => `<span class="tag">${tech}</span>`).join('')}
                    </div>
                </div>
                <div class="features">
                    <h3>Основные функции:</h3>
                    <ul>
                        ${(project.features || []).map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                <div class="project-links">
                    <a href="${project.demo || '#'}" class="button button--primary" target="_blank" rel="noopener noreferrer">Демо</a>
                    <a href="${project.code || '#'}" class="button button--outline" target="_blank" rel="noopener noreferrer">Исходный код</a>
                </div>
            </div>
        `;
    }

    function createFallbackProjectMap() {
        const projectButtons = document.querySelectorAll('.project-modal-btn');
        const fallbackMap = {};

        projectButtons.forEach(button => {
            const card = button.closest('.project-card');
            if (!card) {
                return;
            }

            const projectId = button.getAttribute('data-project');
            fallbackMap[projectId] = {
                title: card.querySelector('.project-card__title')?.textContent || 'Проект',
                longDescription: card.querySelector('.project-card__description')?.textContent || '',
                technologies: Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent),
                features: [],
                demo: '#',
                code: '#'
            };
        });

        return fallbackMap;
    }
})();
