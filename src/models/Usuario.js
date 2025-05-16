import connection from "../utils/bd.js";

class Usuario {
  async getAll() {
    try {
      const [rows] = await connection.query("SELECT * FROM usuarios");
      return rows;
    } catch (error) {
      throw new Error("Error al obtener los usuarios");
    }
  }

  async getById(id) {
    try {
      const [rows] = await connection.query(
        "SELECT * FROM usuarios WHERE id = ?",
        [id]
      );
      // Retorna el usuario encontrado
      return rows;
    } catch (error) {
      throw new Error("Error al obtener el usuario");
    }
  }

  async getByCiudadId(id) {
    try {
      const [rows] = await connection.query(
        `SELECT * FROM usuarios WHERE ciudad_id = ?`,
        [id]
      );
      // Retorna el usuario encontrado
      return rows;
    } catch (error) {
      throw new Error("Error al obtener el usuario");
    }
  }

  async getByGeneroId(id) {
    try {
      const [rows] = await connection.query(
        `SELECT * FROM usuarios WHERE genero_id = ?`,
        [id]
      );
      // Retorna el usuario encontrado
      return rows;
    } catch (error) {
      throw new Error("Error al obtener el usuario");
    }
  }

  // Método para crear un nuevo usuario
  async create(campos, marcadores, parametros) {
    try {
      const [result] = await connection.query(
        `INSERT INTO usuarios (${campos}) VALUES (${marcadores})`,
        parametros
      );
      // Retorna el nuevo usuario creado
      return result;
    } catch (error) {
      throw new Error("Error al crear el usuario");
    }
  }

  // Método para actualizar un usuario
  async update(comando, parametros) {
    try {
      const [result] = await connection.query(`UPDATE usuarios SET ${comando} WHERE id = ?`, parametros);

      return result;
    } catch (error) {
      throw new Error("Error al actualizar el usuario");
    }
  }

  // Método para eliminar un usuario
  async delete(usuarioId) {
    // Procedemos con la eliminación si no está relacionada
    const [result] = await connection.query(
      "DELETE FROM usuarios WHERE id = ?",
      [usuarioId]
    );

    return result;
  }
}

export default Usuario;