


export const getAllProveedores =  async (url) => {
    const token = localStorage.getItem('token');
    try {
          const response = await fetch(url,{
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


 export const getOneProveedor = async (id) => {
       const token = localStorage.getItem('token');
       const response = await fetch(`/api/proveedor/${id}`,{
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

  export const addProveedor = async (proveedor) => {
     const token = localStorage.getItem('token');
     const response = await fetch(`/api/add-proveedor`,{
        method: "POST",
        headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(proveedor)
      });

      if (!response.ok) {
        throw new Error(`Fallo al crear el proveedor: ${response.statusText}`);
    }

      return response;
  }

  export const editProveedor = async (id,proveedor) => {
     const token = localStorage.getItem('token');
      const response = await fetch(`/api/edit-proveedor/${id}`,{
        method: "PUT",
        headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(proveedor)
      });

      if (!response.ok) {
        throw new Error(`Fallo al actualizar: ${response.statusText}`);
    }

      return response;
  } 

  export const deleteProveedor = async (id) => {
       const token = localStorage.getItem('token');
        const response = await fetch(`/api/delete-proveedor/${id}`, {
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
