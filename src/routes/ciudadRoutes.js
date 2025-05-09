import express from "express";
import CiudadController from "../controllers/CiudadController.js";
import { camposCiudad } from "../middlewares/ciudades/index.js";



const router = express.Router();
// Creamos una instancia del controlador

// Obtener todas las ciudades
router.get("/", CiudadController.getAllCiudades);

// Obtener una ciudad por ID
router.get("/:id", CiudadController.getCiudadById);

// // Crear una nueva ciudad
router.post("/", camposCiudad, CiudadController.createCiudad);

// // Actualizar una ciudad
// router.put("/:id", camposCiudad, CiudadController.updateCiudad);

// // Actualizar parcialmente una ciudad
// router.patch("/:id", parcialesCiudad, CiudadController.updateCiudad);

// // Eliminar una ciudad
// router.delete("/:id", CiudadController.deleteCiudad);

export default router;