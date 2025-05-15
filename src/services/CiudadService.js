import Ciudad from "../models/Ciudad.js";

class CiudadService {
  static async getCiudades()
  { 
    try {
      const ciudadInstance = new Ciudad();
      const ciudades = await ciudadInstance.getAll();
      
      
      // Validamos si no hay ciudades
      if (ciudades.length === 0) {
        return {
          error: true,
          code: 404,
          message: "No hay ciudades registradas",
        };
      }    
      // Retornamos las ciudades obtenidas
      return {
        error: false,
        code: 200,
        message: "Ciudades obtenidas correctamente",
        data: ciudades,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener las ciudades",
      };
    }
  }

  static async getCiudadById(id) {
    try {
      const ciudadInstance = new Ciudad();
      const ciudad = await ciudadInstance.getById(id);
      // Validamos si no hay ciudades
      if (ciudad.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Ciudad no encontrada",
        };
      }
      // Retornamos la ciudad obtenida
      return {
        error: false,
        code: 200,
        message: "Ciudad obtenida correctamente",
        data: ciudad[0],
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener la ciudad",
      };
    }
  }

  static async createCiudad(ciudad) {
    try {
      const ciudadInstance = new Ciudad();
      const ciudadCreada = await ciudadInstance.create(ciudad);
      // Validamos si no se pudo crear la ciudad
      if (ciudadCreada.affectedRows === 0) {
        return {
          error: true,
          code: 400,
          message: "Error al crear la ciudad",
        };
      }
      // Retornamos la nueva ciudad creada
      return {
        error: false,
        code: 201,
        message: "Ciudad creada correctamente",
        data: { id: ciudadCreada.insertId, ciudad },
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al crear la ciudad",
      };
    }
  }

  static async updateCiudad(id, campos) { 
    try {
      const ciudadInstance = new Ciudad();
      // Consultamos la ciudad por id
      const ciudadExistente = await ciudadInstance.getById(id);
      // Validamos si no existe la ciudad
      if (ciudadExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "ciudad no encontrada",
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

      let ciudad = await ciudadInstance.update(comando, parametros);
      ciudad = ciudad.affectedRows > 0 ? { id, ...campos } : null;
      // Validamos si no se pudo actualizar la ciudad
      if (ciudad === null) {
        return {
          error: true,
          code: 400,
          message: "Error al actualizar la ciudad",
        };
      }      
      // Retornamos la ciudad actualizada
      return {
        error: false,
        code: 200,
        message: "Ciudad actualizada correctamente",
        data: ciudad,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al actualizar la ciudad",
      };
    } 
  }

  static async deleteCiudad(id) { 
    try {
      const ciudadInstance = new Ciudad();
      // Consultamos la ciudad por id
      const ciudadExistente = await ciudadInstance.getById(id);
      // Validamos si no existe la ciudad
      if (ciudadExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "ciudad no encontrada",
        };
      }
      // // Consultamos los productos asociados a la ciudad
      // const productos = await categoriaInstance.productos(id);
      // // Validamos si la ciudad tiene productos asociados
      // if (productos.length > 0) {
      //   return {
      //     error: true,
      //     code: 400,
      //     message: "No se puede eliminar la ciudad, tiene productos asociados",
      //   };
      // }
      
      // Procedemos a eliminar la ciudad      
      const resultado = await ciudadInstance.delete(id); 
      // Validamos si no se pudo eliminar la ciudad
      if (resultado.affectedRows === 0) {
        return {
          error: true,
          code: 400,
          message: "No se pudo eliminar la ciudad, ocurrio un error inesperado.",
        };
      }      
      // Retornamos la respuesta de eliminación
      return {
        error: false,
        code: 200,
        message: "Ciudad eliminada correctamente",
        data: ciudadExistente,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al eliminar la ciudad",
      };
    }
  }
}

export default CiudadService;