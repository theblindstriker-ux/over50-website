document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for scroll animations (fade in elements as they scroll into view)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animation to elements with class .glass-card that are not in the hero section
    document.querySelectorAll('.section .glass-card').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)`;
        // Stagger the animation slightly for cards in a grid
        if (el.classList.contains('pillar-card')) {
            el.style.transitionDelay = `${index * 0.15}s`;
        }
        observer.observe(el);
    });

    // Navbar shrink on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        const isMobile = window.innerWidth <= 768;
        if (window.scrollY > 50) {
            navbar.style.padding = isMobile ? '0.4rem 0' : '1rem 0';
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        } else {
            navbar.style.padding = isMobile ? '0.6rem 0' : '1.5rem 0';
            navbar.style.background = 'rgba(15, 23, 42, 0.8)';
        }
    });
});
