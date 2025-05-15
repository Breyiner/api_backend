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
      // Retorna la ciudad encontrada
      return rows;
    } catch (error) {
      throw new Error("Error al obtener la ciudad");
    }
  }

  // Método para crear una nueva ciudad
  async create(ciudad) {
    try {
      const [result] = await connection.query(
        "INSERT INTO ciudades (nombre) VALUES (?)",
        [ciudad]
      );
      // Retorna la nueva ciudad creada
      return result;
    } catch (error) {
      throw new Error("Error al crear la Ciudad");
    }
  }

  // Método para actualizar una ciudades
  async update(comando, parametros) {
    try {
      const [result] = await connection.query(`UPDATE ciudades SET ${comando} WHERE id = ?`, parametros);

      return result;
    } catch (error) {
      throw new Error("Error al actualizar la ciudad");
    }
  }

  // Método para eliminar una ciudad
  async delete(ciudadId) {
    // Procedemos con la eliminación si no está relacionada
    const [result] = await connection.query(
      "DELETE FROM ciudades WHERE id = ?",
      [ciudadId]
    );

    return result;
  }
}

export default Ciudad;