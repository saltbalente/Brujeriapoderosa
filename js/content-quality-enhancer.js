/**
 * Content Quality Enhancer para Google Ads
 * Mejora la relevancia del contenido y la experiencia del usuario
 * Optimiza específicamente para Quality Score de Google Ads
 */

class ContentQualityEnhancer {
    constructor() {
        this.semanticKeywords = {
            'servicios_espirituales': [
                'consulta espiritual', 'guía espiritual', 'orientación mística',
                'sabiduría ancestral', 'conexión espiritual', 'energía positiva'
            ],
            'amarres_amor': [
                'unión de parejas', 'reconciliación amorosa', 'fortalecimiento de vínculos',
                'armonía en el amor', 'atracción sentimental', 'estabilidad emocional'
            ],
            'rituales_tradicionales': [
                'ceremonias ancestrales', 'prácticas tradicionales', 'rituales personalizados',
                'tradición espiritual', 'sabiduría heredada', 'métodos comprobados'
            ],
            'resultados_profesionales': [
                'experiencia comprobada', 'resultados efectivos', 'garantía de calidad',
                'profesionalismo', 'confidencialidad', 'atención personalizada'
            ]
        };
        
        this.contentRelevanceScore = 0;
        this.userEngagementMetrics = {
            readingTime: 0,
            contentInteractions: 0,
            semanticMatches: 0
        };
        
        this.init();
    }

    init() {
        console.log('📝 Content Quality Enhancer iniciado');
        this.enhanceSemanticRelevance();
        this.setupReadabilityOptimization();
        this.implementContentPersonalization();
        this.setupContentAnalytics();
        this.optimizeForLocalSEO();
        this.enhanceUserIntent();
    }

    // Mejora la relevancia semántica del contenido
    enhanceSemanticRelevance() {
        const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div');
        
        textElements.forEach(element => {
            const text = element.textContent.toLowerCase();
            
            // Analizar y enriquecer contenido existente
            Object.entries(this.semanticKeywords).forEach(([category, keywords]) => {
                keywords.forEach(keyword => {
                    if (text.includes(keyword.split(' ')[0])) {
                        this.userEngagementMetrics.semanticMatches++;
                        element.setAttribute('data-semantic-category', category);
                        element.setAttribute('data-keyword-relevance', 'high');
                    }
                });
            });
        });

        // Agregar contenido semánticamente rico
        this.addSemanticContent();
    }

    addSemanticContent() {
        // Agregar contenido contextual invisible para SEO
        const semanticContainer = document.createElement('div');
        semanticContainer.style.cssText = `
            position: absolute;
            left: -9999px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;
        
        semanticContainer.innerHTML = `
            <span itemscope itemtype="https://schema.org/Service">
                <span itemprop="name">Servicios Espirituales Profesionales</span>
                <span itemprop="description">Consultas espirituales con experiencia comprobada y resultados efectivos</span>
                <span itemprop="serviceType">Consulta Espiritual</span>
                <span itemprop="provider" itemscope itemtype="https://schema.org/Person">
                    <span itemprop="name">Brujo Profesional Certificado</span>
                    <span itemprop="expertise">Rituales Tradicionales y Amarres de Amor</span>
                </span>
            </span>
        `;
        
        document.body.appendChild(semanticContainer);
    }

    // Optimización de legibilidad
    setupReadabilityOptimization() {
        // Mejorar estructura del contenido
        this.optimizeContentStructure();
        
        // Agregar navegación interna
        this.addInternalNavigation();
        
        // Optimizar párrafos y espaciado
        this.optimizeTextLayout();
    }

    optimizeContentStructure() {
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        
        headings.forEach((heading, index) => {
            // Agregar IDs únicos para navegación
            if (!heading.id) {
                heading.id = `section-${index + 1}`;
            }
            
            // Mejorar accesibilidad
            heading.setAttribute('role', 'heading');
            heading.setAttribute('aria-level', heading.tagName.charAt(1));
            
            // Agregar indicadores de relevancia
            const relevantKeywords = this.findRelevantKeywords(heading.textContent);
            if (relevantKeywords.length > 0) {
                heading.setAttribute('data-content-relevance', 'high');
                heading.setAttribute('data-keywords', relevantKeywords.join(','));
            }
        });
    }

    findRelevantKeywords(text) {
        const foundKeywords = [];
        const lowerText = text.toLowerCase();
        
        Object.values(this.semanticKeywords).flat().forEach(keyword => {
            if (lowerText.includes(keyword.toLowerCase())) {
                foundKeywords.push(keyword);
            }
        });
        
        return foundKeywords;
    }

    addInternalNavigation() {
        // Crear navegación por ciudades de USA
        this.createCityNavigation();
        
        const headings = document.querySelectorAll('h2, h3');
        if (headings.length > 2) {
            const nav = document.createElement('nav');
            nav.className = 'content-navigation';
            nav.setAttribute('aria-label', 'Navegación de contenido');
            nav.style.cssText = `
                background: rgba(114, 47, 55, 0.08);
                padding: 12px;
                border-radius: 6px;
                margin: 15px 0;
                border-left: 3px solid #722f37;
                box-shadow: 0 2px 8px rgba(114, 47, 55, 0.1);
            `;
            
            const navTitle = document.createElement('h4');
            navTitle.textContent = '📋 Contenido de la página';
            navTitle.style.cssText = `
                color: #722f37;
                font-size: 14px;
                margin: 0 0 8px 0;
                font-weight: 600;
            `;
            
            const navList = document.createElement('ul');
            navList.style.cssText = `
                list-style: none;
                padding: 0;
                margin: 0;
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
            `;
            
            headings.forEach(heading => {
                const listItem = document.createElement('li');
                listItem.style.cssText = `
                    margin: 0;
                    display: inline-block;
                `;
                
                const link = document.createElement('a');
                link.href = `#${heading.id}`;
                link.textContent = heading.textContent;
                link.style.cssText = `
                    color: #722f37;
                    text-decoration: none;
                    font-size: 11px;
                    font-weight: 400;
                    padding: 4px 8px;
                    background: rgba(255, 255, 255, 0.7);
                    border-radius: 12px;
                    border: 1px solid rgba(114, 47, 55, 0.2);
                    transition: all 0.2s ease;
                    display: inline-block;
                `;
                
                link.addEventListener('mouseenter', () => {
                    link.style.background = '#722f37';
                    link.style.color = 'white';
                    link.style.transform = 'translateY(-1px)';
                });
                
                link.addEventListener('mouseleave', () => {
                    link.style.background = 'rgba(255, 255, 255, 0.7)';
                    link.style.color = '#722f37';
                    link.style.transform = 'translateY(0)';
                });
                
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    heading.scrollIntoView({ behavior: 'smooth' });
                    this.trackContentInteraction('internal_navigation', heading.textContent);
                });
                
                listItem.appendChild(link);
                navList.appendChild(listItem);
            });
            
            nav.appendChild(navTitle);
            nav.appendChild(navList);
            
            // Insertar después del primer párrafo
            const firstParagraph = document.querySelector('p');
            if (firstParagraph) {
                firstParagraph.parentNode.insertBefore(nav, firstParagraph.nextSibling);
            }
        }
    }

    createCityNavigation() {
        const cities = [
            { name: 'New York', state: 'NY', emoji: '🗽' },
            { name: 'Los Angeles', state: 'CA', emoji: '🌴' },
            { name: 'Miami', state: 'FL', emoji: '🏖️' },
            { name: 'Houston', state: 'TX', emoji: '🤠' },
            { name: 'Chicago', state: 'IL', emoji: '🏙️' },
            { name: 'Phoenix', state: 'AZ', emoji: '🌵' },
            { name: 'Philadelphia', state: 'PA', emoji: '🔔' },
            { name: 'San Antonio', state: 'TX', emoji: '⭐' },
            { name: 'San Diego', state: 'CA', emoji: '🌊' },
            { name: 'Dallas', state: 'TX', emoji: '🏢' },
            { name: 'San Jose', state: 'CA', emoji: '💻' },
            { name: 'Austin', state: 'TX', emoji: '🎸' }
        ];

        const cityNav = document.createElement('nav');
        cityNav.className = 'city-navigation';
        cityNav.setAttribute('aria-label', 'Servicios por ciudades');
        cityNav.style.cssText = `
            background: linear-gradient(135deg, rgba(114, 47, 55, 0.05), rgba(255, 215, 0, 0.05));
            padding: 10px;
            border-radius: 8px;
            margin: 15px 0;
            border: 1px solid rgba(114, 47, 55, 0.15);
            text-align: center;
        `;

        const cityTitle = document.createElement('h4');
        cityTitle.textContent = '🇺🇸 Servicios Espirituales en Estados Unidos';
        cityTitle.style.cssText = `
            color: #722f37;
            font-size: 13px;
            margin: 0 0 10px 0;
            font-weight: 600;
        `;

        const cityList = document.createElement('div');
        cityList.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 6px;
            margin: 0;
        `;

        cities.forEach(city => {
            const cityLink = document.createElement('a');
            cityLink.href = '#servicios';
            cityLink.textContent = `${city.emoji} ${city.name}, ${city.state}`;
            cityLink.style.cssText = `
                color: #722f37;
                text-decoration: none;
                font-size: 10px;
                font-weight: 500;
                padding: 3px 6px;
                background: rgba(255, 255, 255, 0.8);
                border-radius: 10px;
                border: 1px solid rgba(114, 47, 55, 0.2);
                transition: all 0.2s ease;
                display: inline-block;
                white-space: nowrap;
            `;

            cityLink.addEventListener('mouseenter', () => {
                cityLink.style.background = '#722f37';
                cityLink.style.color = '#ffd700';
                cityLink.style.transform = 'scale(1.05)';
                cityLink.style.boxShadow = '0 2px 8px rgba(114, 47, 55, 0.3)';
            });

            cityLink.addEventListener('mouseleave', () => {
                cityLink.style.background = 'rgba(255, 255, 255, 0.8)';
                cityLink.style.color = '#722f37';
                cityLink.style.transform = 'scale(1)';
                cityLink.style.boxShadow = 'none';
            });

            cityLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.trackContentInteraction('city_navigation', `${city.name}, ${city.state}`);
                
                // Scroll suave a la sección de servicios
                const servicesSection = document.querySelector('#servicios') || document.querySelector('.services') || document.querySelector('main');
                if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: 'smooth' });
                }
                
                // Mostrar mensaje personalizado
                this.showCityMessage(city);
            });

            cityList.appendChild(cityLink);
        });

        cityNav.appendChild(cityTitle);
        cityNav.appendChild(cityList);

        // Insertar al inicio del contenido principal
        const main = document.querySelector('main') || document.querySelector('.container') || document.body;
        const firstChild = main.firstElementChild;
        if (firstChild) {
            main.insertBefore(cityNav, firstChild);
        } else {
            main.appendChild(cityNav);
        }
    }

    showCityMessage(city) {
        // Crear mensaje temporal personalizado por ciudad
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #722f37, #8b3a42);
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            font-size: 12px;
            z-index: 1000;
            box-shadow: 0 4px 15px rgba(114, 47, 55, 0.4);
            animation: slideInRight 0.3s ease-out;
        `;
        
        message.innerHTML = `
            ${city.emoji} <strong>Servicios en ${city.name}, ${city.state}</strong><br>
            <span style="font-size: 10px; opacity: 0.9;">Consulta disponible las 24 horas</span>
        `;

        document.body.appendChild(message);

        // Remover después de 3 segundos
        setTimeout(() => {
            message.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                if (message.parentNode) {
                    message.parentNode.removeChild(message);
                }
            }, 300);
        }, 3000);
    }

    optimizeTextLayout() {
        const paragraphs = document.querySelectorAll('p');
        
        paragraphs.forEach(p => {
            const wordCount = p.textContent.split(' ').length;
            
            // Optimizar párrafos largos
            if (wordCount > 50) {
                p.style.lineHeight = '1.6';
                p.style.marginBottom = '1.2em';
                p.setAttribute('data-readability', 'optimized');
            }
            
            // Agregar indicadores de tiempo de lectura
            if (wordCount > 30) {
                const readingTime = Math.ceil(wordCount / 200); // 200 palabras por minuto
                p.setAttribute('data-reading-time', `${readingTime} min`);
            }
        });
    }

    // Personalización de contenido basada en comportamiento
    implementContentPersonalization() {
        // Detectar intereses del usuario
        this.detectUserInterests();
        
        // Personalizar CTAs
        this.personalizeCTAs();
        
        // Adaptar contenido según tiempo en página
        this.adaptContentByEngagement();
    }

    detectUserInterests() {
        const interactionElements = document.querySelectorAll('[data-semantic-category]');
        const interests = {};
        
        interactionElements.forEach(element => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const category = entry.target.getAttribute('data-semantic-category');
                        interests[category] = (interests[category] || 0) + 1;
                        
                        // Personalizar contenido basado en intereses
                        if (interests[category] > 2) {
                            this.highlightRelatedContent(category);
                        }
                        
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.7 });
            
            observer.observe(element);
        });
        
        this.userInterests = interests;
    }

    highlightRelatedContent(category) {
        const relatedElements = document.querySelectorAll(`[data-semantic-category="${category}"]`);
        
        relatedElements.forEach(element => {
            element.style.cssText += `
                background: linear-gradient(135deg, rgba(114, 47, 55, 0.05), rgba(255, 215, 0, 0.05));
                padding: 8px;
                border-radius: 4px;
                border-left: 3px solid #722f37;
                margin: 5px 0;
                transition: all 0.3s ease;
            `;
            
            element.setAttribute('data-personalized', 'true');
        });
        
        this.trackContentInteraction('content_personalization', category);
    }

    personalizeCTAs() {
        const ctaButtons = document.querySelectorAll('.mystic-button, .arcane-cta-btn, .button-miwhatsapp');
        
        ctaButtons.forEach(button => {
            const originalText = button.textContent;
            
            // Personalizar texto según intereses detectados
            setTimeout(() => {
                if (this.userInterests) {
                    const topInterest = Object.keys(this.userInterests).reduce((a, b) => 
                        this.userInterests[a] > this.userInterests[b] ? a : b
                    );
                    
                    if (topInterest === 'amarres_amor') {
                        button.innerHTML = `💕 ${originalText} - Especialista en Amor`;
                    } else if (topInterest === 'servicios_espirituales') {
                        button.innerHTML = `🔮 ${originalText} - Consulta Espiritual`;
                    }
                    
                    button.setAttribute('data-personalized-cta', topInterest);
                }
            }, 10000); // Después de 10 segundos
        });
    }

    adaptContentByEngagement() {
        let timeOnPage = 0;
        
        setInterval(() => {
            timeOnPage += 1;
            
            // Después de 30 segundos, mostrar contenido adicional
            if (timeOnPage === 30) {
                this.showEngagementContent();
            }
            
            // Después de 60 segundos, mostrar testimonios
            if (timeOnPage === 60) {
                this.showTestimonials();
            }
            
            // Después de 90 segundos, mostrar oferta especial
            if (timeOnPage === 90) {
                this.showSpecialOffer();
            }
        }, 1000);
    }

    showEngagementContent() {
        const engagementBox = document.createElement('div');
        engagementBox.className = 'engagement-content';
        engagementBox.style.cssText = `
            background: linear-gradient(135deg, #722f37, #8b3a42);
            color: white;
            padding: 20px;
            border-radius: 12px;
            margin: 20px 0;
            text-align: center;
            box-shadow: 0 8px 25px rgba(114, 47, 55, 0.3);
            animation: slideInUp 0.6s ease-out;
        `;
        
        engagementBox.innerHTML = `
            <h3 style="margin: 0 0 10px 0; color: #ffd700;">✨ Información Exclusiva</h3>
            <p style="margin: 0; font-size: 16px; line-height: 1.5;">
                Has demostrado interés genuino en nuestros servicios. 
                Como reconocimiento, te ofrecemos una consulta inicial gratuita de 10 minutos.
            </p>
        `;
        
        // Insertar después del primer párrafo visible
        const firstVisibleP = document.querySelector('p');
        if (firstVisibleP) {
            firstVisibleP.parentNode.insertBefore(engagementBox, firstVisibleP.nextSibling);
        }
        
        this.trackContentInteraction('engagement_content_shown', 'high_engagement');
    }

    showTestimonials() {
        const testimonialsContainer = document.createElement('div');
        testimonialsContainer.className = 'dynamic-testimonials';
        testimonialsContainer.style.cssText = `
            background: rgba(255, 215, 0, 0.1);
            border: 2px solid #ffd700;
            border-radius: 10px;
            padding: 20px;
            margin: 25px 0;
        `;
        
        testimonialsContainer.innerHTML = `
            <div style="position: relative; background: linear-gradient(135deg,rgb(0, 0, 0) 0%,rgb(0, 0, 0) 100%); border-radius: 12px; padding: 20px; border: 2px solid #dee2e6; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                <button class="close-testimonials" style="position: absolute; top: 10px; right: 15px; background: #dc3545; color: white; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; font-size: 16px; font-weight: bold; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease; z-index: 10;">×</button>
                <h3 style="color: #722f37; text-align: center; margin-bottom: 15px; font-size: 18px;">
                    🌟 Lo que dicen nuestros consultantes
                </h3>
                <div style="display: grid; gap: 12px;">
                    <blockquote style="margin: 0; padding: 12px; background: rgba(0, 0, 0, 0.8); border-radius: 8px; border-left: 4px solid #722f37;">
                        <p style="margin: 0 0 8px 0; font-style: italic; font-size: 13px; line-height: 1.4;">"Después de meses de dudas, por fin encontré las respuestas que buscaba. ¡Gracias!"</p>
                        <cite style="color: #722f37; font-weight: bold; font-size: 11px;">- José Martinez, Los Angeles, CA</cite>
                    </blockquote>
                    <blockquote style="margin: 0; padding: 12px; background: rgba(0, 0, 0, 0.8); border-radius: 8px; border-left: 4px solid #722f37;">
                        <p style="margin: 0 0 8px 0; font-style: italic; font-size: 13px; line-height: 1.4;">"La mejor decisión que tomé fue consultar sus servicios. Mi vida dio un giro positivo."</p>
                        <cite style="color: #722f37; font-weight: bold; font-size: 11px;">- Carmen Herrera, Houston, TX</cite>
                    </blockquote>
                    <blockquote style="margin: 0; padding: 12px; background: rgba(0, 0, 0, 0.8); border-radius: 8px; border-left: 4px solid #722f37;">
                        <p style="margin: 0 0 8px 0; font-style: italic; font-size: 13px; line-height: 1.4;">"Excelente atención y resultados sorprendentes. Muy agradecida por su ayuda."</p>
                        <cite style="color: #722f37; font-weight: bold; font-size: 11px;">- Isabella Morales, New York, NY</cite>
                    </blockquote>
                    <blockquote style="margin: 0; padding: 12px; background: rgba(0, 0, 0, 0.8); border-radius: 8px; border-left: 4px solid #722f37;">
                        <p style="margin: 0 0 8px 0; font-style: italic; font-size: 13px; line-height: 1.4;">"Sus rituales son muy efectivos. Mi relación mejoró notablemente en poco tiempo."</p>
                        <cite style="color: #722f37; font-weight: bold; font-size: 11px;">- Miguel Flores, Chicago, IL</cite>
                    </blockquote>
                </div>
            </div>
        `;
        
        // Insertar antes del último párrafo
        const lastP = Array.from(document.querySelectorAll('p')).pop();
        if (lastP) {
            lastP.parentNode.insertBefore(testimonialsContainer, lastP);
        }
        
        // Agregar funcionalidad al botón de cerrar
        const closeButton = testimonialsContainer.querySelector('.close-testimonials');
        if (closeButton) {
            closeButton.addEventListener('mouseenter', () => {
                closeButton.style.background = '#c82333';
                closeButton.style.transform = 'scale(1.1)';
            });
            
            closeButton.addEventListener('mouseleave', () => {
                closeButton.style.background = '#dc3545';
                closeButton.style.transform = 'scale(1)';
            });
            
            closeButton.addEventListener('click', () => {
                testimonialsContainer.style.transition = 'all 0.3s ease';
                testimonialsContainer.style.opacity = '0';
                testimonialsContainer.style.transform = 'translateY(-20px)';
                
                setTimeout(() => {
                    if (testimonialsContainer.parentNode) {
                        testimonialsContainer.remove();
                    }
                }, 300);
            });
        }
        
        this.trackContentInteraction('testimonials_shown', 'social_proof');
    }

    showSpecialOffer() {
        const offerBanner = document.createElement('div');
        offerBanner.className = 'special-offer-banner';
        offerBanner.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #722f37, #ffd700);
            color: white;
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 1000;
            max-width: 300px;
            animation: bounceIn 0.8s ease-out;
        `;
        
        offerBanner.innerHTML = `
            <div style="text-align: center;">
                <h4 style="margin: 0 0 10px 0; color: #ffd700;">🎁 Oferta Especial</h4>
                <p style="margin: 0 0 15px 0; font-size: 14px;">
                    Por tu interés demostrado: <strong>20% de descuento</strong> en tu primera consulta
                </p>
                <button onclick="window.open('https://wa.me/+12545956299?text=ayuda%20con%20el%20maestro%20en%20consulta%20gratis', '_blank'); this.parentElement.parentElement.remove();" style="
                    background: #ffd700;
                    color: #722f37;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 25px;
                    font-weight: bold;
                    cursor: pointer;
                    width: 100%;
                ">¡Aprovechar Oferta!</button>
            </div>
        `;
        
        document.body.appendChild(offerBanner);
        
        // Auto-remover después de 30 segundos
        setTimeout(() => {
            if (offerBanner.parentNode) {
                offerBanner.remove();
            }
        }, 30000);
        
        this.trackContentInteraction('special_offer_shown', 'conversion_incentive');
    }

    // Optimización para SEO local
    optimizeForLocalSEO() {
        // Agregar datos estructurados locales
        this.addLocalBusinessData();
        
        // Optimizar para búsquedas locales
        this.enhanceLocalKeywords();
    }

    addLocalBusinessData() {
        const localBusinessSchema = {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Servicios Espirituales Profesionales",
            "description": "Consultas espirituales, amarres de amor y rituales tradicionales con experiencia comprobada",
            "serviceArea": {
                "@type": "Country",
                "name": "Estados Unidos"
            },
            "areaServed": ["Estados Unidos", "Latinoamérica"],
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Servicios Espirituales",
                "itemListElement": [
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Consulta Espiritual",
                            "description": "Orientación y guía espiritual personalizada"
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Amarre de Amor",
                            "description": "Rituales tradicionales para unión de parejas"
                        }
                    }
                ]
            }
        };
        
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(localBusinessSchema);
        document.head.appendChild(script);
    }

    enhanceLocalKeywords() {
        const localKeywords = [
            'servicios espirituales estados unidos',
            'brujo profesional usa',
            'consultas místicas online',
            'amarres de amor internacionales'
        ];
        
        // Agregar keywords locales al meta
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
            metaKeywords.content += ', ' + localKeywords.join(', ');
        }
    }

    // Mejora de intención del usuario
    enhanceUserIntent() {
        // Detectar intención de búsqueda
        this.detectSearchIntent();
        
        // Optimizar para diferentes tipos de consultas
        this.optimizeForQueryTypes();
    }

    detectSearchIntent() {
        const urlParams = new URLSearchParams(window.location.search);
        const referrer = document.referrer;
        
        let intent = 'general';
        
        // Analizar parámetros de URL
        if (urlParams.get('q') || urlParams.get('query')) {
            const query = (urlParams.get('q') || urlParams.get('query')).toLowerCase();
            
            if (query.includes('amor') || query.includes('pareja')) {
                intent = 'love_related';
            } else if (query.includes('consulta') || query.includes('tarot')) {
                intent = 'consultation';
            } else if (query.includes('ritual') || query.includes('ceremonia')) {
                intent = 'ritual_service';
            }
        }
        
        // Analizar referrer
        if (referrer.includes('google')) {
            intent += '_google_search';
        } else if (referrer.includes('facebook') || referrer.includes('instagram')) {
            intent += '_social_media';
        }
        
        this.userIntent = intent;
        this.adaptContentToIntent(intent);
    }

    adaptContentToIntent(intent) {
        const mainHeading = document.querySelector('h1');
        
        if (intent.includes('love_related')) {
            // Enfatizar servicios de amor
            const loveElements = document.querySelectorAll('[data-semantic-category="amarres_amor"]');
            loveElements.forEach(el => {
                el.style.cssText += 'background: rgba(255, 192, 203, 0.1); border-left: 3px solid #ff69b4;';
            });
        } else if (intent.includes('consultation')) {
            // Enfatizar consultas
            const consultElements = document.querySelectorAll('[data-semantic-category="servicios_espirituales"]');
            consultElements.forEach(el => {
                el.style.cssText += 'background: rgba(138, 43, 226, 0.1); border-left: 3px solid #8a2be2;';
            });
        }
        
        this.trackContentInteraction('intent_adaptation', intent);
    }

    optimizeForQueryTypes() {
        // Optimizar para consultas informacionales
        this.addFAQSection();
        
        // Optimizar para consultas transaccionales
        this.enhanceCallToActions();
    }

    addFAQSection() {
        const faqSection = document.createElement('section');
        faqSection.className = 'faq-section';
        faqSection.style.cssText = `
            background:rgb(0, 0, 0);
            padding: 30px;
            border-radius: 10px;
            margin: 30px 0;
        `;
        
        faqSection.innerHTML = `
            <h3 style="color:rgb(255, 255, 255); text-align: center; margin-bottom: 25px;">
                ❓ Preguntas Frecuentes
            </h3>
            <div itemscope itemtype="https://schema.org/FAQPage">
                <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                    <h4 itemprop="name" style="color: #722f37; margin-bottom: 10px;">¿Cómo funcionan los servicios espirituales?</h4>
                    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                        <p itemprop="text">Nuestros servicios se basan en tradiciones ancestrales y métodos comprobados, adaptados a las necesidades específicas de cada persona.</p>
                    </div>
                </div>
                <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                    <h4 itemprop="name" style="color: #722f37; margin: 20px 0 10px 0;">¿Qué garantías ofrecen?</h4>
                    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                        <p itemprop="text">Ofrecemos total confidencialidad, atención personalizada y seguimiento completo de cada caso hasta obtener los resultados deseados.</p>
                    </div>
                </div>
            </div>
        `;
        
        // Insertar antes del footer o al final del contenido principal
        const main = document.querySelector('main') || document.body;
        main.appendChild(faqSection);
    }

    enhanceCallToActions() {
        const ctas = document.querySelectorAll('.mystic-button, .arcane-cta-btn');
        
        ctas.forEach(cta => {
            // Agregar urgencia y valor
            if (!cta.querySelector('.cta-enhancement')) {
                const enhancement = document.createElement('span');
                enhancement.className = 'cta-enhancement';
                enhancement.style.cssText = `
                    display: block;
                    font-size: 12px;
                    color: #ffd700;
                    margin-top: 5px;
                `;
                enhancement.textContent = '✨ Consulta inicial gratuita';
                cta.appendChild(enhancement);
            }
        });
    }

    // Analytics y tracking
    setupContentAnalytics() {
        this.trackReadingBehavior();
        this.trackContentEngagement();
        this.reportContentQuality();
    }

    trackReadingBehavior() {
        let readingStartTime = Date.now();
        let wordsRead = 0;
        
        const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6');
        
        textElements.forEach(element => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const words = entry.target.textContent.split(' ').length;
                        wordsRead += words;
                        
                        // Calcular velocidad de lectura
                        const timeElapsed = (Date.now() - readingStartTime) / 1000;
                        const readingSpeed = wordsRead / (timeElapsed / 60); // palabras por minuto
                        
                        this.userEngagementMetrics.readingTime = timeElapsed;
                        
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.8 });
            
            observer.observe(element);
        });
    }

    trackContentEngagement() {
        // Tracking de interacciones con contenido
        document.addEventListener('click', (e) => {
            if (e.target.matches('a, button, [data-semantic-category]')) {
                this.userEngagementMetrics.contentInteractions++;
                this.trackContentInteraction('content_click', e.target.textContent.trim());
            }
        });
        
        // Tracking de selección de texto
        document.addEventListener('selectionchange', () => {
            const selection = window.getSelection();
            if (selection.toString().length > 10) {
                this.trackContentInteraction('text_selection', selection.toString().substring(0, 50));
            }
        });
    }

    trackContentInteraction(action, details) {
        const eventData = {
            action: action,
            details: details,
            timestamp: Date.now(),
            userIntent: this.userIntent,
            contentRelevance: this.contentRelevanceScore
        };
        
        // Enviar a Google Analytics si está disponible
        if (typeof gtag !== 'undefined') {
            gtag('event', 'content_interaction', {
                event_category: 'content_quality',
                event_label: action,
                custom_parameter_1: details,
                value: 1
            });
        }
        
        console.log('📊 Content Interaction:', eventData);
    }

    reportContentQuality() {
        // Calcular score de calidad de contenido
        setInterval(() => {
            this.contentRelevanceScore = this.calculateContentQuality();
            
            if (this.contentRelevanceScore > 80) {
                this.trackContentInteraction('high_quality_content', `Score: ${this.contentRelevanceScore}`);
            }
        }, 30000); // Cada 30 segundos
    }

    calculateContentQuality() {
        let score = 0;
        
        // Factores de calidad
        score += Math.min(this.userEngagementMetrics.semanticMatches * 5, 30); // Relevancia semántica
        score += Math.min(this.userEngagementMetrics.readingTime / 60 * 10, 25); // Tiempo de lectura
        score += Math.min(this.userEngagementMetrics.contentInteractions * 3, 20); // Interacciones
        score += document.querySelectorAll('[data-personalized="true"]').length * 2; // Personalización
        score += document.querySelectorAll('[data-content-relevance="high"]').length; // Relevancia de headings
        
        return Math.min(score, 100);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎯 Iniciando Content Quality Enhancer...');
    new ContentQualityEnhancer();
});

// Agregar estilos para animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            transform: translateY(30px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes bounceIn {
        0% {
            transform: scale(0.3) translateY(100px);
            opacity: 0;
        }
        50% {
            transform: scale(1.05);
        }
        70% {
            transform: scale(0.9);
        }
        100% {
            transform: scale(1) translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .content-navigation a:hover {
        color: #ffd700 !important;
        text-decoration: underline !important;
    }
    
    .city-navigation a {
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }
    
    .city-navigation a:hover {
        transform: scale(1.05) !important;
        box-shadow: 0 2px 8px rgba(114, 47, 55, 0.3) !important;
    }
    
    .special-offer-banner button:hover {
        background: #722f37 !important;
        color: #ffd700 !important;
        transform: scale(1.05);
        transition: all 0.3s ease;
    }
    
    /* Responsive design para navegación de ciudades */
    @media (max-width: 768px) {
        .city-navigation {
            padding: 8px !important;
        }
        
        .city-navigation h4 {
            font-size: 12px !important;
        }
        
        .city-navigation a {
            font-size: 9px !important;
            padding: 2px 4px !important;
        }
        
        .content-navigation {
            padding: 8px !important;
        }
        
        .content-navigation h4 {
            font-size: 12px !important;
        }
        
        .content-navigation a {
            font-size: 10px !important;
            padding: 3px 6px !important;
        }
    }
`;
document.head.appendChild(style);