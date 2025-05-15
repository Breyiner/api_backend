import Lenguaje from "../models/Lenguaje.js";

class LenguajeService {
  static async getLenguajes()
  { 
    try {
      const lenguajeInstance = new Lenguaje();
      const lenguajes = await lenguajeInstance.getAll();
      
      // Validamos si no hay lenguajes
      if (lenguajes.length === 0) {
        return {
          error: true,
          code: 404,
          message: "No hay lenguajes registrados",
        };
      }    
      // Retornamos los lenguajes obtenidos
      return {
        error: false,
        code: 200,
        message: "Lenguajes obtenidos correctamente",
        data: lenguajes,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener los lenguajes",
      };
    }
  }

  static async getLenguajeById(id) {
    try {
      const lenguajeInstance = new Lenguaje();
      const lenguaje = await lenguajeInstance.getById(id);
      // Validamos si no hay lenguajes
      if (lenguaje.length === 0) {
        return {
          error: true,
          code: 404,
          message: "lenguaje no encontrado",
        };
      }
      // Retornamos el lenguaje obtenido
      return {
        error: false,
        code: 200,
        message: "Lenguaje obtenido correctamente",
        data: lenguaje[0],
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener el lenguaje",
      };
    }
  }

  static async createLenguaje(lenguaje) {
    try {
      const lenguajeInstance = new Lenguaje();
      const lenguajeCreado = await lenguajeInstance.create(lenguaje);
      // Validamos si no se pudo crear el lenguaje
      if (lenguajeCreado.affectedRows === 0) {
        return {
          error: true,
          code: 400,
          message: "Error al crear el lenguaje",
        };
      }
      // Retornamos el nuevo lenguaje creado
      return {
        error: false,
        code: 201,
        message: "Lenguaje creado correctamente",
        data: { id: lenguajeCreado.insertId, lenguaje },
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al crear el lenguaje",
      };
    }
  }

  static async updateLenguaje(id, campos) { 
    try {
      const lenguajeInstance = new Lenguaje();
      // Consultamos el lenguaje por id
      const lenguajeExistente = await lenguajeInstance.getById(id);
      // Validamos si no existe el lenguaje
      if (lenguajeExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "lenguaje no encontrado",
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

      let lenguaje = await lenguajeInstance.update(comando, parametros);
      lenguaje = lenguaje.affectedRows > 0 ? { id, ...campos } : null;
      // Validamos si no se pudo actualizar el lenguaje
      if (lenguaje === null) {
        return {
          error: true,
          code: 400,
          message: "Error al actualizar el lenguaje",
        };
      }      
      // Retornamos el lenguaje actualizado
      return {
        error: false,
        code: 200,
        message: "Lenguaje actualizado correctamente",
        data: lenguaje,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al actualizar el lenguaje",
      };
    } 
  }

  static async deleteLenguaje(id) { 
    try {
      const lenguajeInstance = new Lenguaje();
      // Consultamos el lenguaje por id
      const lenguajeExistente = await lenguajeInstance.getById(id);
      // Validamos si no existe el lenguaje
      if (lenguajeExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "lenguaje no encontrado",
        };
      }
      // // Consultamos los productos asociados a el lenguaje
      // const productos = await categoriaInstance.productos(id);
      // // Validamos si el lenguaje tiene productos asociados
      // if (productos.length > 0) {
      //   return {
      //     error: true,
      //     code: 400,
      //     message: "No se puede eliminar el lenguaje, tiene productos asociados",
      //   };
      // }
      
      // Procedemos a eliminar el lenguaje      
      const resultado = await lenguajeInstance.delete(id); 
      // Validamos si no se pudo eliminar el lenguaje
      if (resultado.affectedRows === 0) {
        return {
          error: true,
          code: 400,
          message: "No se pudo eliminar el lenguaje, ocurrio un error inesperado.",
        };
      }      
      // Retornamos la respuesta de eliminación
      return {
        error: false,
        code: 200,
        message: "lenguaje eliminada correctamente",
        data: lenguajeExistente[0],
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al eliminar el lenguaje",
      };
    }
  }
}

export default LenguajeService;