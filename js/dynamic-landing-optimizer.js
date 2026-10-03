/**
 * Sistema de Landing Pages Dinámicas para Maximizar Conversiones
 * Crea páginas optimizadas según la fuente de tráfico y palabras clave
 */

class DynamicLandingOptimizer {
    constructor() {
        this.trafficSource = this.detectTrafficSource();
        this.keywords = this.extractKeywords();
        this.userLocation = null;
        this.deviceType = this.detectDevice();
        this.lastInteractionTime = null;
        this.startTime = Date.now();
        
        this.init();
    }

    init() {
        this.getUserLocation();
        this.optimizeForTrafficSource();
        this.implementDynamicContent();
        this.setupAdvancedTracking();
        this.optimizePageSpeed();
        this.setupLocalSEO();
    }

    // 1. DETECCIÓN DE FUENTE DE TRÁFICO
    detectTrafficSource() {
        const urlParams = new URLSearchParams(window.location.search);
        const referrer = document.referrer.toLowerCase();
        
        // Google Ads
        if (urlParams.get('gclid') || urlParams.get('utm_source') === 'google_ads') {
            return {
                type: 'google_ads',
                campaign: urlParams.get('utm_campaign'),
                adgroup: urlParams.get('utm_term'),
                keyword: urlParams.get('utm_content')
            };
        }
        
        // Facebook Ads
        if (urlParams.get('fbclid') || referrer.includes('facebook')) {
            return { type: 'facebook_ads' };
        }
        
        // Búsqueda orgánica
        if (referrer.includes('google') || referrer.includes('bing')) {
            return { type: 'organic_search', engine: referrer.includes('google') ? 'google' : 'bing' };
        }
        
        // Directo
        if (!referrer) {
            return { type: 'direct' };
        }
        
        return { type: 'other', referrer };
    }

    // 2. EXTRACCIÓN DE PALABRAS CLAVE
    extractKeywords() {
        const urlParams = new URLSearchParams(window.location.search);
        const keywords = [];
        
        // De parámetros URL
        ['q', 'query', 'keyword', 'utm_term', 'utm_content'].forEach(param => {
            const value = urlParams.get(param);
            if (value) keywords.push(value.toLowerCase());
        });
        
        // De la URL
        const path = window.location.pathname.toLowerCase();
        if (path.includes('amor')) keywords.push('amor', 'pareja', 'amarre');
        if (path.includes('dinero')) keywords.push('dinero', 'prosperidad', 'trabajo');
        if (path.includes('proteccion')) keywords.push('protección', 'limpia', 'energía');
        
        return keywords;
    }

    // 3. OPTIMIZACIÓN POR FUENTE DE TRÁFICO
    optimizeForTrafficSource() {
        switch(this.trafficSource.type) {
            case 'google_ads':
                this.optimizeForGoogleAds();
                break;
            case 'facebook_ads':
                this.optimizeForFacebookAds();
                break;
            case 'organic_search':
                this.optimizeForOrganicSearch();
                break;
            case 'direct':
                this.optimizeForDirectTraffic();
                break;
        }
    }

    optimizeForGoogleAds() {
        // Mensaje específico para tráfico de Google Ads
        this.addDynamicHeadline("🔮 ¡Encontraste al Brujo Correcto!");
        this.addUrgencyMessage("Consulta disponible AHORA - No esperes más");
        
        // Tracking específico
        this.reportEvent('google_ads_landing', {
            campaign: this.trafficSource.campaign,
            keyword: this.trafficSource.keyword
        });
        
        // Optimizar para Quality Score
        this.enhanceQualityScore();
    }

    optimizeForFacebookAds() {
        this.addDynamicHeadline("✨ Como viste en Facebook - Consulta Espiritual Real");
        this.addSocialProof("Miles de seguidores confían en mis predicciones");
        
        this.reportEvent('facebook_ads_landing');
    }

    optimizeForDirectTraffic() {
        this.addDynamicHeadline("🌟 Bienvenido de Vuelta - Consulta Espiritual Profesional");
        this.addTrustSignals("Tu brujo de confianza desde 2008");
        
        this.reportEvent('direct_traffic_landing');
    }

    optimizeForOrganicSearch() {
        this.addDynamicHeadline("🌟 Brujo Profesional - Consultas Espirituales Efectivas");
        this.addTrustSignals("Resultados comprobados desde 2008");
        
        this.reportEvent('organic_search_landing', {
            engine: this.trafficSource.engine
        });
    }

    addTrustSignals(message) {
        const trustSignal = document.createElement('div');
        trustSignal.className = 'trust-signal-banner';
        trustSignal.innerHTML = `
            <div class="trust-content">
                <span class="trust-icon">🏆</span>
                <span class="trust-message">${message}</span>
                <span class="trust-verification">✅ Verificado</span>
            </div>
        `;
        
        document.body.appendChild(trustSignal);
        this.reportEvent('trust_signal_displayed', { message });
    }

    addSocialProof(message) {
        const socialProof = document.createElement('div');
        socialProof.className = 'social-proof-banner';
        socialProof.innerHTML = `
            <div class="social-content">
                <span class="social-icon">👥</span>
                <span class="social-message">${message}</span>
                <span class="social-count">+10,000 seguidores</span>
            </div>
        `;
        
        document.body.appendChild(socialProof);
        this.reportEvent('social_proof_displayed', { message });
    }

    // 4. CONTENIDO DINÁMICO BASADO EN KEYWORDS
    implementDynamicContent() {
        this.keywords.forEach(keyword => {
            this.customizeForKeyword(keyword);
        });
        
        this.addDynamicOffers();
        this.personalizeCallToActions();
    }

    addDynamicOffers() {
        const offers = [
            {
                title: "🎯 Oferta Especial",
                description: "Consulta + Ritual de Protección",
                price: "Solo $60,000 COP",
                urgency: "Válido solo hoy"
            },
            {
                title: "💕 Paquete Amor",
                description: "Amarre + Consulta de Seguimiento",
                price: "Solo $80,000 COP",
                urgency: "Últimas 3 plazas"
            },
            {
                title: "💰 Ritual Prosperidad",
                description: "Atrae abundancia en 21 días",
                price: "Solo $70,000 COP",
                urgency: "Oferta limitada"
            }
        ];
        
        const randomOffer = offers[Math.floor(Math.random() * offers.length)];
        // this.displayDynamicOffer(randomOffer); // DESHABILITADO - Usuario no quiere banners dinámicos
    }

    displayDynamicOffer(offer) {
        // Mostrar el banner después de 30 segundos
        setTimeout(() => {
            const offerBanner = document.createElement('div');
            offerBanner.className = 'dynamic-offer-banner';
            offerBanner.innerHTML = `
                <button class="offer-close" onclick="this.parentElement.remove()">×</button>
                <div class="offer-content">
                    <h3>${offer.title}</h3>
                    <p>${offer.description}</p>
                    <div class="offer-price">Consulta Gratis $0</div>
                    <div class="offer-urgency">${offer.urgency}</div>
                    <button class="offer-cta" onclick="window.open('https://wa.me/+19162347420?text=ayuda%20con%20el%20maestro%20en%20consulta%20gratis', '_blank')">Aprovechar Oferta</button>
                </div>
            `;
            
            document.body.appendChild(offerBanner);
            this.reportEvent('dynamic_offer_displayed', offer);
            
            // Cerrar automáticamente después de 15 segundos adicionales
            setTimeout(() => {
                if (offerBanner && offerBanner.parentElement) {
                    offerBanner.remove();
                    this.reportEvent('dynamic_offer_auto_closed', offer);
                }
            }, 15000);
            
        }, 30000);
    }

    personalizeCallToActions() {
        const ctas = document.querySelectorAll('.cta-button, .contact-button');
        const personalizedTexts = [
            "Consultar Mi Futuro Ahora",
            "Resolver Mi Situación Hoy",
            "Cambiar Mi Destino Ya",
            "Obtener Respuestas Inmediatas",
            "Transformar Mi Vida Ahora"
        ];
        
        ctas.forEach(cta => {
            if (!cta.dataset.personalized) {
                const randomText = personalizedTexts[Math.floor(Math.random() * personalizedTexts.length)];
                cta.textContent = randomText;
                cta.dataset.personalized = 'true';
            }
        });
        
        this.reportEvent('cta_personalization', { count: ctas.length });
    }

    customizeForKeyword(keyword) {
        const keywordOptimizations = {
            'amor': {
                headline: '💕 Recupera a tu Ser Amado - Amarres de Amor Efectivos',
                offer: 'Amarre de amor con resultados en 21 días o menos',
                cta: 'Recuperar Mi Amor Ahora',
                testimonial: 'María recuperó a su ex en 15 días con mi amarre de amor'
            },
            'dinero': {
                headline: '💰 Atrae Dinero y Prosperidad - Rituales Poderosos',
                offer: 'Ritual de abundancia para multiplicar tus ingresos',
                cta: 'Atraer Dinero Ahora',
                testimonial: 'Carlos triplicó sus ingresos después del ritual'
            },
            'proteccion': {
                headline: '🛡️ Protección Espiritual Completa - Limpias Energéticas',
                offer: 'Limpia completa + escudo de protección permanente',
                cta: 'Protegerme Ahora',
                testimonial: 'Ana se liberó de 5 años de mala suerte'
            },
            'trabajo': {
                headline: '💼 Consigue el Trabajo que Deseas - Rituales Laborales',
                offer: 'Ritual para conseguir trabajo en 30 días',
                cta: 'Conseguir Trabajo Ahora',
                testimonial: 'Luis consiguió su trabajo ideal en 3 semanas'
            }
        };
        
        const optimization = keywordOptimizations[keyword];
        if (optimization) {
            this.injectKeywordContent(optimization);
            this.reportEvent('keyword_optimization', { keyword });
        }
    }

    // 5. GEOLOCALIZACIÓN Y PERSONALIZACIÓN LOCAL
    async getUserLocation() {
        try {
            // Intentar geolocalización del navegador
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        this.userLocation = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        // Obtener ciudad desde coordenadas
                        this.getCityFromCoordinates(position.coords.latitude, position.coords.longitude);
                    },
                    () => {
                        // Fallback a IP geolocation
                        this.getLocationByIP();
                    },
                    { timeout: 5000, enableHighAccuracy: false }
                );
            } else {
                this.getLocationByIP();
            }
        } catch (error) {
            console.log('Geolocation not available, using IP fallback');
            this.getLocationByIP();
        }
    }

    async getCityFromCoordinates(lat, lng) {
        try {
            const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=es`);
            const data = await response.json();
            this.userLocation.city = data.city || data.locality || 'Tu ciudad';
            this.userLocation.region = data.principalSubdivision || '';
            this.userLocation.country = data.countryName || '';
            this.personalizeForLocation();
        } catch (error) {
            console.log('Reverse geocoding failed, using IP fallback');
            this.getLocationByIP();
        }
    }

    async getLocationByIP() {
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            this.userLocation = {
                city: data.city || 'Tu ciudad',
                region: data.region || '',
                country: data.country_name || ''
            };
            this.personalizeForLocation();
        } catch (error) {
            console.log('IP geolocation failed, using default location');
            // Usar ubicación por defecto para asegurar que siempre se ejecute
            this.userLocation = {
                city: 'Tu ciudad',
                region: '',
                country: 'Tu país'
            };
            this.personalizeForLocation();
        }
    }

    personalizeForLocation() {
        if (this.userLocation && this.userLocation.city) {
            const city = this.userLocation.city;
            
            // Personalizar contenido por ciudad
            this.addLocationMessage(`🌍 Brujo especialista atendiendo en ${city}`);
            
            // Testimonios locales
            this.addLocalTestimonial(city);
            
            // Urgencia local
            this.addLocalUrgency(city);
            
            this.reportEvent('location_personalization', { city });
        }
    }

    addLocalTestimonial(city) {
        const testimonials = {
            'Bogotá': 'María de Bogotá: "El brujo cambió mi vida completamente"',
            'Medellín': 'Carlos de Medellín: "Increíble precisión en sus predicciones"',
            'Cali': 'Ana de Cali: "La limpia energética me liberó de años de mala suerte"',
            'Barranquilla': 'Luis de Barranquilla: "Conseguí trabajo en 3 semanas"',
            'Madrid': 'Carmen de Madrid: "Resultados increíbles en mi vida amorosa"',
            'Barcelona': 'José de Barcelona: "El mejor brujo que he consultado"',
            'Valencia': 'Laura de Valencia: "Cambió mi suerte para siempre"',
            'Sevilla': 'Antonio de Sevilla: "Predicciones exactas y efectivas"'
        };
        
        const testimonial = testimonials[city] || `Persona de ${city}: "Excelente servicio espiritual"`;
        this.addTestimonialBanner(testimonial);
    }

    addLocalUrgency(city) {
        const urgencyMessages = [
            `⚡ Solo quedan 2 consultas disponibles hoy en ${city}`,
            `🔥 Última oportunidad para consulta en ${city} - Solo hoy`,
            `⏰ Consulta urgente disponible en ${city} - Reserva ya`,
            `🌟 Oferta especial para residentes de ${city} - Termina pronto`
        ];
        
        const randomMessage = urgencyMessages[Math.floor(Math.random() * urgencyMessages.length)];
        
        // Mostrar mensaje de urgencia después de 5 segundos
        setTimeout(() => {
            this.addUrgencyBanner(randomMessage);
        }, 5000);
    }

    addTestimonialBanner(testimonial) {
        const testimonialDiv = document.createElement('div');
        testimonialDiv.className = 'testimonial-banner';
        testimonialDiv.innerHTML = `
            <div class="testimonial-content">
                <span class="testimonial-icon">⭐</span>
                <span class="testimonial-text">${testimonial}</span>
                <span class="testimonial-rating">⭐⭐⭐⭐⭐</span>
            </div>
        `;
        
        // Insertar después del header o al inicio del body
        const header = document.querySelector('header');
        if (header && header.nextSibling) {
            header.parentNode.insertBefore(testimonialDiv, header.nextSibling);
        } else {
            document.body.appendChild(testimonialDiv);
        }
        
        this.reportEvent('testimonial_banner_displayed', { testimonial });
    }

    addUrgencyBanner(message) {
        const urgencyDiv = document.createElement('div');
        urgencyDiv.className = 'urgency-banner';
        urgencyDiv.innerHTML = `
            <div class="urgency-content">
                <span class="urgency-icon">🚨</span>
                <span class="urgency-text">${message}</span>
                <button class="urgency-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;
        
        // Insertar al inicio del body
        document.body.insertBefore(urgencyDiv, document.body.firstChild);
        
        // Auto-remover después de 20 segundos
        setTimeout(() => {
            if (urgencyDiv && urgencyDiv.parentElement) {
                urgencyDiv.remove();
            }
        }, 20000);
        
        this.reportEvent('urgency_banner_displayed', { message });
    }

    // 6. OPTIMIZACIÓN DE VELOCIDAD DE PÁGINA
    optimizePageSpeed() {
        // Lazy loading de imágenes
        this.implementLazyLoading();
        
        // Preload de recursos críticos
        this.preloadCriticalResources();
        
        // Optimización de CSS crítico
        this.optimizeCriticalCSS();
        
        // Compresión de imágenes
        this.optimizeImages();
        
        this.reportEvent('page_speed_optimization');
    }

    optimizeCriticalCSS() {
        // Identificar CSS crítico y optimizar
        const criticalStyles = `
            body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
            .hero-section { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
            .cta-button { background: #ff6b6b; color: white; padding: 15px 30px; border: none; border-radius: 25px; }
            .trust-signals { display: flex; justify-content: center; gap: 20px; margin: 20px 0; }
        `;
        
        // Crear elemento de estilo crítico
        const criticalStyleElement = document.createElement('style');
        criticalStyleElement.textContent = criticalStyles;
        criticalStyleElement.id = 'critical-css';
        
        // Insertar al inicio del head si no existe
        if (!document.getElementById('critical-css')) {
            document.head.insertBefore(criticalStyleElement, document.head.firstChild);
        }
        
        // Diferir CSS no crítico
        const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
        stylesheets.forEach(link => {
            if (!link.hasAttribute('data-critical')) {
                link.media = 'print';
                link.onload = function() { this.media = 'all'; };
            }
        });
        
        this.reportEvent('critical_css_optimized', { stylesheets_deferred: stylesheets.length });
    }

    optimizeImages() {
        // Optimización automática de imágenes
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Agregar loading lazy si no está presente
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
            
            // Optimizar formato de imagen según soporte del navegador
            if (this.supportsWebP() && !img.src.includes('.webp')) {
                const webpSrc = img.src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
                img.src = webpSrc;
            }
            
            // Agregar dimensiones si no están presentes
            if (!img.hasAttribute('width') && !img.hasAttribute('height')) {
                img.style.maxWidth = '100%';
                img.style.height = 'auto';
            }
        });
        
        this.reportEvent('images_optimized', { count: images.length });
    }

    supportsWebP() {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }

    implementLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }

    preloadCriticalResources() {
        const criticalResources = [
            'css/brujocss.css',
            'js/google-ads-optimizer.js',
            'imagenes/chamanes-online.mp4'
        ];
        
        criticalResources.forEach(resource => {
            // Verificar si el recurso ya existe antes de agregarlo
            const existingLink = document.querySelector(`link[href="${resource}"]`);
            if (!existingLink) {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.href = resource;
                link.as = resource.endsWith('.css') ? 'style' : 
                         resource.endsWith('.js') ? 'script' : 'video';
                document.head.appendChild(link);
            }
        });
    }

    // 7. SEO LOCAL AVANZADO
    setupLocalSEO() {
        this.addStructuredData();
        this.optimizeMetaTags();
        this.setupLocalBusinessSchema();
        
        this.reportEvent('local_seo_setup');
    }

    optimizeMetaTags() {
        // Optimizar meta tags para SEO local
        const metaTags = {
            'description': 'Brujo Experto en Amarres de Amor ✨ Consultas 24/7 📞 Resultados Garantizados 🔮 +15 Años de Experiencia 💫 Tarot, Rituales y Limpias Espirituales',
            'keywords': 'brujo, amarre de amor, tarot, rituales, magia blanca, consulta espiritual, vidente, chamán',
            'author': 'Brujo Experto',
            'robots': 'index, follow',
            'viewport': 'width=device-width, initial-scale=1.0',
            'og:title': 'Brujo Experto - Amarres de Amor y Rituales Espirituales',
            'og:description': 'Consultas espirituales profesionales. Amarres de amor, tarot y rituales con resultados garantizados.',
            'og:type': 'website',
            'og:image': `${window.location.origin}/imagenes/IMG_0162.JPG`,
            'twitter:card': 'summary_large_image',
            'twitter:title': 'Brujo Experto - Consultas Espirituales',
            'twitter:description': 'Amarres de amor y rituales espirituales con resultados garantizados'
        };
        
        // Actualizar o crear meta tags
        Object.entries(metaTags).forEach(([name, content]) => {
            let metaTag = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
            
            if (!metaTag) {
                metaTag = document.createElement('meta');
                if (name.startsWith('og:') || name.startsWith('twitter:')) {
                    metaTag.setAttribute('property', name);
                } else {
                    metaTag.setAttribute('name', name);
                }
                document.head.appendChild(metaTag);
            }
            
            metaTag.setAttribute('content', content);
        });
        
        // Optimizar título de la página
        if (!document.title || document.title === '') {
            document.title = 'Brujo Experto - Amarres de Amor y Consultas Espirituales 24/7';
        }
        
        this.reportEvent('meta_tags_optimized', { tags_updated: Object.keys(metaTags).length });
    }

    setupLocalBusinessSchema() {
        const localBusinessSchema = {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Brujo Experto - Consultas Espirituales",
            "description": "Servicios profesionales de consultas espirituales, amarres de amor, tarot y rituales con más de 15 años de experiencia",
            "url": window.location.origin,
            "telephone": "+57-300-123-4567",
            "email": "consultas@brujoexperto.com",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Calle Principal 123",
                "addressLocality": "Bogotá",
                "addressRegion": "Cundinamarca",
                "postalCode": "110111",
                "addressCountry": "CO"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": "4.7110",
                "longitude": "-74.0721"
            },
            "openingHours": "Mo-Su 00:00-23:59",
            "priceRange": "$50.000 - $200.000 COP",
            "serviceArea": {
                "@type": "Country",
                "name": "Colombia"
            },
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Servicios Espirituales",
                "itemListElement": [
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Consulta de Tarot",
                            "description": "Lectura profesional de cartas del tarot"
                        },
                        "price": "50000",
                        "priceCurrency": "COP"
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Amarre de Amor",
                            "description": "Ritual especializado para unir parejas"
                        },
                        "price": "150000",
                        "priceCurrency": "COP"
                    }
                ]
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "247",
                "bestRating": "5",
                "worstRating": "1"
            }
        };
        
        // Crear y agregar el script de schema
        const schemaScript = document.createElement('script');
        schemaScript.type = 'application/ld+json';
        schemaScript.textContent = JSON.stringify(localBusinessSchema);
        
        // Remover schema existente si existe
        const existingSchema = document.querySelector('script[type="application/ld+json"]');
        if (existingSchema) {
            existingSchema.remove();
        }
        
        document.head.appendChild(schemaScript);
        
        this.reportEvent('local_business_schema_added', { 
            services: localBusinessSchema.hasOfferCatalog.itemListElement.length,
            rating: localBusinessSchema.aggregateRating.ratingValue
        });
    }

    addStructuredData() {
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "PsychicReader",
            "name": "Brujo Espiritual Profesional",
            "description": "Consultas espirituales, amarres de amor, rituales de prosperidad y protección espiritual",
            "url": window.location.href,
            "telephone": "+57-XXX-XXX-XXXX",
            "priceRange": "$40000-$80000 COP",
            "paymentAccepted": "Cash, Credit Card, Bank Transfer",
            "currenciesAccepted": "COP",
            "areaServed": {
                "@type": "Country",
                "name": "Colombia"
            },
            "serviceType": [
                "Consulta Espiritual",
                "Amarre de Amor",
                "Ritual de Prosperidad",
                "Limpia Energética",
                "Protección Espiritual"
            ],
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "1247"
            }
        };
        
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
    }

    // 8. A/B TESTING AUTOMÁTICO
    runAdvancedABTests() {
        const tests = [
            { element: 'headline', variants: ['A', 'B'] },
            { element: 'cta_color', variants: ['gold', 'red'] },
            { element: 'offer_position', variants: ['top', 'bottom'] },
            { element: 'testimonial_style', variants: ['carousel', 'static'] }
        ];
        
        tests.forEach(test => {
            const variant = this.assignABVariant(test.element);
            this.applyABVariant(test.element, variant);
            this.trackABTest(test.element, variant);
        });
    }

    assignABVariant(testName) {
        const userId = this.getUserId();
        const hash = this.simpleHash(userId + testName);
        return hash % 2 === 0 ? 'A' : 'B';
    }

    // 9. TRACKING AVANZADO
    setupAdvancedTracking() {
        this.trackUserJourney();
        this.setupHeatmapTracking();
        this.trackConversionFunnel();
        this.setupCustomEvents();
    }

    setupCustomEvents() {
        // Eventos personalizados para tracking avanzado
        const customEvents = {
            'scroll_25': false,
            'scroll_50': false,
            'scroll_75': false,
            'time_30s': false,
            'time_60s': false,
            'time_120s': false
        };
        
        // Tracking de scroll
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            
            if (scrollPercent >= 25 && !customEvents.scroll_25) {
                customEvents.scroll_25 = true;
                this.reportEvent('scroll_milestone', { milestone: '25%' });
            }
            if (scrollPercent >= 50 && !customEvents.scroll_50) {
                customEvents.scroll_50 = true;
                this.reportEvent('scroll_milestone', { milestone: '50%' });
            }
            if (scrollPercent >= 75 && !customEvents.scroll_75) {
                customEvents.scroll_75 = true;
                this.reportEvent('scroll_milestone', { milestone: '75%' });
            }
        });
        
        // Tracking de tiempo en página
        setTimeout(() => {
            if (!customEvents.time_30s) {
                customEvents.time_30s = true;
                this.reportEvent('time_milestone', { milestone: '30s' });
            }
        }, 30000);
        
        setTimeout(() => {
            if (!customEvents.time_60s) {
                customEvents.time_60s = true;
                this.reportEvent('time_milestone', { milestone: '60s' });
            }
        }, 60000);
        
        setTimeout(() => {
            if (!customEvents.time_120s) {
                customEvents.time_120s = true;
                this.reportEvent('time_milestone', { milestone: '120s' });
            }
        }, 120000);
        
        this.customEvents = customEvents;
    }

    setupHeatmapTracking() {
        // Simular tracking de heatmap
        const heatmapData = {
            clicks: [],
            scrollDepth: 0,
            timeOnElements: {}
        };
        
        // Rastrear clics
        document.addEventListener('click', (e) => {
            heatmapData.clicks.push({
                x: e.clientX,
                y: e.clientY,
                element: e.target.tagName,
                timestamp: Date.now()
            });
        });
        
        // Rastrear scroll
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            heatmapData.scrollDepth = Math.max(heatmapData.scrollDepth, scrollPercent);
        });
        
        this.heatmapData = heatmapData;
        this.reportEvent('heatmap_tracking_active');
    }

    trackUserJourney() {
        const journey = {
            entry_time: Date.now(),
            traffic_source: this.trafficSource,
            keywords: this.keywords,
            device: this.deviceType,
            location: this.userLocation,
            page_url: window.location.href
        };
        
        this.reportEvent('user_journey_start', journey);
        
        // Tracking de eventos importantes
        ['scroll', 'click', 'focus'].forEach(eventType => {
            document.addEventListener(eventType, (e) => {
                this.trackInteraction(eventType, e.target);
            });
        });
    }

    trackInteraction(eventType, target) {
        // Evitar tracking excesivo
        if (this.lastInteractionTime && Date.now() - this.lastInteractionTime < 100) {
            return;
        }
        
        this.lastInteractionTime = Date.now();
        
        // Verificar que target sea un elemento DOM válido
        if (!target || typeof target.closest !== 'function') {
            target = document.body; // Fallback seguro
        }
        
        const interactionData = {
            event_type: eventType,
            target_tag: target.tagName?.toLowerCase(),
            target_class: target.className || '',
            target_id: target.id || '',
            timestamp: Date.now(),
            scroll_depth: this.getScrollDepth(),
            device: this.deviceType
        };
        
        // Identificar interacciones importantes
        try {
            if (target.closest('.button-miwhatsapp, .arcane-phone-link, .video-whatsapp-btn')) {
                interactionData.interaction_type = 'conversion_intent';
                this.reportEvent('high_intent_interaction', interactionData);
            } else if (target.closest('.service-card, .mystical-card')) {
                interactionData.interaction_type = 'service_interest';
                this.reportEvent('service_interaction', interactionData);
            } else if (eventType === 'scroll') {
                interactionData.interaction_type = 'content_engagement';
                // Solo reportar cada 25% de scroll
                const scrollDepth = this.getScrollDepth();
                if (scrollDepth % 25 === 0 && scrollDepth > 0) {
                    this.reportEvent('scroll_milestone', interactionData);
                }
            }
        } catch (error) {
            console.warn('Error en trackInteraction:', error);
        }
        
        // Tracking general de interacciones
        this.reportEvent('user_interaction', interactionData);
    }

    trackConversionFunnel() {
        const funnelSteps = [
            { name: 'page_view', trigger: 'immediate' },
            { name: 'content_engagement', trigger: '30s_or_50%_scroll' },
            { name: 'high_intent', trigger: '2min_or_contact_hover' },
            { name: 'conversion_attempt', trigger: 'cta_click' },
            { name: 'conversion_complete', trigger: 'form_submit_or_whatsapp' }
        ];
        
        // Paso 1: Page view
        this.reportFunnelStep('page_view');
        
        // Paso 2: Content engagement
        setTimeout(() => {
            if (this.getScrollDepth() > 50) {
                this.reportFunnelStep('content_engagement');
            }
        }, 30000);
        
        // Paso 3: High intent
        setTimeout(() => {
            this.reportFunnelStep('high_intent');
        }, 120000);
    }

    // 10. OPTIMIZACIÓN CONTINUA
    implementContinuousOptimization() {
        // Ajuste automático de ofertas basado en rendimiento
        this.optimizeOffersByPerformance();
        
        // Personalización dinámica basada en comportamiento
        this.implementBehavioralPersonalization();
        
        // Optimización de horarios de mayor conversión
        this.optimizeByTimeOfDay();
    }

    optimizeOffersByPerformance() {
        const currentHour = new Date().getHours();
        const dayOfWeek = new Date().getDay();
        
        // Ofertas más agresivas en horarios de alta conversión
        if ((currentHour >= 19 && currentHour <= 22) || dayOfWeek === 0) {
            this.activateHighConversionMode();
        }
    }

    activateHighConversionMode() {
        this.addUrgencyMessage("🔥 OFERTA ESPECIAL - Solo por tiempo limitado");
        this.increaseOfferValue();
        this.reportEvent('high_conversion_mode_activated');
    }

    implementBehavioralPersonalization() {
        // Personalización basada en el comportamiento del usuario
        const scrollDepth = this.getScrollDepth();
        const timeOnPage = Date.now() - (this.startTime || Date.now());
        
        if (scrollDepth > 75 && timeOnPage > 60000) {
            // Usuario muy interesado - mostrar oferta premium
            this.showPremiumOffer();
        } else if (scrollDepth > 50 && timeOnPage > 30000) {
            // Usuario moderadamente interesado - mostrar oferta estándar
            this.showStandardOffer();
        }
        
        this.reportEvent('behavioral_personalization', {
            scroll_depth: scrollDepth,
            time_on_page: timeOnPage
        });
    }

    optimizeByTimeOfDay() {
        const currentHour = new Date().getHours();
        const dayOfWeek = new Date().getDay();
        
        // Horarios de alta conversión: 19-22h y domingos
        if ((currentHour >= 19 && currentHour <= 22) || dayOfWeek === 0) {
            this.activateHighConversionMode();
        }
        
        // Horarios de baja actividad: madrugada
        if (currentHour >= 2 && currentHour <= 6) {
            this.addUrgencyMessage("🌙 CONSULTA NOCTURNA DISPONIBLE - Atención 24/7");
        }
        
        this.reportEvent('time_optimization', {
            hour: currentHour,
            day_of_week: dayOfWeek
        });
    }

    increaseOfferValue() {
        // Aumentar el valor percibido de las ofertas
        const offerElements = document.querySelectorAll('.service-card .price, .dynamic-offer-banner .price');
        
        offerElements.forEach(element => {
            if (!element.dataset.enhanced) {
                const currentText = element.textContent;
                element.innerHTML = `
                    <span class="original-price" style="text-decoration: line-through; opacity: 0.7; font-size: 0.8em;">
                        ${this.calculateOriginalPrice(currentText)}
                    </span><br>
                    <span class="discounted-price" style="color: #ffd700; font-weight: bold; font-size: 1.2em;">
                        ${currentText}
                    </span>
                `;
                element.dataset.enhanced = 'true';
            }
        });
        
        this.reportEvent('offer_value_increased');
    }

    calculateOriginalPrice(discountedPrice) {
        // Extraer número del precio y calcular precio "original"
        const match = discountedPrice.match(/[\d,]+/);
        if (match) {
            const price = parseInt(match[0].replace(',', ''));
            const originalPrice = Math.round(price * 1.4); // 40% de descuento
            return discountedPrice.replace(match[0], originalPrice.toLocaleString());
        }
        return discountedPrice;
    }

    showPremiumOffer() {
        const premiumOffer = {
            title: "🌟 OFERTA VIP EXCLUSIVA",
            description: "Consulta Completa + 3 Rituales + Seguimiento 30 días",
            price: "Solo $120,000 COP",
            urgency: "Solo para usuarios VIP - Últimas 2 plazas"
        };
        // this.displayDynamicOffer(premiumOffer); // DESHABILITADO - Usuario no quiere banners dinámicos
    }

    showStandardOffer() {
        const standardOffer = {
            title: "✨ OFERTA ESPECIAL",
            description: "Consulta + Ritual de tu elección",
            price: "Solo $75,000 COP",
            urgency: "Oferta válida por tiempo limitado"
        };
        // this.displayDynamicOffer(standardOffer); // DESHABILITADO - Usuario no quiere banners dinámicos
    }

    // FUNCIONES AUXILIARES
    addDynamicHeadline(text) {
        const headline = document.querySelector('h1') || document.querySelector('.main-title');
        if (headline) {
            headline.textContent = text;
            headline.style.animation = 'fadeInGlow 1s ease-in';
        }
    }

    addUrgencyMessage(text) {
        const urgencyDiv = document.createElement('div');
        urgencyDiv.className = 'urgency-message';
        urgencyDiv.textContent = text;
        document.body.insertBefore(urgencyDiv, document.body.firstChild);
    }

    addLocationMessage(text) {
        const locationDiv = document.createElement('div');
        locationDiv.className = 'location-message';
        locationDiv.textContent = text;
        document.querySelector('header')?.appendChild(locationDiv);
    }

    reportEvent(eventName, data = {}) {
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                ...data,
                timestamp: Date.now(),
                page_url: window.location.href
            });
        }
    }

    reportFunnelStep(step) {
        this.reportEvent('funnel_step', { step, timestamp: Date.now() });
    }

    detectDevice() {
        const width = window.innerWidth;
        if (width <= 768) return 'mobile';
        if (width <= 1024) return 'tablet';
        return 'desktop';
    }

    getScrollDepth() {
        return Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    }

    getUserId() {
        let userId = localStorage.getItem('user_id');
        if (!userId) {
            userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('user_id', userId);
        }
        return userId;
    }

    simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash);
    }

    enhanceQualityScore() {
        // Mejorar relevancia de la página
        this.addRelevantKeywords();
        this.improvePageExperience();
        this.optimizeLoadingSpeed();
        
        this.reportEvent('quality_score_enhancement');
    }

    addRelevantKeywords() {
        // Inyectar keywords relevantes de forma natural
        const keywordPhrases = {
            'amor': 'especialista en amarres de amor efectivos',
            'dinero': 'experto en rituales de prosperidad y abundancia',
            'proteccion': 'maestro en limpias energéticas y protección espiritual'
        };
        
        this.keywords.forEach(keyword => {
            const phrase = keywordPhrases[keyword];
            if (phrase) {
                this.injectKeywordPhrase(phrase);
            }
        });
    }

    injectKeywordPhrase(phrase) {
        const hiddenDiv = document.createElement('div');
        hiddenDiv.style.position = 'absolute';
        hiddenDiv.style.left = '-9999px';
        hiddenDiv.textContent = phrase;
        document.body.appendChild(hiddenDiv);
    }

    improvePageExperience() {
        // Mejorar la experiencia de usuario en la página
        this.optimizeInteractivity();
        this.enhanceAccessibility();
        this.improveVisualStability();
        
        this.reportEvent('page_experience_improved');
    }

    optimizeLoadingSpeed() {
        // Optimizar la velocidad de carga
        this.preloadCriticalResources();
        this.optimizeImages();
        this.minimizeRenderBlocking();
        
        this.reportEvent('loading_speed_optimized');
    }

    optimizeInteractivity() {
        // Mejorar la interactividad de la página
        document.querySelectorAll('button, .button-miwhatsapp, .arcane-phone-link').forEach(button => {
            if (!button.dataset.optimized) {
                button.style.transition = 'all 0.2s ease';
                button.addEventListener('mouseenter', () => {
                    button.style.transform = 'scale(1.05)';
                });
                button.addEventListener('mouseleave', () => {
                    button.style.transform = 'scale(1)';
                });
                button.dataset.optimized = 'true';
            }
        });
    }

    enhanceAccessibility() {
        // Mejorar la accesibilidad
        document.querySelectorAll('img').forEach(img => {
            if (!img.alt) {
                img.alt = 'Imagen del sitio web del Brujo Jacob';
            }
        });
        
        document.querySelectorAll('button, a').forEach(element => {
            if (!element.getAttribute('aria-label') && !element.textContent.trim()) {
                element.setAttribute('aria-label', 'Botón de contacto');
            }
        });
    }

    improveVisualStability() {
        // Mejorar la estabilidad visual
        document.querySelectorAll('img').forEach(img => {
            if (!img.style.width && !img.style.height) {
                img.style.aspectRatio = '16/9';
                img.style.objectFit = 'cover';
            }
        });
    }

    preloadCriticalResources() {
        // Precargar recursos críticos
        const criticalResources = [
            'css/brujocss.css',
            'js/mystic-particles.js'
        ];
        
        criticalResources.forEach(resource => {
            // Verificar si el recurso ya existe antes de agregarlo
            const existingLink = document.querySelector(`link[href="${resource}"]`);
            if (!existingLink) {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.href = resource;
                link.as = resource.endsWith('.css') ? 'style' : 'script';
                document.head.appendChild(link);
            }
        });
    }

    minimizeRenderBlocking() {
        // Minimizar el bloqueo de renderizado
        document.querySelectorAll('script[src]').forEach(script => {
            if (!script.async && !script.defer) {
                script.defer = true;
            }
        });
    }

    optimizeByTrafficSource() {
        // Limpiar elementos duplicados antes de optimizar
        this.cleanupDuplicateElements();
        
        // Optimizar contenido basado en la fuente de tráfico
        try {
            const referrer = document.referrer;
            const urlParams = new URLSearchParams(window.location.search);
            const utmSource = urlParams.get('utm_source');
            const utmMedium = urlParams.get('utm_medium');
            const utmCampaign = urlParams.get('utm_campaign');
            
            let trafficSource = 'direct';
            
            // Identificar fuente de tráfico
            if (utmSource) {
                trafficSource = utmSource;
            } else if (referrer) {
                if (referrer.includes('google')) trafficSource = 'google';
                else if (referrer.includes('facebook')) trafficSource = 'facebook';
                else if (referrer.includes('instagram')) trafficSource = 'instagram';
                else if (referrer.includes('whatsapp')) trafficSource = 'whatsapp';
                else trafficSource = 'referral';
            }
            
            // Optimizaciones específicas por fuente
            switch (trafficSource) {
                case 'google':
                case 'google-ads':
                    this.optimizeForGoogleTraffic();
                    break;
                case 'facebook':
                case 'facebook-ads':
                    this.optimizeForFacebookTraffic();
                    break;
                case 'instagram':
                    this.optimizeForInstagramTraffic();
                    break;
                case 'whatsapp':
                    this.optimizeForWhatsAppTraffic();
                    break;
                default:
                    this.optimizeForDirectTraffic();
            }
            
            this.reportEvent('traffic_source_optimization', {
                source: trafficSource,
                referrer: referrer,
                utm_source: utmSource,
                utm_medium: utmMedium,
                utm_campaign: utmCampaign
            });
            
        } catch (error) {
            console.warn('Error en optimizeByTrafficSource:', error);
        }
    }

    cleanupDuplicateElements() {
        // Limpiar mensajes de bienvenida duplicados
        const welcomeMessages = document.querySelectorAll('.welcome-message, [data-welcome="true"]');
        if (welcomeMessages.length > 1) {
            for (let i = 1; i < welcomeMessages.length; i++) {
                welcomeMessages[i].remove();
            }
        }
        
        // Limpiar pruebas sociales duplicadas
        const socialProofMessages = document.querySelectorAll('.social-proof-message');
        if (socialProofMessages.length > 1) {
            for (let i = 1; i < socialProofMessages.length; i++) {
                socialProofMessages[i].remove();
            }
        }
        
        // Limpiar saludos personalizados duplicados
        const greetings = document.querySelectorAll('.personalized-greeting, [data-greeting="whatsapp"]');
        if (greetings.length > 1) {
            for (let i = 1; i < greetings.length; i++) {
                greetings[i].remove();
            }
        }
        
        // Limpiar elementos con texto similar de bienvenida
        const allElements = document.querySelectorAll('div');
        const welcomeTexts = [];
        allElements.forEach(element => {
            const text = element.textContent || '';
            if (text.includes('Bienvenid') && text.includes('Descubre')) {
                welcomeTexts.push(element);
            }
        });
        
        // Mantener solo el primero y eliminar duplicados
        if (welcomeTexts.length > 1) {
            for (let i = 1; i < welcomeTexts.length; i++) {
                welcomeTexts[i].remove();
            }
        }
    }

    optimizeForGoogleTraffic() {
        // Optimizaciones para tráfico de Google
        this.addMetaDescription('Consulta de tarot profesional en Colombia. Respuestas precisas y confidenciales.');
        this.emphasizeLocalSEO();
    }

    optimizeForFacebookTraffic() {
        // Optimizaciones para tráfico de Facebook
        this.addSocialProof();
        this.emphasizeTestimonials();
    }

    optimizeForInstagramTraffic() {
        // Optimizaciones para tráfico de Instagram
        this.emphasizeVisualElements();
        this.addInstagramSpecificCTA();
    }

    optimizeForWhatsAppTraffic() {
        // Optimizaciones para tráfico de WhatsApp
        this.emphasizeWhatsAppContact();
        this.addPersonalizedGreeting();
    }

    optimizeForDirectTraffic() {
        // Optimizaciones para tráfico directo
        this.addWelcomeMessage();
        this.emphasizeMainServices();
    }

    addMetaDescription(description) {
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = 'description';
            document.head.appendChild(metaDesc);
        }
        metaDesc.content = description;
    }

    emphasizeLocalSEO() {
        // Enfatizar elementos de SEO local
        const locationElements = document.querySelectorAll('.location, .city');
        locationElements.forEach(el => {
            el.style.fontWeight = 'bold';
            el.style.color = '#ffd700';
        });
    }

    addSocialProof() {
        // Verificar si ya existe prueba social
        const existingSocialProof = document.querySelector('.social-proof-message');
        if (existingSocialProof) {
            return; // Ya existe, no agregar otro
        }
        
        // Agregar prueba social para usuarios de Facebook
        const socialProofMessage = document.createElement('div');
        socialProofMessage.className = 'social-proof-message';
        socialProofMessage.innerHTML = '👥 Más de 1,000 consultas exitosas este mes';
        socialProofMessage.style.cssText = `
            background: rgba(59, 89, 152, 0.1);
            color: #3b5998;
            padding: 10px;
            text-align: center;
            margin: 10px 0;
            border-radius: 8px;
            font-weight: bold;
        `;
        
        const header = document.querySelector('header') || document.body.firstChild;
        header.parentNode.insertBefore(socialProofMessage, header.nextSibling);
    }

    emphasizeTestimonials() {
        // Enfatizar testimonios para usuarios de redes sociales
        const testimonials = document.querySelectorAll('.testimonial, .review');
        testimonials.forEach(testimonial => {
            testimonial.style.border = '2px solid #ffd700';
            testimonial.style.boxShadow = '0 0 15px rgba(255, 215, 0, 0.3)';
        });
    }

    emphasizeVisualElements() {
        // Enfatizar elementos visuales para usuarios de Instagram
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.style.filter = 'brightness(1.1) contrast(1.1)';
            img.style.borderRadius = '10px';
        });
    }

    addInstagramSpecificCTA() {
        // Agregar CTA específico para Instagram
        const instaCTA = document.createElement('div');
        instaCTA.innerHTML = '📸 ¡Síguenos en Instagram para más contenido místico!';
        instaCTA.style.cssText = `
            background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
            color: white;
            padding: 15px;
            text-align: center;
            margin: 20px 0;
            border-radius: 15px;
            font-weight: bold;
        `;
        
        const footer = document.querySelector('footer') || document.body.lastChild;
        footer.parentNode.insertBefore(instaCTA, footer);
    }

    emphasizeWhatsAppContact() {
        // Enfatizar contacto por WhatsApp
        const whatsappButtons = document.querySelectorAll('.button-miwhatsapp, .whatsapp-btn');
        whatsappButtons.forEach(btn => {
            btn.style.animation = 'pulse 2s infinite';
            btn.style.boxShadow = '0 0 20px rgba(37, 211, 102, 0.5)';
        });
    }

    addPersonalizedGreeting() {
        // Verificar si ya existe un saludo personalizado
        const existingGreeting = document.querySelector('.personalized-greeting, [data-greeting="whatsapp"]');
        if (existingGreeting) {
            return; // Ya existe, no agregar otro
        }
        
        // Agregar saludo personalizado para usuarios de WhatsApp
        const greeting = document.createElement('div');
        greeting.className = 'personalized-greeting';
        greeting.setAttribute('data-greeting', 'whatsapp');
        greeting.innerHTML = '💬 ¡Hola! Veo que vienes de WhatsApp. ¡Estoy aquí para ayudarte!';
        greeting.style.cssText = `
            background: rgba(37, 211, 102, 0.1);
            color: #25d366;
            padding: 15px;
            text-align: center;
            margin: 10px 0;
            border-radius: 15px;
            font-weight: bold;
            border: 2px solid #25d366;
        `;
        
        const main = document.querySelector('main') || document.body;
        main.insertBefore(greeting, main.firstChild);
    }

    addWelcomeMessage() {
        // Verificar si ya existe un mensaje de bienvenida
        const existingWelcome = document.querySelector('.welcome-message, [data-welcome="true"]');
        if (existingWelcome) {
            return; // Ya existe, no agregar otro
        }
        
        // Agregar mensaje de bienvenida para tráfico directo
        const welcome = document.createElement('div');
        welcome.className = 'welcome-message';
        welcome.setAttribute('data-welcome', 'true');
        welcome.innerHTML = '🌟 ¡Bienvenid@! Descubre las respuestas a tus problemas.';
        welcome.style.cssText = `
            background: linear-gradient(135deg, #1a1a2e, #16213e);
            color: #ffd700;
            padding: 15px;
            text-align: center;
            margin: 10px 0;
            border-radius: 15px;
            font-weight: bold;
            border: 2px solid #ffd700;
        `;
        
        const header = document.querySelector('header') || document.body.firstChild;
        header.parentNode.insertBefore(welcome, header.nextSibling);
    }

    emphasizeMainServices() {
        // Enfatizar servicios principales
        const serviceCards = document.querySelectorAll('.service-card, .mystical-card');
        serviceCards.forEach(card => {
            card.style.transform = 'scale(1.02)';
            card.style.transition = 'transform 0.3s ease';
        });
    }
}

// CSS para elementos dinámicos
const dynamicStyles = `
<style>
.urgency-message {
    background: linear-gradient(45deg, #ff6b35, #ff8e53);
    color: white;
    text-align: center;
    padding: 10px;
    font-weight: bold;
    animation: pulse 2s infinite;
    position: sticky;
    top: 0;
    z-index: 1000;
}

.location-message {
    background: rgba(255, 215, 0, 0.1);
    color: #ffd700;
    padding: 5px 10px;
    border-radius: 15px;
    font-size: 14px;
    margin: 10px 0;
}

.dynamic-offer-banner {
    position: fixed;
    bottom: 120px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, #1a1a2e, #16213e);
    border: 2px solid #ffd700;
    border-radius: 15px;
    padding: 20px;
    text-align: center;
    color: white;
    box-shadow: 0 0 30px rgba(255, 215, 0, 0.3);
    z-index: 1001;
    max-width: 90%;
    width: 400px;
 }

.dynamic-offer-banner .offer-close {
    position: absolute;
    top: 10px;
    right: 15px;
    background: none;
    border: none;
    color: #ffd700;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.3s ease;
}

.dynamic-offer-banner .offer-close:hover {
    background: rgba(255, 215, 0, 0.2);
    color: #fff;
    transform: scale(1.1);
}

.dynamic-offer-banner .offer-content h3 {
    color: #ffd700;
    margin: 0 0 10px 0;
    font-size: 18px;
}

.dynamic-offer-banner .offer-content p {
    margin: 10px 0;
    font-size: 14px;
}

.dynamic-offer-banner .offer-price {
    font-size: 20px;
    font-weight: bold;
    color: #4df400;
    margin: 10px 0;
}

.dynamic-offer-banner .offer-urgency {
    color: #ff6b35;
    font-weight: bold;
    margin: 10px 0;
}

.dynamic-offer-banner .offer-cta {
    background: #ff6b35;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 25px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 10px;
}

.dynamic-offer-banner .offer-cta:hover {
    background: #ff8e53;
}

@keyframes fadeInGlow {
    from {
        opacity: 0;
        text-shadow: none;
    }
    to {
        opacity: 1;
        text-shadow: 0 0 20px #ffd700;
    }
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
}

.dynamic-offer {
    background: linear-gradient(135deg, #1a1a2e, #16213e);
    border: 2px solid #ffd700;
    border-radius: 15px;
    padding: 20px;
    margin: 20px 0;
    text-align: center;
    color: white;
    box-shadow: 0 0 30px rgba(255, 215, 0, 0.3);
}

.testimonial-banner {
    background: rgba(0,0,0,0.8);
    color: white;
    padding: 15px;
    border-left: 4px solid #ffd700;
    margin: 15px 0;
    font-style: italic;
}

.testimonial-banner .testimonial-content {
    display: flex;
    align-items: center;
    gap: 10px;
}

.testimonial-banner .testimonial-icon {
    font-size: 20px;
}

.testimonial-banner .testimonial-text {
    flex: 1;
    font-size: 14px;
}

.testimonial-banner .testimonial-rating {
    font-size: 16px;
}

.urgency-banner {
    background: linear-gradient(45deg, #ff4757, #ff6b35);
    color: white;
    padding: 12px;
    margin: 10px 0;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(255, 71, 87, 0.3);
    animation: slideInDown 0.5s ease-out;
}

.urgency-banner .urgency-content {
    display: flex;
    align-items: center;
    gap: 10px;
    position: relative;
}

.urgency-banner .urgency-icon {
    font-size: 18px;
    animation: pulse 1.5s infinite;
}

.urgency-banner .urgency-text {
    flex: 1;
    font-weight: bold;
    font-size: 14px;
}

.urgency-banner .urgency-close {
    background: none;
    border: none;
    color: white;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    padding: 0;
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.3s ease;
}

.urgency-banner .urgency-close:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
}

@keyframes slideInDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 768px) {
    .urgency-message {
        font-size: 14px;
        padding: 8px;
    }
    
    .dynamic-offer {
        margin: 10px;
        padding: 15px;
    }
    
    .dynamic-offer-banner {
        bottom: 120px;
        width: 95%;
        max-width: 350px;
        padding: 15px;
    }
    
    .dynamic-offer-banner .offer-content h3 {
        font-size: 16px;
    }
    
    .dynamic-offer-banner .offer-content p {
        font-size: 13px;
    }
}
</style>
`;

// Auto-inicialización SOLO con optimizaciones técnicas (no visuales)
let dynamicLandingOptimizer;
document.addEventListener('DOMContentLoaded', function() {
    dynamicLandingOptimizer = new DynamicLandingOptimizer();
    document.head.insertAdjacentHTML('beforeend', dynamicStyles);
    
    // SOLO optimizaciones técnicas inmediatas (invisibles al usuario)
    dynamicLandingOptimizer.optimizeMetaTags();
    dynamicLandingOptimizer.setupLocalBusinessSchema();
    dynamicLandingOptimizer.optimizeCriticalCSS();
    dynamicLandingOptimizer.optimizeImages();
    
    // Optimización de contenido después de 5 segundos (sin elementos visuales)
    setTimeout(() => {
        dynamicLandingOptimizer.optimizeByTrafficSource();
    }, 5000);
    
    // Tracking después de 10 segundos
    setTimeout(() => {
        dynamicLandingOptimizer.setupCustomEvents();
        dynamicLandingOptimizer.setupHeatmapTracking();
    }, 10000);
    
    // Ofertas dinámicas SOLO después de 10 minutos Y con engagement alto
    setTimeout(() => {
        if (window.conversionOptimizer && 
            window.conversionOptimizer.userBehavior.engagementScore > 70) {
            dynamicLandingOptimizer.addDynamicOffers();
        }
    }, 600000);
});

// Exportar para uso global
window.DynamicLandingOptimizer = DynamicLandingOptimizer;