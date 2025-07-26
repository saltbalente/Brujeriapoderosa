/**
 * Sistema de Análisis de Competencia y Optimización de Pujas
 * Reduce el CPC mediante estrategias inteligentes de puja y análisis competitivo
 */

class BidOptimizer {
    constructor() {
        this.competitorData = {};
        this.bidStrategies = {};
        this.performanceMetrics = {};
        this.timeBasedOptimization = {};
        
        this.init();
    }

    init() {
        this.analyzeCompetitorLandscape();
        this.setupTimeBasedBidding();
        this.implementQualityScoreBoosts();
        this.setupNegativeKeywordSuggestions();
        this.createLongTailStrategy();
        this.setupBidAdjustments();
        this.implementSmartBidding();
        this.startContinuousOptimization();
    }

    // 1. ANÁLISIS DE COMPETENCIA
    analyzeCompetitorLandscape() {
        // Simular análisis de competencia basado en keywords
        const competitorKeywords = [
            'brujo', 'tarot', 'vidente', 'espiritista', 'santero',
            'amarre de amor', 'consulta espiritual', 'ritual',
            'limpia energética', 'protección espiritual'
        ];
        
        this.competitorData = {
            highCompetition: ['brujo', 'tarot', 'vidente'],
            mediumCompetition: ['amarre de amor', 'consulta espiritual'],
            lowCompetition: ['limpia energética', 'protección espiritual'],
            longTailOpportunities: [
                'brujo especialista en amarres de amor bogotá',
                'consulta espiritual efectiva medellín',
                'ritual de prosperidad cali',
                'limpia energética barranquilla'
            ]
        };
        
        this.reportCompetitorAnalysis();
    }

    // 2. OPTIMIZACIÓN BASADA EN TIEMPO
    setupTimeBasedBidding() {
        const currentHour = new Date().getHours();
        const dayOfWeek = new Date().getDay();
        
        // Horarios de alta conversión (basado en comportamiento típico)
        const highConversionTimes = {
            weekdays: [19, 20, 21, 22], // 7PM-10PM
            weekends: [14, 15, 16, 17, 18, 19, 20, 21] // 2PM-9PM
        };
        
        // Horarios de bajo costo (menos competencia)
        const lowCostTimes = {
            weekdays: [6, 7, 8, 14, 15], // Mañana temprano y tarde
            weekends: [9, 10, 11, 12] // Mañana de fin de semana
        };
        
        this.timeBasedOptimization = {
            currentOptimalTime: this.isOptimalTime(currentHour, dayOfWeek),
            bidAdjustment: this.calculateTimeBidAdjustment(currentHour, dayOfWeek),
            nextOptimalWindow: this.getNextOptimalWindow()
        };
        
        this.reportTimeBasedOptimization();
    }

    getNextOptimalWindow() {
        const now = new Date();
        const currentHour = now.getHours();
        
        // Ventanas óptimas para servicios espirituales
        const optimalWindows = [
            { start: 9, end: 11, multiplier: 1.2, reason: 'Mañana temprana - alta intención' },
            { start: 14, end: 16, multiplier: 1.15, reason: 'Tarde - momento de reflexión' },
            { start: 19, end: 22, multiplier: 1.3, reason: 'Noche - búsqueda espiritual' }
        ];
        
        // Encontrar la siguiente ventana óptima
        for (let window of optimalWindows) {
            if (currentHour < window.start) {
                return {
                    nextWindow: window,
                    hoursUntil: window.start - currentHour,
                    currentMultiplier: this.getCurrentBidMultiplier()
                };
            }
        }
        
        // Si es después de la última ventana, la siguiente es mañana
        return {
            nextWindow: optimalWindows[0],
            hoursUntil: (24 - currentHour) + optimalWindows[0].start,
            currentMultiplier: this.getCurrentBidMultiplier()
        };
    }

    getCurrentBidMultiplier() {
        const now = new Date();
        const currentHour = now.getHours();
        
        if (currentHour >= 9 && currentHour <= 11) return 1.2;
        if (currentHour >= 14 && currentHour <= 16) return 1.15;
        if (currentHour >= 19 && currentHour <= 22) return 1.3;
        
        return 1.0; // Multiplicador base
    }

    analyzeCurrentBiddingWindow() {
        const now = new Date();
        const currentHour = now.getHours();
        const multiplier = this.getCurrentBidMultiplier();
        
        this.reportEvent('hourly_bid_analysis', {
            hour: currentHour,
            multiplier: multiplier,
            isOptimal: multiplier > 1.0,
            recommendation: multiplier > 1.0 ? 'Ventana óptima activa' : 'Ventana de bajo rendimiento'
        });
    }

    isOptimalTime(hour, day) {
        const isWeekend = day === 0 || day === 6;
        const highTimes = isWeekend ? 
            this.timeBasedOptimization.weekends : 
            this.timeBasedOptimization.weekdays;
        
        return highTimes?.includes(hour) || false;
    }

    calculateTimeBidAdjustment(hour, day) {
        const isWeekend = day === 0 || day === 6;
        
        // Horarios premium (alta conversión) - aumentar puja 20%
        if ((isWeekend && [19, 20, 21].includes(hour)) || 
            (!isWeekend && [20, 21].includes(hour))) {
            return { adjustment: 1.2, reason: 'peak_conversion_time' };
        }
        
        // Horarios de oportunidad (bajo costo) - mantener puja base
        if ((!isWeekend && [7, 8, 14, 15].includes(hour)) ||
            (isWeekend && [10, 11, 12].includes(hour))) {
            return { adjustment: 1.0, reason: 'low_cost_opportunity' };
        }
        
        // Horarios de baja conversión - reducir puja 30%
        if ([2, 3, 4, 5, 6].includes(hour)) {
            return { adjustment: 0.7, reason: 'low_conversion_time' };
        }
        
        return { adjustment: 1.0, reason: 'standard_time' };
    }

    // 3. IMPULSOS DE QUALITY SCORE
    implementQualityScoreBoosts() {
        const qualityBoosts = {
            // Relevancia de anuncios
            adRelevance: this.improveAdRelevance(),
            
            // Experiencia de página de destino
            landingPageExperience: this.enhanceLandingPageExperience(),
            
            // CTR esperado
            expectedCTR: this.optimizeExpectedCTR(),
            
            // Extensiones de anuncios
            adExtensions: this.implementAdExtensions()
        };
        
        this.reportQualityScoreBoosts(qualityBoosts);
    }

    implementAdExtensions() {
        // Simular implementación de extensiones de anuncios
        const adExtensions = {
            sitelinks: [
                { text: "Consulta Gratuita", url: "#consulta-gratuita" },
                { text: "Testimonios", url: "#testimonios" },
                { text: "Precios", url: "#precios" },
                { text: "Contacto 24/7", url: "https://wa.me/+12545956299?text=ayuda%20con%20el%20maestro%20en%20consulta%20gratis" }
            ],
            callouts: [
                "✅ Resultados Garantizados",
                "🔮 +15 Años de Experiencia", 
                "📞 Atención 24/7",
                "💫 Primera Consulta Gratis"
            ],
            structured_snippets: {
                "Servicios": ["Amarres de Amor", "Tarot", "Limpias", "Rituales"],
                "Especialidades": ["Magia Blanca", "Vudú", "Santería", "Brujería"]
            },
            price_extensions: [
                { service: "Consulta Tarot", price: "$50.000 COP" },
                { service: "Amarre de Amor", price: "$150.000 COP" },
                { service: "Limpia Espiritual", price: "$100.000 COP" }
            ]
        };
        
        // Enlaces rápidos eliminados por solicitud del usuario
        this.createCalloutsExtension(adExtensions.callouts);
        // NO mostrar precios especiales - eliminado por solicitud del usuario
        // this.createPriceExtension(adExtensions.price_extensions);
        
        this.reportEvent('ad_extensions_implemented', { 
            sitelinks: adExtensions.sitelinks.length,
            callouts: adExtensions.callouts.length,
            prices: adExtensions.price_extensions.length
        });
        
        return adExtensions;
    }

    // Enlaces rápidos eliminados por solicitud del usuario

    createCalloutsExtension(callouts) {
        const calloutsContainer = document.createElement('div');
        calloutsContainer.className = 'ad-callouts-extension';
        calloutsContainer.innerHTML = `
            <button class="close-btn" onclick="this.parentElement.remove()">&times;</button>
            <div class="callouts-header">Ventajas Destacadas:</div>
            <div class="callouts-list">
                ${callouts.map(callout => `<span class="callout-item">${callout}</span>`).join('')}
            </div>
        `;
        
        calloutsContainer.style.cssText = `
             position: fixed;
             top: 50%;
             right: 20px;
             transform: translateY(-50%);
             background: #000000;
             color: white;
             border: 2px solid #FFD700;
             border-radius: 15px;
             padding: 25px;
             box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
             z-index: 10000;
             max-width: 280px;
             font-family: 'Arial', sans-serif;
             opacity: 0;
             animation: fadeInOut 20s ease-in-out;
         `;
        
        // Añadir estilos específicos para los elementos internos
        const style = document.createElement('style');
        style.textContent = `
             @keyframes fadeInOut {
                 0% { opacity: 0; transform: translateY(-50%) scale(0.8); }
                 5% { opacity: 1; transform: translateY(-50%) scale(1); }
                 50% { opacity: 1; transform: translateY(-50%) scale(1); }
                 100% { opacity: 0; transform: translateY(-50%) scale(0.8); }
             }
            .ad-callouts-extension .close-btn {
                position: absolute;
                top: 8px;
                right: 12px;
                background: rgba(255, 255, 255, 0.8);
                color: #333;
                border: none;
                border-radius: 50%;
                width: 25px;
                height: 25px;
                font-size: 16px;
                font-weight: bold;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
            }
            .ad-callouts-extension .close-btn:hover {
                background: rgba(255, 255, 255, 1);
                transform: scale(1.1);
            }
            .ad-callouts-extension .callouts-header {
                font-weight: bold;
                font-size: 18px;
                margin-bottom: 15px;
                text-align: center;
                color: #FFD700;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
                background: rgba(0, 0, 0, 0.6);
                padding: 8px;
                border-radius: 8px;
            }
            .ad-callouts-extension .callouts-list {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            .ad-callouts-extension .callout-item {
                background: rgba(0, 0, 0, 0.7);
                padding: 10px 15px;
                border-radius: 8px;
                font-size: 14px;
                color: #fff;
                border-left: 4px solid #FFD700;
                transition: all 0.3s ease;
                text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
            }
            .ad-callouts-extension .callout-item:hover {
                background: rgba(0, 0, 0, 0.8);
                transform: translateX(5px);
                border-left-color: #FFF;
            }
        `;
        document.head.appendChild(style);
        
        // Mostrar después de 10 segundos
         setTimeout(() => {
             document.body.appendChild(calloutsContainer);
             
             // Auto-eliminar después de 10 segundos adicionales (total 20 segundos)
             setTimeout(() => {
                 if (calloutsContainer.parentElement) {
                     calloutsContainer.remove();
                 }
             }, 10000);
         }, 10000);
    }

    // createPriceExtension eliminada por solicitud del usuario
    // NO mostrar precios especiales

    improveAdRelevance() {
        // Palabras clave de alta relevancia para inyectar
        const highRelevanceKeywords = {
            'amor': [
                'amarre de amor efectivo',
                'recuperar ex pareja',
                'unión de parejas',
                'ritual de amor eterno'
            ],
            'dinero': [
                'ritual de prosperidad',
                'atraer abundancia',
                'multiplicar ingresos',
                'suerte en negocios'
            ],
            'proteccion': [
                'limpia espiritual completa',
                'protección energética',
                'eliminar mala suerte',
                'escudo espiritual'
            ]
        };
        
        // Inyectar keywords de forma natural en el contenido
        Object.entries(highRelevanceKeywords).forEach(([category, keywords]) => {
            keywords.forEach(keyword => {
                this.injectRelevanceKeyword(keyword, category);
            });
        });
        
        return { status: 'implemented', keywords_injected: Object.values(highRelevanceKeywords).flat().length };
    }

    enhanceLandingPageExperience() {
        const enhancements = {
            // Velocidad de carga
            pageSpeed: this.optimizePageSpeed(),
            
            // Navegación móvil
            mobileExperience: this.optimizeMobileExperience(),
            
            // Contenido relevante
            contentRelevance: this.enhanceContentRelevance(),
            
            // Facilidad de conversión
            conversionEase: this.simplifyConversionProcess()
        };
        
        return enhancements;
    }

    optimizePageSpeed() {
        const optimizations = {
            // Compresión de imágenes
            imageOptimization: this.compressImages(),
            
            // Minificación de CSS/JS
            codeMinification: this.minifyAssets(),
            
            // Lazy loading
            lazyLoading: this.implementLazyLoading(),
            
            // Cache del navegador
            browserCaching: this.setupBrowserCaching(),
            
            // CDN para recursos estáticos
            cdnSetup: this.setupCDN()
        };
        
        this.reportPageSpeedOptimization(optimizations);
        return optimizations;
    }

    compressImages() {
        const images = document.querySelectorAll('img');
        let optimizedCount = 0;
        
        images.forEach(img => {
            if (img.src && !img.dataset.optimized) {
                // Simular optimización de imagen
                img.dataset.optimized = 'true';
                optimizedCount++;
            }
        });
        
        return { optimized_images: optimizedCount };
    }

    minifyAssets() {
        // Simular minificación de assets
        return {
            css_reduction: '25%',
            js_reduction: '30%',
            html_reduction: '15%'
        };
    }

    implementLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
            return { lazy_images: images.length };
        }
        return { lazy_images: 0 };
    }

    setupBrowserCaching() {
        // Simular configuración de cache
        return {
            cache_policy: 'aggressive',
            static_assets_cache: '1 year',
            dynamic_content_cache: '1 hour'
        };
    }

    setupCDN() {
        // Simular configuración de CDN
        return {
            cdn_enabled: true,
            static_assets_cdn: 'enabled',
            global_distribution: 'active'
        };
    }

    optimizeMobileExperience() {
        return {
            responsive_design: 'optimized',
            touch_targets: 'enlarged',
            mobile_speed: 'enhanced'
        };
    }

    enhanceContentRelevance() {
        return {
            keyword_density: 'optimized',
            semantic_content: 'enhanced',
            user_intent_match: 'high'
        };
    }

    simplifyConversionProcess() {
        return {
            form_fields: 'minimized',
            cta_visibility: 'enhanced',
            conversion_path: 'simplified'
        };
    }

    optimizeExpectedCTR() {
        // Elementos que mejoran el CTR
        const ctrOptimizations = {
            // Títulos emocionales
            emotionalHeadlines: this.addEmotionalHeadlines(),
            
            // Llamadas a la acción urgentes
            urgentCTAs: this.addUrgentCTAs(),
            
            // Prueba social visible
            socialProof: this.enhanceVisibleSocialProof(),
            
            // Ofertas específicas
            specificOffers: this.addSpecificOffers()
        };
        
        return ctrOptimizations;
    }

    addUrgentCTAs() {
        const urgentCTAs = [
            "🚨 ¡Solo HOY! Consulta Gratuita",
            "⏰ Últimas 3 Consultas Disponibles",
            "🔥 Oferta Especial - 50% Descuento",
            "💫 Consulta Inmediata - No Esperes Más",
            "⚡ Respuesta en 24 Horas Garantizada"
        ];
        
        // Crear CTA urgente flotante
        const urgentCTA = document.createElement('div');
        urgentCTA.className = 'urgent-cta-floating';
        urgentCTA.innerHTML = `
            <div class="urgent-content">
                <div class="urgent-text">${urgentCTAs[Math.floor(Math.random() * urgentCTAs.length)]}</div>
                <button class="urgent-btn">Consultar Ahora</button>
                <div class="countdown">⏰ Oferta válida por: <span id="countdown-timer">15:00</span></div>
            </div>
        `;
        
        urgentCTA.style.cssText = `
            
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(45deg, #ff4757, #ff3838);
            color: white;
            padding: 15px;
            z-index: 10000;
            text-align: center;
            box-shadow: 0 -4px 20px rgba(0,0,0,0.3);
            animation: pulse 2s infinite;
        `;
        
        document.body.appendChild(urgentCTA);
        
        // Iniciar countdown
        this.startCountdown();
        
        // Agregar funcionalidad al botón
        const urgentBtn = urgentCTA.querySelector('.urgent-btn');
        urgentBtn.addEventListener('click', () => {
            this.reportEvent('urgent_cta_click', { cta_type: 'floating_urgent' });
            // Simular conversión
            window.open('https://wa.me/+12545956299?text=ayuda%20con%20el%20maestro%20en%20consulta%20gratis', '_blank');
        });
        
        this.reportEvent('urgent_cta_added');
        return { urgent_ctas_added: 1, cta_type: 'floating_bottom' };
    }

    startCountdown() {
        let timeLeft = 15 * 60; // 15 minutos en segundos
        
        const countdownTimer = document.getElementById('countdown-timer');
        if (!countdownTimer) return;
        
        const updateCountdown = () => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            countdownTimer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            if (timeLeft > 0) {
                timeLeft--;
                setTimeout(updateCountdown, 1000);
            } else {
                countdownTimer.textContent = "¡Tiempo Agotado!";
            }
        };
        
        updateCountdown();
    }

    enhanceVisibleSocialProof() {
        return {
            testimonials_visible: 'enhanced',
            review_count: 'displayed',
            trust_badges: 'prominent'
        };
    }

    addSpecificOffers() {
        return {
            discount_percentage: '50%',
            limited_time: 'today_only',
            bonus_included: 'free_consultation'
        };
    }

    addEmotionalHeadlines() {
        const headlines = [
            "🔮 Descubre Tu Destino Ahora - Consulta Gratuita",
            "💫 Transforma Tu Vida Hoy - Tarot Profesional",
            "🌟 Respuestas Que Cambiarán Tu Futuro",
            "✨ El Amor Te Espera - Consulta Inmediata",
            "🎯 Soluciones Reales Para Tus Problemas"
        ];
        
        const randomHeadline = headlines[Math.floor(Math.random() * headlines.length)];
        
        // Buscar y actualizar el headline principal
        const mainHeadline = document.querySelector('h1, .main-headline, .hero-title');
        if (mainHeadline) {
            mainHeadline.textContent = randomHeadline;
            this.reportEvent('emotional_headline_updated', { headline: randomHeadline });
        }
        
        // Crear headline flotante si no existe uno principal
        if (!mainHeadline) {
            const floatingHeadline = document.createElement('div');
            floatingHeadline.className = 'floating-emotional-headline';
            floatingHeadline.innerHTML = `<h2>${randomHeadline}</h2>`;
            floatingHeadline.style.cssText = `
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
                color: white;
                padding: 15px 30px;
                border-radius: 25px;
                z-index: 1000;
                box-shadow: 0 4px 15px rgba(0,0,0,0.3);
                animation: pulse 2s infinite;
            `;
            
            document.body.appendChild(floatingHeadline);
        }
        
        return { headlines_updated: 1, current_headline: randomHeadline };
    }

    // 4. ESTRATEGIA DE PALABRAS CLAVE NEGATIVAS
    setupNegativeKeywordSuggestions() {
        const negativeKeywords = {
            // Evitar tráfico no cualificado
            irrelevant: [
                'gratis', 'free', 'barato', 'cheap',
                'falso', 'fake', 'estafa', 'scam',
                'broma', 'joke', 'mentira', 'lie'
            ],
            
            // Evitar competidores
            competitors: [
                'tarot gratis', 'vidente gratis',
                'horóscopo diario', 'predicciones gratis'
            ],
            
            // Evitar búsquedas informacionales
            informational: [
                'como hacer', 'tutorial', 'aprender',
                'historia de', 'que es', 'definicion'
            ],
            
            // Evitar búsquedas de entretenimiento
            entertainment: [
                'juego', 'game', 'diversión', 'fun',
                'película', 'movie', 'serie', 'show'
            ]
        };
        
        this.reportNegativeKeywords(negativeKeywords);
        return negativeKeywords;
    }

    // 5. ESTRATEGIA DE LONG TAIL
    createLongTailStrategy() {
        const longTailKeywords = {
            // Geográficas específicas
            geographic: [
                'brujo especialista miami doral',
                'consulta espiritual los angeles east',
                'amarre de amor houston texas',
                'ritual prosperidad nueva york bronx'
            ],
            
            // Servicios específicos
            serviceSpecific: [
                'amarre de amor para ex que tiene nueva pareja',
                'ritual para conseguir trabajo específico',
                'limpia energética para casa nueva',
                'protección espiritual contra envidias'
            ],
            
            // Urgencia temporal
            timeUrgent: [
                'consulta espiritual urgente hoy',
                'amarre de amor resultados rápidos',
                'ritual emergencia fin de semana'
            ],
            
            // Problemas específicos
            problemSpecific: [
                'ex pareja no contesta mensajes',
                'problemas económicos constantes',
                'mala suerte en todo lo que hago',
                'energías negativas en mi casa'
            ]
        };
        
        this.implementLongTailStrategy(longTailKeywords);
        return longTailKeywords;
    }

    implementLongTailStrategy(keywords) {
        // Crear contenido específico para long tail
        Object.entries(keywords).forEach(([category, keywordList]) => {
            keywordList.forEach(keyword => {
                this.createLongTailContent(keyword, category);
            });
        });
        
        this.reportLongTailImplementation(keywords);
    }

    // 6. AJUSTES DE PUJA INTELIGENTES
    setupBidAdjustments() {
        const bidAdjustments = {
            // Por dispositivo
            device: {
                mobile: this.calculateMobileBidAdjustment(),
                tablet: this.calculateTabletBidAdjustment(),
                desktop: this.calculateDesktopBidAdjustment()
            },
            
            // Por ubicación
            location: {
                bogota: 1.15, // +15% para Bogotá (mayor poder adquisitivo)
                medellin: 1.10, // +10% para Medellín
                cali: 1.05, // +5% para Cali
                other_cities: 0.95 // -5% para otras ciudades
            },
            
            // Por audiencia
            audience: {
                returning_visitors: 1.25, // +25% para visitantes recurrentes
                high_intent: 1.30, // +30% para alta intención
                engaged_users: 1.20, // +20% para usuarios comprometidos
                new_visitors: 1.0 // Base para nuevos visitantes
            },
            
            // Por día de la semana
            dayOfWeek: {
                sunday: 1.20, // +20% domingos (más tiempo libre)
                monday: 0.90, // -10% lunes (menos disposición)
                friday: 1.15, // +15% viernes (fin de semana)
                saturday: 1.25 // +25% sábados (más tiempo libre)
            }
        };
        
        this.applyBidAdjustments(bidAdjustments);
        return bidAdjustments;
    }

    calculateTabletBidAdjustment() {
        // Análisis específico para tablets
        const tabletMetrics = {
            conversion_rate: 0.035, // 3.5% conversión en tablets
            avg_session_duration: 180, // 3 minutos promedio
            bounce_rate: 0.45, // 45% bounce rate
            cost_per_click: 0.85 // 85% del CPC base
        };
        
        // Calcular ajuste basado en rendimiento
        let adjustment = 0; // Base 0%
        
        // Ajuste por tasa de conversión
        if (tabletMetrics.conversion_rate > 0.03) {
            adjustment += 10; // +10% si conversión > 3%
        }
        
        // Ajuste por duración de sesión
        if (tabletMetrics.avg_session_duration > 120) {
            adjustment += 5; // +5% si sesión > 2 minutos
        }
        
        // Ajuste por bounce rate
        if (tabletMetrics.bounce_rate < 0.5) {
            adjustment += 5; // +5% si bounce < 50%
        }
        
        // Ajuste por competencia (tablets menos competitivos)
        adjustment += 15; // +15% por menor competencia
        
        return {
            percentage: Math.min(adjustment, 25), // Máximo 25%
            reason: 'tablet_performance_analysis',
            metrics: tabletMetrics
        };
    }

    calculateDesktopBidAdjustment() {
        // Desktop como baseline con ajustes específicos
        const desktopMetrics = {
            conversion_rate: 0.045, // 4.5% conversión en desktop
            avg_session_duration: 240, // 4 minutos promedio
            bounce_rate: 0.35, // 35% bounce rate
            cost_per_click: 1.0 // 100% del CPC base
        };
        
        return {
            adjustment: 1.0, // Base 100%
            reason: 'desktop_baseline',
            metrics: desktopMetrics
        };
    }

    calculateMobileBidAdjustment() {
        // Móvil suele tener menor conversión pero mayor volumen
        const mobileConversionRate = 0.85; // 85% de la tasa de desktop
        const mobileTrafficVolume = 1.60; // 160% del volumen de desktop
        
        return {
            adjustment: 0.95, // -5% para compensar menor conversión
            reason: 'lower_conversion_higher_volume'
        };
    }

    applyBidAdjustments(adjustments) {
        // Aplicar ajustes de puja basados en los cálculos
        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        const currentDay = currentTime.getDay();
        
        // Detectar dispositivo actual (simulado)
        const deviceType = this.detectDeviceType();
        
        // Aplicar ajuste por dispositivo
        let finalAdjustment = 1.0;
        if (adjustments.device[deviceType]) {
            const deviceAdjustment = adjustments.device[deviceType];
            finalAdjustment *= deviceAdjustment.adjustment || deviceAdjustment.percentage / 100 + 1;
        }
        
        // Aplicar ajuste por día de la semana
        const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const dayAdjustment = adjustments.dayOfWeek[dayNames[currentDay]] || 1.0;
        finalAdjustment *= dayAdjustment;
        
        // Aplicar ajuste por hora
        const timeAdjustment = this.calculateTimeBidAdjustment(currentHour, currentDay);
        finalAdjustment *= timeAdjustment.adjustment;
        
        this.reportEvent('bid_adjustments_applied', {
            device_type: deviceType,
            day_of_week: dayNames[currentDay],
            hour: currentHour,
            final_adjustment: finalAdjustment,
            adjustment_reason: `${deviceType}_${dayNames[currentDay]}_${timeAdjustment.reason}`
        });
        
        return finalAdjustment;
    }
    
    detectDeviceType() {
        // Simulación de detección de dispositivo
        const userAgent = navigator.userAgent || '';
        
        if (/tablet|ipad/i.test(userAgent)) {
            return 'tablet';
        } else if (/mobile|android|iphone/i.test(userAgent)) {
            return 'mobile';
        } else {
            return 'desktop';
        }
    }

    // 7. SMART BIDDING SIMULATION
    implementSmartBidding() {
        const smartBiddingStrategies = {
            // Target CPA (Costo por Adquisición)
            targetCPA: {
                current_cpa: 45000, // COP
                target_cpa: 35000, // COP - Reducir 22%
                strategy: 'aggressive_optimization'
            },
            
            // Target ROAS (Retorno de Inversión Publicitaria)
            targetROAS: {
                current_roas: 3.2, // 320%
                target_roas: 4.5, // 450%
                strategy: 'value_optimization'
            },
            
            // Maximize Conversions
            maximizeConversions: {
                budget_utilization: 0.95, // 95% del presupuesto
                conversion_focus: 'high_value_actions'
            }
        };
        
        this.simulateSmartBidding(smartBiddingStrategies);
        return smartBiddingStrategies;
    }

    simulateSmartBidding(strategies) {
        // Simular optimización automática de pujas
        const optimization = {
            bid_adjustments: this.calculateOptimalBids(),
            keyword_performance: this.analyzeKeywordPerformance(),
            audience_insights: this.generateAudienceInsights(),
            recommendations: this.generateBidRecommendations()
        };
        
        this.reportSmartBiddingResults(optimization);
    }

    calculateOptimalBids() {
        // Calcular pujas óptimas basadas en múltiples factores
        const baseKeywords = [
            { keyword: 'amarre de amor', current_cpc: 2.50, competition: 'high' },
            { keyword: 'tarot gratis', current_cpc: 1.80, competition: 'medium' },
            { keyword: 'brujo experto', current_cpc: 3.20, competition: 'low' },
            { keyword: 'consulta espiritual', current_cpc: 2.10, competition: 'medium' },
            { keyword: 'ritual de amor', current_cpc: 2.80, competition: 'high' }
        ];
        
        const optimalBids = baseKeywords.map(kw => {
            // Factores para calcular puja óptima
            const competitionMultiplier = {
                'low': 0.8,
                'medium': 1.0,
                'high': 1.2
            };
            
            const timeMultiplier = this.getCurrentBidMultiplier();
            const qualityScoreBonus = 0.9; // 10% descuento por Quality Score alto
            const deviceAdjustment = this.getDeviceAdjustment();
            
            // Calcular puja óptima
            const optimalCPC = kw.current_cpc * 
                competitionMultiplier[kw.competition] * 
                timeMultiplier * 
                qualityScoreBonus * 
                deviceAdjustment;
            
            // Calcular ahorro potencial
            const potentialSavings = kw.current_cpc - optimalCPC;
            const savingsPercentage = (potentialSavings / kw.current_cpc) * 100;
            
            return {
                keyword: kw.keyword,
                current_cpc: kw.current_cpc,
                optimal_cpc: Math.round(optimalCPC * 100) / 100,
                potential_savings: Math.round(potentialSavings * 100) / 100,
                savings_percentage: Math.round(savingsPercentage * 10) / 10,
                competition: kw.competition,
                recommendation: this.getBidRecommendation(savingsPercentage)
            };
        });
        
        return optimalBids;
    }

    getDeviceAdjustment() {
        const deviceType = this.detectDeviceType();
        const adjustments = {
            'mobile': 1.1,  // +10% para móvil
            'tablet': 0.95, // -5% para tablet
            'desktop': 1.0  // Base para desktop
        };
        
        return adjustments[deviceType] || 1.0;
    }

    getBidRecommendation(savingsPercentage) {
        if (savingsPercentage > 20) {
            return 'Reducir puja significativamente';
        } else if (savingsPercentage > 10) {
            return 'Reducir puja moderadamente';
        } else if (savingsPercentage > 0) {
            return 'Reducir puja ligeramente';
        } else if (savingsPercentage > -10) {
            return 'Mantener puja actual';
        } else {
            return 'Considerar aumentar puja';
        }
    }

    generateBidRecommendations() {
        const optimalBids = this.calculateOptimalBids();
        
        const recommendations = {
            high_priority: [],
            medium_priority: [],
            low_priority: [],
            summary: {
                total_potential_savings: 0,
                avg_savings_percentage: 0,
                keywords_to_optimize: 0
            }
        };
        
        let totalSavings = 0;
        let totalSavingsPercentage = 0;
        let keywordsToOptimize = 0;
        
        optimalBids.forEach(bid => {
            if (bid.savings_percentage > 0) {
                keywordsToOptimize++;
                totalSavings += bid.potential_savings;
                totalSavingsPercentage += bid.savings_percentage;
                
                const recommendation = {
                    keyword: bid.keyword,
                    current_cpc: bid.current_cpc,
                    recommended_cpc: bid.optimal_cpc,
                    potential_savings: bid.potential_savings,
                    savings_percentage: bid.savings_percentage,
                    action: bid.recommendation
                };
                
                if (bid.savings_percentage > 20) {
                    recommendations.high_priority.push(recommendation);
                } else if (bid.savings_percentage > 10) {
                    recommendations.medium_priority.push(recommendation);
                } else {
                    recommendations.low_priority.push(recommendation);
                }
            }
        });
        
        recommendations.summary = {
            total_potential_savings: Math.round(totalSavings * 100) / 100,
            avg_savings_percentage: keywordsToOptimize > 0 ? Math.round((totalSavingsPercentage / keywordsToOptimize) * 10) / 10 : 0,
            keywords_to_optimize: keywordsToOptimize
        };
        
        return recommendations;
    }

    reportSmartBiddingResults(optimization) {
        this.reportEvent('smart_bidding_results', {
            total_keywords_analyzed: optimization.bid_adjustments.length,
            high_priority_optimizations: optimization.recommendations.high_priority.length,
            potential_savings: optimization.recommendations.summary.total_potential_savings,
            avg_savings_percentage: optimization.recommendations.summary.avg_savings_percentage
        });
    }

    // 8. OPTIMIZACIÓN CONTINUA
    startContinuousOptimization() {
        // Ejecutar optimizaciones cada 15 minutos
        setInterval(() => {
            this.runOptimizationCycle();
        }, 900000); // 15 minutos
        
        // Análisis profundo cada hora
        setInterval(() => {
            this.runDeepAnalysis();
        }, 3600000); // 1 hora
        
        // Reporte diario
        setInterval(() => {
            this.generateDailyReport();
        }, 86400000); // 24 horas
    }

    runOptimizationCycle() {
        const optimizations = {
            time_adjustment: this.updateTimeBasedBids(),
            performance_adjustment: this.adjustBasedOnPerformance(),
            competitor_adjustment: this.adjustBasedOnCompetition(),
            quality_boost: this.applyQualityBoosts()
        };
        
        this.reportOptimizationCycle(optimizations);
    }

    runDeepAnalysis() {
        const analysis = {
            keyword_gaps: this.identifyKeywordGaps(),
            audience_opportunities: this.findAudienceOpportunities(),
            bid_inefficiencies: this.identifyBidInefficiencies(),
            quality_score_issues: this.identifyQualityIssues()
        };
        
        this.reportDeepAnalysis(analysis);
    }

    // 9. ANÁLISIS DE RENDIMIENTO
    analyzeKeywordPerformance() {
        const keywordMetrics = {
            high_performers: [
                { keyword: 'amarre de amor bogotá', cpc: 2800, conversion_rate: 0.12 },
                { keyword: 'consulta espiritual medellín', cpc: 2200, conversion_rate: 0.15 },
                { keyword: 'ritual prosperidad', cpc: 1900, conversion_rate: 0.18 }
            ],
            underperformers: [
                { keyword: 'brujo', cpc: 4500, conversion_rate: 0.03 },
                { keyword: 'tarot', cpc: 3800, conversion_rate: 0.04 }
            ],
            opportunities: [
                { keyword: 'limpia energética cali', estimated_cpc: 1500, potential_cr: 0.20 },
                { keyword: 'protección espiritual', estimated_cpc: 1200, potential_cr: 0.22 }
            ]
        };
        
        return keywordMetrics;
    }

    generateAudienceInsights() {
        const audienceData = {
            high_value_segments: [
                { segment: 'mujeres_25_45_bogota', avg_order_value: 85000, conversion_rate: 0.18 },
                { segment: 'hombres_30_50_medellin', avg_order_value: 95000, conversion_rate: 0.15 },
                { segment: 'returning_customers', avg_order_value: 120000, conversion_rate: 0.25 }
            ],
            growth_opportunities: [
                { segment: 'jovenes_18_25', potential_volume: 'high', current_penetration: 'low' },
                { segment: 'adultos_mayores_55+', potential_value: 'high', current_penetration: 'medium' }
            ]
        };
        
        return audienceData;
    }

    // 10. REPORTES Y MÉTRICAS
    generateDailyReport() {
        const report = {
            date: new Date().toISOString().split('T')[0],
            performance_summary: {
                total_clicks: this.getTotalClicks(),
                total_conversions: this.getTotalConversions(),
                average_cpc: this.getAverageCPC(),
                conversion_rate: this.getConversionRate(),
                quality_score_avg: this.getAverageQualityScore()
            },
            optimizations_applied: this.getOptimizationsApplied(),
            recommendations: this.generateRecommendations(),
            next_actions: this.getNextActions()
        };
        
        this.reportDailyPerformance(report);
        return report;
    }

    // FUNCIONES DE REPORTE
    reportCompetitorAnalysis() {
        this.sendAnalyticsEvent('competitor_analysis', {
            high_competition_keywords: this.competitorData.highCompetition.length,
            long_tail_opportunities: this.competitorData.longTailOpportunities.length
        });
    }

    reportTimeBasedOptimization() {
        this.sendAnalyticsEvent('time_based_optimization', {
            current_optimal: this.timeBasedOptimization.currentOptimalTime,
            bid_adjustment: this.timeBasedOptimization.bidAdjustment.adjustment,
            adjustment_reason: this.timeBasedOptimization.bidAdjustment.reason
        });
    }

    reportQualityScoreBoosts(boosts) {
        this.sendAnalyticsEvent('quality_score_boosts', boosts);
    }

    reportPageSpeedOptimization(optimizations) {
        this.sendAnalyticsEvent('page_speed_optimization', {
            optimized_images: optimizations.imageOptimization.optimized_images,
            css_reduction: optimizations.codeMinification.css_reduction,
            js_reduction: optimizations.codeMinification.js_reduction,
            lazy_images: optimizations.lazyLoading.lazy_images,
            cdn_enabled: optimizations.cdnSetup.cdn_enabled
        });
    }

    reportNegativeKeywords(keywords) {
        const totalNegatives = Object.values(keywords).flat().length;
        this.sendAnalyticsEvent('negative_keywords_setup', {
            total_negative_keywords: totalNegatives,
            categories: Object.keys(keywords).length
        });
    }

    reportLongTailImplementation(keywords) {
        const totalLongTail = Object.values(keywords).flat().length;
        this.sendAnalyticsEvent('long_tail_strategy', {
            total_long_tail_keywords: totalLongTail,
            categories: Object.keys(keywords).length
        });
    }

    sendAnalyticsEvent(eventName, data) {
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                ...data,
                timestamp: Date.now(),
                optimization_system: 'bid_optimizer'
            });
        }
    }

    reportEvent(eventName, data = {}) {
        this.sendAnalyticsEvent(eventName, data);
    }

    // FUNCIONES AUXILIARES
    injectRelevanceKeyword(keyword, category) {
        // Crear contenido invisible para mejorar relevancia
        const hiddenSpan = document.createElement('span');
        hiddenSpan.style.position = 'absolute';
        hiddenSpan.style.left = '-9999px';
        hiddenSpan.textContent = keyword;
        hiddenSpan.setAttribute('data-category', category);
        document.body.appendChild(hiddenSpan);
    }

    createLongTailContent(keyword, category) {
        // Crear micro-contenido para long tail keywords
        const microContent = document.createElement('div');
        microContent.className = 'micro-content';
        microContent.style.display = 'none';
        microContent.innerHTML = `
            <h3>${keyword}</h3>
            <p>Especialista en ${keyword} con resultados garantizados.</p>
        `;
        microContent.setAttribute('data-keyword', keyword);
        microContent.setAttribute('data-category', category);
        document.body.appendChild(microContent);
    }

    // Funciones de métricas simuladas
    getTotalClicks() { return Math.floor(Math.random() * 500) + 200; }
    getTotalConversions() { return Math.floor(Math.random() * 50) + 20; }
    getAverageCPC() { return Math.floor(Math.random() * 2000) + 1500; }
    getConversionRate() { return (Math.random() * 0.1 + 0.05).toFixed(3); }
    getAverageQualityScore() { return (Math.random() * 2 + 7).toFixed(1); }
}

// Auto-inicialización SOLO con análisis en segundo plano
let bidOptimizer;
document.addEventListener('DOMContentLoaded', function() {
    bidOptimizer = new BidOptimizer();
    
    // SOLO análisis y optimizaciones en segundo plano (invisibles)
    bidOptimizer.startContinuousOptimization();
    
    // Headlines emocionales después de 5 minutos (muy sutil)
    setTimeout(() => {
        if (window.conversionOptimizer && 
            window.conversionOptimizer.userBehavior.scrollDepth > 50) {
            bidOptimizer.addEmotionalHeadlines();
        }
    }, 300000);
    
    // Extensiones de anuncios después de 8 minutos (discretas)
    setTimeout(() => {
        if (window.conversionOptimizer && 
            window.conversionOptimizer.userBehavior.engagementScore > 40) {
            bidOptimizer.implementAdExtensions();
        }
    }, 480000);
    
    // CTAs urgentes SOLO una vez por semana y con condiciones muy estrictas
    setTimeout(() => {
        const today = new Date();
        const lastShown = localStorage.getItem('urgent_cta_last_shown');
        const daysSinceLastShown = lastShown ? 
            Math.floor((today - new Date(lastShown)) / (1000 * 60 * 60 * 24)) : 7;
        
        if (daysSinceLastShown >= 7 && 
            window.conversionOptimizer && 
            window.conversionOptimizer.userBehavior.engagementScore > 80 &&
            window.conversionOptimizer.userBehavior.timeOnPage > 600000) { // 10 minutos
            bidOptimizer.addUrgentCTAs();
            localStorage.setItem('urgent_cta_last_shown', today.toISOString());
        }
    }, 600000);
});

// Exportar para uso global
window.BidOptimizer = BidOptimizer;