import LenguajeUsuario from "../models/LenguajeUsuario.js";

class LenguajeUsuarioService {
  static async getLenguajesUsuarios()
  { 
    try {
      const lenguajelenguajeUsuarioInstance = new LenguajeUsuario();
      const lenguajesUsuarios = await lenguajelenguajeUsuarioInstance.getAll();
      
      // Validamos si no hay registros
      if (lenguajesUsuarios.length === 0) {
        return {
          error: true,
          code: 404,
          message: "No hay usuarios registrados",
        };
      }    
      // Retornamos los registros obtenidos
      return {
        error: false,
        code: 200,
        message: "Usuarios obtenidos correctamente",
        data: lenguajesUsuarios,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener los lengujes de los usuarios",
      };
    }
  }

  static async getByUsuarioId(id) {
    try {
      const lenguajeUsuarioInstance = new LenguajeUsuario();
      const lenguajesUsuario = await lenguajeUsuarioInstance.getByUsuarioId(id);
      // Validamos si no hay usuarios
      if (lenguajesUsuario.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Usuario no encontrado",
        };
      }
      // Retornamos el usuario obtenido
      return {
        error: false,
        code: 200,
        message: "Lenguajes del usuario obtenidos correctamente",
        data: lenguajesUsuario,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener los lenguajes del usuario",
      };
    }
  }

  static async createLenguajeUsuario(campos) {
    try {
      // Se obtienen los campos, la cantidad de marcadores y los parametros para crear el usuario
      let camposRegistro = "";
      let marcadores = "";
      let parametros = [];
      // Construimos dinámicamente la consulta de creacion solo con los campos proporcionados
      for (const [key, value] of Object.entries(campos)) {
        camposRegistro += `${key},`;
        marcadores += "?,";
        parametros.push(value);
      }
      
      // se quitan las comas del final
      camposRegistro = camposRegistro.slice(0, -1);
      marcadores = marcadores.slice(0, -1);

      const lenguajeUsuarioInstance = new LenguajeUsuario();
      const registroCreado = await lenguajeUsuarioInstance.create(camposRegistro,marcadores,parametros);
      // Validamos si no se pudo crear el registro
      if (registroCreado.affectedRows === 0) {
        return {
          error: true,
          code: 400,
          message: "Error al asignar el lenguaje al usuario",
        };
      }
      
      // Retornamos el nuevo registro creado
      return {
        error: false,
        code: 201,
        message: "Lenguaje asignado correctamente",
        data: { id: registroCreado.insertId, ...campos },
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al asignar el lenguaje",
      };
    }
  }

  static async updateLenguajeUsuario(id, campos) { 
    try {
      const lenguajeUsuarioInstance = new LenguajeUsuario();
      // Consultamos los lenguajes asignados al id del usuario
      const registroExistente = await lenguajeUsuarioInstance.getByUsuarioId(id);
      // Validamos si no existe el usuario
      if (registroExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Usuario no encontrado",
        };
      }

      // eliminamos el lenguaje y el resultado lo asignamos a una variable
      const registroEliminado = await this.deleteLenguajeUsuario(id);

      // Validamos si no se pudo actualizar el lenguaje del usuario
      if (registroEliminado.error) {
        return {
          error: true,
          code: 400,
          message: "Error al actualizar el lenguaje del usuario",
        };
      }
       // Asignamos los nuevos lenguajes del usuario
    const registrosCreado = await this.createLenguajeUsuario(campos);
    
    // Validamos si hubo un error al crear los nuevos lenguajes
    if (registrosCreado.error) {
      return {
        error: true,
        code: 400,
        message: "Error al asignar los nuevos lenguajes al usuario",
      };
    }
    // Retornamos el lenguaje del usuario actualizado
    return {
      error: false,
      code: 200,
      message: "Lenguaje actualizado correctamente",
      data: registrosCreado.data,
    };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al actualizar el lenguaje del usuario",
      };
    } 
  }

  static async deleteLenguajeUsuario(id) { 
    try {
      const lenguajeUsuarioInstance = new LenguajeUsuario();
      // Consultamos los lenguajes del usuario por su id
      const registrosExistentes = await lenguajeUsuarioInstance.getByUsuarioId(id);
      // Validamos si no existe el usuario
      if (registrosExistentes.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Usuario no encontrado",
        };
      }
      
      // Procedemos a eliminar el usuario      
      const resultado = await lenguajeUsuarioInstance.deleteByUserId(id); 
      // Validamos si no se pudo eliminar el lenguaje del usuario
      if (resultado.affectedRows === 0) {
        return {
          error: true,
          code: 400,
          message: "No se pudo eliminar el usuario, ocurrio un error inesperado.",
        };
      }      
      // Retornamos la respuesta de eliminación
      return {
        error: false,
        code: 200,
        message: "Usuario eliminado correctamente",
        data: registrosExistentes,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al eliminar el usuario",
      };
    }
  }
}

export default LenguajeUsuarioService;