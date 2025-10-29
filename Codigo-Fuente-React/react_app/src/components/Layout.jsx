import { Outlet } from "react-router";
import Navegador from "./Navegador";


const Layout = () => {


    return(
        <>
         <header>
            <h1>Inventario de Productos</h1>
            <Navegador></Navegador>
         </header>

         <main>
            <Outlet></Outlet>
         </main>

         <footer>
                <p>&copy; 2025 Gestión de Productos</p>
            </footer>
        </>
    );
};


export default Layout;