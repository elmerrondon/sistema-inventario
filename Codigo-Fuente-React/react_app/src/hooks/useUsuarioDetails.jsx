import { useEffect, useState } from "react"
import {  useParams } from "react-router";
import { addUsuario, editUsuario, getOneUsuario } from "../services/apiUsuarios";


export const useUsuarioDetails = () => {
    const [usuario, setUsuario] = useState({});
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(false);
    const [isTrue, setIsTrue] = useState(false);

    const {id} = useParams();


    useEffect(() => {
       
        const peticionUsuarioGet = async () => {
            try {
                setLoading(true);
                const data = await getOneUsuario(id);
                setUsuario(data);
            } catch (err) {
                console.error(err);
                setError(true);
            }
            finally{
                setLoading(false);
            }
        };

         if(id){
            peticionUsuarioGet();
        }
        
    }, [id]);


    const handleAdd = async (usuario_add) => {
        try {
            setLoading(true);
            await addUsuario(usuario_add);
            setIsTrue(true);
            setError(false);
        } catch (err) {
            console.error(err);
            setError(true);
            setIsTrue(false);
        }
        finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (usuario_actual,usuario_edit) => {
        try {
            setLoading(true);
            const {id} =  usuario_edit;
            await editUsuario(id,usuario_edit);
            setUsuario(usuario_actual);
            setError(false);
            setIsTrue(true);
        } catch (err) {
            console.error(err);
            setError(true);
            setIsTrue(false);
        }
        finally{
            setLoading(false);
        }
    };

    

    return {usuario, error, loading, isTrue, handleSubmit, handleAdd};

};