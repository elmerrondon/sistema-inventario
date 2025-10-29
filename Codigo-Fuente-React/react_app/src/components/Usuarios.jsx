import { useUsuarios } from "../hooks/useUsuarios.jsx";
import ErrorModal from "./ErrorModal.jsx";
import Loader from "./Loader.jsx";
import SuccessModal from "./SuccessModal.jsx";
import Usuario from "./Usuario.jsx";
import MessageError from "./MessageError.jsx";

const Usuarios = ({ searchUsuario }) => {
    
    const {usuarios, error, loading, eliminado, errorDelete, handleDeleteUsuario, handleCloseModal} = useUsuarios();

    const filtroUsuarios = usuarios.filter(el => el.usuario_nombre.toLowerCase().includes(searchUsuario.toLowerCase()));

    return(
        <section className="products-grid">
            {loading && <Loader></Loader>}
            {error && <p>Hubo un error</p>}
            {usuarios && filtroUsuarios.map(el => <Usuario key={el.usuario_id} data={el} handleDeleteUsuario={handleDeleteUsuario}></Usuario>)}
            {(!loading && !error && filtroUsuarios.length === 0) && <MessageError msg={`No se encontraron usuarios que coincidan con ${searchUsuario}`}></MessageError>}
            {eliminado && <SuccessModal isOpen={eliminado} onClose={handleCloseModal} msg={"El usuario ha sido eliminado exitosamente."} />}
            {errorDelete && !eliminado && <ErrorModal isOpen={errorDelete} onClose={handleCloseModal} msg={"Error no es posible eliminar el usuario."} />}
        </section>
    );
};


export default Usuarios;