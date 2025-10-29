import { useNavigate } from "react-router";
import Proveedores from "../components/Proveedores.jsx";
import { useState } from "react";


const ProductosPage = () => {
    const [searchProveedor, setSearchProveedor] = useState('');

    const navigate = useNavigate();

    const handleBtnAdd = () => {
        navigate("/add-proveedor");
    }

    const handleSearchChange = (e) => {
        setSearchProveedor(e.target.value);
    };


    return(
        <>
        <div className="productos-page-container">
            <div className="control-bar">
              <button onClick={handleBtnAdd}>Agregar Proveedor</button>
              <input type="search" placeholder="Buscar Proveedor" onChange={handleSearchChange} value={searchProveedor} className="search-input"/>
            </div>
          <Proveedores searchProveedor={searchProveedor}></Proveedores>
        </div>
        </>
    );
};


export default ProductosPage;