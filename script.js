document.addEventListener('DOMContentLoaded', () => {
    
    const body = document.body;
    const navList = document.querySelector('.nav-list');
    const mainHeader = document.querySelector('.main-header'); 

    // --- NYTT: 1. Cookie Logik Variabler ---
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptButton = document.getElementById('accept-cookies');

    // --- NYTT: 2. Cookie-funktionalitet ---
    // Kontrollerar om användaren redan har accepterat cookies via localStorage
    const hasAcceptedCookies = localStorage.getItem('cookiesAccepted');
    
    if (cookieBanner && !hasAcceptedCookies) {
        // Visa bannern om den finns och inte har accepterats
        cookieBanner.style.display = 'flex';
    }

    if (acceptButton) {
        acceptButton.addEventListener('click', () => {
            // Spara valet och dölj bannern
            localStorage.setItem('cookiesAccepted', 'true');
            if (cookieBanner) {
                cookieBanner.style.display = 'none';
            }
            // OBS: Om du använder Google Analytics eller GTM, är detta stället 
            // där du skulle ladda in spårningsskripten eller uppdatera consent-läget.
        });
    }


    // --- 3. Hamburgermeny för Mobilläge (Befintlig logik) ---
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        menuToggle.addEventListener('click', () => {
            if (navList) {
                navList.classList.toggle('active');
            }
        });
    }

    // --- 4. Funktion för att växla mellan sidor (kontaktlogik) ---
    const toggleContactPage = (isContact) => {
        if (isContact) {
            body.classList.add('on-contact-page');
            document.title = 'Copenhagen Guide | Kontakta Oss';
        } else {
            body.classList.remove('on-contact-page');
            document.title = 'Copenhagen Guide | Din guide till Köpenhamn';
        }
    };

    // --- 5. Hantera sidladdning och back/forward-knappen ---
    const handleStateChange = () => {
        if (window.location.hash === '#kontakt') {
            toggleContactPage(true);
        } else {
            toggleContactPage(false);
            
            const hash = window.location.hash.substring(1);
            if (hash) {
                const targetElement = document.getElementById(hash);
                if (targetElement) {
                    const headerHeight = mainHeader ? mainHeader.offsetHeight : 0;
                    window.scrollTo(0, targetElement.offsetTop - headerHeight);
                }
            }
        }
    };
    
    // Kör vid start
    handleStateChange(); // Kör logiken direkt vid sidladdning
    
    // Kör vid back/forward (Popstate)
    window.addEventListener('popstate', handleStateChange);
    

    // --- 6. Klickhändelse och Smooth Scroll Logik ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            
            e.preventDefault(); 
            
            // Stäng menyn i mobilläge
            if (window.innerWidth <= 900 && navList) {
                navList.classList.remove('active');
            }

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            const headerHeight = mainHeader ? mainHeader.offsetHeight : 0;
            
            if (targetId === 'kontakt') {
                // KONTAKTSIDA LOGIK
                toggleContactPage(true);
                window.scrollTo({ top: 0, behavior: 'smooth' }); 
                history.pushState(null, null, '#kontakt');

            } else if (targetElement) {
                // ÖVRIGA SEKTIONER LOGIK (dvs. Attraktioner, Matställen etc.)
                toggleContactPage(false);
                history.pushState(null, null, '#' + targetId);
                
                // Scrolla till rätt position
                const topPosition = targetElement.offsetTop - headerHeight;
                window.scrollTo({
                    top: topPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
