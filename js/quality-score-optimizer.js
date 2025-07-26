/**
 * Google Ads Quality Score Real-Time Optimizer
 * Sistema integral de optimización en tiempo real para maximizar el Quality Score
 */

class QualityScoreOptimizer {
    constructor() {
        this.config = {
            qualityThresholds: {
                excellent: 90,
                good: 75,
                average: 60,
                poor: 40
            },
            optimizationIntervals: {
                realTime: 5000,    // 5 segundos
                periodic: 30000,   // 30 segundos
                deep: 300000       // 5 minutos
            },
            trackingEnabled: true,
            autoOptimizationEnabled: true
        };
        
        this.qualityMetrics = {
            landingPageExperience: 0,
            adRelevance: 0,
            expectedCTR: 0,
            overallScore: 0,
            lastUpdate: null
        };
        
        this.performanceData = {
            pageLoadTime: 0,
            userEngagement: 0,
            conversionRate: 0,
            bounceRate: 0,
            timeOnPage: 0,
            interactions: 0,
            scrollDepth: 0
        };
        
        this.optimizationHistory = [];
        this.activeOptimizations = new Set();
        
        this.init();
    }
    
    init() {
        this.setupRealTimeMonitoring();
        this.initializeQualityTracking();
        this.setupAutomaticOptimizations();
        this.startOptimizationEngine();
        
        console.log('Quality Score Optimizer initialized');
        this.reportEvent('quality_optimizer_initialized');
    }

    setupAutomaticOptimizations() {
        // Configure automatic optimization rules
        this.optimizationRules = {
            emergencyThreshold: this.config.qualityThresholds.poor,
            standardThreshold: this.config.qualityThresholds.average,
            enhancementThreshold: this.config.qualityThresholds.good
        };
        
        // Initialize optimization state
        this.optimizationState = {
            lastOptimization: null,
            optimizationCount: 0,
            cooldownPeriod: 30000 // 30 seconds
        };
        
        console.log('Automatic optimizations configured');
    }

    initializeQualityTracking() {
        // Initialize tracking variables
        this.metrics = {
            landingPageExperience: 0,
            adRelevance: 0,
            expectedCTR: 0,
            overallScore: 0
        };

        this.performanceData = {
            pageLoadTime: 0,
            userEngagement: 0,
            scrollDepth: 0,
            timeOnPage: 0,
            bounceRate: 0
        };

        // Start collecting initial metrics
        this.collectInitialMetrics();
    }

    collectInitialMetrics() {
        // Measure page load time
        if (window.performance && window.performance.timing) {
            const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
            this.performanceData.pageLoadTime = loadTime;
        }

        // Track time on page
        this.startTime = Date.now();
        
        // Initialize scroll tracking
        this.maxScrollDepth = 0;
        this.trackScrollDepth();
    }

    trackScrollDepth() {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            
            const scrollPercent = Math.round((scrollTop + windowHeight) / documentHeight * 100);
            
            if (scrollPercent > this.maxScrollDepth) {
                this.maxScrollDepth = scrollPercent;
                this.performanceData.scrollDepth = scrollPercent;
                
                // Update engagement based on scroll depth
                if (scrollPercent > 75) {
                    this.performanceData.userEngagement = Math.min(100, this.performanceData.userEngagement + 10);
                }
            }
        });
    }
    
    setupRealTimeMonitoring() {
        // Monitoreo en tiempo real de métricas clave
        setInterval(() => {
            this.updatePerformanceMetrics();
            this.calculateQualityScore();
            this.triggerRealTimeOptimizations();
        }, this.config.optimizationIntervals.realTime);
        
        // Monitoreo periódico más profundo
        setInterval(() => {
            this.performDeepAnalysis();
            this.optimizeBasedOnData();
        }, this.config.optimizationIntervals.periodic);
        
        // Análisis profundo y reporte
        setInterval(() => {
            this.generateQualityReport();
            this.planStrategicOptimizations();
        }, this.config.optimizationIntervals.deep);
    }
    
    updatePerformanceMetrics() {
        // Actualizar métricas de rendimiento
        this.performanceData.pageLoadTime = performance.now();
        this.performanceData.timeOnPage = Date.now() - (window.pageStartTime || Date.now());
        
        // Calcular engagement score
        const scrollPercent = Math.round(
            (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        );
        this.performanceData.scrollDepth = Math.max(this.performanceData.scrollDepth, scrollPercent);
        
        // Calcular tasa de interacción
        this.performanceData.userEngagement = this.calculateEngagementScore();
    }
    
    calculateEngagementScore() {
        const timeOnPageMinutes = this.performanceData.timeOnPage / 60000;
        const interactionRate = this.performanceData.interactions / Math.max(timeOnPageMinutes, 1);
        const scrollScore = this.performanceData.scrollDepth / 100;
        
        return Math.min(
            (timeOnPageMinutes * 20) + 
            (interactionRate * 30) + 
            (scrollScore * 50), 
            100
        );
    }
    
    calculateQualityScore() {
        // Landing Page Experience (40% del Quality Score)
        this.qualityMetrics.landingPageExperience = this.calculateLandingPageScore();
        
        // Ad Relevance (30% del Quality Score)
        this.qualityMetrics.adRelevance = this.calculateAdRelevanceScore();
        
        // Expected CTR (30% del Quality Score)
        this.qualityMetrics.expectedCTR = this.calculateExpectedCTRScore();
        
        // Score general
        this.qualityMetrics.overallScore = Math.round(
            (this.qualityMetrics.landingPageExperience * 0.4) +
            (this.qualityMetrics.adRelevance * 0.3) +
            (this.qualityMetrics.expectedCTR * 0.3)
        );
        
        this.qualityMetrics.lastUpdate = Date.now();
    }
    
    calculateLandingPageScore() {
        let score = 0;
        
        // Velocidad de carga (25 puntos)
        if (this.performanceData.pageLoadTime < 2000) score += 25;
        else if (this.performanceData.pageLoadTime < 3000) score += 20;
        else if (this.performanceData.pageLoadTime < 5000) score += 15;
        else score += 10;
        
        // Experiencia del usuario (25 puntos)
        score += Math.min(this.performanceData.userEngagement * 0.25, 25);
        
        // Tiempo en página (25 puntos)
        const timeMinutes = this.performanceData.timeOnPage / 60000;
        if (timeMinutes > 2) score += 25;
        else if (timeMinutes > 1) score += 20;
        else if (timeMinutes > 0.5) score += 15;
        else score += 10;
        
        // Profundidad de scroll (25 puntos)
        score += Math.min(this.performanceData.scrollDepth * 0.25, 25);
        
        return Math.min(score, 100);
    }
    
    calculateAdRelevanceScore() {
        // Simular relevancia basada en keywords y contenido
        const keywordOptimizer = window.keywordRelevanceOptimizer;
        if (keywordOptimizer && keywordOptimizer.keywordMetrics) {
            return keywordOptimizer.keywordMetrics.relevanceScore || 70;
        }
        
        // Score base si no hay optimizer de keywords
        return 75;
    }
    
    calculateExpectedCTRScore() {
        // Basado en engagement y optimizaciones de CTA
        let score = 60; // Base score
        
        // Bonus por interacciones
        if (this.performanceData.interactions > 5) score += 20;
        else if (this.performanceData.interactions > 2) score += 15;
        else if (this.performanceData.interactions > 0) score += 10;
        
        // Bonus por tiempo en página
        const timeMinutes = this.performanceData.timeOnPage / 60000;
        if (timeMinutes > 3) score += 20;
        else if (timeMinutes > 1) score += 10;
        
        return Math.min(score, 100);
    }
    
    triggerRealTimeOptimizations() {
        const currentScore = this.qualityMetrics.overallScore;
        
        if (currentScore < this.config.qualityThresholds.poor) {
            this.triggerEmergencyOptimizations();
        } else if (currentScore < this.config.qualityThresholds.average) {
            this.triggerStandardOptimizations();
        } else if (currentScore < this.config.qualityThresholds.good) {
            this.triggerEnhancementOptimizations();
        }
    }
    
    triggerEmergencyOptimizations() {
        if (!this.activeOptimizations.has('emergency')) {
            this.activeOptimizations.add('emergency');
            
            // Optimizaciones críticas
            this.optimizePageSpeed();
            this.enhanceUserExperience();
            this.boostEngagement();
            
            this.reportEvent('emergency_optimizations_triggered', {
                score: this.qualityMetrics.overallScore
            });
            
            setTimeout(() => {
                this.activeOptimizations.delete('emergency');
            }, 30000);
        }
    }
    
    triggerStandardOptimizations() {
        if (!this.activeOptimizations.has('standard')) {
            this.activeOptimizations.add('standard');
            
            this.optimizeContent();
            this.improveCTAs();
            this.enhanceVisualElements();
            
            this.reportEvent('standard_optimizations_triggered', {
                score: this.qualityMetrics.overallScore
            });
            
            setTimeout(() => {
                this.activeOptimizations.delete('standard');
            }, 60000);
        }
    }
    
    triggerEnhancementOptimizations() {
        if (!this.activeOptimizations.has('enhancement')) {
            this.activeOptimizations.add('enhancement');
            
            this.finetuneExperience();
            this.optimizeConversions();
            this.personalizeContent();
            
            this.reportEvent('enhancement_optimizations_triggered', {
                score: this.qualityMetrics.overallScore
            });
            
            setTimeout(() => {
                this.activeOptimizations.delete('enhancement');
            }, 120000);
        }
    }
    
    optimizePageSpeed() {
        // Precargar recursos críticos
        this.preloadCriticalResources();
        
        // Optimizar imágenes
        this.optimizeImages();
        
        // Minimizar reflows
        this.minimizeReflows();
    }
    
    preloadCriticalResources() {
        const criticalResources = [
            'css/brujocss.css',
            'js/google-ads-optimizer.js',
            'imagenes/chamanes-online.mp4'
        ];
        
        criticalResources.forEach(resource => {
            if (!document.querySelector(`link[href="${resource}"]`)) {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.href = resource;
                link.as = resource.endsWith('.css') ? 'style' : 
                          resource.endsWith('.js') ? 'script' : 'video';
                document.head.appendChild(link);
            }
        });
    }
    
    optimizeImages() {
        const images = document.querySelectorAll('img:not([loading])');
        images.forEach(img => {
            img.loading = 'lazy';
            img.decoding = 'async';
        });
    }
    
    enhanceUserExperience() {
        // Añadir indicadores de progreso
        this.addProgressIndicators();
        
        // Mejorar navegación
        this.improveNavigation();
        
        // Optimizar formularios
        this.optimizeForms();
    }
    
    addProgressIndicators() {
        if (!document.querySelector('.progress-indicator')) {
            const progressBar = document.createElement('div');
            progressBar.className = 'progress-indicator';
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 3px;
                background: linear-gradient(90deg, #3498db, #2ecc71);
                z-index: 10000;
                transition: width 0.3s ease;
            `;
            
            document.body.appendChild(progressBar);
            
            window.addEventListener('scroll', () => {
                const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
                progressBar.style.width = scrollPercent + '%';
            });
        }
    }
    
    boostEngagement() {
        // Añadir elementos interactivos
        this.addInteractiveElements();
        
        // Crear micro-interacciones
        this.createMicroInteractions();
        
        // Implementar gamificación sutil
        this.addGamificationElements();
    }
    
    addInteractiveElements() {
        if (!document.querySelector('.floating-help')) {
            const helpButton = document.createElement('div');
            helpButton.className = 'floating-help';
            helpButton.innerHTML = '💬';
            helpButton.style.cssText = `
                position: fixed;
                bottom: 80px;
                right: 20px;
                width: 60px;
                height: 60px;
                background: linear-gradient(45deg, #667eea, #764ba2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                cursor: pointer;
                box-shadow: 0 4px 15px rgba(0,0,0,0.3);
                z-index: 1000;
                animation: pulse 2s infinite;
            `;
            
            helpButton.addEventListener('click', () => {
                this.performanceData.interactions++;
                this.showHelpModal();
            });
            
            document.body.appendChild(helpButton);
        }
    }
    
    showHelpModal() {
        const modal = document.createElement('div');
        modal.className = 'help-modal';
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
                padding: 30px;
                border-radius: 15px;
                max-width: 500px;
                text-align: center;
                position: relative;
            ">
                <h3 style="color: #2c3e50; margin-bottom: 20px;">¿Necesitas ayuda?</h3>
                <p style="margin-bottom: 25px;">Nuestros expertos están disponibles para guiarte en tu consulta espiritual.</p>
                <button onclick="window.open('https://wa.me/+12545956299?text=ayuda%20con%20el%20maestro%20en%20consulta%20gratis', '_blank'); this.closest('.help-modal').remove();" style="
                    background: linear-gradient(45deg, #667eea, #764ba2);
                    color: white;
                    border: none;
                    padding: 12px 25px;
                    border-radius: 25px;
                    cursor: pointer;
                    font-weight: bold;
                ">Comenzar Consulta</button>
                <span onclick="this.closest('.help-modal').remove()" style="
                    position: absolute;
                    top: 10px;
                    right: 15px;
                    cursor: pointer;
                    font-size: 20px;
                    color: #999;
                ">×</span>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
    
    generateQualityReport() {
        const report = {
            timestamp: Date.now(),
            qualityMetrics: { ...this.qualityMetrics },
            performanceData: { ...this.performanceData },
            optimizationsApplied: this.optimizationHistory.slice(-10),
            recommendations: this.generateRecommendations()
        };
        
        this.reportEvent('quality_score_report', report);
        
        // Guardar en localStorage para análisis posterior
        const reports = JSON.parse(localStorage.getItem('qualityReports') || '[]');
        reports.push(report);
        if (reports.length > 50) reports.shift(); // Mantener solo los últimos 50
        localStorage.setItem('qualityReports', JSON.stringify(reports));
    }
    
    generateRecommendations() {
        const recommendations = [];
        
        if (this.qualityMetrics.landingPageExperience < 70) {
            recommendations.push('Improve page loading speed and user experience');
        }
        
        if (this.qualityMetrics.adRelevance < 70) {
            recommendations.push('Enhance keyword relevance and content alignment');
        }
        
        if (this.qualityMetrics.expectedCTR < 70) {
            recommendations.push('Optimize CTAs and improve engagement elements');
        }
        
        if (this.performanceData.userEngagement < 50) {
            recommendations.push('Add more interactive elements and improve content quality');
        }
        
        return recommendations;
    }
    
    startOptimizationEngine() {
        // Motor de optimización continua
        setInterval(() => {
            if (this.config.autoOptimizationEnabled) {
                this.runAutomaticOptimizations();
            }
        }, this.config.optimizationIntervals.periodic);
    }
    
    runAutomaticOptimizations() {
        const score = this.qualityMetrics.overallScore;
        
        // Aplicar optimizaciones basadas en el score actual
        if (score < this.config.qualityThresholds.average) {
            this.applyAggresiveOptimizations();
        } else if (score < this.config.qualityThresholds.good) {
            this.applyModerateOptimizations();
        } else {
            this.applyFinetuningOptimizations();
        }
    }
    
    applyAggresiveOptimizations() {
        // Optimizaciones agresivas para scores bajos
        this.optimizePageSpeed();
        this.enhanceUserExperience();
        this.boostEngagement();
        this.optimizeContent();
        
        this.logOptimization('aggressive', 'Applied aggressive optimizations due to low score');
    }
    
    applyModerateOptimizations() {
        // Optimizaciones moderadas
        this.improveCTAs();
        this.enhanceVisualElements();
        this.optimizeConversions();
        
        this.logOptimization('moderate', 'Applied moderate optimizations');
    }
    
    applyFinetuningOptimizations() {
        // Ajustes finos para mantener alto rendimiento
        this.finetuneExperience();
        this.personalizeContent();
        
        this.logOptimization('finetuning', 'Applied fine-tuning optimizations');
    }
    
    logOptimization(type, description) {
        const optimization = {
            timestamp: Date.now(),
            type: type,
            description: description,
            scoreBefore: this.qualityMetrics.overallScore
        };
        
        this.optimizationHistory.push(optimization);
        
        // Mantener solo las últimas 100 optimizaciones
        if (this.optimizationHistory.length > 100) {
            this.optimizationHistory.shift();
        }
    }
    
    reportEvent(eventName, data = {}) {
        if (!this.config.trackingEnabled) return;
        
        const eventData = {
            event: eventName,
            timestamp: Date.now(),
            quality_score: this.qualityMetrics.overallScore,
            ...data
        };
        
        // Enviar a Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, eventData);
        }
        
        console.log('Quality Score Optimizer:', eventData);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.pageStartTime = Date.now();
    window.qualityScoreOptimizer = new QualityScoreOptimizer();
    
    // Tracking de interacciones para métricas
    document.addEventListener('click', () => {
        if (window.qualityScoreOptimizer) {
            window.qualityScoreOptimizer.performanceData.interactions++;
        }
    });
});