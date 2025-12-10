document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Hamburgermeny för Mobilläge ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    menuToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
    });

    // Stänger menyn när en länk klickas (bra för mobilläge)
    navList.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 900) {
                 navList.classList.remove('active');
            }
        });
    });


    // --- 2. Smooth Scroll för interna länkar ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href').length > 1) { 
                e.preventDefault();

                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const headerHeight = document.querySelector('.main-header').offsetHeight;
                    const topPosition = targetElement.offsetTop - headerHeight;

                    window.scrollTo({
                        top: topPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});