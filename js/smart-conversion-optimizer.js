/**
 * Smart Conversion Optimizer para Google Ads
 * Optimiza conversiones usando machine learning básico y análisis de comportamiento
 * Mejora el Quality Score a través de mejor relevancia y experiencia del usuario
 */

class SmartConversionOptimizer {
    constructor() {
        this.userBehavior = {
            scrollDepth: 0,
            timeOnPage: 0,
            interactions: 0,
            heatmapData: [],
            intentSignals: [],
            conversionProbability: 0
        };
        
        this.conversionGoals = {
            primary: ['phone_click', 'whatsapp_click', 'form_submit'],
            secondary: ['scroll_75', 'time_on_page_60s', 'multiple_interactions'],
            micro: ['button_hover', 'section_view', 'content_engagement']
        };
        
        this.optimizationStrategies = {
            urgency: false,
            social_proof: false,
            personalization: false,
            exit_intent: false,
            progressive_disclosure: false
        };
        
        this.init();
    }

    init() {
        console.log('🎯 Smart Conversion Optimizer iniciado');
        
        // Análisis de comportamiento
        this.startBehaviorTracking();
        this.setupHeatmapTracking();
        this.detectUserIntent();
        
        // Optimizaciones dinámicas
        this.implementDynamicOptimizations();
        this.setupA_BTestingFramework();
        this.enableSmartRecommendations();
        
        // Machine learning básico
        this.initializePredictiveModel();
        this.setupRealTimeOptimization();
    }

    // Análisis de comportamiento del usuario
    startBehaviorTracking() {
        // Tracking de scroll depth
        this.trackScrollDepth();
        
        // Tracking de tiempo en página
        this.trackTimeOnPage();
        
        // Tracking de interacciones
        this.trackInteractions();
        
        // Tracking de patrones de mouse
        this.trackMousePatterns();
    }

    trackScrollDepth() {
        let maxScroll = 0;
        
        const updateScrollDepth = () => {
            const scrollPercent = Math.round(
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            );
            
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                this.userBehavior.scrollDepth = maxScroll;
                
                // Trigger optimizations based on scroll depth
                this.triggerScrollBasedOptimizations(maxScroll);
                
                // Report scroll milestones
                if (maxScroll >= 25 && maxScroll < 50) {
                    this.reportConversion('scroll_25', 'micro');
                } else if (maxScroll >= 50 && maxScroll < 75) {
                    this.reportConversion('scroll_50', 'micro');
                } else if (maxScroll >= 75) {
                    this.reportConversion('scroll_75', 'secondary');
                }
            }
        };
        
        window.addEventListener('scroll', this.throttle(updateScrollDepth, 100));
    }

    trackTimeOnPage() {
        const startTime = Date.now();
        
        const updateTimeOnPage = () => {
            this.userBehavior.timeOnPage = Date.now() - startTime;
            
            // Trigger time-based optimizations
            const timeInSeconds = this.userBehavior.timeOnPage / 1000;
            
            if (timeInSeconds >= 30 && !this.optimizationStrategies.urgency) {
                this.enableUrgencyOptimization();
            }
            
            if (timeInSeconds >= 60) {
                this.reportConversion('time_on_page_60s', 'secondary');
            }
            
            if (timeInSeconds >= 120 && !this.optimizationStrategies.exit_intent) {
                this.enableExitIntentOptimization();
            }
        };
        
        setInterval(updateTimeOnPage, 5000);
        
        // Track page visibility
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.handlePageHidden();
            } else {
                this.handlePageVisible();
            }
        });
    }

    trackInteractions() {
        const interactionEvents = ['click', 'touchstart', 'keydown', 'mouseover'];
        
        interactionEvents.forEach(event => {
            document.addEventListener(event, (e) => {
                this.userBehavior.interactions++;
                
                // Analyze interaction quality
                this.analyzeInteractionQuality(e);
                
                // Trigger interaction-based optimizations
                if (this.userBehavior.interactions >= 5 && !this.optimizationStrategies.personalization) {
                    this.enablePersonalization();
                }
                
                if (this.userBehavior.interactions >= 3) {
                    this.reportConversion('multiple_interactions', 'secondary');
                }
            });
        });
    }

    trackMousePatterns() {
        let mouseData = [];
        let lastMouseTime = 0;
        
        document.addEventListener('mousemove', (e) => {
            const now = Date.now();
            if (now - lastMouseTime > 100) { // Throttle to every 100ms
                mouseData.push({
                    x: e.clientX,
                    y: e.clientY,
                    timestamp: now
                });
                
                // Keep only last 50 points
                if (mouseData.length > 50) {
                    mouseData.shift();
                }
                
                // Analyze mouse patterns
                this.analyzeMousePatterns(mouseData);
                lastMouseTime = now;
            }
        });
    }

    analyzeMousePatterns(mouseData) {
        if (mouseData.length < 10) return;
        
        // Calculate mouse speed and direction changes
        let totalDistance = 0;
        let directionChanges = 0;
        
        for (let i = 1; i < mouseData.length; i++) {
            const prev = mouseData[i - 1];
            const curr = mouseData[i];
            
            const distance = Math.sqrt(
                Math.pow(curr.x - prev.x, 2) + Math.pow(curr.y - prev.y, 2)
            );
            totalDistance += distance;
            
            if (i > 1) {
                const prevPrev = mouseData[i - 2];
                const angle1 = Math.atan2(prev.y - prevPrev.y, prev.x - prevPrev.x);
                const angle2 = Math.atan2(curr.y - prev.y, curr.x - prev.x);
                const angleDiff = Math.abs(angle1 - angle2);
                
                if (angleDiff > Math.PI / 4) { // 45 degrees
                    directionChanges++;
                }
            }
        }
        
        const avgSpeed = totalDistance / mouseData.length;
        const changeRate = directionChanges / mouseData.length;
        
        // Detect user intent based on mouse patterns
        if (avgSpeed < 5 && changeRate > 0.3) {
            this.userBehavior.intentSignals.push('hesitation');
        } else if (avgSpeed > 20 && changeRate < 0.1) {
            this.userBehavior.intentSignals.push('focused');
        }
    }

    analyzeInteractionQuality(event) {
        const target = event.target;
        const interactionType = event.type;
        
        // Score interaction based on element importance
        let qualityScore = 1;
        
        if (target.matches('.mystic-button, .cta-button, .conversion-button')) {
            qualityScore = 5;
        } else if (target.matches('a[href^="tel:"], a[href^="https://wa.me"]')) {
            qualityScore = 4;
        } else if (target.matches('input, textarea, select')) {
            qualityScore = 3;
        } else if (target.matches('h1, h2, h3, .important-text')) {
            qualityScore = 2;
        }
        
        // Add to heatmap data
        this.userBehavior.heatmapData.push({
            x: event.clientX || 0,
            y: event.clientY || 0,
            type: interactionType,
            element: target.tagName,
            quality: qualityScore,
            timestamp: Date.now()
        });
        
        // Update conversion probability
        this.updateConversionProbability();
    }

    // Heatmap tracking
    setupHeatmapTracking() {
        // Track clicks for heatmap
        document.addEventListener('click', (e) => {
            this.recordHeatmapPoint(e, 'click', 3);
        });
        
        // Track hovers on important elements
        document.querySelectorAll('.mystic-button, .cta-button, a[href^="tel:"], a[href^="https://wa.me"]').forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.recordHeatmapPoint(e, 'hover', 2);
                this.reportConversion('button_hover', 'micro');
            });
        });
        
        // Track section views
        this.setupSectionViewTracking();
    }

    recordHeatmapPoint(event, type, intensity) {
        this.userBehavior.heatmapData.push({
            x: event.clientX,
            y: event.clientY,
            type: type,
            intensity: intensity,
            timestamp: Date.now()
        });
        
        // Limit heatmap data size
        if (this.userBehavior.heatmapData.length > 200) {
            this.userBehavior.heatmapData.shift();
        }
    }

    setupSectionViewTracking() {
        const sections = document.querySelectorAll('section, .section, .hero-section');
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionName = entry.target.id || entry.target.className || 'unnamed-section';
                    this.reportConversion('section_view', 'micro', { section: sectionName });
                    
                    // Trigger section-specific optimizations
                    this.triggerSectionOptimizations(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        sections.forEach(section => sectionObserver.observe(section));
    }

    // Detección de intención del usuario
    detectUserIntent() {
        // Detect exit intent
        this.setupExitIntentDetection();
        
        // Detect purchase intent
        this.detectPurchaseIntent();
        
        // Detect information seeking
        this.detectInformationSeeking();
        
        // Detect comparison behavior
        this.detectComparisonBehavior();
    }

    setupExitIntentDetection() {
        let exitIntentTriggered = false;
        
        document.addEventListener('mouseleave', (e) => {
            if (e.clientY <= 0 && !exitIntentTriggered) {
                exitIntentTriggered = true;
                this.userBehavior.intentSignals.push('exit_intent');
                this.triggerExitIntentOptimization();
            }
        });
        
        // Mobile exit intent (scroll to top quickly)
        let lastScrollY = window.scrollY;
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (window.scrollY < lastScrollY - 100 && window.scrollY < 200 && !exitIntentTriggered) {
                        exitIntentTriggered = true;
                        this.userBehavior.intentSignals.push('mobile_exit_intent');
                        this.triggerExitIntentOptimization();
                    }
                    lastScrollY = window.scrollY;
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    detectPurchaseIntent() {
        const purchaseSignals = [
            () => this.userBehavior.scrollDepth > 50,
            () => this.userBehavior.timeOnPage > 30000,
            () => this.userBehavior.interactions > 3,
            () => this.userBehavior.intentSignals.includes('focused')
        ];
        
        const activePurchaseSignals = purchaseSignals.filter(signal => signal()).length;
        
        if (activePurchaseSignals >= 2) {
            this.userBehavior.intentSignals.push('purchase_intent');
            this.enablePurchaseIntentOptimizations();
        }
    }

    detectInformationSeeking() {
        const infoSignals = [
            () => this.userBehavior.scrollDepth > 75,
            () => this.userBehavior.timeOnPage > 60000,
            () => this.userBehavior.intentSignals.includes('hesitation')
        ];
        
        const activeInfoSignals = infoSignals.filter(signal => signal()).length;
        
        if (activeInfoSignals >= 2) {
            this.userBehavior.intentSignals.push('information_seeking');
            this.enableInformationOptimizations();
        }
    }

    detectComparisonBehavior() {
        // Detect if user is comparing (multiple tabs, back/forward navigation)
        let tabSwitches = 0;
        
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                tabSwitches++;
                if (tabSwitches >= 3) {
                    this.userBehavior.intentSignals.push('comparison_behavior');
                    this.enableComparisonOptimizations();
                }
            }
        });
    }

    // Optimizaciones dinámicas
    implementDynamicOptimizations() {
        // Dynamic CTA optimization
        this.optimizeCTAButtons();
        
        // Dynamic content personalization
        this.personalizeContent();
        
        // Dynamic pricing/offer optimization
        this.optimizeOffers();
        
        // Dynamic form optimization
        this.optimizeForms();
    }

    optimizeCTAButtons() {
        const ctaButtons = document.querySelectorAll('.mystic-button, .cta-button');
        
        ctaButtons.forEach(button => {
            // A/B test different CTA texts
            const ctaVariations = [
                'Consulta Ahora Gratis',
                'Habla con un Experto',
                'Resuelve tus Dudas Ya',
                'Consulta Inmediata',
                'Obtén tu Respuesta'
            ];
            
            // Use hash of user behavior to consistently show same variation
            const userHash = this.getUserBehaviorHash();
            const variationIndex = userHash % ctaVariations.length;
            
            if (button.textContent.trim()) {
                button.textContent = ctaVariations[variationIndex];
            }
            
            // Add urgency based on user behavior
            if (this.userBehavior.intentSignals.includes('exit_intent')) {
                button.style.animation = 'pulse 1s infinite';
                button.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.6)';
            }
        });
    }

    personalizeContent() {
        if (!this.optimizationStrategies.personalization) return;
        
        // Personalize based on user intent
        const intentSignals = this.userBehavior.intentSignals;
        
        if (intentSignals.includes('information_seeking')) {
            this.showMoreInformation();
        }
        
        if (intentSignals.includes('purchase_intent')) {
            this.emphasizeCallToAction();
        }
        
        if (intentSignals.includes('comparison_behavior')) {
            this.showCompetitiveAdvantages();
        }
    }

    showMoreInformation() {
        // Expand FAQ sections
        const faqSections = document.querySelectorAll('.faq-item, .info-section');
        faqSections.forEach(section => {
            section.style.display = 'block';
            section.style.opacity = '1';
        });
        
        // Add detailed information tooltips
        this.addInformationTooltips();
    }

    emphasizeCallToAction() {
        const ctaElements = document.querySelectorAll('.mystic-button, .cta-button');
        ctaElements.forEach(cta => {
            cta.style.transform = 'scale(1.05)';
            cta.style.boxShadow = '0 5px 15px rgba(114, 47, 55, 0.4)';
            cta.style.animation = 'glow 2s ease-in-out infinite alternate';
        });
    }

    showCompetitiveAdvantages() {
        // Highlight unique selling points
        const advantages = [
            '✨ Consultas 24/7 disponibles',
            '🎯 Expertos con +10 años experiencia',
            '💫 Primera consulta gratuita',
            '🔮 Resultados garantizados'
        ];
        
        const advantageContainer = document.createElement('div');
        advantageContainer.className = 'competitive-advantages';
        advantageContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #722f37, #8b3a42);
            color: white;
            padding: 15px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 1000;
            max-width: 250px;
            font-size: 14px;
            line-height: 1.4;
        `;
        
        advantageContainer.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 10px;">¿Por qué elegirnos?</div>
            ${advantages.map(adv => `<div style="margin: 5px 0;">${adv}</div>`).join('')}
            <button onclick="window.open('https://wa.me/+12545956299?text=ayuda%20con%20el%20maestro%20en%20consulta%20gratis', '_blank'); this.parentElement.remove();" style="
                position: absolute;
                top: 5px;
                right: 5px;
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                font-size: 16px;
            ">×</button>
        `;
        
        document.body.appendChild(advantageContainer);
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (advantageContainer.parentElement) {
                advantageContainer.remove();
            }
        }, 10000);
    }

    addInformationTooltips() {
        const importantElements = document.querySelectorAll('h2, h3, .service-item, .feature');
        
        importantElements.forEach(element => {
            element.style.position = 'relative';
            element.style.cursor = 'help';
            
            element.addEventListener('mouseenter', () => {
                const tooltip = document.createElement('div');
                tooltip.className = 'info-tooltip';
                tooltip.style.cssText = `
                    position: absolute;
                    bottom: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                    background: rgba(0,0,0,0.9);
                    color: white;
                    padding: 8px 12px;
                    border-radius: 5px;
                    font-size: 12px;
                    white-space: nowrap;
                    z-index: 1000;
                    pointer-events: none;
                `;
                tooltip.textContent = 'Haz clic para más información';
                element.appendChild(tooltip);
            });
            
            element.addEventListener('mouseleave', () => {
                const tooltip = element.querySelector('.info-tooltip');
                if (tooltip) tooltip.remove();
            });
        });
    }

    optimizeOffers() {
        // Dynamic pricing based on user behavior
        const priceElements = document.querySelectorAll('.price, .cost, [data-price]');
        
        priceElements.forEach(element => {
            if (this.userBehavior.intentSignals.includes('exit_intent')) {
                // Show discount for exit intent
                this.showDiscountOffer(element);
            }
        });
    }

    showDiscountOffer(priceElement) {
        const discountBadge = document.createElement('div');
        discountBadge.style.cssText = `
            position: absolute;
            top: -10px;
            right: -10px;
            background: #ff4444;
            color: white;
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 12px;
            font-weight: bold;
            animation: bounce 1s infinite;
        `;
        discountBadge.textContent = '20% OFF';
        
        priceElement.style.position = 'relative';
        priceElement.appendChild(discountBadge);
    }

    optimizeForms() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            // Progressive disclosure for long forms
            this.implementProgressiveDisclosure(form);
            
            // Smart field validation
            this.addSmartValidation(form);
            
            // Auto-save functionality
            this.addAutoSave(form);
        });
    }

    implementProgressiveDisclosure(form) {
        const fields = form.querySelectorAll('input, textarea, select');
        
        if (fields.length > 3) {
            // Hide non-essential fields initially
            fields.forEach((field, index) => {
                if (index > 2) {
                    field.parentElement.style.display = 'none';
                }
            });
            
            // Show more fields as user progresses
            let visibleFields = 3;
            fields.forEach((field, index) => {
                if (index < visibleFields) {
                    field.addEventListener('blur', () => {
                        if (field.value && visibleFields < fields.length) {
                            fields[visibleFields].parentElement.style.display = 'block';
                            visibleFields++;
                        }
                    });
                }
            });
        }
    }

    addSmartValidation(form) {
        const fields = form.querySelectorAll('input[type="email"], input[type="tel"], input[type="text"]');
        
        fields.forEach(field => {
            field.addEventListener('blur', () => {
                this.validateField(field);
            });
            
            field.addEventListener('input', this.debounce(() => {
                this.validateField(field);
            }, 500));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let message = '';
        
        if (field.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value);
            message = isValid ? '✓ Email válido' : '✗ Email inválido';
        } else if (field.type === 'tel') {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            isValid = phoneRegex.test(value);
            message = isValid ? '✓ Teléfono válido' : '✗ Teléfono inválido';
        }
        
        // Show validation message
        this.showValidationMessage(field, message, isValid);
    }

    showValidationMessage(field, message, isValid) {
        // Remove existing message
        const existingMessage = field.parentElement.querySelector('.validation-message');
        if (existingMessage) existingMessage.remove();
        
        // Add new message
        const messageElement = document.createElement('div');
        messageElement.className = 'validation-message';
        messageElement.style.cssText = `
            font-size: 12px;
            margin-top: 5px;
            color: ${isValid ? '#28a745' : '#dc3545'};
        `;
        messageElement.textContent = message;
        
        field.parentElement.appendChild(messageElement);
        
        // Update field styling
        field.style.borderColor = isValid ? '#28a745' : '#dc3545';
    }

    addAutoSave(form) {
        const fields = form.querySelectorAll('input, textarea, select');
        
        fields.forEach(field => {
            field.addEventListener('input', this.debounce(() => {
                this.saveFormData(form);
            }, 1000));
        });
        
        // Restore saved data on page load
        this.restoreFormData(form);
    }

    saveFormData(form) {
        const formData = new FormData(form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        localStorage.setItem('form_autosave', JSON.stringify(data));
    }

    restoreFormData(form) {
        const savedData = localStorage.getItem('form_autosave');
        if (savedData) {
            const data = JSON.parse(savedData);
            
            Object.keys(data).forEach(key => {
                const field = form.querySelector(`[name="${key}"]`);
                if (field) {
                    field.value = data[key];
                }
            });
        }
    }

    // Machine Learning básico
    initializePredictiveModel() {
        // Simple predictive model based on user behavior patterns
        this.conversionModel = {
            weights: {
                scrollDepth: 0.3,
                timeOnPage: 0.25,
                interactions: 0.2,
                intentSignals: 0.25
            },
            threshold: 0.6
        };
        
        // Update model based on actual conversions
        this.updateModelWeights();
    }

    updateConversionProbability() {
        const features = {
            scrollDepth: Math.min(this.userBehavior.scrollDepth / 100, 1),
            timeOnPage: Math.min(this.userBehavior.timeOnPage / 120000, 1), // 2 minutes max
            interactions: Math.min(this.userBehavior.interactions / 10, 1),
            intentSignals: this.userBehavior.intentSignals.length / 5
        };
        
        let probability = 0;
        Object.keys(features).forEach(feature => {
            probability += features[feature] * this.conversionModel.weights[feature];
        });
        
        this.userBehavior.conversionProbability = Math.min(probability, 1);
        
        // Trigger high-probability optimizations
        if (this.userBehavior.conversionProbability > this.conversionModel.threshold) {
            this.triggerHighProbabilityOptimizations();
        }
    }

    triggerHighProbabilityOptimizations() {
        console.log('🎯 Usuario con alta probabilidad de conversión detectado');
        
        // Show special offer
        this.showSpecialOffer();
        
        // Prioritize contact methods
        this.prioritizeContactMethods();
        
        // Reduce friction
        this.reduceFriction();
    }

    showSpecialOffer() {
        if (document.querySelector('.special-offer')) return; // Don't show multiple times
        
        const offer = document.createElement('div');
        offer.className = 'special-offer';
        offer.style.cssText = `
            position: fixed;
            bottom: 50em;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #ff6b6b, #ee5a24);
            color: white;
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 1000;
            text-align: center;
            max-width: 300px;
            animation: slideUp 0.5s ease-out;
        `;
        
        offer.innerHTML = `
            <div style="font-weight: bold; font-size: 16px; margin-bottom: 10px;">
                🎁 Oferta Especial
            </div>
            <div style="margin-bottom: 15px;">
                Primera consulta completamente GRATIS
            </div>
            <button onclick="window.open('https://wa.me/+12545956299?text=ayuda%20con%20el%20maestro%20en%20consulta%20gratis', '_blank'); this.parentElement.remove();" style="
                background: white;
                color: #ee5a24;
                border: none;
                padding: 10px 20px;
                border-radius: 25px;
                font-weight: bold;
                cursor: pointer;
                margin-right: 10px;
            ">Consultar Ahora</button>
            <button onclick="this.parentElement.remove()" style="
                background: none;
                color: white;
                border: 1px solid white;
                padding: 10px 20px;
                border-radius: 25px;
                cursor: pointer;
            ">Cerrar</button>
        `;
        
        document.body.appendChild(offer);
        
        // Auto-remove after 15 seconds
        setTimeout(() => {
            if (offer.parentElement) {
                offer.remove();
            }
        }, 15000);
    }

    prioritizeContactMethods() {
        const contactButtons = document.querySelectorAll('a[href^="tel:"], a[href^="https://wa.me"]');
        
        contactButtons.forEach(button => {
            button.style.transform = 'scale(1.1)';
            button.style.zIndex = '999';
            button.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.8)';
            button.style.animation = 'pulse 2s infinite';
        });
    }

    reduceFriction() {
        // Simplify forms
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            const optionalFields = form.querySelectorAll('[data-optional], .optional');
            optionalFields.forEach(field => {
                field.style.display = 'none';
            });
        });
        
        // Make CTAs more prominent
        const ctas = document.querySelectorAll('.mystic-button, .cta-button');
        ctas.forEach(cta => {
            cta.style.fontSize = '18px';
            cta.style.padding = '15px 30px';
        });
    }

    // A/B Testing Framework
    setupA_BTestingFramework() {
        this.abTests = {
            ctaColor: ['#722f37', '#8b3a42', '#a0485e'],
            ctaText: ['Consulta Gratis', 'Habla Ahora', 'Resuelve tus Dudas'],
            headerText: ['Consultas Místicas Online', 'Expertos en Tarot y Videncia', 'Tu Futuro te Espera']
        };
        
        this.runA_BTests();
    }

    runA_BTests() {
        const userHash = this.getUserBehaviorHash();
        
        // Test CTA colors
        const ctaColorIndex = userHash % this.abTests.ctaColor.length;
        const ctaButtons = document.querySelectorAll('.mystic-button, .cta-button');
        ctaButtons.forEach(button => {
            button.style.backgroundColor = this.abTests.ctaColor[ctaColorIndex];
        });
        
        // Test header text
        const headerTextIndex = (userHash + 1) % this.abTests.headerText.length;
        const headers = document.querySelectorAll('h1, .main-title');
        if (headers.length > 0) {
            headers[0].textContent = this.abTests.headerText[headerTextIndex];
        }
        
        // Report A/B test participation
        this.reportA_BTestParticipation(ctaColorIndex, headerTextIndex);
    }

    reportA_BTestParticipation(ctaVariant, headerVariant) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'ab_test_participation', {
                event_category: 'optimization',
                event_label: 'cta_color',
                value: ctaVariant
            });
            
            gtag('event', 'ab_test_participation', {
                event_category: 'optimization',
                event_label: 'header_text',
                value: headerVariant
            });
        }
    }

    // Optimizaciones específicas por trigger
    triggerScrollBasedOptimizations(scrollPercent) {
        if (scrollPercent >= 50 && !this.optimizationStrategies.social_proof) {
            this.enableSocialProof();
        }
        
        if (scrollPercent >= 75 && !this.optimizationStrategies.progressive_disclosure) {
            this.enableProgressiveDisclosure();
        }
    }

    triggerSectionOptimizations(section) {
        // Optimize based on which section user is viewing
        const sectionId = section.id || section.className;
        
        if (sectionId.includes('service') || sectionId.includes('consulta')) {
            this.emphasizeServiceBenefits();
        }
        
        if (sectionId.includes('contact') || sectionId.includes('footer')) {
            this.emphasizeUrgency();
        }
    }

    enableSocialProof() {
        this.optimizationStrategies.social_proof = true;
        
        const socialProof = document.createElement('div');
        socialProof.className = 'social-proof';
        socialProof.style.cssText = `
            position: fixed;
            bottom: 80px;
            left: 20px;
            background: white;
            padding: 15px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            max-width: 250px;
            border-left: 4px solid #722f37;
        `;
        
        const recentConsults = [
            {
                name: 'María de San Antonio',
                service: 'consulta de tarot',
                time: '3 minutos'
            },
            {
                name: 'Juan de Dallas',
                service: 'lectura de cartas',
                time: '5 minutos'
            },
            {
                name: 'Ana de Denver',
                service: 'consulta espiritual',
                time: '2 minutos'
            },
            {
                name: 'Carlos de New York',
                service: 'limpieza energética',
                time: '4 minutos'
            },
            {
                name: 'Laura de Los Ángeles',
                service: 'lectura de aura',
                time: '1 minuto'
            },
            {
                name: 'Pedro de San Diego',
                service: 'consulta astrológica',
                time: '6 minutos'
            }
        ];

        const randomConsult = recentConsults[Math.floor(Math.random() * recentConsults.length)];

        socialProof.innerHTML = `
            <div style="font-weight: bold; color: #722f37; margin-bottom: 5px;">
                ✨ Consulta Reciente
            </div>
            <div style="font-size: 14px; color: #666;">
                ${randomConsult.name} acaba de recibir su ${randomConsult.service}
            </div>
            <div style="font-size: 12px; color: #999; margin-top: 5px;">
                Hace ${randomConsult.time}
            </div>
        `;
        
        document.body.appendChild(socialProof);
        
        // Auto-remove after 8 seconds
        setTimeout(() => {
            if (socialProof.parentElement) {
                socialProof.remove();
            }
        }, 8000);
    }

    enableUrgencyOptimization() {
        this.optimizationStrategies.urgency = true;
        
        // Add urgency indicators
        const urgencyElements = document.querySelectorAll('.mystic-button, .cta-button');
        urgencyElements.forEach(element => {
            const urgencyText = document.createElement('div');
            urgencyText.style.cssText = `
                font-size: 12px;
                color: #ff4444;
                font-weight: bold;
                margin-top: 5px;
                animation: blink 1s infinite;
            `;
            urgencyText.textContent = '⏰ Solo por hoy - Consulta gratis';
            element.parentElement.appendChild(urgencyText);
        });
    }

    enableExitIntentOptimization() {
        this.optimizationStrategies.exit_intent = true;
        this.triggerExitIntentOptimization();
    }

    triggerExitIntentOptimization() {
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
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        modal.innerHTML = `
            <div style="
                background: black;
                padding: 30px;
                border-radius: 15px;
                text-align: center;
                max-width: 400px;
                position: relative;
            ">
                <h3 style="color: #722f37; margin-bottom: 15px;">
                    ¡Espera! No te vayas sin tu consulta gratuita
                </h3>
                <p style="margin-bottom: 20px;">
                    Obtén respuestas a tus preguntas más importantes
                </p>
                <button onclick="window.open('https://wa.me/+12545956299?text=ayuda%20con%20el%20maestro%20en%20consulta%20gratis', '_blank'); this.closest('.exit-intent-modal').remove();" style="
                    background:rgb(81, 3, 3);
                    color: white;
                    border: none;
                    padding: 15px 30px;
                    border-radius: 25px;
                    font-weight: bold;
                    cursor: pointer;
                    margin-right: 10px;
                ">Consultar Gratis</button>
                <button onclick="this.closest('.exit-intent-modal').remove()" style="
                    background: #ccc;
                    color: #666;
                    border: none;
                    padding: 15px 30px;
                    border-radius: 25px;
                    cursor: pointer;
                ">No, gracias</button>
                <button onclick="this.closest('.exit-intent-modal').remove()" style="
                    position: absolute;
                    top: 10px;
                    right: 15px;
                    background: none;
                    border: none;
                    font-size: 20px;
                    cursor: pointer;
                ">×</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Report exit intent trigger
        this.reportConversion('exit_intent_triggered', 'secondary');
    }

    enablePersonalization() {
        this.optimizationStrategies.personalization = true;
        this.personalizeContent();
    }

    enableProgressiveDisclosure() {
        this.optimizationStrategies.progressive_disclosure = true;
        
        // Show additional content sections
        const hiddenSections = document.querySelectorAll('[data-progressive], .progressive-content');
        hiddenSections.forEach(section => {
            section.style.display = 'block';
            section.style.opacity = '0';
            section.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                section.style.opacity = '1';
            }, 100);
        });
    }

    // Optimizaciones específicas por intención
    enablePurchaseIntentOptimizations() {
        console.log('🛒 Optimizaciones para intención de compra activadas');
        
        // Highlight pricing and offers
        const priceElements = document.querySelectorAll('.price, .offer, .discount');
        priceElements.forEach(element => {
            element.style.background = 'linear-gradient(135deg, #ffd700, #ffed4e)';
            element.style.padding = '10px';
            element.style.borderRadius = '8px';
            element.style.fontWeight = 'bold';
        });
        
        // Show guarantee badges
        this.showGuaranteeBadges();
    }

    enableInformationOptimizations() {
        console.log('📚 Optimizaciones para búsqueda de información activadas');
        
        // Expand FAQ sections
        this.expandFAQSections();
        
        // Show detailed service descriptions
        this.showDetailedDescriptions();
    }

    enableComparisonOptimizations() {
        console.log('⚖️ Optimizaciones para comportamiento de comparación activadas');
        
        // Show competitive advantages
        this.showCompetitiveAdvantages();
        
        // Highlight unique features
        this.highlightUniqueFeatures();
    }

    showGuaranteeBadges() {
        const guarantees = [
            '✅ 100% Confidencial',
            '🔒 Pago Seguro',
            '⭐ Expertos Certificados',
            '💯 Satisfacción Garantizada'
        ];
        
        const badgeContainer = document.createElement('div');
        badgeContainer.className = 'guarantee-badges';
        badgeContainer.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
        `;
        
        guarantees.forEach((guarantee, index) => {
            const badge = document.createElement('div');
            badge.style.cssText = `
                background: #28a745;
                color: white;
                padding: 8px 12px;
                margin: 5px 0;
                border-radius: 20px;
                font-size: 12px;
                font-weight: bold;
                animation: slideInRight 0.5s ease-out ${index * 0.2}s both;
            `;
            badge.textContent = guarantee;
            badgeContainer.appendChild(badge);
        });
        
        document.body.appendChild(badgeContainer);
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (badgeContainer.parentElement) {
                badgeContainer.remove();
            }
        }, 10000);
    }

    expandFAQSections() {
        const faqItems = document.querySelectorAll('.faq-item, .accordion-item');
        faqItems.forEach(item => {
            const content = item.querySelector('.faq-content, .accordion-content');
            if (content) {
                content.style.display = 'block';
                content.style.maxHeight = 'none';
            }
        });
    }

    showDetailedDescriptions() {
        const serviceItems = document.querySelectorAll('.service-item, .service-card');
        serviceItems.forEach(item => {
            const shortDesc = item.querySelector('.short-description');
            const longDesc = item.querySelector('.long-description, [data-full-description]');
            
            if (shortDesc) shortDesc.style.display = 'none';
            if (longDesc) longDesc.style.display = 'block';
        });
    }

    highlightUniqueFeatures() {
        const uniqueFeatures = document.querySelectorAll('[data-unique], .unique-feature');
        uniqueFeatures.forEach(feature => {
            feature.style.background = 'linear-gradient(135deg, #722f37, #8b3a42)';
            feature.style.color = 'white';
            feature.style.padding = '15px';
            feature.style.borderRadius = '10px';
            feature.style.margin = '10px 0';
            feature.style.boxShadow = '0 5px 15px rgba(114, 47, 55, 0.3)';
        });
    }

    // Reportes y analytics
    reportConversion(conversionType, category, additionalData = {}) {
        console.log(`🎯 Conversión reportada: ${conversionType} (${category})`);
        
        if (typeof gtag !== 'undefined') {
            gtag('event', conversionType, {
                event_category: `conversion_${category}`,
                event_label: conversionType,
                value: this.getConversionValue(category),
                custom_parameter_1: JSON.stringify({
                    userBehavior: this.userBehavior,
                    conversionProbability: this.userBehavior.conversionProbability,
                    ...additionalData
                })
            });
        }
        
        // Update conversion model
        this.updateModelWeights();
    }

    getConversionValue(category) {
        const values = {
            primary: 100,
            secondary: 50,
            micro: 10
        };
        return values[category] || 1;
    }

    updateModelWeights() {
        // Simple learning: adjust weights based on successful conversions
        // This is a simplified version - in production, you'd use more sophisticated ML
        
        const conversionRate = this.calculateConversionRate();
        if (conversionRate > 0.1) { // If conversion rate > 10%
            // Increase weight of factors that led to conversion
            if (this.userBehavior.scrollDepth > 75) {
                this.conversionModel.weights.scrollDepth *= 1.1;
            }
            if (this.userBehavior.timeOnPage > 60000) {
                this.conversionModel.weights.timeOnPage *= 1.1;
            }
            if (this.userBehavior.interactions > 5) {
                this.conversionModel.weights.interactions *= 1.1;
            }
        }
        
        // Normalize weights
        const totalWeight = Object.values(this.conversionModel.weights).reduce((a, b) => a + b, 0);
        Object.keys(this.conversionModel.weights).forEach(key => {
            this.conversionModel.weights[key] /= totalWeight;
        });
    }

    calculateConversionRate() {
        // Simplified conversion rate calculation
        const totalSessions = parseInt(localStorage.getItem('total_sessions') || '1');
        const totalConversions = parseInt(localStorage.getItem('total_conversions') || '0');
        return totalConversions / totalSessions;
    }

    // Utilidades
    getUserBehaviorHash() {
        const behaviorString = JSON.stringify(this.userBehavior);
        let hash = 0;
        for (let i = 0; i < behaviorString.length; i++) {
            const char = behaviorString.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return Math.abs(hash);
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    handlePageHidden() {
        // User switched tabs or minimized browser
        this.userBehavior.intentSignals.push('distraction');
    }

    handlePageVisible() {
        // User returned to page
        this.userBehavior.intentSignals.push('re_engagement');
    }

    setupRealTimeOptimization() {
        // Continuously optimize based on real-time behavior
        setInterval(() => {
            this.updateConversionProbability();
            this.applyRealTimeOptimizations();
        }, 5000);
    }

    applyRealTimeOptimizations() {
        const probability = this.userBehavior.conversionProbability;
        
        if (probability > 0.8 && !this.optimizationStrategies.urgency) {
            this.enableUrgencyOptimization();
        }
        
        if (probability > 0.6 && !this.optimizationStrategies.social_proof) {
            this.enableSocialProof();
        }
        
        if (probability < 0.3 && this.userBehavior.timeOnPage > 30000) {
            // Low probability after 30 seconds - try different approach
            this.enableInformationOptimizations();
        }
    }

    enableSmartRecommendations() {
        // AI-powered content recommendations based on user behavior
        setTimeout(() => {
            this.showSmartRecommendations();
        }, 45000); // After 45 seconds
    }

    showSmartRecommendations() {
        const recommendations = this.generateRecommendations();
        
        if (recommendations.length === 0) return;
        
        const recommendationWidget = document.createElement('div');
        recommendationWidget.className = 'smart-recommendations';
        recommendationWidget.style.cssText = `
            position: fixed;
            top: 50%;
            right: 20px;
            transform: translateY(-50%);
            background: black;
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 1000;
            max-width: 280px;
            border: 2px solid #722f37;
        `;
        
        recommendationWidget.innerHTML = `
            <div style="font-weight: bold; color: #722f37; margin-bottom: 15px; text-align: center;">
                🎯 Recomendado para ti
            </div>
            ${recommendations.map(rec => `
                <div style="
                    padding: 10px;
                    margin: 10px 0;
                    background:rgb(0, 0, 0);
                    border-radius: 8px;
                    border-left: 3px solid #722f37;
                ">
                    <div style="font-weight: bold; font-size: 14px; margin-bottom: 5px;">
                        ${rec.title}
                    </div>
                    <div style="font-size: 12px; color: #666;">
                        ${rec.description}
                    </div>
                </div>
            `).join('')}
            <button onclick="this.parentElement.remove()" style="
                position: absolute;
                top: 5px;
                right: 10px;
                background: none;
                border: none;
                font-size: 18px;
                cursor: pointer;
                color: #999;
            ">×</button>
        `;
        
        document.body.appendChild(recommendationWidget);
        
        // Auto-remove after 12 seconds
        setTimeout(() => {
            if (recommendationWidget.parentElement) {
                recommendationWidget.remove();
            }
        }, 12000);
    }

    generateRecommendations() {
        const recommendations = [];
        const intentSignals = this.userBehavior.intentSignals;
        
        if (intentSignals.includes('information_seeking')) {
            recommendations.push({
                title: '📚 Guía Completa de Tarot',
                description: 'Aprende sobre los diferentes tipos de consultas'
            });
        }
        
        if (intentSignals.includes('purchase_intent')) {
            recommendations.push({
                title: '💫 Consulta Premium',
                description: 'Sesión extendida con nuestro experto principal'
            });
        }
        
        if (intentSignals.includes('hesitation')) {
            recommendations.push({
                title: '🆓 Consulta de Prueba',
                description: 'Primera pregunta completamente gratis'
            });
        }
        
        if (this.userBehavior.scrollDepth > 75) {
            recommendations.push({
                title: '🔮 Lectura Personalizada',
                description: 'Basada en tu fecha de nacimiento'
            });
        }
        
        return recommendations.slice(0, 2); // Max 2 recommendations
    }
}

// Inicializar el optimizador
console.log('🎯 Iniciando Smart Conversion Optimizer...');
new SmartConversionOptimizer();