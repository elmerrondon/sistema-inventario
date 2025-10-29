import FormUsuario from "../components/FormUsuario.jsx";
import Loader from "../components/Loader.jsx";
import MessageError from "../components/MessageError.jsx";
import MessageTrue from "../components/MessageTrue.jsx";
import { useUsuarioDetails } from "../hooks/useUsuarioDetails.jsx";


const EditUsuarioPage = () => {

    const {usuario, loading, error, isTrue, handleSubmit} = useUsuarioDetails();

    return(
        <>
        <div className="form-page-container">
             <h2>Editar Usuario</h2>
            {loading && <Loader></Loader>}
           {!loading  && usuario && <FormUsuario data={usuario} handleSubmit={handleSubmit}></FormUsuario>}
          {error && <MessageError msg={"Error no se pudo editar el usuario"}></MessageError>}
          {isTrue && <MessageTrue msg={"Usuario Editado Exitosamente"}></MessageTrue>}
        </div>
        </>
    );
}


export default EditUsuarioPage;