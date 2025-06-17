function goBack() {
    // Agregamos un fallback por si no hay historial
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = "/"; // Redirige a la página principal como alternativa
    }
}

function guardargrupo(event){
    const codigo = document.getElementById("codigo").value;
    const anio = document.getElementById("anio").value;
    const seccion = document.getElementById("seccion").value;
    const alumnos = document.getElementById("alumnos").value;
    const turno= document.getElementById("turno").value;

    if(!codigo ||!anio ||!seccion ||!alumnos||!turno){
        alert("Completa todos los Campos");
        return;
    }

    console.log("Código", codigo);
    console.log("Año Académico", anio);
    console.log("Sección", seccion);
    console.log("Cantidad de Alumnos", alumnos);
    console.log("Turno", turno);

    alert("Grupo de Clase Guardado Correctamente");

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