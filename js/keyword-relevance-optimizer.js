/**
 * Keyword Relevance Optimizer for Google Ads Quality Score
 * Optimiza la relevancia de palabras clave y contenido dinámicamente
 */

class KeywordRelevanceOptimizer {
    constructor() {
        this.config = {
            primaryKeywords: [
                'tarot online',
                'videncia telefonica',
                'consulta espiritual',
                'chamanes online',
                'lectura cartas',
                'predicciones futuro',
                'guia espiritual',
                'tarot gratis',
                'vidente profesional',
                'consulta inmediata'
            ],
            secondaryKeywords: [
                'amor y pareja',
                'trabajo y dinero',
                'salud y bienestar',
                'familia y relaciones',
                'decisiones importantes',
                'orientacion personal',
                'energia positiva',
                'proteccion espiritual',
                'rituales y limpias',
                'meditacion guiada'
            ],
            localKeywords: [
                'tarot madrid',
                'vidente barcelona',
                'chamanes mexico',
                'tarot argentina',
                'videncia colombia',
                'tarot chile',
                'vidente peru',
                'tarot venezuela',
                'videncia ecuador',
                'chamanes bolivia'
            ],
            keywordDensityTarget: 2.5, // 2.5%
            minKeywordOccurrences: 3,
            maxKeywordDensity: 4.0, // 4%
            contentGenerated: false // Control para evitar duplicación
        };
        
        this.contentAreas = {
            headlines: [],
            descriptions: [],
            ctaTexts: [],
            metaContent: []
        };
        
        this.keywordMetrics = {
            density: {},
            occurrences: {},
            relevanceScore: 0,
            lastOptimization: null
        };
        
        this.init();
    }
    
    init() {
        this.analyzeCurrentContent();
        this.optimizeMetaTags(); // Solo optimizar meta tags
        this.createSingleOptimizedContainer(); // Un solo contenedor controlado
        this.setupDynamicOptimization();
        this.monitorKeywordPerformance();
        
        console.log('Keyword Relevance Optimizer initialized with controlled content');
    }
    
    optimizeKeywordDensity() {
        // Función simplificada que solo reporta, sin generar contenido adicional
        this.reportEvent('keyword_density_check', {
            current_score: this.keywordMetrics.relevanceScore,
            action: 'monitoring_only'
        });
    }
    
    analyzeCurrentContent() {
        // Analizar contenido existente
        this.contentAreas.headlines = this.extractTextFromElements('h1, h2, h3, .headline, .title');
        this.contentAreas.descriptions = this.extractTextFromElements('p, .description, .content');
        this.contentAreas.ctaTexts = this.extractTextFromElements('button, .cta, .btn, a[href*="consulta"]');
        this.contentAreas.metaContent = this.extractMetaContent();
        
        // Calcular densidad actual de palabras clave
        this.calculateKeywordDensity();
        
        this.reportEvent('content_analysis_complete', {
            headlines_count: this.contentAreas.headlines.length,
            descriptions_count: this.contentAreas.descriptions.length,
            cta_count: this.contentAreas.ctaTexts.length,
            relevance_score: this.keywordMetrics.relevanceScore
        });
    }
    
    extractTextFromElements(selector) {
        const elements = document.querySelectorAll(selector);
        return Array.from(elements).map(el => ({
            element: el,
            text: el.textContent.trim(),
            originalText: el.textContent.trim()
        }));
    }
    
    extractMetaContent() {
        const metaElements = document.querySelectorAll('meta[name="description"], meta[name="keywords"], title');
        return Array.from(metaElements).map(el => ({
            element: el,
            text: el.content || el.textContent,
            type: el.name || el.tagName.toLowerCase()
        }));
    }
    
    calculateKeywordDensity() {
        const allText = this.getAllPageText().toLowerCase();
        const wordCount = allText.split(/\s+/).length;
        
        // Calcular para palabras clave primarias
        this.config.primaryKeywords.forEach(keyword => {
            const regex = new RegExp(keyword.toLowerCase(), 'gi');
            const matches = allText.match(regex) || [];
            const occurrences = matches.length;
            const density = (occurrences / wordCount) * 100;
            
            this.keywordMetrics.density[keyword] = density;
            this.keywordMetrics.occurrences[keyword] = occurrences;
        });
        
        // Calcular score de relevancia general
        this.keywordMetrics.relevanceScore = this.calculateRelevanceScore();
    }
    
    getAllPageText() {
        return document.body.textContent || document.body.innerText || '';
    }
    
    calculateRelevanceScore() {
        let totalScore = 0;
        let keywordCount = 0;
        
        this.config.primaryKeywords.forEach(keyword => {
            const density = this.keywordMetrics.density[keyword] || 0;
            const occurrences = this.keywordMetrics.occurrences[keyword] || 0;
            
            // Score basado en densidad óptima y ocurrencias mínimas
            let keywordScore = 0;
            
            if (occurrences >= this.config.minKeywordOccurrences) {
                if (density >= this.config.keywordDensityTarget && density <= this.config.maxKeywordDensity) {
                    keywordScore = 100;
                } else if (density < this.config.keywordDensityTarget) {
                    keywordScore = (density / this.config.keywordDensityTarget) * 100;
                } else {
                    keywordScore = Math.max(0, 100 - ((density - this.config.maxKeywordDensity) * 20));
                }
            }
            
            totalScore += keywordScore;
            keywordCount++;
        });
        
        return keywordCount > 0 ? totalScore / keywordCount : 0;
    }
    
    createSingleOptimizedContainer() {
        // Verificar si ya se generó contenido para evitar duplicación
        if (this.config.contentGenerated || document.querySelector('.keyword-optimization-container')) {
            return;
        }

        // Crear un solo contenedor con toda la información optimizada
        const container = document.createElement('div');
        container.className = 'keyword-optimization-container';
        container.style.cssText = `
            background: linear-gradient(135deg, rgba(52, 152, 219, 0.08), rgba(155, 89, 182, 0.08));
            border: 1px solid rgba(52, 152, 219, 0.2);
            border-radius: 12px;
            padding: 25px;
            margin: 30px auto;
            max-width: 800px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        `;

        container.innerHTML = `
            <div style="text-align: center; margin-bottom: 25px;">
                <h2 style="color:rgb(255, 255, 255); margin-bottom: 10px; font-size: 1.8em;">
                    🔮 Servicios Espirituales Profesionales
                </h2>
                <p style="color: #7f8c8d; font-size: 1.1em; margin: 0;">
                    Conecta con la sabiduría universal a través de nuestros expertos
                </p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 25px;">
                <div style="background: rgba(255,255,255,0.7); padding: 20px; border-radius: 8px; border-left: 4px solid #3498db;">
                    <h3 style="color: #2980b9; margin-bottom: 10px; font-size: 1.2em;">📱 Tarot Online</h3>
                    <p style="margin: 0; color: #34495e; line-height: 1.5;">
                        Consultas de <strong>tarot online</strong> disponibles 24/7 con videntes profesionales. 
                        Obtén respuestas inmediatas sobre tu futuro.
                    </p>
                </div>
                
                <div style="background: rgba(255,255,255,0.7); padding: 20px; border-radius: 8px; border-left: 4px solid #9b59b6;">
                    <h3 style="color: #8e44ad; margin-bottom: 10px; font-size: 1.2em;">📞 Videncia Telefónica</h3>
                    <p style="margin: 0; color: #34495e; line-height: 1.5;">
                        Servicio de <strong>videncia telefónica</strong> inmediato. Conecta con nuestros expertos 
                        para una <strong>consulta espiritual</strong> personalizada.
                    </p>
                </div>
            </div>

            <div style="background: rgba(255,255,255,0.5); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="color: #27ae60; margin-bottom: 15px; text-align: center;">✨ Especialidades</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">
                    <span style="background: #ecf0f1; padding: 8px 15px; border-radius: 20px; color: #2c3e50; font-size: 0.9em;">Lectura de Cartas</span>
                    <span style="background: #ecf0f1; padding: 8px 15px; border-radius: 20px; color: #2c3e50; font-size: 0.9em;">Predicciones del Futuro</span>
                    <span style="background: #ecf0f1; padding: 8px 15px; border-radius: 20px; color: #2c3e50; font-size: 0.9em;">Chamanes Online</span>
                    <span style="background: #ecf0f1; padding: 8px 15px; border-radius: 20px; color: #2c3e50; font-size: 0.9em;">Guía Espiritual</span>
                </div>
            </div>

            <div style="text-align: center; padding: 15px; background: rgba(46, 204, 113, 0.1); border-radius: 8px;">
                <p style="margin: 0; color: #27ae60; font-weight: 600;">
                    🌟 Consulta inmediata disponible - Vidente profesional esperándote
                </p>
            </div>
        `;

        // Insertar el contenedor en una posición estratégica
        const mainContent = document.querySelector('main, .main-content, .content') || document.body;
        if (mainContent) {
            // Simplemente agregar al final del contenido principal
            mainContent.appendChild(container);
        }

        // Marcar como generado para evitar duplicación
        this.config.contentGenerated = true;
        
        this.reportEvent('single_container_created', {
            container_id: 'keyword-optimization-container',
            keywords_included: this.config.primaryKeywords.slice(0, 6)
        });
    }
    
    optimizeMetaTags() {
        // Optimizar meta description
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = 'description';
            document.head.appendChild(metaDesc);
        }
        
        const optimizedDescription = `Tarot online y videncia telefónica profesional. Consulta espiritual con chamanes expertos. Lectura de cartas y predicciones del futuro. ¡Consulta inmediata 24/7!`;
        metaDesc.content = optimizedDescription;
        
        // Optimizar meta keywords
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
            metaKeywords = document.createElement('meta');
            metaKeywords.name = 'keywords';
            document.head.appendChild(metaKeywords);
        }
        
        metaKeywords.content = this.config.primaryKeywords.join(', ');
        
        // Optimizar title
        const title = document.querySelector('title');
        if (title && !title.textContent.includes('tarot online')) {
            title.textContent = `Tarot Online y Videncia Telefónica - ${title.textContent}`;
        }
    }
    
    setupDynamicOptimization() {
        // Solo seguimiento básico sin generar contenido adicional
        this.trackUserKeywordInteraction();
        this.implementTimeBasedOptimization();
    }
    
    trackUserKeywordInteraction() {
        document.addEventListener('click', (e) => {
            const clickedText = e.target.textContent.toLowerCase();
            
            // Detectar interés en keywords específicas (solo tracking)
            this.config.primaryKeywords.forEach(keyword => {
                if (clickedText.includes(keyword.toLowerCase())) {
                    this.reportEvent('keyword_interaction', { keyword: keyword });
                }
            });
        });
    }
    
    implementTimeBasedOptimization() {
        const hour = new Date().getHours();
        let priorityKeywords = [];
        
        if (hour >= 6 && hour < 12) {
            priorityKeywords = ['consulta espiritual', 'decisiones importantes', 'trabajo y dinero'];
        } else if (hour >= 12 && hour < 18) {
            priorityKeywords = ['tarot online', 'amor y pareja', 'lectura cartas'];
        } else {
            priorityKeywords = ['videncia telefonica', 'predicciones futuro', 'chamanes online'];
        }
        
        this.reportEvent('time_based_optimization', { 
            hour: hour, 
            priority_keywords: priorityKeywords 
        });
    }
    
    monitorKeywordPerformance() {
        setInterval(() => {
            this.calculateKeywordDensity();
            this.reportKeywordMetrics();
            
            // Re-optimizar si el score ha bajado
            if (this.keywordMetrics.relevanceScore < 70) {
                this.optimizeKeywordDensity();
            }
        }, 60000); // Cada minuto
    }
    
    reportKeywordMetrics() {
        this.reportEvent('keyword_metrics', {
            relevance_score: this.keywordMetrics.relevanceScore,
            keyword_densities: this.keywordMetrics.density,
            keyword_occurrences: this.keywordMetrics.occurrences,
            optimization_timestamp: Date.now()
        });
    }
    
    reportEvent(eventName, data = {}) {
        const eventData = {
            event: eventName,
            timestamp: Date.now(),
            page_url: window.location.href,
            ...data
        };
        
        // Enviar a Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, eventData);
        }
        
        console.log('Keyword Optimizer Event:', eventData);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.keywordRelevanceOptimizer = new KeywordRelevanceOptimizer();
});