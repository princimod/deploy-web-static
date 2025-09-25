// Configuração do portfolio
const portfolioConfig = {
    name: "Modesto D'Almeida",
    title: "Desenvolvedor Full Stack",
    email: "princimod@gmail.com",
    whatsapp: "+244929198162",
    socialLinks: {
        github: "https://github.com/princimod",
        linkedin: "https://linkedin.com/in/princimod",
        twitter: "https://twitter.com/princimod",
        instagram: "https://instagram.com/princimod"
    }
};

// Função para inicializar a página
function initPortfolio() {
    // Atualizar informações do perfil
    updateProfileInfo();
    
    // Configurar eventos
    setupEventListeners();
    
    // Adicionar animações de entrada
    addEntryAnimations();
    
    // Configurar lazy loading para imagens
    setupLazyLoading();
    
    // Adicionar efeitos de paralaxe
    setupParallaxEffects();
}

// Atualizar informações do perfil
function updateProfileInfo() {
    const profileName = document.getElementById('profileName');
    const profileTitle = document.getElementById('profileTitle');
    
    if (profileName) {
        profileName.textContent = portfolioConfig.name;
    }
    
    if (profileTitle) {
        profileTitle.textContent = portfolioConfig.title;
    }
    
    // Atualizar links das redes sociais
    updateSocialLinks();
}

// Atualizar links das redes sociais
function updateSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        const platform = link.classList[1]; // segunda classe indica a plataforma
        
        switch(platform) {
            case 'github':
                link.href = portfolioConfig.socialLinks.github;
                break;
            case 'linkedin':
                link.href = portfolioConfig.socialLinks.linkedin;
                break;
            case 'twitter':
                link.href = portfolioConfig.socialLinks.twitter;
                break;
            case 'instagram':
                link.href = portfolioConfig.socialLinks.instagram;
                break;
            case 'email':
                link.href = `mailto:${portfolioConfig.email}`;
                break;
            case 'whatsapp':
                link.href = `https://wa.me/${portfolioConfig.whatsapp}`;
                break;
        }
    });
}

// Configurar event listeners
function setupEventListeners() {
    // Botão de contato
    const contactBtn = document.getElementById('contactBtn');
    if (contactBtn) {
        contactBtn.addEventListener('click', handleContactClick);
    }
    
    // Links das redes sociais - analytics
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const platform = e.currentTarget.classList[1];
            trackSocialClick(platform);
        });
    });
    
    // Foto de perfil - efeito de clique
    const profileImage = document.getElementById('profileImage');
    if (profileImage) {
        profileImage.addEventListener('click', handleProfileImageClick);
    }
    
    // Scroll events para animações
    window.addEventListener('scroll', throttle(handleScroll, 16));
    
    // Resize events
    window.addEventListener('resize', throttle(handleResize, 250));
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
}

// Handler para clique no botão de contato
function handleContactClick() {
    // Criar modal de contato ou redirecionar para email
    const emailLink = `mailto:${portfolioConfig.email}?subject=Contato através do portfolio&body=Olá ${portfolioConfig.name},%0D%0A%0D%0AGostaria de entrar em contato...`;
    window.location.href = emailLink;
}

// Handler para clique na foto de perfil
function handleProfileImageClick() {
    const profileImage = document.getElementById('profileImage');
    profileImage.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        profileImage.style.transform = '';
    }, 150);
    
    // Adicionar efeito de ripple
    createRippleEffect(event);
}

// Criar efeito ripple
function createRippleEffect(event) {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('div');
    
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Adicionar animações CSS para ripple
function addRippleAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Track de cliques nas redes sociais
function trackSocialClick(platform) {
    // Aqui você pode adicionar analytics
    console.log(`Clique na rede social: ${platform}`);
    
    // Exemplo com Google Analytics (se implementado)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'social_click', {
            'social_platform': platform
        });
    }
}

// Adicionar animações de entrada
function addEntryAnimations() {
    // Observador de interseção para animações
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.1 });
    
    // Observar elementos animados
    const animatedElements = document.querySelectorAll('[class*="fadeIn"], .profile-card');
    animatedElements.forEach(el => observer.observe(el));
}

// Configurar lazy loading
function setupLazyLoading() {
    const profileImage = document.getElementById('profileImage');
    
    if ('IntersectionObserver' in window && profileImage) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        imageObserver.observe(profileImage);
    }
}

// Configurar efeitos de paralaxe
function setupParallaxEffects() {
    const shapes = document.querySelectorAll('.floating-shape');
    
    shapes.forEach((shape, index) => {
        // Adicionar movimento baseado no mouse
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            
            const moveX = (x - 50) * 0.5 * (index + 1);
            const moveY = (y - 50) * 0.5 * (index + 1);
            
            shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
}

// Handler para scroll
function handleScroll() {
    const scrollY = window.scrollY;
    const profileCard = document.querySelector('.profile-card');
    
    if (profileCard) {
        // Efeito de paralaxe sutil
        profileCard.style.transform = `translateY(${scrollY * 0.1}px)`;
    }
}

// Handler para resize
function handleResize() {
    // Reajustar animações se necessário
    const windowWidth = window.innerWidth;
    
    // Ajustar animações para dispositivos menores
    if (windowWidth < 768) {
        document.body.classList.add('mobile');
    } else {
        document.body.classList.remove('mobile');
    }
}

// Navegação por teclado
function handleKeyboardNavigation(event) {
    // ESC para fechar modais (se implementados)
    if (event.key === 'Escape') {
        closeAnyOpenModals();
    }
    
    // Enter/Space nos links sociais
    if ((event.key === 'Enter' || event.key === ' ') && 
        event.target.classList.contains('social-link')) {
        event.target.click();
    }
}

// Fechar modais
function closeAnyOpenModals() {
    const modals = document.querySelectorAll('.modal.open');
    modals.forEach(modal => modal.classList.remove('open'));
}

// Função de throttle para performance
function throttle(func, limit) {
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

// Função de debounce
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Verificar se o dispositivo suporta touch
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// Adicionar classe para dispositivos touch
function addTouchSupport() {
    if (isTouchDevice()) {
        document.body.classList.add('touch-device');
    }
}

// Preloader simples
function showPreloader() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-spinner">
            <div class="spinner"></div>
        </div>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        }
        
        .spinner {
            width: 40px;
            height: 40px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-top: 3px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(preloader);
    
    // Remover preloader quando a página carregar
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
                style.remove();
            }, 500);
        }, 1000);
    });
}

// Service Worker para PWA (opcional)
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registrado com sucesso:', registration);
            })
            .catch(error => {
                console.log('Falha ao registrar SW:', error);
            });
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    // Mostrar preloader
    showPreloader();
    
    // Adicionar suporte a touch
    addTouchSupport();
    
    // Adicionar animação de ripple
    addRippleAnimation();
    
    // Inicializar portfolio
    initPortfolio();
    
    // Registrar service worker (opcional)
    // registerServiceWorker();
});

// Exportar funções para uso externo (se necessário)
window.PortfolioApp = {
    updateConfig: (newConfig) => {
        Object.assign(portfolioConfig, newConfig);
        updateProfileInfo();
    },
    getConfig: () => portfolioConfig,
    trackEvent: trackSocialClick
};