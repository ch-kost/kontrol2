// Фильтрация и поиск проектов
(function() {
    let activeFilter = 'all';
    let searchQuery = '';

    document.addEventListener('DOMContentLoaded', initFilters);
    document.addEventListener('projects:data-ready', initFilters);

    function initFilters() {
        const filterButtons = document.querySelectorAll('.filter');
        const searchInput = document.querySelector('[data-project-search]');

        if (!filterButtons.length && !searchInput) {
            return;
        }

        filterButtons.forEach(button => {
            if (button.dataset.filterInitialized) {
                return;
            }

            button.dataset.filterInitialized = 'true';
            button.addEventListener('click', function() {
                filterButtons.forEach(btn => btn.classList.remove('filter--active'));
                this.classList.add('filter--active');
                activeFilter = this.getAttribute('data-filter') || 'all';
                updateVisibility();
            });
        });

        if (searchInput && !searchInput.dataset.searchInitialized) {
            searchInput.dataset.searchInitialized = 'true';
            searchInput.addEventListener('input', function() {
                searchQuery = this.value.trim().toLowerCase();
                updateVisibility();
            });
        }

        updateVisibility();
    }

    function updateVisibility() {
        const projectCards = document.querySelectorAll('.project-card');
        const emptyState = document.querySelector('[data-projects-empty]');
        let visibleCount = 0;

        projectCards.forEach(card => {
            const matchesFilter = activeFilter === 'all' || card.dataset.category === activeFilter;
            const cardText = `${card.dataset.title || ''} ${card.dataset.description || ''} ${card.dataset.tags || ''}`;
            const matchesSearch = !searchQuery || cardText.includes(searchQuery);

            if (matchesFilter && matchesSearch) {
                showCard(card);
                visibleCount += 1;
            } else {
                hideCard(card);
            }
        });

        if (emptyState) {
            if (visibleCount === 0) {
                emptyState.hidden = false;
            } else {
                emptyState.hidden = true;
            }
        }
    }

    function showCard(card) {
        card.style.display = 'block';
        requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    }

    function hideCard(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.display = 'none';
        }, 200);
    }
})();
