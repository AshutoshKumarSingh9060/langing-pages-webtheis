document.addEventListener('DOMContentLoaded', () => {
    // Current Year Update
    document.getElementById('year').textContent = new Date().getFullYear();

    // Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.getElementById('navbar');
    
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navbar.classList.toggle('mobile-active');
        const spans = mobileToggle.querySelectorAll('span');
        if (navLinks.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Sticky Navbar on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for scroll animations (Reveal)
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                entry.target.style.transitionDelay = `${delay}s`;
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 3D Tilt Effect for Product Cards
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Adjust sensitivity (higher denominator = less rotation)
            const rotateX = ((y - centerY) / 10) * -1;
            const rotateY = ((x - centerX) / 10);
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            // Reset transition for smoother return
            card.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
            setTimeout(() => {
                card.style.transition = ''; // Remove transition so mousemove is instant again
            }, 500);
        });
    });

    // Parallax effect on Hero Visuals
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        document.addEventListener('mousemove', (e) => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            
            const offsetX = 0.5 - e.pageX / width;
            const offsetY = 0.5 - e.pageY / height;

            const floatingElements = document.querySelectorAll('.glass-float-card');
            
            floatingElements.forEach(el => {
                const speed = el.getAttribute('data-speed') || 1;
                const xTransform = (offsetX * 40 * speed);
                const yTransform = (offsetY * 40 * speed);
                
                el.style.transform = `translate(${xTransform}px, ${yTransform}px)`;
            });
            
            const orbs = document.querySelectorAll('.glow-orb');
            orbs.forEach((orb, index) => {
                const speed = (index + 1) * 0.5;
                const xTransform = (offsetX * -60 * speed);
                const yTransform = (offsetY * -60 * speed);
                orb.style.transform = `translate(${xTransform}px, ${yTransform}px)`;
            });
            
            const phoneWrap = document.getElementById('heroPhoneWrapper');
            if (phoneWrap) {
                const pX = (offsetX * 20);
                const pY = (offsetY * 20);
                phoneWrap.style.transform = `translate(${pX}px, ${pY}px)`;
            }
        });
    }
});
