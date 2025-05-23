import Usuario from "../models/Usuario.js";
import LenguajeUsuario from "../models/LenguajeUsuario.js";
import { ResponseProvider } from "../providers/ResponseProvider.js";

class UsuarioService {
  static async getUsuarios()
  { 
    try {
      const usuarioInstance = new Usuario();
      let usuarios = await usuarioInstance.getAll();
      
      // Validamos si no hay usuarios
      if (usuarios.length === 0) {
        return {
          error: true,
          code: 404,
          message: "No hay usuarios registrados",
        };
      }    

      // consultamos los lenguajes del usuario
      const lenguajeUsuarioInstance = new LenguajeUsuario();
      
      usuarios = await Promise.all(usuarios.map(async usuario => {
        const lenguajesObtenidos = await lenguajeUsuarioInstance.getByUsuarioId(usuario.id);
        // obtenemos el id de cada lenguaje del usuario
        let lenguajes = lenguajesObtenidos.map(lenguaje => lenguaje.lenguaje_id);
        
        // reorganizamos el arreglo del usuario
        return {...usuario, lenguajes}
      }));

      // Retornamos los usuarios obtenidos
      return {
        error: false,
        code: 200,
        message: "Usuarios obtenidos correctamente",
        data: usuarios,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener los usuarios",
      };
    }
  }

  static async getUsuarioById(id) {
    try {
      const usuarioInstance = new Usuario();
      let usuario = await usuarioInstance.getById(id);
      // Validamos si no hay usuarios
      if (usuario.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Usuario no encontrado",
        };
      }

      // consultamos los lenguajes del usuario
      const lenguajeUsuarioInstance = new LenguajeUsuario();
      const lenguajesObtenidos = await lenguajeUsuarioInstance.getByUsuarioId(id);

      // obtenemos el id de cada lenguaje del usuario
      let lenguajes = lenguajesObtenidos.map(lenguaje => lenguaje.lenguaje_id);
      
      // reorganizamos el arreglo del usuario
      usuario = {...usuario[0], lenguajes}
      // Retornamos el usuario obtenido
      return {
        error: false,
        code: 200,
        message: "Usuario obtenido correctamente",
        data: usuario,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener el usuario",
      };
    }
  }

  static async createUsuario(campos) {
    try {
      
      const usuarioInstance = new Usuario();
      const usuarios = await usuarioInstance.getAll();

      for (const usuario of usuarios) {
        if (usuario.documento == campos.documento) {
          return {
            error: true,
            code: 400,
            message: "El documento ingresado ya se encuentra registrado",
          };
        }
        if (usuario.usuario == campos.usuario) {
          return {
            error: true,
            code: 400,
            message: "El nombre de usuario ingresado ya se encuentra registrado",
          };
        }
      }


      // Se obtienen los campos, la cantidad de marcadores y los parametros para crear el usuario
      let camposUsuario = "";
      let marcadores = "";
      let parametros = [];
      // Construimos dinámicamente la consulta de creacion solo con los campos proporcionados
      for (const [key, value] of Object.entries(campos)) {
        camposUsuario += `${key},`;
        marcadores += "?,";
        parametros.push(value);
      }

      // let idCiudad = campos.findIndex()
      
      // se quitan las comas del final
      camposUsuario = camposUsuario.slice(0, -1);
      marcadores = marcadores.slice(0, -1);

      const usuarioCreado = await usuarioInstance.create(camposUsuario,marcadores,parametros);
      // Validamos si no se pudo crear el usuario
      if (usuarioCreado.affectedRows === 0) {
        return {
          error: true,
          code: 400,
          message: "Error al crear el usuario",
        };
      }
      
      // Retornamos el nuevo usuario creado
      return {
        error: false,
        code: 201,
        message: "usuario creado correctamente",
        data: { id: usuarioCreado.insertId, ...campos },
      };
    } catch (error) {
      console.log(error);
      
      return {
        error: true,
        code: 500,
        message: "Error interno al crear el usuario",
      };
    }
  }

  static async updateUsuario(id, campos) { 
    try {
      const usuarioInstance = new Usuario();
      // Consultamos el usuario por id
      const usuarioExistente = await usuarioInstance.getById(id);
      // Validamos si no existe el usuario
      if (usuarioExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Usuario no encontrado",
        };
      }

      if (campos.documento && (usuarioExistente.documento == campos.documento)) {
        return {
          error: true,
          code: 400,
          message: "El documento ingresado ya se encuentra registrado",
        };
      }
      if (campos.usuario && (usuarioExistente.usuario == campos.usuario)) {
        return {
          error: true,
          code: 400,
          message: "El nombre de usuario ingresado ya se encuentra registrado",
        };
      }

      let comando = "";
      let parametros = [];
      // Construimos dinámicamente la consulta de actualización solo con los campos proporcionados
      for (const [key, value] of Object.entries(campos)) {
        comando += `${key} = ?, `;
        parametros.push(value);
      }

      comando = comando.slice(0, -2);
      parametros.push(id);

      let usuario = await usuarioInstance.update(comando, parametros);
      usuario = usuario.affectedRows > 0 ? { id, ...campos } : null;
      // Validamos si no se pudo actualizar el usuario
      if (usuario === null) {
        return {
          error: true,
          code: 400,
          message: "Error al actualizar el usuario",
        };
      }      
      // Retornamos el usuario actualizado
      return {
        error: false,
        code: 200,
        message: "Usuario actualizado correctamente",
        data: usuario,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al actualizar el usuario",
      };
    } 
  }

  static async deleteUsuario(id) { 
    try {
      const usuarioInstance = new Usuario();
      // Consultamos el usuario por id
      const usuarioExistente = await usuarioInstance.getById(id);
      // Validamos si no existe el usuario
      if (usuarioExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "usuario no encontrado",
        };
      }
      
      // Procedemos a eliminar el usuario      
      const resultado = await usuarioInstance.delete(id); 
      // Validamos si no se pudo eliminar el usuario
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
        message: "Usuario eliminada correctamente",
        data: usuarioExistente[0],
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

export default UsuarioService;