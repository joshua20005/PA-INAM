function goBack() {
  // Agregamos un fallback por si no hay historial
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = "/"; // Redirige a la página principal como alternativa
  }
}

// function guardargrupo(event){
//     const codigo = document.getElementById("codigo").value;
//     const anio = document.getElementById("anio").value;
//     const seccion = document.getElementById("seccion").value;
//     const alumnos = document.getElementById("alumnos").value;
//     const turno= document.getElementById("turno").value;

//     if(!codigo ||!anio ||!seccion ||!alumnos||!turno){
//         alert("Completa todos los Campos");
//         return;
//     }

//     console.log("Código", codigo);
//     console.log("Año Académico", anio);
//     console.log("Sección", seccion);
//     console.log("Cantidad de Alumnos", alumnos);
//     console.log("Turno", turno);

//     alert("Grupo de Clase Guardado Correctamente");

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


// codigo para guardar el grupo

function guardargrupo(e) {
  e.preventDefault();

  const grupo = {
    code_group: document.getElementById("code_group").value,
    level_group: document.getElementById("level_group").value,
    section_group: document.getElementById("section_group").value,
    amount_group: parseInt(document.getElementById("amount_group").value),
    shift_group: document.getElementById("turno").value  // Si tienes este campo en el modelo
  };

  if (grupo.amount_group > 41) {
    alert("❌ No puedes registrar más de 40 alumnos por grupo.");
    return;
  }

  fetch("http://127.0.0.1:8000/apiGroup/Group/PostGroup/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(grupo)
  })
    .then(async (res) => {
      const data = await res.json();

      if (!res.ok) {
        console.error("Error de validación:", data);

        let errores = data.error || data; // En caso de que venga como data.error o directamente como data

        let mensaje = "";

        for (let campo in errores) {
          const mensajeCampo = Array.isArray(errores[campo])
            ? errores[campo].join(", ")
            : errores[campo];
          mensaje += `• ${campo}: ${mensajeCampo}\n`;
        }

        throw new Error(mensaje || "Error desconocido");
      }

      alert(data.message || "✅ Grupo creado correctamente");
      document.getElementById("form-validation").reset();
    })
    .catch((err) => {
      alert("❌ " + err.message);
    });
}


// codigo para editar un grupo 
function editargrupo(e) {
  e.preventDefault();

  const id = prompt("🔍 Ingrese el ID del grupo a editar:");
  if (!id) return;

  const grupo = {
    code_group: document.getElementById("code_group").value,
    level_group: document.getElementById("level_group").value,
    section_group: document.getElementById("section_group").value,
    amount_group: parseInt(document.getElementById("amount_group").value),
    shift_group: document.getElementById("turno").value
  };

  fetch(`http://127.0.0.1:8000/apiGroup/Group/${id}/UpdateGroup/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(grupo)
  })
    .then(res => {
      if (!res.ok) return res.json().then(data => { throw new Error(data.error || "Error al editar") });
      return res.json();
    })
    .then(data => {
      alert(data.message || "✅ Grupo actualizado correctamente");
      document.getElementById("form-validation").reset();
    })
    .catch(err => alert("❌ " + err.message));
}

document.getElementById('code_group').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault(); // evita que se envíe el formulario

    const code = document.getElementById('code_group').value.trim();
    if (!code) {
      alert('⚠️ Ingrese un código de grupo');
      return;
    }

    fetch(`http://127.0.0.1:8000/apiGroup/Group/SpecificGroup/?code_group=${encodeURIComponent(code)}`)
      .then(res => res.json().then(data => ({ status: res.status, body: data })))
      .then(({ status, body }) => {
        if (status === 200) {
          document.getElementById('code_group').value = body.code_group;
          document.getElementById('level_group').value = body.level_group;
          document.getElementById('section_group').value = body.section_group;
          document.getElementById('amount_group').value = body.amount_group;
          document.getElementById('turno').value = body.shift_group;
          alert('✅ Grupo encontrado');
        } else {
          alert('❌ ' + (body.error || 'Grupo no encontrado'));
        }
      })
      .catch(() => alert('❌ Error al buscar grupo'));
  }
});