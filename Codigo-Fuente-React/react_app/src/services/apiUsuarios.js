
export const getAllUsuarios =  async (url) => {
    const token = localStorage.getItem('token');
    try {
          const response = await fetch(url, {
            headers: {
            'Authorization': `Bearer ${token}` 
           }
          });

      if(!response.ok){
        throw new Error(`Error http: ${response.status} - ${response.statusText} - ${response}`);
      } 

      const data  = await response.json();

      return data;
    } catch (err) {
      console.error("Error en la peticion", err);
      throw err;  
    }
};


 export const getOneUsuario = async (id) => {
       const token = localStorage.getItem('token');
       const response = await fetch(`/api/usuario/${id}`,{
        headers: {
            'Authorization': `Bearer ${token}` 
           }
       });

       if(!response.ok){
        throw new Error(`Error http: ${response.status} - ${response.statusText} - ${response}`);
       }

       const data = await response.json();

       return data;
  };

  export const addUsuario = async (usuario) => {
    const token = localStorage.getItem('token');
     const response = await fetch(`/api/add-usuario`,{
        method: "POST",
        headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(usuario)
      });

      if (!response.ok) {
        throw new Error(`Fallo al crear el usuario: ${response.statusText}`);
    }

      return response;
  }

  export const editUsuario = async (id,usuario) => {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/edit-usuario/${id}`,{
        method: "PUT",
        headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(usuario)
      });

      if (!response.ok) {
        throw new Error(`Fallo al actualizar: ${response.statusText}`);
    }

      return response;
  } 

  export const deleteUsuario = async (id) => {
       const token = localStorage.getItem('token');
        const response = await fetch(`/api/delete-usuario/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}` 
            }
        });

        if(!response.ok){
            throw new Error(`Error http: ${response.status} - ${response.statusText} - ${response}`);
        }
  };


 
