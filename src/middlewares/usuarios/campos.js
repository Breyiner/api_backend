export const campos = [
  { name: "nombre", required: true, minLength: 3, maxLength: 30 },
  { name: "apellido", required: true, minLength: 3, maxLength: 30 },
  { name: "documento", required: true, minLength: 6, maxLength: 10 },
  { name: "telefono", required: true, minLength: 10, maxLength: 10 },
  { name: "usuario", required: true, minLength: 8, maxLength: 20 },
  { name: "contrasena", required: true, minLength: 4, maxLength: 20 },
  { name: "genero_id", required: true, type: "number", minLength: 1, maxLength: 11 },
  { name: "ciudad_id", required: true, type: "number", minLength: 1, maxLength: 11 }
];