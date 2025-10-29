import { useEffect, useState } from "react"
import { addProduct, editProduct, getOneProduct } from "../services/apiProducts.js";
import {  useParams } from "react-router";


export const useProductDetails = () => {
    const [producto, setProducto] = useState({});
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(false);
    const [isTrue, setIsTrue] = useState(false);

    const {id} = useParams();


    useEffect(() => {
       
        const peticionProductoDet = async () => {
            try {
                setLoading(true);
                const data = await getOneProduct(id);
                setProducto(data);
            } catch (err) {
                console.error(err);
                setError(true);
            }
            finally{
                setLoading(false);
            }
        };

         if(id){
            peticionProductoDet();
        }
        
    }, [id]);


    const handleAdd = async (producto_add) => {
        try {
            setLoading(true);
            await addProduct(producto_add);
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

    const handleSubmit = async (producto_actual,producto_edit) => {
        try {
            setLoading(true);
            const {id} = producto_edit;
            await editProduct(id,producto_edit);
            setProducto(producto_actual);
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

    return {producto, error, loading, isTrue, handleSubmit, handleAdd};

};