import connection from "../utils/bd.js";

class Lenguaje {
  async getAll() {
    try {
      const [rows] = await connection.query("SELECT * FROM lenguajes");
      return rows;
    } catch (error) {
      throw new Error("Error al obtener los lenguajes");
    }
  }

  async getById(id) {
    try {
      const [rows] = await connection.query(
        "SELECT * FROM lenguajes WHERE id = ?",
        [id]
      );
      // Retorna el lenguaje encontrado
      return rows;
    } catch (error) {
      throw new Error("Error al obtener el lenguaje");
    }
  }

  // Método para crear un nuevo lenguaje
  async create(lenguaje) {
    try {
      const [result] = await connection.query(
        "INSERT INTO lenguajes (nombre) VALUES (?)",
        [lenguaje]
      );
      // Retorna el nuevo lenguaje creado
      return result;
    } catch (error) {
      throw new Error("Error al crear el lenguaje");
    }
  }

  // Método para actualizar un lenguaje
  async update(comando, parametros) {
    try {
      const [result] = await connection.query(`UPDATE lenguajes SET ${comando} WHERE id = ?`, parametros);

      return result;
    } catch (error) {
      throw new Error("Error al actualizar el lenguaje");
    }
  }

  // Método para eliminar un lenguaje
  async delete(lenguajeId) {
    // Procedemos con la eliminación si no está relacionada
    const [result] = await connection.query(
      "DELETE FROM lenguajes WHERE id = ?",
      [lenguajeId]
    );

    return result;
  }
}

export default Lenguaje;