import { useEffect, useState } from "react";


const FormProveedor = ({data, handleSubmit, handleAdd}) => {
    const defaultData = {proveedor_id: "" , proveedor_nombre: "", proveedor_telefono: "", proveedor_email: ""};
    const [formData, setFormData] = useState(defaultData);

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
        const newProveedor = {
            id: formData.proveedor_id ? formData.proveedor_id : 0,
            nombre: formData.proveedor_nombre,
            telefono: formData.proveedor_telefono,
            email: formData.proveedor_email
        };

        if(formData.proveedor_id!==""){
            handleSubmit(formData,newProveedor);
        }
        else{
            handleAdd(newProveedor);
        }
    }

    return(
        <form onSubmit={handleForm}>
            <label htmlFor="nombre">Nombre: </label>
            <input type="text" id="nombre" name="proveedor_nombre" onChange={handleChange} value={formData.proveedor_nombre}/>
            <label htmlFor="telefono">telefono: </label>
            <input type="number" id="telefono" name="proveedor_telefono" onChange={handleChange} value={formData.proveedor_telefono}/>
            <label htmlFor="email">email: </label>
            <input type="email" id="email" name="proveedor_email" onChange={handleChange} value={formData.proveedor_email}/>
            <button>Enviar</button>
        </form>
    );
};


export default FormProveedor;