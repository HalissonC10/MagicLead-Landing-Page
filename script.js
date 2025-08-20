
        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Header background on scroll
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(0, 0, 0, 0.98)';
            } else {
                header.style.background = 'rgba(0, 0, 0, 0.95)';
            }
        });

        // Reveal animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach(el => {
            observer.observe(el);
        });

        // Counter animation for stats
        const animateCounters = () => {
            const counters = document.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = counter.innerText;
                const numOnly = target.replace(/[^0-9]/g, '');
                if (numOnly) {
                    let current = 0;
                    const increment = numOnly / 100;
                    const updateCounter = () => {
                        if (current < numOnly) {
                            current += increment;
                            counter.innerText = target.replace(numOnly, Math.floor(current));
                            setTimeout(updateCounter, 20);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCounter();
                }
            });
        };

        // Trigger counter animation when stats section is visible
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        });

        const statsSection = document.querySelector('.stats');
        if (statsSection) {
            statsObserver.observe(statsSection);
        }

        // Add hover effects to dashboard mockup
        const dashboard = document.querySelector('.dashboard-mockup');
        if (dashboard) {
            dashboard.addEventListener('mouseenter', () => {
                dashboard.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1.02)';
            });
            
            dashboard.addEventListener('mouseleave', () => {
                dashboard.style.transform = 'perspective(1000px) rotateY(-10deg) rotateX(5deg) scale(1)';
            });
        }
