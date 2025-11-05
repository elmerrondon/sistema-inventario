import mProductos from "../model/mProductos.js";


const cProductos = {
    getAllProducts: async (req, res) => {
        try {
            let productos = await mProductos.getAll();
            return res.json(productos); 
        } catch (err) {
            console.error("Error al conectarse a la base de datos: ",err);
           return res.status(500).json({message: "Error interno al consultar la DB" });
        }
    },
    getOneProduct: async (req, res) => {
        try {
            let id = parseInt(req.params.id);
            let producto = await mProductos.getOne(id);

            if(!producto){
                 return res.status(404).json({message: "El producto solicitado no existe"});
            }

            return res.json(producto);
        } catch (err) {
             console.error("Error al obtener un producto:", err);
            return res.status(500).json({ message: "Error interno del servidor." });
        }
    },
    postAddProduct: async (req, res) => {
        let {nombre, precio, stock, proveedor} = req.body;
        precio = parseFloat(precio);
        stock = parseInt(stock);
        proveedor = parseInt(proveedor);
        
        if(!nombre || (isNaN(precio) || precio<0) || (isNaN(stock) || stock<0) || (isNaN(proveedor) || proveedor<0)){
            return res.status(400).json({ message: "Datos de entrada inválidos o incompletos" });
        }

        try {

            let idCreado =  await mProductos.addProduct({nombre,precio,stock,proveedor});
            return res.status(201).json({message: "Producto Creado Exitosamente.", id: idCreado})

        } catch (err) {
            console.error("Error al crear el producto: ",err);
            return res.status(500).json({message: "Error interno del servidor." });
        }
    },
    putEditProduct: async (req, res) => {
        const id = parseInt(req.params.id);
        let {nombre, precio, stock, proveedor} = req.body;
        precio = parseFloat(precio);
        stock = parseInt(stock);
        proveedor = parseInt(proveedor);
        
        if(!nombre || (isNaN(precio) || precio<0) || (isNaN(stock) || stock<0) || (isNaN(proveedor) || proveedor<0)){
            return res.status(400).json({ message: "Datos de entrada inválidos o incompletos" });
        }

         try {

           let filasAfectadas = await mProductos.editProduct({nombre, precio, stock, proveedor, id});

           if(filasAfectadas===0){
              return res.status(404).json({ message: "Producto no encontrado." });
           }

            return res.status(204).send();

        } catch (err) {
            console.error("Error no se pudo actualizar el producto: ", err);
           return res.status(500).json({message: "Error interno del servidor al procesar la solicitud" });        }
    },
    deleteOneProduct: async (req, res) => {
        const id = parseInt(req.params.id);

         try {

            let filasAfectadas = await mProductos.deleteProduct(id);

            if(filasAfectadas===0){
                return res.status(404).json({message: "Producto no encontrado no se pudo eliminar"});
            }

            return res.status(204).send();
        } catch (err) {
            console.error("Error no se pudo eliminar el producto: ", err);
            return res.status(500).json({message: "Error interno del servidor." });
        }
    }
};


export default cProductos;
