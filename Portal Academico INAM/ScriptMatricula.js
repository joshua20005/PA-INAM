function goBack() {
  // Agregamos un fallback por si no hay historial
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = "/"; // Redirige a la página principal como alternativa
  }
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


// Modal
function AbrirModalDocumentos() {
  document.getElementById("modalDocumentos").style.display = "flex";
}

function CerrarModalDocumentos() {
  document.getElementById("modalDocumentos").style.display = "none";
}

// Cerrar si hacen clic fuera del modal
window.addEventListener("click", function (event) {
  const modal = document.getElementById("modalDocumentos");
  if (event.target == modal) {
    CerrarModalDocumentos();
  }
});

// parte para Subir Documento
// document.getElementById('documentosForm').addEventListener('submit', function (e) {
//   e.preventDefault();

//   const formData = new FormData();
//   formData.append('name_document', document.getElementById('name_document').value);
//   formData.append('file', document.getElementById('file').files[0]);

//   fetch('http://127.0.0.1:8000/apiDocument/Document/DocumentPost/', {
//     method: 'POST',
//     body: formData
//   })
//     .then(res => res.json())
//     .then(data => {
//       alert('✅ Documento subido correctamente');
//       document.getElementById('documentosForm').reset();
//     })
//     .catch(() => alert('❌ Error al subir el documento'));
// });


// parte para la busqueda de estudiantes mediante el Codigo sin la necesidad de un boton 
document.getElementById("code_student").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Evita que el form se envíe por defecto
    const code = this.value;

    fetch(`http://127.0.0.1:8000/apiStudent/Student/SpecificStudent/?code_student=${encodeURIComponent(code)}`)
      .then(response => {
        if (!response.ok) throw new Error("Estudiante no encontrado");
        return response.json();
      })
      .then(dataST => {
        // Rellenamos los campos visibles
        document.getElementById('code_student').value = dataST.code_student;
        document.getElementById('name_student').value = dataST.name_student;
        document.getElementById('surname_student').value = dataST.surname_student;
        document.getElementById('birthday_student').value = dataST.birthday_student;
        document.getElementById('phone_student').value = dataST.phone_student;
        document.getElementById('email_student').value = dataST.email_student;
        alert('✅ Estudiante encontrado');

        // Guardamos el ID oculto para usarlo luego en el POST
        document.getElementById("id_student").value = dataST.id;
      })
      .catch(error => {
        alert("Error al buscar estudiante: " + error.message);
        // Opcional: limpiar campos
        document.getElementById("name_student").value = '';
        document.getElementById("surname_student").value = '';
        document.getElementById("birthday_student").value = '';
        document.getElementById("phone_student").value = '';
        document.getElementById("email_student").value = '';
        // Limpiar el ID oculto
        document.getElementById("id_student").value = '';
      });
  }
});



// parte para la realizacion de la matricula completa 
function guardarMatricula() {
  const form = document.getElementById('form_matricula');

  const idStudent = document.getElementById('id_student').value;
  const idTutor = document.getElementById('id_tutor').value;
  const idGroup = document.getElementById('id_group').value;

  if (!idStudent || isNaN(idStudent)) {
    alert("❌ El estudiante no ha sido cargado correctamente");
    return;
  }

  if (!idTutor || isNaN(idTutor)) {
    alert("❌ El tutor no ha sido cargado correctamente");
    return;
  }

  if (!idGroup || isNaN(idGroup)) {
    alert("❌ No se ha seleccionado un grupo válido");
    return;
  }


  // Validación manual simple (puedes extenderla si querés)
  const requiredFields = [
    'code_registration', 'date_registration', 'mode_registration',
    'level_registration', 'id_student', 'id_tutor', 'id_group',
    'name_document', 'file'
  ];

  for (const fieldId of requiredFields) {
    const field = document.getElementById(fieldId);

    // Validamos campos vacíos o no definidos
    if (!field || !field.value || (field.type === 'file' && field.files.length === 0)) {
      alert(`❌ El campo '${fieldId}' es obligatorio`);
      return;
    }
  }

  const formData = new FormData();
  formData.append('code_registration', document.getElementById('code_registration').value);
  formData.append('date_registration', document.getElementById('date_registration').value);
  formData.append('mode_registration', document.getElementById('mode_registration').value);
  formData.append('level_registration', document.getElementById('level_registration').value);
  formData.append('id_student', idStudent);
  formData.append('id_tutor', idTutor);
  formData.append('id_group', idGroup);
  formData.append('name_document', document.getElementById('name_document').value);
  formData.append('file', document.getElementById('file').files[0]);

  fetch('http://127.0.0.1:8000/apiRegistration/Registration/PostFullRegistration/', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      if (data.message) {
        alert(`✅ ${data.message}`);
        form.reset(); // Limpia el formulario
        document.getElementById("group_select").selectedIndex = 0;
      } else {
        alert(`❌ ${data.error || "Error al registrar matrícula"}`);
      }
    })
    .catch(error => {
      console.error(error);
      alert('❌ Error de red al guardar matrícula');
    });
}



// parte para la seleccion de grupos mediante un select
window.addEventListener("DOMContentLoaded", function () {
  const groupSelect = document.getElementById("group_select");
  const idGroupInput = document.getElementById("id_group");

  if (!groupSelect || !idGroupInput) {
    console.error("No se encontró el campo de grupo o el input oculto.");
    return;
  }

  fetch("http://127.0.0.1:8000/apiGroup/Group/group_AutoList/")
    .then(response => {
      if (!response.ok) throw new Error("Error al cargar grupos");
      return response.json();
    })
    .then(groups => {
      groupSelect.innerHTML = '<option value="">Seleccione un grupo</option>'; // Reiniciar

      groups.forEach(group => {
        const option = document.createElement("option");
        option.value = group.id;
        option.textContent = `${group.code_group} - ${group.level_group} (${group.section_group})`;
        groupSelect.appendChild(option);
      });

      // Asignar automáticamente el valor del ID al input hidden
      groupSelect.addEventListener("change", function () {
        idGroupInput.value = this.value;
      });
    })
    .catch(error => {
      alert("No se pudieron cargar los grupos: " + error.message);
    });
});

// para los datos del tutor mediante el codigo

document.getElementById("code_tutor").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Evita que el formulario se envíe por defecto
    const code = this.value;

    fetch(`http://127.0.0.1:8000/apiMentor/Mentor/SpecificMentor/?code_tutor=${encodeURIComponent(code)}`)
      .then(response => {
        if (!response.ok) throw new Error("Tutor no encontrado");
        return response.json();
      })
      .then(dataTR => {
        // ✅ Usamos 'data' correctamente
        document.getElementById('code_tutor').value = dataTR.code_tutor;
        document.getElementById('name_tutor').value = dataTR.name_tutor;
        document.getElementById('surname_tutor').value = dataTR.surname_tutor;
        document.getElementById('birthdate_tutor').value = dataTR.birthdate_tutor;
        document.getElementById('phone_tutor').value = dataTR.phone_tutor;
        document.getElementById('email_tutor').value = dataTR.email_tutor;
        document.getElementById('address_tutor').value = dataTR.address_tutor;
        alert('✅ Tutor encontrado');

        // Guardar ID oculto
        document.getElementById("id_tutor").value = dataTR.id;
      })
      .catch(error => {
        alert("Error al buscar tutor: " + error.message);

        // Limpiar campos
        document.getElementById("name_tutor").value = '';
        document.getElementById("surname_tutor").value = '';
        document.getElementById("birthdate_tutor").value = '';
        document.getElementById("phone_tutor").value = '';
        document.getElementById("email_tutor").value = '';
        document.getElementById("address_tutor").value = '';
        document.getElementById("id_tutor").value = '';
      });
  }
});
