/*==================================================
 *   PROJECT: PERSONAL PORTFOLIO WEBSITE
 *   FILE: ANIMATIONS.JS
 *   DESCRIPTION: All animation initializations and controls.
 *==================================================*/

document.addEventListener('DOMContentLoaded', () => {
    
    // -- LOADING SCREEN ANIMATION --
    const loadingScreen = document.getElementById('loading-screen');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 500); // Ensures all content is loaded
    });

    // -- GSAP & SCROLLTRIGGER ANIMATIONS --
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Text Animation
    gsap.from(".greeting", { duration: 1, y: -50, opacity: 0, delay: 0.5, ease: "power3.out" });
    gsap.from(".name", { duration: 1, y: 50, opacity: 0, delay: 0.7, ease: "power3.out" });
    gsap.from(".title", { duration: 1, opacity: 0, delay: 1, ease: "power3.out" });

    // Stats Counter Animation
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.dataset.target;
        // Create an object to animate
        let animationState = { value: 0 };

        gsap.to(animationState, {
            value: target,
            duration: 2,
            ease: 'power1.inOut',
            scrollTrigger: {
                trigger: counter,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            onUpdate: () => {
                counter.textContent = Math.ceil(animationState.value);
            }
        });
    });


    // -- TYPED.JS INITIALIZATION --
    if (document.getElementById('typing-animation')) {
        new Typed('#typing-animation', {
            strings: ['Java Developer', 'Python Developer', 'Software Engineer', 'Backend Developer'],
            typeSpeed: 70,
            backSpeed: 50,
            backDelay: 2000,
            loop: true,
            smartBackspace: true
        });
    }

    // -- PARTICLES.JS INITIALIZATION --
    if (document.getElementById('particles-js')) {
        const initParticles = () => {
            const theme = localStorage.getItem('theme') || 'dark';
            const particleColor = theme === 'dark' ? '#ffffff' : '#374151';
            const particleLineColor = theme === 'dark' ? '#ffffff' : '#374151';
            
            particlesJS('particles-js', {
                particles: {
                    number: { value: 80, density: { enable: true, value_area: 800 } },
                    color: { value: particleColor },
                    shape: { type: 'circle' },
                    opacity: { value: 0.5, random: true },
                    size: { value: 3, random: true },
                    line_linked: { enable: true, distance: 150, color: particleLineColor, opacity: 0.4, width: 1 },
                    move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
                    modes: { grab: { distance: 140, line_linked: { opacity: 1 } }, bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 }, repulse: { distance: 200, duration: 0.4 }, push: { particles_nb: 4 }, remove: { particles_nb: 2 } }
                },
                retina_detect: true
            });
        };
        initParticles();
        // Re-initialize particles on theme change
        window.addEventListener('themeChanged', () => {
            // particles.js doesn't have a clean update method, so we destroy and re-init
            if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
                 window.pJSDom[0].pJS.fn.vendors.destroypJS();
                 window.pJSDom = [];
            }
            initParticles();
        });
    }


    // -- CUSTOM CURSOR --
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        document.addEventListener('mousemove', e => {
            // Use clientX and clientY for fixed position elements
            cursor.setAttribute("style", "top: "+e.clientY+"px; left: "+e.clientX+"px;")
        });

        document.addEventListener('mousedown', () => cursor.style.transform = 'translate(-50%, -50%) scale(0.8)');
        document.addEventListener('mouseup', () => cursor.style.transform = 'translate(-50%, -50%) scale(1)');

        document.querySelectorAll('a, button, .skill-card, [data-aos]').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.width = '60px';
                cursor.style.height = '60px';
                cursor.style.backgroundColor = 'rgba(124, 58, 237, 0.3)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.width = '30px';
                cursor.style.height = '30px';
                cursor.style.backgroundColor = 'transparent';
            });
        });
    }

    // -- SCROLL PROGRESS BAR --
    const scrollProgressBar = document.getElementById('scroll-progress-bar');
    if(scrollProgressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercentage = (scrollTop / scrollHeight) * 100;
            scrollProgressBar.style.width = `${scrollPercentage}%`;
        });
    }

    // -- VANILLA-TILT.JS INITIALIZATION --
    const tiltElements = document.querySelectorAll(".project-card");
    if (tiltElements.length > 0) {
        VanillaTilt.init(tiltElements, {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.5
        });
    }

});
