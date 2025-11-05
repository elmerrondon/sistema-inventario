import db from "../config/db.js";

const mProductos = {
    getAll: async () => {
            const [productos] = await db.query("SELECT * FROM productos");
            return productos;
    },
    getOne: async (id) => {
        
            const [producto] = await db.query("SELECT * FROM productos WHERE producto_id = ?",[id]);
            return producto[0];
    },
    addProduct: async (producto) => {
            const [resultado] = await db.query("INSERT INTO productos(producto_nombre,producto_precio,producto_stock,proveedor_id) VALUES(?,?,?,?)",[producto.nombre,producto.precio,producto.stock,producto.proveedor]);
            return resultado.insertId;
    },
    editProduct: async (producto) => {
            const [resultado] = await db.query("UPDATE productos SET producto_nombre = ?, producto_precio = ?, producto_stock = ?, proveedor_id = ? WHERE producto_id = ?",[producto.nombre,producto.precio,producto.stock,producto.proveedor,producto.id]);
            return resultado.affectedRows;
    },
    deleteProduct: async (id) => {
            const [resultado] = await db.query("DELETE FROM productos where producto_id = ?",[id]);
            return resultado.affectedRows;
    }
};


export default mProductos;