document.querySelector('.hamburger').addEventListener('click', function () {
    this.classList.toggle('active');
    document.querySelector('.navbar-list').classList.toggle('active');
});

// Cerrar menú al hacer clic fuera
document.addEventListener('click', function (e) {
    if (!e.target.closest('.navbar-container')) {
        document.querySelector('.hamburger').classList.remove('active');
        document.querySelector('.navbar-list').classList.remove('active');
    }
});

function goBack() {
    // Agregamos un fallback por si no hay historial
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = "/"; // Redirige a la página principal como alternativa
    }
}



