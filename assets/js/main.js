document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Scroll del Navbar
    const navbar = document.getElementById("mainNav");
    window.addEventListener("scroll", function() {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // 2. Inicializar Carrusel (Opcional, Bootstrap lo hace auto por data-bs)
    const heroCarousel = document.getElementById("heroCarousel");
    if (heroCarousel) {
        new bootstrap.Carousel(heroCarousel, {
            interval: 5000,
            touch: true
        });
    }

    // 3. MENÚ MÓVIL INSTANTÁNEO (Nueva Lógica)
    const menuBtn = document.getElementById('menuToggleBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function() {
            // Alternar clase 'open' en el botón (para la animación de X)
            this.classList.toggle('open');
            // Alternar clase 'menu-active' en el menú (para mostrar/ocultar instantáneo)
            mobileMenu.classList.toggle('menu-active');
            
            // Opcional: Bloquear scroll del body cuando el menú está abierto
            if (mobileMenu.classList.contains('menu-active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Cerrar menú al hacer click en un enlace
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('open');
                mobileMenu.classList.remove('menu-active');
                document.body.style.overflow = '';
            });
        });
    }
});

// JS para interacción del Grid
    const gridLinks = document.querySelectorAll('.hover-link');
    const plateGrid = document.getElementById('plateGrid');

    if (gridLinks.length > 0 && plateGrid) {
        gridLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                const targetId = this.getAttribute('data-target');
                plateGrid.className = 'plate-grid'; // Reset
                plateGrid.classList.add(`hl-${targetId}`); // Activar zona
                
                // Activar texto (color marrón)
                gridLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Reset al salir del área de menú
        const menuList = document.querySelector('.menu-hover-list');
        if(menuList){
            menuList.addEventListener('mouseleave', function() {
                plateGrid.className = 'plate-grid'; // Vuelve a cuadrado 2x2
                gridLinks.forEach(l => l.classList.remove('active'));
            });
        }
    }

// ==========================================
    // ARRASTRE CON MOUSE (DRAG) PARA CARRUSEL EVENTOS (CORREGIDO)
    // ==========================================
    const eventsCarousel = document.querySelector('#eventsMiniCarousel');
    
    if (eventsCarousel) {
        const bsCarousel = new bootstrap.Carousel(eventsCarousel);
        let startX = 0;
        let isDown = false;

        // 1. Evitar que el navegador intente arrastrar la imagen (Fantasma de imagen)
        const images = eventsCarousel.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('dragstart', (e) => e.preventDefault());
        });

        // 2. Al presionar el click
        eventsCarousel.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX;
            eventsCarousel.querySelector('.carousel-inner').style.cursor = 'grabbing';
        });

        // 3. Al soltar el click
        eventsCarousel.addEventListener('mouseup', (e) => {
            if(!isDown) return;
            isDown = false;
            eventsCarousel.querySelector('.carousel-inner').style.cursor = 'grab';
            handleDrag(e.pageX);
        });

        // 4. Si te sales del área
        eventsCarousel.addEventListener('mouseleave', () => {
            if(isDown) {
                isDown = false;
                eventsCarousel.querySelector('.carousel-inner').style.cursor = 'grab';
            }
        });

        // Lógica de movimiento
        function handleDrag(endX) {
            const threshold = 50; // Sensibilidad (cuánto hay que mover para cambiar)
            const diff = startX - endX;

            if (diff > threshold) {
                bsCarousel.next(); // Arrastró izquierda -> Siguiente
            } else if (diff < -threshold) {
                bsCarousel.prev(); // Arrastró derecha -> Anterior
            }
        }
    }