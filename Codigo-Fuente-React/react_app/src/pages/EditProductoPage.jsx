import FormProducto from "../components/FormProducto.jsx";
import Loader from "../components/Loader.jsx";
import MessageError from "../components/MessageError.jsx";
import MessageTrue from "../components/MessageTrue.jsx";
import { useProductDetails } from "../hooks/useProductDetails.jsx";


const EditProductoPage = () => {

    const {producto, loading, error, isTrue, handleSubmit} = useProductDetails();

    return(
        <>
        <div className="form-page-container">
             <h2>Editar Producto</h2>
            {loading && <Loader></Loader>}
           {!loading  && producto && <FormProducto data={producto} handleSubmit={handleSubmit}></FormProducto>}
          {error && <MessageError msg={"Error no se pudo editar el producto"}></MessageError>}
          {isTrue && <MessageTrue msg={"Producto Editado Exitosamente"}></MessageTrue>}
        </div>
        </>
    );
}


export default EditProductoPage;