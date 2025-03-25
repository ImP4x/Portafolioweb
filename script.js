// Elementos de la página
let intro = document.querySelector('.intro');
let header = document.querySelector('.header');
let content = document.querySelector('.content');

// Evento para ocultar la intro y mostrar el contenido después de un tiempo
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        intro.classList.add('hidden'); // Oculta la intro con animación

        setTimeout(() => {
            header.classList.add('show'); // Muestra el header
            content.classList.add('show'); // Muestra el contenido
        }, 400); // Se activa después de que la intro desaparezca completamente
    }, 800); // Tiempo en que la intro se mantiene visible antes de ocultarse
});

// Evento de scroll para cambiar el diseño del header
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled'); // Convierte el header en barra de búsqueda
    } else {
        header.classList.remove('scrolled'); // Restaura el diseño original
    }
});

const fixedText = '<span class="purple">🗣️Dar clic en la imagen👀<br><span class="white">Hey! Soy P4x, </span><span class="purple">desarrollador <br> de software.<br>';
const dynamicTexts = [
    "Full Stack Developer 💻 ",
    "Desarrollo web 🌐 ",
    "Domino bases de datos 🗄️🔍 ",
    "Cybersecurity 🔒🛡️ ",
    "Creo y optimizo aplicaciones 🚀 ",
    "La informática es mi mundo 🌍 "
];

let index = 0;
let charIndex = 0;
const speed = 100;
const erasingSpeed = 50;
const delayBetweenTexts = 1500;
const textElement = document.getElementById("animated-text");

function typeText() {
    if (charIndex < dynamicTexts[index].length) {
        textElement.innerHTML = fixedText + '<span class="white">' + dynamicTexts[index].substring(0, charIndex) + '</span>';
        charIndex++;
        setTimeout(typeText, speed);
    } else {
        setTimeout(eraseText, delayBetweenTexts);
    }
}

function eraseText() {
    if (charIndex > 0) {
        textElement.innerHTML = fixedText + '<span class="white">' + dynamicTexts[index].substring(0, charIndex - 1) + '</span>';
        charIndex--;
        setTimeout(eraseText, erasingSpeed);
    } else {
        index = (index + 1) % dynamicTexts.length;
        setTimeout(typeText, speed);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(typeText, speed);
});

// Activar sections cuando son visibles en el viewport
const sections = document.querySelectorAll('.scroll-section');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.3 // Activar cuando el 30% del section sea visible
});

sections.forEach(section => {
    observer.observe(section);
});
document.querySelectorAll('.scroll-to-top').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});


// AUDIOS
// Configuración de audios
const introAudio = new Audio('audios/intro.mp3');
const audios = {
    blog1: new Audio('audios/audio1.mp3'),
    blog2: new Audio('audios/audio2.mp3'),
    blog3: new Audio('audios/audio3.mp3'),
    blog4: new Audio('audios/audio4.mp3')
};

let currentAudio = null;

// Controlador para la imagen de intro
document.querySelector('.imagen-intro img').addEventListener('click', function() {
    if (currentAudio !== introAudio) {
        detenerAudios();
        currentAudio = introAudio;
        introAudio.play();
    } else {
        if (!introAudio.paused) {
            introAudio.pause();
        } else {
            introAudio.currentTime = 0;
            introAudio.play();
        }
    }
});

// Controladores para los blogs
document.querySelectorAll('.blog-card').forEach(blog => {
    blog.addEventListener('click', function() {
        const audioKey = this.id;
        const selectedAudio = audios[audioKey];
        
        if (!selectedAudio) return;
        
        if (currentAudio !== selectedAudio) {
            detenerAudios();
            currentAudio = selectedAudio;
            selectedAudio.play();
        } else {
            if (!selectedAudio.paused) {
                selectedAudio.currentTime = 0;
                selectedAudio.play();
            } else {
                selectedAudio.play();
            }
        }
    });
});

// Función para detener todos los audios
function detenerAudios() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    
    // Detener específicamente el audio de intro si está en reproducción
    if (!introAudio.paused) {
        introAudio.pause();
        introAudio.currentTime = 0;
    }
    
    // Detener cualquier otro audio potencial
    Object.values(audios).forEach(audio => {
        if (!audio.paused) {
            audio.pause();
            audio.currentTime = 0;
        }
    });
}