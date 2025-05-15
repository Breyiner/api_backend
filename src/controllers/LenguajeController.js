import { ResponseProvider } from "../providers/ResponseProvider.js";
import LenguajeService from "../services/LenguajeService.js";

class LenguajeController {
  // Obtener todos los lenguajes
  static getAllLenguajes = async (req, res) => {    
    try {
      // Llamamos al servicio para obtener los lenguajes
      const response = await LenguajeService.getLenguajes();   
      // Validamos si no hay lenguajes
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      } else {
        // Llamamos el provider para centralizar los mensajes de respuesta        
        return ResponseProvider.success(
          res,
          response.data,
          response.message,
          response.code
        );
      }
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error al interno en el servidor", 500);
    }
  };

  // Obtener un lenguaje por su ID
  static getLenguajeById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener el lenguaje por su ID
      const response = await LenguajeService.getLenguajeById(id);
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      } else {        
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.success(
          res,
          response.data,
          response.message,
          response.code
        );
      }
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error al interno en el servidor", 500);
    }
  };

  // Crear uno nuevo lenguaje
  static createLenguaje = async (req, res) => {
    const { nombre } = req.body;
    try {
      const response = await LenguajeService.createLenguaje(nombre);
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      } else {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.success(
          res,
          response.data,
          response.message,
          response.code
        );
      }
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error al interno en el servidor", 500);
    }
  };

  // Actualizar un lenguaje
  static updateLenguaje = async (req, res) => {
    const { id } = req.params;
    // Los campos a actualizar se pasan en el cuerpo de la solicitud
    const campos = req.body;
    try {
      // Crear una instancia de la clase lenguaje
      const lenguaje = await LenguajeService.updateLenguaje(id, campos);
      // Validamos si no se pudo actualizar el lenguaje
      if (lenguaje.error) {
        return ResponseProvider.error(
          res,
          lenguaje.message,
          lenguaje.code
        );
      }
      // Retornamos la respuesta cuando se actualiza correctamente
      return ResponseProvider.success(
        res,
        lenguaje.data,
        lenguaje.message,
        lenguaje.code
      );
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error al interno en el servidor", 500);
    }
  };

  // Eliminar un lenguaje
  static deleteLenguaje = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para eliminar el lenguaje
      const response = await LenguajeService.deleteLenguaje(id);
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      } else {
        // Llamamos el provider para centralizar los mensajes de respuesta
        ResponseProvider.success(
          res,
          response.data,
          response.message,
          response.code
        );
      }
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error al interno en el servidor", 500);
    }
  };
}
export default LenguajeController;