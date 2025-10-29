import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useNavigate } from 'react-router-dom'; 

const Error404 = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    
    const message = isLoggedIn 
        ? "¡Lo sentimos! Parece que la página que buscas no existe o fue movida."
        : "No tienes permiso para ver esta página. Serás redirigido para iniciar sesión...";

    useEffect(() => {
        if (!isLoggedIn) {
            const timer = setTimeout(() => {
                navigate('/login', { replace: true });
            }, 2000); 

            return () => clearTimeout(timer);
        }
    }, [isLoggedIn, navigate]); 

    return(
        <section className="error-404-container">
            <h1 className="error-code">404</h1>
            <h2 className="error-title">Página No Encontrada</h2>
            
            <p className="error-message">{message}</p>
            
            {isLoggedIn && (
                <button 
                    className="btn-primary" 
                    onClick={() => navigate('/', { replace: true })}
                >
                    Volver a la Página Principal
                </button>
            )}

            {!isLoggedIn && (
                <p className="redirect-info">Redirigiendo a Iniciar Sesión en 2 segundos...</p>
            )}
        </section>
    );
}

export default Error404;