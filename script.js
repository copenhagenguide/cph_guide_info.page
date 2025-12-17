document.addEventListener('DOMContentLoaded', () => {
    
    const body = document.body;
    const navList = document.querySelector('.nav-list');
    const mainHeader = document.querySelector('.main-header'); 

    // --- NYTT: 1. Cookie Pop-up Logik Variabler ---
    const cookieModalOverlay = document.getElementById('cookie-modal-overlay');
    const acceptButton = document.getElementById('accept-cookies');

    // --- NYTT: 2. Funktion för att kontrollera/visa pop-up ---
    const checkAndShowCookieModal = () => {
        const hasAcceptedCookies = localStorage.getItem('cookiesAccepted');
        
        if (cookieModalOverlay && !hasAcceptedCookies) {
            // Visa pop-up
            cookieModalOverlay.style.display = 'flex';
            // Förhindra scrollning i bakgrunden
            body.style.overflow = 'hidden'; 
        }
    };
    
    // --- NYTT: 3. Hantera klick på Godkänn ---
    if (acceptButton) {
        acceptButton.addEventListener('click', () => {
            // Spara valet och dölj pop-up
            localStorage.setItem('cookiesAccepted', 'true');
            if (cookieModalOverlay) {
                cookieModalOverlay.style.display = 'none';
            }
            // Återställ scrollning
            body.style.overflow = 'auto'; 

            // HÄR KAN DU T.EX. FIRE ETT DATALAYER EVENT FÖR GTM
            // if (window.dataLayer) {
            //     window.dataLayer.push({'event': 'cookies_accepted'});
            // }
        });
    }

    // Kör cookie-kontrollen direkt
    checkAndShowCookieModal();


    // --- 4. Hamburgermeny för Mobilläge (Befintlig logik) ---
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        menuToggle.addEventListener('click', () => {
            if (navList) {
                navList.classList.toggle('active');
            }
        });
    }

    // --- 5. Funktion för att växla mellan sidor (kontaktlogik) ---
    const toggleContactPage = (isContact) => {
        if (isContact) {
            body.classList.add('on-contact-page');
            document.title = 'Copenhagen Guide | Kontakta Oss';
        } else {
            body.classList.remove('on-contact-page');
            document.title = 'Copenhagen Guide | Din guide till Köpenhamn';
        }
    };

    // --- 6. Hantera sidladdning och back/forward-knappen ---
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
    
    // Kör vid back/forward (Popstate)
    window.addEventListener('popstate', handleStateChange);
    

    // --- 7. Klickhändelse och Smooth Scroll Logik ---
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
                // ÖVRIGA SEKTIONER LOGIK
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
