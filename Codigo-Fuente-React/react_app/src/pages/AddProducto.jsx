import FormProducto from "../components/FormProducto.jsx";
import Loader from "../components/Loader.jsx";
import MessageError from "../components/MessageError.jsx";
import MessageTrue from "../components/MessageTrue.jsx";
import { useProductDetails } from "../hooks/useProductDetails.jsx";


const AddProducto = () => {

    const {loading, error, isTrue, handleAdd} = useProductDetails();

    return(
        <>
        <div className="form-page-container">
            <h2>Agregar Producto</h2>
         {loading && <Loader></Loader>}
         <FormProducto handleAdd={handleAdd}></FormProducto>
         {error && <MessageError msg={"Error no se pudo agregar el producto"}></MessageError>}
          {isTrue && <MessageTrue msg={"Producto Agregado Exitosamente"}></MessageTrue>}
        </div>
        </>
    );
};


export default AddProducto;