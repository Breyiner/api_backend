import connection from "../utils/bd.js";

class Genero {
  async getAll() {
    try {
      const [rows] = await connection.query("SELECT * FROM generos");
      return rows;
    } catch (error) {
      throw new Error("Error al obtener los generos");
    }
  }

  async getById(id) {
    try {
      const [rows] = await connection.query(
        "SELECT * FROM generos WHERE id = ?",
        [id]
      );
      // Retorna el genero encontrado
      return rows;
    } catch (error) {
      throw new Error("Error al obtener el genero");
    }
  }

  // Método para crear una nueva genero
  async create(genero) {
    try {
      const [result] = await connection.query(
        "INSERT INTO generos (nombre) VALUES (?)",
        [genero]
      );
      // Retorna el nueva genero creada
      return result;
    } catch (error) {
      throw new Error("Error al crear el genero");
    }
  }

  // Método para actualizar un genero
  async update(comando, parametros) {
    try {
      const [result] = await connection.query(`UPDATE generos SET ${comando} WHERE id = ?`, parametros);

      return result;
    } catch (error) {
      throw new Error("Error al actualizar el genero");
    }
  }

  // Método para eliminar un genero
  async delete(generoId) {
    // Procedemos con la eliminación si no está relacionada
    const [result] = await connection.query(
      "DELETE FROM generos WHERE id = ?",
      [generoId]
    );

    return result;
  }
}

export default Genero;