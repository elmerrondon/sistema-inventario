import { useNavigate } from "react-router";
import Productos from "../components/Productos.jsx";
import { useState } from "react";


const ProductosPage = () => {
    const [searchProducto, setSearchProducto] = useState('');

    const navigate = useNavigate();

    const handleBtnAdd = () => {
        navigate("/add-producto");
    }

    const handleSearchChange = (e) => {
        setSearchProducto(e.target.value);
    };


    return(
        <>
        <div className="productos-page-container">
            <div className="control-bar">
              <button onClick={handleBtnAdd}>Agregar Producto</button>
              <input type="search" id="search_producto" placeholder="Buscar Producto" onChange={handleSearchChange} value={searchProducto} className="search-input"/>
            </div>
          <Productos searchProducto={searchProducto}></Productos>
        </div>
        </>
    );
};


export default ProductosPage;