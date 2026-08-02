import db from "../config/db.js";
import bcrypt from "bcrypt";



const mUsuarios = {
    getAll: async () => {
            const [usuarios] = await db.query("SELECT usuario_id, usuario_nombre, usuario_apellido, usuario_telefono, usuario_email, tipo_usuario_id FROM usuarios");
            return usuarios;
    },
    getOne: async (id) => {
            const [usuario] = await db.query("SELECT usuario_id, usuario_nombre, usuario_apellido, usuario_telefono, usuario_email, tipo_usuario_id FROM usuarios WHERE usuario_id = ?",[id]);
            return usuario[0];
    },
    loginUser: async (email) => {
            const [usuario] = await db.query("SELECT * FROM usuarios WHERE usuario_email = ?",[email]);
            return usuario[0];
    },
    addUser: async (usuario) => {
            const [resultado] = await db.query("INSERT INTO usuarios(usuario_nombre, usuario_apellido, usuario_telefono, usuario_email, usuario_password, tipo_usuario_id) VALUES(?,?,?,?,?,?)",[usuario.nombre,usuario.apellido,usuario.telefono,usuario.email,usuario.password,usuario.tipo_usuario]);
            return resultado.insertId;
    },
    editUser: async (usuario) => {
            const [resultado] = await db.query("UPDATE usuarios SET usuario_nombre = ?, usuario_apellido = ?, usuario_telefono = ?, usuario_email = ?, usuario_password = ?, tipo_usuario_id = ? WHERE usuario_id = ?", [usuario.nombre,usuario.apellido,usuario.telefono,usuario.email,usuario.password,usuario.tipo_usuario,usuario.id]);
            return resultado.affectedRows;
    },
    deleteUser: async (id) => {
            const [resultado] = await db.query("DELETE FROM usuarios WHERE usuario_id = ?",[id]);
            return resultado.affectedRows;     
    },
    countUserAdmins: async () => {
        const [resultado] = await db.query("SELECT COUNT(*) AS admin_count FROM usuarios WHERE tipo_usuario_id = 1");
        return resultado[0].admin_count;
    }
};


export default mUsuarios;
