// Основной JavaScript файл
document.addEventListener('DOMContentLoaded', function() {
    // Анимация прогресс-баров
    const animateProgressBars = () => {
        const progressBars = document.querySelectorAll('.skill__progress-bar, .course__progress-bar');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const width = progressBar.style.width;
                    progressBar.style.width = '0';
                    
                    setTimeout(() => {
                        progressBar.style.width = width;
                    }, 300);
                    
                    observer.unobserve(progressBar);
                }
            });
        }, { threshold: 0.5 });
        
        progressBars.forEach(bar => {
            observer.observe(bar);
        });
    };

    // Инициализация навигации
    const initNavigation = () => {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navItems = document.querySelectorAll('.nav__item');
        
        navItems.forEach(item => {
            const link = item.querySelector('.nav__link');
            const linkHref = link.getAttribute('href');
            
            if (linkHref === currentPage || 
                (currentPage === '' && linkHref === 'index.html') ||
                (currentPage.includes('index.html') && linkHref === '../index.html')) {
                item.classList.add('nav__item--active');
            } else {
                item.classList.remove('nav__item--active');
            }
        });
    };

    // Обработчик для кнопки скачивания резюме
    const initDownloadButton = () => {
        const downloadBtn = document.querySelector('.hero__button');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', function() {
                alert('Резюме будет скачано в ближайшее время!');
                // Здесь можно добавить реальную логику скачивания
            });
        }
    };

    // Плавная прокрутка для навигации
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    };

    // Инициализация всех функций
    animateProgressBars();
    initNavigation();
    initDownloadButton();
    initSmoothScroll();
});