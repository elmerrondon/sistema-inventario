import Proveedor from "./Proveedor.jsx";
import Loader from "./Loader.jsx";
import SuccessModal from "./SuccessModal.jsx";
import { useProveedores } from "../hooks/useProveedores.jsx";
import MessageError from "./MessageError.jsx";

const Proveedores = ({ searchProveedor }) => {
    
    const {proveedores, error, loading, eliminado, handleDeleteProveedor, handleCloseModal} = useProveedores();

    const filtroProveedor = proveedores.filter(el => el.proveedor_nombre.toLowerCase().includes(searchProveedor.toLowerCase()));

    return(
        <section className="products-grid">
            {loading && <Loader></Loader>}
            {error && <p>Hubo un error</p>}
            {proveedores && filtroProveedor.map(el => <Proveedor key={el.proveedor_id} data={el} handleDeleteProveedor={handleDeleteProveedor}></Proveedor>)}
            {(!loading && !error && filtroProveedor.length === 0) && <MessageError msg={`No se encontraron proveedores que coincidan con ${searchProveedor}`}></MessageError>}
            <SuccessModal isOpen={eliminado} onClose={handleCloseModal} msg={"El proveedor ha sido eliminado exitosamente."} />
        </section>
    );
};


export default Proveedores;