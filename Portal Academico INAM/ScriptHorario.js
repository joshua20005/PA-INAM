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