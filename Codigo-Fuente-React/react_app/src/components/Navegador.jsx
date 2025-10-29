import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from '../contexts/AuthContext.jsx';



const Navegador = () => {

    const { isLoggedIn, userRole, logout } = useAuth();

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return(
        <nav>
            <button className="hamburger-button" onClick={toggleMenu}>
                ☰
            </button>

            {isLoggedIn &&  userRole === 1 && ( 
            <div className={`nav-links ${isOpen ? 'is-open' : ''}`}>
                <Link to="/" onClick={toggleMenu}>Home</Link>
                <Link to="/productos" onClick={toggleMenu}>Productos</Link>
                <Link to="/proveedores" onClick={toggleMenu}>Proveedores</Link>
                <Link to="/usuarios" onClick={toggleMenu}>Usuarios</Link>
                <button onClick={logout} className="logout-button">Cerrar Sesión</button>
            </div>
             )}

             {isLoggedIn &&  userRole === 2 && ( 
            <div className={`nav-links ${isOpen ? 'is-open' : ''}`}>
                <Link to="/" onClick={toggleMenu}>Home</Link>
                <Link to="/productos" onClick={toggleMenu}>Productos</Link>
                <button onClick={logout} className="logout-button">Cerrar Sesión</button>
            </div>
             )}
        </nav>
    );
};


export default Navegador;