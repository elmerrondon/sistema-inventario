import { useNavigate } from "react-router";
import defaultProductImg from "../assets/default_product.jpg";
import { useProveedores } from "../hooks/useProveedores";
import { useEffect, useState } from "react";


const Producto = ({data, handleDeleteProduct}) => {
      const {producto_id, producto_nombre, producto_precio, producto_stock, proveedor_id} = data;
      const {proveedores} = useProveedores();
      const [prov, setProv] = useState(null);

    useEffect(() => {
        if (proveedores && proveedores.length > 0 && proveedor_id) {
            
            const proveedorEncontrado = proveedores.find(el => el.proveedor_id === proveedor_id);

            if (proveedorEncontrado) {
                setProv(proveedorEncontrado.proveedor_nombre);
            } else {
                setProv(`ID no válida (${proveedor_id})`);
            }
        }
        
    }, [proveedor_id, proveedores]); 


    const navigate = useNavigate();


    const handleEdit =  (id) => {
       navigate(`/edit-producto/${id}`);
    }


    const handleBtnDelete = () => {
      if (window.confirm(`¿Estás seguro de que deseas eliminar ${producto_nombre}? Esta acción es irreversible.`)) {
        handleDeleteProduct(producto_id); 
    }      
    }

    return(
       <article>
        <h3>{producto_nombre}</h3>
        <img src={defaultProductImg} alt={producto_nombre} />
        <p>Nombre: {producto_nombre}</p>
        <p>Precio: {producto_precio}$</p>
        <p>Stock: {producto_stock}</p>
        <p>Proveedor: {prov ? prov : `Cargando... (${proveedor_id})`}</p>
        <div className="product-actions">
          <button onClick={()  => handleEdit(producto_id)}>Editar</button>
          <button onClick={handleBtnDelete}>Eliminar</button>
        </div>
       </article>
    );
};


export default Producto;