import express from "express";
import LenguajeUsuarioController from "../controllers/LenguajeUsuarioController.js";
import { camposLenguajeUsuario, parcialesLenguajeUsuario } from "../middlewares/lenguajes_usuarios/index.js";



const router = express.Router();
// Creamos una instancia del controlador

// Obtener todos los lenguajes de los usuarios
router.get("/", LenguajeUsuarioController.getAllLenguajesUsuarios);

// Obtener un lenguaje por usuario ID
router.get("/usuario/:id", LenguajeUsuarioController.getByUsuarioId);

// Crear un nuevo lenguaje para un usuario
router.post("/", camposLenguajeUsuario, LenguajeUsuarioController.createLenguajeUsuario);

// Actualizar un lenguaje del usuario por su ID
router.put("/usuario/:id", camposLenguajeUsuario, LenguajeUsuarioController.updateLenguajeUsuario);

// Actualizar parcialmente un lenguaje del usuario
router.patch("/usuario/:id", parcialesLenguajeUsuario, LenguajeUsuarioController.updateLenguajeUsuario);

// Eliminar un lenguaje del usuario por su ID
router.delete("/usuario/:id", LenguajeUsuarioController.deleteLenguajeUsuario);

export default router;