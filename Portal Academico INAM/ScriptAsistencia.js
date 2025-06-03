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