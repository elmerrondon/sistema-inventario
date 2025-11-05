import mUsuarios from "../model/mUsuarios.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const cUsuarios = {
    getAllUsers: async (req, res) => {
        if (req.user.rol !== 1) {
            return res.status(403).json({ message: "No tiene permisos para ver los usuarios." });
        }

        try {
            const usuarios = await mUsuarios.getAll();
            return res.json(usuarios);
        } catch (err) {
            console.error("Error al obtener todos los usuarios: ", err);
            return res.status(500).json({message: "Error interno al consultar la DB"});
        }
    },
    getOneUser: async (req, res) => {
        let id = parseInt(req.params.id);

        try {
            const usuario = await mUsuarios.getOne(id);
            if(!usuario){
                 return res.status(404).json({message: "El usuario solicitado no existe"});
            }

            return res.json(usuario);    
        } catch (err) {
            console.error("Error al obtener un usuario: ", err);
            return res.status(500).json({ message: "Error interno del servidor." });
        }
    },
    loginUsuario: async (req, res) => {
        let {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message: "Error datos ingresados incorrectos o invalidos"});
        }
        try {
            const usuario = await mUsuarios.loginUser(email);

            const storedPassword = usuario.usuario_password;

            if(!usuario){
                return res.status(404).json({message: "Error el usuario no existe"});
            }

            const esHashBcrypt = storedPassword.startsWith('$2a$') || storedPassword.startsWith('$2b$') || storedPassword.startsWith('$2y$');

            if(!esHashBcrypt){
                if(storedPassword === password){
                    const newHash = await bcrypt.hash(usuario.usuario_password, 10);
                    usuario.usuario_password = newHash;
                    await mUsuarios.editUser({id: usuario.usuario_id, nombre: usuario.usuario_nombre, apellido: usuario.usuario_apellido, telefono: usuario.usuario_telefono, email: usuario.usuario_email, password: usuario.usuario_password, tipo_usuario: usuario.tipo_usuario_id});
                    console.log("Contraseña actualizada y hasheada por primera vez.");
                }
                else{
                    return res.status(401).json({ message: "Usuario o contraseña incorrectos." });
                }
            }

            const validacion = await bcrypt.compare(password,usuario.usuario_password);

            if(!validacion){
                return res.status(401).json({ message: "Usuario o contraseña incorrectos." });
            }

           
            else{
                 const payload = {
                id: usuario.usuario_id,
                rol: usuario.tipo_usuario_id
            };

            const token = jwt.sign(
                payload,
                process.env.SECRET_KEY,
                {
                    expiresIn: '1d'
                }
            );

                return res.status(200).json({token: token, idUsuario: usuario.usuario_id, tipo_usuario: usuario.tipo_usuario_id});
            }

            
            
        } catch (err){
            console.error("Error en el inicio de sesion", err);
            return res.status(500).json({message: "Error interno en el servidor"});
        }
    },
    postAddUser: async (req, res) => {
        if (req.user.rol !== 1) {
            return res.status(403).json({ message: "No tiene permisos para crear usuarios." });
        }

        let {nombre, apellido, telefono, email, password, tipo_usuario} = req.body;
        tipo_usuario = parseInt(tipo_usuario);
        if(!nombre || !apellido || !telefono || !email || !password || (isNaN(tipo_usuario) || tipo_usuario<0 || (tipo_usuario !== 1 && tipo_usuario !== 2))){
            return res.status(400).json({message: "Datos de entrada incorrectos o invalidos"});
        }

        try {
          const claveHash = await bcrypt.hash(password, 10);

          let idCreado = await mUsuarios.addUser({nombre, apellido, telefono, email, password: claveHash, tipo_usuario});
            return res.status(201).json({message: "Usuario creado exitosamente con el id: ",idCreado});
        } catch (err) {
            console.error("Error al crear el usuario: ",err);
            return res.status(500).json({message: "Error interno del servidor." });
        }
    },
    putEditUser: async (req, res) => {
        if (req.user.rol !== 1) {
            return res.status(403).json({ message: "No tiene permisos para editar los usuarios." });
        }

        const id = parseInt(req.params.id);
        let {nombre, apellido, telefono, email, password, tipo_usuario} = req.body;
        tipo_usuario = parseInt(tipo_usuario);

        if(!nombre || !apellido || !telefono || !email || !password || (isNaN(tipo_usuario) || tipo_usuario < 0 || (tipo_usuario !== 1 && tipo_usuario !== 2))){
            return res.status(400).json({message: "Datos de entrada incorrectos o invalidos"});
        }

        try {
            const claveHash = await bcrypt.hash(password, 10);
            const filasAfectadas = await mUsuarios.editUser({nombre, apellido, telefono, email, password: claveHash, tipo_usuario, id});

            if(filasAfectadas === 0){
                return res.status(404).json({message: "Usuario no encontrado en la base de datos"});
            }

            return res.status(204).send();

        } catch (err) {
            console.error("Error al editar el usuario: ",err);
            return res.status(500).json({message: "Error interno del servidor"});
        }
    },
    deleteOneUser: async (req, res) => {
        const id = parseInt(req.params.id);

        if (req.user.rol !== 1) {
            return res.status(403).json({ message: "No tiene permisos para eliminar los usuarios." });
        }

        let usuarioEliminar = await mUsuarios.getOne(id);

        if(!usuarioEliminar){
             return res.status(404).json({message: "Usuario no encontrado no se pudo eliminar"});
        }

        let rolUserEliminar = usuarioEliminar.tipo_usuario_id;

        if(rolUserEliminar === 1){
            let contadorUsersAdmin = await mUsuarios.countUserAdmins();
            if(contadorUsersAdmin<2){
                return res.status(403).json({message: "No se puede eliminar el último usuario Admin."});
            }
        }

        try {
            const filasAfectadas = await mUsuarios.deleteUser(id);

            if(filasAfectadas === 0) {
                return res.status(404).json({message: "Usuario no encontrado no se pudo eliminar"});
            }


            return res.status(204).send();
        } catch (err) {
            console.error("Error no se pudo eliminar el usuario: ",err);
            return res.status(500).json({message: "Error interno del servidor"});
        }
        }
    };


export default cUsuarios;