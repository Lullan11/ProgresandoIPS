document.addEventListener('DOMContentLoaded', function () {
    // Variables del carrusel
    const carrusel = document.querySelector('.carrusel');
    const slides = document.querySelectorAll('.carrusel-slide');
    const prevBtn = document.querySelector('.carrusel-control.prev');
    const nextBtn = document.querySelector('.carrusel-control.next');
    const indicadoresContainer = document.querySelector('.carrusel-indicadores');

    let currentIndex = 0;
    let totalSlides = slides.length;
    let carruselInterval;

    // Función para crear indicadores dinámicamente
    function crearIndicadores() {
        indicadoresContainer.innerHTML = ''; // Limpiar indicadores existentes

        for (let i = 0; i < totalSlides; i++) {
            const indicador = document.createElement('span');
            indicador.className = 'indicador';
            indicador.setAttribute('data-index', i);
            if (i === 0) indicador.classList.add('active');

            indicador.addEventListener('click', () => {
                showSlide(i);
            });

            indicadoresContainer.appendChild(indicador);
        }
    }

    // Función para mostrar slide específico
    function showSlide(index) {
        if (index === currentIndex) return;

        // Remover clases activas de slides
        slides.forEach(slide => {
            slide.classList.remove('active', 'prev', 'next');
        });

        // Actualizar indicadores
        const indicadores = document.querySelectorAll('.indicador');
        indicadores.forEach(ind => ind.classList.remove('active'));

        // Aplicar clases al slide activo
        slides[index].classList.add('active');

        // Actualizar indicador activo
        if (indicadores[index]) {
            indicadores[index].classList.add('active');
        }

        currentIndex = index;

        // Reiniciar el auto-avance
        reiniciarAutoAvance();
    }

    // Función para siguiente slide
    function nextSlide() {
        const nextIndex = (currentIndex + 1) % totalSlides;
        showSlide(nextIndex);
    }

    // Función para slide anterior
    function prevSlide() {
        const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        showSlide(prevIndex);
    }

    // Función para reiniciar el auto-avance
    function reiniciarAutoAvance() {
        clearInterval(carruselInterval);
        carruselInterval = setInterval(nextSlide, 4000); // 4 segundos
    }

    // Event listeners para controles
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Pausar el carrusel cuando el mouse está sobre él
    carrusel.addEventListener('mouseenter', () => {
        clearInterval(carruselInterval);
    });

    // Reanudar el carrusel cuando el mouse sale
    carrusel.addEventListener('mouseleave', () => {
        reiniciarAutoAvance();
    });

    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Touch events para dispositivos móviles
    let touchStartX = 0;
    let touchEndX = 0;

    carrusel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(carruselInterval); // Pausar al tocar
    });

    carrusel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        reiniciarAutoAvance(); // Reanudar después de swipe
    });

    function handleSwipe() {
        const minSwipeDistance = 50;

        if (touchEndX < touchStartX && touchStartX - touchEndX > minSwipeDistance) {
            nextSlide(); // Swipe izquierda
        }

        if (touchEndX > touchStartX && touchEndX - touchStartX > minSwipeDistance) {
            prevSlide(); // Swipe derecha
        }
    }

    // Inicializar el carrusel
    function inicializarCarrusel() {
        totalSlides = document.querySelectorAll('.carrusel-slide').length;

        if (totalSlides === 0) return;

        // Crear indicadores dinámicamente
        crearIndicadores();

        // Mostrar solo el primer slide inicialmente
        slides.forEach((slide, index) => {
            if (index === 0) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Iniciar auto-avance
        reiniciarAutoAvance();
    }

    // Inicializar
    inicializarCarrusel();

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

    // Función para hacer la navegación fija con efecto al hacer scroll
    function setupFixedNavigation() {
        const header = document.querySelector('header');
        const pequeñoHeader = document.querySelector('.pequeño-header');
        const mainContent = document.querySelector('main');

        if (!header || !pequeñoHeader) return;

        let lastScrollTop = 0;
        const headerHeight = header.offsetHeight;
        const pequeñoHeaderHeight = pequeñoHeader.offsetHeight;

        // Ajustar el margen superior del contenido principal
        if (mainContent) {
            mainContent.style.marginTop = (headerHeight + pequeñoHeaderHeight) + 'px';
        }

        window.addEventListener('scroll', function () {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Efecto de sombra al hacer scroll
            if (scrollTop > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Ocultar/mostrar header al hacer scroll (opcional)
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scroll hacia abajo - ocultar header
                header.style.top = '-80px';
            } else {
                // Scroll hacia arriba - mostrar header
                header.style.top = pequeñoHeaderHeight + 'px';
            }

            lastScrollTop = scrollTop;
        });
    }

    // Configurar navegación fija
    setupFixedNavigation();



    // servicios

    document.addEventListener('DOMContentLoaded', function () {
        const verTodosBtn = document.getElementById('verTodosServicios');
        const serviciosSection = document.getElementById('serviciosSection');
        const serviciosGrid = document.getElementById('serviciosGrid');
        const hiddenServices = document.querySelectorAll('.hidden-service');
        let todosVisible = false;

        // Mostrar la sección de servicios (puedes cambiar esto según cómo quieras activarla)
        serviciosSection.classList.add('visible');

        verTodosBtn.addEventListener('click', function () {
            if (!todosVisible) {
                // Mostrar todos los servicios
                hiddenServices.forEach(service => {
                    service.style.display = 'block';
                });

                // Cambiar el texto del botón
                verTodosBtn.querySelector('span').textContent = 'Mostrar menos servicios';
                verTodosBtn.querySelector('i').classList.replace('fa-chevron-down', 'fa-chevron-up');

                todosVisible = true;
            } else {
                // Ocultar servicios adicionales
                hiddenServices.forEach(service => {
                    service.style.display = 'none';
                });

                // Cambiar el texto del botón
                verTodosBtn.querySelector('span').textContent = 'Ver todos los servicios';
                verTodosBtn.querySelector('i').classList.replace('fa-chevron-up', 'fa-chevron-down');

                todosVisible = false;

                // Desplazarse hacia la sección de servicios
                serviciosSection.scrollIntoView({ behavior: 'smooth' });
            }
        });

        // Ejemplo de cómo podrías agregar más servicios dinámicamente
        function agregarServicio(titulo, descripcion, icono, sede) {
            const nuevoServicio = document.createElement('div');
            nuevoServicio.className = 'servicios-item hidden-service';
            nuevoServicio.style.display = 'none'; // Oculto inicialmente

            nuevoServicio.innerHTML = `
            <div class="servicios-icon">
                <i class="${icono}"></i>
            </div>
            <h3>${titulo}</h3>
            <p>${descripcion}</p>
            <p class="disponible-sede">Disponible en: ${sede}</p>
        `;

            serviciosGrid.appendChild(nuevoServicio);

            // Si todos los servicios están visibles, mostrar este también
            if (todosVisible) {
                nuevoServicio.style.display = 'block';
            }
        }

        // Ejemplo de cómo agregar un nuevo servicio:
        // agregarServicio('Nuevo Servicio', 'Descripción del nuevo servicio', 'fas fa-new-icon', 'sede principal');
    });
});