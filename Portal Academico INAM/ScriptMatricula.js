function goBack() {
    // Agregamos un fallback por si no hay historial
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = "/"; // Redirige a la página principal como alternativa
    }
}
document.addEventListener('DOMContentLoaded', function () {
  const profile = document.querySelector('.nav__profile');
  const imgProfile = profile.querySelector('.nav__profile-img');
  const dropdownProfile = profile.querySelector('.nav__profile-link');

  imgProfile.addEventListener('click', function (event) {
    event.stopPropagation();
    dropdownProfile.classList.toggle('show');
  });

  document.addEventListener('click', function () {
    dropdownProfile.classList.remove('show');
  });

  dropdownProfile.addEventListener('click', function (event) {
    event.stopPropagation();
  });
});


// Modal
  function AbrirModalDocumentos() {
    document.getElementById("modalDocumentos").style.display = "flex";
  }

  function CerrarModalDocumentos() {
    document.getElementById("modalDocumentos").style.display = "none";
  }

  // Cerrar si hacen clic fuera del modal
  window.addEventListener("click", function (event) {
    const modal = document.getElementById("modalDocumentos");
    if (event.target == modal) {
      CerrarModalDocumentos();
    }
  });
