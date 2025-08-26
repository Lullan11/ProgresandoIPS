// Mostrar/ocultar campo PQRS
document.addEventListener('DOMContentLoaded', function() {
    const pqrsCheckbox = document.getElementById('pqrs-checkbox');
    const pqrsField = document.querySelector('.pqrs-field');
    const pqrsSelect = document.getElementById('pqrs-type');
    
    // Función para mostrar/ocultar el campo PQRS
    function togglePqrsField() {
        if (pqrsCheckbox.checked) {
            pqrsField.style.display = 'flex';
            pqrsSelect.setAttribute('required', 'required');
            // Animación
            setTimeout(() => {
                pqrsField.style.opacity = '1';
                pqrsField.style.transform = 'translateY(0)';
            }, 10);
        } else {
            // Animación de desvanecimiento
            pqrsField.style.opacity = '0';
            pqrsField.style.transform = 'translateY(-10px)';
            // Ocultar después de la animación
            setTimeout(() => {
                pqrsField.style.display = 'none';
                pqrsSelect.removeAttribute('required');
            }, 300);
        }
    }
    
    // Event listener para el checkbox
    pqrsCheckbox.addEventListener('change', togglePqrsField);
    
    // Envío del formulario
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validar formulario
        if (!this.checkValidity()) {
            this.reportValidity();
            return;
        }
        
        // Mostrar loading
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        // Preparar datos para enviar
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        
        // Enviar por EmailJS (requiere configuración)
        enviarEmail(data)
            .then(() => {
                // Éxito
                mostrarMensaje('¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.', 'success');
                contactForm.reset();
                // Ocultar campo PQRS si estaba visible
                if (pqrsCheckbox.checked) {
                    pqrsCheckbox.checked = false;
                    togglePqrsField();
                }
            })
            .catch(error => {
                // Error
                console.error('Error:', error);
                mostrarMensaje('Error al enviar el mensaje. Por favor, intente nuevamente.', 'error');
            })
            .finally(() => {
                // Restaurar botón
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
    });
    
    // Función para enviar email (configura esto con tu servicio)
    async function enviarEmail(data) {
        // IMPORTANTE: Configura esto con tu servicio de envío de emails
        // Opciones populares: EmailJS, Formspree, o un backend propio
        
        // Ejemplo con EmailJS (debes registrarte en https://www.emailjs.com/)
        /*
        return emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
            from_name: data.nombre,
            from_email: data.email,
            telefono: data.telefono,
            es_pqrs: data.es_pqrs ? 'Sí' : 'No',
            tipo_pqrs: data.tipo_pqrs || 'No aplica',
            tipo_usuario: data.tipo_usuario,
            tipo_servicio: data.tipo_servicio,
            mensaje: data.mensaje
        });
        */
        
        // Ejemplo con Formspree (más simple)
        const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error('Error en el envío');
        }
        
        return response;
    }
    
    // Función para mostrar mensajes de feedback
    function mostrarMensaje(mensaje, tipo) {
        // Eliminar mensajes anteriores
        const mensajesAnteriores = document.querySelectorAll('.form-message');
        mensajesAnteriores.forEach(msg => msg.remove());
        
        // Crear nuevo mensaje
        const mensajeElement = document.createElement('div');
        mensajeElement.className = `form-message ${tipo}`;
        mensajeElement.textContent = mensaje;
        mensajeElement.style.cssText = `
            padding: 15px;
            margin: 15px 0;
            border-radius: 8px;
            font-weight: 500;
            text-align: center;
        `;
        
        if (tipo === 'success') {
            mensajeElement.style.backgroundColor = '#d4edda';
            mensajeElement.style.color = '#155724';
            mensajeElement.style.border = '1px solid #c3e6cb';
        } else {
            mensajeElement.style.backgroundColor = '#f8d7da';
            mensajeElement.style.color = '#721c24';
            mensajeElement.style.border = '1px solid #f5c6cb';
        }
        
        // Insertar antes del botón de submit
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        contactForm.insertBefore(mensajeElement, submitBtn);
        
        // Auto-eliminar después de 5 segundos
        setTimeout(() => {
            mensajeElement.remove();
        }, 5000);
    }
});