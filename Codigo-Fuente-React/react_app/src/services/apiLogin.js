

 export const userLogin = async (usuario) => {
    const response = await fetch(`/api/usuario/login`,{
        method: "POST",
        headers: {
                "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
      });

      if (!response.ok) {
        throw new Error(`Error al iniciar sesion: ${response.statusText}`);
    }
      
      return response;
  };