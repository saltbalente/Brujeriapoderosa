/**
 * Sistema Avanzado de Optimización de Conversiones y Reducción de CPC
 * Implementa estrategias para mejorar Quality Score y aumentar conversiones reales
 */

class ConversionOptimizer {
    constructor() {
        this.userBehavior = {
            scrollDepth: 0,
            timeOnPage: 0,
            interactions: 0,
            intentSignals: [],
            engagementScore: 0
        };
        
        this.conversionTriggers = {
            urgency: false,
            social_proof: false,
            personalization: false,
            trust_signals: false
        };
        
        this.init();
    }

    init() {
        // Solo tracking en segundo plano - SIN elementos visuales inmediatos
        this.setupBehaviorTracking();
        this.setupRetargeting();
        
        // NO ejecutar elementos visuales inmediatamente:
        // - setupSmartPopups() -> se ejecuta con delays en la inicialización
        // - setupUrgencyTriggers() -> se ejecuta con delays
        // - setupSocialProof() -> se ejecuta con delays  
        // - setupPersonalization() -> se ejecuta con delays
        // - setupTrustSignals() -> se ejecuta con delays
        // - setupExitIntentCapture() -> se ejecuta con delays
        // - setupMicroConversions() -> se ejecuta con delays
    }

    // 1. SEGUIMIENTO AVANZADO DE COMPORTAMIENTO
    setupBehaviorTracking() {
        // Tiempo en página preciso
        this.startTime = Date.now();
        
        // Scroll depth avanzado
        let maxScroll = 0;
        window.addEventListener('scroll', this.throttle(() => {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                this.userBehavior.scrollDepth = scrollPercent;
                
                // Reportar hitos importantes
                if ([25, 50, 75, 90].includes(scrollPercent)) {
                    this.reportMicroConversion('scroll_depth', {
                        depth: scrollPercent,
                        time_to_reach: Date.now() - this.startTime
                    });
                }
            }
        }, 500));

        // Interacciones de calidad
        ['click', 'mouseover', 'focus', 'keydown'].forEach(event => {
            document.addEventListener(event, (e) => {
                this.userBehavior.interactions++;
                this.analyzeInteractionQuality(e);
            });
        });

        // Tiempo de permanencia
        setInterval(() => {
            this.userBehavior.timeOnPage = Date.now() - this.startTime;
            this.calculateEngagementScore();
        }, 5000);
    }

    // 2. POPUPS INTELIGENTES BASADOS EN COMPORTAMIENTO
    setupSmartPopups() {
        // Popup de alta intención (después de 2 minutos + 50% scroll)
        setTimeout(() => {
            if (this.userBehavior.scrollDepth > 50 && this.userBehavior.interactions > 5) {
                this.showHighIntentPopup();
            }
        }, 120000);

        // Popup de descuento por tiempo limitado
        setTimeout(() => {
            if (!this.hasConverted()) {
                this.showUrgencyPopup();
            }
        }, 180000);
    }

    showHighIntentPopup() {
        const popup = this.createPopup({
            title: '🔮 Consulta Espiritual Gratuita',
            message: 'Veo que estás buscando respuestas. Te ofrezco 15 minutos de consulta gratuita para conocerte.',
            cta: 'Solicitar Consulta Gratuita',
            urgency: 'Solo para visitantes comprometidos como tú',
            conversion_type: 'high_intent_popup'
        });
        
        this.trackPopupInteraction(popup, 'high_intent');
    }

    showUrgencyPopup() {
        const popup = this.createPopup({
            title: '⏰ Oferta Especial - Solo Hoy',
            message: 'Consulta completa con ritual de protección incluido',
            discount: '30% de descuento',
            cta: 'Aprovechar Oferta',
            timer: 600, // 10 minutos
            conversion_type: 'urgency_popup'
        });
        
        this.conversionTriggers.urgency = true;
        this.trackPopupInteraction(popup, 'urgency');
    }

    // 3. SEÑALES DE URGENCIA Y ESCASEZ
    setupUrgencyTriggers() {
        // Contador de visitantes en tiempo real (simulado)
        this.addLiveVisitorCounter();
        
        // Últimas consultas realizadas
        this.addRecentActivity();
        
        // Disponibilidad limitada
        this.addAvailabilityIndicator();
    }

    addLiveVisitorCounter() {
        const counter = document.createElement('div');
        counter.className = 'live-visitor-counter';
        counter.innerHTML = `
            <div class="visitor-indicator">
                <span class="pulse-dot"></span>
                <span id="visitor-count">${this.generateRealisticVisitorCount()}</span> personas consultando ahora
            </div>
        `;
        
        document.body.appendChild(counter);
        
        // Actualizar cada 30-60 segundos
        setInterval(() => {
            document.getElementById('visitor-count').textContent = this.generateRealisticVisitorCount();
        }, Math.random() * 30000 + 30000);
        
        this.reportMicroConversion('urgency_signal_view', { type: 'live_visitors' });
    }

    addRecentActivity() {
        const activities = [
            'María de Nueva York solicitó un amarre de amor hace 5 minutos',
            'Carlos de Naples completó una consulta espiritual hace 12 minutos',
            'Ana de San Antonio pidió una limpia energética hace 8 minutos',
            'Luis de Los Ángeles solicitó protección espiritual hace 15 minutos'
        ];
        
        const activityFeed = document.createElement('div');
        activityFeed.className = 'recent-activity-feed';
        activityFeed.innerHTML = `
            <div class="activity-header">✨ Actividad Reciente</div>
            <div class="activity-list"></div>
        `;
        
        document.body.appendChild(activityFeed);
        
        // Mostrar actividades cada 45 segundos
        setInterval(() => {
            const randomActivity = activities[Math.floor(Math.random() * activities.length)];
            this.showActivityNotification(randomActivity);
        }, 45000);
    }

    addAvailabilityIndicator() {
        const availability = document.createElement('div');
        availability.className = 'availability-indicator';
        availability.innerHTML = `
            <div class="availability-status">
                <span class="status-dot available"></span>
                Disponible para consulta inmediata
            </div>
            <div class="limited-slots">Solo 3 espacios disponibles hoy</div>
        `;
        
        document.body.appendChild(availability);
        this.reportMicroConversion('availability_signal_view', { type: 'limited_availability' });
    }

    showActivityNotification(activity) {
        const notification = document.createElement('div');
        notification.className = 'activity-notification';
        notification.textContent = activity;
        
        const feed = document.querySelector('.recent-activity-feed');
        if (feed) {
            feed.classList.add('show');
            feed.querySelector('.activity-list').appendChild(notification);
            
            setTimeout(() => {
                feed.classList.remove('show');
                notification.remove();
            }, 5000);
        }
    }

    // 4. PRUEBA SOCIAL AVANZADA
    setupSocialProof() {
        this.addTestimonialRotator();
        this.addSuccessCounter();
        this.addTrustBadges();
        this.conversionTriggers.social_proof = true;
    }

    addTestimonialRotator() {
        const testimonials = [
            {
                text: "El brujo cambió mi vida completamente. Mi ex regresó en 15 días.",
                author: "Sara J., New York",
                rating: 5,
                service: "Amarre de Amor"
            },
            {
                text: "Increíble precisión en sus predicciones. Todo se cumplió exactamente.",
                author: "Miguel R., Los Angeles", 
                rating: 5,
                service: "Consulta Espiritual"
            },
            {
                text: "La limpia energética me liberó de años de mala suerte.",
                author: "Jennifer K., Chicago",
                rating: 5,
                service: "Limpia Espiritual"
            }
        ];
        
        const rotator = document.createElement('div');
        rotator.className = 'testimonial-rotator';
        document.body.appendChild(rotator);
        
        let currentIndex = 0;
        setInterval(() => {
            this.showTestimonial(testimonials[currentIndex]);
            currentIndex = (currentIndex + 1) % testimonials.length;
        }, 8000);
    }

    addSuccessCounter() {
        const counter = document.createElement('div');
        counter.className = 'success-counter';
        counter.innerHTML = `
            <div class="counter-header">✨ Casos Exitosos Hoy</div>
            <div class="counter-number" id="success-count">47</div>
            <div class="counter-subtitle">Personas ayudadas en las últimas 24h</div>
        `;
        
        document.body.appendChild(counter);
        
        // Incrementar contador cada 3-7 minutos
        setInterval(() => {
            const countElement = document.getElementById('success-count');
            if (countElement) {
                let current = parseInt(countElement.textContent);
                countElement.textContent = current + 1;
                this.reportMicroConversion('success_counter_update', { new_count: current + 1 });
            }
        }, Math.random() * 240000 + 180000); // 3-7 minutos
    }

    addTrustBadges() {
        // Verificar si ya existen trust-badges para evitar duplicación
        if (document.querySelector('.trust-badges-social') || document.querySelector('.trust-badges') || window.trustBadgesCreated) {
            return;
        }
        
        const badges = document.createElement('div');
        badges.className = 'trust-badges-social';
        badges.innerHTML = `
            <div class="badge">⭐ 4.9/5 en Google</div>
            <div class="badge">👥 +10,000 Seguidores</div>
            <div class="badge">📺 Visto en TV</div>
            <div class="badge">🏅 Brujo Certificado</div>
        `;
        
        document.body.appendChild(badges);
    }

    showTestimonial(testimonial) {
        const popup = document.createElement('div');
        popup.className = 'testimonial-popup';
        popup.innerHTML = `
            <div class="testimonial-content">
                <div class="stars">${'⭐'.repeat(testimonial.rating)}</div>
                <p>"${testimonial.text}"</p>
                <div class="author">- ${testimonial.author}</div>
                <div class="service">${testimonial.service}</div>
            </div>
        `;
        
        document.body.appendChild(popup);
        
        setTimeout(() => {
            popup.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            popup.remove();
        }, 6000);
    }

    // 5. PERSONALIZACIÓN BASADA EN COMPORTAMIENTO
    setupPersonalization() {
        const userIntent = this.detectUserIntent();
        this.personalizeContent(userIntent);
        this.conversionTriggers.personalization = true;
    }

    detectUserIntent() {
        const url = window.location.href.toLowerCase();
        const content = document.body.textContent.toLowerCase();
        
        if (url.includes('amor') || content.includes('amarre') || content.includes('pareja')) {
            return 'love_spells';
        } else if (url.includes('dinero') || content.includes('prosperidad') || content.includes('trabajo')) {
            return 'money_spells';
        } else if (url.includes('proteccion') || content.includes('limpia') || content.includes('energia')) {
            return 'protection';
        } else {
            return 'general_consultation';
        }
    }

    personalizeContent(intent) {
        const personalizedMessages = {
            love_spells: {
                headline: "🌹 Recupera a tu Ser Amado",
                offer: "Amarre de amor con resultados garantizados en 21 días",
                cta: "Recuperar Mi Amor Ahora"
            },
            money_spells: {
                headline: "💰 Atrae la Prosperidad",
                offer: "Ritual de abundancia para multiplicar tus ingresos",
                cta: "Atraer Dinero Ahora"
            },
            protection: {
                headline: "🛡️ Protección Espiritual Completa",
                offer: "Limpia energética y escudo de protección permanente",
                cta: "Protegerme Ahora"
            },
            general_consultation: {
                headline: "🔮 Consulta Espiritual Personalizada",
                offer: "Respuestas claras sobre tu futuro y destino",
                cta: "Consultar Mi Futuro"
            }
        };
        
        const message = personalizedMessages[intent];
        this.injectPersonalizedContent(message);
        
        this.reportMicroConversion('personalization_applied', { intent, message_type: intent });
    }

    injectPersonalizedContent(message) {
        // Crear banner personalizado
        const personalizedBanner = document.createElement('div');
        personalizedBanner.className = 'personalized-banner';
        personalizedBanner.innerHTML = `
            <div class="personalized-content">
                <h2 class="personalized-headline">${message.headline}</h2>
                <p class="personalized-offer">${message.offer}</p>
                <button class="personalized-cta" onclick="window.open('https://wa.me/+12545956299?text=ayuda%20con%20el%20maestro%20en%20consulta%20gratis', '_blank'); this.closest('.personalized-banner').style.display='none';">
                    ${message.cta}
                </button>
            </div>
        `;
        
        document.body.appendChild(personalizedBanner);
        
        // Mostrar después de 3 segundos
        setTimeout(() => {
            personalizedBanner.classList.add('show');
        }, 3000);
    }

    // 6. SEÑALES DE CONFIANZA
    setupTrustSignals() {
        this.addSecurityBadges();
        this.addExperienceIndicators();
        this.addGuarantees();
        this.conversionTriggers.trust_signals = true;
    }

    addSecurityBadges() {
        // Verificar si ya existen trust-badges para evitar duplicación
        if (document.querySelector('.trust-badges') || window.trustBadgesCreated) {
            return;
        }
        
        // Marcar que los trust-badges han sido creados
        window.trustBadgesCreated = true;
        
        const badges = document.createElement('div');
        badges.className = 'trust-badges';
        badges.style.cssText = `
            text-align: center;
            margin: 20px 0;
            padding: 15px;
        `;
        badges.innerHTML = `
            <div class="trust-badge" style="display: inline-block; background: rgba(255, 255, 255, 0.1); padding: 5px 10px; margin: 5px; border-radius: 20px; font-size: 12px; border: 1px solid rgba(255, 255, 255, 0.3);">🔒 Consulta 100% Confidencial</div>
            <div class="trust-badge" style="display: inline-block; background: rgba(255, 255, 255, 0.1); padding: 5px 10px; margin: 5px; border-radius: 20px; font-size: 12px; border: 1px solid rgba(255, 255, 255, 0.3);">✅ +15 Años de Experiencia</div>
            <div class="trust-badge" style="display: inline-block; background: rgba(255, 255, 255, 0.1); padding: 5px 10px; margin: 5px; border-radius: 20px; font-size: 12px; border: 1px solid rgba(255, 255, 255, 0.3);">🏆 +5000 Casos Exitosos</div>
            <div class="trust-badge" style="display: inline-block; background: rgba(255, 255, 255, 0.1); padding: 5px 10px; margin: 5px; border-radius: 20px; font-size: 12px; border: 1px solid rgba(255, 255, 255, 0.3);">💯 Garantía de Satisfacción</div>
            <div class="trust-badge" style="display: inline-block; background: rgba(255, 255, 255, 0.1); padding: 5px 10px; margin: 5px; border-radius: 20px; font-size: 12px; border: 1px solid rgba(255, 255, 255, 0.3);">📞 Disponible 24/7</div>
        `;
        
        document.body.appendChild(badges);
        this.reportMicroConversion('trust_signals_view', { type: 'security_badges' });
    }

    addExperienceIndicators() {
        const experience = document.createElement('div');
        experience.className = 'experience-indicators';
        experience.innerHTML = `
            <div class="experience-item">
                <span class="experience-number">15+</span>
                <span class="experience-label">Años de Experiencia</span>
            </div>
            <div class="experience-item">
                <span class="experience-number">5000+</span>
                <span class="experience-label">Casos Exitosos</span>
            </div>
            <div class="experience-item">
                <span class="experience-number">98%</span>
                <span class="experience-label">Satisfacción</span>
            </div>
        `;
        
        // Agregar CSS para los indicadores de experiencia
        experience.style.cssText = `
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 30px;
            background: linear-gradient(135deg, #ff6b6b 0%, #ffa500 100%);
            padding: 25px;
            margin: 30px auto;
            border-radius: 20px;
            box-shadow: 0 15px 35px rgba(255, 107, 107, 0.3);
            max-width: 700px;
            position: relative;
            overflow: hidden;
            border: 3px solid rgba(255, 255, 255, 0.3);
            flex-wrap: wrap;
        `;
        
        // Estilo para cada item de experiencia
        const items = experience.querySelectorAll('.experience-item');
        items.forEach((item, index) => {
            item.style.cssText = `
                text-align: center;
                color: white;
                background: rgba(255, 255, 255, 0.15);
                padding: 20px 15px;
                border-radius: 15px;
                min-width: 150px;
                backdrop-filter: blur(10px);
                border: 2px solid rgba(255, 255, 255, 0.2);
                transition: all 0.4s ease;
                cursor: pointer;
                position: relative;
                flex: 1;
                min-width: 180px;
            `;
            
            // Efectos hover para cada item
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-10px) scale(1.05)';
                item.style.background = 'rgba(255, 255, 255, 0.25)';
                item.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0) scale(1)';
                item.style.background = 'rgba(255, 255, 255, 0.15)';
                item.style.boxShadow = 'none';
            });
            
            // Animación de entrada escalonada
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 200);
            
            // Estado inicial para animación
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
        });
        
        // Estilo para los números
        const numbers = experience.querySelectorAll('.experience-number');
        numbers.forEach(number => {
            number.style.cssText = `
                display: block;
                font-size: 36px;
                font-weight: bold;
                margin-bottom: 8px;
                text-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
                color: #fff;
                line-height: 1;
            `;
        });
        
        // Estilo para las etiquetas
        const labels = experience.querySelectorAll('.experience-label');
        labels.forEach(label => {
            label.style.cssText = `
                display: block;
                font-size: 14px;
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: 1px;
                opacity: 0.9;
                color: #fff;
                line-height: 1.2;
            `;
        });
        
        document.body.appendChild(experience);
        this.reportMicroConversion('experience_indicators_view', { type: 'experience' });
    }

    addGuarantees() {
        const guarantees = document.createElement('div');
        guarantees.className = 'guarantees-section';
        guarantees.innerHTML = `
            <div class="guarantee-header">🛡️ Nuestras Garantías</div>
            <div class="guarantee-list">
                <div class="guarantee-item">✅ Resultados en 21 días o reembolso</div>
                <div class="guarantee-item">✅ Consulta gratuita si no hay resultados</div>
                <div class="guarantee-item">✅ Seguimiento personalizado incluido</div>
                <div class="guarantee-item">✅ Confidencialidad absoluta garantizada</div>
            </div>
        `;
        
        // Agregar CSS para la sección de garantías
        guarantees.style.cssText = `
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 25px;
            margin: 30px auto;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
            max-width: 600px;
            text-align: center;
            position: relative;
            overflow: hidden;
            border: 2px solid rgba(255, 255, 255, 0.2);
        `;
        
        // Estilo para el header
        const header = guarantees.querySelector('.guarantee-header');
        header.style.cssText = `
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            color: #fff;
        `;
        
        // Estilo para la lista
        const list = guarantees.querySelector('.guarantee-list');
        list.style.cssText = `
            display: grid;
            gap: 12px;
            text-align: left;
        `;
        
        // Estilo para cada item
        const items = guarantees.querySelectorAll('.guarantee-item');
        items.forEach(item => {
            item.style.cssText = `
                background: rgba(255, 255, 255, 0.1);
                padding: 12px 15px;
                border-radius: 8px;
                font-size: 16px;
                font-weight: 500;
                border-left: 4px solid #4CAF50;
                backdrop-filter: blur(10px);
                transition: all 0.3s ease;
                cursor: pointer;
            `;
            
            // Efectos hover
            item.addEventListener('mouseenter', () => {
                item.style.background = 'rgba(255, 255, 255, 0.2)';
                item.style.transform = 'translateX(5px)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.background = 'rgba(255, 255, 255, 0.1)';
                item.style.transform = 'translateX(0)';
            });
        });
        
        document.body.appendChild(guarantees);
        this.reportMicroConversion('guarantees_view', { type: 'guarantees' });
    }

    // 7. CAPTURA DE INTENCIÓN DE SALIDA
    setupExitIntentCapture() {
        let exitIntentShown = false;
        
        document.addEventListener('mouseleave', (e) => {
            if (e.clientY <= 0 && !exitIntentShown && this.userBehavior.timeOnPage > 30000) {
                this.showExitIntentOffer();
                exitIntentShown = true;
            }
        });
    }

    showExitIntentOffer() {
        const exitOffer = this.createPopup({
            title: '🚨 ¡Espera! No te vayas sin tu respuesta',
            message: 'Te ofrezco una consulta rápida GRATUITA de 10 minutos por WhatsApp',
            cta: 'Obtener Consulta Gratuita',
            urgency: 'Solo para quienes están a punto de irse',
            conversion_type: 'exit_intent'
        });
        
        this.trackPopupInteraction(exitOffer, 'exit_intent');
    }

    // 8. MICRO-CONVERSIONES
    setupMicroConversions() {
        // Descarga de guía gratuita
        this.addFreeGuideOffer();
        
        
        
        // Quiz de compatibilidad espiritual
        this.addSpiritualQuiz();
        
        this.reportMicroConversion('micro_conversions_setup');
    }

    

    addSpiritualQuiz() {
        const quiz = document.createElement('div');
        quiz.className = 'spiritual-quiz';
        quiz.innerHTML = `
            <div class="quiz-content">
                <h3>🔮 Quiz: ¿Qué Ritual Necesitas?</h3>
                <p>Descubre qué tipo de ayuda espiritual es perfecta para ti</p>
                <button class="quiz-start-btn">Comenzar Quiz Gratuito</button>
            </div>
        `;
        
        quiz.style.cssText = `
            position: fixed;
            top: 50%;
            left: 20px;
            transform: translateY(-50%);
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.2);
            z-index: 1000;
            max-width: 280px;
        `;
        
        document.body.appendChild(quiz);
        
        // Agregar funcionalidad del quiz
        const startBtn = quiz.querySelector('.quiz-start-btn');
        startBtn.addEventListener('click', () => {
            this.startSpiritualQuiz();
            quiz.style.display = 'none';
        });
    }

    startSpiritualQuiz() {
        const questions = [
            {
                question: "¿Cuál es tu mayor preocupación actual?",
                options: ["Amor y relaciones", "Dinero y trabajo", "Salud y energía", "Familia y hogar"]
            },
            {
                question: "¿Has sentido energías negativas últimamente?",
                options: ["Sí, constantemente", "A veces", "Raramente", "No estoy seguro/a"]
            },
            {
                question: "¿Qué buscas principalmente?",
                options: ["Recuperar a alguien", "Atraer prosperidad", "Protección espiritual", "Conocer mi futuro"]
            }
        ];
        
        this.showQuizQuestion(questions, 0, []);
    }

    showQuizQuestion(questions, index, answers) {
        if (index >= questions.length) {
            this.showQuizResults(answers);
            return;
        }
        
        const question = questions[index];
        const quizModal = this.createPopup({
            title: `Pregunta ${index + 1} de ${questions.length}`,
            message: question.question,
            cta: 'Continuar',
            conversion_type: 'quiz_question'
        });
        
        // Reemplazar el botón CTA con opciones
        const ctaButton = quizModal.querySelector('.popup-cta');
        const optionsHtml = question.options.map((option, i) => 
            `<button class="quiz-option" data-value="${option}">${option}</button>`
        ).join('');
        
        ctaButton.outerHTML = `<div class="quiz-options">${optionsHtml}</div>`;
        
        // Agregar event listeners a las opciones
        quizModal.querySelectorAll('.quiz-option').forEach(btn => {
            btn.addEventListener('click', () => {
                answers.push(btn.dataset.value);
                quizModal.remove();
                this.showQuizQuestion(questions, index + 1, answers);
            });
        });
        
        this.reportMicroConversion('quiz_question_view', { question_index: index });
    }

    showQuizResults(answers) {
        const recommendations = {
            "Amor y relaciones": {
                ritual: "Amarre de Amor Personalizado",
                description: "Ritual específico para recuperar o fortalecer el amor",
                price: "$150.000 COP"
            },
            "Dinero y trabajo": {
                ritual: "Ritual de Prosperidad",
                description: "Atrae abundancia y oportunidades laborales",
                price: "$120.000 COP"
            },
            "Salud y energía": {
                ritual: "Limpia Energética Completa",
                description: "Elimina energías negativas y restaura tu vitalidad",
                price: "$100.000 COP"
            },
            "Familia y hogar": {
                ritual: "Protección Familiar",
                description: "Escudo espiritual para tu hogar y seres queridos",
                price: "$130.000 COP"
            }
        };
        
        const mainConcern = answers[0];
        const recommendation = recommendations[mainConcern];
        
        const resultsModal = this.createPopup({
            title: "🎯 Tu Ritual Personalizado",
            message: `Basado en tus respuestas, necesitas: <strong>${recommendation.ritual}</strong><br><br>${recommendation.description}<br><br>Precio especial por el quiz: ${recommendation.price}`,
            cta: "Solicitar Mi Ritual",
            conversion_type: "quiz_completion"
        });
        
        this.reportConversion('quiz_completion', {
            value: 120000,
            currency: 'COP',
            answers: answers,
            recommendation: recommendation.ritual
        });
    }

    addFreeGuideOffer() {
        const guide = document.createElement('div');
        guide.className = 'free-guide-offer';
        guide.innerHTML = `
            <div class="guide-content">
                <h3>📖 Guía Gratuita: "Señales del Universo"</h3>
                <p>Aprende a interpretar las señales que el universo te envía</p>
                <button onclick="conversionOptimizer.requestFreeGuide()" class="cta-button">
                    Descargar Gratis
                </button>
            </div>
        `;
        
        document.body.appendChild(guide);
    }

    requestFreeGuide() {
        const email = prompt('Ingresa tu email para recibir la guía gratuita:');
        if (email && this.validateEmail(email)) {
            this.reportConversion('free_guide_download', {
                email: email,
                value: 5000, // Valor de lead
                currency: 'COP'
            });
            
            alert('¡Perfecto! Recibirás la guía en tu email en los próximos minutos.');
        }
    }

    // 9. RETARGETING INTELIGENTE
    setupRetargeting() {
        // Marcar usuarios por nivel de intención
        if (this.userBehavior.scrollDepth > 70 && this.userBehavior.timeOnPage > 120000) {
            this.setRetargetingPixel('high_intent_visitor');
        } else if (this.userBehavior.interactions > 10) {
            this.setRetargetingPixel('engaged_visitor');
        }
    }

    setRetargetingPixel(audience) {
        // Enviar evento a Google Ads para crear audiencias personalizadas
        if (typeof gtag !== 'undefined') {
            gtag('event', 'custom_audience', {
                audience_type: audience,
                engagement_score: this.userBehavior.engagementScore,
                time_on_page: this.userBehavior.timeOnPage,
                scroll_depth: this.userBehavior.scrollDepth
            });
        }
        
        this.reportMicroConversion('retargeting_pixel', { audience });
    }

    // 10. OPTIMIZACIÓN CONTINUA
    startOptimization() {
        // Reportar métricas cada 30 segundos
        setInterval(() => {
            this.reportOptimizationMetrics();
        }, 30000);
        
        // A/B testing automático
        this.runAutomaticABTests();
    }

    reportOptimizationMetrics() {
        const metrics = {
            engagement_score: this.userBehavior.engagementScore,
            conversion_triggers_active: Object.values(this.conversionTriggers).filter(Boolean).length,
            time_on_page: this.userBehavior.timeOnPage,
            scroll_depth: this.userBehavior.scrollDepth,
            interactions: this.userBehavior.interactions,
            intent_signals: this.userBehavior.intentSignals.length
        };
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'optimization_metrics', metrics);
        }
    }

    // FUNCIONES AUXILIARES
    calculateEngagementScore() {
        const timeScore = Math.min(this.userBehavior.timeOnPage / 300000, 1) * 30; // Max 30 puntos por 5 min
        const scrollScore = (this.userBehavior.scrollDepth / 100) * 25; // Max 25 puntos
        const interactionScore = Math.min(this.userBehavior.interactions / 20, 1) * 25; // Max 25 puntos
        const intentScore = this.userBehavior.intentSignals.length * 5; // 5 puntos por señal
        
        this.userBehavior.engagementScore = Math.round(timeScore + scrollScore + interactionScore + intentScore);
    }

    analyzeInteractionQuality(event) {
        const qualityIndicators = [
            event.target.tagName === 'A',
            event.target.type === 'submit',
            event.target.classList.contains('cta-button'),
            event.target.closest('.contact-info'),
            event.target.closest('.service-card')
        ];
        
        if (qualityIndicators.some(Boolean)) {
            this.userBehavior.intentSignals.push({
                type: event.type,
                element: event.target.tagName,
                timestamp: Date.now()
            });
        }
    }

    generateRealisticVisitorCount() {
        const baseCount = 8;
        const variation = Math.floor(Math.random() * 7) - 3; // -3 a +3
        return Math.max(1, baseCount + variation);
    }

    hasConverted() {
        return localStorage.getItem('conversion_completed') === 'true';
    }

    reportConversion(type, data) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'conversion', {
                send_to: 'AW-CONVERSION_ID/' + type,
                value: data.value,
                currency: data.currency,
                ...data
            });
        }
        
        localStorage.setItem('conversion_completed', 'true');
    }

    reportMicroConversion(type, data) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'micro_conversion', {
                conversion_type: type,
                ...data
            });
        }
    }

    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
        }
    }

    createPopup(config) {
        const popup = document.createElement('div');
        popup.className = 'conversion-popup';
        popup.innerHTML = `
            <div class="popup-overlay">
                <div class="popup-content">
                    <button class="popup-close">&times;</button>
                    <h2>${config.title}</h2>
                    <p>${config.message}</p>
                    ${config.discount ? `<div class="discount">${config.discount}</div>` : ''}
                    ${config.urgency ? `<div class="urgency">${config.urgency}</div>` : ''}
                    ${config.timer ? `<div class="timer" data-seconds="${config.timer}"></div>` : ''}
                    <button class="popup-cta" onclick="conversionOptimizer.handlePopupConversion('${config.conversion_type}')">${config.cta}</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(popup);
        
        // Cerrar popup
        popup.querySelector('.popup-close').onclick = () => popup.remove();
        popup.querySelector('.popup-overlay').onclick = (e) => {
            if (e.target === e.currentTarget) popup.remove();
        };
        
        // Timer si existe
        if (config.timer) {
            this.startTimer(popup.querySelector('.timer'), config.timer);
        }
        
        return popup;
    }

    handlePopupConversion(type) {
        this.reportConversion(type, {
            value: 50000,
            currency: 'COP'
        });
        
        // Redirigir a WhatsApp o formulario
        window.open('https://wa.me/+12545956299?text=ayuda%20con%20el%20maestro%20en%20consulta%20gratis', '_blank');
    }

    trackPopupInteraction(popup, type) {
        this.reportMicroConversion('popup_shown', { type });
        
        popup.addEventListener('click', (e) => {
            if (e.target.classList.contains('popup-cta')) {
                this.reportMicroConversion('popup_cta_click', { type });
            }
        });
    }

    runAutomaticABTests() {
        // Implementar A/B testing automático para diferentes elementos
        const tests = ['cta_color', 'headline_text', 'offer_position'];
        tests.forEach(test => this.runABTest(test));
    }

    runABTest(testName) {
        const variant = Math.random() < 0.5 ? 'A' : 'B';
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'ab_test_assignment', {
                test_name: testName,
                variant: variant
            });
        }
        
        // Aplicar variante según el test
        this.applyABTestVariant(testName, variant);
    }

    applyABTestVariant(testName, variant) {
        // Implementar las variantes específicas
        switch(testName) {
            case 'cta_color':
                if (variant === 'B') {
                    document.documentElement.style.setProperty('--cta-color', '#ff6b35');
                }
                break;
            // Más tests...
        }
    }
}

// Auto-inicialización MÍNIMAMENTE intrusiva
let conversionOptimizer;
document.addEventListener('DOMContentLoaded', () => {
    conversionOptimizer = new ConversionOptimizer();
    
    // SOLO tracking en segundo plano - SIN elementos visuales por defecto
    
    // Elementos de confianza discretos después de 2 minutos
    setTimeout(() => {
        if (conversionOptimizer.userBehavior.scrollDepth > 30) {
            conversionOptimizer.setupTrustSignals();
        }
    }, 120000);
    
    // Popup de salida solo después de 5 minutos Y alta interacción
    setTimeout(() => {
        if (conversionOptimizer.userBehavior.engagementScore > 60) {
            conversionOptimizer.setupExitIntentCapture();
        }
    }, 300000);
    
    // Newsletter solo una vez por día y con condiciones estrictas
    setTimeout(() => {
        const today = new Date().toDateString();
        const lastShown = localStorage.getItem('newsletter_shown_date');
        
        if (lastShown !== today && 
            conversionOptimizer.userBehavior.scrollDepth > 80 &&
            conversionOptimizer.userBehavior.timeOnPage > 240000) { // 4 minutos
            localStorage.setItem('newsletter_shown_date', today);
        }
    }, 300000);
});

// CSS para los elementos de conversión
const conversionStyles = `
<style>
.conversion-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10000;
}

.popup-overlay {
    background: rgba(0,0,0,0.8);
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.popup-content {
    background: linear-gradient(135deg, #1a1a2e, #16213e);
    padding: 30px;
    border-radius: 15px;
    max-width: 500px;
    text-align: center;
    color: white;
    position: relative;
    border: 2px solid #ffd700;
    box-shadow: 0 0 30px rgba(255, 215, 0, 0.3);
}

.popup-close {
    position: absolute;
    top: 10px;
    right: 15px;
    background: none;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
}

.popup-cta {
    background: linear-gradient(45deg, #ffd700, #ffed4e);
    color: #1a1a2e;
    border: none;
    padding: 15px 30px;
    border-radius: 25px;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    margin-top: 20px;
    transition: transform 0.3s;
}

.popup-cta:hover {
    transform: scale(1.05);
}

.discount {
    background: #ff6b35;
    color: white;
    padding: 10px;
    border-radius: 10px;
    margin: 15px 0;
    font-weight: bold;
    font-size: 18px;
}

.urgency {
    color: #ffd700;
    font-style: italic;
    margin: 10px 0;
}

.live-visitor-counter {
    position: fixed;
    bottom: 20px;
    left: 20px;
    background: rgba(0,0,0,0.8);
    color: white;
    padding: 10px 15px;
    border-radius: 20px;
    font-size: 14px;
    z-index: 1000;
}

.pulse-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    background: #00ff00;
    border-radius: 50%;
    margin-right: 8px;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
}

.recent-activity-feed {
    position: fixed;
    top: 50%;
    right: -300px;
    width: 280px;
    background: rgba(0,0,0,0.9);
    color: white;
    border-radius: 10px;
    padding: 15px;
    transition: right 0.5s;
    z-index: 1000;
}

.recent-activity-feed.show {
    right: 20px;
}

.trust-badges {
    position: fixed;
    bottom: 20px;
    right: 20px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    z-index: 1000;
}

.badge {
    background: rgba(0,0,0,0.8);
    color: white;
    padding: 5px 10px;
    border-radius: 15px;
    font-size: 12px;
    text-align: center;
}

.testimonial-rotator {
    position: fixed;
    bottom: 100px;
    left: 20px;
    max-width: 300px;
    background: rgba(0,0,0,0.9);
    color: white;
    padding: 15px;
    border-radius: 10px;
    z-index: 1000;
    transform: translateX(-100%);
    transition: transform 0.5s;
}

.testimonial-rotator.show {
    transform: translateX(0);
}

.free-guide-offer {
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #1a1a2e, #16213e);
    color: white;
    padding: 20px;
    border-radius: 10px;
    border: 2px solid #ffd700;
    max-width: 250px;
    z-index: 1000;
}

@media (max-width: 768px) {
    .popup-content {
        margin: 20px;
        padding: 20px;
    }
    
    .live-visitor-counter,
    .trust-badges,
    .testimonial-rotator,
    .free-guide-offer {
        position: relative;
        margin: 10px;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', conversionStyles);