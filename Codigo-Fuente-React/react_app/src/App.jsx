import {BrowserRouter, Route, Routes} from "react-router"
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ProductosPage from './pages/ProductosPage.jsx'
import ProveedoresPage from './pages/ProveedoresPage.jsx'
import UsuariosPage from './pages/UsuariosPage.jsx'
import EditProductoPage from './pages/EditProductoPage.jsx'
import AddProducto from './pages/AddProducto.jsx'
import Layout from './components/Layout.jsx'
import AddProveedor from './pages/AddProveedor.jsx'
import EditProveedorPage from './pages/EditProveedorPage.jsx'
import EditUsuarioPage from './pages/EditUsuarioPage.jsx'
import AddUsuario from './pages/AddUsuario.jsx'
import RoleBasedRoute from './components/RoleBasedRoute.jsx'
import { useAuth } from './contexts/AuthContext.jsx'
import Error404 from "./pages/Error404.jsx"

function App() {

  const ADMIN_ROLE = 1;
  const VENDOR_ROLE = 2;
  const ALL_LOGGED_IN = [ADMIN_ROLE, VENDOR_ROLE];

  const { isInitializing } = useAuth(); // Obtener el nuevo estado

    if (isInitializing) {
      return <div>Cargando sesión...</div>; 
    }


  return (
    <> 
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route element={<Layout />}> 
             <Route element={<RoleBasedRoute requiredRoles={ALL_LOGGED_IN} />}>                
                <Route index element={<HomePage />} />               
                <Route path='/productos' element={<ProductosPage />} />
                <Route path='/add-producto' element={<AddProducto />} />
                <Route path='/edit-producto/:id' element={<EditProductoPage />} />
             </Route>

             <Route element={<RoleBasedRoute requiredRoles={[ADMIN_ROLE]} />}>
                <Route path='/proveedores' element={<ProveedoresPage />} />
                <Route path='/add-proveedor' element={<AddProveedor />} />
                <Route path='/edit-proveedor/:id' element={<EditProveedorPage />} />
                <Route path='/usuarios' element={<UsuariosPage />} />
                <Route path='/add-usuario' element={<AddUsuario />} />
                <Route path='/edit-usuario/:id' element={<EditUsuarioPage />} />
             </Route>
            
             <Route path='*' element={<Error404></Error404>} /> 
             
          </Route>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
