import FormProveedor from "../components/FormProveedor.jsx";
import Loader from "../components/Loader.jsx";
import MessageError from "../components/MessageError.jsx";
import MessageTrue from "../components/MessageTrue.jsx";
import { useProveedorDetails } from "../hooks/useProveedorDetails.jsx";


const AddProveedor = () => {

    const {loading, error, isTrue, handleAdd} = useProveedorDetails();

    return(
        <>
        <div className="form-page-container">
            <h2>Agregar Proveedor</h2>
         {loading && <Loader></Loader>}
         <FormProveedor handleAdd={handleAdd}></FormProveedor>
         {error && <MessageError msg={"Error no se pudo agregar el proveedor"}></MessageError>}
          {isTrue && <MessageTrue msg={"Proveedor Agregado Exitosamente"}></MessageTrue>}
        </div>
        </>
    );
};


export default AddProveedor;