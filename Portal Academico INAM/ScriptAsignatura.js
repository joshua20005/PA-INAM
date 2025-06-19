function goBack() {
    // Agregamos un fallback por si no hay historial
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = "/"; // Redirige a la página principal como alternativa
    }
}

function guardarasignatura(event){
    const codasignatura = document.getElementById("codasignatura").value;
    const nombre = document.getElementById("nombre").value;
    const anio = document.getElementById("anio").value;
    const periodo = document.getElementById("periodo").value;

    if(!codasignatura ||!nombre ||!anio ||!periodo ){
        alert("Completa todos los Campos");
        return;
    }

    console.log("Cód.Asignatura", codasignatura);
    console.log("Nombre", nombre);
    console.log("Año Academico", anio);
    console.log("Periodo", periodo);

    alert("Asignatura Guardada Correctamente");

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
