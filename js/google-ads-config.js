/**
 * Configuración avanzada para Google Ads Quality Score
 * Este archivo contiene configuraciones específicas para maximizar la calificación
 */

// Configuración de eventos personalizados para Google Ads
const GoogleAdsConfig = {
    // Configuración de conversiones
    conversions: {
        'contact_form': { value: 40000, currency: 'COP' },
        'phone_call': { value: 60000, currency: 'COP' },
        'whatsapp_contact': { value: 48000, currency: 'COP' },
        'email_contact': { value: 32000, currency: 'COP' },
        'consultation_request': { value: 80000, currency: 'COP' }
    },

    // Configuración de audiencias
    audiences: {
        'high_intent': {
            timeOnPage: 120, // 2 minutos
            scrollDepth: 75,
            interactions: 5
        },
        'engaged_user': {
            timeOnPage: 60,
            scrollDepth: 50,
            interactions: 3
        }
    },

    // Configuración de calidad de página
    pageQuality: {
        loadTime: 3000, // 3 segundos máximo
        interactivity: 100, // FID máximo 100ms
        visualStability: 0.1 // CLS máximo 0.1
    }
};

// Función para reportar eventos de alta calidad a Google Ads
function reportHighQualityEvent(eventName, parameters = {}) {
    const eventData = {
        event_category: 'quality_engagement',
        event_label: 'high_value_interaction',
        value: 1,
        ...parameters
    };

    // Enviar a Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }

    // Enviar a Google Tag Manager
    if (typeof dataLayer !== 'undefined') {
        dataLayer.push({
            event: eventName,
            ...eventData
        });
    }

    console.log(`📈 Evento de alta calidad reportado: ${eventName}`, eventData);
}

// Función para mejorar la relevancia del contenido
function enhanceContentRelevance() {
    // Agregar palabras clave relevantes de forma natural
    const keywords = [
        'servicios espirituales',
        'consultas místicas',
        'rituales personalizados',
        'experiencia profesional',
        'resultados garantizados'
    ];

    // Crear contenido dinámico relevante
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
        const currentKeywords = metaKeywords.content;
        const enhancedKeywords = currentKeywords + ', ' + keywords.join(', ');
        metaKeywords.content = enhancedKeywords;
    }
}

// Función para optimizar la experiencia del usuario
function optimizeUserExperience() {
    // Mejorar la navegación
    addKeyboardNavigation();
    
    // Optimizar formularios
    optimizeForms();
    
    // Mejorar accesibilidad
    enhanceAccessibility();
    
    // Optimizar velocidad
    optimizePerformance();
}

function addKeyboardNavigation() {
    document.querySelectorAll('a, button, [tabindex]').forEach((element, index) => {
        if (!element.tabIndex || element.tabIndex < 0) {
            element.tabIndex = index + 1;
        }
        
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid #722f37';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = '';
            element.style.outlineOffset = '';
        });
    });
}

function optimizeForms() {
    document.querySelectorAll('form').forEach(form => {
        // Agregar validación en tiempo real
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                validateField(input);
            });
        });
        
        // Mejorar la experiencia de envío
        form.addEventListener('submit', (e) => {
            reportHighQualityEvent('form_interaction', {
                form_id: form.id || 'contact_form',
                interaction_quality: 'high'
            });
        });
    });
}

function validateField(field) {
    const isValid = field.checkValidity();
    if (!isValid) {
        field.style.borderColor = '#dc3545';
        field.setAttribute('aria-invalid', 'true');
    } else {
        field.style.borderColor = '#28a745';
        field.setAttribute('aria-invalid', 'false');
    }
    return isValid;
}

function enhanceAccessibility() {
    // Agregar roles ARIA
    document.querySelectorAll('nav').forEach(nav => {
        nav.setAttribute('role', 'navigation');
    });
    
    document.querySelectorAll('main').forEach(main => {
        main.setAttribute('role', 'main');
    });
    
    // Mejorar contraste
    const style = document.createElement('style');
    style.textContent = `
        .high-contrast {
            filter: contrast(1.2) brightness(1.1);
        }
        
        .focus-visible {
            outline: 3px solid #722f37 !important;
            outline-offset: 2px !important;
        }
    `;
    document.head.appendChild(style);
}

function optimizePerformance() {
    // Optimizar imágenes
    document.querySelectorAll('img').forEach(img => {
        if (!img.loading) {
            img.loading = 'lazy';
        }
        if (!img.decoding) {
            img.decoding = 'async';
        }
    });
    
    // Optimizar videos
    document.querySelectorAll('video').forEach(video => {
        video.preload = 'metadata';
        video.setAttribute('playsinline', '');
    });
    
    // Precargar recursos críticos
    const criticalResources = [
        { href: 'css/brujocss.css', as: 'style' },
        { href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap', as: 'style' }
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource.href;
        link.as = resource.as;
        if (!document.querySelector(`link[href="${resource.href}"]`)) {
            document.head.appendChild(link);
        }
    });
}

// Función para tracking avanzado de conversiones
function setupAdvancedConversionTracking() {
    // Tracking de micro-conversiones
    const microConversions = [
        { selector: '.phone-link', event: 'phone_number_view' },
        { selector: '.button-miwhatsapp', event: 'whatsapp_button_view' },
        { selector: '.mystic-button', event: 'service_button_view' },
        { selector: '.arcane-cta-btn', event: 'cta_button_view' }
    ];
    
    microConversions.forEach(conversion => {
        document.querySelectorAll(conversion.selector).forEach(element => {
            // Tracking de visualización
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        reportHighQualityEvent(conversion.event, {
                            element_text: entry.target.textContent.trim(),
                            visibility_ratio: entry.intersectionRatio
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(element);
            
            // Tracking de interacción
            element.addEventListener('click', () => {
                reportHighQualityEvent(conversion.event + '_click', {
                    element_text: element.textContent.trim(),
                    interaction_type: 'click'
                });
            });
            
            element.addEventListener('mouseenter', () => {
                reportHighQualityEvent(conversion.event + '_hover', {
                    element_text: element.textContent.trim(),
                    interaction_type: 'hover'
                });
            });
        });
    });
}

// Función para reportar métricas de calidad de página
function reportPageQualityMetrics() {
    // Reportar métricas cada 30 segundos
    setInterval(() => {
        const metrics = {
            scroll_depth: Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100),
            time_on_page: Math.floor((performance.now() - window.pageStartTime) / 1000),
            interactions_count: window.userInteractionsCount || 0,
            page_engagement: 'high'
        };
        
        if (metrics.time_on_page >= 30) {
            reportHighQualityEvent('page_quality_metrics', metrics);
        }
    }, 30000);
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎯 Configuración avanzada de Google Ads iniciada');
    
    // Marcar tiempo de inicio
    window.pageStartTime = performance.now();
    window.userInteractionsCount = 0;
    
    // Inicializar optimizaciones
    enhanceContentRelevance();
    optimizeUserExperience();
    setupAdvancedConversionTracking();
    reportPageQualityMetrics();
    
    // Reportar carga exitosa
    reportHighQualityEvent('advanced_config_loaded', {
        config_version: '1.0',
        page_type: 'landing_page'
    });
});

// Exportar configuración
window.GoogleAdsConfig = GoogleAdsConfig;