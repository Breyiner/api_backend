import express from "express";
import GeneroController from "../controllers/GeneroController.js";
import { camposGenero, parcialesGenero } from "../middlewares/generos/index.js";



const router = express.Router();
// Creamos una instancia del controlador

// Obtener todos los generos
router.get("/", GeneroController.getAllGeneros);

// Obtener un genero por ID
router.get("/:id", GeneroController.getGeneroById);

// Crear una nueva Genero
router.post("/", camposGenero, GeneroController.createGenero);

// Actualizar un genero
router.put("/:id", camposGenero, GeneroController.updateGenero);

// Actualizar parcialmente un genero
router.patch("/:id", parcialesGenero, GeneroController.updateGenero);

// Eliminar un genero
router.delete("/:id", GeneroController.deleteGenero);

export default router;