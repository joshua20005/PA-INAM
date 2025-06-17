function goBack() {
    // Agregamos un fallback por si no hay historial
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = "/"; // Redirige a la página principal como alternativa
    }
}

function guardartutor(event){
    const ncedula = document.getElementById("ncedula").value;
    const nombres = document.getElementById("nombres").value;
    const apellidos = document.getElementById("apellidos").value;
    const fecha = document.getElementById("fecha").value;
    const direccion = document.getElementById("direccion").value;
    const telefono = document.getElementById("telefono").value;
    const email = document.getElementById("email").value;

    if(!ncedula ||!nombres ||!apellidos ||!fecha ||!direccion ||!telefono ||!email){
        alert("Completa todos los Campos");
        return;
    }

    console.log("Número de Identidad", ncedula);
    console.log("Nombres", nombres);
    console.log("Apellidos", apellidos);
    console.log("Fecha de Nacimiento", fecha);
    console.log("Dirección", direccion);
    console.log("N.Teléfono", telefono);
    console.log("Correo Electrónico", email);

    alert("Registro de Tutor Guardado Correctamente");

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