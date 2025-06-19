// Aquí irán las funciones JS que consumen tu API de Django
async function cargarDatosDashboard() {
    try {
        const response = await fetch('http://127.0.0.1:8000/apiStudent/Student/dashboard_data/');
        const data = await response.json();
        console.log(data);

        // Matriculados
        new Chart(document.getElementById('matriculaChart'), {
            type: 'bar',
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



function generarColores(cantidad) {
    const colores = [
        '#5D3CA6', '#f3be10', '#45a049', '#FF6384', '#36A2EB', '#FFCE56',
        '#4BC0C0', '#9966FF', '#FF9F40', '#8e44ad', '#16a085', '#c0392b'
    ];

    // Si hay más grupos que colores, los recicla
    return Array.from({ length: cantidad }, (_, i) => colores[i % colores.length]);
}

// Cargar gráfico de estudiantes por grupo
async function cargarGraficoEstudiantesPorGrupo() {
    try {
        const response = await fetch('http://127.0.0.1:8000/apiRegistration/Registration/grupos_estudiantes/');
        const data = await response.json();

        const colores = generarColores(data.labels.length);
        const ctx = document.getElementById('grupoPieChart').getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Estudiantes por Grupo',
                    data: data.data,
                    backgroundColor: colores,
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                return `${context.label}: ${context.parsed}`;
                            }
                        }
                    }
                }
            }
        });

    } catch (error) {
        console.error('Error cargando gráfico de grupos:', error);
    }
}

// Generador automático de colores pastel
function generarColoresPastel(cantidad) {
    const colores = [];
    for (let i = 0; i < cantidad; i++) {
        const hue = Math.floor(Math.random() * 360);
        colores.push(`hsl(${hue}, 70%, 70%)`);
    }
    return colores;
}



cargarGraficoEstudiantesPorGrupo();
cargarDatosDashboard();

function goBack() {
    window.history.back();
}