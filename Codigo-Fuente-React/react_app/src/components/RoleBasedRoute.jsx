
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx'; 


const RoleBasedRoute = ({ requiredRoles }) => {
    const { isLoggedIn, userRole, loading , isInitializing} = useAuth();

    if(isInitializing){
        return null;
    }
    
    if (loading) {
        return <div>Cargando autenticación...</div>;
    }

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />; 
    }

  
    if (requiredRoles && !requiredRoles.includes(userRole)) {
        console.warn(`Acceso denegado. Rol ${userRole} intentó acceder a ruta restringida.`);
        return <Navigate to="/" replace />; 
    }

    return <Outlet />;
};

export default RoleBasedRoute;