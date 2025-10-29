import { useEffect, useState } from "react"
import {  useParams } from "react-router";
import { addProveedor, editProveedor, getOneProveedor } from "../services/apiProveedores";


export const useProveedorDetails = () => {
    const [proveedor, setProveedor] = useState({});
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(false);
    const [isTrue, setIsTrue] = useState(false);

    const {id} = useParams();


    useEffect(() => {
       
        const peticionProveedorGet = async () => {
            try {
                setLoading(true);
                const data = await getOneProveedor(id);
                setProveedor(data);
            } catch (err) {
                console.error(err);
                setError(true);
            }
            finally{
                setLoading(false);
            }
        };

         if(id){
            peticionProveedorGet();
        }
        
    }, [id]);


    const handleAdd = async (proveedor_add) => {
        try {
            setLoading(true);
            await addProveedor(proveedor_add);
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

    const handleSubmit = async (proveedor_actual,proveedor_edit) => {
        try {
            setLoading(true);
            const {id} = proveedor_edit;
            await editProveedor(id,proveedor_edit);
            setProveedor(proveedor_actual);
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

    return {proveedor, error, loading, isTrue, handleSubmit, handleAdd};

};