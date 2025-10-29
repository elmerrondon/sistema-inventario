import { useProductos } from "../hooks/useProductos.jsx";
import Producto from "./Producto.jsx";
import Loader from "./Loader.jsx";
import SuccessModal from "./SuccessModal.jsx";
import MessageError from "./MessageError.jsx";

const Productos = ({ searchProducto }) => {
    
    const {productos, error, loading, eliminado, handleDeleteProduct, handleCloseModal} = useProductos();

    const filtroProductos = productos.filter(el => el.producto_nombre.toLowerCase().includes(searchProducto.toLowerCase()));

    return(
        <section className="products-grid">
            {loading && <Loader></Loader>}
            {error && <p>Hubo un error</p>}
            {productos && filtroProductos.map(el => <Producto key={el.producto_id} data={el} handleDeleteProduct={handleDeleteProduct}></Producto>)}
            {(!loading && !error && filtroProductos.length === 0) && <MessageError msg={`No se encontraron productos que coincidan con ${searchProducto}`}></MessageError>}
            <SuccessModal isOpen={eliminado} onClose={handleCloseModal} msg={"El producto ha sido eliminado exitosamente."}/>
        </section>
    );
};


export default Productos;