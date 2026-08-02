import { Router } from "express";
import cProveedores from "../controller/cProveedores.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const routeProveedores = Router();


routeProveedores.get("/api/proveedores", verifyToken, cProveedores.getAllProveedores);
routeProveedores.get("/api/proveedor/:id", verifyToken, cProveedores.getOneProveedor);
routeProveedores.post("/api/add-proveedor", verifyToken, cProveedores.postAddProveedor);
routeProveedores.put("/api/edit-proveedor/:id", verifyToken, cProveedores.putEditProveedor);
routeProveedores.delete("/api/delete-proveedor/:id", verifyToken, cProveedores.deleteOneProveedor);



export default routeProveedores;