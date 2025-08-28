// animaciones.js - Animaciones sencillas para elementos al hacer scroll

document.addEventListener('DOMContentLoaded', function() {
    // Función para verificar si un elemento es visible en el viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
            rect.bottom >= 0 &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
            rect.right >= 0
        );
    }
    
    // Función para manejar las animaciones al hacer scroll
    function handleScrollAnimations() {
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in, .rotate-in').forEach(el => {
            if (isElementInViewport(el)) {
                el.classList.add('visible');
            }
        });
    }
    
    // Configurar el observer para las animaciones al hacer scroll
    handleScrollAnimations();
    window.addEventListener('scroll', handleScrollAnimations);
    
    // Para elementos que ya están visibles al cargar la página
    setTimeout(function() {
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in, .rotate-in').forEach(el => {
            if (isElementInViewport(el)) {
                el.classList.add('visible');
            }
        });
    }, 500);
});