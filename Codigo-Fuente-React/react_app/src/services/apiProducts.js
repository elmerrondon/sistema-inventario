



export const getAllproducts =  async (url) => {
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


 export const getOneProduct = async (id) => {
      const token = localStorage.getItem('token');
       const response = await fetch(`/api/producto/${id}`,{
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

  export const addProduct = async (product) => {
    const token = localStorage.getItem('token');
     const response = await fetch(`/api/add-producto`,{
        method: "POST",
        headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(product)
      });

      if (!response.ok) {
        throw new Error(`Fallo al crear el producto: ${response.statusText}`);
    }

      return response;
  }

  export const editProduct = async (id,product) => {
     const token = localStorage.getItem('token');
      const response = await fetch(`/api/edit-producto/${id}`,{
        method: "PUT",
        headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(product)
      });

      if (!response.ok) {
        throw new Error(`Fallo al actualizar: ${response.statusText}`);
    }

      return response;
  } 

  export const deleteProduct = async (id) => {
       const token = localStorage.getItem('token');
        const response = await fetch(`/api/delete-producto/${id}`, {
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
