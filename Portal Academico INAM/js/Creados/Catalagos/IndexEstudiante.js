//  $(function () {
//      var estudianteService = new EstudianteService();

//      estudianteService.Url = "http://127.0.0.1:8000/apiRegistration/Registration/";
//      estudianteService.API = "DetalleRegistro";
//      estudianteService.Method = "GET";

//      estudianteService.getEstudiantes()
//          .then(function (data) {
//              console.log(data);
//              var $tabla = $("#tablaEstudiantes");
//              var fila = "";
//              data.forEach((element, i) => {
//                  fila += `<tr>
//                          <td>${i + 1}</td>
//                          <td>${element.code_registration}</td>
//                          <td>${element.code_student}</td>
//                          <td>${element.name_student}</td>
//                          <td>${element.surname_student}</td>
//                          <td>${element.birthday_student}</td>
//                          <td>${element.phone_student}</td>
//                          <td>${element.email_student}</td>
//                          <td>${element.level_group}</td>
//                          <td>${element.section_group}</td>
//                          <td>${element.name_tutor}</td>
//                          <td>${element.phone_tutor}</td>
//                          <td>${element.address_tutor}</td>

//                     </tr>`;            });

//         $tabla.append(fila);
//             })        .catch(function (error) {            console.error("Error al obtener los datos del estudiante:", error);        });
//         });






// Uso
// $(function () {
//     const estudianteService = new EstudianteService();

//     estudianteService.getEstudiantes()
//         .then(function (data) {
//             console.log("Datos recibidos:", data);
//             var $tabla = $("#tablaEstudiantes");
//             var fila = "";
//             data.forEach((element, i) => {
//                 fila += `<tr>
//                         <td>${i + 1}</td>
//                         <td>${element.code_registration}</td>
//                         <td>${element.code_student}</td>
//                         <td>${element.name_student}</td>
//                         <td>${element.surname_student}</td>
//                         <td>${element.birthday_student}</td>
//                         <td>${element.phone_student}</td>
//                         <td>${element.email_student}</td>
//                         <td>${element.level_group}</td>
//                         <td>${element.section_group}</td>
//                         <td>${element.name_tutor}</td>
//                         <td>${element.phone_tutor}</td>
//                         <td>${element.address_tutor}</td>

//                     </tr>`;
//             });

//             $tabla.append(fila);
//         })
//         .catch(function (error) {
//             console.error("Error completo:", error);
//             alert(`Error CORS: ${error.message}\nVerifica la consola para detalles`);
//         });
// });



document.addEventListener('DOMContentLoaded', function () {
    // 1. Seleccionar el tbody de la tabla
    const tbody = document.querySelector('#tablaStudent tbody');

    // 2. Verificar si existe el elemento
    if (!tbody) {
        console.error('No se encontró el elemento tbody');
        return;
    }
    // poner la URL de la API
    fetch('http://127.0.0.1:8000/apiRegistration/Registration/DetalleRegistro/')
        .then(response => {
            if (!response.ok) throw new Error('Error en la respuesta');
            return response.json();
        })
        .then(data => {


            // Llenar tabla con los datos
            data.forEach(item => {
                // Hacer referencia a la fila del tbody
                const fila = tbody.insertRow();

                // Añadir celdas según la estructura de tu JSON
                fila.insertCell(0).textContent = item.code_registration;
                fila.insertCell(1).textContent = item.code_student;
                fila.insertCell(2).textContent = item.name_student + " " + item.surname_student;
                //fila.insertCell(3).textContent = item.surname_student;
                fila.insertCell(3).textContent = item.birthday_student;
                fila.insertCell(4).textContent = item.phone_student;
                fila.insertCell(5).textContent = item.email_student;
                fila.insertCell(6).textContent = item.level_group;
                fila.insertCell(7).textContent = item.section_group;
                fila.insertCell(8).textContent = item.name_tutor;
                fila.insertCell(9).textContent = item.phone_tutor;
                fila.insertCell(10).textContent = item.address_tutor;
                // Añadir más celdas si es necesario
            });
        })

});






document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form-validation');
    let clickedButton = null; // botón que fue clickeado

    // Detecta el botón de registrar
    document.getElementById('register-btn').addEventListener('click', function () {
        clickedButton = 'register';
    });

    // Detecta el boton de editar
    document.getElementById('edit-btn').addEventListener('click', function () {
        clickedButton = 'edit';
    });

    // Detecta el boton de buscar en la barra de navegacion 

    document.getElementById('search-btn').addEventListener('click', function () {
        const code = document.getElementById('search_code').value.trim();
        if (!code) {
            alert('Por favor ingresa un código');
            return;
        }

        fetch(`http://127.0.0.1:8000/apiStudent/Student/SpecificStudent/?code_student=${encodeURIComponent(code)}`)
            .then(response => response.json().then(data => ({ status: response.status, body: data })))
            .then(({ status, body }) => {
                if (status === 200) {
                    // Cargar los datos al formulario
                    document.getElementById('code_student').value = body.code_student;
                    document.getElementById('name_student').value = body.name_student;
                    document.getElementById('surname_student').value = body.surname_student;
                    document.getElementById('birthday_student').value = body.birthday_student;
                    document.getElementById('phone_student').value = body.phone_student;
                    document.getElementById('email_student').value = body.email_student;
                    alert('✅ Estudiante encontrado');
                } else {
                    alert('❌ ' + (body.error || 'Estudiante no encontrado'));
                }
            })
            .catch(() => alert('❌ No se pudo conectar con el servidor'));
    });



    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Verificar cuál botón fue clickeado
        const studentData = {
            code_student: document.getElementById('code_student').value,
            name_student: document.getElementById('name_student').value,
            surname_student: document.getElementById('surname_student').value,
            birthday_student: document.getElementById('birthday_student').value,
            phone_student: document.getElementById('phone_student').value,
            email_student: document.getElementById('email_student').value
        };

        if (clickedButton === 'register') {
            fetch('http://127.0.0.1:8000/apiStudent/Student/PostStudent/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(studentData)
            })
                .then(response => response.json().then(data => ({ status: response.status, body: data })))
                .then(({ status, body }) => {
                    if (status === 200) {
                        alert('✅ Datos insertados correctamente');
                        form.reset();
                    } else if (status === 400 && body.error) {
                        alert('⚠️ ' + body.error);
                        form.reset();
                    } else {
                        alert('❌ Error al insertar los datos');
                    }
                })
                .catch(() => {
                    alert('❌ No se pudo conectar con el servidor');
                });
        }

        // Parte para la edicion de los datos del estudiante
        if (clickedButton === 'edit') {
            fetch('http://127.0.0.1:8000/apiStudent/Student/UpdateStudent/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(studentData)
            })
                .then(response => {
                    if (response.ok) {
                        alert('✅ Datos modificados correctamente');
                        form.reset();
                    } else {
                        alert('❌ Ocurrió un error al editar los datos');
                    }
                })
                .catch(() => {
                    alert('❌ No se pudo conectar con el servidor');
                });
        }

        clickedButton = null; // Reiniciar el botón clickeado para evitar confusiones en futuros envíos
    });// fin del addEventListener

});