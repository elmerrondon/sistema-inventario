import { useNavigate } from "react-router";
import defaultUserImg from "../assets/user_default.png";


const Usuario = ({data, handleDeleteUsuario}) => {
    const navigate = useNavigate();

    const {usuario_id, usuario_nombre, usuario_apellido, usuario_telefono, usuario_email, tipo_usuario_id} = data;

    const handleEdit =  (id) => {
       navigate(`/edit-usuario/${id}`);
    }

    const handleBtnDelete = () => {
      if (window.confirm(`¿Estás seguro de que deseas eliminar ${usuario_nombre}? Esta acción es irreversible.`)) {
        handleDeleteUsuario(usuario_id); 
    }      
    }

    return(
       <article>
        <h3>{usuario_nombre}</h3>
        <img src={defaultUserImg} alt={usuario_nombre} />
        <p>Nombre: {usuario_nombre} {usuario_apellido}</p>
        <p>Telefono: {usuario_telefono}</p>
        <p>Email: {usuario_email}</p>
        <p>Tipo de Usuario: {tipo_usuario_id === 1 ? "Admin" : "Vendedor"}</p>
        <div className="product-actions">
          <button onClick={()  => handleEdit(usuario_id)}>Editar</button>
          <button onClick={handleBtnDelete}>Eliminar</button>
        </div>
       </article>
    );
};


export default Usuario;