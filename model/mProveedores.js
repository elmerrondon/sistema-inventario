import db from "../config/db.js";


const mProveedores = {
    getAll: async () => {
        const [proveedores] = await db.query("SELECT * FROM proveedores");
        return proveedores;
    },
    getOne: async (id) => {
        const [proveedor] = await db.query("SELECT * FROM proveedores WHERE proveedor_id = ?",[id]);
        return proveedor[0];
    },
    addProveedor: async (proveedor) => {
        const [resultado] = await db.query("INSERT INTO proveedores(proveedor_nombre,proveedor_telefono,proveedor_email) VALUES(?,?,?)",[proveedor.nombre,proveedor.telefono,proveedor.email]);
        return resultado.affectedRows;
    },
    editProveedor: async (proveedor) => {
        const [resultado] = await db.query("UPDATE proveedores SET proveedor_nombre = ?, proveedor_telefono = ?, proveedor_email = ? WHERE proveedor_id = ?", [proveedor.nombre,proveedor.telefono,proveedor.email,proveedor.id]);
        return resultado.affectedRows;
    },
    deleteProveedor: async (id) => {
        const [resultado] = await db.query("DELETE FROM proveedores WHERE proveedor_id = ?", [id]);
        return resultado.affectedRows;
    }
};


export default mProveedores;