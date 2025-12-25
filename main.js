 // Custom cursor functionality
        const cursor = document.querySelector('.cursor');
        const cursorFollower = document.querySelector('.cursor-follower');

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 100);
        });

        // Create floating particles
        function createParticles() {
            const particlesContainer = document.querySelector('.particles');
            
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.width = Math.random() * 4 + 2 + 'px';
                particle.style.height = particle.style.width;
                particle.style.animationDuration = Math.random() * 20 + 10 + 's';
                particle.style.animationDelay = Math.random() * 20 + 's';
                particlesContainer.appendChild(particle);
            }
        }

        // Typing animation
        const phrases = [
            'Full Stack Developer',
            'Cybersecurity Enthusiast',
            'Data Science Enthusiast',
            'Problem Solver',
            'Innovation Driver'
        ];
        
        let currentPhrase = 0;
        let currentChar = 0;
        let isDeleting = false;
        
        function typeAnimation() {
            const typedElement = document.getElementById('typed-text');
            const current = phrases[currentPhrase];
            
            if (isDeleting) {
                typedElement.textContent = current.substring(0, currentChar - 1);
                currentChar--;
            } else {
                typedElement.textContent = current.substring(0, currentChar + 1);
                currentChar++;
            }
            
            if (!isDeleting && currentChar === current.length) {
                setTimeout(() => isDeleting = true, 2000);
            } else if (isDeleting && currentChar === 0) {
                isDeleting = false;
                currentPhrase = (currentPhrase + 1) % phrases.length;
            }
            
            const speed = isDeleting ? 50 : 100;
            setTimeout(typeAnimation, speed);
        }

        // Scroll progress bar
        function updateScrollProgress() {
            const scrollProgress = document.querySelector('.scroll-progress');
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / height) * 100;
            scrollProgress.style.width = scrolled + '%';
        }

        // Enhanced loading animation
        document.addEventListener('DOMContentLoaded', () => {
            const counterElement = document.getElementById('counter');
            const introLoader = document.querySelector('.intro-loader');
            const mainContent = document.querySelector('.main-content');

            // Create particles
            createParticles();

            let count = 0;
            const interval = setInterval(() => {
                if (count < 100) {
                    count++;
                    counterElement.textContent = count;
                } else {
                    clearInterval(interval);
                    setTimeout(() => {
                        introLoader.style.opacity = '0';
                        introLoader.style.visibility = 'hidden';
                        mainContent.style.opacity = '1';
                        mainContent.style.visibility = 'visible';
                        
                        // Start typing animation after loader
                        setTimeout(() => {
                            typeAnimation();
                        }, 500);
                    }, 500);
                }
            }, 20);

            // Intersection Observer for animations
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.2
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, observerOptions);

            // Observe all hidden elements
            document.querySelectorAll('.hidden').forEach(el => {
                observer.observe(el);
            });

          document.querySelectorAll('.navbar a, .cta-button').forEach(link => {
    // Check if the link's href starts with a hash (#)
    if (link.getAttribute('href').startsWith('#')) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            
            // Check if the target element exists before scrolling
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});

            // Form submission
            document.getElementById('contact-form').addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Get form elements
                const submitBtn = e.target.querySelector('.submit-btn');
                const originalText = submitBtn.textContent;
                
                // Simulate form submission
                submitBtn.textContent = 'Sending...';
                submitBtn.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
                
                setTimeout(() => {
                    submitBtn.textContent = 'Message Sent!';
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.style.background = 'linear-gradient(45deg, var(--primary-color), var(--accent-color))';
                        e.target.reset();
                    }, 2000);
                }, 1500);
            });

            // Skill card interactions
            document.querySelectorAll('.skill-card').forEach(card => {
                card.addEventListener('mouseenter', () => {
                    card.style.transform = 'translateY(-10px) scale(1.05) rotateY(10deg)';
                });
                
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
                });
            });

            // Add parallax effect to hero section
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const heroSection = document.querySelector('.hero-section');
                const heroName = document.querySelector('.hero-name');
                const heroTitle = document.querySelector('.hero-title');
                
                // Parallax effect
                heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
                heroName.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroTitle.style.transform = `translateY(${scrolled * 0.4}px)`;
                
                // Update scroll progress
                updateScrollProgress();
            });

            // Add hover effects to project cards
            document.querySelectorAll('.project-card-enhanced').forEach(card => {
                card.addEventListener('mouseenter', () => {
                    // Create floating effect
                    card.style.transform = 'translateY(-15px) rotateX(5deg)';
                });
                
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'translateY(0) rotateX(0deg)';
                });
            });

            // Add interactive background elements
            function createInteractiveBackground() {
                const background = document.createElement('div');
                background.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: -2;
                    background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
                               rgba(106, 140, 255, 0.1) 0%, transparent 50%);
                    transition: all 0.3s ease;
                `;
                document.body.appendChild(background);
                
                document.addEventListener('mousemove', (e) => {
                    const x = (e.clientX / window.innerWidth) * 100;
                    const y = (e.clientY / window.innerHeight) * 100;
                    document.documentElement.style.setProperty('--mouse-x', x + '%');
                    document.documentElement.style.setProperty('--mouse-y', y + '%');
                });
            }
            
            createInteractiveBackground();

            // Add scroll-triggered animations for better UX
            const scrollTrigger = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationPlayState = 'running';
                    }
                });
            }, {
                threshold: 0.1
            });

            // Enhanced navbar interactions
            document.querySelectorAll('.navbar a').forEach(link => {
                link.addEventListener('mouseenter', () => {
                    link.style.transform = 'translateY(-3px) scale(1.05)';
                });
                
                link.addEventListener('mouseleave', () => {
                    link.style.transform = 'translateY(0) scale(1)';
                });
            });

            // Add typing sound effect (visual feedback)
            document.querySelectorAll('.form-input, .form-textarea').forEach(input => {
                input.addEventListener('focus', () => {
                    input.style.boxShadow = '0 0 30px rgba(106, 140, 255, 0.4)';
                    input.style.transform = 'scale(1.02)';
                });
                
                input.addEventListener('blur', () => {
                    input.style.boxShadow = '0 0 20px rgba(106, 140, 255, 0.3)';
                    input.style.transform = 'scale(1)';
                });
            });

            // Add dynamic text effects
            function addTextAnimation() {
                const aboutText = document.querySelector('.about-content p');
                const words = aboutText.textContent.split(' ');
                aboutText.innerHTML = words.map((word, index) => 
                    `<span style="animation-delay: ${index * 0.1}s" class="word-fade">${word}</span>`
                ).join(' ');
            }

            // Initialize text animation when about section is visible
            const aboutSection = document.querySelector('.about-section');
            const aboutObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        addTextAnimation();
                        aboutObserver.unobserve(entry.target);
                    }
                });
            });
            aboutObserver.observe(aboutSection);

            // Add floating action button for scroll to top
            const scrollTopBtn = document.createElement('div');
            scrollTopBtn.innerHTML = '↑';
            scrollTopBtn.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                font-size: 1.5rem;
                font-weight: bold;
                opacity: 0;
                transform: scale(0);
                transition: all 0.3s ease;
                z-index: 1000;
                box-shadow: 0 10px 30px rgba(106, 140, 255, 0.3);
            `;
            
            document.body.appendChild(scrollTopBtn);
            
            scrollTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            
            window.addEventListener('scroll', () => {
                if (window.scrollY > 500) {
                    scrollTopBtn.style.opacity = '1';
                    scrollTopBtn.style.transform = 'scale(1)';
                } else {
                    scrollTopBtn.style.opacity = '0';
                    scrollTopBtn.style.transform = 'scale(0)';
                }
            });

            // Add ripple effect to buttons
            document.querySelectorAll('.cta-button, .submit-btn, .view-project-btn').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    const ripple = document.createElement('span');
                    const rect = this.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;
                    
                    ripple.style.cssText = `
                        position: absolute;
                        width: ${size}px;
                        height: ${size}px;
                        background: rgba(255, 255, 255, 0.3);
                        border-radius: 50%;
                        transform: scale(0);
                        left: ${x}px;
                        top: ${y}px;
                        animation: ripple 0.6s ease-out;
                        pointer-events: none;
                    `;
                    
                    this.style.position = 'relative';
                    this.style.overflow = 'hidden';
                    this.appendChild(ripple);
                    
                    setTimeout(() => ripple.remove(), 600);
                });
            });

            // Add CSS for word fade animation
            const style = document.createElement('style');
            style.textContent = `
                .word-fade {
                    opacity: 0;
                    animation: wordFade 0.5s forwards;
                    display: inline-block;
                    margin-right: 5px;
                }
                
                @keyframes wordFade {
                    to { opacity: 1; }
                }
                
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
                
                @media (prefers-reduced-motion: reduce) {
                    * {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                    }
                }
            `;
            document.head.appendChild(style);
        });