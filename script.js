document.addEventListener('DOMContentLoaded', () => {
    
    const body = document.body;
    const navList = document.querySelector('.nav-list');
    const mainHeader = document.querySelector('.main-header'); 

    // --- 1. Hamburgermeny för Mobilläge ---
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        menuToggle.addEventListener('click', () => {
            if (navList) {
                navList.classList.toggle('active');
            }
        });
    }

    // --- 2. Funktion för att växla mellan sidor ---
    const toggleContactPage = (isContact) => {
        if (isContact) {
            // Lägg till klass för att dölja huvudsektionerna via styles.css
            body.classList.add('on-contact-page');
            document.title = 'Copenhagen Guide | Kontakta Oss';
        } else {
            // Ta bort klass för att visa huvudsektionerna
            body.classList.remove('on-contact-page');
            document.title = 'Copenhagen Guide | Din guide till Köpenhamn';
        }
    };

    // --- 3. Klickhändelse och Sidbyte Logik ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            
            // Förhindra standardbeteendet (hoppa) direkt
            e.preventDefault(); 
            
            // Stäng menyn i mobilläge
            if (window.innerWidth <= 900 && navList) {
                navList.classList.remove('active');
            }

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            const headerHeight = mainHeader ? mainHeader.offsetHeight : 0;
            
            if (targetId === 'kontakt') {
                // Byter till kontaktsidan (som nu visas i toppen av fönstret)
                toggleContactPage(true);
                window.scrollTo({ top: 0, behavior: 'smooth' }); // Scrolla till toppen
                history.pushState(null, null, '#kontakt');

            } else if (targetElement) {
                // Byter till en av de vanliga sektionerna
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

    // --- 4. Hantera sidladdning och back/forward-knappen ---
    const handleStateChange = () => {
        if (window.location.hash === '#kontakt') {
            toggleContactPage(true);
        } else {
            toggleContactPage(false);
            
            // Återställ scrollposition för andra sektioner vid back/forward
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
});
    
    // Kolla vid sidladdning
    if (window.location.hash === '#kontakt') {
        toggleContactPage(true);
    } else {
        toggleContactPage(false);
    }

    // --- Smooth Scroll & Hantering av hash-länkar ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            
            // Stänger menyn i mobilläge
            if (window.innerWidth <= 900 && navList) {
                 navList.classList.remove('active');
            }
            
            if (this.getAttribute('href').length > 1) { 
                e.preventDefault();

                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetId === 'kontakt') {
                    // KONTAKTSIDA LOGIK
                    toggleContactPage(true);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    history.pushState(null, null, this.getAttribute('href'));

                } else if (targetElement) {
                    // ÖVRIGA SEKTIONER LOGIK (dvs. Attraktioner, Matställen etc.)
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
    
    // Hantera back/forward i webbläsaren
    window.addEventListener('popstate', () => {
        if (window.location.hash === '#kontakt') {
            toggleContactPage(true);
        } else {
            toggleContactPage(false);
            
            const hash = window.location.hash.substring(1);
            if(hash) {
                 const targetElement = document.getElementById(hash);
                 if(targetElement) {
                    const headerHeight = mainHeader ? mainHeader.offsetHeight : 0;
                    const topPosition = targetElement.offsetTop - headerHeight;
                    window.scrollTo({ top: topPosition, behavior: 'smooth' });
                 }
            }
        }
    });
});