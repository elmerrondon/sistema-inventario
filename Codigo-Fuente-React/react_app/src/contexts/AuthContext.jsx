import React, { createContext, useContext, useEffect, useState } from 'react';

import { userLogin } from '../services/apiLogin.js'; 

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authError, setAuthError] = useState(null); 
  const [loading, setLoading] = useState(false);   
  const [userRole, setUserRole] = useState(null);
  const [userID, setUserID] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedRol = localStorage.getItem('rol');

    if(storedToken && storedRol){
      setUserRole(parseInt(storedRol));
      setIsLoggedIn(true);
    }

    setIsInitializing(false);
  },[])


  const login = async (usuario) => {
    setAuthError(null); 
    
    try {
        setLoading(true);
        
        const response = await userLogin(usuario);
        
        if (response.ok) { 
            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('rol', data.tipo_usuario);
            setUserRole(parseInt(data.tipo_usuario));
            setUserID(data.idUsuario);
            setIsLoggedIn(true);
            return true;
        }
        
        return false;

    } catch (err) {
        console.error("Fallo de autenticación:", err.message);
        setAuthError(err.message || "Credenciales inválidas o error desconocido."); 
        setIsLoggedIn(false);
        return false;

    } finally {
        setLoading(false);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setAuthError(null);
    setLoading(false);
    setUserRole(null);
    setUserID(null);

    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    
  };

  const value = {
    isInitializing,
    isLoggedIn, 
    authError, 
    loading,
    userRole,
    userID, 
    login,     
    logout,    
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};