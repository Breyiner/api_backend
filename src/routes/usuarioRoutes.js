import express from "express";
import UsuarioController from "../controllers/UsuarioController.js";
import { camposUsuario, parcialesUsuario } from "../middlewares/usuarios/index.js";



const router = express.Router();
// Creamos una instancia del controlador

// Obtener todos los usuarios
router.get("/", UsuarioController.getAllUsuarios);

// Obtener un usuario por ID
router.get("/:id", UsuarioController.getUsuarioById);

// Crear una nueva usuario
router.post("/", camposUsuario, UsuarioController.createUsuario);

// Actualizar un usuario
router.put("/:id", camposUsuario, UsuarioController.updateUsuario);

// Actualizar parcialmente un usuario
router.patch("/:id", parcialesUsuario, UsuarioController.updateUsuario);

// Eliminar un usuario
router.delete("/:id", UsuarioController.deleteUsuario);

export default router;