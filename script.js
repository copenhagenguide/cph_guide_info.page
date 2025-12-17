document.addEventListener('DOMContentLoaded', () => {
    
    const body = document.body;
    const navList = document.querySelector('.nav-list');
    const mainHeader = document.querySelector('.main-header'); 
    
    // --- NYTT: Cookie Logik Variabler ---
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptButton = document.getElementById('accept-cookies');

    // --- NYTT: 1. Cookie-funktionalitet ---
    const hasAcceptedCookies = localStorage.getItem('cookiesAccepted');
    
    if (cookieBanner && !hasAcceptedCookies) {
        cookieBanner.style.display = 'flex';
    }

    if (acceptButton) {
        acceptButton.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            if (cookieBanner) {
                cookieBanner.style.display = 'none';
            }
            // Ladda om eller starta GTM här om du vill garantera att den laddas först efter godkännande
            // I detta fall, eftersom GTM-koden ligger direkt i HTML:en, 
            // kommer den att köra men kan t.ex. använda Consent Mode för att anpassa beteendet.
        });
    }

    // --- 2. Hamburgermeny för Mobilläge ---
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        menuToggle.addEventListener('click', () => {
            if (navList) {
                navList.classList.toggle('active');
            }
        });
    }

    // --- 3. Funktion för att växla mellan sidor (din befintliga logik) ---
    const toggleContactPage = (isContact) => {
        if (isContact) {
            body.classList.add('on-contact-page');
            document.title = 'Copenhagen Guide | Kontakta Oss';
        } else {
            body.classList.remove('on-contact-page');
            // Observera: Denna rad kan behöva justeras om du har olika titlar på varje sida
            // Jag tar bort den här så att sidtitlarna från varje HTML-fil används.
        }
    };

    // --- 4. Hantera sidladdning och back/forward-knappen (din befintliga logik) ---
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
    handleStateChange();
    
    // Kör vid back/forward
    window.addEventListener('popstate', handleStateChange);

    // --- 5. Smooth Scroll & Hantering av hash-länkar (din befintliga logik) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            
            if (window.innerWidth <= 900 && navList) {
                 navList.classList.remove('active');
            }
            
            if (this.getAttribute('href').length > 1) { 
                e.preventDefault();

                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetId === 'kontakt') {
                    toggleContactPage(true);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    history.pushState(null, null, this.getAttribute('href'));

                } else if (targetElement) {
                    toggleContactPage(false);
                    history.pushState(null, null, this.getAttribute('href'));
                    
                    const headerHeight = mainHeader ? mainHeader.offsetHeight : 0;
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
            }
        }
    });
});
