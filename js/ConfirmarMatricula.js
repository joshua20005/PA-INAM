// js/ConfirmarMatricula.js — Portal Académico INAM
document.addEventListener('DOMContentLoaded', () => {
  const role = localStorage.getItem('user_role');
  
  // 1. Validar accesos
  if (role !== 'DIRECTOR' && role !== 'ADMINISTRACION') {
    showToast('Acceso Denegado: Su rol no cuenta con permisos para ver esta sección', 'error');
    setTimeout(() => {
      window.location.href = './Index.html';
    }, 2000);
    return;
  }

  // Si no es director, ocultar pestaña 2 de configuración
  if (role !== 'DIRECTOR') {
    const configTab = document.getElementById('tab_btn_2');
    if (configTab) configTab.style.display = 'none';
  }

  // Cargar datos iniciales
  loadPendingRegistrations();
  if (role === 'DIRECTOR') {
    cargarConfiguracionMatricula();
  }

  // Configurar botón de guardar configuración
  const btnSaveSettings = document.getElementById('btn-save-settings');
  if (btnSaveSettings) {
    btnSaveSettings.addEventListener('click', guardarConfiguracionMatricula);
  }
});

// Cache global de registros cargados para modal detalles
let cachedPendingRegistrations = [];

// Cambiar de pestaña (tab navigation)
function showTab(tabNum) {
  // Desactivar todas las pestañas y contenidos
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.step-content').forEach(content => content.classList.remove('active'));

  // Activar seleccionada
  const activeBtn = document.getElementById(`tab_btn_${tabNum}`);
  if (activeBtn) activeBtn.classList.add('active');

  const activeContent = document.getElementById(`step_${tabNum}`);
  if (activeContent) activeContent.classList.add('active');
}

// Cargar listado de matrículas pendientes
function loadPendingRegistrations() {
  const tbody = document.getElementById('pending-registrations-tbody');
  const noPendingMsg = document.getElementById('no-pending-message');
  const tableWrapper = document.getElementById('table-wrapper');
  
  if (!tbody) return;

  apiFetch('/apiRegistration/Registration/GetPendingRegistrations/')
    .then(res => {
      if (!res.ok) throw new Error('Error al cargar matrículas pendientes');
      return res.json();
    })
    .then(data => {
      cachedPendingRegistrations = data; // guardar en cache local
      
      tbody.innerHTML = '';
      if (data.length === 0) {
        if (tableWrapper) tableWrapper.style.display = 'none';
        if (noPendingMsg) noPendingMsg.style.display = 'block';
        return;
      }

      if (tableWrapper) tableWrapper.style.display = 'block';
      if (noPendingMsg) noPendingMsg.style.display = 'none';

      data.forEach(reg => {
        const tr = document.createElement('tr');
        tr.className = 'form__table-fila';
        tr.innerHTML = `
          <td class="form__table-campo" style="font-weight:600; color:var(--primary-dark);">${escapeHtml(reg.code_registration)}</td>
          <td class="form__table-campo" style="text-align: left; padding-left: 12px;">${escapeHtml(reg.student_name)}<br><small style="color:var(--gray-600);">${escapeHtml(reg.student_code)}</small></td>
          <td class="form__table-campo">${escapeHtml(reg.level_registration)}</td>
          <td class="form__table-campo">${escapeHtml(reg.mode_registration)}</td>
          <td class="form__table-campo"><span style="background:var(--primary-glow); color:var(--primary); padding: 4px 8px; border-radius:var(--radius-sm); font-size:0.85rem; font-weight:600;">${escapeHtml(reg.group_code)}</span></td>
          <td class="form__table-campo">
            <div style="display: flex; gap: 8px; justify-content: center;">
              <button type="button" class="form__button--purple" style="padding: 6px 12px; font-size: 0.82rem; margin: 0; box-shadow: none;" onclick="openDetailsModal(${reg.id})">
                👁️ Detalles
              </button>
              <button type="button" class="form__button--green" style="padding: 6px 12px; font-size: 0.82rem; margin: 0; box-shadow: none;" onclick="confirmarMatricula(${reg.id})">
                Confirmar
              </button>
            </div>
          </td>
        `;
        tbody.appendChild(tr);
      });
    })
    .catch(err => {
      console.error(err);
      showToast('No se pudieron cargar las matrículas pendientes', 'error');
    });
}

// Abrir modal con detalles completos
function openDetailsModal(registrationId) {
  const reg = cachedPendingRegistrations.find(r => r.id === registrationId);
  if (!reg) return;

  // Rellenar datos estudiante
  document.getElementById('det-student-name').textContent = reg.student_name;
  document.getElementById('det-student-code').textContent = reg.student_code;
  document.getElementById('det-level').textContent = reg.level_registration;
  document.getElementById('det-mode').textContent = reg.mode_registration;
  document.getElementById('det-group').textContent = reg.group_code || 'Ninguno';

  // Rellenar datos tutor
  document.getElementById('det-tutor-name').textContent = reg.tutor_name || 'No ingresado';
  document.getElementById('det-tutor-phone').textContent = reg.tutor_phone || 'No ingresado';
  document.getElementById('det-tutor-email').textContent = reg.tutor_email || 'No ingresado';
  document.getElementById('det-tutor-address').textContent = reg.tutor_address || 'No ingresada';

  // Rellenar datos registro
  document.getElementById('det-reg-code').textContent = reg.code_registration;
  document.getElementById('det-reg-date').textContent = reg.date_registration || 'No especificada';

  // Rellenar documentos
  const docList = document.getElementById('det-documents-list');
  docList.innerHTML = '';
  if (!reg.documents || reg.documents.length === 0) {
    docList.innerHTML = '<p style="color:var(--gray-600); font-style:italic;">No se adjuntaron documentos de respaldo.</p>';
  } else {
    reg.documents.forEach(doc => {
      const docLink = document.createElement('a');
      docLink.href = getApiUrl(doc.file_url);
      docLink.target = '_blank';
      docLink.className = 'form__group-item';
      docLink.style.cssText = 'padding: 8px 16px; font-size: 0.85rem; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; max-width: fit-content; margin-top: 4px;';
      docLink.innerHTML = `📄 Ver ${escapeHtml(doc.name)}`;
      docList.appendChild(docLink);
    });
  }

  // Vincular botón de confirmar en el modal
  const confirmBtn = document.getElementById('det-confirm-btn');
  confirmBtn.onclick = () => {
    closeDetailsModal();
    confirmarMatricula(reg.id);
  };

  // Mostrar modal
  document.getElementById('detailsModal').style.display = 'flex';
}

function closeDetailsModal() {
  document.getElementById('detailsModal').style.display = 'none';
}

// Confirmar matrícula
function confirmarMatricula(registrationId) {
  if (!confirm('¿Está seguro de confirmar esta matrícula? El estudiante quedará inscrito formalmente.')) return;

  apiFetch('/apiRegistration/Registration/ConfirmRegistration/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: registrationId })
  })
    .then(res => {
      if (!res.ok) {
        return res.json().then(errData => {
          throw new Error(errData.error || 'Error al confirmar la matrícula');
        });
      }
      return res.json();
    })
    .then(data => {
      showToast(data.message || 'Matrícula confirmada correctamente', 'success');
      loadPendingRegistrations();
    })
    .catch(err => {
      console.error(err);
      showToast(err.message, 'error');
    });
}

// Cargar configuración de matrícula en línea
async function cargarConfiguracionMatricula() {
  try {
    const response = await apiFetch('/apiUserCreate/UsuarioCreate/GetEnrollmentWindow/');
    const data = await response.json();
    
    document.getElementById('settings_enrollment_enabled').value = data.enabled ? 'true' : 'false';
    document.getElementById('settings_enrollment_period').value = data.period || '';
  } catch (err) {
    console.error('Error cargando configuración de matrícula:', err);
  }
}

// Guardar configuración de matrícula en línea
async function guardarConfiguracionMatricula() {
  const enabledVal = document.getElementById('settings_enrollment_enabled').value === 'true';
  const periodVal = document.getElementById('settings_enrollment_period').value.trim();
  
  if (!periodVal) {
    showToast('El periodo académico no puede estar vacío', 'warning');
    return;
  }
  
  try {
    const response = await apiFetch('/apiUserCreate/UsuarioCreate/ToggleEnrollmentWindow/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ enabled: enabledVal, period: periodVal })
    });
    
    if (!response.ok) throw new Error('Error al guardar configuración');
    
    showToast('Configuración guardada exitosamente', 'success');
  } catch (err) {
    console.error('Error guardando configuración de matrícula:', err);
    showToast('Error al guardar la configuración', 'error');
  }
}
