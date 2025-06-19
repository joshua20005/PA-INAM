function goBack() {
  // Agregamos un fallback por si no hay historial
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = "/"; // Redirige a la página principal como alternativa
  }
}

// function guardarestudiante(event){
//     const codestudiante = document.getElementById("codestudiante").value;
//     const nombre = document.getElementById("nombre").value;
//     const apellido = document.getElementById("apellido").value;
//     const fecha = document.getElementById("fecha").value;
//     const telefono = document.getElementById("telefono").value;
//     const email = document.getElementById("email").value;

//     if(!codestudiante ||!nombre ||!apellido ||!fecha ||!telefono ||!email ){
//         alert("Completa todos los Campos");
//         return;
//     }

//     console.log("Cód.Estudiante", codestudiante);
//     console.log("Nombre", nombre);
//     console.log("Apellidos", apellido);
//     console.log("Fecha de Nacimiento", fecha);
//     console.log("N.Teléfono", telefono);
//     console.log("Correo Electrónico", email);

//     alert("Registro de Estudiante Guardado Correctamente");

// }

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