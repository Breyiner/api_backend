import { ResponseProvider } from "../providers/ResponseProvider.js";
import GeneroService from "../services/GeneroService.js";

class GeneroController {
  // Obtener todas los generos
  static getAllGeneros = async (req, res) => {    
    try {
      // Llamamos al servicio para obtener los generos
      const response = await GeneroService.getGeneros();   
      // Validamos si no hay Generos
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

  // Obtener un genero por su ID
  static getGeneroById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener el genero por su ID
      const response = await GeneroService.getGeneroById(id);
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

  // Crear uno nuevo genero
  static createGenero = async (req, res) => {
    const { nombre } = req.body;
    try {
      const response = await GeneroService.createGenero(nombre);
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

  // Actualizar un genero
  static updateGenero = async (req, res) => {
    const { id } = req.params;
    // Los campos a actualizar se pasan en el cuerpo de la solicitud
    const campos = req.body;
    try {
      // Crear una instancia de la clase Genero
      const genero = await GeneroService.updateGenero(id, campos);
      // Validamos si no se pudo actualizar la Genero
      if (genero.error) {
        return ResponseProvider.error(
          res,
          genero.message,
          genero.code
        );
      }
      // Retornamos la respuesta cuando se actualiza correctamente
      return ResponseProvider.success(
        res,
        genero.data,
        genero.message,
        genero.code
      );
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "Error al interno en el servidor", 500);
    }
  };

  // Eliminar un genero
  static deleteGenero = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para eliminar el genero
      const response = await GeneroService.deleteGenero(id);
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
export default GeneroController;