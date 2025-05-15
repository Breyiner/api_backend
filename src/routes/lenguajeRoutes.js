import express from "express";
import LenguajeController from "../controllers/LenguajeController.js";
import { camposLenguaje, parcialesLenguaje } from "../middlewares/lenguajes/index.js";



const router = express.Router();
// Creamos una instancia del controlador

// Obtener todos los lenguajes
router.get("/", LenguajeController.getAllLenguajes);

// Obtener un lenguaje por ID
router.get("/:id", LenguajeController.getLenguajeById);

// Crear una nueva lenguaje
router.post("/", camposLenguaje, LenguajeController.createLenguaje);

// Actualizar un lenguaje
router.put("/:id", camposLenguaje, LenguajeController.updateLenguaje);

// Actualizar parcialmente un lenguaje
router.patch("/:id", parcialesLenguaje, LenguajeController.updateLenguaje);

// Eliminar un lenguaje
router.delete("/:id", LenguajeController.deleteLenguaje);

export default router;