import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx'; 
import { useNavigate } from 'react-router-dom'; 

const LoginPage = () => {
    const { isLoggedIn, authError, loading, login } = useAuth(); 
    const navigate = useNavigate();

    const defaultData = { usuario_email: "", usuario_password: "" };
    const [formData, setFormData] = useState(defaultData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleForm = async (e) => {
        e.preventDefault();
        
        const credenciales = {
            email: formData.usuario_email,
            password: formData.usuario_password
        };

        await login(credenciales);

    }

    useEffect(() => {
        if (isLoggedIn) {
        navigate('/');
    }
    },[isLoggedIn, navigate]);

    if (isLoggedIn) {
        return null; 
    }
    

    return (
        <div className="form-page-container">
            <h2>Iniciar Sesión</h2>

            {authError && <p className="error-container" style={{ color: 'red' }}>{authError}</p>}

            <form onSubmit={handleForm}>
                
                
                <label htmlFor="email">Email: </label>
                <input 
                    type="email" 
                    id="email" 
                    name="usuario_email" 
                    onChange={handleChange} 
                    value={formData.usuario_email}
                    required
                />
                
                <label htmlFor="password">Password: </label>
                <input 
                    type="password" 
                    id="password" 
                    name="usuario_password" 
                    onChange={handleChange} 
                    value={formData.usuario_password}
                    required
                />
                
                <button type="submit" disabled={loading}>
                    {loading ? 'Cargando...' : 'Entrar'}
                </button>
            </form>
        </div>
    );
};

export default LoginPage;