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
        data: ciudad,
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
      if (ciudadCreada === null) {
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
        data: ciudadCreada,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al crear la ciudad",
      };
    }
  }

  async partialUpdate(id, campos) {
        try {
            let comando = "";
            for (const propiedad in campos) {
                comando += `${propiedad} = "${campos[propiedad]}", `;
            }

            comando = comando.substring(0, comando.length - 2);

            const resultado = await this.OBJCiudad.partialUpdate(id, comando);
      
            if (resultado.affectedRows === 0) throw new Error("Ciudad no encontrada.");

            return { id, camposActualizados: campos };
        } catch (error) {
            throw new Error(`Error al actualizar la ciudad: ${error.message}`);
        }
    }
}

export default CiudadService;