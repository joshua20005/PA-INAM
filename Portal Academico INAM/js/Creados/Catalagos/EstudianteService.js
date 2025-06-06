// class EstudianteService {
//     constructor(data) {
//         data = data || {};
//         const self = this;

//         self.Url = data.Url ||  "http://127.0.0.1:8000/apiRegistration/Registration/";  
//         self.API = data.API || "DetalleRegistro";
//         self.Method = data.Method || "GET";

//         self.getEstudiantes = function() {
//             return new Promise((resolve, reject) => {
//                 console.log("Cargando estudiantes...");
                
//                 // Configuración CORS crítica
//                 const corsOptions = {
//                     method: self.Method,
//                     mode: 'cors',  // Obligatorio para CORS
//                 };

//                 fetch(self.Url + self.API, corsOptions)
//                     .then(response => {
//                         if (!response.ok) {
//                             // Captura errores HTTP (404, 500, etc)
//                             throw new Error(`HTTP error! status: ${response.status}`);
//                         }
//                         return response.json();
//                     })
//                     .then(data => {
//                         console.log("Estudiantes cargados:", data);
//                         resolve(data);
//                     })
//                     .catch(error => {
//                         console.error("Error en CORS:", error);
//                         reject(error);
//                     })
//                     .finally(() => {
//                         console.log("Carga de estudiantes completada.");
//                     });
//             });
//         }
//     }
// }



// // Uso
// $(function () {
//     const estudianteService = new EstudianteService();
    
//     estudianteService.getEstudiantes()
//         .then(function (data) {
//             console.log("Datos recibidos:", data);
//             // ... tu lógica de renderizado ...
//         })
//         .catch(function (error) {
//             console.error("Error completo:", error);
//             alert(`Error CORS: ${error.message}\nVerifica la consola para detalles`);
//         });
// });