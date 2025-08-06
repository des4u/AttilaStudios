// Attila Studios - JavaScript Principal
document.addEventListener('DOMContentLoaded', function() {
    
    // Variables globales
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');
    
    // Menú móvil toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animación del botón hamburguesa
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = navMenu.classList.contains('active') 
                ? 'rotate(45deg) translate(5px, 5px)' : '';
            spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
            spans[2].style.transform = navMenu.classList.contains('active') 
                ? 'rotate(-45deg) translate(7px, -6px)' : '';
        });
    }
    
    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            
            // Reset del botón hamburguesa
            const spans = navToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = '';
                span.style.opacity = '1';
            });
        });
    });
    
    // Listener para scroll optimizado ya está implementado arriba
    
    // Animación de entrada para las cards
    function animateOnScroll() {
        const cards = document.querySelectorAll('.feature-card');
        
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const cardVisible = 150;
            
            if (cardTop < window.innerHeight - cardVisible) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                card.classList.add('visible');
            }
        });
    }
    
    // Inicializar cards con animación
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        if (isMobile || isTouch) {
            // En móviles, mostrar las cards inmediatamente
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.transition = 'all 0.3s ease';
        } else {
            // En desktop, usar animación de entrada
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            card.style.transition = 'all 0.6s ease';
            card.style.transitionDelay = `${index * 0.2}s`;
        }
    });
    
    // Ejecutar animación inicial
    setTimeout(() => {
        animateOnScroll();
    }, 100);
    
    // Efecto de typing para el título principal
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
    
    // Partículas de sangre dinámicas
    function createBloodParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = Math.random() > 0.5 ? '#DC143C' : '#8B0000';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = '-10px';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '-1';
        particle.style.opacity = Math.random() * 0.7 + 0.3;
        
        document.body.appendChild(particle);
        
        // Animar la caída
        let position = -10;
        const speed = Math.random() * 2 + 1;
        const rotation = Math.random() * 360;
        
        function fall() {
            position += speed;
            particle.style.top = position + 'px';
            particle.style.transform = `rotate(${position * 2}deg)`;
            
            if (position > window.innerHeight + 10) {
                particle.remove();
            } else {
                requestAnimationFrame(fall);
            }
        }
        
        fall();
    }
    
    // Crear partículas de sangre cada cierto tiempo
    setInterval(createBloodParticle, 2000);
    
    // Efecto de pulso en los botones
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.6s ease-in-out';
        });
        
        button.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });
    
    // Smooth scrolling para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Cursor personalizado medieval
    function createCustomCursor() {
        const cursor = document.createElement('div');
        cursor.id = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 24px;
            height: 24px;
            background: radial-gradient(circle, #D4AF37 0%, #8B7000 40%, #8B0000 70%, #4A0000 100%);
            border: 2px solid #8B7000;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
            transition: transform 0.1s ease;
            box-shadow: 
                0 0 10px rgba(212, 175, 55, 0.6),
                0 0 20px rgba(139, 0, 0, 0.4),
                inset 0 0 5px rgba(255, 215, 0, 0.3);
        `;
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 12 + 'px';
            cursor.style.top = e.clientY - 12 + 'px';
        });
        
        // Agrandar cursor en hover con efecto de espada
        document.querySelectorAll('a, button, .feature-card, .nav-link, .social-link').forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.8) rotate(45deg)';
                cursor.style.borderRadius = '20% 80% 20% 80%';
                cursor.style.background = 'radial-gradient(circle, #FFD700 0%, #DC143C 50%, #8B0000 100%)';
            });
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1) rotate(0deg)';
                cursor.style.borderRadius = '50%';
                cursor.style.background = 'radial-gradient(circle, #D4AF37 0%, #8B7000 40%, #8B0000 70%, #4A0000 100%)';
            });
        });
    }
    
    // Activar cursor personalizado siempre
    createCustomCursor();
    
    // Ocultar cursor del sistema
    document.body.style.cursor = 'none';
    document.documentElement.style.cursor = 'none';
    
    // Efecto de sangre al hacer click
    document.addEventListener('click', function(e) {
        createBloodSplash(e.clientX, e.clientY);
    });
    
    function createBloodSplash(x, y) {
        for (let i = 0; i < 6; i++) {
            const splash = document.createElement('div');
            splash.style.position = 'fixed';
            splash.style.width = Math.random() * 8 + 4 + 'px';
            splash.style.height = splash.style.width;
            splash.style.background = '#DC143C';
            splash.style.borderRadius = '50%';
            splash.style.left = x + 'px';
            splash.style.top = y + 'px';
            splash.style.pointerEvents = 'none';
            splash.style.zIndex = '1000';
            splash.style.opacity = '0.8';
            
            document.body.appendChild(splash);
            
            // Animar salpicadura
            const angle = (Math.PI * 2 * i) / 6;
            const distance = Math.random() * 50 + 20;
            const finalX = x + Math.cos(angle) * distance;
            const finalY = y + Math.sin(angle) * distance;
            
            splash.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 0.8 },
                { transform: `translate(${finalX - x}px, ${finalY - y}px) scale(0)`, opacity: 0 }
            ], {
                duration: 800,
                easing: 'ease-out'
            }).onfinish = () => splash.remove();
        }
    }
    
    // Contador animado (para estadísticas futuras)
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);
            
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }
    
    // Efecto de shake en elementos
    function shake(element, intensity = 5, duration = 500) {
        const originalPosition = element.style.transform;
        const startTime = Date.now();
        
        function shakeFrame() {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / duration;
            
            if (progress < 1) {
                const x = Math.sin(progress * Math.PI * 10) * intensity * (1 - progress);
                const y = Math.cos(progress * Math.PI * 8) * intensity * (1 - progress);
                element.style.transform = `translate(${x}px, ${y}px)`;
                requestAnimationFrame(shakeFrame);
            } else {
                element.style.transform = originalPosition;
            }
        }
        
        shakeFrame();
    }
    
    // Efecto de glitch en texto
    function glitchEffect(element, duration = 2000) {
        const originalText = element.textContent;
        const glitchChars = '!@#$%^&*()_+-={}[]|\\:";\'<>?,./`~';
        let glitchInterval;
        
        function glitch() {
            let glitchedText = '';
            for (let i = 0; i < originalText.length; i++) {
                if (Math.random() < 0.1) {
                    glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
                } else {
                    glitchedText += originalText[i];
                }
            }
            element.textContent = glitchedText;
        }
        
        glitchInterval = setInterval(glitch, 100);
        
        setTimeout(() => {
            clearInterval(glitchInterval);
            element.textContent = originalText;
        }, duration);
    }
    
    // Aplicar efecto glitch al título ocasionalmente
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% de probabilidad cada 10 segundos
                glitchEffect(heroTitle, 500);
            }
        }, 10000);
    }
    
    // Audio context para efectos de sonido (opcional)
    let audioContext;
    
    function initAudio() {
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Audio no soportado');
        }
    }
    
    function playTone(frequency, duration, volume = 0.1) {
        if (!audioContext) return;
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    }
    
    // Sonidos de guerra al hacer hover en botones
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            if (audioContext) {
                playTone(800, 0.1, 0.05); // Sonido sutil de espada
            }
        });
    });
    
    // Preloader con animación de espadas
    function createPreloader() {
        const preloader = document.createElement('div');
        preloader.id = 'preloader';
        preloader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #000000, #1a1a1a);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            flex-direction: column;
        `;
        
        preloader.innerHTML = `
            <div style="position: relative; width: 100px; height: 100px; margin-bottom: 20px;">
                <div class="sword" style="
                    position: absolute;
                    width: 80px;
                    height: 4px;
                    background: linear-gradient(90deg, #FFD700, #B8860B);
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) rotate(45deg);
                    animation: swordSpin 1s linear infinite;
                "></div>
                <div class="sword" style="
                    position: absolute;
                    width: 80px;
                    height: 4px;
                    background: linear-gradient(90deg, #DC143C, #8B0000);
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) rotate(-45deg);
                    animation: swordSpin 1s linear infinite reverse;
                "></div>
            </div>
            <h2 style="color: #FFD700; font-family: Arial, sans-serif; font-size: 1.5rem; text-align: center;">
                ATTILA STUDIOS
            </h2>
            <p style="color: #DC143C; font-family: Arial, sans-serif; margin-top: 10px;">
                Preparando la conquista...
            </p>
        `;
        
        // Agregar animación CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes swordSpin {
                0% { transform: translate(-50%, -50%) rotate(45deg); }
                100% { transform: translate(-50%, -50%) rotate(405deg); }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(preloader);
        
        // Remover preloader después de cargar
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.transition = 'opacity 0.5s ease';
                setTimeout(() => preloader.remove(), 500);
            }, 1000);
        });
    }
    
    // Activar preloader
    if (document.readyState === 'loading') {
        createPreloader();
    }
    
    // Inicializar audio al primer click del usuario
    document.addEventListener('click', () => {
        if (!audioContext) {
            initAudio();
        }
    }, { once: true });
    
    // Detectar dispositivos móviles para optimizaciones
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isMobile || isTouch) {
        // Desactivar algunas animaciones pesadas en móviles
        document.body.classList.add('mobile-device');
        
        // Reducir partículas de sangre en móviles
        const bloodParticles = document.querySelector('.blood-particles');
        if (bloodParticles) {
            bloodParticles.style.display = 'none';
        }
        
        // Desactivar cursor personalizado en móviles
        const customCursor = document.getElementById('custom-cursor');
        if (customCursor) {
            customCursor.style.display = 'none';
        }
        
        // Desactivar efectos de hover en móviles
        const style = document.createElement('style');
        style.textContent = `
            .mobile-device .feature-card:hover::before,
            .mobile-device .btn:hover::before {
                transform: none !important;
            }
            .mobile-device .nav-link:hover,
            .mobile-device .btn:hover {
                transform: none !important;
            }
        `;
        document.head.appendChild(style);
        
        // Optimizar scroll para móviles
        let scrollTimeout;
        const optimizedScroll = () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                animateOnScroll();
            }, 16);
        };
        
        window.removeEventListener('scroll', animateOnScroll);
        window.addEventListener('scroll', optimizedScroll, { passive: true });
        
        // Mejorar navegación táctil
        navLinks.forEach(link => {
            link.addEventListener('touchstart', function() {
                this.style.backgroundColor = 'rgba(212, 175, 55, 0.3)';
            });
            
            link.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.backgroundColor = '';
                }, 150);
            });
        });
        
        // Feedback táctil para botones
        buttons.forEach(button => {
            button.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
                this.style.boxShadow = '0 2px 8px rgba(220, 20, 60, 0.6)';
            });
            
            button.addEventListener('touchend', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
            });
        });
        
        // Prevenir zoom accidental
        document.addEventListener('touchstart', function(e) {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        }, { passive: false });
        
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function(e) {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    } else {
        // Efectos completos para desktop
        createCustomCursor();
        setInterval(createBloodParticle, 2000);
    }
    
    // Cerrar menú móvil al hacer click fuera
    document.addEventListener('click', function(e) {
        if (isMobile && navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                
                // Reset del botón hamburguesa
                const spans = navToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '1';
                });
            }
        }
    });
    
    // Mejorar performance en scroll
    let ticking = false;
    function updateOnScroll() {
        const scrolled = window.pageYOffset;
        
        // Cambiar opacidad del header
        if (scrolled > 50) {
            header.style.background = 'rgba(0, 0, 0, 0.98)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
        }
        
        // Solo aplicar parallax en desktop
        if (!isMobile) {
            const swords = document.querySelector('.swords-container');
            if (swords) {
                swords.style.transform = `translate(-50%, -50%) rotate(${scrolled * 0.1}deg)`;
            }
        }
        
        // Animar cards al hacer scroll
        animateOnScroll();
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
    
    // Manejo de errores global
    window.addEventListener('error', (e) => {
        console.warn('Error capturado:', e.error);
    });
    
    // Performance monitor
    if (window.performance && window.performance.mark) {
        window.performance.mark('attila-studios-loaded');
    }
    
    console.log('🗡️ Attila Studios - Sistema cargado y listo para la conquista digital! 🗡️');
});