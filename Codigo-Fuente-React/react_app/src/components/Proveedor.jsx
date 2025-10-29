import { useNavigate } from "react-router";
import defaultProvImg from "../assets/prov_default.png";


const Proveedor = ({data, handleDeleteProveedor}) => {
    const navigate = useNavigate();

    const {proveedor_id, proveedor_nombre, proveedor_telefono, proveedor_email } = data;

    const handleEdit =  (id) => {
       navigate(`/edit-proveedor/${id}`);
    }

    const handleBtnDelete = () => {
      if (window.confirm(`¿Estás seguro de que deseas eliminar ${proveedor_nombre}? Esta acción es irreversible.`)) {
        handleDeleteProveedor(proveedor_id); 
    }      
    }

    return(
       <article>
        <h3>{proveedor_nombre}</h3>
        <img src={defaultProvImg} alt={proveedor_nombre} />
        <p>Nombre: {proveedor_nombre}</p>
        <p>Telefono: {proveedor_telefono}</p>
        <p>Email: {proveedor_email}</p>
        <div className="product-actions">
          <button onClick={()  => handleEdit(proveedor_id)}>Editar</button>
          <button onClick={handleBtnDelete}>Eliminar</button>
        </div>
       </article>
    );
};


export default Proveedor;