function goBack() {
    // Agregamos un fallback por si no hay historial
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = "/"; // Redirige a la página principal como alternativa
    }
}

function guardarhorario(event){
    const docente = document.getElementById("docente").value;
    const anio = document.getElementById("anio").value;
    const asignatura = document.getElementById("asignatura").value;
    const hora = document.getElementById("hora").value;

    if(!docente ||!anio ||!asignatura ||!hora ){
        alert("Completa todos los Campos");
        return;
    }

    console.log("Docente", docente);
    console.log("Año", anio);
    console.log("Asignatura", asignatura);
    console.log("Hora", hora);

    alert("Horario Guardado Correctamente");

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