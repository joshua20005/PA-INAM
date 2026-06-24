/**
 * scriptAsignatura.js — Subject registration logic
 * goBack() and dropdown code removed (now in global.js)
 */

function guardarasignatura(event) {
  event.preventDefault();
  const codasignatura = document.getElementById("codasignatura").value;
  const nombre = document.getElementById("nombre").value;
  const anio = document.getElementById("anio").value;
  const periodo = document.getElementById("periodo").value;

  if (!codasignatura || !nombre || !anio || !periodo) {
    showToast("Completa todos los Campos", "warning");
    return;
  }

  console.log("Cód.Asignatura:", codasignatura);
  console.log("Nombre:", nombre);
  console.log("Año Academico:", anio);
  console.log("Periodo:", periodo);

  showToast("Asignatura Guardada Correctamente", "success");
}

function editarasignatura(event) {
  event.preventDefault();
  showToast("Función de editar asignatura", "info");
}

function eliminarasignatura(event) {
  event.preventDefault();
  showToast("Función de eliminar asignatura", "info");
}
