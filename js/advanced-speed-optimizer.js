/**
 * Advanced Speed Optimizer para Google Ads Quality Score
 * Optimiza específicamente Core Web Vitals y métricas de rendimiento
 * que Google Ads considera para el Quality Score
 */

class AdvancedSpeedOptimizer {
    constructor() {
        this.performanceMetrics = {
            LCP: 0,
            FID: 0,
            CLS: 0,
            TTFB: 0,
            FCP: 0
        };
        
        this.optimizationTargets = {
            LCP: 2500, // 2.5 segundos
            FID: 100,  // 100ms
            CLS: 0.1,  // 0.1
            TTFB: 600, // 600ms
            FCP: 1800  // 1.8 segundos
        };
        
        this.init();
    }

    init() {
        console.log('⚡ Advanced Speed Optimizer iniciado');
        
        // Optimizaciones inmediatas
        this.preloadCriticalResources();
        this.optimizeImages();
        this.optimizeFonts();
        this.minimizeRenderBlocking();
        
        // Medición y optimización continua
        this.measureCoreWebVitals();
        this.setupPerformanceMonitoring();
        this.optimizeJavaScript();
        this.setupResourceHints();
        this.implementServiceWorker();
    }

    // Preload de recursos críticos optimizado
    preloadCriticalResources() {
        const criticalResources = [
            { href: 'css/brujocss.css', as: 'style', priority: 'high' },
            { href: 'js/dynamic-landing-optimizer.js', as: 'script', priority: 'high' },
            { href: 'imagenes/IMG_0162.JPG', as: 'image', priority: 'high' }
        ];

        criticalResources.forEach(resource => {
            // Verificar si ya existe
            const existing = document.querySelector(`link[href="${resource.href}"]`);
            if (!existing) {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.href = resource.href;
                link.as = resource.as;
                
                // Agregar prioridad si es soportada
                if (resource.priority && 'fetchPriority' in HTMLLinkElement.prototype) {
                    link.fetchPriority = resource.priority;
                }
                
                // Agregar crossorigin para fuentes
                if (resource.as === 'font') {
                    link.crossOrigin = 'anonymous';
                }
                
                document.head.appendChild(link);
            }
        });

        // Preload de fuentes críticas
        this.preloadCriticalFonts();
    }

    preloadCriticalFonts() {
        const criticalFonts = [
            'https://fonts.gstatic.com/s/opensans/v34/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0B4gaVc.woff2'
        ];

        criticalFonts.forEach(fontUrl => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = fontUrl;
            link.as = 'font';
            link.type = 'font/woff2';
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });
    }

    // Optimización avanzada de imágenes
    optimizeImages() {
        // Lazy loading con IntersectionObserver optimizado
        this.setupAdvancedLazyLoading();
        
        // Optimización de formato de imagen
        this.optimizeImageFormats();
        
        // Responsive images
        this.setupResponsiveImages();
    }

    setupAdvancedLazyLoading() {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Preload de imagen antes de mostrarla
                    const tempImg = new Image();
                    tempImg.onload = () => {
                        img.src = img.dataset.src || img.src;
                        img.classList.remove('lazy');
                        img.classList.add('loaded');
                        
                        // Fade in suave
                        img.style.transition = 'opacity 0.3s ease';
                        img.style.opacity = '1';
                    };
                    tempImg.src = img.dataset.src || img.src;
                    
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px', // Cargar 50px antes de que sea visible
            threshold: 0.01
        });

        // Aplicar a todas las imágenes
        document.querySelectorAll('img').forEach(img => {
            // Configurar lazy loading si no está configurado
            if (!img.loading) {
                img.loading = 'lazy';
            }
            
            // Configurar decoding asíncrono
            img.decoding = 'async';
            
            // Aplicar observer si tiene data-src
            if (img.dataset.src) {
                img.style.opacity = '0';
                imageObserver.observe(img);
            }
        });
    }

    optimizeImageFormats() {
        // Detectar soporte para formatos modernos
        const supportsWebP = this.supportsImageFormat('webp');
        const supportsAVIF = this.supportsImageFormat('avif');
        
        document.querySelectorAll('img').forEach(img => {
            const src = img.src || img.dataset.src;
            if (src && src.includes('.jpg') || src.includes('.png')) {
                // Intentar cargar formato optimizado si está disponible
                if (supportsAVIF) {
                    const avifSrc = src.replace(/\.(jpg|png)$/i, '.avif');
                    this.tryOptimizedFormat(img, avifSrc, src);
                } else if (supportsWebP) {
                    const webpSrc = src.replace(/\.(jpg|png)$/i, '.webp');
                    this.tryOptimizedFormat(img, webpSrc, src);
                }
            }
        });
    }

    supportsImageFormat(format) {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        return canvas.toDataURL(`image/${format}`).indexOf(`data:image/${format}`) === 0;
    }

    tryOptimizedFormat(img, optimizedSrc, fallbackSrc) {
        const testImg = new Image();
        testImg.onload = () => {
            if (img.dataset.src) {
                img.dataset.src = optimizedSrc;
            } else {
                img.src = optimizedSrc;
            }
        };
        testImg.onerror = () => {
            // Mantener formato original si el optimizado no está disponible
            if (img.dataset.src) {
                img.dataset.src = fallbackSrc;
            } else {
                img.src = fallbackSrc;
            }
        };
        testImg.src = optimizedSrc;
    }

    setupResponsiveImages() {
        document.querySelectorAll('img').forEach(img => {
            if (!img.sizes && !img.srcset) {
                // Agregar sizes básico para imágenes responsivas
                img.sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
            }
        });
    }

    // Optimización de fuentes
    optimizeFonts() {
        // Font display optimization
        this.optimizeFontDisplay();
        
        // Preconnect a Google Fonts
        this.setupFontPreconnections();
        
        // Font loading optimization
        this.optimizeFontLoading();
    }

    optimizeFontDisplay() {
        const style = document.createElement('style');
        style.textContent = `
            @font-face {
                font-family: 'Open Sans';
                font-display: swap;
                src: local('Open Sans'), url('https://fonts.gstatic.com/s/opensans/v34/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0B4gaVc.woff2') format('woff2');
            }
            
            /* Fallback font stack */
            body {
                font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            }
        `;
        document.head.appendChild(style);
    }

    setupFontPreconnections() {
        const fontConnections = [
            'https://fonts.googleapis.com',
            'https://fonts.gstatic.com'
        ];

        fontConnections.forEach(url => {
            if (!document.querySelector(`link[href="${url}"]`)) {
                const link = document.createElement('link');
                link.rel = 'preconnect';
                link.href = url;
                link.crossOrigin = 'anonymous';
                document.head.appendChild(link);
            }
        });
    }

    optimizeFontLoading() {
        if ('fonts' in document) {
            // Cargar fuentes críticas inmediatamente
            const criticalFonts = [
                new FontFace('Open Sans', 'url(https://fonts.gstatic.com/s/opensans/v34/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0B4gaVc.woff2)', {
                    weight: '400',
                    style: 'normal',
                    display: 'swap'
                })
            ];

            criticalFonts.forEach(font => {
                font.load().then(loadedFont => {
                    document.fonts.add(loadedFont);
                }).catch(err => {
                    console.warn('Font loading failed:', err);
                });
            });
        }
    }

    // Minimizar bloqueo de renderizado
    minimizeRenderBlocking() {
        // Defer non-critical JavaScript
        this.deferNonCriticalJS();
        
        // Inline critical CSS
        this.inlineCriticalCSS();
        
        // Optimize CSS delivery
        this.optimizeCSSDelivery();
    }

    deferNonCriticalJS() {
        document.querySelectorAll('script[src]').forEach(script => {
            // No defer scripts críticos
            const criticalScripts = [
                'dynamic-landing-optimizer.js',
                'google-ads-config.js'
            ];
            
            const isCritical = criticalScripts.some(critical => 
                script.src.includes(critical)
            );
            
            if (!isCritical && !script.async && !script.defer) {
                script.defer = true;
            }
        });
    }

    inlineCriticalCSS() {
        // CSS crítico para above-the-fold
        const criticalCSS = `
            body { 
                margin: 0; 
                font-family: 'Open Sans', sans-serif; 
                line-height: 1.6; 
                color: #333;
            }
            .hero-section { 
                min-height: 100vh; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
            }
            .mystic-button {
                background: linear-gradient(135deg, #722f37, #8b3a42);
                color: white;
                padding: 15px 30px;
                border: none;
                border-radius: 25px;
                font-weight: bold;
                cursor: pointer;
                transition: transform 0.3s ease;
            }
            .mystic-button:hover {
                transform: translateY(-2px);
            }
        `;

        const style = document.createElement('style');
        style.textContent = criticalCSS;
        document.head.insertBefore(style, document.head.firstChild);
    }

    optimizeCSSDelivery() {
        // Cargar CSS no crítico de forma asíncrona
        document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
            if (!link.media || link.media === 'all') {
                // Cargar de forma no bloqueante
                link.media = 'print';
                link.onload = function() {
                    this.media = 'all';
                    this.onload = null;
                };
            }
        });
    }

    // Medición de Core Web Vitals
    measureCoreWebVitals() {
        // Largest Contentful Paint (LCP)
        this.measureLCP();
        
        // First Input Delay (FID)
        this.measureFID();
        
        // Cumulative Layout Shift (CLS)
        this.measureCLS();
        
        // Time to First Byte (TTFB)
        this.measureTTFB();
        
        // First Contentful Paint (FCP)
        this.measureFCP();
    }

    measureLCP() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                const lastEntry = entries[entries.length - 1];
                
                this.performanceMetrics.LCP = lastEntry.startTime;
                this.reportMetric('LCP', lastEntry.startTime);
                
                // Optimizar si es necesario
                if (lastEntry.startTime > this.optimizationTargets.LCP) {
                    this.optimizeLCP();
                }
            });
            
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
        }
    }

    measureFID() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((entryList) => {
                const firstInput = entryList.getEntries()[0];
                const fid = firstInput.processingStart - firstInput.startTime;
                
                this.performanceMetrics.FID = fid;
                this.reportMetric('FID', fid);
                
                if (fid > this.optimizationTargets.FID) {
                    this.optimizeFID();
                }
            });
            
            observer.observe({ entryTypes: ['first-input'] });
        }
    }

    measureCLS() {
        if ('PerformanceObserver' in window) {
            let clsValue = 0;
            
            const observer = new PerformanceObserver((entryList) => {
                for (const entry of entryList.getEntries()) {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                }
                
                this.performanceMetrics.CLS = clsValue;
                this.reportMetric('CLS', clsValue);
                
                if (clsValue > this.optimizationTargets.CLS) {
                    this.optimizeCLS();
                }
            });
            
            observer.observe({ entryTypes: ['layout-shift'] });
        }
    }

    measureTTFB() {
        const navigationEntry = performance.getEntriesByType('navigation')[0];
        if (navigationEntry) {
            const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
            this.performanceMetrics.TTFB = ttfb;
            this.reportMetric('TTFB', ttfb);
        }
    }

    measureFCP() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                const fcp = entries[0];
                
                this.performanceMetrics.FCP = fcp.startTime;
                this.reportMetric('FCP', fcp.startTime);
            });
            
            observer.observe({ entryTypes: ['paint'] });
        }
    }

    // Optimizaciones específicas
    optimizeLCP() {
        console.log('🎯 Optimizando LCP...');
        
        // Preload de imagen LCP
        const lcpElements = document.querySelectorAll('img, video, [style*="background-image"]');
        lcpElements.forEach(element => {
            if (this.isInViewport(element)) {
                if (element.tagName === 'IMG') {
                    element.loading = 'eager';
                    element.fetchPriority = 'high';
                }
            }
        });
    }

    optimizeFID() {
        console.log('🎯 Optimizando FID...');
        
        // Dividir tareas largas
        this.breakUpLongTasks();
        
        // Usar requestIdleCallback para tareas no críticas
        this.deferNonCriticalTasks();
    }

    optimizeCLS() {
        console.log('🎯 Optimizando CLS...');
        
        // Reservar espacio para imágenes
        document.querySelectorAll('img').forEach(img => {
            if (!img.width || !img.height) {
                img.style.aspectRatio = '16/9';
            }
        });
        
        // Evitar inserción de contenido dinámico arriba del fold
        this.preventLayoutShifts();
    }

    breakUpLongTasks() {
        // Usar scheduler API si está disponible
        if ('scheduler' in window && 'postTask' in window.scheduler) {
            window.scheduler.postTask(() => {
                // Tareas no críticas
                this.runNonCriticalTasks();
            }, { priority: 'background' });
        } else {
            // Fallback con setTimeout
            setTimeout(() => {
                this.runNonCriticalTasks();
            }, 0);
        }
    }

    deferNonCriticalTasks() {
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                this.runNonCriticalTasks();
            });
        } else {
            setTimeout(() => {
                this.runNonCriticalTasks();
            }, 100);
        }
    }

    runNonCriticalTasks() {
        // Tareas que pueden ejecutarse después
        this.setupAnalytics();
        this.loadNonCriticalWidgets();
    }

    preventLayoutShifts() {
        // Reservar espacio para elementos dinámicos
        const dynamicElements = document.querySelectorAll('[data-dynamic]');
        dynamicElements.forEach(element => {
            if (!element.style.minHeight) {
                element.style.minHeight = '100px';
            }
        });
    }

    // Optimización de JavaScript
    optimizeJavaScript() {
        // Code splitting simulation
        this.implementCodeSplitting();
        
        // Tree shaking simulation
        this.removeUnusedCode();
        
        // Minification simulation
        this.optimizeCodeExecution();
    }

    implementCodeSplitting() {
        // Cargar módulos bajo demanda
        const lazyModules = [
            'js/bid-optimizer.js',
            'js/conversion-optimizer.js'
        ];

        lazyModules.forEach(module => {
            // Cargar solo cuando sea necesario
            this.loadModuleOnDemand(module);
        });
    }

    loadModuleOnDemand(modulePath) {
        // Cargar módulo cuando el usuario interactúe
        document.addEventListener('click', () => {
            if (!document.querySelector(`script[src="${modulePath}"]`)) {
                const script = document.createElement('script');
                script.src = modulePath;
                script.defer = true;
                document.head.appendChild(script);
            }
        }, { once: true });
    }

    removeUnusedCode() {
        // Remover event listeners no utilizados
        const unusedElements = document.querySelectorAll('[onclick]:not([data-used])');
        unusedElements.forEach(element => {
            if (!this.isElementVisible(element)) {
                element.removeAttribute('onclick');
            }
        });
    }

    optimizeCodeExecution() {
        // Usar Web Workers para tareas pesadas
        if ('Worker' in window) {
            this.setupWebWorkers();
        }
        
        // Optimizar loops y operaciones
        this.optimizeLoops();
    }

    setupWebWorkers() {
        // Worker para cálculos pesados
        const workerCode = `
            self.onmessage = function(e) {
                const { type, data } = e.data;
                
                if (type === 'heavyCalculation') {
                    // Simular cálculo pesado
                    const result = data.map(item => item * 2);
                    self.postMessage({ type: 'result', data: result });
                }
            };
        `;
        
        const blob = new Blob([workerCode], { type: 'application/javascript' });
        const worker = new Worker(URL.createObjectURL(blob));
        
        worker.onmessage = (e) => {
            console.log('Worker result:', e.data);
        };
        
        this.worker = worker;
    }

    optimizeLoops() {
        // Usar requestAnimationFrame para operaciones visuales
        const visualUpdates = [];
        
        const updateVisuals = () => {
            if (visualUpdates.length > 0) {
                const update = visualUpdates.shift();
                update();
                requestAnimationFrame(updateVisuals);
            }
        };
        
        this.scheduleVisualUpdate = (updateFn) => {
            visualUpdates.push(updateFn);
            if (visualUpdates.length === 1) {
                requestAnimationFrame(updateVisuals);
            }
        };
    }

    // Resource hints
    setupResourceHints() {
        // DNS prefetch
        this.setupDNSPrefetch();
        
        // Preconnect
        this.setupPreconnect();
        
        // Prefetch
        this.setupPrefetch();
    }

    setupDNSPrefetch() {
        const domains = [
            'https://www.google-analytics.com',
            'https://www.googletagmanager.com',
            'https://fonts.googleapis.com'
        ];

        domains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'dns-prefetch';
            link.href = domain;
            document.head.appendChild(link);
        });
    }

    setupPreconnect() {
        const criticalDomains = [
            'https://fonts.gstatic.com'
        ];

        criticalDomains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = domain;
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });
    }

    setupPrefetch() {
        // Prefetch de recursos que probablemente se necesiten
        const prefetchResources = [
            'js/mystic-particles.js'
        ];

        // Prefetch después de que la página esté cargada
        window.addEventListener('load', () => {
            setTimeout(() => {
                prefetchResources.forEach(resource => {
                    const link = document.createElement('link');
                    link.rel = 'prefetch';
                    link.href = resource;
                    document.head.appendChild(link);
                });
            }, 2000);
        });
    }

    // Service Worker para caching
    implementServiceWorker() {
        if ('serviceWorker' in navigator) {
            const swCode = `
                const CACHE_NAME = 'speed-optimizer-v1';
                const urlsToCache = [
                    '/',
                    '/css/brujocss.css',
                    '/js/dynamic-landing-optimizer.js',
                    '/imagenes/IMG_0162.JPG'
                ];

                self.addEventListener('install', (event) => {
                    event.waitUntil(
                        caches.open(CACHE_NAME)
                            .then((cache) => cache.addAll(urlsToCache))
                    );
                });

                self.addEventListener('fetch', (event) => {
                    event.respondWith(
                        caches.match(event.request)
                            .then((response) => {
                                return response || fetch(event.request);
                            })
                    );
                });
            `;

            const blob = new Blob([swCode], { type: 'application/javascript' });
            const swUrl = URL.createObjectURL(blob);

            navigator.serviceWorker.register(swUrl)
                .then((registration) => {
                    console.log('✅ Service Worker registrado:', registration);
                })
                .catch((error) => {
                    console.log('❌ Error registrando Service Worker:', error);
                });
        }
    }

    // Monitoreo de rendimiento
    setupPerformanceMonitoring() {
        // Reportar métricas cada 30 segundos
        setInterval(() => {
            this.reportPerformanceScore();
        }, 30000);

        // Reportar al salir de la página
        window.addEventListener('beforeunload', () => {
            this.reportFinalMetrics();
        });
    }

    reportPerformanceScore() {
        const score = this.calculatePerformanceScore();
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'performance_score', {
                event_category: 'speed_optimization',
                event_label: 'core_web_vitals',
                value: score,
                custom_parameter_1: JSON.stringify(this.performanceMetrics)
            });
        }

        console.log('📊 Performance Score:', score, this.performanceMetrics);
    }

    calculatePerformanceScore() {
        let score = 100;

        // Penalizar métricas que excedan los targets
        if (this.performanceMetrics.LCP > this.optimizationTargets.LCP) {
            score -= 20;
        }
        if (this.performanceMetrics.FID > this.optimizationTargets.FID) {
            score -= 20;
        }
        if (this.performanceMetrics.CLS > this.optimizationTargets.CLS) {
            score -= 20;
        }
        if (this.performanceMetrics.TTFB > this.optimizationTargets.TTFB) {
            score -= 15;
        }
        if (this.performanceMetrics.FCP > this.optimizationTargets.FCP) {
            score -= 15;
        }

        return Math.max(score, 0);
    }

    reportMetric(metricName, value) {
        console.log(`📊 ${metricName}:`, value);
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'core_web_vital', {
                event_category: 'performance',
                event_label: metricName,
                value: Math.round(value),
                custom_parameter_1: metricName
            });
        }
    }

    reportFinalMetrics() {
        const finalScore = this.calculatePerformanceScore();
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'final_performance_score', {
                event_category: 'speed_optimization',
                event_label: 'session_end',
                value: finalScore,
                custom_parameter_1: JSON.stringify(this.performanceMetrics)
            });
        }
    }

    // Utilidades
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    isElementVisible(element) {
        return element.offsetWidth > 0 && element.offsetHeight > 0;
    }

    setupAnalytics() {
        // Configurar analytics no críticos
        console.log('📈 Analytics no críticos configurados');
    }

    loadNonCriticalWidgets() {
        // Cargar widgets no críticos
        console.log('🔧 Widgets no críticos cargados');
    }
}

// Inicializar inmediatamente
console.log('⚡ Iniciando Advanced Speed Optimizer...');
new AdvancedSpeedOptimizer();