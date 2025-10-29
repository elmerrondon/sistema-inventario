import { useEffect, useState } from "react";
import { useProveedores } from "../hooks/useProveedores.jsx";


const FormProducto = ({data, handleSubmit, handleAdd}) => {
    const defaultData = {producto_id: "" , producto_nombre: "", producto_precio: "", producto_stock: "", proveedor_id: ""};
    const [formData, setFormData] = useState(defaultData);

     const {proveedores} = useProveedores();

    useEffect(() => {
        if(data){
            setFormData(data);
        }
    }, [data]);

    const handleChange = (e) => {
        const {name,  value} = e.target;

        setFormData({...formData, [name]: value});
    }

    const handleForm = (e) => {
        e.preventDefault();
        const newProducto = {
            id: formData.producto_id ? formData.producto_id : 0,
            nombre: formData.producto_nombre,
            precio: formData.producto_precio,
            stock: formData.producto_stock,
            proveedor: formData.proveedor_id
        };

        if(formData.producto_id!==""){
            handleSubmit(formData,newProducto);
        }
        else{
            handleAdd(newProducto);
        }
    }

    return(
        <form onSubmit={handleForm}>
            <label htmlFor="nombre">Nombre: </label>
            <input type="text" id="nombre" name="producto_nombre" onChange={handleChange} value={formData.producto_nombre}/>
            <label htmlFor="precio">Precio: </label>
            <input type="number" id="precio" name="producto_precio" onChange={handleChange} value={formData.producto_precio}/>
            <label htmlFor="stock">Stock: </label>
            <input type="number" id="stock" name="producto_stock" onChange={handleChange} value={formData.producto_stock}/>
            <label htmlFor="proveedor">Proveedor: </label>
            <select name="proveedor_id" id="proveedor" onChange={handleChange} value={formData.proveedor_id}>
                <option value="" selected>...</option>
             {proveedores && proveedores.map(el => <option key={el.proveedor_id} value={el.proveedor_id}>{el.proveedor_nombre}</option>)}
            </select>
            <button>Enviar</button>
        </form>
    );
};


export default FormProducto;