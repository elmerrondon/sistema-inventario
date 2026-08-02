import { Router } from "express";
import cProductos from "../controller/cProductos.js";
import {verifyToken} from "../middlewares/verifyToken.js";

const routesProductos = Router();


// *** Productos:
routesProductos.get("/api/productos", verifyToken, cProductos.getAllProducts);
routesProductos.get("/api/producto/:id", verifyToken, cProductos.getOneProduct);
routesProductos.post("/api/add-producto", verifyToken, cProductos.postAddProduct);
routesProductos.put("/api/edit-producto/:id", verifyToken, cProductos.putEditProduct);
routesProductos.delete("/api/delete-producto/:id", verifyToken, cProductos.deleteOneProduct);





export default routesProductos;