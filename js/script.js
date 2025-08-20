document.addEventListener('DOMContentLoaded', function() {
    // Variables del carrusel
    const carrusel = document.querySelector('.carrusel');
    const slides = document.querySelectorAll('.carrusel-slide');
    const prevBtn = document.querySelector('.carrusel-control.prev');
    const nextBtn = document.querySelector('.carrusel-control.next');
    const indicadores = document.querySelectorAll('.indicador');
    
    let currentIndex = 0;
    let isTransitioning = false;
    
    // Función para mostrar slide específico
    function showSlide(index) {
        if (isTransitioning) return;
        
        isTransitioning = true;
        
        // Remover clases activas
        slides.forEach(slide => {
            slide.classList.remove('active', 'prev', 'next');
        });
        indicadores.forEach(ind => ind.classList.remove('active'));
        
        // Calcular índices anterior y siguiente
        const prevIndex = (index - 1 + slides.length) % slides.length;
        const nextIndex = (index + 1) % slides.length;
        
        // Aplicar clases
        slides[prevIndex].classList.add('prev');
        slides[index].classList.add('active');
        slides[nextIndex].classList.add('next');
        
        // Actualizar indicadores
        indicadores[index].classList.add('active');
        
        currentIndex = index;
        
        // Permitir nuevas transiciones después de un breve delay
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }
    
    // Función para siguiente slide
    function nextSlide() {
        showSlide((currentIndex + 1) % slides.length);
    }
    
    // Función para slide anterior
    function prevSlide() {
        showSlide((currentIndex - 1 + slides.length) % slides.length);
    }
    
    // Event listeners para controles
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Event listeners para indicadores
    indicadores.forEach((indicador, index) => {
        indicador.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Auto avanzar el carrusel cada 5 segundos
    let carruselInterval = setInterval(nextSlide, 5000);
    
    // Pausar el carrusel cuando el mouse está sobre él
    carrusel.addEventListener('mouseenter', () => {
        clearInterval(carruselInterval);
    });
    
    // Reanudar el carrusel cuando el mouse sale
    carrusel.addEventListener('mouseleave', () => {
        carruselInterval = setInterval(nextSlide, 5000);
    });
    
    // Inicializar el carrusel
    showSlide(0);
    
    // Navegación suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});