document.addEventListener('DOMContentLoaded', function() {
    // Pobieranie elementów DOM
    const redOval = document.querySelector('.red-oval');
    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');
    const toggleSwitch = document.querySelector('#checkbox');
    
    // Linie tekstu do animacji
    const lines = [
"Ich bin Paweł Matras – ein leidenschaftlicher Entwickler",
"moderner Webseiten in der Schweiz",
"die auf jedes Gerät optimal abgestimmt sind"
    ];
    
    const lineElements = [
        document.getElementById('line1'),
        document.getElementById('line2'),
        document.getElementById('line3')
    ];
    
    // Obsługa ruchu myszy dla czerwonego owalu
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const maxOffset = 20;
        
        const offsetX = (mouseX - 0.5) * 2 * maxOffset;
        const offsetY = (mouseY - 0.5) * 2 * maxOffset;
        
        redOval.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
    });
    
    // Funkcja zmieniająca motyw
    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }    
    }
    
    // Nasłuchiwanie zmiany przełącznika
    toggleSwitch.addEventListener('change', switchTheme, false);
    
    // Sprawdzenie zapisanego motywu
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
    
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
    
        if (currentTheme === 'light') {
            toggleSwitch.checked = true;
        }
    }
    
    // Funkcja efektu pisania tekstu
    function typeText(element, text, callback) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, 20);
            } else if (callback) {
                setTimeout(callback, 100);
            }
        }
        
        type();
    }
    
    // Funkcja efektu pisania imienia
    function typeFirstName(callback) {
        firstName.textContent = '';
        firstName.classList.remove('hidden');
        
        let text = 'PAWEŁ';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                firstName.textContent += text.charAt(i);
                i++;
                setTimeout(type, 100); // wolniejsze pisanie
            } else if (callback) {
                setTimeout(callback, 300);
            }
        }
        
        type();
    }
    
    // Funkcja dla efektu zwieszania się owalu
    function dropInOval() {
        // Resetujemy pozycję owalu na początku (poza widokiem na górze)
        redOval.style.transition = "none";
        redOval.style.transform = "translate(-50%, -200%)";
        redOval.classList.remove('hidden');
        
        // Wymuszamy reflow, aby zmiany zostały zastosowane natychmiast
        void redOval.offsetWidth;
        
        // Ustawiamy animację i rozpoczynamy zwieszanie
        redOval.style.transition = "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)";
        redOval.style.transform = "translate(-50%, -50%)";
    }
    
    // Funkcja startująca animację tekstu na dole
    function startTypingBottomText() {
        typeText(lineElements[0], lines[0], function() {
            typeText(lineElements[1], lines[1], function() {
                typeText(lineElements[2], lines[2]);
            });
        });
    }
    
    // Sekwencja animacji
    // 1. Najpierw mamy już tło
    // 2. Po 1s zaczynamy animację imienia
    setTimeout(function() {
        typeFirstName(function() {
            // 3. Po zakończeniu animacji imienia, pokazujemy nazwisko i równocześnie animowany owal
            lastName.classList.remove('hidden');
            dropInOval(); // Rozpoczynamy zwieszanie owalu równocześnie z pojawieniem się nazwiska
            
            // 4. Po pokazaniu nazwiska i owalu, startujemy animację opisów
            setTimeout(function() {
                startTypingBottomText();
            }, 800); // Dajemy czas na zakończenie animacji owalu
        });
    }, 1000);
});
// Efekt fade-in dla sekcji "O mnie"
document.addEventListener('DOMContentLoaded', function() {
    // Konfiguracja obserwatora przecięcia (Intersection Observer)
    const observerOptions = {
        root: null, // obserwuje względem viewport
        rootMargin: '0px', // bez dodatkowych marginesów
        threshold: 0.2 // uruchamia się, gdy 20% elementu jest widoczne
    };
    
    // Tworzenie obserwatora
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Dodanie klasy powodującej animację
                entry.target.classList.add('visible');
                // Zatrzymanie obserwacji po wykonaniu animacji
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Wybieranie wszystkich elementów z klasą fade-in
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Rozpoczęcie obserwacji każdego elementu
    fadeElements.forEach(element => {
        observer.observe(element);
    });
});
// Animacja bloków umiejętności
document.addEventListener('DOMContentLoaded', function() {
    const skillBlocks = document.querySelectorAll('.skill-block');
    
    // Dodaj opóźnienia dla każdego bloku, aby pojawiały się jeden po drugim
    skillBlocks.forEach((block, index) => {
        block.style.opacity = '0';
        block.style.transform = 'translateY(20px)';
        block.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        block.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Funkcja sprawdzająca, czy element jest w widoku
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Funkcja do animowania bloków, gdy są widoczne
    function animateOnScroll() {
        skillBlocks.forEach(block => {
            if (isInViewport(block) && block.style.opacity === '0') {
                block.style.opacity = '1';
                block.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Nasłuchuj zdarzenia scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Uruchom animację dla widocznych bloków po załadowaniu
    animateOnScroll();
});
document.addEventListener('DOMContentLoaded', function() {
    
    // Pozostały kod z DOMContentLoaded...
    
    // Efekt pisania maszynowego w sekcji kontakt
    const typingText = document.getElementById('typing-text');
    
    if (typingText) {
        // Tablica pomysłów na strony do wyświetlenia
        const ideas = [
           "Ich möchte eine Website für eine Schweizer Schreinerei",
"Ich brauche ein Portfolio für einen Fotografen in Zürich",
"Ich suche einen Entwickler für einen Online-Shop in der Schweiz",
"Ich plane eine Website für ein Restaurant in Genf",
"Ich träume von einer Website für meinen Blog über die Schweizer Alpen"

        ];
        
        let currentIdeaIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typingSpeed = 70; // Prędkość pisania (ms)
        let deletingSpeed = 30; // Prędkość usuwania (ms)
        let pauseBeforeDelete = 1500; // Czas pauzy przed usuwaniem (ms)
        let pauseBeforeNewIdea = 500; // Czas pauzy przed nowym pomysłem (ms)
        
        // Funkcja do animacji pisania
        function typeIdea() {
            const currentIdea = ideas[currentIdeaIndex];
            
            if (isDeleting) {
                // Usuwamy tekst
                typingText.textContent = currentIdea.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                typingSpeed = deletingSpeed;
                
                if (currentCharIndex === 0) {
                    isDeleting = false;
                    currentIdeaIndex = (currentIdeaIndex + 1) % ideas.length;
                    typingSpeed = pauseBeforeNewIdea;
                }
            } else {
                // Piszemy tekst
                typingText.textContent = currentIdea.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                typingSpeed = 70;
                
                if (currentCharIndex === currentIdea.length) {
                    isDeleting = true;
                    typingSpeed = pauseBeforeDelete;
                }
            }
            
            setTimeout(typeIdea, typingSpeed);
        }
        
        // Rozpocznij animację
        setTimeout(typeIdea, 1000);
    }
    
    // Kontynuacja kodu DOMContentLoaded...
});
// Funkcja do obsługi efektu pisania tekstu dla skill
document.addEventListener('DOMContentLoaded', function() {
    const skillBlocks = document.querySelectorAll('.skill-block');
    
    // Funkcja efektu pisania tekstu
    function typeWriter(element, text, speed = 20) {
        let i = 0;
        element.textContent = '';
        
        return new Promise(resolve => {
            function type() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                } else {
                    resolve();
                }
            }
            
            type();
        });
    }
    
    // Dla każdego bloku umiejętności
    skillBlocks.forEach(block => {
        const title = block.querySelector('.skill-title');
        const description = block.querySelector('.skill-description');
        
        // Zapisz oryginalny tekst opisu i wyczyść go
        const originalText = description.textContent;
        description.textContent = '';
        
        let hoverTimer; // Timer dla opóźnienia
        let isAnimating = false; // Flaga wskazująca, czy animacja jest w trakcie
        
        // Dodaj listener na najechanie kursorem
        block.addEventListener('mouseenter', function() {
            // Ustawienie timera na 1 sekundę (1000ms)
            hoverTimer = setTimeout(function() {
                isAnimating = true;
                // Dodaj klasę, która uruchomi animację CSS
                block.classList.add('animate-description');
                // Ukryj tytuł i upewnij się, że nie jest widoczny
                title.style.display = 'none';
                // Uruchom efekt pisania tekstu
                typeWriter(description, originalText, 15);
            }, 1000);
        });
        
        // Dodaj listener na zjechanie kursorem
        block.addEventListener('mouseleave', function() {
            // Wyczyść timer, jeśli użytkownik zjechał kursorem przed upływem 1 sekundy
            clearTimeout(hoverTimer);
            
            // Usuń klasę animacji
            block.classList.remove('animate-description');
            // Zatrzymaj animację i przywróć stan początkowy
            title.style.display = 'block';
            description.textContent = '';
            isAnimating = false;
        });
    });
});
// Efekt fade-in dla sekcji "Skills"
document.addEventListener('DOMContentLoaded', function() {
    // Konfiguracja obserwatora przecięcia (Intersection Observer)
    const skillsObserverOptions = {
        root: null, // obserwuje względem viewport
        rootMargin: '0px', // bez dodatkowych marginesów
        threshold: 0.2 // uruchamia się, gdy 20% elementu jest widoczne
    };
    
    // Wybierz nagłówek i siatkę umiejętności
    const skillsHeading = document.querySelector('.skills-section h2');
    const skillsGrid = document.querySelector('.skills-grid');
    
    // Dodaj klasę fade-in do elementów
    if (skillsHeading) skillsHeading.classList.add('fade-in');
    if (skillsGrid) skillsGrid.classList.add('fade-in', 'fade-delay-1');
    
    // Tworzenie obserwatora
    const skillsObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Dodanie klasy powodującej animację
                entry.target.classList.add('visible');
                // Zatrzymanie obserwacji po wykonaniu animacji
                observer.unobserve(entry.target);
            }
        });
    }, skillsObserverOptions);
    
    // Rozpoczęcie obserwacji elementów
    if (skillsHeading) skillsObserver.observe(skillsHeading);
    if (skillsGrid) skillsObserver.observe(skillsGrid);
    
    // Możesz też dodać animację dla każdego bloku umiejętności osobno
    const skillBlocks = document.querySelectorAll('.skill-block');
    skillBlocks.forEach((block, index) => {
        block.classList.add('fade-in');
        // Dodaj większe opóźnienie dla każdego kolejnego bloku
        block.style.transitionDelay = `${0.2 + (index * 0.1)}s`;
        skillsObserver.observe(block);
    });
});
// Obsługa animacji sekcji Kontakt z blokami
document.addEventListener('DOMContentLoaded', function() {
    // Konfiguracja obserwatora przecięcia (Intersection Observer)
    const contactObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };
    
    // Obsługa bloków kontaktowych - podobnie jak w sekcji skills
    const contactBlocks = document.querySelectorAll('.contact-block');
    
    // Dodaj animację pojawiania się dla każdego bloku
    contactBlocks.forEach((block, index) => {
        block.style.opacity = '0';
        block.style.transform = 'translateY(20px)';
        block.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        block.style.transitionDelay = `${index * 0.1}s`;
        
        // Zaprogramowanie efektu po najechaniu
        let hoverTimer; // Timer dla opóźnienia
        
        // Dodaj listener na najechanie kursorem
        block.addEventListener('mouseenter', function() {
            // Ustawienie timera na 1 sekundę (1000ms)
            hoverTimer = setTimeout(function() {
                // Dodaj klasę pokazującą opis
                block.classList.add('show-description');
            }, 1000);
        });
        
        // Dodaj listener na zjechanie kursorem
        block.addEventListener('mouseleave', function() {
            // Wyczyść timer, jeśli użytkownik zjechał kursorem przed upływem 1 sekundy
            clearTimeout(hoverTimer);
            
            // Usuń klasę pokazującą opis
            block.classList.remove('show-description');
        });
    });
    
    // Funkcja sprawdzająca, czy element jest w widoku
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Funkcja do animowania bloków, gdy są widoczne
    function animateContactBlocks() {
        contactBlocks.forEach(block => {
            if (isInViewport(block) && block.style.opacity === '0') {
                block.style.opacity = '1';
                block.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Nasłuchuj zdarzenia scroll
    window.addEventListener('scroll', animateContactBlocks);
    
    // Uruchom animację dla widocznych bloków po załadowaniu
    animateContactBlocks();
    
    // Dodaj linki do bloków kontaktowych
    const emailBlock = document.querySelector('.contact-block:nth-child(1)');
    const instagramBlock = document.querySelector('.contact-block:nth-child(2)');
    const tiktokBlock = document.querySelector('.contact-block:nth-child(3)');
    const telegramBlock = document.querySelector('.contact-block:nth-child(4)');
    
    // Dodaj zdarzenia kliknięcia
    if (emailBlock) {
        emailBlock.addEventListener('click', function() {
            window.location.href = 'mailto:pawelmatras10@icloud.com';
        });
    }
    
    if (instagramBlock) {
        instagramBlock.addEventListener('click', function() {
            window.open('https://instagram.com/pixelperfekt.ch', '_blank');
        });
    }
    
    if (tiktokBlock) {
        tiktokBlock.addEventListener('click', function() {
            window.open('https://tiktok.com/@matrasiik', '_blank');
        });
    }
    
    if (telegramBlock) {
        telegramBlock.addEventListener('click', function() {
            window.open('https://t.me/matras', '_blank');
        });
    }
});
// Obsługa animacji fade-in dla sekcji kontakt
document.addEventListener('DOMContentLoaded', function() {
    // Efekt pisania maszynowego w sekcji kontakt
    const typingText = document.getElementById('typing-text');
    
    if (typingText) {
        // Kod dla efektu pisania maszynowego...
    }
    
    // Konfiguracja obserwatora przecięcia (Intersection Observer) dla efektu fade-in
    const contactObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };
    
    // Tworzenie obserwatora dla elementów z klasą fade-in
    const contactObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Dodanie klasy powodującej animację
                entry.target.classList.add('visible');
                // Zatrzymanie obserwacji po wykonaniu animacji
                observer.unobserve(entry.target);
            }
        });
    }, contactObserverOptions);
    
    // Wybieranie wszystkich elementów z klasą fade-in w sekcji kontakt
    const contactFadeElements = document.querySelectorAll('.contact-section .fade-in');
    
    // Rozpoczęcie obserwacji każdego elementu
    contactFadeElements.forEach(element => {
        contactObserver.observe(element);
    });
    
    // Obsługa bloków kontaktowych...
});
// Obsługa animacji pojawienia się stopki
document.addEventListener('DOMContentLoaded', function() {
    // Konfiguracja obserwatora przecięcia (Intersection Observer) dla stopki
    const footerObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    // Tworzenie obserwatora dla stopki
    const footerObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Dodanie klasy powodującej animację
                entry.target.classList.add('fade-in-active');
                // Zatrzymanie obserwacji po wykonaniu animacji
                observer.unobserve(entry.target);
            }
        });
    }, footerObserverOptions);
    
    // Obserwacja stopki
    const footer = document.querySelector('.footer');
    if (footer) {
        footer.classList.add('fade-in-footer');
        footerObserver.observe(footer);
    }
    
    // Obsługa przewijania do sekcji po kliknięciu w link w stopce
    const footerLinks = document.querySelectorAll('.footer-link');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});
// Obsługa pionowego menu nawigacyjnego
document.addEventListener('DOMContentLoaded', function() {
    const verticalNav = document.querySelector('.vertical-nav');
    
    // Pokazanie menu po 5 sekundach
    setTimeout(function() {
        if (verticalNav) {
            verticalNav.classList.add('show');
        }
    }, 5000);
    
    // Obsługa aktywnej sekcji podczas przewijania
    const sections = document.querySelectorAll('section, .hero');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function setActiveNav() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                currentSection = section.getAttribute('id') || 'hero';
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            if (href === '#' && currentSection === 'hero') {
                link.classList.add('active');
            } else if (href === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Nasłuchiwanie na zdarzenie przewijania
    window.addEventListener('scroll', setActiveNav);
    
    // Obsługa kliknięć w linki nawigacyjne
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') {
                // Jeśli to link do strony głównej, przewiń na górę
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                // W przeciwnym razie przewiń do odpowiedniej sekcji
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Ustaw aktywny link na początku
    setActiveNav();
});
// Przykład prostego efektu parallax dla tła sekcji hero
window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    document.querySelector('.hero').style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
});
// Rozbuduj obserwator przecięcia o bardziej zaawansowane animacje
const animatedElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated', 'fadeInUp');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

animatedElements.forEach(element => observer.observe(element));
// Obsługa menu mobilnego
document.addEventListener('DOMContentLoaded', function() {
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
            
            // Aktualizacja aktywnego linku
            mobileNavLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Aktualizacja aktywnego linku podczas przewijania
    function setActiveMobileNav() {
        const sections = document.querySelectorAll('section, .hero');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                currentSection = section.getAttribute('id') || 'hero';
            }
        });
        
        mobileNavLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            if (href === '#' && currentSection === 'hero') {
                link.classList.add('active');
            } else if (href === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveMobileNav);
    setActiveMobileNav();
});
// Wykrywanie urządzeń mobilnych i dostosowanie animacji
document.addEventListener('DOMContentLoaded', function() {
    const isMobile = window.innerWidth <= 576;
    
    if (isMobile) {
        // Przyspiesz animacje na urządzeniach mobilnych
        document.querySelectorAll('.fade-in').forEach(el => {
            el.style.transitionDuration = '0.5s';
        });
        
        // Zmniejsz opóźnienia między animacjami
        document.querySelectorAll('.fade-delay-1').forEach(el => {
            el.style.transitionDelay = '0.1s';
        });
        document.querySelectorAll('.fade-delay-2').forEach(el => {
            el.style.transitionDelay = '0.2s';
        });
        document.querySelectorAll('.fade-delay-3').forEach(el => {
            el.style.transitionDelay = '0.3s';
        });
        
        // Wyłącz animacje przy najechaniu dla bloków umiejętności
        const skillBlocks = document.querySelectorAll('.skill-block');
        skillBlocks.forEach(block => {
            const title = block.querySelector('.skill-title');
            const description = block.querySelector('.skill-description');
            
            // Pokaż zarówno tytuł jak i opis
            if (title) title.style.opacity = '1';
            if (description) {
                description.style.opacity = '1';
                description.style.maxHeight = '200px';
            }
            
            // Usuń eventy hover
            block.removeEventListener('mouseenter', function() {});
            block.removeEventListener('mouseleave', function() {});
        });document.addEventListener('DOMContentLoaded', function() {
    // Pobieranie elementów DOM
    const redOval = document.querySelector('.red-oval');
    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');
    const toggleSwitch = document.querySelector('#checkbox');
    
    // Linie tekstu do animacji
    const lines = [
        "Jestem Paweł Matras- pasjonat",
        "tworzenia nowoczesnych stron internetowych",
        "dostosowanych do każdego urządzenia"
    ];
    
    const lineElements = [
        document.getElementById('line1'),
        document.getElementById('line2'),
        document.getElementById('line3')
    ];
    
    // Obsługa ruchu myszy dla czerwonego owalu
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const maxOffset = 20;
        
        const offsetX = (mouseX - 0.5) * 2 * maxOffset;
        const offsetY = (mouseY - 0.5) * 2 * maxOffset;
        
        redOval.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
    });
    
    // Funkcja zmieniająca motyw
    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }    
    }
    
    // Nasłuchiwanie zmiany przełącznika
    toggleSwitch.addEventListener('change', switchTheme, false);
    
    // Sprawdzenie zapisanego motywu
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
    
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
    
        if (currentTheme === 'light') {
            toggleSwitch.checked = true;
        }
    }
    
    // Funkcja efektu pisania tekstu
    function typeText(element, text, callback) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, 20);
            } else if (callback) {
                setTimeout(callback, 100);
            }
        }
        
        type();
    }
    
    // Funkcja efektu pisania imienia
    function typeFirstName(callback) {
        firstName.textContent = '';
        firstName.classList.remove('hidden');
        
        let text = 'PAWEŁ';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                firstName.textContent += text.charAt(i);
                i++;
                setTimeout(type, 100); // wolniejsze pisanie
            } else if (callback) {
                setTimeout(callback, 300);
            }
        }
        
        type();
    }
    
    // Funkcja dla efektu zwieszania się owalu
    function dropInOval() {
        // Resetujemy pozycję owalu na początku (poza widokiem na górze)
        redOval.style.transition = "none";
        redOval.style.transform = "translate(-50%, -200%)";
        redOval.classList.remove('hidden');
        
        // Wymuszamy reflow, aby zmiany zostały zastosowane natychmiast
        void redOval.offsetWidth;
        
        // Ustawiamy animację i rozpoczynamy zwieszanie
        redOval.style.transition = "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)";
        redOval.style.transform = "translate(-50%, -50%)";
    }
    
    // Funkcja startująca animację tekstu na dole
    function startTypingBottomText() {
        typeText(lineElements[0], lines[0], function() {
            typeText(lineElements[1], lines[1], function() {
                typeText(lineElements[2], lines[2]);
            });
        });
    }
    
    // Sekwencja animacji
    // 1. Najpierw mamy już tło
    // 2. Po 1s zaczynamy animację imienia
    setTimeout(function() {
        typeFirstName(function() {
            // 3. Po zakończeniu animacji imienia, pokazujemy nazwisko i równocześnie animowany owal
            lastName.classList.remove('hidden');
            dropInOval(); // Rozpoczynamy zwieszanie owalu równocześnie z pojawieniem się nazwiska
            
            // 4. Po pokazaniu nazwiska i owalu, startujemy animację opisów
            setTimeout(function() {
                startTypingBottomText();
            }, 800); // Dajemy czas na zakończenie animacji owalu
        });
    }, 1000);
});
// Efekt fade-in dla sekcji "O mnie"
document.addEventListener('DOMContentLoaded', function() {
    // Konfiguracja obserwatora przecięcia (Intersection Observer)
    const observerOptions = {
        root: null, // obserwuje względem viewport
        rootMargin: '0px', // bez dodatkowych marginesów
        threshold: 0.2 // uruchamia się, gdy 20% elementu jest widoczne
    };
    
    // Tworzenie obserwatora
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Dodanie klasy powodującej animację
                entry.target.classList.add('visible');
                // Zatrzymanie obserwacji po wykonaniu animacji
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Wybieranie wszystkich elementów z klasą fade-in
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Rozpoczęcie obserwacji każdego elementu
    fadeElements.forEach(element => {
        observer.observe(element);
    });
});
// Animacja bloków umiejętności
document.addEventListener('DOMContentLoaded', function() {
    const skillBlocks = document.querySelectorAll('.skill-block');
    
    // Dodaj opóźnienia dla każdego bloku, aby pojawiały się jeden po drugim
    skillBlocks.forEach((block, index) => {
        block.style.opacity = '0';
        block.style.transform = 'translateY(20px)';
        block.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        block.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Funkcja sprawdzająca, czy element jest w widoku
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Funkcja do animowania bloków, gdy są widoczne
    function animateOnScroll() {
        skillBlocks.forEach(block => {
            if (isInViewport(block) && block.style.opacity === '0') {
                block.style.opacity = '1';
                block.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Nasłuchuj zdarzenia scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Uruchom animację dla widocznych bloków po załadowaniu
    animateOnScroll();
});
document.addEventListener('DOMContentLoaded', function() {
    
    // Pozostały kod z DOMContentLoaded...
    
    // Efekt pisania maszynowego w sekcji kontakt
    const typingText = document.getElementById('typing-text');
    
    if (typingText) {
        // Tablica pomysłów na strony do wyświetlenia
        const ideas = [
            "Chcę stronę dla firmy stolarskiej",
            "Potrzebuję portfolio dla fotografa",
            "Szukam developera do sklepu online",
            "Planuję stworzyć stronę dla restauracji",
            "Marzę o stronie dla mojego bloga podróżniczego"
        ];
        
        let currentIdeaIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typingSpeed = 70; // Prędkość pisania (ms)
        let deletingSpeed = 30; // Prędkość usuwania (ms)
        let pauseBeforeDelete = 1500; // Czas pauzy przed usuwaniem (ms)
        let pauseBeforeNewIdea = 500; // Czas pauzy przed nowym pomysłem (ms)
        
        // Funkcja do animacji pisania
        function typeIdea() {
            const currentIdea = ideas[currentIdeaIndex];
            
            if (isDeleting) {
                // Usuwamy tekst
                typingText.textContent = currentIdea.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                typingSpeed = deletingSpeed;
                
                if (currentCharIndex === 0) {
                    isDeleting = false;
                    currentIdeaIndex = (currentIdeaIndex + 1) % ideas.length;
                    typingSpeed = pauseBeforeNewIdea;
                }
            } else {
                // Piszemy tekst
                typingText.textContent = currentIdea.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                typingSpeed = 70;
                
                if (currentCharIndex === currentIdea.length) {
                    isDeleting = true;
                    typingSpeed = pauseBeforeDelete;
                }
            }
            
            setTimeout(typeIdea, typingSpeed);
        }
        
        // Rozpocznij animację
        setTimeout(typeIdea, 1000);
    }
    
    // Kontynuacja kodu DOMContentLoaded...
});
// Funkcja do obsługi efektu pisania tekstu dla skill
document.addEventListener('DOMContentLoaded', function() {
    const skillBlocks = document.querySelectorAll('.skill-block');
    
    // Funkcja efektu pisania tekstu
    function typeWriter(element, text, speed = 20) {
        let i = 0;
        element.textContent = '';
        
        return new Promise(resolve => {
            function type() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                } else {
                    resolve();
                }
            }
            
            type();
        });
    }
    
    // Dla każdego bloku umiejętności
    skillBlocks.forEach(block => {
        const title = block.querySelector('.skill-title');
        const description = block.querySelector('.skill-description');
        
        // Zapisz oryginalny tekst opisu i wyczyść go
        const originalText = description.textContent;
        description.textContent = '';
        
        let hoverTimer; // Timer dla opóźnienia
        let isAnimating = false; // Flaga wskazująca, czy animacja jest w trakcie
        
        // Dodaj listener na najechanie kursorem
        block.addEventListener('mouseenter', function() {
            // Ustawienie timera na 1 sekundę (1000ms)
            hoverTimer = setTimeout(function() {
                isAnimating = true;
                // Dodaj klasę, która uruchomi animację CSS
                block.classList.add('animate-description');
                // Ukryj tytuł i upewnij się, że nie jest widoczny
                title.style.display = 'none';
                // Uruchom efekt pisania tekstu
                typeWriter(description, originalText, 15);
            }, 1000);
        });
        
        // Dodaj listener na zjechanie kursorem
        block.addEventListener('mouseleave', function() {
            // Wyczyść timer, jeśli użytkownik zjechał kursorem przed upływem 1 sekundy
            clearTimeout(hoverTimer);
            
            // Usuń klasę animacji
            block.classList.remove('animate-description');
            // Zatrzymaj animację i przywróć stan początkowy
            title.style.display = 'block';
            description.textContent = '';
            isAnimating = false;
        });
    });
});
// Efekt fade-in dla sekcji "Skills"
document.addEventListener('DOMContentLoaded', function() {
    // Konfiguracja obserwatora przecięcia (Intersection Observer)
    const skillsObserverOptions = {
        root: null, // obserwuje względem viewport
        rootMargin: '0px', // bez dodatkowych marginesów
        threshold: 0.2 // uruchamia się, gdy 20% elementu jest widoczne
    };
    
    // Wybierz nagłówek i siatkę umiejętności
    const skillsHeading = document.querySelector('.skills-section h2');
    const skillsGrid = document.querySelector('.skills-grid');
    
    // Dodaj klasę fade-in do elementów
    if (skillsHeading) skillsHeading.classList.add('fade-in');
    if (skillsGrid) skillsGrid.classList.add('fade-in', 'fade-delay-1');
    
    // Tworzenie obserwatora
    const skillsObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Dodanie klasy powodującej animację
                entry.target.classList.add('visible');
                // Zatrzymanie obserwacji po wykonaniu animacji
                observer.unobserve(entry.target);
            }
        });
    }, skillsObserverOptions);
    
    // Rozpoczęcie obserwacji elementów
    if (skillsHeading) skillsObserver.observe(skillsHeading);
    if (skillsGrid) skillsObserver.observe(skillsGrid);
    
    // Możesz też dodać animację dla każdego bloku umiejętności osobno
    const skillBlocks = document.querySelectorAll('.skill-block');
    skillBlocks.forEach((block, index) => {
        block.classList.add('fade-in');
        // Dodaj większe opóźnienie dla każdego kolejnego bloku
        block.style.transitionDelay = `${0.2 + (index * 0.1)}s`;
        skillsObserver.observe(block);
    });
});
// Obsługa animacji sekcji Kontakt z blokami
document.addEventListener('DOMContentLoaded', function() {
    // Konfiguracja obserwatora przecięcia (Intersection Observer)
    const contactObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };
    
    // Obsługa bloków kontaktowych - podobnie jak w sekcji skills
    const contactBlocks = document.querySelectorAll('.contact-block');
    
    // Dodaj animację pojawiania się dla każdego bloku
    contactBlocks.forEach((block, index) => {
        block.style.opacity = '0';
        block.style.transform = 'translateY(20px)';
        block.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        block.style.transitionDelay = `${index * 0.1}s`;
        
        // Zaprogramowanie efektu po najechaniu
        let hoverTimer; // Timer dla opóźnienia
        
        // Dodaj listener na najechanie kursorem
        block.addEventListener('mouseenter', function() {
            // Ustawienie timera na 1 sekundę (1000ms)
            hoverTimer = setTimeout(function() {
                // Dodaj klasę pokazującą opis
                block.classList.add('show-description');
            }, 1000);
        });
        
        // Dodaj listener na zjechanie kursorem
        block.addEventListener('mouseleave', function() {
            // Wyczyść timer, jeśli użytkownik zjechał kursorem przed upływem 1 sekundy
            clearTimeout(hoverTimer);
            
            // Usuń klasę pokazującą opis
            block.classList.remove('show-description');
        });
    });
    
    // Funkcja sprawdzająca, czy element jest w widoku
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Funkcja do animowania bloków, gdy są widoczne
    function animateContactBlocks() {
        contactBlocks.forEach(block => {
            if (isInViewport(block) && block.style.opacity === '0') {
                block.style.opacity = '1';
                block.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Nasłuchuj zdarzenia scroll
    window.addEventListener('scroll', animateContactBlocks);
    
    // Uruchom animację dla widocznych bloków po załadowaniu
    animateContactBlocks();
    
    // Dodaj linki do bloków kontaktowych
    const emailBlock = document.querySelector('.contact-block:nth-child(1)');
    const instagramBlock = document.querySelector('.contact-block:nth-child(2)');
    const tiktokBlock = document.querySelector('.contact-block:nth-child(3)');
    const telegramBlock = document.querySelector('.contact-block:nth-child(4)');
    
    // Dodaj zdarzenia kliknięcia
    if (emailBlock) {
        emailBlock.addEventListener('click', function() {
            window.location.href = 'mailto:pawelmatras10@icloud.com';
        });
    }
    
    if (instagramBlock) {
        instagramBlock.addEventListener('click', function() {
            window.open('https://instagram.com/matrasiik', '_blank');
        });
    }
    
    if (tiktokBlock) {
        tiktokBlock.addEventListener('click', function() {
            window.open('https://tiktok.com/@matrasiik', '_blank');
        });
    }
    
    if (telegramBlock) {
        telegramBlock.addEventListener('click', function() {
            window.open('https://t.me/matras', '_blank');
        });
    }
});
// Obsługa animacji fade-in dla sekcji kontakt
document.addEventListener('DOMContentLoaded', function() {
    // Efekt pisania maszynowego w sekcji kontakt
    const typingText = document.getElementById('typing-text');
    
    if (typingText) {
        // Kod dla efektu pisania maszynowego...
    }
    
    // Konfiguracja obserwatora przecięcia (Intersection Observer) dla efektu fade-in
    const contactObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };
    
    // Tworzenie obserwatora dla elementów z klasą fade-in
    const contactObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Dodanie klasy powodującej animację
                entry.target.classList.add('visible');
                // Zatrzymanie obserwacji po wykonaniu animacji
                observer.unobserve(entry.target);
            }
        });
    }, contactObserverOptions);
    
    // Wybieranie wszystkich elementów z klasą fade-in w sekcji kontakt
    const contactFadeElements = document.querySelectorAll('.contact-section .fade-in');
    
    // Rozpoczęcie obserwacji każdego elementu
    contactFadeElements.forEach(element => {
        contactObserver.observe(element);
    });
    
    // Obsługa bloków kontaktowych...
});
// Obsługa animacji pojawienia się stopki
document.addEventListener('DOMContentLoaded', function() {
    // Konfiguracja obserwatora przecięcia (Intersection Observer) dla stopki
    const footerObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    // Tworzenie obserwatora dla stopki
    const footerObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Dodanie klasy powodującej animację
                entry.target.classList.add('fade-in-active');
                // Zatrzymanie obserwacji po wykonaniu animacji
                observer.unobserve(entry.target);
            }
        });
    }, footerObserverOptions);
    
    // Obserwacja stopki
    const footer = document.querySelector('.footer');
    if (footer) {
        footer.classList.add('fade-in-footer');
        footerObserver.observe(footer);
    }
    
    // Obsługa przewijania do sekcji po kliknięciu w link w stopce
    const footerLinks = document.querySelectorAll('.footer-link');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});
// Obsługa pionowego menu nawigacyjnego
document.addEventListener('DOMContentLoaded', function() {
    const verticalNav = document.querySelector('.vertical-nav');
    
    // Pokazanie menu po 5 sekundach
    setTimeout(function() {
        if (verticalNav) {
            verticalNav.classList.add('show');
        }
    }, 5000);
    
    // Obsługa aktywnej sekcji podczas przewijania
    const sections = document.querySelectorAll('section, .hero');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function setActiveNav() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                currentSection = section.getAttribute('id') || 'hero';
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            if (href === '#' && currentSection === 'hero') {
                link.classList.add('active');
            } else if (href === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Nasłuchiwanie na zdarzenie przewijania
    window.addEventListener('scroll', setActiveNav);
    
    // Obsługa kliknięć w linki nawigacyjne
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') {
                // Jeśli to link do strony głównej, przewiń na górę
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                // W przeciwnym razie przewiń do odpowiedniej sekcji
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Ustaw aktywny link na początku
    setActiveNav();
});
// Przykład prostego efektu parallax dla tła sekcji hero
window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    document.querySelector('.hero').style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
});
// Rozbuduj obserwator przecięcia o bardziej zaawansowane animacje
const animatedElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated', 'fadeInUp');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

animatedElements.forEach(element => observer.observe(element));
// Obsługa menu mobilnego
document.addEventListener('DOMContentLoaded', function() {
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
            
            // Aktualizacja aktywnego linku
            mobileNavLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Aktualizacja aktywnego linku podczas przewijania
    function setActiveMobileNav() {
        const sections = document.querySelectorAll('section, .hero');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                currentSection = section.getAttribute('id') || 'hero';
            }
        });
        
        mobileNavLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            if (href === '#' && currentSection === 'hero') {
                link.classList.add('active');
            } else if (href === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveMobileNav);
    setActiveMobileNav();
});
// Wykrywanie urządzeń mobilnych i dostosowanie animacji
document.addEventListener('DOMContentLoaded', function() {
    const isMobile = window.innerWidth <= 576;
    
    if (isMobile) {
        // Przyspiesz animacje na urządzeniach mobilnych
        document.querySelectorAll('.fade-in').forEach(el => {
            el.style.transitionDuration = '0.5s';
        });
        
        // Zmniejsz opóźnienia między animacjami
        document.querySelectorAll('.fade-delay-1').forEach(el => {
            el.style.transitionDelay = '0.1s';
        });
        document.querySelectorAll('.fade-delay-2').forEach(el => {
            el.style.transitionDelay = '0.2s';
        });
        document.querySelectorAll('.fade-delay-3').forEach(el => {
            el.style.transitionDelay = '0.3s';
        });
        
        // Wyłącz animacje przy najechaniu dla bloków umiejętności
        const skillBlocks = document.querySelectorAll('.skill-block');
        skillBlocks.forEach(block => {
            const title = block.querySelector('.skill-title');
            const description = block.querySelector('.skill-description');
            
            // Pokaż zarówno tytuł jak i opis
            if (title) title.style.opacity = '1';
            if (description) {
                description.style.opacity = '1';
                description.style.maxHeight = '200px';
            }
            
            // Usuń eventy hover
            block.removeEventListener('mouseenter', function() {});
            block.removeEventListener('mouseleave', function() {});
        });
    }
});
// Obsługa animacji osi czasu
document.addEventListener('DOMContentLoaded', function() {
    // Funkcja do sprawdzania, czy element jest w widoku
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Pobierz wszystkie elementy osi czasu
    const timelineItems = document.querySelectorAll('.timeline-item');
    let timelineAnimationStarted = false;
    
    // Funkcja do sekwencyjnego pokazywania elementów osi czasu
    function animateTimelineItems() {
        if (!timelineAnimationStarted && isInViewport(document.querySelector('.timeline'))) {
            timelineAnimationStarted = true;
            
            timelineItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.remove('hidden');
                    item.classList.add('visible');
                }, 3000 * index); // Pojawianie się co 3 sekundy (3000ms)
            });
        }
    }
    
    // Nasłuchiwanie na zdarzenie przewijania
    window.addEventListener('scroll', animateTimelineItems);
    
    // Sprawdź, czy oś czasu jest widoczna po załadowaniu strony
    animateTimelineItems();
});
    }
});
// Obsługa animacji osi czasu
document.addEventListener('DOMContentLoaded', function() {
    // Funkcja do sprawdzania, czy element jest w widoku
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Pobierz wszystkie elementy osi czasu
    const timelineItems = document.querySelectorAll('.timeline-item');
    let timelineAnimationStarted = false;
    
    // Funkcja do sekwencyjnego pokazywania elementów osi czasu
    function animateTimelineItems() {
        if (!timelineAnimationStarted && isInViewport(document.querySelector('.timeline'))) {
            timelineAnimationStarted = true;
            
            timelineItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.remove('hidden');
                    item.classList.add('visible');
                }, 3000 * index); // Pojawianie się co 3 sekundy (3000ms)
            });
        }
    }
    
    // Nasłuchiwanie na zdarzenie przewijania
    window.addEventListener('scroll', animateTimelineItems);
    
    // Sprawdź, czy oś czasu jest widoczna po załadowaniu strony
    animateTimelineItems();
});
// Funkcja do optymalizacji ładowania mniej istotnych elementów
function optymalizujLadowanie() {
    // Opóźnione ładowanie mniej istotnych funkcji
    setTimeout(function() {
        // Inicjalizacja obserwatora przecięcia dla efektu fade-in
        const obserwatorOpcji = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const animowaneElementy = document.querySelectorAll('.fade-in');
        const obserwator = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated', 'fadeInUp');
                    obserwator.unobserve(entry.target);
                }
            });
        }, obserwatorOpcji);

        animowaneElementy.forEach(element => obserwator.observe(element));
        
        // Wykrywanie szwajcarskiej lokalizacji na podstawie języka przeglądarki
        const jestSzwajcaria = navigator.language && 
            (navigator.language.toLowerCase().includes('ch') || 
            navigator.language.toLowerCase().includes('de') || 
            navigator.language.toLowerCase().includes('fr') || 
            navigator.language.toLowerCase().includes('it'));
        
        if (jestSzwajcaria) {
            document.documentElement.setAttribute('data-region', 'ch-local');
        }
        
        // Dodanie atrybutu lang do wszystkich sekcji dla lepszego SEO
        document.querySelectorAll('section').forEach(section => {
            if (!section.hasAttribute('lang')) {
                section.setAttribute('lang', 'pl');
            }
        });
    }, 2000); // Opóźnienie o 2 sekundy
}
/*
// Wywołanie funkcji optymalizacji po załadowaniu strony
window.addEventListener('load', optymalizujLadowanie);
function createSectionTransition() {
  const sections = document.querySelectorAll('section');
  
  window.addEventListener('scroll', () => {
    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const scrollPosition = window.pageYOffset;
      
      // Zaawansowany efekt przesunięcia i skali
      const translateY = (scrollPosition - sectionTop) * 0.3;
      const scale = 1 - Math.abs(scrollPosition - sectionTop) / window.innerHeight * 0.2;
      
      section.style.transform = `
        translateY(${translateY}px) 
        scale(${Math.max(0.8, Math.min(scale, 1))})
      `;
    });
  });
}
}
/*

function createDynamicSectionLines() {
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    const line = document.createElement('div');
    line.classList.add('section-divider');
    
    line.style.transform = 'scaleX(0)';
    line.style.transformOrigin = 'left center';
    
    section.appendChild(line);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          line.style.transform = 'scaleX(1)';
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(section);
  });
}
function createWaveTransition() {
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    const wave = document.createElement('svg');
    wave.innerHTML = `
      <path 
        d="M0 50 Q50 0 100 50 T200 50" 
        fill="none" 
        stroke="var(--about-heading-color)" 
        stroke-width="2"
      />
    `;
    
    wave.classList.add('section-wave');
    section.appendChild(wave);
  });
}
function advancedScrollReveal() {
  const sections = document.querySelectorAll('section');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-animation');
        
        // Różne efekty w zależności od sekcji
        switch(entry.target.id) {
          case 'about':
            entry.target.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)';
            break;
          case 'skills':
            entry.target.style.transform = 'perspective(1000px) rotateX(-10deg)';
            break;
        }
      }
    });
  }, { threshold: 0.1 });
  
  sections.forEach(section => observer.observe(section));
}
function createInteractiveSectionBackground() {
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    const background = document.createElement('div');
    background.classList.add('section-interactive-bg');
    
    section.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const rect = section.getBoundingClientRect();
      
      const x = ((clientX - rect.left) / rect.width) * 100;
      const y = ((clientY - rect.top) / rect.height) * 100;
      
      background.style.background = `
        radial-gradient(
          circle at ${x}% ${y}%, 
          rgba(214, 255, 0, 0.1), 
          transparent 50%
        )
      `;
    });
    
    section.appendChild(background);
  });
}
document.addEventListener('DOMContentLoaded', () => {
  createSectionTransition();
  createDynamicSectionLines();
  createWaveTransition();
  advancedScrollReveal();
  createInteractiveSectionBackground();
});
*/