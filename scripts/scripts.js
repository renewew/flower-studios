// Contadores
const counterItems = document.querySelectorAll('[data-num]');

if (counterItems.length) {
    const animateCounter = (item) => {
        if (item.dataset.counted === 'true') return;
        item.dataset.counted = 'true';

        const endValue = parseInt(item.dataset.num, 10) || 0;
        let currentValue = 0;
        const duration = 2000;
        const stepTime = Math.max(20, duration / Math.max(endValue, 1));

        const counter = setInterval(() => {
            currentValue += 1;
            item.textContent = currentValue;
            if (currentValue >= endValue) {
                item.textContent = endValue;
                clearInterval(counter);
            }
        }, stepTime);
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.25,
        rootMargin: '0px 0px -50px 0px'
    });

    counterItems.forEach(item => counterObserver.observe(item));
}

//Video
const heroVideo = document.getElementById('heroVideo');
if (heroVideo) {
    // Forzar sin controles antes de intentar reproducir
    heroVideo.controls = false;
    // Deshabilitar feature de navegador: picture-in-picture y remote playback
    try {
        heroVideo.disablePictureInPicture = true;
    } catch (e) {}
    try {
        heroVideo.disableRemotePlayback = true;
    } catch (e) {}
    const playPromise = heroVideo.play();
    if (playPromise !== undefined) {
        playPromise.then(() => {
            // video is playing
        }).catch(() => {
            // Mantener sin controles; no mostrar controles nativos
            heroVideo.controls = false;
        });
    }
}

// Animaciones al scroll
const observerOptions = {
    threshold: 0,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('scroll-visible');
            entry.target.classList.remove('scroll-hidden');
        }
    });
}, observerOptions);

// Observar elementos para animar
document.querySelectorAll('.us-card, .service-item, .choose-card, .fundacion-item, .value-item, .team-card').forEach((el) => {
    el.classList.add('scroll-hidden');
    el.style.transition = "all 0.6s ease";
    observer.observe(el);
});

// Efecto parallax suave en el hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
});

//Modal Emergente

// Abrir modal
const modal = document.getElementById("valueModal");
const closeBtn = document.getElementsByClassName("close")[0];

// Función para abrir el modal y cargar datos del modal
function openModal(modalData) {
    document.getElementById("modal-value").innerText = modalData.value || '';
    document.getElementById("modal-seller").innerText = modalData.seller || '';
    // Inyectar el icono del valor si existe
    const modalIcon = document.getElementById('modal-icon');
    if (modalIcon) {
        modalIcon.innerHTML = modalData.iconHTML || '';
    }
    modal.style.display = "block";
}

// Cerrar modal
if (closeBtn) {
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }
}

// Cerrar el modal cuando se hace clic fuera de él
window.addEventListener('click', function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

// Cerrar con la tecla ESC
window.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' || event.key === 'Esc') {
        if (modal && modal.style.display === 'block') modal.style.display = 'none';
    }
});

// Detectar clic en cada producto y abrir el modal con los datos correctos
document.querySelectorAll(".value-item").forEach(item => {
    item.addEventListener("click", function(e) {
        // evitar que enlaces internos intenten navegar
        e.preventDefault();
        const modalData = {
            value: item.getAttribute("data-name") || item.getAttribute("data-value"),
            seller: item.getAttribute("data-seller") || '',
            iconHTML: (item.querySelector('.value-icon') ? item.querySelector('.value-icon').innerHTML : '')
        };
        openModal(modalData);
    });
});

//Hamburger menú
const hamburguesa = document.querySelector('#hamburger');
const enlaces = document.querySelector('#nav-links');

hamburguesa.addEventListener('click', () => {
    enlaces.classList.toggle('show')
})

document.querySelectorAll('#nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        enlaces.classList.remove('show');
    });
});