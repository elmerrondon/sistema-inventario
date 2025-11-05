import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import routesProductos from "./routes/routeProductos.js";
import routeProveedores from "./routes/routeProveedores.js";
import routeUsuarios from "./routes/routeUsuarios.js";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(express.static(path.join(__dirname, 'view_react')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'view_react', 'index.html'));
});

app.use(routeUsuarios);
app.use(routesProductos);
app.use(routeProveedores);



app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'view_react', 'index.html'));
});


app.listen(PORT, () => {
    console.log(`Aplicacion ejecutandose en http://localhost:${PORT}`);
});