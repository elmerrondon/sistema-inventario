import FormProveedor from "../components/FormProveedor.jsx";
import Loader from "../components/Loader.jsx";
import MessageError from "../components/MessageError.jsx";
import MessageTrue from "../components/MessageTrue.jsx";
import { useProveedorDetails } from "../hooks/useProveedorDetails.jsx";


const EditProveedorPage = () => {

    const {proveedor, loading, error, isTrue, handleSubmit} = useProveedorDetails();

    return(
        <>
        <div className="form-page-container">
             <h2>Editar Proveedor</h2>
            {loading && <Loader></Loader>}
           {!loading  && proveedor && <FormProveedor data={proveedor} handleSubmit={handleSubmit}></FormProveedor>}
          {error && <MessageError msg={"Error no se pudo editar el pproveedor"}></MessageError>}
          {isTrue && <MessageTrue msg={"Proveedor Editado Exitosamente"}></MessageTrue>}
        </div>
        </>
    );
}


export default EditProveedorPage;