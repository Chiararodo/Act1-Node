// index.js
const Alumno = require("./Alumno");

// Creamos un alumno de ejemplo
const chi = new Alumno({
  nombre: "Chiara",
  apellido: "Rodó",
  edad: 28,
  carrera: "Diseño y Programación Web",
  materias: ["Programación II"]
});

// Probar métodos
console.log("Datos:", chi.obtenerDatos());              // "Chiara Rodó"
console.log("Carrera:", chi.obtenerCarrera());          // "Diseño y Programación Web"
console.log("Edad actual:", chi.retornarEdad());        // 28

chi.modificarEdad(29);
console.log("Edad modificada:", chi.retornarEdad());    // 29

chi.agregarMateria("Aplicaciones Híbridas");
chi.agregarMateria("Bases de Datos");

console.log("Materias (console.table):");
chi.mostrarMaterias(); // tabla con las materias
