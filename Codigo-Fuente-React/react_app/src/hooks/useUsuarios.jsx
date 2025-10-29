import { useEffect, useState } from "react"
import { deleteUsuario, getAllUsuarios } from "../services/apiUsuarios.js";
import { useAuth } from "../contexts/AuthContext.jsx";



export const useUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [eliminado, setEliminado] = useState(false);
    const [errorDelete, setErrorDelete] = useState(false);

    const {userID, logout} = useAuth();

    useEffect(() => {

        const peticionUsuarios = async () =>{
            try {
                const data = await getAllUsuarios("/api/usuarios");
                setUsuarios(data);
            } catch (err) {
                console.error(err);
                setUsuarios(null);
                setError(true);
            }
            finally {
                setLoading(false);
            }
        };

        peticionUsuarios();
    }, []);


    const handleDeleteUsuario = async (usuarioID) => {
        try {
              await deleteUsuario(usuarioID);
              setEliminado(true);
              setUsuarios(el => el.filter(usuario => usuario.usuario_id !== usuarioID));
              if(userID === usuarioID){
                setTimeout(() => {
                    logout();
                }, 1000);
              }
        } catch (err) {
            console.error("No se pudo eliminar el usuario: ", err);
            setEliminado(false);
            setErrorDelete(true);
        }
    };


    const handleCloseModal = () => {
        setEliminado(false);
        setErrorDelete(false);
    };


    return {usuarios, error, loading, eliminado, errorDelete, handleDeleteUsuario, handleCloseModal};
};
