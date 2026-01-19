// Main JS extracted from index.html

// CONSTELLATION BACKGROUND EFFECT
const canvas = document.getElementById('constellation');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    
    // Configuration
    const particleCount = 40; 
    const connectionDistance = 120; 
    const mouseDistance = 180; 
    
    let mouse = { x: null, y: null };
    window.addEventListener('mousemove', e => {
        mouse.x = e.x;
        mouse.y = e.y;
    });
    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.3;
            this.vy = (Math.random() - 0.5) * 0.3;
            this.size = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            if (mouse.x != null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx*dx + dy*dy);
                
                if (distance < mouseDistance) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouseDistance - distance) / mouseDistance;
                    const directionX = forceDirectionX * force * 0.6;
                    const directionY = forceDirectionY * force * 0.6;
                    
                    this.vx -= directionX;
                    this.vy -= directionY;
                }
            }
        }

        draw() {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    initParticles();

    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            for (let j = i; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let distance = Math.sqrt(dx*dx + dy*dy);
                
                if (distance < connectionDistance) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - distance/connectionDistance) * 0.3})`;
                    ctx.lineWidth = 0.3;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }
    animate();
}

// ANIMATED COUNTERS
const counters = document.querySelectorAll('.stat-value');
const speed = 200;

const animateCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            counterObserver.unobserve(entry.target);
        }
    });
});

document.querySelectorAll('.stats-dashboard').forEach(el => {
    counterObserver.observe(el);
});

// PERFORMANCE OPTIMIZATION: Throttling
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Optimized Mouse Tracking
document.addEventListener('mousemove', throttle((e) => {
    const cards = document.querySelectorAll('.card, .featured-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
}, 50));

// ADVANCED SCROLL REVEAL ANIMATIONS
class ScrollRevealManager {
    constructor() {
        this.init();
        this.setupIntersectionObserver();
    }
    
    init() {
        // Add reveal classes to elements
        this.addRevealClasses();
        this.setupParallaxElements();
    }
    
    addRevealClasses() {
        const elements = document.querySelectorAll('section, .featured-card, .project-card, .skill-pill');
        elements.forEach((el, index) => {
            el.classList.add('reveal-element');
            el.style.setProperty('--reveal-delay', `${index * 0.1}s`);
        });
    }
    
    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Add premium animation classes
                    this.addPremiumAnimations(entry.target);
                }
            });
        }, options);
        
        document.querySelectorAll('.reveal, .reveal-element').forEach(el => {
            this.observer.observe(el);
        });
    }
    
    addPremiumAnimations(element) {
        // Add staggered animations for child elements
        const children = element.querySelectorAll('h1, h2, h3, p, .btn-primary, .btn-secondary, .skill-pill');
        children.forEach((child, index) => {
            setTimeout(() => {
                child.classList.add('animate-in');
            }, index * 100);
        });
    }
    
    setupParallaxElements() {
        window.addEventListener('scroll', () => {
            this.updateParallax();
        });
    }
    
    updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax for hero background elements
        const parallaxElements = document.querySelectorAll('.parallax-element');
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Initialize scroll reveal manager
const scrollRevealManager = new ScrollRevealManager();

// Legacy support
function revealOnScroll() {
    // This function is kept for backward compatibility but is now handled by ScrollRevealManager
}

// FLIP CARD LOGIC FOR FEATURED PROJECTS
function initFlipCards() {
    const flipTriggers = document.querySelectorAll('.flip-trigger');
    const closeButtons = document.querySelectorAll('.close-flip');
    const expandButtons = document.querySelectorAll('.expand-btn');
    
    flipTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const card = this.closest('.featured-card');
            const repoName = card.getAttribute('data-project');
            const defaultBranch = card.getAttribute('data-branch');
            
            // Add flipped class
            card.classList.add('flipped');
            
            // Load content
            loadProjectContent(card, repoName, defaultBranch);
        });
    });
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const card = this.closest('.featured-card');
            card.classList.remove('flipped');
        });
    });
    
    expandButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const card = this.closest('.featured-card');
            const repoName = card.getAttribute('data-project');
            const defaultBranch = card.getAttribute('data-branch');
            const readmeContent = card.querySelector('.readme-content');
            
            // Open expanded modal
            openExpandedModal(repoName, readmeContent.innerHTML);
        });
    });
}

function openExpandedModal(projectName, content) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('expandedModal');
    if (!modal) {
        modal = createExpandedModal();
    }
    
    const modalTitle = modal.querySelector('.expanded-modal-title');
    const modalContent = modal.querySelector('.expanded-modal-content');
    
    modalTitle.textContent = projectName;
    modalContent.innerHTML = content;
    
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function createExpandedModal() {
    const modal = document.createElement('div');
    modal.id = 'expandedModal';
    modal.className = 'expanded-modal';
    modal.innerHTML = `
        <div class="expanded-modal-backdrop"></div>
        <div class="expanded-modal-container">
            <div class="expanded-modal-header">
                <h2 class="expanded-modal-title"></h2>
                <button class="expanded-modal-close" onclick="closeExpandedModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="expanded-modal-body">
                <div class="expanded-modal-content"></div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close on backdrop click
    modal.querySelector('.expanded-modal-backdrop').addEventListener('click', closeExpandedModal);
    
    return modal;
}

function closeExpandedModal() {
    const modal = document.getElementById('expandedModal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
    
    // Restore body scroll
    document.body.style.overflow = '';
}

function loadProjectContent(card, repoName, defaultBranch) {
    const loadingPlaceholder = card.querySelector('.loading-placeholder');
    const readmeContent = card.querySelector('.readme-content');
    
    // Show loading
    loadingPlaceholder.style.display = 'flex';
    readmeContent.style.display = 'none';
    
    fetch(`/project/${repoName}/${defaultBranch}`)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
        })
        .then(html => {
            loadingPlaceholder.style.display = 'none';
            readmeContent.innerHTML = html;
            readmeContent.style.display = 'block';
        })
        .catch(error => {
            console.error('Error loading project details:', error);
            loadingPlaceholder.style.display = 'none';
            readmeContent.innerHTML = `
                <div class="error-message" style="text-align: center; padding: 40px 20px; color: var(--text-muted);">
                    <i class="fas fa-exclamation-circle" style="font-size: 2rem; margin-bottom: 16px; color: var(--accent-glow);"></i>
                    <h3 style="color: var(--text-primary); margin-bottom: 8px;">Contenu indisponible</h3>
                    <p>Impossible de charger les détails du projet pour le moment.</p>
                    <a href="https://github.com/Eloura74/${repoName}" target="_blank" 
                       style="color: var(--accent-glow); text-decoration: none; display: inline-flex; align-items: center; gap: 8px; margin-top: 16px;">
                        <i class="fab fa-github"></i> Voir sur GitHub
                    </a>
                </div>
            `;
            readmeContent.style.display = 'block';
        });
}

// MODAL LOGIC (Use expanded modal for all projects)
function openProject(repoName, defaultBranch) {
    console.log('Opening project:', repoName);
    
    // Create modal if it doesn't exist
    let modal = document.getElementById('expandedModal');
    if (!modal) {
        modal = createExpandedModal();
    }
    
    const modalTitle = modal.querySelector('.expanded-modal-title');
    const modalContent = modal.querySelector('.expanded-modal-content');
    
    modalTitle.textContent = repoName;
    modalContent.innerHTML = '<div class="loading-placeholder" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 200px; gap: 16px; color: var(--text-secondary);"><div class="loader-small"></div><p>Chargement du contenu...</p></div>';
    
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    fetch(`/project/${repoName}/${defaultBranch}`)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
        })
        .then(html => {
            modalContent.innerHTML = html;
        })
        .catch(error => {
            console.error('Error loading project details:', error);
            modalContent.innerHTML = `
                <div class="error-message" style="text-align: center; padding: 40px 20px; color: var(--text-muted);">
                    <i class="fas fa-exclamation-circle" style="font-size: 2rem; margin-bottom: 16px; color: var(--accent-glow);"></i>
                    <h3 style="color: var(--text-primary); margin-bottom: 8px;">Contenu indisponible</h3>
                    <p>Impossible de charger les détails du projet pour le moment.</p>
                    <a href="https://github.com/Eloura74/${repoName}" target="_blank" 
                       style="color: var(--accent-glow); text-decoration: none; display: inline-flex; align-items: center; gap: 8px; margin-top: 16px;">
                        <i class="fab fa-github"></i> Voir sur GitHub
                    </a>
                </div>
            `;
        });
}

function closeModal() {
    closeExpandedModal();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('expandedModal');
    if (event.target && event.target.classList.contains('expanded-modal-backdrop')) {
        closeExpandedModal();
    }
}

// PROJECT FILTER FUNCTIONALITY
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            const cardLanguage = card.getAttribute('data-language');
            
            if (filterValue === 'all' || cardLanguage === filterValue) {
                card.style.display = 'block';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px) scale(0.9)';
                
                // Animate in
                setTimeout(() => {
                    card.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                }, 100);
            } else {
                card.style.transition = 'all 0.3s ease';
                card.style.opacity = '0';
                card.style.transform = 'translateY(-20px) scale(0.8)';
                
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// SECTION NAVIGATION
const sectionNav = document.getElementById('sectionNav');
const navDots = document.querySelectorAll('.nav-dot');
const sections = document.querySelectorAll('section[id]');

// Navigation par clic
navDots.forEach(dot => {
    dot.addEventListener('click', () => {
        const targetSection = dot.getAttribute('data-section');
        const section = document.getElementById(targetSection);
        
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mise à jour de la navigation active au scroll
function updateActiveNav() {
    let current = '';
    const scrollPos = window.pageYOffset + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navDots.forEach(dot => {
        dot.classList.remove('active');
        if (dot.getAttribute('data-section') === current) {
            dot.classList.add('active');
        }
    });
}

// Navigation au clavier (flèches haut/bas)
let currentSectionIndex = 0;

function navigateToSection(direction) {
    const visibleSections = Array.from(sections);
    
    if (direction === 'down' && currentSectionIndex < visibleSections.length - 1) {
        currentSectionIndex++;
    } else if (direction === 'up' && currentSectionIndex > 0) {
        currentSectionIndex--;
    }
    
    visibleSections[currentSectionIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Écouter les touches fléchées
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        navigateToSection('down');
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        navigateToSection('up');
    }
});

// Écouter le scroll pour mettre à jour la navigation
window.addEventListener('scroll', () => {
    updateActiveNav();
    
    // Mettre à jour l'index de la section courante
    const scrollPos = window.pageYOffset + 200;
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            currentSectionIndex = index;
        }
    });
});

// BACK TO TOP BUTTON
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
    // Show/hide button on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Smooth scroll to top on click
    backToTopBtn.addEventListener('click', () => {
        currentSectionIndex = 0;
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// RECRUITER MODE REMOVED

// INITIALIZE FLIP CARDS WHEN DOM IS LOADED
document.addEventListener('DOMContentLoaded', function() {
    initFlipCards();
});

// Also initialize if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFlipCards);
} else {
    initFlipCards();
}
