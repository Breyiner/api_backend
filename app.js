import express from "express";
// import multer from "multer";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import ciudadRoutes from "./src/routes/ciudadRoutes.js";
import generoRoutes from "./src/routes/generoRoutes.js";
import lenguajeRoutes from "./src/routes/lenguajeRoutes.js";
import usuarioRoutes from "./src/routes/usuarioRoutes.js";
import lenguajeUsuarioRoutes from "./src/routes/lenguajeUsuarioRoutes.js";

dotenv.config();

// Crear la instancia de Express
const app = express();
// Middleware
// Habilita CORS
app.use(cors()); 
// Permite que la app acepte datos JSON
app.use(bodyParser.json()); 
// app.use(express.json());
// Permite el envio de datos de tipo utlencode
app.use(express.urlencoded({ extended: true }));
// Permite manejar cookies en las respuestas.
app.use(cookieParser());
// Rutas
app.use('/ciudades', ciudadRoutes);
app.use('/generos', generoRoutes);
app.use('/lenguajes', lenguajeRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/lenguaje_usuario', lenguajeUsuarioRoutes);

// Puerto para ejecutar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});