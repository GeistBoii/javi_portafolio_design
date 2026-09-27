/*Código creado con la ayuda de Claude AI*/
// ===================================================================
//   JAVASCRIPT – PÁGINA DE INICIO (index.html)
//   Efecto hover: cambia la imagen de cada tarjeta (los gatitos) al pasar el mouse
// ===================================================================
 
// Selecciona todas las imágenes que tienen la clase "img-hover" para aplicarle el efecto
 // Variable constante imagesHover = buscar y devolver todo elemento con esa clase
const imagenesHover = document.querySelectorAll('.img-hover'); 
 
// Para cada una, agregamos los eventos de mouse/hover
 //forEach repite vloque de còdigo para cada elemento dentro de ()
imagenesHover.forEach(function (img) {
 
  // Cuando el mouse esta sobre la imagen (mouseEnter) hacer el hover
  img.addEventListener('mouseenter', function () {
    img.src = img.dataset.hover;
  });
 
  // Cuando el mouse sale de la imagen (mouseLeave) volver a la normalidad
  img.addEventListener('mouseleave', function () {
    img.src = img.dataset.normal;
  });
 
});

// ===================================================================
//   EFECTO PARALLAX 
//   (para imágenes dentro de bloque de color en pag de proyectos)
//   sigue movimiento del mouse
// ===================================================================
// Selecciona todas las imágenes que tienen la clase "img-hover" para aplicarle el efecto
const parallaxScene = document.getElementById('parallax-scene');

//Si (if) tiene el elemento parallaxScene
if (parallaxScene) {   // el "if" evita errores en páginas que no tienen este elemento
  //Cuando ocurra evento mousemove, seguir movimiento de mouse con offset
  parallaxScene.addEventListener('mousemove', (e) => {
    // Selecciona todas las imágenes que tienen la clase "layer" para aplicarle el efecto
    const layers = parallaxScene.querySelectorAll('.layer');
    //Movimiento en X
    const x = (parallaxScene.offsetWidth / 2 - e.offsetX) / 50;
    //Movimiento en Y
    const y = (parallaxScene.offsetHeight / 2 - e.offsetY) / 50;

    //Para cada capa de imagen (layer) dentro del parallax
    layers.forEach(layer => {
      const speed = layer.getAttribute('data-speed'); //Lee atributo dentro de 
      const xOffset = x * speed;  //velocidad en X
      const yOffset = y * speed;  //velocidad en Y
      layer.style.transform = `translateX(${xOffset}px) translateY(${yOffset}px)`;
    });
  });

  /* Cuando el mouse sale, la imagen vuelve a su posición original */
  parallaxScene.addEventListener('mouseleave', () => {
    // Selecciona todas las imágenes que tienen la clase "layer" para sacarle el efecto
    const layers = parallaxScene.querySelectorAll('.layer');
    layers.forEach(layer => {
      layer.style.transform = 'translateX(0px) translateY(0px)';
    });
  });
}
// ===================================================================
//   CARRUSEL POR DESVANECIMIENTO
//   Cambia entre fotos con efecto de fade (opacidad)
//  al presionar el botón "Siguiente"
//===================================================================
//Variable, indice que cuenta cual es la imagen que se esta mostrando 
let fadeIndex = 0;

function changeFade() {
  const carrusel = document.getElementById('carrusel-des');
  if (!carrusel) return;

  const slides = carrusel.querySelectorAll('.fade-slide');

  // Quita la clase "activo" de la foto actual (deja de verse)
  slides[fadeIndex].classList.remove('activo');

  // Avanza al siguiente índice, y si llega al final, vuelve al inicio (loop)
  //fadeIndex = (incrementa indice para pasar de imagen) % cantidad de imagenes
  // si es = 0, vuelve al principio
  fadeIndex = (fadeIndex + 1) % slides.length;

  // Agrega la clase "activo" a la nueva foto (aparece)
  slides[fadeIndex].classList.add('activo');
}
//===================================================================
//   CARRUSEL MANUAL CON FLECHAS: SLIDER DE FOTOS 
//   Hace loop (al llegar al final vuelve al inicio)
//===================================================================

// Guarda la posición actual de cada carrusel por separado
const posicionesSlider = {};

function deslizarCarrusel(idTrack, idVentana, direccion) {
  const track   = document.getElementById(idTrack);
  const ventana = document.getElementById(idVentana);
  if (!track || !ventana) return;

  const totalFotos    = track.children.length;
  const anchoPorFoto  = track.scrollWidth / totalFotos;
  const fotosPorVista = Math.round(ventana.clientWidth / anchoPorFoto); // cuántas fotos caben visibles
  const paso          = anchoPorFoto;

  // Inicializa la posición si es la primera vez
  if (posicionesSlider[idTrack] === undefined) {
    posicionesSlider[idTrack] = 0;
  }

  // Límite máximo: hasta donde puede desplazarse sin mostrar espacio vacío
  const maxDesplazamiento = (totalFotos - fotosPorVista) * anchoPorFoto;


  // Avanza o retrocede
  posicionesSlider[idTrack] += direccion * paso;

  // Loop al llegar al final → vuelve al inicio
  if (posicionesSlider[idTrack] > maxDesplazamiento) {
    posicionesSlider[idTrack] = 0;
  }

  // Loop al llegar al inicio → va al final
  if (posicionesSlider[idTrack] < 0) {
    posicionesSlider[idTrack] = maxDesplazamiento;
  }

  // Aplica el desplazamiento
  track.style.transform = `translateX(-${posicionesSlider[idTrack]}px)`;
}

//===================================================================
//   LIGHTBOX (efecto de zoom en fotos)
//   Al hacer click en cualquier imagen marcada con
//   la clase "zoomable", se abre una vista ampliada
//===================================================================

// Busca en la página el contenedor del lightbox (el fondo oscuro)
const lightbox = document.getElementById('lightbox');
// Busca la imagen que se va a mostrar ampliada, DENTRO del lightbox
const lightboxImg = document.getElementById('lightbox-img');

// El "if" evita errores en páginas que todavía no tengan el lightbox en su HTML
//si contiene lightbox Y lightboximg
if (lightbox && lightboxImg) {

  // Selecciona TODAS las imágenes de la página que tengan la clase "zoomable"
  const imagenesZoom = document.querySelectorAll('.zoomable');

  // En cada una de esas imagenes (for each) se identifica si se hace click (event listener)
  imagenesZoom.forEach(function (img) {
    img.addEventListener('click', function () {
      // Copia la ruta (src) de la imagen clickeada hacia la imagen del lightbox
      lightboxImg.src = img.src;
      // Cambia el lightbox de "display: none" a "display: flex" para que aparezca
      lightbox.style.display = 'flex';
    });
  });

  // Al hacer click en cualquier parte del fondo oscuro, el lightbox se cierra
  lightbox.addEventListener('click', function () {
    lightbox.style.display = 'none';
  });

}

//===================================================================
//   ZOOM PARA FOTO CON EFECTO PARALLAX
//   Reutiliza el mismo lightbox de arriba
//===================================================================

//Para identìficar fotos con todos los elementos requeridos
//si (if) tiene parallaxScene Y lightbox Y lightboxImg
if (parallaxScene && lightbox && lightboxImg) {

  // En cada una de esas imagenes (for each) se identifica si se hace click (event listener)
  parallaxScene.addEventListener('click', function () {
    // Busca la capa de imagen dentro del contenedor parallax
    const layer = parallaxScene.querySelector('.layer');
    // La foto del parallax NO es una etiqueta <img>, es un fondo (background-image),
    // así que hay que sacar la URL desde el estilo en vez de usar ".src"
    const fondo = layer.style.backgroundImage;   
    const url = fondo.slice(5, -2);               

    lightboxImg.src = url;              // pone esa imagen dentro del lightbox
    lightbox.style.display = 'flex';    // muestra el lightbox
  });
  
}
//FIN JAVASCRIPT