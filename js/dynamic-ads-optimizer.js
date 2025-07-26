/**
 * Dynamic Ads Optimizer para Google Ads Quality Score
 * Optimiza dinámicamente el contenido y la experiencia basándose en datos en tiempo real
 * Mejora la relevancia de anuncios y la experiencia del usuario
 */

class DynamicAdsOptimizer {
    constructor() {
        this.userProfile = {
            interests: [],
            behavior: {},
            demographics: {},
            intent: 'unknown',
            stage: 'awareness', // awareness, consideration, decision
            source: 'unknown'
        };
        
        this.contentVariations = {
            headlines: [],
            descriptions: [],
            ctas: [],
            offers: [],
            testimonials: []
        };
        
        this.optimizations = {
            active: new Set(),
            history: [],
            performance: {}
        };
        
        this.keywords = [
            'tarot online', 'consulta tarot', 'tarot gratis', 'vidente online',
            'lectura cartas', 'tarot amor', 'tarot trabajo', 'consulta espiritual',
            'medium online', 'tarot telefónico', 'vidente experto', 'tarot profesional'
        ];
        
        this.init();
    }

    init() {
        console.log('🎯 Dynamic Ads Optimizer iniciado');
        
        // Analizar usuario
        this.analyzeUser();
        
        // Configurar variaciones de contenido
        this.setupContentVariations();
        
        // Iniciar optimizaciones dinámicas
        this.startDynamicOptimizations();
        
        // Configurar seguimiento de rendimiento
        this.setupPerformanceTracking();
        
        // Configurar A/B testing automático
        this.setupAutomaticABTesting();
        
        // Configurar optimización de keywords
        this.setupKeywordOptimization();
    }

    analyzeUser() {
        console.log('👤 Analizando perfil de usuario...');
        
        // Analizar fuente de tráfico
        this.analyzeTrafficSource();
        
        // Analizar comportamiento
        this.analyzeBehavior();
        
        // Analizar intent
        this.analyzeIntent();
        
        // Analizar demografía (si está disponible)
        this.analyzeDemographics();
        
        // Determinar etapa del funnel
        this.determineFunnelStage();
        
        console.log('👤 Perfil de usuario:', this.userProfile);
    }

    analyzeTrafficSource() {
        const referrer = document.referrer;
        const urlParams = new URLSearchParams(window.location.search);
        
        // Analizar parámetros UTM
        if (urlParams.get('utm_source')) {
            this.userProfile.source = urlParams.get('utm_source');
            this.userProfile.medium = urlParams.get('utm_medium');
            this.userProfile.campaign = urlParams.get('utm_campaign');
        }
        
        // Analizar referrer
        if (referrer.includes('google')) {
            this.userProfile.source = 'google';
            this.userProfile.interests.push('search');
        } else if (referrer.includes('facebook')) {
            this.userProfile.source = 'facebook';
            this.userProfile.interests.push('social');
        } else if (referrer.includes('instagram')) {
            this.userProfile.source = 'instagram';
            this.userProfile.interests.push('visual', 'social');
        }
        
        // Analizar keywords de búsqueda (si están disponibles)
        const searchQuery = urlParams.get('q') || urlParams.get('query');
        if (searchQuery) {
            this.analyzeSearchQuery(searchQuery);
        }
    }

    analyzeSearchQuery(query) {
        const lowerQuery = query.toLowerCase();
        
        // Detectar intención
        if (lowerQuery.includes('gratis') || lowerQuery.includes('free')) {
            this.userProfile.intent = 'price_sensitive';
            this.userProfile.stage = 'awareness';
        } else if (lowerQuery.includes('mejor') || lowerQuery.includes('experto') || lowerQuery.includes('profesional')) {
            this.userProfile.intent = 'quality_focused';
            this.userProfile.stage = 'consideration';
        } else if (lowerQuery.includes('ahora') || lowerQuery.includes('urgente') || lowerQuery.includes('inmediato')) {
            this.userProfile.intent = 'urgent';
            this.userProfile.stage = 'decision';
        }
        
        // Detectar temas de interés
        if (lowerQuery.includes('amor') || lowerQuery.includes('pareja')) {
            this.userProfile.interests.push('love');
        } else if (lowerQuery.includes('trabajo') || lowerQuery.includes('dinero')) {
            this.userProfile.interests.push('career');
        } else if (lowerQuery.includes('salud')) {
            this.userProfile.interests.push('health');
        } else if (lowerQuery.includes('futuro') || lowerQuery.includes('destino')) {
            this.userProfile.interests.push('future');
        }
    }

    analyzeBehavior() {
        // Analizar tiempo en página
        setTimeout(() => {
            if (this.getTimeOnPage() > 60) {
                this.userProfile.behavior.engaged = true;
                this.userProfile.stage = 'consideration';
            }
        }, 60000);
        
        // Analizar scroll behavior
        let maxScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                if (maxScroll > 75) {
                    this.userProfile.behavior.deepReader = true;
                    this.userProfile.interests.push('detailed_info');
                }
            }
        });
        
        // Analizar interacciones
        let interactions = 0;
        ['click', 'touchstart'].forEach(event => {
            document.addEventListener(event, () => {
                interactions++;
                if (interactions > 3) {
                    this.userProfile.behavior.interactive = true;
                    this.userProfile.stage = 'consideration';
                }
            });
        });
        
        // Analizar patrones de mouse (desktop)
        if (!this.isMobile()) {
            this.analyzeMousePatterns();
        }
    }

    analyzeMousePatterns() {
        let mouseMovements = 0;
        let rapidMovements = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseMovements++;
            
            // Detectar movimientos rápidos (posible frustración)
            if (e.movementX > 50 || e.movementY > 50) {
                rapidMovements++;
            }
            
            // Analizar cada 100 movimientos
            if (mouseMovements % 100 === 0) {
                if (rapidMovements / mouseMovements > 0.3) {
                    this.userProfile.behavior.frustrated = true;
                    this.triggerFrustrationOptimization();
                }
            }
        });
    }

    analyzeIntent() {
        // Analizar elementos en los que hace hover
        document.querySelectorAll('a, button, .mystic-button').forEach(element => {
            element.addEventListener('mouseenter', () => {
                const text = element.textContent.toLowerCase();
                
                if (text.includes('gratis') || text.includes('free')) {
                    this.userProfile.intent = 'price_sensitive';
                } else if (text.includes('consulta') || text.includes('hablar')) {
                    this.userProfile.intent = 'consultation_ready';
                    this.userProfile.stage = 'decision';
                } else if (text.includes('whatsapp') || text.includes('teléfono')) {
                    this.userProfile.intent = 'contact_ready';
                    this.userProfile.stage = 'decision';
                }
            });
        });
        
        // Analizar tiempo en elementos específicos
        this.trackElementFocus();
    }

    trackElementFocus() {
        const importantElements = document.querySelectorAll('.service-card, .testimonial, .pricing, .cta-button');
        
        importantElements.forEach(element => {
            let focusTime = 0;
            let focusInterval;
            
            element.addEventListener('mouseenter', () => {
                focusInterval = setInterval(() => {
                    focusTime += 100;
                    
                    if (focusTime > 3000) { // 3 segundos de focus
                        if (element.classList.contains('service-card')) {
                            this.userProfile.interests.push('services');
                        } else if (element.classList.contains('testimonial')) {
                            this.userProfile.interests.push('social_proof');
                        } else if (element.classList.contains('pricing')) {
                            this.userProfile.intent = 'price_comparison';
                        }
                    }
                }, 100);
            });
            
            element.addEventListener('mouseleave', () => {
                clearInterval(focusInterval);
                focusTime = 0;
            });
        });
    }

    analyzeDemographics() {
        // Analizar hora del día
        const hour = new Date().getHours();
        if (hour >= 9 && hour <= 17) {
            this.userProfile.demographics.timeSegment = 'business_hours';
        } else if (hour >= 18 && hour <= 22) {
            this.userProfile.demographics.timeSegment = 'evening';
        } else {
            this.userProfile.demographics.timeSegment = 'late_night';
        }
        
        // Analizar día de la semana
        const day = new Date().getDay();
        if (day >= 1 && day <= 5) {
            this.userProfile.demographics.dayType = 'weekday';
        } else {
            this.userProfile.demographics.dayType = 'weekend';
        }
        
        // Analizar dispositivo
        this.userProfile.demographics.device = this.isMobile() ? 'mobile' : 'desktop';
        
        // Analizar idioma del navegador
        this.userProfile.demographics.language = navigator.language || 'es';
    }

    determineFunnelStage() {
        let score = 0;
        
        // Factores que indican awareness
        if (this.userProfile.source === 'google' && this.userProfile.intent === 'unknown') score += 1;
        if (this.getTimeOnPage() < 30) score += 1;
        
        // Factores que indican consideration
        if (this.userProfile.behavior.engaged) score += 2;
        if (this.userProfile.interests.includes('social_proof')) score += 2;
        if (this.userProfile.intent === 'price_comparison') score += 2;
        
        // Factores que indican decision
        if (this.userProfile.intent === 'consultation_ready') score += 3;
        if (this.userProfile.intent === 'contact_ready') score += 3;
        if (this.userProfile.behavior.interactive) score += 2;
        
        if (score >= 5) {
            this.userProfile.stage = 'decision';
        } else if (score >= 2) {
            this.userProfile.stage = 'consideration';
        } else {
            this.userProfile.stage = 'awareness';
        }
    }

    setupContentVariations() {
        this.contentVariations = {
            headlines: {
                awareness: [
                    "Descubre Tu Destino con Tarot Profesional",
                    "Consulta de Tarot Online - Respuestas Claras",
                    "Tarot Experto - Guía Espiritual Personalizada"
                ],
                consideration: [
                    "Tarot Profesional con 15+ Años de Experiencia",
                    "Consultas de Tarot Precisas y Confiables",
                    "Vidente Experto - Miles de Consultas Exitosas"
                ],
                decision: [
                    "Consulta Ahora - Tarot Inmediato por WhatsApp",
                    "Habla Conmigo Ahora - Respuestas en Minutos",
                    "Consulta Urgente - Disponible 24/7"
                ]
            },
            descriptions: {
                love: "Especialista en temas del corazón. Descubre el futuro de tu relación y encuentra el amor verdadero.",
                career: "Orientación profesional y financiera. Toma las mejores decisiones para tu futuro laboral.",
                health: "Guía espiritual para tu bienestar. Encuentra equilibrio y sanación en tu vida.",
                future: "Revelaciones sobre tu destino. Conoce lo que el universo tiene preparado para ti.",
                general: "Consulta completa de tarot. Respuestas claras a todas tus preguntas importantes."
            },
            ctas: {
                price_sensitive: [
                    "Consulta Gratis por WhatsApp",
                    "Primera Pregunta Sin Costo",
                    "Prueba Gratis Ahora"
                ],
                quality_focused: [
                    "Consulta con Experto",
                    "Sesión Profesional",
                    "Consulta Premium"
                ],
                urgent: [
                    "Consulta Inmediata",
                    "Habla Ahora",
                    "Respuesta Urgente"
                ],
                consultation_ready: [
                    "Iniciar Consulta",
                    "Hablar con Vidente",
                    "Comenzar Sesión"
                ]
            },
            offers: {
                awareness: "Primera consulta con descuento especial",
                consideration: "Consulta completa + seguimiento gratuito",
                decision: "Oferta limitada - Consulta inmediata disponible"
            },
            testimonials: {
                love: "María, 32 años: 'Me ayudó a encontrar el amor de mi vida. Sus predicciones fueron exactas.'",
                career: "Carlos, 28 años: 'Gracias a su guía conseguí el trabajo de mis sueños.'",
                general: "Ana, 45 años: 'Un vidente increíble. Sus consejos cambiaron mi vida completamente.'"
            }
        };
    }

    startDynamicOptimizations() {
        console.log('🔄 Iniciando optimizaciones dinámicas...');
        
        // Optimización inicial basada en perfil
        setTimeout(() => {
            this.optimizeForUserProfile();
        }, 2000);
        
        // Optimizaciones continuas
        setInterval(() => {
            this.runContinuousOptimizations();
        }, 10000);
        
        // Optimizaciones basadas en eventos
        this.setupEventBasedOptimizations();
    }

    optimizeForUserProfile() {
        console.log('🎯 Optimizando para perfil:', this.userProfile);
        
        // Optimizar headline principal
        this.optimizeMainHeadline();
        
        // Optimizar CTAs
        this.optimizeCTAs();
        
        // Optimizar contenido
        this.optimizeContent();
        
        // Optimizar ofertas
        this.optimizeOffers();
        
        // Optimizar testimonios
        this.optimizeTestimonials();
        
        // Optimizar elementos visuales
        this.optimizeVisualElements();
    }

    optimizeMainHeadline() {
        const mainHeadline = document.querySelector('h1, .main-headline, .hero-title');
        if (!mainHeadline) return;
        
        const stage = this.userProfile.stage;
        const headlines = this.contentVariations.headlines[stage];
        
        if (headlines && headlines.length > 0) {
            const selectedHeadline = this.selectBestVariation(headlines, 'headline');
            
            // Animación suave para el cambio
            mainHeadline.style.transition = 'opacity 0.5s ease';
            mainHeadline.style.opacity = '0';
            
            setTimeout(() => {
                mainHeadline.textContent = selectedHeadline;
                mainHeadline.style.opacity = '1';
                
                this.trackOptimization('headline_change', {
                    original: mainHeadline.dataset.original || mainHeadline.textContent,
                    new: selectedHeadline,
                    stage: stage
                });
            }, 500);
        }
    }

    optimizeCTAs() {
        const ctaButtons = document.querySelectorAll('.mystic-button, .cta-button, .btn-primary');
        
        ctaButtons.forEach(button => {
            const intent = this.userProfile.intent;
            const ctas = this.contentVariations.ctas[intent];
            
            if (ctas && ctas.length > 0) {
                const selectedCTA = this.selectBestVariation(ctas, 'cta');
                
                // Guardar texto original
                if (!button.dataset.original) {
                    button.dataset.original = button.textContent;
                }
                
                // Cambio animado
                button.style.transition = 'all 0.3s ease';
                button.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    button.textContent = selectedCTA;
                    button.style.transform = 'scale(1)';
                    
                    // Añadir efecto de urgencia si es necesario
                    if (intent === 'urgent') {
                        button.style.animation = 'pulse 2s infinite';
                        button.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.6)';
                    }
                    
                    this.trackOptimization('cta_change', {
                        original: button.dataset.original,
                        new: selectedCTA,
                        intent: intent
                    });
                }, 300);
            }
        });
    }

    optimizeContent() {
        // Optimizar descripción principal
        const mainDescription = document.querySelector('.hero-description, .main-description, .intro-text');
        if (mainDescription) {
            const primaryInterest = this.userProfile.interests[0] || 'general';
            const description = this.contentVariations.descriptions[primaryInterest];
            
            if (description) {
                mainDescription.style.transition = 'opacity 0.5s ease';
                mainDescription.style.opacity = '0';
                
                setTimeout(() => {
                    mainDescription.textContent = description;
                    mainDescription.style.opacity = '1';
                    
                    this.trackOptimization('description_change', {
                        interest: primaryInterest,
                        new: description
                    });
                }, 500);
            }
        }
        
        // Optimizar keywords en el contenido
        this.optimizeKeywordDensity();
    }

    optimizeKeywordDensity() {
        const textElements = document.querySelectorAll('p, h2, h3, .service-description');
        const targetKeywords = this.getRelevantKeywords();
        
        textElements.forEach(element => {
            let text = element.textContent;
            let modified = false;
            
            // Añadir keywords relevantes de forma natural
            targetKeywords.forEach(keyword => {
                if (!text.toLowerCase().includes(keyword.toLowerCase()) && Math.random() < 0.3) {
                    // Insertar keyword de forma natural
                    const variations = this.getKeywordVariations(keyword);
                    const variation = variations[Math.floor(Math.random() * variations.length)];
                    
                    if (text.length > 50) {
                        const sentences = text.split('. ');
                        if (sentences.length > 1) {
                            sentences[0] += ` ${variation}`;
                            text = sentences.join('. ');
                            modified = true;
                        }
                    }
                }
            });
            
            if (modified) {
                element.textContent = text;
                this.trackOptimization('keyword_optimization', {
                    element: element.tagName,
                    keywords: targetKeywords
                });
            }
        });
    }

    getRelevantKeywords() {
        const baseKeywords = ['tarot online', 'consulta tarot', 'vidente experto'];
        const interestKeywords = {
            love: ['tarot amor', 'consulta sentimental'],
            career: ['tarot trabajo', 'orientación profesional'],
            health: ['tarot salud', 'bienestar espiritual'],
            future: ['predicciones futuro', 'destino personal']
        };
        
        let relevantKeywords = [...baseKeywords];
        
        this.userProfile.interests.forEach(interest => {
            if (interestKeywords[interest]) {
                relevantKeywords.push(...interestKeywords[interest]);
            }
        });
        
        return relevantKeywords;
    }

    getKeywordVariations(keyword) {
        const variations = {
            'tarot online': ['consulta de tarot por internet', 'lectura de cartas online', 'tarot digital'],
            'consulta tarot': ['sesión de tarot', 'lectura personalizada', 'consulta espiritual'],
            'vidente experto': ['tarotista profesional', 'medium experimentado', 'consejero espiritual']
        };
        
        return variations[keyword] || [keyword];
    }

    optimizeOffers() {
        const offerElements = document.querySelectorAll('.offer, .special-offer, .promotion');
        
        offerElements.forEach(element => {
            const stage = this.userProfile.stage;
            const offer = this.contentVariations.offers[stage];
            
            if (offer) {
                element.style.transition = 'all 0.5s ease';
                element.style.opacity = '0';
                element.style.transform = 'translateY(-10px)';
                
                setTimeout(() => {
                    element.textContent = offer;
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                    
                    // Añadir urgencia visual si es etapa de decisión
                    if (stage === 'decision') {
                        element.style.background = 'linear-gradient(45deg, #ff6b6b, #ffd700)';
                        element.style.color = 'white';
                        element.style.fontWeight = 'bold';
                    }
                    
                    this.trackOptimization('offer_change', {
                        stage: stage,
                        offer: offer
                    });
                }, 500);
            }
        });
    }

    optimizeTestimonials() {
        const testimonialElements = document.querySelectorAll('.testimonial, .review');
        
        // Crear un array con todos los testimonios disponibles
        const allTestimonials = [
            this.contentVariations.testimonials.love,
            this.contentVariations.testimonials.career,
            this.contentVariations.testimonials.general
        ];
        
        // Testimonios adicionales para mayor variedad
        const extraTestimonials = [
            "Laura, 29 años: 'Sus predicciones sobre mi futuro profesional se cumplieron exactamente.'",
            "Roberto, 35 años: 'Me ayudó a tomar la decisión correcta en un momento difícil.'",
            "Carmen, 42 años: 'Increíble precisión en sus lecturas. Totalmente recomendado.'",
            "Diego, 31 años: 'Gracias a sus consejos pude superar una crisis personal.'",
            "Patricia, 38 años: 'Sus cartas revelaron secretos que cambiaron mi perspectiva.'"
        ];
        
        // Combinar todos los testimonios
        const testimonialPool = [...allTestimonials, ...extraTestimonials];
        
        testimonialElements.forEach((element, index) => {
            // Seleccionar un testimonio diferente para cada elemento
            const testimonialIndex = index % testimonialPool.length;
            const selectedTestimonial = testimonialPool[testimonialIndex];
            
            if (selectedTestimonial) {
                element.style.transition = 'opacity 0.5s ease';
                element.style.opacity = '0';
                
                setTimeout(() => {
                    element.innerHTML = `<blockquote>"${selectedTestimonial}"</blockquote>`;
                    element.style.opacity = '1';
                    
                    this.trackOptimization('testimonial_change', {
                        index: index,
                        testimonial: selectedTestimonial
                    });
                }, 500 + (index * 200)); // Escalonar las animaciones
            }
        });
    }

    optimizeVisualElements() {
        // Optimizar colores basados en psicología del color
        this.optimizeColors();
        
        // Optimizar elementos de urgencia
        this.optimizeUrgencyElements();
        
        // Optimizar elementos de confianza
        this.optimizeTrustElements();
    }

    optimizeColors() {
        const stage = this.userProfile.stage;
        const intent = this.userProfile.intent;
        
        if (stage === 'decision' || intent === 'urgent') {
            // Colores de urgencia y acción
            document.documentElement.style.setProperty('--primary-color', '#ff6b6b');
            document.documentElement.style.setProperty('--accent-color', '#ffd700');
        } else if (intent === 'quality_focused') {
            // Colores de confianza y profesionalismo
            document.documentElement.style.setProperty('--primary-color', '#4a90e2');
            document.documentElement.style.setProperty('--accent-color', '#7b68ee');
        } else if (intent === 'price_sensitive') {
            // Colores de valor y accesibilidad
            document.documentElement.style.setProperty('--primary-color', '#28a745');
            document.documentElement.style.setProperty('--accent-color', '#17a2b8');
        }
    }

    optimizeUrgencyElements() {
        if (this.userProfile.stage === 'decision' || this.userProfile.intent === 'urgent') {
            // Añadir elementos de urgencia
            this.addUrgencyIndicators();
            this.addCountdownTimers();
            this.addLimitedTimeOffers();
        }
    }

    addUrgencyIndicators() {
        const ctaButtons = document.querySelectorAll('.mystic-button, .cta-button');
        
        ctaButtons.forEach(button => {
            if (!button.querySelector('.urgency-indicator')) {
                const indicator = document.createElement('span');
                indicator.className = 'urgency-indicator';
                indicator.innerHTML = '🔥 ';
                indicator.style.animation = 'pulse 1.5s infinite';
                button.prepend(indicator);
            }
        });
    }

    addCountdownTimers() {
        const offerElements = document.querySelectorAll('.offer, .special-offer');
        
        offerElements.forEach(element => {
            if (!element.querySelector('.countdown')) {
                const countdown = document.createElement('div');
                countdown.className = 'countdown';
                countdown.style.cssText = `
                    background: #ff6b6b;
                    color: white;
                    padding: 5px 10px;
                    border-radius: 5px;
                    font-weight: bold;
                    margin-top: 10px;
                    text-align: center;
                `;
                
                let timeLeft = 15 * 60; // 15 minutos
                
                const updateCountdown = () => {
                    const minutes = Math.floor(timeLeft / 60);
                    const seconds = timeLeft % 60;
                    countdown.textContent = `⏰ Oferta válida por: ${minutes}:${seconds.toString().padStart(2, '0')}`;
                    
                    if (timeLeft > 0) {
                        timeLeft--;
                    } else {
                        countdown.textContent = '⏰ ¡Oferta expirada!';
                        countdown.style.background = '#666';
                    }
                };
                
                updateCountdown();
                setInterval(updateCountdown, 1000);
                
                element.appendChild(countdown);
            }
        });
    }

    addLimitedTimeOffers() {
        if (!document.querySelector('.limited-offer-banner')) {
            const banner = document.createElement('div');
            banner.className = 'limited-offer-banner';
            banner.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                background: linear-gradient(45deg, #ff6b6b, #ffd700);
                color: white;
                text-align: center;
                padding: 10px;
                font-weight: bold;
                z-index: 1000;
                animation: slideDown 0.5s ease;
            `;
            banner.innerHTML = '🎯 OFERTA ESPECIAL: Primera consulta con 50% descuento - Solo hoy';
            
            document.body.prepend(banner);
            
            // Ajustar el padding del body
            document.body.style.paddingTop = '50px';
            
            // Auto-remove después de 30 segundos
            setTimeout(() => {
                banner.style.animation = 'slideUp 0.5s ease';
                setTimeout(() => {
                    banner.remove();
                    document.body.style.paddingTop = '0';
                }, 500);
            }, 30000);
        }
    }

    optimizeTrustElements() {
        if (this.userProfile.intent === 'quality_focused' || this.userProfile.stage === 'consideration') {
            this.addTrustBadges();
            this.addExpertiseIndicators();
            this.addSecurityElements();
        }
    }

    addTrustBadges() {
        // Verificar si ya existen trust-badges para evitar duplicación
        if (document.querySelector('.trust-badges') || window.trustBadgesCreated) {
            return;
        }
        
        // Marcar que los trust-badges han sido creados
        window.trustBadgesCreated = true;
        
        const trustContainer = this.createTrustContainer();
        
        const badges = [
            '✅ 15+ Años de Experiencia',
            '🏆 Miles de Consultas Exitosas',
            '🔒 100% Confidencial',
            '⭐ 4.9/5 Estrellas',
            '📞 Disponible 24/7'
        ];
        
        badges.forEach(badge => {
            const badgeElement = document.createElement('div');
            badgeElement.className = 'trust-badge';
            badgeElement.style.cssText = `
                display: inline-block;
                background: rgba(255, 255, 255, 0.1);
                padding: 5px 10px;
                margin: 5px;
                border-radius: 20px;
                font-size: 12px;
                border: 1px solid rgba(255, 255, 255, 0.3);
            `;
            badgeElement.textContent = badge;
            trustContainer.appendChild(badgeElement);
        });
    }

    createTrustContainer() {
        const container = document.createElement('div');
        container.className = 'trust-badges';
        container.style.cssText = `
            text-align: center;
            margin: 20px 0;
            padding: 15px;
        `;
        
        const mainContent = document.querySelector('main, .main-content, .hero');
        if (mainContent) {
            mainContent.appendChild(container);
        }
        
        return container;
    }

    addExpertiseIndicators() {
        // Verificar si ya existen para evitar duplicación
        if (document.querySelector('.expertise-indicators')) {
            return;
        }
        
        const experience = document.createElement('div');
        experience.className = 'expertise-indicators';
        experience.style.cssText = `
            display: flex;
            justify-content: center;
            gap: 20px;
            margin: 20px 0;
            padding: 15px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
            flex-wrap: wrap;
        `;
        
        const indicators = [
            { number: '15+', label: 'Años de Experiencia' },
            { number: '5000+', label: 'Casos Exitosos' },
            { number: '98%', label: 'Satisfacción' },
            { number: '24/7', label: 'Disponibilidad' }
        ];
        
        indicators.forEach(indicator => {
            const item = document.createElement('div');
            item.className = 'experience-item';
            item.style.cssText = `
                text-align: center;
                min-width: 80px;
            `;
            item.innerHTML = `
                <div style="font-size: 24px; font-weight: bold; color: #d4af37; margin-bottom: 5px;">${indicator.number}</div>
                <div style="font-size: 12px; color: rgba(255, 255, 255, 0.8);">${indicator.label}</div>
            `;
            experience.appendChild(item);
        });
        
        const mainContent = document.querySelector('main, .main-content, .hero');
        if (mainContent) {
            mainContent.appendChild(experience);
        }
    }

    addSecurityElements() {
        // Verificar si ya existen para evitar duplicación
        if (document.querySelector('.security-elements')) {
            return;
        }
        
        const security = document.createElement('div');
        security.className = 'security-elements';
        security.style.cssText = `
            text-align: center;
            margin: 20px 0;
            padding: 15px;
            background: rgba(0, 255, 0, 0.1);
            border: 1px solid rgba(0, 255, 0, 0.3);
            border-radius: 10px;
        `;
        
        security.innerHTML = `
            <div style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
                <div style="display: flex; align-items: center; gap: 5px;">
                    <span style="color: #00ff00;">🔒</span>
                    <span style="font-size: 12px;">SSL Seguro</span>
                </div>
                <div style="display: flex; align-items: center; gap: 5px;">
                    <span style="color: #00ff00;">✅</span>
                    <span style="font-size: 12px;">Verificado</span>
                </div>
                <div style="display: flex; align-items: center; gap: 5px;">
                    <span style="color: #00ff00;">🛡️</span>
                    <span style="font-size: 12px;">Protegido</span>
                </div>
                <div style="display: flex; align-items: center; gap: 5px;">
                    <span style="color: #00ff00;">🔐</span>
                    <span style="font-size: 12px;">Confidencial</span>
                </div>
            </div>
        `;
        
        const mainContent = document.querySelector('main, .main-content, .hero');
        if (mainContent) {
            mainContent.appendChild(security);
        }
    }

    runContinuousOptimizations() {
        // Re-analizar usuario
        this.analyzeUser();
        
        // Aplicar optimizaciones basadas en nuevos datos
        if (this.hasUserProfileChanged()) {
            this.optimizeForUserProfile();
        }
        
        // Optimizaciones específicas basadas en tiempo
        this.runTimeBasedOptimizations();
        
        // Optimizaciones basadas en rendimiento
        this.runPerformanceBasedOptimizations();
    }

    hasUserProfileChanged() {
        const currentProfile = JSON.stringify(this.userProfile);
        const lastProfile = localStorage.getItem('last_user_profile');
        
        if (currentProfile !== lastProfile) {
            localStorage.setItem('last_user_profile', currentProfile);
            return true;
        }
        
        return false;
    }

    runTimeBasedOptimizations() {
        const timeOnPage = this.getTimeOnPage();
        
        // Optimizaciones basadas en tiempo en página
        if (timeOnPage > 120 && !this.optimizations.active.has('exit_intent')) {
            this.setupExitIntentOptimization();
        }
        
        if (timeOnPage > 180 && !this.optimizations.active.has('special_offer')) {
            this.showSpecialOffer();
        }
        
        if (timeOnPage > 300 && !this.optimizations.active.has('personal_attention')) {
            this.offerPersonalAttention();
        }
    }

    setupExitIntentOptimization() {
        document.addEventListener('mouseleave', (e) => {
            if (e.clientY <= 0) {
                this.showExitIntentModal();
            }
        });
        
        this.optimizations.active.add('exit_intent');
    }

    showExitIntentModal() {
        if (document.querySelector('.exit-intent-modal')) return;
        
        const modal = document.createElement('div');
        modal.className = 'exit-intent-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;
        
        modal.innerHTML = `
            <div style="
                background: white;
                padding: 30px;
                border-radius: 15px;
                text-align: center;
                max-width: 400px;
                margin: 20px;
                position: relative;
            ">
                <button onclick="this.closest('.exit-intent-modal').remove()" style="
                    position: absolute;
                    top: 10px;
                    right: 15px;
                    background: none;
                    border: none;
                    font-size: 20px;
                    cursor: pointer;
                ">×</button>
                
                <h3 style="color: #722f37; margin-bottom: 15px;">¡Espera! No te vayas sin tu consulta</h3>
                <p style="margin-bottom: 20px;">Tienes una pregunta importante que necesita respuesta. Te ofrezco una consulta especial con descuento.</p>
                
                <div style="background: #722f37; color: white; padding: 15px; border-radius: 10px; margin-bottom: 20px;">
                    <strong>🎁 OFERTA ESPECIAL: 50% de descuento en tu primera consulta</strong>
                </div>
                
                <button onclick="window.open('https://wa.me/+12545956299?text=ayuda%20con%20el%20maestro%20en%20consulta%20gratis', '_blank'); this.closest('.exit-intent-modal').remove();" style="
                    background: #25d366;
                    color: white;
                    border: none;
                    padding: 15px 30px;
                    border-radius: 25px;
                    font-size: 16px;
                    font-weight: bold;
                    cursor: pointer;
                    margin-right: 10px;
                ">💬 Consultar por WhatsApp</button>
                
                <button onclick="this.closest('.exit-intent-modal').remove()" style="
                    background: #666;
                    color: white;
                    border: none;
                    padding: 15px 20px;
                    border-radius: 25px;
                    cursor: pointer;
                ">Tal vez después</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        this.trackOptimization('exit_intent_modal', {
            timeOnPage: this.getTimeOnPage(),
            userProfile: this.userProfile
        });
    }

    showSpecialOffer() {
        if (document.querySelector('.special-offer-popup')) return;
        
        const popup = document.createElement('div');
        popup.className = 'special-offer-popup';
        popup.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(45deg, #722f37, #d4af37);
            color: white;
            padding: 20px;
            border-radius: 15px;
            max-width: 300px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 1000;
            animation: slideInRight 0.5s ease;
        `;
        
        popup.innerHTML = `
            <button onclick="this.parentElement.remove()" style="
                position: absolute;
                top: 5px;
                right: 10px;
                background: none;
                border: none;
                color: white;
                font-size: 18px;
                cursor: pointer;
            ">×</button>
            
            <h4 style="margin: 0 0 10px 0;">🎯 Oferta Especial para Ti</h4>
            <p style="margin: 0 0 15px 0; font-size: 14px;">Has demostrado interés genuino. Te ofrezco una consulta personalizada con precio especial.</p>
            
            <button onclick="window.open('https://wa.me/+12545956299?text=ayuda%20con%20el%20maestro%20en%20consulta%20gratis', '_blank')" style="
                background: #25d366;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 20px;
                cursor: pointer;
                width: 100%;
                font-weight: bold;
            ">💬 Consultar Ahora</button>
        `;
        
        document.body.appendChild(popup);
        
        // Auto-remove después de 30 segundos
        setTimeout(() => {
            if (popup.parentElement) {
                popup.style.animation = 'slideOutRight 0.5s ease';
                setTimeout(() => popup.remove(), 500);
            }
        }, 30000);
        
        this.optimizations.active.add('special_offer');
    }

    offerPersonalAttention() {
        if (document.querySelector('.personal-attention-offer')) return;
        
        const offer = document.createElement('div');
        offer.className = 'personal-attention-offer';
        offer.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(114, 47, 55, 0.95);
            color: white;
            padding: 25px;
            border-radius: 15px;
            text-align: center;
            max-width: 350px;
            z-index: 10000;
            box-shadow: 0 15px 40px rgba(0,0,0,0.5);
            animation: zoomIn 0.5s ease;
        `;
        
        offer.innerHTML = `
            <h3 style="margin: 0 0 15px 0; color: #d4af37;">👋 Atención Personalizada</h3>
            <p style="margin: 0 0 20px 0;">Veo que has estado explorando mi sitio. ¿Te gustaría que conversemos directamente sobre tu situación?</p>
            
            <div style="margin-bottom: 20px;">
                <strong>🎁 Te ofrezco:</strong><br>
                • Consulta personalizada inmediata<br>
                • Análisis detallado de tu situación<br>
                • Respuestas específicas a tus preguntas
            </div>
            
            <button onclick="window.open('https://wa.me/+12545956299?text=ayuda%20con%20el%20maestro%20en%20consulta%20gratis', '_blank'); this.remove();" style="
                background: #25d366;
                color: white;
                border: none;
                padding: 12px 25px;
                border-radius: 25px;
                font-weight: bold;
                cursor: pointer;
                margin-right: 10px;
                font-size: 14px;
            ">💬 Sí, hablemos</button>
            
            <button onclick="this.remove()" style="
                background: transparent;
                color: white;
                border: 1px solid white;
                padding: 12px 20px;
                border-radius: 25px;
                cursor: pointer;
                font-size: 14px;
            ">Continuar navegando</button>
        `;
        
        document.body.appendChild(offer);
        
        this.optimizations.active.add('personal_attention');
        
        this.trackOptimization('personal_attention_offer', {
            timeOnPage: this.getTimeOnPage(),
            userProfile: this.userProfile
        });
    }

    setupEventBasedOptimizations() {
        // Optimización cuando el usuario intenta salir
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && this.getTimeOnPage() > 60) {
                this.triggerRetentionOptimization();
            }
        });
        
        // Optimización basada en scroll
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            
            if (scrollPercent > 80 && !this.optimizations.active.has('bottom_cta')) {
                this.addBottomCTA();
            }
        });
        
        // Optimización basada en inactividad
        this.setupInactivityOptimization();
    }

    triggerRetentionOptimization() {
        // Guardar estado para cuando el usuario regrese
        localStorage.setItem('user_return_optimization', JSON.stringify({
            profile: this.userProfile,
            timeOnPage: this.getTimeOnPage(),
            timestamp: Date.now()
        }));
    }

    addBottomCTA() {
        if (document.querySelector('.bottom-cta')) return;
        
        const bottomCTA = document.createElement('div');
        bottomCTA.className = 'bottom-cta';
        bottomCTA.style.cssText = `
             bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(45deg, #722f37, #d4af37);
            color: white;
            padding: 15px;
            text-align: center;
            z-index: 1000;
            animation: slideUp 0.5s ease;
        `;
        
        const intent = this.userProfile.intent;
        const ctas = this.contentVariations.ctas[intent] || this.contentVariations.ctas.consultation_ready;
        const selectedCTA = ctas[0];
        
        bottomCTA.innerHTML = `
            <div style="max-width: 600px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between;">
                <div>
                    <strong>¿Listo para tu consulta?</strong><br>
                    <small>Has visto todo lo que necesitas saber</small>
                </div>
                <button onclick="window.open('https://wa.me/+12545956299?text=ayuda%20con%20el%20maestro%20en%20consulta%20gratis', '_blank')" style="
                    background: #25d366;
                    color: white;
                    border: none;
                    padding: 12px 25px;
                    border-radius: 25px;
                    font-weight: bold;
                    cursor: pointer;
                ">${selectedCTA}</button>
                <button onclick="this.closest('.bottom-cta').remove()" style="
                    background: none;
                    color: white;
                    border: none;
                    font-size: 20px;
                    cursor: pointer;
                ">×</button>
            </div>
        `;
        
        document.body.appendChild(bottomCTA);
        this.optimizations.active.add('bottom_cta');
    }

    setupInactivityOptimization() {
        let inactivityTimer;
        
        const resetTimer = () => {
            clearTimeout(inactivityTimer);
            inactivityTimer = setTimeout(() => {
                this.triggerInactivityOptimization();
            }, 60000); // 1 minuto de inactividad
        };
        
        ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
            document.addEventListener(event, resetTimer, true);
        });
        
        resetTimer();
    }

    triggerInactivityOptimization() {
        if (this.optimizations.active.has('inactivity_prompt')) return;
        
        const prompt = document.createElement('div');
        prompt.className = 'inactivity-prompt';
        prompt.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #722f37;
            color: white;
            padding: 15px;
            border-radius: 10px;
            max-width: 250px;
            z-index: 1000;
            animation: bounceIn 0.5s ease;
        `;
        
        prompt.innerHTML = `
            <p style="margin: 0 0 10px 0; font-size: 14px;">¿Tienes alguna pregunta específica? Estoy aquí para ayudarte.</p>
            <button onclick="window.open('https://wa.me/+12545956299?text=ayuda%20con%20el%20maestro%20en%20consulta%20gratis', '_blank'); this.parentElement.remove();" style="
                background: #25d366;
                color: white;
                border: none;
                padding: 8px 15px;
                border-radius: 15px;
                cursor: pointer;
                font-size: 12px;
                margin-right: 5px;
            ">Preguntar</button>
            <button onclick="this.parentElement.remove()" style="
                background: #666;
                color: white;
                border: none;
                padding: 8px 12px;
                border-radius: 15px;
                cursor: pointer;
                font-size: 12px;
            ">Cerrar</button>
        `;
        
        document.body.appendChild(prompt);
        
        setTimeout(() => {
            if (prompt.parentElement) {
                prompt.remove();
            }
        }, 15000);
        
        this.optimizations.active.add('inactivity_prompt');
    }

    setupPerformanceTracking() {
        // Tracking de conversiones por optimización
        this.conversionTracking = {
            headline_change: 0,
            cta_change: 0,
            offer_change: 0,
            exit_intent_modal: 0,
            special_offer: 0,
            personal_attention: 0
        };
        
        // Tracking de clics en elementos optimizados
        document.addEventListener('click', (e) => {
            this.trackOptimizedElementClick(e.target);
        });
        
        // Reportar performance cada 30 segundos
        setInterval(() => {
            this.reportOptimizationPerformance();
        }, 30000);
    }

    trackOptimizedElementClick(element) {
        // Identificar si el elemento fue optimizado
        const optimizedElements = document.querySelectorAll('[data-optimized]');
        
        optimizedElements.forEach(optimizedElement => {
            if (optimizedElement.contains(element) || optimizedElement === element) {
                const optimizationType = optimizedElement.dataset.optimized;
                this.conversionTracking[optimizationType]++;
                
                this.trackOptimization('optimized_element_click', {
                    type: optimizationType,
                    element: element.tagName,
                    text: element.textContent.substring(0, 50)
                });
            }
        });
    }

    setupAutomaticABTesting() {
        this.abTests = {
            active: new Map(),
            results: new Map()
        };
        
        // A/B test para headlines
        this.startABTest('headline', ['original', 'optimized'], 0.5);
        
        // A/B test para CTAs
        this.startABTest('cta', ['original', 'optimized'], 0.5);
        
        // A/B test para ofertas
        this.startABTest('offer', ['original', 'optimized'], 0.5);
    }

    startABTest(testName, variants, splitRatio) {
        const userVariant = Math.random() < splitRatio ? variants[0] : variants[1];
        
        this.abTests.active.set(testName, {
            variant: userVariant,
            startTime: Date.now(),
            interactions: 0,
            conversions: 0
        });
        
        // Aplicar variante
        if (userVariant === 'optimized') {
            this.applyOptimizedVariant(testName);
        }
        
        console.log(`🧪 A/B Test iniciado: ${testName} - Variante: ${userVariant}`);
    }

    applyOptimizedVariant(testName) {
        switch (testName) {
            case 'headline':
                this.optimizeMainHeadline();
                break;
            case 'cta':
                this.optimizeCTAs();
                break;
            case 'offer':
                this.optimizeOffers();
                break;
        }
    }

    setupKeywordOptimization() {
        // Optimización dinámica de keywords basada en rendimiento
        this.keywordPerformance = new Map();
        
        // Monitorear keywords en tiempo real
        this.monitorKeywordPerformance();
        
        // Optimizar keywords cada 60 segundos
        setInterval(() => {
            this.optimizeKeywords();
        }, 60000);
    }

    monitorKeywordPerformance() {
        // Simular datos de rendimiento de keywords
        this.keywords.forEach(keyword => {
            this.keywordPerformance.set(keyword, {
                impressions: Math.floor(Math.random() * 1000),
                clicks: Math.floor(Math.random() * 100),
                conversions: Math.floor(Math.random() * 10),
                ctr: 0,
                conversionRate: 0
            });
        });
        
        // Calcular métricas
        this.keywordPerformance.forEach((data, keyword) => {
            data.ctr = data.impressions > 0 ? (data.clicks / data.impressions) * 100 : 0;
            data.conversionRate = data.clicks > 0 ? (data.conversions / data.clicks) * 100 : 0;
        });
    }

    optimizeKeywords() {
        // Identificar keywords de mejor rendimiento
        const topKeywords = Array.from(this.keywordPerformance.entries())
            .sort((a, b) => (b[1].conversionRate + b[1].ctr) - (a[1].conversionRate + a[1].ctr))
            .slice(0, 5)
            .map(entry => entry[0]);
        
        // Optimizar contenido con top keywords
        this.emphasizeTopKeywords(topKeywords);
        
        console.log('🔍 Keywords optimizadas:', topKeywords);
    }

    emphasizeTopKeywords(keywords) {
        const textElements = document.querySelectorAll('h1, h2, h3, .hero-description');
        
        textElements.forEach(element => {
            let text = element.textContent;
            let modified = false;
            
            keywords.forEach(keyword => {
                if (text.toLowerCase().includes(keyword.toLowerCase())) {
                    // Enfatizar keyword existente
                    const regex = new RegExp(`(${keyword})`, 'gi');
                    text = text.replace(regex, `<strong>$1</strong>`);
                    modified = true;
                }
            });
            
            if (modified) {
                element.innerHTML = text;
            }
        });
    }

    // Utilidades
    selectBestVariation(variations, type) {
        // Seleccionar basado en performance histórica o aleatoriamente
        const performance = this.optimizations.performance[type];
        
        if (performance) {
            // Seleccionar la variación con mejor performance
            return variations.reduce((best, current) => {
                const bestPerf = performance[best] || 0;
                const currentPerf = performance[current] || 0;
                return currentPerf > bestPerf ? current : best;
            });
        }
        
        // Selección aleatoria si no hay datos de performance
        return variations[Math.floor(Math.random() * variations.length)];
    }

    trackOptimization(type, data) {
        const optimization = {
            type,
            data,
            timestamp: Date.now(),
            userProfile: { ...this.userProfile }
        };
        
        this.optimizations.history.push(optimization);
        
        // Reportar a Google Analytics si está disponible
        if (typeof gtag !== 'undefined') {
            gtag('event', 'dynamic_optimization', {
                event_category: 'ads_optimization',
                event_label: type,
                value: 1,
                custom_parameter_1: JSON.stringify(data)
            });
        }
        
        console.log('📊 Optimización tracked:', optimization);
    }

    reportOptimizationPerformance() {
        const report = {
            activeOptimizations: Array.from(this.optimizations.active),
            userProfile: this.userProfile,
            conversionTracking: this.conversionTracking,
            abTests: Object.fromEntries(this.abTests.active),
            keywordPerformance: Object.fromEntries(this.keywordPerformance),
            timestamp: Date.now()
        };
        
        // Guardar en localStorage
        localStorage.setItem('optimization_performance', JSON.stringify(report));
        
        // Reportar a Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'optimization_performance_report', {
                event_category: 'ads_optimization',
                event_label: 'periodic_report',
                value: this.optimizations.active.size,
                custom_parameter_1: JSON.stringify(report)
            });
        }
        
        console.log('📈 Performance report:', report);
    }

    getTimeOnPage() {
        return Math.round((Date.now() - this.startTime) / 1000);
    }

    isMobile() {
        return window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    triggerFrustrationOptimization() {
        if (this.optimizations.active.has('frustration_help')) return;
        
        const helpOffer = document.createElement('div');
        helpOffer.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: #ff6b6b;
            color: white;
            padding: 15px;
            border-radius: 10px;
            max-width: 250px;
            z-index: 1000;
            animation: shake 0.5s ease;
        `;
        
        helpOffer.innerHTML = `
            <p style="margin: 0 0 10px 0; font-size: 14px;">¿Necesitas ayuda para encontrar lo que buscas?</p>
            <button onclick="window.open('https://wa.me/+12545956299?text=ayuda%20con%20el%20maestro%20en%20consulta%20gratis', '_blank'); this.parentElement.remove();" style="
                background: white;
                color: #ff6b6b;
                border: none;
                padding: 8px 15px;
                border-radius: 15px;
                cursor: pointer;
                font-weight: bold;
                font-size: 12px;
            ">Sí, ayúdame</button>
        `;
        
        document.body.appendChild(helpOffer);
        
        setTimeout(() => {
            if (helpOffer.parentElement) {
                helpOffer.remove();
            }
        }, 10000);
        
        this.optimizations.active.add('frustration_help');
    }

    // API pública
    getUserProfile() {
        return { ...this.userProfile };
    }

    getActiveOptimizations() {
        return Array.from(this.optimizations.active);
    }

    getOptimizationHistory() {
        return [...this.optimizations.history];
    }

    forceOptimization(type) {
        switch (type) {
            case 'urgency':
                this.optimizeUrgencyElements();
                break;
            case 'trust':
                this.optimizeTrustElements();
                break;
            case 'exit_intent':
                this.showExitIntentModal();
                break;
            case 'special_offer':
                this.showSpecialOffer();
                break;
            default:
                console.warn('Tipo de optimización no reconocido:', type);
        }
    }
}

// Inicializar el optimizador
console.log('🎯 Iniciando Dynamic Ads Optimizer...');
window.DynamicAdsOptimizer = new DynamicAdsOptimizer();

// Exponer API global
window.getUserProfile = () => window.DynamicAdsOptimizer.getUserProfile();
window.getActiveOptimizations = () => window.DynamicAdsOptimizer.getActiveOptimizations();
window.forceOptimization = (type) => window.DynamicAdsOptimizer.forceOptimization(type);