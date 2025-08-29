// FUNCIONALIDAD MEJORADA DEL MENÚ HAMBURGUESA
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    const overlayMenu = document.querySelector('.overlay-menu');
    const body = document.body;
    
    if (menuToggle && navMenu) {
        // Función para abrir el menú
        function openMenu() {
            menuToggle.classList.add('active');
            navMenu.classList.add('active');
            if (overlayMenu) overlayMenu.classList.add('active');
            body.style.overflow = 'hidden';
        }
        
        // Función para cerrar el menú
        function closeMenu() {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            if (overlayMenu) overlayMenu.classList.remove('active');
            body.style.overflow = '';
        }
        
        // Alternar menú al hacer clic en el botón hamburguesa
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            if (navMenu.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
        
        // Cerrar menú al hacer clic en el overlay
        if (overlayMenu) {
            overlayMenu.addEventListener('click', closeMenu);
        }
        
        // Cerrar menú al hacer clic en un enlace
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Solo cerrar si es un enlace interno
                if (!this.getAttribute('target') || this.getAttribute('target') === '_self') {
                    closeMenu();
                }
            });
        });
        
        // Cerrar menú al presionar la tecla Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMenu();
            }
        });
        
        // Cerrar menú al redimensionar la ventana si se vuelve a tamaño desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth > 900 && navMenu.classList.contains('active')) {
                closeMenu();
            }
        });
    }
});