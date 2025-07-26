/**
 * Landing Page Optimizer for Google Ads Quality Score
 * Optimiza específicamente las landing pages para mejorar el Quality Score
 */

class LandingPageOptimizer {
    constructor() {
        this.config = {
            trackingEnabled: true,
            optimizationsEnabled: true,
            reportingInterval: 30000, // 30 segundos
            qualityThresholds: {
                loadTime: 3000, // 3 segundos
                interactionRate: 0.3, // 30%
                bounceRate: 0.4, // 40%
                timeOnPage: 30000 // 30 segundos
            }
        };
        
        this.metrics = {
            pageLoadTime: 0,
            timeOnPage: 0,
            interactions: 0,
            scrollDepth: 0,
            formEngagement: 0,
            ctaClicks: 0,
            phoneClicks: 0,
            whatsappClicks: 0
        };
        
        this.optimizations = {
            headlineVariations: [
                'Consulta Espiritual Personalizada - Respuestas Inmediatas',
                'Tarot y Videncia Online - Guía Espiritual Profesional',
                'Chamanes Expertos - Consulta Espiritual 24/7',
                'Videncia Auténtica - Encuentra tu Camino Espiritual'
            ],
            ctaVariations: [
                'Consultar Ahora',
                'Obtener Respuestas',
                'Iniciar Consulta',
                'Hablar con Experto'
            ],
            urgencyMessages: [
                'Solo hoy: Consulta gratuita de 10 minutos',
                'Últimas 3 consultas disponibles hoy',
                'Oferta especial: 50% descuento en primera consulta',
                'Expertos disponibles ahora - No esperes más'
            ]
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.startMetricsTracking();
        this.optimizePageElements();
        this.implementTrustSignals();
        this.setupFormOptimizations();
        this.monitorPageQuality();
        
        console.log('Landing Page Optimizer initialized');
    }
    
    setupEventListeners() {
        // Tracking de interacciones
        document.addEventListener('click', (e) => {
            this.trackInteraction('click', e.target);
        });
        
        document.addEventListener('scroll', () => {
            this.trackScrollDepth();
        });
        
        // Tracking de formularios
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('focus', () => {
                this.metrics.formEngagement++;
                this.reportEvent('form_engagement', { type: 'focus' });
            }, true);
            
            form.addEventListener('submit', (e) => {
                this.trackConversion('form_submission');
            });
        });
        
        // Tracking de CTAs específicos
        this.setupCTATracking();
    }
    
    setupCTATracking() {
        // Botones de consulta
        const consultaButtons = document.querySelectorAll('[data-action="consulta"], .cta-button, .btn-consulta');
        consultaButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.metrics.ctaClicks++;
                this.trackConversion('cta_click');
                this.reportEvent('cta_engagement', { button: btn.textContent });
            });
        });
        
        // Enlaces de teléfono
        const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
        phoneLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.metrics.phoneClicks++;
                this.trackConversion('phone_click');
                this.reportEvent('phone_engagement');
            });
        });
        
        // Enlaces de WhatsApp
        const whatsappLinks = document.querySelectorAll('a[href*="whatsapp"], a[href*="wa.me"]');
        whatsappLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.metrics.whatsappClicks++;
                this.trackConversion('whatsapp_click');
                this.reportEvent('whatsapp_engagement');
            });
        });
    }
    
    trackInteraction(type, element) {
        this.metrics.interactions++;
        
        // Reportar interacciones importantes
        if (element.matches('button, a, input, select, textarea')) {
            this.reportEvent('user_interaction', {
                type: type,
                element: element.tagName,
                text: element.textContent || element.value || element.alt
            });
        }
    }
    
    trackScrollDepth() {
        const scrollPercent = Math.round(
            (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        );
        
        if (scrollPercent > this.metrics.scrollDepth) {
            this.metrics.scrollDepth = scrollPercent;
            
            // Reportar hitos importantes
            if (scrollPercent >= 25 && scrollPercent < 50) {
                this.reportEvent('scroll_depth', { depth: '25%' });
            } else if (scrollPercent >= 50 && scrollPercent < 75) {
                this.reportEvent('scroll_depth', { depth: '50%' });
            } else if (scrollPercent >= 75) {
                this.reportEvent('scroll_depth', { depth: '75%' });
            }
        }
    }
    
    optimizePageElements() {
        // Optimizar headlines dinámicamente
        this.optimizeHeadlines();
        
        // Optimizar CTAs
        this.optimizeCTAs();
        
        // Añadir elementos de urgencia
        this.addUrgencyElements();
        
        // Optimizar imágenes para conversión
        this.optimizeImages();
    }
    
    optimizeHeadlines() {
        const headlines = document.querySelectorAll('h1, .main-headline, .hero-title');
        headlines.forEach(headline => {
            if (Math.random() < 0.3) { // 30% de probabilidad de cambio
                const randomHeadline = this.optimizations.headlineVariations[
                    Math.floor(Math.random() * this.optimizations.headlineVariations.length)
                ];
                headline.textContent = randomHeadline;
                this.reportEvent('headline_optimization', { new_headline: randomHeadline });
            }
        });
    }
    
    optimizeCTAs() {
        const ctaButtons = document.querySelectorAll('.cta-button, .btn-consulta, [data-action="consulta"]');
        ctaButtons.forEach(btn => {
            if (Math.random() < 0.4) { // 40% de probabilidad de cambio
                const randomCTA = this.optimizations.ctaVariations[
                    Math.floor(Math.random() * this.optimizations.ctaVariations.length)
                ];
                btn.textContent = randomCTA;
                this.reportEvent('cta_optimization', { new_cta: randomCTA });
            }
        });
    }
    
    addUrgencyElements() {
        // Añadir mensaje de urgencia si no existe
        if (!document.querySelector('.urgency-message')) {
            const urgencyDiv = document.createElement('div');
            urgencyDiv.className = 'urgency-message';
            urgencyDiv.style.cssText = `
                background: linear-gradient(45deg, #ff6b6b, #ee5a24);
                color: white;
                padding: 10px 20px;
                text-align: center;
                font-weight: bold;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                z-index: 1000;
                animation: pulse 2s infinite;
            `;
            
            const randomUrgency = this.optimizations.urgencyMessages[
                Math.floor(Math.random() * this.optimizations.urgencyMessages.length)
            ];
            urgencyDiv.textContent = randomUrgency;
            
            document.body.insertBefore(urgencyDiv, document.body.firstChild);
            
            // Ajustar el padding del body
            document.body.style.paddingTop = '50px';
            
            this.reportEvent('urgency_element_added', { message: randomUrgency });
        }
    }
    
    implementTrustSignals() {
        // Añadir indicadores de confianza
        const trustSignals = [
            '✓ Más de 10,000 consultas realizadas',
            '✓ Expertos certificados disponibles 24/7',
            '✓ Consulta segura y confidencial',
            '✓ Satisfacción garantizada'
        ];
        
        if (!document.querySelector('.trust-signals')) {
            const trustDiv = document.createElement('div');
            trustDiv.className = 'trust-signals';
            trustDiv.style.cssText = `
                background: rgba(46, 204, 113, 0.1);
                border: 1px solid #2ecc71;
                border-radius: 8px;
                padding: 15px;
                margin: 20px 0;
                text-align: center;
            `;
            
            const trustList = document.createElement('ul');
            trustList.style.cssText = `
                list-style: none;
                padding: 0;
                margin: 0;
                color: #27ae60;
                font-weight: 500;
            `;
            
            trustSignals.forEach(signal => {
                const li = document.createElement('li');
                li.textContent = signal;
                li.style.margin = '5px 0';
                trustList.appendChild(li);
            });
            
            trustDiv.appendChild(trustList);
            
            // Insertar después del primer elemento principal
            const mainContent = document.querySelector('main, .main-content, .hero');
            if (mainContent) {
                mainContent.appendChild(trustDiv);
                this.reportEvent('trust_signals_added');
            }
        }
    }
    
    setupFormOptimizations() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            // Validación en tiempo real
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('blur', () => {
                    this.validateField(input);
                });
                
                input.addEventListener('input', () => {
                    this.clearFieldError(input);
                });
            });
            
            // Autocompletado inteligente
            this.setupSmartAutocomplete(form);
        });
    }
    
    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        if (field.required && !value) {
            isValid = false;
            errorMessage = 'Este campo es obligatorio';
        } else if (field.type === 'email' && value && !this.isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Por favor ingresa un email válido';
        } else if (field.type === 'tel' && value && !this.isValidPhone(value)) {
            isValid = false;
            errorMessage = 'Por favor ingresa un teléfono válido';
        }
        
        this.showFieldValidation(field, isValid, errorMessage);
        return isValid;
    }
    
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    isValidPhone(phone) {
        return /^[\+]?[0-9\s\-\(\)]{10,}$/.test(phone);
    }
    
    showFieldValidation(field, isValid, message) {
        // Remover mensajes anteriores
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        if (!isValid) {
            field.style.borderColor = '#e74c3c';
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.textContent = message;
            errorDiv.style.cssText = `
                color: #e74c3c;
                font-size: 12px;
                margin-top: 5px;
            `;
            field.parentNode.appendChild(errorDiv);
        } else {
            field.style.borderColor = '#2ecc71';
        }
    }
    
    clearFieldError(field) {
        field.style.borderColor = '';
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
    
    startMetricsTracking() {
        this.startTime = Date.now();
        
        // Actualizar tiempo en página cada segundo
        setInterval(() => {
            this.metrics.timeOnPage = Date.now() - this.startTime;
        }, 1000);
        
        // Reportar métricas cada 30 segundos
        setInterval(() => {
            this.reportMetrics();
        }, this.config.reportingInterval);
        
        // Tracking de tiempo de carga
        window.addEventListener('load', () => {
            this.metrics.pageLoadTime = performance.now();
            this.reportEvent('page_load_complete', { 
                loadTime: this.metrics.pageLoadTime 
            });
        });
    }
    
    monitorPageQuality() {
        setInterval(() => {
            const quality = this.calculatePageQuality();
            
            if (quality.score < 70) {
                this.triggerQualityImprovements(quality);
            }
            
            this.reportEvent('page_quality_check', quality);
        }, 60000); // Cada minuto
    }
    
    calculatePageQuality() {
        const timeOnPage = this.metrics.timeOnPage / 1000; // en segundos
        const interactionRate = this.metrics.interactions / Math.max(timeOnPage / 10, 1);
        const engagementScore = Math.min((this.metrics.scrollDepth / 100) * 50 + 
                                       Math.min(interactionRate * 25, 25) + 
                                       Math.min(timeOnPage / 60 * 25, 25), 100);
        
        return {
            score: Math.round(engagementScore),
            timeOnPage: timeOnPage,
            interactions: this.metrics.interactions,
            scrollDepth: this.metrics.scrollDepth,
            loadTime: this.metrics.pageLoadTime,
            conversions: this.metrics.ctaClicks + this.metrics.phoneClicks + this.metrics.whatsappClicks
        };
    }
    
    triggerQualityImprovements(quality) {
        // Si el tiempo en página es bajo, mostrar contenido más atractivo
        if (quality.timeOnPage < 30) {
            this.showEngagementBooster();
        }
        
        // Si hay pocas interacciones, hacer CTAs más prominentes
        if (quality.interactions < 3) {
            this.enhanceCTAs();
        }
        
        // Si el scroll es bajo, añadir indicadores visuales
        if (quality.scrollDepth < 50) {
            this.addScrollIndicators();
        }
    }
    
    showEngagementBooster() {
        if (!document.querySelector('.engagement-booster')) {
            const booster = document.createElement('div');
            booster.className = 'engagement-booster';
            booster.innerHTML = `
                <div style="
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background: linear-gradient(45deg, #667eea, #764ba2);
                    color: white;
                    padding: 15px 20px;
                    border-radius: 25px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
                    z-index: 1000;
                    cursor: pointer;
                    animation: bounce 2s infinite;
                ">
                    <strong>💫 ¿Necesitas respuestas ahora?</strong><br>
                    <small>Consulta gratuita de 5 minutos</small>
                </div>
            `;
            
            booster.addEventListener('click', () => {
                this.trackConversion('engagement_booster_click');
                booster.remove();
            });
            
            document.body.appendChild(booster);
            this.reportEvent('engagement_booster_shown');
        }
    }
    
    enhanceCTAs() {
        const ctaButtons = document.querySelectorAll('.cta-button, .btn-consulta');
        ctaButtons.forEach(btn => {
            btn.style.cssText += `
                animation: pulse 2s infinite;
                box-shadow: 0 0 20px rgba(255, 107, 107, 0.6);
                transform: scale(1.05);
            `;
        });
        
        this.reportEvent('ctas_enhanced');
    }
    
    addScrollIndicators() {
        if (!document.querySelector('.scroll-indicator')) {
            const indicator = document.createElement('div');
            indicator.className = 'scroll-indicator';
            indicator.innerHTML = '↓ Desliza para ver más ↓';
            indicator.style.cssText = `
                position: fixed;
                bottom: 10px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(0,0,0,0.7);
                color: white;
                padding: 10px 20px;
                border-radius: 20px;
                z-index: 1000;
                animation: bounce 2s infinite;
            `;
            
            document.body.appendChild(indicator);
            
            // Remover cuando el usuario haga scroll
            const removeIndicator = () => {
                if (window.scrollY > 100) {
                    indicator.remove();
                    window.removeEventListener('scroll', removeIndicator);
                }
            };
            
            window.addEventListener('scroll', removeIndicator);
            this.reportEvent('scroll_indicator_added');
        }
    }
    
    trackConversion(type) {
        // Reportar a Google Ads
        if (typeof gtag !== 'undefined') {
            gtag('event', 'conversion', {
                send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL',
                event_category: 'landing_page',
                event_label: type,
                value: 1
            });
        }
        
        // Reportar a Google Analytics
        if (typeof ga !== 'undefined') {
            ga('send', 'event', 'Landing Page', 'Conversion', type, 1);
        }
        
        this.reportEvent('conversion', { type: type });
    }
    
    reportEvent(eventName, data = {}) {
        if (!this.config.trackingEnabled) return;
        
        const eventData = {
            event: eventName,
            timestamp: Date.now(),
            page_url: window.location.href,
            user_agent: navigator.userAgent,
            ...data
        };
        
        // Enviar a Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, eventData);
        }
        
        console.log('Landing Page Event:', eventData);
    }
    
    reportMetrics() {
        const quality = this.calculatePageQuality();
        
        this.reportEvent('landing_page_metrics', {
            ...this.metrics,
            quality_score: quality.score,
            session_duration: this.metrics.timeOnPage
        });
    }
    
    optimizeImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // Añadir lazy loading si no está presente
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
            
            // Optimizar alt text para SEO
            if (!img.alt || img.alt.length < 10) {
                img.alt = 'Consulta espiritual profesional - Tarot y videncia online';
            }
        });
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.landingPageOptimizer = new LandingPageOptimizer();
});

// Añadir estilos CSS para animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-10px); }
        60% { transform: translateY(-5px); }
    }
    
    .field-error {
        animation: fadeIn 0.3s ease-in;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);