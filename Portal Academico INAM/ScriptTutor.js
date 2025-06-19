function goBack() {
  // Agregamos un fallback por si no hay historial
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = "/"; // Redirige a la página principal como alternativa
  }
}

// function guardartutor(event){
//     const ncedula = document.getElementById("ncedula").value;
//     const nombres = document.getElementById("nombres").value;
//     const apellidos = document.getElementById("apellidos").value;
//     const fecha = document.getElementById("fecha").value;
//     const direccion = document.getElementById("direccion").value;
//     const telefono = document.getElementById("telefono").value;
//     const email = document.getElementById("email").value;

//     if(!ncedula ||!nombres ||!apellidos ||!fecha ||!direccion ||!telefono ||!email){
//         alert("Completa todos los Campos");
//         return;
//     }

//     console.log("Número de Identidad", ncedula);
//     console.log("Nombres", nombres);
//     console.log("Apellidos", apellidos);
//     console.log("Fecha de Nacimiento", fecha);
//     console.log("Dirección", direccion);
//     console.log("N.Teléfono", telefono);
//     console.log("Correo Electrónico", email);

//     alert("Registro de Tutor Guardado Correctamente");

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


// codigo para guardar los datos del tutor 




document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form-validation');

  // Buscar tutor al presionar Enter
  document.getElementById('code_tutor').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      buscarTutor();
    }
  });
});

function recolectarDatosTutor() {
  return {
    code_tutor: document.getElementById('code_tutor').value.trim(),
    name_tutor: document.getElementById('name_tutor').value.trim(),
    surname_tutor: document.getElementById('surname_tutor').value.trim(),
    birthdate_tutor: document.getElementById('birthdate_tutor').value,
    phone_tutor: document.getElementById('phone_tutor').value.trim(),
    email_tutor: document.getElementById('email_tutor').value.trim(),
    address_tutor: document.getElementById('address_tutor').value.trim()
  };
}

function registrarTutor() {
  const data = recolectarDatosTutor();

  fetch('http://127.0.0.1:8000/apiMentor/Mentor/PostMentor/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(res => res.json().then(body => ({ status: res.status, body })))
    .then(({ status, body }) => {
      if (status === 200) {
        alert('✅ Tutor registrado correctamente');
        document.getElementById('form-validation').reset();
      } else {
        alert('⚠️ ' + (body.error || 'Error al registrar el tutor'));
      }
    })
    .catch(() => alert('❌ No se pudo conectar con el servidor'));
}

function editarTutor() {
  const data = recolectarDatosTutor();

  fetch('http://127.0.0.1:8000/apiMentor/Mentor/UpdateMentor/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(res => {
      if (res.ok) {
        alert('✅ Tutor actualizado correctamente');
        document.getElementById('form-validation').reset();
      } else {
        alert('❌ Error al actualizar el tutor');
      }
    })
    .catch(() => alert('❌ No se pudo conectar con el servidor'));
}

function buscarTutor() {
  const code = document.getElementById('code_tutor').value.trim();
  if (!code) {
    alert('Por favor ingresa un código de tutor');
    return;
  }

  fetch(`http://127.0.0.1:8000/apiMentor/Mentor/SpecificMentor/?code_tutor=${encodeURIComponent(code)}`)
    .then(res => res.json().then(data => ({ status: res.status, data })))
    .then(({ status, data }) => {
      if (status === 200) {
        document.getElementById('code_tutor').value = data.code_tutor;
        document.getElementById('name_tutor').value = data.name_tutor;
        document.getElementById('surname_tutor').value = data.surname_tutor;
        document.getElementById('birthdate_tutor').value = data.birthdate_tutor;
        document.getElementById('phone_tutor').value = data.phone_tutor;
        document.getElementById('email_tutor').value = data.email_tutor;
        document.getElementById('address_tutor').value = data.address_tutor;
        alert('✅ Tutor encontrado');
      } else {
        alert('❌ ' + (data.error || 'Tutor no encontrado'));
      }
    })
    .catch(() => alert('❌ No se pudo conectar con el servidor'));
}





