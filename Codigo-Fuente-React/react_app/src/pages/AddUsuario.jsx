import FormUsuario from "../components/FormUsuario.jsx";
import Loader from "../components/Loader.jsx";
import MessageError from "../components/MessageError.jsx";
import MessageTrue from "../components/MessageTrue.jsx";
import { useUsuarioDetails } from "../hooks/useUsuarioDetails.jsx";


const AddUsuario = () => {

    const {loading, error, isTrue, handleAdd} = useUsuarioDetails();

    return(
        <>
        <div className="form-page-container">
            <h2>Agregar Usuario</h2>
         {loading && <Loader></Loader>}
         <FormUsuario handleAdd={handleAdd}></FormUsuario>
         {error && <MessageError msg={"Error no se pudo agregar el usuario"}></MessageError>}
          {isTrue && <MessageTrue msg={"Usuario Agregado Exitosamente"}></MessageTrue>}
        </div>
        </>
    );
};


export default AddUsuario;