import connection from "../utils/bd.js";

class Ciudad {
  async getAll() {
    try {
      const [rows] = await connection.query("SELECT * FROM ciudades");
      return rows;
    } catch (error) {
      throw new Error("Error al obtener las ciudades");
    }
  }

  async getById(id) {
    try {
      const [rows] = await connection.query(
        "SELECT * FROM ciudades WHERE id = ?",
        [id]
      );
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentra la ciudad
        return [];
      }
      // Retorna la ciudad encontrada
      return rows[0];
    } catch (error) {
      throw new Error("Error al obtener la ciudad");
    }
  }

  // Método para crear una nueva ciudad
  async create(ciudad) {
    try {
      const [result] = await connection.query(
        "INSERT INTO ciudades (ciudad) VALUES (?)",
        [ciudad]
      );
      if (result.affectedRows === 0) {
        return null; // Retorna null si no se pudo crear la ciudad
      }
      // Retorna la nueva ciudad creada
      return { id: result.insertId, ciudad };
    } catch (error) {
      throw new Error("Error al crear la Ciudad");
    }
  }

  // Método para actualizar una ciudades
  async update(id, campos) {
    try {
      let query = "UPDATE ciudades SET ";
      let params = [];

      // Construimos dinámicamente la consulta de actualización solo con los campos proporcionados
      for (const [key, value] of Object.entries(campos)) {
        query += `${key} = ?, `;
        params.push(value);
      }

      // Eliminamos la última coma y espacio de la consulta
      query = query.slice(0, -2);

      // Añadimos la condición WHERE para seleccionar el producto por su ID
      query += " WHERE id = ?";
      params.push(id);
      const [result] = await connection.query(query, params);
      return result.affectedRows > 0 ? { id, ...campos } : null;
    } catch (error) {
      throw new Error("Error al actualizar la ciudad");
    }
  }
}

export default Ciudad;