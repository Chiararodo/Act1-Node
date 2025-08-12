// Alumno.js
class Alumno {
    constructor({ nombre = "", apellido = "", edad = 0, carrera = "", materias = [] } = {}) {
      this.nombre = nombre;       // String
      this.apellido = apellido;   // String
      this.edad = Number(edad) || 0; // Number
      this.carrera = carrera;     // String
      this.materias = Array.isArray(materias) ? materias : []; // Array
    }
  
    obtenerCarrera() {
      return this.carrera;
    }
  
    obtenerDatos() {
      // nombre + apellido concatenados
      return `${this.nombre} ${this.apellido}`.trim();
    }
  
    modificarEdad(number) {
      const n = Number(number);
      if (!Number.isFinite(n) || n < 0) {
        throw new Error("Edad inválida");
      }
      this.edad = n;
      return this.edad;
    }
  
    agregarMateria(materia) {
      if (typeof materia !== "string" || !materia.trim()) {
        throw new Error("Materia inválida");
      }
      this.materias.push(materia.trim());
      return this.materias.length;
    }
  
    mostrarMaterias() {
      // Muestra en tabla las materias cargadas
      console.table(this.materias);
    }
  
    retornarEdad() {
      return this.edad;
    }
  }
  
  module.exports = Alumno;
  