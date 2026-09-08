document.addEventListener('DOMContentLoaded', function () {

    // -----------------------------------
    // AOS initialization
    // -----------------------------------
    if (typeof AOS !== 'undefined') {
        AOS.init({ offset: 0 });
    }

    // -----------------------------------
    // Typewriter effect
    // -----------------------------------
    const typewriterEl = document.querySelector('.typewriter span');
    const roles = ['Developer', 'Designer', 'Student', 'Security Enthusiast'];
    if (typewriterEl) {
        let roleIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function type() {
            const currentRole = roles[roleIndex];
            if (!deleting) {
                charIndex++;
                typewriterEl.textContent = currentRole.substring(0, charIndex);
                if (charIndex === currentRole.length) {
                    deleting = true;
                    setTimeout(type, 1800);
                    return;
                }
                setTimeout(type, 120);
            } else {
                charIndex--;
                typewriterEl.textContent = currentRole.substring(0, charIndex);
                if (charIndex === 0) {
                    deleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                    setTimeout(type, 400);
                    return;
                }
                setTimeout(type, 60);
            }
        }
        type();
    }

    // -----------------------------------
    // Mobile navigation: hamburger + dropdown menu
    // -----------------------------------
    const hamburg = document.querySelector('.hamburg');
    const cancel = document.querySelector('.cancel');
    const dropdown = document.querySelector('.dropdown');
    const dropdownLinks = document.querySelectorAll('.dropdown .links a');

    function openMenu() {
        if (dropdown) {
            dropdown.classList.add('open');
            if (hamburg) hamburg.style.display = 'none';
            if (cancel) cancel.style.display = 'flex';
        }
    }

    function closeMenu() {
        if (dropdown) {
            dropdown.classList.remove('open');
            if (hamburg) hamburg.style.display = '';
            if (cancel) cancel.style.display = '';
        }
    }

    if (hamburg) {
        hamburg.addEventListener('click', openMenu);
    }
    if (cancel) {
        cancel.addEventListener('click', closeMenu);
    }
    dropdownLinks.forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });

    // -----------------------------------
    // Smooth scrolling (native fallback)
    // -----------------------------------
    const allLinks = document.querySelectorAll('a[href^="#"]');
    allLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerOffset = 70;
                const elementPosition = target.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                closeMenu();
            }
        });
    });

    // -----------------------------------
    // Active navigation link on scroll
    // -----------------------------------
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-container .links a, .dropdown .links a');

    function setActiveLink() {
        const scrollPos = window.scrollY + 100;
        let currentId = '';
        sections.forEach(function (section) {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
                currentId = section.getAttribute('id');
            }
        });
        navAnchors.forEach(function (a) {
            a.classList.remove('active');
            if (a.getAttribute('href') === '#' + currentId) {
                a.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', setActiveLink);

    // -----------------------------------
    // Navbar background on scroll
    // -----------------------------------
    const nav = document.querySelector('nav');
    function onScrollNav() {
        if (nav) {
            if (window.scrollY > 40) {
                nav.classList.add('nav-scrolled');
            } else {
                nav.classList.remove('nav-scrolled');
            }
        }
    }
    window.addEventListener('scroll', onScrollNav);
    onScrollNav();

    // -----------------------------------
    // Contact form validation
    // -----------------------------------
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');

            let valid = true;

            // Name
            if (!name.value.trim()) {
                showError(name, 'Please enter your name.');
                valid = false;
            } else {
                clearError(name);
            }

            // Email
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailPattern.test(email.value.trim())) {
                showError(email, 'Please enter a valid email address.');
                valid = false;
            } else {
                clearError(email);
            }

            // Subject
            if (!subject.value.trim()) {
                showError(subject, 'Please enter a subject.');
                valid = false;
            } else {
                clearError(subject);
            }

            // Message
            if (!message.value.trim()) {
                showError(message, 'Please enter a message.');
                valid = false;
            } else {
                clearError(message);
            }

            if (valid) {
                const formStatus = document.getElementById('form-status');
                if (formStatus) {
                    formStatus.textContent = 'Thank you for your message! I will get back to you soon.';
                    formStatus.style.color = '#2e7d32';
                }
                contactForm.reset();
                setTimeout(function () {
                    if (formStatus) formStatus.textContent = '';
                }, 5000);
            }
        });

        function showError(input, msg) {
            input.classList.add('error');
            const error = input.parentElement.querySelector('.error-message');
            if (error) {
                error.textContent = msg;
            }
        }

        function clearError(input) {
            input.classList.remove('error');
            const error = input.parentElement.querySelector('.error-message');
            if (error) {
                error.textContent = '';
            }
        }
    }
});
