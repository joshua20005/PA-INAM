function goBack() {
    // Agregamos un fallback por si no hay historial
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = "/"; // Redirige a la página principal como alternativa
    }
}

function guardarnotas(event){
    const codestudiante = document.getElementById("codetudiantes").value;
    const nombre = document.getElementById("nombre").value;
    const apellidos = document.getElementById("apellidos").value;
    const turno = document.getElementById("turno").value;
    const anio = document.getElementById("anio").value;

    if(!codestudiante ||!nombre ||!apellidos ||!turno ||!anio ){
        alert("Completa todos los Campos del Estudiante");
        return;
    }

    const notasInputs =document.querySelectorAll('#form-notas input[type="number"]');

    let erorr = false;

    notasInputs.forEach((input) => {
        const valor = input.value.trim();
        const numero= parseFloat(valor);
        if(valor==="" ||isNaN(numero) || numero < 0 || numero > 100){
            input.style.border= "2px, solid red";
            erorrEncontrado = true;
        } else {
            input.style.border ="1px,solid #5D3CA6";
        }
    });
     
    if(erorrEncontrado){
        alert("completa todas las notas")
        return;
    }

    alert("Todas las Notas se han guardadod correctamente")
    console.log("Cód.Estudiante", codestudiante);
    console.log("Nombre", nombre);
    console.log("Apellidos", apellidos);
    console.log("Turno", turno);
    console.log("Año Académico", anio);

    alert("Notas Guardadas Correctamente");

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