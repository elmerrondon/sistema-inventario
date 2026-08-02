import mProveedores from "../model/mProveedores.js";

const cProveedores = {
    getAllProveedores: async (req, res) => {
        try {
            const proveedores = await mProveedores.getAll();
            return res.json(proveedores);
        } catch (err) {
            console.error("Error al traer todos los productos: ",err);
            return res.status(500).json({message: "Error interno del servidor"});
        }
    },
    getOneProveedor: async (req, res) => {
        
        const id = parseInt(req.params.id);

        try {
            const proveedor = await mProveedores.getOne(id);
            if(!proveedor){
                return res.status(404).json({message: "Error no se encontro el proveedor en la db"});
            }

            return res.json(proveedor);

        } catch (err) {
            console.error("Error al traer un proveedor: ",err);
            return res.status(500).json({message: "Error interno del servidor"});
        }
    },
    postAddProveedor: async (req, res) => {
        if (req.user.rol !== 1) {
            return res.status(403).json({ message: "No tiene permisos para crear proveedores." });
        }

        let {nombre, telefono, email} = req.body;

        if(!nombre || !telefono || !email){
            return res.status(400).json({message: "Error los datos ingresados no son validos"});
        }


        try {
            const idInsertado = await mProveedores.addProveedor({nombre, telefono, email});
            return res.status(201).json({message: "Proveedor creado exitosamente", id: idInsertado});
        } catch (err) {
            console.error("Error al agregar el proveedor: ",err);
            return res.status(500).json({message: "Error interno del servidor"});
        }
    },
    putEditProveedor: async (req, res) => {
        const id = parseInt(req.params.id);
        let {nombre, telefono, email} = req.body;

        if (req.user.rol !== 1) {
            return res.status(403).json({ message: "No tiene permisos para editar el proveedor." });
        }

        if(!nombre || !telefono || !email){
            return res.status(400).json({message: "Error datos ingresados incopletos o invalidos"});
        }

        try {
            const filasAfectadas = await mProveedores.editProveedor({nombre, telefono, email, id});

            if(filasAfectadas === 0){
                return res.status(404).json({message: "Error proveedor no encontrado"});
            }

            return res.status(204).send();
        } catch (err) {
            console.error("Error no se pudo editar el proveedor: ",err);
            return res.status(500).json({message: "Error interno del servidor"});
        }

    },
    deleteOneProveedor: async (req, res) => {
        const id = parseInt(req.params.id);

        if (req.user.rol !== 1) {
            return res.status(403).json({ message: "No tiene permisos para eliminar el proveedor." });
        }

        try {
            const filasAfectadas = await mProveedores.deleteProveedor(id);

           if(filasAfectadas === 0){
             return res.status(404).json({message: "Error al eliminar no se pudo encontrar el proveedor"});
           }
           
           return res.status(204).send();

        } catch (err) {
           console.error("Error al eliminar el proveedor: ",err);
           return res.status(500).json({message: "Error interno del servidor"}); 
        }
    }
};


export default cProveedores;