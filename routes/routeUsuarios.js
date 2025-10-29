import { Router } from "express";
import cUsuarios from "../controller/cUsuarios.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const routeUsuarios = Router();

/// *** Login: 
routeUsuarios.post("/api/usuario/login", cUsuarios.loginUsuario);

// *** Usuarios:
routeUsuarios.get("/api/usuarios", verifyToken, cUsuarios.getAllUsers);
routeUsuarios.get("/api/usuario/:id", verifyToken, cUsuarios.getOneUser);
routeUsuarios.post("/api/add-usuario", verifyToken, cUsuarios.postAddUser);
routeUsuarios.put("/api/edit-usuario/:id", verifyToken, cUsuarios.putEditUser);
routeUsuarios.delete("/api/delete-usuario/:id", verifyToken, cUsuarios.deleteOneUser);




export default routeUsuarios;