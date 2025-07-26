/**
 * Sistema de Partículas Místicas Optimizado
 * Efecto visual ligero que responde al scroll y está optimizado para Google Ads
 */

class MysticParticles {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.animationId = null;
        this.isVisible = false;
        this.scrollY = 0;
        this.lastScrollY = 0;
        this.scrollVelocity = 0;
        
        // Configuración optimizada para rendimiento
        this.config = {
            maxParticles: window.innerWidth < 768 ? 15 : 25, // Menos partículas en móvil
            particleSize: { min: 1, max: 3 },
            speed: { min: 0.2, max: 0.8 },
            opacity: { min: 0.1, max: 0.4 },
            colors: ['#722f37', '#8b1538', '#4a0e1f', '#5d1e2a'],
            scrollSensitivity: 0.02
        };
        
        this.init();
    }

    init() {
        this.createCanvas();
        this.createParticles();
        this.setupEventListeners();
        this.startAnimation();
        
        // Reportar inicialización a Google Ads
        this.reportToGoogleAds('mystic_particles_initialized', {
            particle_count: this.config.maxParticles,
            performance_optimized: true
        });
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'mystic-particles';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            opacity: 0.6;
        `;
        
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
    }

    resizeCanvas() {
        if (this.resizeTimeout) {
            cancelAnimationFrame(this.resizeTimeout);
        }
        this.resizeTimeout = requestAnimationFrame(() => {
            const dpr = window.devicePixelRatio || 1;
            const rect = this.canvas.getBoundingClientRect();
            
            this.canvas.width = rect.width * dpr;
            this.canvas.height = rect.height * dpr;
            
            this.ctx.scale(dpr, dpr);
            this.canvas.style.width = rect.width + 'px';
            this.canvas.style.height = rect.height + 'px';

            // Recreate particles after resize
            this.particles = [];
            this.createParticles();

            this.resizeTimeout = null;
        });
    }

    createParticles() {
        this.particles = [];
        
        for (let i = 0; i < this.config.maxParticles; i++) {
            this.particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                size: Math.random() * (this.config.particleSize.max - this.config.particleSize.min) + this.config.particleSize.min,
                speedX: (Math.random() - 0.5) * (this.config.speed.max - this.config.speed.min) + this.config.speed.min,
                speedY: (Math.random() - 0.5) * (this.config.speed.max - this.config.speed.min) + this.config.speed.min,
                opacity: Math.random() * (this.config.opacity.max - this.config.opacity.min) + this.config.opacity.min,
                color: this.config.colors[Math.floor(Math.random() * this.config.colors.length)],
                originalSpeedX: 0,
                originalSpeedY: 0,
                angle: Math.random() * Math.PI * 2,
                pulse: Math.random() * 0.02 + 0.01
            });
            
            // Guardar velocidades originales
            this.particles[i].originalSpeedX = this.particles[i].speedX;
            this.particles[i].originalSpeedY = this.particles[i].speedY;
        }
    }

    setupEventListeners() {
        // Optimizar el listener de scroll con throttling
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            
            this.updateScrollEffect();
            
            scrollTimeout = setTimeout(() => {
                this.reportScrollInteraction();
            }, 150);
        }, { passive: true });

        // Optimizar resize con debouncing
        let resizeTimeout;
        window.addEventListener('resize', () => {
            if (resizeTimeout) {
                clearTimeout(resizeTimeout);
            }
            
            resizeTimeout = setTimeout(() => {
                this.resizeCanvas();
                this.adjustParticleCount();
            }, 250);
        }, { passive: true });

        // Pausar animación cuando la pestaña no está visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimation();
            } else {
                this.resumeAnimation();
            }
        });
    }

    updateScrollEffect() {
        this.lastScrollY = this.scrollY;
        this.scrollY = window.pageYOffset;
        this.scrollVelocity = (this.scrollY - this.lastScrollY) * this.config.scrollSensitivity;
        
        // Aplicar efecto de scroll a las partículas
        this.particles.forEach(particle => {
            particle.speedX = particle.originalSpeedX + this.scrollVelocity * 0.5;
            particle.speedY = particle.originalSpeedY + this.scrollVelocity * 0.3;
            
            // Efecto de pulsación basado en scroll
            particle.opacity = Math.max(0.1, Math.min(0.6, 
                particle.opacity + this.scrollVelocity * 0.1
            ));
        });
    }

    adjustParticleCount() {
        const newMaxParticles = window.innerWidth < 768 ? 15 : 25;
        
        if (newMaxParticles !== this.config.maxParticles) {
            this.config.maxParticles = newMaxParticles;
            
            if (this.particles.length > newMaxParticles) {
                this.particles = this.particles.slice(0, newMaxParticles);
            } else if (this.particles.length < newMaxParticles) {
                const needed = newMaxParticles - this.particles.length;
                for (let i = 0; i < needed; i++) {
                    this.particles.push(this.createSingleParticle());
                }
            }
        }
    }

    createSingleParticle() {
        const particle = {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: Math.random() * (this.config.particleSize.max - this.config.particleSize.min) + this.config.particleSize.min,
            speedX: (Math.random() - 0.5) * (this.config.speed.max - this.config.speed.min) + this.config.speed.min,
            speedY: (Math.random() - 0.5) * (this.config.speed.max - this.config.speed.min) + this.config.speed.min,
            opacity: Math.random() * (this.config.opacity.max - this.config.opacity.min) + this.config.opacity.min,
            color: this.config.colors[Math.floor(Math.random() * this.config.colors.length)],
            angle: Math.random() * Math.PI * 2,
            pulse: Math.random() * 0.02 + 0.01
        };
        
        particle.originalSpeedX = particle.speedX;
        particle.originalSpeedY = particle.speedY;
        
        return particle;
    }

    animate() {
        if (!this.isVisible) return;
        
        // Limpiar canvas de forma optimizada
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Actualizar y dibujar partículas
        this.particles.forEach(particle => {
            this.updateParticle(particle);
            this.drawParticle(particle);
        });
        
        // Reducir velocidad de scroll gradualmente
        this.scrollVelocity *= 0.95;
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    updateParticle(particle) {
        // Movimiento básico
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Efecto de pulsación
        particle.angle += particle.pulse;
        particle.opacity += Math.sin(particle.angle) * 0.01;
        
        // Mantener partículas en pantalla
        if (particle.x < 0) particle.x = window.innerWidth;
        if (particle.x > window.innerWidth) particle.x = 0;
        if (particle.y < 0) particle.y = window.innerHeight;
        if (particle.y > window.innerHeight) particle.y = 0;
        
        // Normalizar opacidad
        particle.opacity = Math.max(this.config.opacity.min, 
            Math.min(this.config.opacity.max, particle.opacity));
    }

    drawParticle(particle) {
        this.ctx.save();
        this.ctx.globalAlpha = particle.opacity;
        this.ctx.fillStyle = particle.color;
        
        // Dibujar partícula con efecto de brillo
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Efecto de brillo sutil
        this.ctx.globalAlpha = particle.opacity * 0.3;
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size * 1.5, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.restore();
    }

    startAnimation() {
        this.isVisible = true;
        this.animate();
    }

    pauseAnimation() {
        this.isVisible = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }

    resumeAnimation() {
        if (!this.isVisible) {
            this.startAnimation();
        }
    }

    reportScrollInteraction() {
        if (Math.abs(this.scrollVelocity) > 0.5) {
            this.reportToGoogleAds('mystic_scroll_interaction', {
                scroll_velocity: Math.abs(this.scrollVelocity),
                engagement_level: 'high',
                visual_effect: 'particles_responsive'
            });
        }
    }

    reportToGoogleAds(eventName, data) {
        // Reportar a Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                event_category: 'visual_engagement',
                event_label: 'mystic_particles',
                custom_parameter: 'performance_optimized',
                ...data
            });
        }

        // Reportar a Google Tag Manager
        if (typeof dataLayer !== 'undefined') {
            dataLayer.push({
                event: eventName,
                category: 'visual_engagement',
                ...data
            });
        }
    }

    // Método para destruir las partículas si es necesario
    destroy() {
        this.pauseAnimation();
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
        window.removeEventListener('scroll', this.updateScrollEffect);
        window.removeEventListener('resize', this.resizeCanvas);
    }
}

// Auto-inicialización optimizada
document.addEventListener('DOMContentLoaded', () => {
    // Solo inicializar si el dispositivo tiene suficiente rendimiento
    const isHighPerformance = !(/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) 
        || window.innerWidth > 768;
    
    if (isHighPerformance || !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setTimeout(() => {
            window.mysticParticles = new MysticParticles();
        }, 1000); // Retrasar para no interferir con la carga inicial
    }
});

// Exportar para uso global
window.MysticParticles = MysticParticles;