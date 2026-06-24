/**
 * =============================================
 *  PA-INAM — Global JavaScript
 *  Funciones compartidas por todas las páginas
 * =============================================
 */

const API_BASE_URL = 'http://127.0.0.1:8000';

function getApiUrl(endpoint) {
  if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
    return endpoint;
  }
  const slash = endpoint.startsWith('/') ? '' : '/';
  return `${API_BASE_URL}${slash}${endpoint}`;
}

async function apiFetch(endpoint, options = {}) {
  const url = getApiUrl(endpoint);
  options.headers = options.headers || {};
  
  if (options.body && !(options.body instanceof FormData) && !options.headers['Content-Type']) {
    options.headers['Content-Type'] = 'application/json';
  }
  
  const token = localStorage.getItem('access_token');
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(url, options);
  
  if (response.status === 401) {
    localStorage.clear();
    window.location.href = 'VistaPrinc.html';
    throw new Error('Sesión expirada. Por favor inicie sesión nuevamente.');
  }
  
  return response;
}

function escapeHtml(string) {
  if (string === null || string === undefined) return '';
  return String(string)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ========== Navegación: Volver Atrás ========== */
function goBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = 'Index.html';
  }
}

/* ========== Dropdown de Perfil & Protección de Páginas ========== */
document.addEventListener('DOMContentLoaded', function () {
  const currentPage = window.location.pathname.split('/').pop() || 'Index.html';
  const role = localStorage.getItem('user_role');
  
  // 1. Validar que exista una sesión activa
  if (!role && currentPage !== 'VistaPrinc.html' && currentPage !== 'Ayuda.html') {
    window.location.href = 'VistaPrinc.html';
    return;
  }
  
  // 2. Control de acceso por roles
  const pageAccess = {
    'Registros.html': ['DIRECTOR', 'ADMINISTRACION'],
    'RegistroEstudiante.html': ['DIRECTOR', 'ADMINISTRACION'],
    'RegistroTutor.html': ['DIRECTOR', 'ADMINISTRACION'],
    'RegistroMaestro.html': ['DIRECTOR', 'ADMINISTRACION'],
    'RegistroGrupo.html': ['DIRECTOR'],
    'RegistroAsignatura.html': ['DIRECTOR'],
    'GAcademica.html': ['DIRECTOR', 'DOCENTE', 'ADMINISTRACION'],
    'RegistroAsistencia.html': ['DIRECTOR', 'DOCENTE'],
    'RegistroNotas.html': ['DIRECTOR', 'DOCENTE', 'TUTOR', 'ESTUDIANTE'],
    'RegistroHorario.html': ['DIRECTOR', 'ADMINISTRACION'],
    'RegistroMatricula.html': ['DIRECTOR', 'ADMINISTRACION', 'TUTOR'],
    'ConfirmarMatricula.html': ['DIRECTOR', 'ADMINISTRACION'],
    'Dashboard.html': ['DIRECTOR'],
    'Actividades.html': ['DIRECTOR', 'DOCENTE'],
    'ListadoEstudiantes.html': ['DIRECTOR', 'ADMINISTRACION'],
    'ListadoDocentes.html': ['DIRECTOR', 'ADMINISTRACION'],
  };
  
  if (role && pageAccess[currentPage] && !pageAccess[currentPage].includes(role)) {
    alert('Acceso no autorizado a esta sección');
    window.location.href = 'Index.html';
    return;
  }

  // 3. Dropdown de perfil
  const profile = document.querySelector('.nav__profile');
  if (!profile) return;

  const imgProfile = profile.querySelector('.nav__profile-img');
  const dropdownProfile = profile.querySelector('.nav__profile-link');

  if (!imgProfile || !dropdownProfile) return;

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

  /* ========== Cerrar Sesión ========== */
  const closeLinks = dropdownProfile.querySelectorAll('a');
  closeLinks.forEach(function (link) {
    if (link.textContent.trim().includes('Cerrar Sesión')) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        localStorage.clear(); // Limpiar variables de sesión
        window.location.href = 'VistaPrinc.html';
      });
    }
  });
});

/* ========== Sistema de Alertas Premium (Toast) ========== */
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  
  let icon = 'ℹ️';
  if (type === 'success') icon = '✅';
  else if (type === 'error') icon = '❌';
  else if (type === 'warning') icon = '⚠️';

  const iconSpan = document.createElement('span');
  iconSpan.className = 'toast-icon';
  iconSpan.textContent = icon;

  const msgSpan = document.createElement('span');
  msgSpan.className = 'toast-message';
  msgSpan.textContent = message;

  toast.appendChild(iconSpan);
  toast.appendChild(msgSpan);
  container.appendChild(toast);

  // Animación de entrada
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);

  // Remoción automática después de 4 segundos
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 4000);
}
