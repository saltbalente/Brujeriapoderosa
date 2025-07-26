/**
 * Google Ads Audience Optimizer
 * Sistema avanzado de optimización de audiencias y segmentación para Google Ads
 */

class AudienceOptimizer {
    constructor() {
        this.config = {
            trackingEnabled: true,
            segmentationEnabled: true,
            personalizedContentEnabled: true,
            audienceUpdateInterval: 60000, // 1 minuto
            behaviorTrackingInterval: 10000 // 10 segundos
        };
        
        this.audienceData = {
            demographics: {
                ageGroup: null,
                gender: null,
                location: null,
                language: navigator.language || 'es'
            },
            interests: new Set(),
            behavior: {
                visitFrequency: 0,
                sessionDuration: 0,
                pageViews: 0,
                interactions: 0,
                conversionProbability: 0,
                engagementLevel: 'low'
            },
            technographics: {
                device: this.detectDevice(),
                browser: this.detectBrowser(),
                os: this.detectOS(),
                screenSize: this.getScreenSize(),
                connectionSpeed: null
            },
            psychographics: {
                intentLevel: 'browsing',
                urgencyLevel: 'low',
                pricesensitivity: 'medium',
                trustLevel: 'building'
            },
            customSegments: new Set()
        };
        
        this.behaviorPatterns = {
            scrollPatterns: [],
            clickPatterns: [],
            timePatterns: [],
            navigationPatterns: []
        };
        
        this.contentVariations = {
            headlines: {
                'young_spiritual': 'Descubre tu destino con nuestros jóvenes videntes',
                'mature_seeker': 'Sabiduría ancestral para tu camino espiritual',
                'urgent_help': '¡Respuestas inmediatas a tus preguntas más urgentes!',
                'love_focused': 'Encuentra el amor verdadero con nuestras lecturas',
                'career_focused': 'Impulsa tu carrera con orientación espiritual',
                'general': 'Consultas espirituales con expertos certificados'
            },
            ctas: {
                'high_intent': 'Consultar Ahora - Solo Hoy',
                'medium_intent': 'Comenzar Mi Consulta',
                'low_intent': 'Conocer Más',
                'price_sensitive': 'Ver Precios Especiales',
                'trust_building': 'Leer Testimonios Reales'
            },
            offers: {
                'new_visitor': 'Primera consulta 50% descuento',
                'returning_visitor': 'Bienvenido de vuelta - 20% descuento',
                'high_value': 'Paquete premium con 3 consultas',
                'urgent': 'Consulta inmediata disponible',
                'budget': 'Consulta desde $10 - Accesible para todos'
            }
        };
        
        this.init();
    }
    
    init() {
        this.detectAudience();
        this.setupBehaviorTracking();
        this.initializeSegmentation();
        this.startPersonalization();
        this.setupAudienceReporting();
        
        console.log('Audience Optimizer initialized');
        this.reportEvent('audience_optimizer_initialized');
    }
    
    initializeSegmentation() {
        // Initialize audience segments
        this.segments = {
            demographic: {
                ageGroup: 'unknown',
                gender: 'unknown',
                location: 'unknown'
            },
            behavioral: {
                visitFrequency: 'first-time',
                engagementLevel: 'low',
                purchaseIntent: 'browsing'
            },
            psychographic: {
                interests: [],
                values: [],
                lifestyle: 'unknown'
            },
            technographic: {
                device: this.detectDevice(),
                browser: this.detectBrowser(),
                connectionSpeed: 'unknown'
            }
        };

        // Initialize tracking variables
        this.userProfile = this.loadStoredProfile() || this.createNewProfile();
        this.sessionData = {
            startTime: Date.now(),
            pageViews: 1,
            interactions: 0,
            scrollDepth: 0
        };
    }

    createNewProfile() {
        return {
            id: this.generateUserId(),
            createdAt: Date.now(),
            visits: 1,
            totalTimeSpent: 0,
            preferences: {},
            segments: { ...this.segments }
        };
    }

    generateUserId() {
        return 'user_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    }
    
    loadStoredProfile() {
        try {
            const stored = localStorage.getItem('userProfile');
            return stored ? JSON.parse(stored) : null;
        } catch (e) {
            return null;
        }
    }
    
    detectDevice() {
        const userAgent = navigator.userAgent.toLowerCase();
        if (/mobile|android|iphone|ipad|phone/i.test(userAgent)) {
            return /ipad/i.test(userAgent) ? 'tablet' : 'mobile';
        }
        return 'desktop';
    }
    
    detectBrowser() {
        const userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.includes('chrome')) return 'chrome';
        if (userAgent.includes('firefox')) return 'firefox';
        if (userAgent.includes('safari')) return 'safari';
        if (userAgent.includes('edge')) return 'edge';
        return 'other';
    }
    
    detectOS() {
        const userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.includes('windows')) return 'windows';
        if (userAgent.includes('mac')) return 'macos';
        if (userAgent.includes('linux')) return 'linux';
        if (userAgent.includes('android')) return 'android';
        if (userAgent.includes('ios')) return 'ios';
        return 'other';
    }
    
    getScreenSize() {
        const width = window.screen.width;
        if (width < 768) return 'small';
        if (width < 1024) return 'medium';
        if (width < 1440) return 'large';
        return 'xlarge';
    }
    
    detectAudience() {
        // Detectar ubicación aproximada
        this.detectLocation();
        
        // Analizar patrones de navegación
        this.analyzeNavigationPatterns();
        
        // Detectar intereses basados en comportamiento
        this.detectInterests();
        
        // Evaluar nivel de intención
        this.evaluateIntent();
        
        // Determinar segmento de audiencia
        this.determineAudienceSegment();
    }
    
    detectLocation() {
        // Intentar obtener ubicación del navegador
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.audienceData.demographics.location = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        accuracy: position.coords.accuracy
                    };
                    this.personalizeByLocation();
                },
                () => {
                    // Fallback: detectar por timezone
                    this.audienceData.demographics.location = {
                        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
                    };
                }
            );
        }
    }
    
    analyzeNavigationPatterns() {
        // Analizar referrer para entender origen del tráfico
        const referrer = document.referrer;
        if (referrer) {
            if (referrer.includes('google')) {
                this.audienceData.customSegments.add('google_search');
            } else if (referrer.includes('facebook') || referrer.includes('instagram')) {
                this.audienceData.customSegments.add('social_media');
            } else if (referrer.includes('youtube')) {
                this.audienceData.customSegments.add('video_content');
            }
        } else {
            this.audienceData.customSegments.add('direct_traffic');
        }
        
        // Analizar parámetros UTM
        this.analyzeUTMParameters();
    }
    
    analyzeUTMParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        const utmSource = urlParams.get('utm_source');
        const utmMedium = urlParams.get('utm_medium');
        const utmCampaign = urlParams.get('utm_campaign');
        
        if (utmSource) {
            this.audienceData.customSegments.add(`source_${utmSource}`);
        }
        
        if (utmMedium) {
            this.audienceData.customSegments.add(`medium_${utmMedium}`);
        }
        
        if (utmCampaign) {
            this.audienceData.customSegments.add(`campaign_${utmCampaign}`);
        }
    }
    
    detectInterests() {
        // Analizar contenido de la página para detectar intereses
        const pageContent = document.body.textContent.toLowerCase();
        
        const interestKeywords = {
            'tarot': ['tarot', 'cartas', 'arcanos'],
            'love': ['amor', 'pareja', 'relación', 'corazón'],
            'career': ['trabajo', 'carrera', 'profesional', 'dinero'],
            'spiritual': ['espiritual', 'alma', 'energía', 'chakras'],
            'future': ['futuro', 'destino', 'predicción', 'horóscopo'],
            'healing': ['sanación', 'curación', 'bienestar', 'salud']
        };
        
        Object.entries(interestKeywords).forEach(([interest, keywords]) => {
            if (keywords.some(keyword => pageContent.includes(keyword))) {
                this.audienceData.interests.add(interest);
            }
        });
    }
    
    evaluateIntent() {
        const timeOnPage = Date.now() - (window.pageStartTime || Date.now());
        const scrollDepth = Math.round(
            (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        );
        
        // Evaluar nivel de intención basado en comportamiento
        let intentScore = 0;
        
        if (timeOnPage > 120000) intentScore += 30; // Más de 2 minutos
        else if (timeOnPage > 60000) intentScore += 20; // Más de 1 minuto
        else if (timeOnPage > 30000) intentScore += 10; // Más de 30 segundos
        
        if (scrollDepth > 75) intentScore += 25;
        else if (scrollDepth > 50) intentScore += 15;
        else if (scrollDepth > 25) intentScore += 10;
        
        if (this.audienceData.behavior.interactions > 3) intentScore += 25;
        else if (this.audienceData.behavior.interactions > 1) intentScore += 15;
        
        // Determinar nivel de intención
        if (intentScore >= 70) {
            this.audienceData.psychographics.intentLevel = 'high';
        } else if (intentScore >= 40) {
            this.audienceData.psychographics.intentLevel = 'medium';
        } else {
            this.audienceData.psychographics.intentLevel = 'low';
        }
    }
    
    determineAudienceSegment() {
        // Determinar segmento principal basado en datos recopilados
        const segments = [];
        
        // Segmentación por dispositivo
        segments.push(`device_${this.audienceData.technographics.device}`);
        
        // Segmentación por intención
        segments.push(`intent_${this.audienceData.psychographics.intentLevel}`);
        
        // Segmentación por intereses
        if (this.audienceData.interests.has('love')) {
            segments.push('love_seeker');
        }
        if (this.audienceData.interests.has('career')) {
            segments.push('career_focused');
        }
        if (this.audienceData.interests.has('spiritual')) {
            segments.push('spiritual_seeker');
        }
        
        // Segmentación por comportamiento
        if (this.audienceData.customSegments.has('google_search')) {
            segments.push('search_driven');
        }
        if (this.audienceData.customSegments.has('social_media')) {
            segments.push('social_driven');
        }
        
        // Añadir segmentos determinados
        segments.forEach(segment => {
            this.audienceData.customSegments.add(segment);
        });
        
        this.reportEvent('audience_segmented', {
            segments: Array.from(this.audienceData.customSegments),
            interests: Array.from(this.audienceData.interests)
        });
    }
    
    setupBehaviorTracking() {
        // Tracking de scroll
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.trackScrollBehavior();
            }, 100);
        });
        
        // Tracking de clicks
        document.addEventListener('click', (e) => {
            this.trackClickBehavior(e);
        });
        
        // Tracking de tiempo en página
        setInterval(() => {
            this.updateSessionMetrics();
        }, this.config.behaviorTrackingInterval);
        
        // Tracking de exit intent
        document.addEventListener('mouseleave', (e) => {
            if (e.clientY <= 0) {
                this.handleExitIntent();
            }
        });
    }
    
    trackScrollBehavior() {
        const scrollPercent = Math.round(
            (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        );
        
        this.behaviorPatterns.scrollPatterns.push({
            timestamp: Date.now(),
            scrollPercent: scrollPercent,
            direction: this.getScrollDirection()
        });
        
        // Mantener solo los últimos 50 eventos
        if (this.behaviorPatterns.scrollPatterns.length > 50) {
            this.behaviorPatterns.scrollPatterns.shift();
        }
        
        // Actualizar nivel de engagement
        this.updateEngagementLevel();
    }
    
    trackClickBehavior(event) {
        const clickData = {
            timestamp: Date.now(),
            element: event.target.tagName,
            className: event.target.className,
            id: event.target.id,
            text: event.target.textContent?.substring(0, 50)
        };
        
        this.behaviorPatterns.clickPatterns.push(clickData);
        this.audienceData.behavior.interactions++;
        
        // Mantener solo los últimos 30 clicks
        if (this.behaviorPatterns.clickPatterns.length > 30) {
            this.behaviorPatterns.clickPatterns.shift();
        }
        
        // Analizar tipo de click para determinar intención
        this.analyzeClickIntent(event.target);
    }
    
    analyzeClickIntent(element) {
        const elementText = element.textContent?.toLowerCase() || '';
        const elementClass = element.className?.toLowerCase() || '';
        
        // Detectar clicks de alta intención
        if (elementText.includes('consulta') || 
            elementText.includes('contactar') ||
            elementClass.includes('cta') ||
            elementClass.includes('button')) {
            
            this.audienceData.psychographics.intentLevel = 'high';
            this.audienceData.customSegments.add('high_intent_user');
        }
        
        // Detectar interés en precios
        if (elementText.includes('precio') || 
            elementText.includes('costo') ||
            elementText.includes('tarifa')) {
            
            this.audienceData.psychographics.pricesensitivity = 'high';
            this.audienceData.customSegments.add('price_conscious');
        }
    }
    
    updateSessionMetrics() {
        const currentTime = Date.now();
        this.audienceData.behavior.sessionDuration = currentTime - (window.pageStartTime || currentTime);
        
        // Calcular probabilidad de conversión
        this.calculateConversionProbability();
        
        // Actualizar personalización si es necesario
        this.updatePersonalization();
    }
    
    calculateConversionProbability() {
        let probability = 0;
        
        // Factores de tiempo
        const sessionMinutes = this.audienceData.behavior.sessionDuration / 60000;
        if (sessionMinutes > 5) probability += 30;
        else if (sessionMinutes > 2) probability += 20;
        else if (sessionMinutes > 1) probability += 10;
        
        // Factores de interacción
        if (this.audienceData.behavior.interactions > 5) probability += 25;
        else if (this.audienceData.behavior.interactions > 2) probability += 15;
        
        // Factores de intención
        if (this.audienceData.psychographics.intentLevel === 'high') probability += 30;
        else if (this.audienceData.psychographics.intentLevel === 'medium') probability += 15;
        
        // Factores de segmento
        if (this.audienceData.customSegments.has('high_intent_user')) probability += 20;
        if (this.audienceData.customSegments.has('returning_visitor')) probability += 15;
        
        this.audienceData.behavior.conversionProbability = Math.min(probability, 100);
    }
    
    updateEngagementLevel() {
        const sessionMinutes = this.audienceData.behavior.sessionDuration / 60000;
        const interactionRate = this.audienceData.behavior.interactions / Math.max(sessionMinutes, 1);
        
        if (sessionMinutes > 3 && interactionRate > 2) {
            this.audienceData.behavior.engagementLevel = 'high';
        } else if (sessionMinutes > 1 && interactionRate > 1) {
            this.audienceData.behavior.engagementLevel = 'medium';
        } else {
            this.audienceData.behavior.engagementLevel = 'low';
        }
    }
    
    startPersonalization() {
        // Personalización inicial
        this.personalizeContent();
        
        // Personalización continua
        setInterval(() => {
            this.updatePersonalization();
        }, this.config.audienceUpdateInterval);
    }
    
    personalizeContent() {
        this.personalizeHeadlines();
        this.personalizeCTAs();
        this.personalizeOffers();
        this.personalizeVisualElements();
    }
    
    personalizeHeadlines() {
        const mainHeadline = document.querySelector('h1, .main-headline, .hero-title');
        if (!mainHeadline) return;
        
        let selectedHeadline = this.contentVariations.headlines.general;
        
        // Personalizar basado en intereses
        if (this.audienceData.interests.has('love')) {
            selectedHeadline = this.contentVariations.headlines.love_focused;
        } else if (this.audienceData.interests.has('career')) {
            selectedHeadline = this.contentVariations.headlines.career_focused;
        } else if (this.audienceData.psychographics.intentLevel === 'high') {
            selectedHeadline = this.contentVariations.headlines.urgent_help;
        }
        
        // Personalizar basado en demografía estimada
        if (this.audienceData.technographics.device === 'mobile') {
            selectedHeadline = selectedHeadline.replace('nuestros', 'los mejores');
        }
        
        mainHeadline.textContent = selectedHeadline;
        
        this.reportEvent('headline_personalized', {
            originalText: mainHeadline.dataset.original || mainHeadline.textContent,
            newText: selectedHeadline,
            reason: this.getPersonalizationReason()
        });
    }
    
    personalizeCTAs() {
        const ctaButtons = document.querySelectorAll('.cta, .btn-primary, button[type="submit"]');
        
        ctaButtons.forEach(button => {
            let selectedCTA = this.contentVariations.ctas.medium_intent;
            
            if (this.audienceData.psychographics.intentLevel === 'high') {
                selectedCTA = this.contentVariations.ctas.high_intent;
            } else if (this.audienceData.psychographics.intentLevel === 'low') {
                selectedCTA = this.contentVariations.ctas.low_intent;
            } else if (this.audienceData.customSegments.has('price_conscious')) {
                selectedCTA = this.contentVariations.ctas.price_sensitive;
            } else if (this.audienceData.psychographics.trustLevel === 'building') {
                selectedCTA = this.contentVariations.ctas.trust_building;
            }
            
            button.textContent = selectedCTA;
        });
    }
    
    personalizeOffers() {
        const offerElements = document.querySelectorAll('.offer, .promotion, .discount');
        
        offerElements.forEach(element => {
            let selectedOffer = this.contentVariations.offers.new_visitor;
            
            if (this.audienceData.customSegments.has('returning_visitor')) {
                selectedOffer = this.contentVariations.offers.returning_visitor;
            } else if (this.audienceData.behavior.conversionProbability > 70) {
                selectedOffer = this.contentVariations.offers.high_value;
            } else if (this.audienceData.psychographics.intentLevel === 'high') {
                selectedOffer = this.contentVariations.offers.urgent;
            } else if (this.audienceData.customSegments.has('price_conscious')) {
                selectedOffer = this.contentVariations.offers.budget;
            }
            
            element.textContent = selectedOffer;
        });
    }
    
    personalizeVisualElements() {
        // Personalizar colores basado en demografía
        if (this.audienceData.technographics.device === 'mobile') {
            this.optimizeForMobile();
        }
        
        // Personalizar urgencia visual
        if (this.audienceData.psychographics.intentLevel === 'high') {
            this.addUrgencyElements();
        }
        
        // Personalizar confianza visual
        if (this.audienceData.psychographics.trustLevel === 'building') {
            this.addTrustElements();
        }
    }
    
    optimizeForMobile() {
        const style = document.createElement('style');
        style.textContent = `
            .cta, .btn-primary {
                font-size: 18px !important;
                padding: 15px 25px !important;
                min-height: 50px !important;
            }
            .main-headline, h1 {
                font-size: 24px !important;
                line-height: 1.3 !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    addUrgencyElements() {
        if (!document.querySelector('.urgency-indicator')) {
            const urgencyBanner = document.createElement('div');
            urgencyBanner.className = 'urgency-indicator';
            urgencyBanner.style.cssText = `
                background: linear-gradient(45deg, #e74c3c, #c0392b);
                color: white;
                text-align: center;
                padding: 10px;
                font-weight: bold;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                z-index: 10000;
                animation: pulse 2s infinite;
            `;
            urgencyBanner.textContent = '⚡ Consulta inmediata disponible - Solo por hoy';
            
            document.body.appendChild(urgencyBanner);
            document.body.style.paddingTop = '50px';
        }
    }
    
    addTrustElements() {
        if (!document.querySelector('.trust-indicators')) {
            const trustBadges = document.createElement('div');
            trustBadges.className = 'trust-indicators';
            trustBadges.style.cssText = `
                display: flex;
                justify-content: center;
                gap: 20px;
                margin: 20px 0;
                flex-wrap: wrap;
            `;
            
            trustBadges.innerHTML = `
                <div style="display: flex; align-items: center; gap: 5px; color: #2ecc71;">
                    <span>✓</span> Más de 10,000 consultas realizadas
                </div>
                <div style="display: flex; align-items: center; gap: 5px; color: #2ecc71;">
                    <span>✓</span> Videntes certificados
                </div>
                <div style="display: flex; align-items: center; gap: 5px; color: #2ecc71;">
                    <span>✓</span> 100% confidencial
                </div>
            `;
            
            const mainContent = document.querySelector('main, .main-content, .hero');
            if (mainContent) {
                mainContent.appendChild(trustBadges);
            }
        }
    }
    
    handleExitIntent() {
        if (this.audienceData.behavior.conversionProbability < 50) {
            this.showExitIntentOffer();
        }
    }
    
    showExitIntentOffer() {
        if (document.querySelector('.exit-intent-modal')) return;
        
        const modal = document.createElement('div');
        modal.className = 'exit-intent-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10001;
        `;
        
        modal.innerHTML = `
            <div style="
                background: white;
                padding: 40px;
                border-radius: 15px;
                max-width: 500px;
                text-align: center;
                position: relative;
                animation: slideIn 0.3s ease;
            ">
                <h3 style="color: #2c3e50; margin-bottom: 20px;">¡Espera! No te vayas sin tu consulta</h3>
                <p style="margin-bottom: 25px; color: #666;">
                    Obtén tu primera consulta con <strong>50% de descuento</strong>
                </p>
                <button onclick="window.open('https://wa.me/+12545956299?text=ayuda%20con%20el%20maestro%20en%20consulta%20gratis', '_blank'); this.closest('.exit-intent-modal').remove();" style="
                    background: linear-gradient(45deg, #e74c3c, #c0392b);
                    color: white;
                    border: none;
                    padding: 15px 30px;
                    border-radius: 25px;
                    cursor: pointer;
                    font-weight: bold;
                    font-size: 16px;
                    margin-right: 10px;
                ">Aprovechar Oferta</button>
                <button onclick="this.closest('.exit-intent-modal').remove()" style="
                    background: transparent;
                    color: #999;
                    border: 1px solid #ddd;
                    padding: 15px 30px;
                    border-radius: 25px;
                    cursor: pointer;
                ">No, gracias</button>
                <span onclick="this.closest('.exit-intent-modal').remove()" style="
                    position: absolute;
                    top: 15px;
                    right: 20px;
                    cursor: pointer;
                    font-size: 24px;
                    color: #999;
                ">×</span>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        this.reportEvent('exit_intent_triggered', {
            conversionProbability: this.audienceData.behavior.conversionProbability
        });
    }
    
    getPersonalizationReason() {
        const reasons = [];
        
        if (this.audienceData.interests.size > 0) {
            reasons.push(`interests: ${Array.from(this.audienceData.interests).join(', ')}`);
        }
        
        if (this.audienceData.psychographics.intentLevel !== 'medium') {
            reasons.push(`intent: ${this.audienceData.psychographics.intentLevel}`);
        }
        
        if (this.audienceData.technographics.device !== 'desktop') {
            reasons.push(`device: ${this.audienceData.technographics.device}`);
        }
        
        return reasons.join('; ') || 'default';
    }

    getScrollDirection() {
        if (this.behaviorPatterns.scrollPatterns.length < 2) {
            return 'unknown';
        }
        
        const current = this.behaviorPatterns.scrollPatterns[this.behaviorPatterns.scrollPatterns.length - 1];
        const previous = this.behaviorPatterns.scrollPatterns[this.behaviorPatterns.scrollPatterns.length - 2];
        
        if (current.scrollPercent > previous.scrollPercent) {
            return 'down';
        } else if (current.scrollPercent < previous.scrollPercent) {
            return 'up';
        } else {
            return 'static';
        }
    }

    updatePersonalization() {
        // Solo actualizar si ha pasado suficiente tiempo desde la última actualización
        const now = Date.now();
        if (this.lastPersonalizationUpdate && (now - this.lastPersonalizationUpdate) < 30000) {
            return; // Evitar actualizaciones muy frecuentes
        }
        
        this.lastPersonalizationUpdate = now;
        
        // Actualizar personalización basada en comportamiento actual
        if (this.audienceData.behavior.conversionProbability > 70) {
            this.showHighIntentElements();
        } else if (this.audienceData.behavior.engagementLevel === 'low') {
            this.showEngagementBooster();
        }
        
        // Actualizar ofertas dinámicamente
        this.updateDynamicOffers();
        
        // Reportar actualización
        this.reportEvent('personalization_updated', {
            conversionProbability: this.audienceData.behavior.conversionProbability,
            engagementLevel: this.audienceData.behavior.engagementLevel,
            intentLevel: this.audienceData.psychographics.intentLevel
        });
    }

    showHighIntentElements() {
        if (!document.querySelector('.high-intent-banner')) {
            const banner = document.createElement('div');
            banner.className = 'high-intent-banner';
            banner.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: linear-gradient(45deg, #27ae60, #2ecc71);
                color: white;
                padding: 15px 20px;
                border-radius: 10px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                z-index: 1000;
                max-width: 300px;
                animation: slideInRight 0.5s ease;
            `;
            banner.innerHTML = `
                <div style="font-weight: bold; margin-bottom: 5px;">🎯 ¡Momento perfecto!</div>
                <div style="font-size: 14px; margin-bottom: 10px;">Tu vida cambiará con esta consulta</div>
                <button onclick="window.open('https://wa.me/+12545956299?text=ayuda%20con%20el%20maestro%20en%20consulta%20gratis', '_blank'); this.parentElement.remove();" style="
                    background: white;
                    color: #27ae60;
                    border: none;
                    padding: 8px 15px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-weight: bold;
                    font-size: 12px;
                ">Consultar Ahora</button>
            `;
            document.body.appendChild(banner);
        }
    }

    showEngagementBooster() {
        if (!document.querySelector('.engagement-booster')) {
            const booster = document.createElement('div');
            booster.className = 'engagement-booster';
            booster.style.cssText = `
                position: fixed;
                top: 50%;
                left: 20px;
                transform: translateY(-50%);
                background: linear-gradient(45deg, #3498db, #2980b9);
                color: white;
                padding: 15px;
                border-radius: 10px;
                max-width: 250px;
                z-index: 1000;
                animation: pulse 2s infinite;
            `;
            booster.innerHTML = `
                <div style="font-weight: bold; margin-bottom: 5px;">💡 ¿Necesitas ayuda?</div>
                <div style="font-size: 13px; margin-bottom: 10px;">Obtén respuestas personalizadas</div>
                <button onclick="window.open('https://wa.me/+12545956299?text=ayuda%20con%20el%20maestro%20en%20consulta%20gratis', '_blank'); this.parentElement.remove();" style="
                    background: white;
                    color: #3498db;
                    border: none;
                    padding: 8px 15px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-weight: bold;
                    font-size: 12px;
                ">Preguntar Gratis</button>
            `;
            document.body.appendChild(booster);
            
            // Auto-remover después de 10 segundos
            setTimeout(() => {
                if (booster.parentElement) {
                    booster.remove();
                }
            }, 10000);
        }
    }

    updateDynamicOffers() {
        const offerElements = document.querySelectorAll('.dynamic-offer');
        
        offerElements.forEach(element => {
            let offerText = '🔮 Consulta Personalizada';
            
            if (this.audienceData.behavior.conversionProbability > 80) {
                offerText = '⚡ Consulta Inmediata - 50% OFF';
            } else if (this.audienceData.customSegments.has('returning_visitor')) {
                offerText = '🎁 Oferta Especial para Ti';
            } else if (this.audienceData.psychographics.intentLevel === 'high') {
                offerText = '🚨 Consulta Urgente Disponible';
            }
            
            element.textContent = offerText;
        });
    }
    
    setupAudienceReporting() {
        // Reportar datos de audiencia cada 2 minutos
        setInterval(() => {
            this.reportAudienceData();
        }, 120000);
        
        // Reportar al salir de la página
        window.addEventListener('beforeunload', () => {
            this.reportFinalAudienceData();
        });
    }
    
    reportAudienceData() {
        const audienceReport = {
            demographics: this.audienceData.demographics,
            interests: Array.from(this.audienceData.interests),
            behavior: this.audienceData.behavior,
            technographics: this.audienceData.technographics,
            psychographics: this.audienceData.psychographics,
            segments: Array.from(this.audienceData.customSegments),
            sessionDuration: this.audienceData.behavior.sessionDuration,
            conversionProbability: this.audienceData.behavior.conversionProbability
        };
        
        this.reportEvent('audience_data_update', audienceReport);
    }
    
    reportFinalAudienceData() {
        const finalReport = {
            ...this.audienceData,
            interests: Array.from(this.audienceData.interests),
            segments: Array.from(this.audienceData.customSegments),
            behaviorPatterns: {
                totalScrollEvents: this.behaviorPatterns.scrollPatterns.length,
                totalClicks: this.behaviorPatterns.clickPatterns.length,
                avgScrollDepth: this.calculateAverageScrollDepth(),
                sessionSummary: this.generateSessionSummary()
            }
        };
        
        this.reportEvent('audience_session_complete', finalReport);
        
        // Guardar en localStorage para próximas visitas
        localStorage.setItem('audienceProfile', JSON.stringify(finalReport));
    }
    
    calculateAverageScrollDepth() {
        if (this.behaviorPatterns.scrollPatterns.length === 0) return 0;
        
        const totalDepth = this.behaviorPatterns.scrollPatterns.reduce(
            (sum, pattern) => sum + pattern.scrollPercent, 0
        );
        
        return Math.round(totalDepth / this.behaviorPatterns.scrollPatterns.length);
    }
    
    generateSessionSummary() {
        return {
            duration: this.audienceData.behavior.sessionDuration,
            interactions: this.audienceData.behavior.interactions,
            engagementLevel: this.audienceData.behavior.engagementLevel,
            conversionProbability: this.audienceData.behavior.conversionProbability,
            primaryInterests: Array.from(this.audienceData.interests).slice(0, 3),
            keySegments: Array.from(this.audienceData.customSegments).slice(0, 5)
        };
    }
    
    reportEvent(eventName, data = {}) {
        if (!this.config.trackingEnabled) return;
        
        const eventData = {
            event: eventName,
            timestamp: Date.now(),
            audience_segment: Array.from(this.audienceData.customSegments)[0] || 'unknown',
            intent_level: this.audienceData.psychographics.intentLevel,
            device_type: this.audienceData.technographics.device,
            ...data
        };
        
        // Enviar a Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, eventData);
        }
        
        console.log('Audience Optimizer:', eventData);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.audienceOptimizer = new AudienceOptimizer();
    
    // Cargar perfil de audiencia previo si existe
    const savedProfile = localStorage.getItem('audienceProfile');
    if (savedProfile) {
        try {
            const profile = JSON.parse(savedProfile);
            // Marcar como visitante recurrente
            window.audienceOptimizer.audienceData.customSegments.add('returning_visitor');
            window.audienceOptimizer.audienceData.behavior.visitFrequency = (profile.behavior?.visitFrequency || 0) + 1;
        } catch (e) {
            console.log('Could not load previous audience profile');
        }
    }
});