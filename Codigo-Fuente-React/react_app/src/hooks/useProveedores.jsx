import { useEffect, useState } from "react"
import { deleteProveedor, getAllProveedores } from "../services/apiProveedores.js";



export const useProveedores = () => {
    const [proveedores, setProveedores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [eliminado, setEliminado] = useState(false);

    useEffect(() => {

        const peticionProveedores = async () =>{
            try {
                const data = await getAllProveedores("/api/proveedores");
                setProveedores(data);
            } catch (err) {
                console.error(err);
                setProveedores(null);
                setError(true);
            }
            finally {
                setLoading(false);
            }
        };

        peticionProveedores();
    }, []);


    const handleDeleteProveedor = async (proveedorID) => {
        try {
              await deleteProveedor(proveedorID);
              setEliminado(true);
              setProveedores(el => el.filter(proveedor => proveedor.proveedor_id !== proveedorID));
        } catch (err) {
            console.error("No se pudo eliminar el proveedor: ", err);
        }
    };


    const handleCloseModal = () => {
        setEliminado(false);
    };


    return {proveedores, error, loading, eliminado, handleDeleteProveedor, handleCloseModal};
};
