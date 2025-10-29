import { useEffect, useState } from "react"
import { deleteProduct, getAllproducts } from "../services/apiProducts";



export const useProductos = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [eliminado, setEliminado] = useState(false);

    useEffect(() => {

        const peticionProductos = async () =>{
            try {
                const data = await getAllproducts("/api/productos");
                setProductos(data);
            } catch (err) {
                console.error(err);
                setProductos(null);
                setError(true);
            }
            finally {
                setLoading(false);
            }
        };

        peticionProductos();
    }, []);


    const handleDeleteProduct = async (productid) => {
        try {
              await deleteProduct(productid);
              setEliminado(true);
              setProductos(el => el.filter(producto => producto.producto_id !== productid));
        } catch (err) {
            console.error("No se pudo eliminar el producto: ", err);
        }
    };


    const handleCloseModal = () => {
        setEliminado(false);
    };


    return {productos, error, loading, eliminado,handleDeleteProduct, handleCloseModal};
};
