import connection from "../utils/bd.js";
import Lenguaje from "./Lenguaje.js";

class LenguajeUsuario {
  async getAll() {
    try {
      const [rows] = await connection.query("SELECT * FROM lenguaje_usuario");
      return rows;
    } catch (error) {
      throw new Error("Error al obtener los lenguajes de los usuarios");
    }
  }

  async getByUsuarioId(usuarioId) {
    try {
      const [rows] = await connection.query(
        "SELECT * FROM lenguaje_usuario WHERE usuario_id = ?",
        [usuarioId]
      );
      // Retorna el usuario encontrado
      return rows;
    } catch (error) {
      throw new Error("Error al obtener los lenguajes del usuario");
    }
  }

  // Método para crear un nuevo registro
  async create(campos, marcadores, parametros) {
    try {
      const [result] = await connection.query(
        `INSERT INTO lenguaje_usuario (${campos}) VALUES (${marcadores})`,
        parametros
      );
      // Retorna el nuevo registro creado
      return result;
    } catch (error) {
      throw new Error("Error al crear el registro");
    }
  }

//   // Método para actualizar un lenguaje del usuario
//   async updateByUserId(comando, parametros) {
//     try {
//       const [result] = await connection.query(`UPDATE lenguaje_usuario SET ${comando} WHERE usuario_id = ?`, parametros);

//       return result;
//     } catch (error) {
//       throw new Error("Error al actualizar el registro");
//     }
//   }

  // Método para eliminar un usuario
  async deleteByUserId(usuarioId) {
    // Procedemos con la eliminación si no está relacionada
    const [result] = await connection.query(
      "DELETE FROM lenguaje_usuario WHERE usuario_id = ?",
      [usuarioId]
    );

    return result;
  }
}

export default LenguajeUsuario;