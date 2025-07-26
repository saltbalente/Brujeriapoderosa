/**
 * Google Ads Campaign Auto-Optimizer
 * Sistema de optimización automática de campañas para maximizar ROI y Quality Score
 */

class CampaignAutoOptimizer {
    constructor() {
        this.config = {
            optimizationEnabled: true,
            autoAdjustBids: true,
            autoAdjustKeywords: true,
            autoAdjustAudiences: true,
            reportingEnabled: true,
            optimizationInterval: 300000, // 5 minutos
            performanceThresholds: {
                excellent: 85,
                good: 70,
                average: 55,
                poor: 40
            }
        };
        
        this.campaignData = {
            performance: {
                ctr: 0,
                conversionRate: 0,
                qualityScore: 0,
                costPerConversion: 0,
                roas: 0,
                impressions: 0,
                clicks: 0,
                conversions: 0
            },
            keywords: {
                performing: new Set(),
                underperforming: new Set(),
                suggested: new Set(),
                negative: new Set()
            },
            audiences: {
                highValue: new Set(),
                lowValue: new Set(),
                suggested: new Set(),
                excluded: new Set()
            },
            bids: {
                current: {},
                suggested: {},
                history: []
            },
            optimizations: {
                applied: [],
                pending: [],
                rejected: []
            }
        };
        
        this.performanceHistory = [];
        this.optimizationRules = this.initializeOptimizationRules();
        
        this.init();
    }
    
    init() {
        this.startPerformanceMonitoring();
        this.initializeOptimizationEngine();
        this.setupAutomaticOptimizations();
        
        console.log('Campaign Auto-Optimizer initialized');
        this.reportEvent('campaign_optimizer_initialized');
    }
    
    initializeOptimizationRules() {
        return {
            bidOptimization: {
                increaseBid: {
                    conditions: ['high_ctr', 'high_conversion_rate', 'low_impression_share'],
                    action: 'increase_bid',
                    factor: 1.2
                },
                decreaseBid: {
                    conditions: ['low_ctr', 'low_conversion_rate', 'high_cost_per_conversion'],
                    action: 'decrease_bid',
                    factor: 0.8
                }
            },
            keywordOptimization: {
                addNegativeKeywords: {
                    conditions: ['high_impressions_low_ctr', 'irrelevant_searches'],
                    action: 'add_negative_keyword'
                },
                expandKeywords: {
                    conditions: ['high_performing_keywords', 'low_impression_share'],
                    action: 'expand_keyword_variations'
                }
            },
            audienceOptimization: {
                excludeAudiences: {
                    conditions: ['low_conversion_rate', 'high_cost_per_conversion'],
                    action: 'exclude_audience'
                },
                targetSimilarAudiences: {
                    conditions: ['high_performing_audience'],
                    action: 'create_similar_audience'
                }
            }
        };
    }
    
    startPerformanceMonitoring() {
        // Monitoreo continuo de rendimiento
        setInterval(() => {
            this.collectPerformanceData();
            this.analyzePerformance();
            this.generateOptimizationRecommendations();
        }, this.config.optimizationInterval);
        
        // Análisis en tiempo real de interacciones
        this.setupRealTimeTracking();
    }
    
    setupRealTimeTracking() {
        // Tracking de conversiones en tiempo real
        document.addEventListener('click', (e) => {
            this.trackUserInteraction(e);
        });
        
        // Tracking de micro-conversiones
        this.setupMicroConversionTracking();
        
        // Tracking de calidad de tráfico
        this.setupTrafficQualityTracking();
    }
    
    trackUserInteraction(event) {
        const element = event.target;
        const interactionData = {
            timestamp: Date.now(),
            element: element.tagName,
            className: element.className,
            id: element.id,
            text: element.textContent?.substring(0, 50),
            position: {
                x: event.clientX,
                y: event.clientY
            }
        };
        
        // Determinar valor de la interacción
        const interactionValue = this.calculateInteractionValue(element);
        
        // Actualizar métricas de campaña
        this.updateCampaignMetrics(interactionValue);
        
        // Reportar interacción valiosa
        if (interactionValue > 0.5) {
            this.reportEvent('high_value_interaction', {
                value: interactionValue,
                element_type: element.tagName,
                interaction_data: interactionData
            });
        }
    }
    
    calculateInteractionValue(element) {
        let value = 0;
        
        const elementText = element.textContent?.toLowerCase() || '';
        const elementClass = element.className?.toLowerCase() || '';
        
        // Interacciones de alta conversión
        if (elementText.includes('consulta') || 
            elementText.includes('contactar') ||
            elementClass.includes('cta')) {
            value += 0.8;
        }
        
        // Interacciones de interés comercial
        if (elementText.includes('precio') || 
            elementText.includes('servicio') ||
            elementText.includes('tarot')) {
            value += 0.6;
        }
        
        // Interacciones de engagement
        if (elementClass.includes('button') || 
            element.tagName === 'A' ||
            elementClass.includes('link')) {
            value += 0.4;
        }
        
        // Bonus por posición en la página
        const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        if (scrollPercent > 0.5) value += 0.2;
        
        return Math.min(value, 1.0);
    }
    
    setupMicroConversionTracking() {
        // Tracking de tiempo en página
        let timeOnPageStart = Date.now();
        
        setInterval(() => {
            const timeOnPage = Date.now() - timeOnPageStart;
            if (timeOnPage > 120000) { // Más de 2 minutos
                this.recordMicroConversion('time_engagement', 0.3);
            }
        }, 30000);
        
        // Tracking de profundidad de scroll
        let maxScrollDepth = 0;
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round(
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            );
            
            if (scrollPercent > maxScrollDepth) {
                maxScrollDepth = scrollPercent;
                
                if (scrollPercent > 75) {
                    this.recordMicroConversion('scroll_depth', 0.4);
                } else if (scrollPercent > 50) {
                    this.recordMicroConversion('scroll_depth', 0.2);
                }
            }
        });
        
        // Tracking de interacciones múltiples
        let interactionCount = 0;
        document.addEventListener('click', () => {
            interactionCount++;
            if (interactionCount >= 3) {
                this.recordMicroConversion('multiple_interactions', 0.5);
            }
        });
    }
    
    recordMicroConversion(type, value) {
        this.campaignData.performance.conversions += value;
        
        this.reportEvent('micro_conversion', {
            type: type,
            value: value,
            timestamp: Date.now()
        });
        
        // Actualizar métricas de campaña
        this.updateConversionRate();
    }
    
    setupTrafficQualityTracking() {
        // Analizar calidad del tráfico
        const trafficQuality = this.analyzeTrafficQuality();
        
        // Ajustar estrategias basado en calidad
        if (trafficQuality.score < 0.5) {
            this.suggestTrafficQualityImprovements(trafficQuality);
        }
    }
    
    analyzeTrafficQuality() {
        const referrer = document.referrer;
        const userAgent = navigator.userAgent;
        const sessionStart = Date.now();
        
        let qualityScore = 0.5; // Base score
        
        // Analizar fuente de tráfico
        if (referrer.includes('google.com')) {
            qualityScore += 0.3; // Tráfico orgánico de Google
        } else if (referrer.includes('facebook') || referrer.includes('instagram')) {
            qualityScore += 0.2; // Tráfico de redes sociales
        } else if (!referrer) {
            qualityScore += 0.1; // Tráfico directo
        }
        
        // Analizar dispositivo
        if (/mobile/i.test(userAgent)) {
            qualityScore += 0.1; // Tráfico móvil
        } else {
            qualityScore += 0.2; // Tráfico desktop
        }
        
        return {
            score: Math.min(qualityScore, 1.0),
            source: this.identifyTrafficSource(referrer),
            device: /mobile/i.test(userAgent) ? 'mobile' : 'desktop',
            timestamp: sessionStart
        };
    }
    
    identifyTrafficSource(referrer) {
        if (!referrer) return 'direct';
        if (referrer.includes('google')) return 'google_search';
        if (referrer.includes('facebook')) return 'facebook';
        if (referrer.includes('instagram')) return 'instagram';
        if (referrer.includes('youtube')) return 'youtube';
        return 'other';
    }
    
    collectPerformanceData() {
        // Simular recolección de datos de rendimiento
        // En implementación real, esto vendría de Google Ads API
        
        const currentPerformance = {
            timestamp: Date.now(),
            ctr: this.calculateCurrentCTR(),
            conversionRate: this.calculateCurrentConversionRate(),
            qualityScore: this.calculateCurrentQualityScore(),
            costPerConversion: this.calculateCostPerConversion(),
            roas: this.calculateROAS(),
            impressions: this.estimateImpressions(),
            clicks: this.estimateClicks()
        };
        
        this.performanceHistory.push(currentPerformance);
        
        // Mantener solo los últimos 100 registros
        if (this.performanceHistory.length > 100) {
            this.performanceHistory.shift();
        }
        
        // Actualizar datos actuales
        this.campaignData.performance = { ...currentPerformance };
    }
    
    calculateCurrentCTR() {
        // Calcular CTR basado en interacciones de la página
        const pageViews = 1; // Asumiendo 1 vista de página actual
        const interactions = window.audienceOptimizer?.performanceData?.interactions || 0;
        
        return Math.min((interactions / Math.max(pageViews, 1)) * 100, 15); // CTR máximo 15%
    }
    
    calculateCurrentConversionRate() {
        const totalInteractions = window.audienceOptimizer?.performanceData?.interactions || 0;
        const conversions = this.campaignData.performance.conversions || 0;
        
        return totalInteractions > 0 ? (conversions / totalInteractions) * 100 : 0;
    }
    
    calculateCurrentQualityScore() {
        // Obtener Quality Score del optimizador principal
        return window.qualityScoreOptimizer?.qualityMetrics?.overallScore || 70;
    }
    
    calculateCostPerConversion() {
        // Simular costo por conversión basado en rendimiento
        const baseCost = 25; // Costo base estimado
        const qualityScore = this.calculateCurrentQualityScore();
        
        // Mejor Quality Score = menor costo
        return baseost * (100 - qualityScore) / 100 + 10;
    }
    
    calculateROAS() {
        // Simular ROAS basado en conversiones y valor estimado
        const conversions = this.campaignData.performance.conversions || 0;
        const estimatedValue = conversions * 50; // Valor promedio por conversión
        const estimatedCost = conversions * this.calculateCostPerConversion();
        
        return estimatedCost > 0 ? estimatedValue / estimatedCost : 0;
    }
    
    estimateImpressions() {
        // Estimar impresiones basado en tiempo en página y calidad
        const timeOnPage = Date.now() - (window.pageStartTime || Date.now());
        const qualityScore = this.calculateCurrentQualityScore();
        
        return Math.round((timeOnPage / 60000) * qualityScore / 10);
    }
    
    estimateClicks() {
        return window.audienceOptimizer?.performanceData?.interactions || 0;
    }
    
    analyzePerformance() {
        if (this.performanceHistory.length < 3) return;
        
        const recent = this.performanceHistory.slice(-3);
        const trends = this.calculateTrends(recent);
        
        // Analizar tendencias y generar insights
        this.generatePerformanceInsights(trends);
        
        // Identificar oportunidades de optimización
        this.identifyOptimizationOpportunities(trends);
    }
    
    calculateTrends(data) {
        const trends = {};
        const metrics = ['ctr', 'conversionRate', 'qualityScore', 'costPerConversion', 'roas'];
        
        metrics.forEach(metric => {
            const values = data.map(d => d[metric]);
            const first = values[0];
            const last = values[values.length - 1];
            
            trends[metric] = {
                direction: last > first ? 'up' : last < first ? 'down' : 'stable',
                change: last - first,
                changePercent: first > 0 ? ((last - first) / first) * 100 : 0
            };
        });
        
        return trends;
    }
    
    generatePerformanceInsights(trends) {
        const insights = [];
        
        // Analizar CTR
        if (trends.ctr.direction === 'down' && Math.abs(trends.ctr.changePercent) > 10) {
            insights.push({
                type: 'warning',
                metric: 'ctr',
                message: 'CTR declining significantly',
                recommendation: 'Review ad copy and targeting'
            });
        }
        
        // Analizar Quality Score
        if (trends.qualityScore.direction === 'down') {
            insights.push({
                type: 'alert',
                metric: 'qualityScore',
                message: 'Quality Score decreasing',
                recommendation: 'Optimize landing page and ad relevance'
            });
        }
        
        // Analizar ROAS
        if (trends.roas.direction === 'up' && trends.roas.changePercent > 20) {
            insights.push({
                type: 'success',
                metric: 'roas',
                message: 'ROAS improving significantly',
                recommendation: 'Consider increasing budget'
            });
        }
        
        // Reportar insights
        insights.forEach(insight => {
            this.reportEvent('performance_insight', insight);
        });
    }
    
    identifyOptimizationOpportunities(trends) {
        const opportunities = [];
        
        // Oportunidades de bid optimization
        if (trends.ctr.direction === 'up' && trends.conversionRate.direction === 'up') {
            opportunities.push({
                type: 'bid_increase',
                reason: 'High performance metrics trending up',
                impact: 'high',
                action: 'increase_bids'
            });
        }
        
        // Oportunidades de keyword optimization
        if (trends.qualityScore.direction === 'down') {
            opportunities.push({
                type: 'keyword_optimization',
                reason: 'Quality Score declining',
                impact: 'medium',
                action: 'review_keywords'
            });
        }
        
        // Oportunidades de audience optimization
        if (trends.costPerConversion.direction === 'up') {
            opportunities.push({
                type: 'audience_refinement',
                reason: 'Cost per conversion increasing',
                impact: 'medium',
                action: 'refine_targeting'
            });
        }
        
        // Añadir a optimizaciones pendientes
        opportunities.forEach(opp => {
            this.campaignData.optimizations.pending.push(opp);
        });
    }
    
    generateOptimizationRecommendations() {
        const recommendations = [];
        
        // Procesar optimizaciones pendientes
        this.campaignData.optimizations.pending.forEach(optimization => {
            const recommendation = this.createOptimizationRecommendation(optimization);
            if (recommendation) {
                recommendations.push(recommendation);
            }
        });
        
        // Aplicar optimizaciones automáticas si están habilitadas
        if (this.config.optimizationEnabled) {
            this.applyAutomaticOptimizations(recommendations);
        }
        
        // Reportar recomendaciones
        this.reportOptimizationRecommendations(recommendations);
    }
    
    createOptimizationRecommendation(optimization) {
        const currentPerformance = this.campaignData.performance;
        
        switch (optimization.type) {
            case 'bid_increase':
                return {
                    type: 'bid_adjustment',
                    action: 'increase',
                    factor: 1.15,
                    reason: optimization.reason,
                    expectedImpact: 'Increase impressions and clicks',
                    confidence: 0.8
                };
                
            case 'keyword_optimization':
                return {
                    type: 'keyword_review',
                    action: 'add_negative_keywords',
                    keywords: this.suggestNegativeKeywords(),
                    reason: optimization.reason,
                    expectedImpact: 'Improve Quality Score and reduce irrelevant traffic',
                    confidence: 0.7
                };
                
            case 'audience_refinement':
                return {
                    type: 'audience_adjustment',
                    action: 'exclude_low_performers',
                    audiences: this.identifyLowPerformingAudiences(),
                    reason: optimization.reason,
                    expectedImpact: 'Reduce cost per conversion',
                    confidence: 0.6
                };
                
            default:
                return null;
        }
    }
    
    suggestNegativeKeywords() {
        // Basado en análisis de contenido y comportamiento del usuario
        const negativeKeywords = [];
        
        // Keywords irrelevantes comunes para servicios espirituales
        const commonNegatives = [
            'gratis', 'free', 'trabajo', 'empleo', 'curso', 'aprender',
            'estudiar', 'universidad', 'escuela', 'niños', 'infantil'
        ];
        
        // Analizar comportamiento del usuario actual
        const userBehavior = window.audienceOptimizer?.audienceData;
        if (userBehavior) {
            // Si el usuario no muestra interés en servicios pagos
            if (userBehavior.psychographics?.pricesensitivity === 'high' && 
                userBehavior.behavior?.conversionProbability < 30) {
                negativeKeywords.push('caro', 'costoso', 'precio alto');
            }
        }
        
        return [...commonNegatives, ...negativeKeywords];
    }
    
    identifyLowPerformingAudiences() {
        // Simular identificación de audiencias de bajo rendimiento
        const lowPerformingAudiences = [];
        
        const currentCPConversion = this.campaignData.performance.costPerConversion;
        
        // Si el costo por conversión es alto, sugerir exclusiones
        if (currentCPConversion > 30) {
            lowPerformingAudiences.push(
                'broad_interest_audiences',
                'low_intent_keywords',
                'mobile_only_if_desktop_performs_better'
            );
        }
        
        return lowPerformingAudiences;
    }
    
    applyAutomaticOptimizations(recommendations) {
        recommendations.forEach(rec => {
            if (rec.confidence > 0.7 && this.shouldApplyOptimization(rec)) {
                this.executeOptimization(rec);
            }
        });
    }
    
    shouldApplyOptimization(recommendation) {
        // Verificar si la optimización debe aplicarse automáticamente
        const safeOptimizations = ['keyword_review', 'audience_adjustment'];
        const riskyOptimizations = ['bid_adjustment'];
        
        // Solo aplicar optimizaciones seguras automáticamente
        if (safeOptimizations.includes(recommendation.type)) {
            return true;
        }
        
        // Para optimizaciones riesgosas, requerir confirmación manual
        if (riskyOptimizations.includes(recommendation.type)) {
            return this.config.autoAdjustBids && recommendation.confidence > 0.8;
        }
        
        return false;
    }
    
    executeOptimization(recommendation) {
        const optimization = {
            timestamp: Date.now(),
            type: recommendation.type,
            action: recommendation.action,
            details: recommendation,
            status: 'applied'
        };
        
        // Simular aplicación de optimización
        switch (recommendation.type) {
            case 'bid_adjustment':
                this.adjustBids(recommendation);
                break;
                
            case 'keyword_review':
                this.updateKeywords(recommendation);
                break;
                
            case 'audience_adjustment':
                this.adjustAudiences(recommendation);
                break;
        }
        
        // Registrar optimización aplicada
        this.campaignData.optimizations.applied.push(optimization);
        
        // Reportar optimización
        this.reportEvent('optimization_applied', optimization);
    }
    
    adjustBids(recommendation) {
        const currentBids = this.campaignData.bids.current;
        const factor = recommendation.factor || 1.1;
        
        // Simular ajuste de pujas
        Object.keys(currentBids).forEach(keyword => {
            if (recommendation.action === 'increase') {
                currentBids[keyword] *= factor;
            } else if (recommendation.action === 'decrease') {
                currentBids[keyword] /= factor;
            }
        });
        
        // Registrar historial
        this.campaignData.bids.history.push({
            timestamp: Date.now(),
            action: recommendation.action,
            factor: factor,
            reason: recommendation.reason
        });
    }
    
    updateKeywords(recommendation) {
        if (recommendation.action === 'add_negative_keywords') {
            recommendation.keywords.forEach(keyword => {
                this.campaignData.keywords.negative.add(keyword);
            });
        }
    }
    
    adjustAudiences(recommendation) {
        if (recommendation.action === 'exclude_low_performers') {
            recommendation.audiences.forEach(audience => {
                this.campaignData.audiences.excluded.add(audience);
            });
        }
    }
    
    createOptimizationDashboard() {
        if (!document.querySelector('.campaign-optimizer-dashboard')) {
            const dashboard = document.createElement('div');
            dashboard.className = 'campaign-optimizer-dashboard';
            dashboard.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 20px;
                background: rgba(0, 0, 0, 0.9);
                border: 1px solid #722f37;
                border-radius: 10px;
                padding: 15px;
                color: white;
                font-family: Arial, sans-serif;
                font-size: 12px;
                min-width: 250px;
                z-index: 9998;
                backdrop-filter: blur(10px);
            `;
            
            dashboard.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <strong style="color: #722f37;">Campaign Optimizer</strong>
                    <span onclick="this.closest('.campaign-optimizer-dashboard').style.display='none'" style="cursor: pointer; color: #999;">×</span>
                </div>
                <div class="metrics-display">
                    <div class="metric-row" style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span>CTR:</span>
                        <span class="ctr-value" style="font-weight: bold; color: #3498db;">--</span>
                    </div>
                    <div class="metric-row" style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span>Conv. Rate:</span>
                        <span class="conv-rate-value" style="font-weight: bold; color: #2ecc71;">--</span>
                    </div>
                    <div class="metric-row" style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span>Quality Score:</span>
                        <span class="quality-score-value" style="font-weight: bold; color: #f39c12;">--</span>
                    </div>
                    <div class="metric-row" style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span>ROAS:</span>
                        <span class="roas-value" style="font-weight: bold; color: #e74c3c;">--</span>
                    </div>
                </div>
                <div class="optimization-status" style="text-align: center; margin-top: 10px; padding: 5px; border-radius: 5px; font-size: 10px; font-weight: bold; background: #2c3e50;">
                    Monitoring...
                </div>
            `;
            
            document.body.appendChild(dashboard);
        }
    }
    
    updateOptimizationDashboard() {
        const dashboard = document.querySelector('.campaign-optimizer-dashboard');
        if (!dashboard) return;
        
        const performance = this.campaignData.performance;
        
        const ctrValue = dashboard.querySelector('.ctr-value');
        const convRateValue = dashboard.querySelector('.conv-rate-value');
        const qualityScoreValue = dashboard.querySelector('.quality-score-value');
        const roasValue = dashboard.querySelector('.roas-value');
        const statusIndicator = dashboard.querySelector('.optimization-status');
        
        if (ctrValue) ctrValue.textContent = performance.ctr.toFixed(2) + '%';
        if (convRateValue) convRateValue.textContent = performance.conversionRate.toFixed(2) + '%';
        if (qualityScoreValue) qualityScoreValue.textContent = Math.round(performance.qualityScore);
        if (roasValue) roasValue.textContent = performance.roas.toFixed(2) + 'x';
        
        // Actualizar estado
        const appliedOptimizations = this.campaignData.optimizations.applied.length;
        const pendingOptimizations = this.campaignData.optimizations.pending.length;
        
        if (statusIndicator) {
            if (pendingOptimizations > 0) {
                statusIndicator.textContent = `${pendingOptimizations} optimizations pending`;
                statusIndicator.style.background = '#f39c12';
            } else if (appliedOptimizations > 0) {
                statusIndicator.textContent = `${appliedOptimizations} optimizations active`;
                statusIndicator.style.background = '#2ecc71';
            } else {
                statusIndicator.textContent = 'Monitoring performance';
                statusIndicator.style.background = '#2c3e50';
            }
        }
    }
    
    reportOptimizationRecommendations(recommendations) {
        if (recommendations.length === 0) return;
        
        this.reportEvent('optimization_recommendations_generated', {
            count: recommendations.length,
            recommendations: recommendations.map(rec => ({
                type: rec.type,
                action: rec.action,
                confidence: rec.confidence,
                expectedImpact: rec.expectedImpact
            }))
        });
    }
    
    initializeOptimizationEngine() {
        // Motor de optimización que se ejecuta continuamente
        setInterval(() => {
            this.updateOptimizationDashboard();
            this.cleanupOldOptimizations();
        }, 30000); // Cada 30 segundos
    }
    
    setupAutomaticOptimizations() {
        // Configurar optimizaciones automáticas basadas en reglas
        setInterval(() => {
            if (this.config.optimizationEnabled) {
                this.runAutomaticOptimizationRules();
            }
        }, this.config.optimizationInterval);
    }
    
    runAutomaticOptimizationRules() {
        const performance = this.campaignData.performance;
        
        // Regla: Si Quality Score es bajo, optimizar página
        if (performance.qualityScore < this.config.performanceThresholds.average) {
            this.triggerQualityScoreOptimization();
        }
        
        // Regla: Si CTR es alto pero conversiones bajas, optimizar landing page
        if (performance.ctr > 3 && performance.conversionRate < 2) {
            this.triggerLandingPageOptimization();
        }
        
        // Regla: Si ROAS es alto, considerar aumentar presupuesto
        if (performance.roas > 3) {
            this.suggestBudgetIncrease();
        }
    }
    
    triggerQualityScoreOptimization() {
        if (window.qualityScoreOptimizer) {
            window.qualityScoreOptimizer.triggerEmergencyOptimizations();
        }
        
        this.reportEvent('quality_score_optimization_triggered', {
            currentScore: this.campaignData.performance.qualityScore
        });
    }
    
    triggerLandingPageOptimization() {
        if (window.landingPageOptimizer) {
            window.landingPageOptimizer.optimizePage();
        }
        
        this.reportEvent('landing_page_optimization_triggered', {
            ctr: this.campaignData.performance.ctr,
            conversionRate: this.campaignData.performance.conversionRate
        });
    }
    
    suggestBudgetIncrease() {
        const suggestion = {
            type: 'budget_increase',
            currentROAS: this.campaignData.performance.roas,
            suggestedIncrease: '20%',
            reason: 'High ROAS indicates profitable traffic',
            confidence: 0.8
        };
        
        this.reportEvent('budget_increase_suggested', suggestion);
    }
    
    cleanupOldOptimizations() {
        const cutoffTime = Date.now() - (24 * 60 * 60 * 1000); // 24 horas
        
        // Limpiar optimizaciones aplicadas antiguas
        this.campaignData.optimizations.applied = this.campaignData.optimizations.applied.filter(
            opt => opt.timestamp > cutoffTime
        );
        
        // Limpiar optimizaciones pendientes antiguas
        this.campaignData.optimizations.pending = this.campaignData.optimizations.pending.filter(
            opt => opt.timestamp > cutoffTime
        );
    }
    
    updateConversionRate() {
        const totalInteractions = window.audienceOptimizer?.performanceData?.interactions || 0;
        const conversions = this.campaignData.performance.conversions || 0;
        
        this.campaignData.performance.conversionRate = totalInteractions > 0 ? 
            (conversions / totalInteractions) * 100 : 0;
    }
    
    reportEvent(eventName, data = {}) {
        if (!this.config.reportingEnabled) return;
        
        const eventData = {
            event: eventName,
            timestamp: Date.now(),
            campaign_performance: {
                ctr: this.campaignData.performance.ctr,
                conversion_rate: this.campaignData.performance.conversionRate,
                quality_score: this.campaignData.performance.qualityScore,
                roas: this.campaignData.performance.roas
            },
            ...data
        };
        
        // Enviar a Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, eventData);
        }
        
        console.log('Campaign Auto-Optimizer:', eventData);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Esperar a que otros optimizadores se inicialicen
    setTimeout(() => {
        window.campaignAutoOptimizer = new CampaignAutoOptimizer();
    }, 2000);
});