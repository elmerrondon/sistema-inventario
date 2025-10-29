import { useEffect, useState } from "react";
import { useProveedores } from "../hooks/useProveedores.jsx";


const TableRow = ({producto}) => {
    const {proveedores} = useProveedores();
    const {producto_nombre, producto_precio, producto_stock, proveedor_id} = producto;
    const [provedor, setProveedor] = useState("");

    useEffect(() => {
        if(proveedores && proveedores.length>0 && proveedor_id){
            let proveedorFind = proveedores.find(el => el.proveedor_id === proveedor_id);
            setProveedor(proveedorFind.proveedor_nombre);
        }
        else {
                setProveedor(`ID no válida (${proveedor_id})`);
            }
    },[proveedores,proveedor_id])

    return(
        <tr>
            <td>{producto_nombre}</td>
            <td>{producto_precio}</td>
            <td>{producto_stock}</td>
            <td>{provedor ? provedor : proveedor_id}</td>
        </tr>
    );
};


export default TableRow;