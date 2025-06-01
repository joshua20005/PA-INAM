let imagenes = [
    {
        src: "./images/Img.1.jpg",
        alt: "Imagen 1",
        nombre: "Bienvenido al Portal Académico INAM",
        description: "Aquí encontrarás toda la información académica y administrativa relacionada con el Instituto Nacional de Masatepe."
    },
    {
        src: "./images/Img.2.jpg",
        alt: "Imagen 2",
        nombre: "Sección de Información Académica",
        description: "Aquí encontrarás toda la información académica y administrativa relacionada con el Instituto Nacional de Masatepe."
    },
    {
        src: "./images/Img.3.jpg",
        alt: "Imagen 3",
        nombre: "Información Administrativa",
        description: "Aquí encontrarás toda la información académica y administrativa relacionada con el Instituto Nacional de Masatepe."
    }
];

let atras = document.getElementById('atras');
let adelante = document.getElementById('adelante');
let imagen = document.getElementById('img');
let puntos = document.getElementById('puntos');
let texto = document.getElementById('texto');
let actual = 0;
positionCarrusel()

atras.addEventListener('click', function() {
    actual-=1;
    if (actual == -1) {
        actual = imagenes.length - 1;
    }
    imagen.innerHTML = `<img class="img" src="${imagenes[actual].src}" alt="${imagenes[actual].alt}"></img>`;
    texto.innerHTML = `<h3>${imagenes[actual].nombre}</h3><p>${imagenes[actual].description}</p>`;
    positionCarrusel()
});

adelante.addEventListener('click', function() {
    actual+=1;
    if (actual == imagenes.length) {
        actual = 0;
    }
    imagen.innerHTML = `<img class="img" src="${imagenes[actual].src}" alt="${imagenes[actual].alt}"></img>`;
    texto.innerHTML = `<h3>${imagenes[actual].nombre}</h3><p>${imagenes[actual].description}</p>`;
    positionCarrusel();
});


function positionCarrusel() {
    puntos.innerHTML = ""
    for (var i = 0; i < imagenes.length; i++) {
        if (i == actual) {
            puntos.innerHTML += `<p class="bold">.</p>`;
        }
        else {
            puntos.innerHTML += `<p>.</p>`;
        }
    }
}

