import { ResponseProvider } from "../providers/ResponseProvider.js";
import CiudadService from "../services/CiudadService.js";

class CiudadController {
  // Obtener todas las ciudades
  static getAllCiudades = async (req, res) => {    
    try {
      // Llamamos al servicio para obtener las ciudades
      const response = await CiudadService.getCiudades();   
      // Validamos si no hay ciudades
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

  // Obtener una ciudad por su ID
  static getCiudadById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener la ciudad por su ID
      const response = await CiudadService.getCiudadById(id);
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

  // Crear una nueva ciudad
  static createCiudad = async (req, res) => {
    const { nombre } = req.body;
    try {
      const response = await CiudadService.createCiudad(nombre);
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

  // Actualizar una ciudad
  static updateCiudad = async (req, res) => {
    const { id } = req.params;
    // Los campos a actualizar se pasan en el cuerpo de la solicitud
    const campos = req.body;
    try {
      // Crear una instancia de la clase ciudad
      const ciudad = await CiudadService.updateCiudad(id, campos);
      // Validamos si no se pudo actualizar la ciudad
      if (ciudad.error) {
        return ResponseProvider.error(
          res,
          ciudad.message,
          ciudad.code
        );
      }
      // Retornamos la respuesta cuando se actualiza correctamente
      return ResponseProvider.success(
        res,
        ciudad.data,
        ciudad.message,
        ciudad.code
      );
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error al interno en el servidor", 500);
    }
  };

  // Eliminar una ciudad
  static deleteCiudad = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para eliminar la ciudad
      const response = await CiudadService.deleteCiudad(id);
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
export default CiudadController;