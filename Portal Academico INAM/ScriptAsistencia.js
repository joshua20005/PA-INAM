function goBack() {
    // Agregamos un fallback por si no hay historial
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = "/"; // Redirige a la página principal como alternativa
    }
}

function guardarhorario(event){
    const codasignatura = document.getElementById("codasignatura").value;
    const asignatura = document.getElementById("asignatura").value;
    const codgrupo = document.getElementById("codgrupo").value;
    const turno = document.getElementById("turno").value;
    const fecha = document.getElementById("fecha").value;

    if(!codasignatura ||!asignatura ||!codgrupo ||!turno ||!fecha ){
        alert("Completa todos los Campos");
        return;
    }

    console.log("Códg.Asignatura", codasignatura);
    console.log("Asignatura", asignatura);
    console.log("Códg.Grupo", codgrupo);
    console.log("Códg.Turno", turno);
    console.log("Hora", fecha);

    alert("Asistencia Guardada Correctamente");

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