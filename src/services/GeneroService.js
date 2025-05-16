import Genero from "../models/Genero.js";
import Usuario from "../models/Usuario.js";


class GeneroService {
  static async getGeneros()
  { 
    try {
      const generoInstance = new Genero();
      const generos = await generoInstance.getAll();
      
      
      // Validamos si no hay generos
      if (generos.length === 0) {
        return {
          error: true,
          code: 404,
          message: "No hay generos registrados",
        };
      }    
      // Retornamos las generos obtenidos
      return {
        error: false,
        code: 200,
        message: "Generos obtenidos correctamente",
        data: generos,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener los generos",
      };
    }
  }

  static async getGeneroById(id) {
    try {
      const generoInstance = new Genero();
      const genero = await generoInstance.getById(id);
      // Validamos si no hay generos
      if (genero.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Genero no encontrado",
        };
      }
      // Retornamos el genero obtenido
      return {
        error: false,
        code: 200,
        message: "Genero obtenido correctamente",
        data: genero[0],
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener el Genero",
      };
    }
  }

  static async createGenero(genero) {
    try {
      const generoInstance = new Genero();
      const generoCreado = await generoInstance.create(genero);
      // Validamos si no se pudo crear el genero
      if (generoCreado.affectedRows === 0) {
        return {
          error: true,
          code: 400,
          message: "Error al crear el Genero",
        };
      }
      // Retornamos el nuevo genero creado
      return {
        error: false,
        code: 201,
        message: "Genero creado correctamente",
        data: { id: generoCreado.insertId, genero },
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al crear el genero",
      };
    }
  }

  static async updateGenero(id, campos) { 
    try {
      const generoInstance = new Genero();
      // Consultamos el Genero por id
      const GeneroExistente = await generoInstance.getById(id);
      // Validamos si no existe el genero
      if (GeneroExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Genero no encontrado",
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

      let genero = await generoInstance.update(comando, parametros);
      genero = genero.affectedRows > 0 ? { id, ...campos } : null;
      // Validamos si no se pudo actualizar el genero
      if (genero === null) {
        return {
          error: true,
          code: 400,
          message: "Error al actualizar el genero",
        };
      }      
      // Retornamos el genero actualizado
      return {
        error: false,
        code: 200,
        message: "Genero actualizado correctamente",
        data: Genero,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al actualizar el genero",
      };
    } 
  }

  static async deleteGenero(id) { 
    try {
      const generoInstance = new Genero();
      // Consultamos el genero por id
      const generoExistente = await generoInstance.getById(id);
      // Validamos si no existe el genero
      if (generoExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Genero no encontrado",
        };
      }

      const usuarioInstance = new Usuario();
      // Consultamos los usuarios asociados al genero
      const usuarios = await usuarioInstance.getByGeneroId(id);
      // Validamos si el genero tiene usuarios asociados
      if (usuarios.length > 0) {
        return {
          error: true,
          code: 400,
          message: "No se puede eliminar el genero, tiene usuarios asociados",
        };
      }
      
      // Procedemos a eliminar el genero      
      const resultado = await generoInstance.delete(id); 
      // Validamos si no se pudo eliminar el genero
      if (resultado.affectedRows === 0) {
        return {
          error: true,
          code: 400,
          message: "No se pudo eliminar el genero, ocurrio un error inesperado.",
        };
      }      
      // Retornamos la respuesta de eliminación
      return {
        error: false,
        code: 200,
        message: "Genero eliminada correctamente",
        data: generoExistente[0],
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al eliminar el genero",
      };
    }
  }
}

export default GeneroService;