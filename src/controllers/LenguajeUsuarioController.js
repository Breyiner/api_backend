import { ResponseProvider } from "../providers/ResponseProvider.js";
import LenguajeUsuarioService from "../services/LenguajeUsuarioService.js";

class LenguajeUsuarioController {
  // Obtener todos los usuarios
  static getAllLenguajesUsuarios = async (req, res) => {    
    try {
      // Llamamos al servicio para obtener los lenguajes de los usuarios
      const response = await LenguajeUsuarioService.getLenguajesUsuarios();   
      // Validamos si no hay registros
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

  // Obtener los lenguajes del usuario por su ID
  static getByUsuarioId = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener el usuario por su ID
      const response = await LenguajeUsuarioService.getByUsuarioId(id);
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

  // Crear uno nuevo lenguaje para el usuario
  static createLenguajeUsuario = async (req, res) => {
    const campos = req.body;
    try {
      const response = await LenguajeUsuarioService.createLenguajeUsuario(campos);
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

  // Actualizar un lenguaje del usuario
  static updateLenguajeUsuario = async (req, res) => {
    const { id } = req.params;
    // Los campos a actualizar se pasan en el cuerpo de la solicitud
    const campos = req.body;
    try {
      // Crear una instancia de la clase LenguajeUsuario
      const usuario = await LenguajeUsuarioService.updateLenguajeUsuario(id, campos);
      // Validamos si no se pudo actualizar el lenguaje del usuario
      if (usuario.error) {
        return ResponseProvider.error(
          res,
          usuario.message,
          usuario.code
        );
      }
      // Retornamos la respuesta cuando se actualiza correctamente
      return ResponseProvider.success(
        res,
        usuario.data,
        usuario.message,
        usuario.code
      );
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error al interno en el servidor", 500);
    }
  };

  // Eliminar un usuario
  static deleteLenguajeUsuario = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para eliminar el usuario
      const response = await LenguajeUsuarioService.deleteLenguajeUsuario(id);
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

export default LenguajeUsuarioController;