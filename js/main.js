/* ==========================================================================
   AFRICONNECT SUMMIT 2026 - JAVASCRIPT PRINCIPAL (Vanilla JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------------------
       1. DARK MODE / LIGHT MODE (Persistant via localStorage)
       ---------------------------------------------------------------------- */
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const htmlElement = document.documentElement;

    // Récupérer le thème sauvegardé ou utiliser la préférence système
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    applyTheme(initialTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    function applyTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        if (themeIcon) {
            if (theme === 'dark') {
                themeIcon.className = 'bi bi-sun-fill';
            } else {
                themeIcon.className = 'bi bi-moon-fill';
            }
        }
    }


    /* ----------------------------------------------------------------------
       2. NAVBAR DYNAMIQUE & MENU HAMBURGER MOBILE
       ---------------------------------------------------------------------- */
    const header = document.querySelector('.header');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    // Changement de style au scroll (> 80px)
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    });

    // Menu Hamburger Mobile
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isOpen);
        });

        // Fermer le menu lors du clic sur un lien
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', false);
            });
        });
    }


    /* ----------------------------------------------------------------------
       3. COMPTE À REBOURS EN TEMPS RÉEL (SECTION HERO)
       ---------------------------------------------------------------------- */
    // Date fictive de la conférence : 15 Novembre 2026 à 09:00:00
    const targetDate = new Date('November 15, 2026 09:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (!daysEl) return; // Sécurité si l'élément n'existe pas sur la page

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            daysEl.textContent = String(days).padStart(2, '0');
            hoursEl.textContent = String(hours).padStart(2, '0');
            minutesEl.textContent = String(minutes).padStart(2, '0');
            secondsEl.textContent = String(seconds).padStart(2, '0');
        } else {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);


    /* ----------------------------------------------------------------------
       4. ANIMATIONS AU SCROLL (IntersectionObserver)
       ---------------------------------------------------------------------- */
    const animatedElements = document.querySelectorAll('.fade-in-scroll');

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // L'animation ne s'exécute qu'une fois
            }
        });
    }, {
        threshold: 0.15
    });

    animatedElements.forEach(el => scrollObserver.observe(el));


    /* ----------------------------------------------------------------------
       5. COMPTEURS ANIMÉS (SECTION CHIFFRES CLÉS)
       ---------------------------------------------------------------------- */
    const statNumbers = document.querySelectorAll('.stat-number');

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endValue = parseInt(target.getAttribute('data-target'), 10);
                animateCounter(target, endValue);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => statsObserver.observe(stat));

    function animateCounter(element, targetValue) {
        let startValue = 0;
        const duration = 2000; // 2 secondes
        const frameRate = 1000 / 60; // 60 images/sec
        const totalFrames = Math.round(duration / frameRate);
        const increment = targetValue / totalFrames;

        const counterInterval = setInterval(() => {
            startValue += increment;
            if (startValue >= targetValue) {
                element.textContent = targetValue.toLocaleString();
                clearInterval(counterInterval);
            } else {
                element.textContent = Math.floor(startValue).toLocaleString();
            }
        }, frameRate);
    }


    /* ----------------------------------------------------------------------
       6. BOUTON RETOUR EN HAUT (SCROLL TO TOP)
       ---------------------------------------------------------------------- */
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.style.display = 'flex';
            } else {
                scrollTopBtn.style.display = 'none';
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    /* ----------------------------------------------------------------------
       7. ANNÉE DYNAMIQUE DANS LE FOOTER
       ---------------------------------------------------------------------- */
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }


    /* ----------------------------------------------------------------------
       8. GESTION DES ONGLETS DE PROGRAMME (Pour programme.html)
       ---------------------------------------------------------------------- */
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const dayId = button.getAttribute('data-day');

                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                button.classList.add('active');
                document.getElementById(dayId)?.classList.add('active');
            });
        });
    }


    /* ----------------------------------------------------------------------
       9. FILTRAGE DYNAMIQUE DES INTERVENANTS (Pour intervenants.html)
       ---------------------------------------------------------------------- */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const speakerCards = document.querySelectorAll('.speaker-card-item');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');

                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                speakerCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

});/* ----------------------------------------------------------------------
       10. VALIDATION DU FORMULAIRE D'INSCRIPTION (Pour contact.html)
       ---------------------------------------------------------------------- */
    const registrationForm = document.getElementById('registrationForm');

    if (registrationForm) {

        registrationForm.addEventListener('submit', (e) => {
            e.preventDefault(); // On empêche l'envoi/rechargement de la page

            let isFormValid = true;

            // --- Nom complet ---
            const fullname = document.getElementById('fullname');
            if (fullname.value.trim() === '') {
                showError(fullname, 'Le nom complet est requis.');
                isFormValid = false;
            } else {
                showSuccess(fullname);
            }

            // --- Email (regex) ---
            const email = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value.trim())) {
                showError(email, 'Veuillez entrer un email valide.');
                isFormValid = false;
            } else {
                showSuccess(email);
            }

            // --- Téléphone (minimum 8 chiffres) ---
            const phone = document.getElementById('phone');
            const phoneDigits = phone.value.replace(/\D/g, ''); // on garde uniquement les chiffres
            if (phoneDigits.length < 8) {
                showError(phone, 'Le numéro doit contenir au moins 8 chiffres.');
                isFormValid = false;
            } else {
                showSuccess(phone);
            }

            // --- Type de participation ---
            const participation = document.getElementById('participation');
            if (participation.value === '') {
                showError(participation, 'Veuillez choisir un type de participation.');
                isFormValid = false;
            } else {
                showSuccess(participation);
            }

            // --- Pays ---
            const country = document.getElementById('country');
            if (country.value === '') {
                showError(country, 'Veuillez choisir votre pays.');
                isFormValid = false;
            } else {
                showSuccess(country);
            }

            // --- Message (minimum 20 caractères) ---
            const message = document.getElementById('message');
            if (message.value.trim().length < 20) {
                showError(message, 'Le message doit contenir au moins 20 caractères.');
                isFormValid = false;
            } else {
                showSuccess(message);
            }

            // --- Si tout est valide ---
            if (isFormValid) {
                const successMessage = document.getElementById('successMessage');
                successMessage.classList.add('show');

                registrationForm.reset(); // Réinitialise le formulaire

                // On enlève les classes valid/invalid après reset
                registrationForm.querySelectorAll('.valid, .invalid').forEach(field => {
                    field.classList.remove('valid', 'invalid');
                });

                // On masque le message de succès après 4 secondes
                setTimeout(() => {
                    successMessage.classList.remove('show');
                }, 4000);
            }
        });

        // Fonction pour afficher une erreur sur un champ
        function showError(field, message) {
            field.classList.remove('valid');
            field.classList.add('invalid');
            const errorSpan = field.parentElement.querySelector('.error-message');
            if (errorSpan) errorSpan.textContent = message;
        }

        // Fonction pour marquer un champ comme valide
        function showSuccess(field) {
            field.classList.remove('invalid');
            field.classList.add('valid');
            const errorSpan = field.parentElement.querySelector('.error-message');
            if (errorSpan) errorSpan.textContent = '';
        }
    }