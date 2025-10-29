import { useEffect, useState } from "react";


const FormUsuario = ({data, handleSubmit, handleAdd}) => {
    const defaultData = {usuario_id: "" , usuario_nombre: "", usuario_apellido: "" ,usuario_telefono: "", usuario_email: "", usuario_password : "",tipo_usuario_id: ""};
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
        const newUsuario = {
            id: formData.usuario_id ? formData.usuario_id : 0,
            nombre: formData.usuario_nombre,
            apellido: formData.usuario_apellido,
            telefono: formData.usuario_telefono,
            email: formData.usuario_email,
            password: formData.usuario_password,
            tipo_usuario: formData.tipo_usuario_id
        };

        if(formData.usuario_id!==""){
            handleSubmit(formData,newUsuario);
        }
        else{
            handleAdd(newUsuario);
        }
    }

    return(
        <form onSubmit={handleForm}>
            <label htmlFor="nombre">Nombre: </label>
            <input type="text" id="nombre" name="usuario_nombre" onChange={handleChange} value={formData.usuario_nombre}/>
            <label htmlFor="apellido">Apellido: </label>
            <input type="text" id="apellido" name="usuario_apellido" onChange={handleChange} value={formData.usuario_apellido}/>
            <label htmlFor="telefono">Telefono: </label>
            <input type="number" id="telefono" name="usuario_telefono" onChange={handleChange} value={formData.usuario_telefono}/>
            <label htmlFor="email">Email: </label>
            <input type="email" id="email" name="usuario_email" onChange={handleChange} value={formData.usuario_email}/>
            <label htmlFor="password">Password: </label>
            <input type="password" id="password" name="usuario_password" onChange={handleChange} value={formData.usuario_password}/>
             <label htmlFor="tipo_usuario">Tipo Usuario: </label>
             <select name="tipo_usuario_id" id="tipo_usuario" onChange={handleChange} value={formData.tipo_usuario_id}>
               <option value="" selected>...</option>
               <option value={1}>Admin</option>
               <option value={2}>Empleado</option>
            </select>
            <button>Enviar</button>
        </form>
    );
};


export default FormUsuario;