import { useNavigate } from "react-router";
import Usuarios from "../components/Usuarios.jsx";
import { useState } from "react";


const ProductosPage = () => {

    const [searchUsuario, setSearchUsuario] = useState('');

    const navigate = useNavigate();

    const handleBtnAdd = () => {
        navigate("/add-usuario");
    }

    const handleSearchChange = (e) => {
        setSearchUsuario(e.target.value);
    } 


    return(
        <>
        <div className="productos-page-container">
          <div className="control-bar">
              <button onClick={handleBtnAdd}>Agregar Usuario</button>
              <input type="search" placeholder="Buscar Usuario" onChange={handleSearchChange} value={searchUsuario} className="search-input"/>
            </div>
          <Usuarios searchUsuario={searchUsuario}></Usuarios>
        </div>
        </>
    );
};


export default ProductosPage;