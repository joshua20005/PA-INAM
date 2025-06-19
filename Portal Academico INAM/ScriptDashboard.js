// Aquí irán las funciones JS que consumen tu API de Django
async function cargarDatosDashboard() {
    try {
        const response = await fetch('http://127.0.0.1:8000/apiStudent/Student/dashboard_data/');
        const data = await response.json();

        // Matriculados
        new Chart(document.getElementById('matriculaChart'), {
            type: 'doughnut',
            data: {
                labels: ['Matriculados'],
                datasets: [{
                    label: 'Estudiantes Matriculados',
                    data: [data.total_estudiantes],
                    backgroundColor: ['#5D3CA6']
                }]
            }
        });

        // Grupos
        new Chart(document.getElementById('grupoChart'), {
            type: 'bar',
            data: {
                labels: ['Grupos Activos'],
                datasets: [{
                    label: 'Grupos Activos',
                    data: [data.total_grupos],
                    backgroundColor: ['#f3be10']
                }]
            }
        });

        // Tutores
        new Chart(document.getElementById('tutorChart'), {
            type: 'bar',
            data: {
                labels: ['Tutores Registrados'],
                datasets: [{
                    label: 'Tutores',
                    data: [data.total_tutores],
                    backgroundColor: ['#45a049']
                }]
            }
        });

    } catch (error) {
        console.error('Error cargando dashboard:', error);
    }
}

cargarDatosDashboard();

function goBack() {
    window.history.back();
}