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