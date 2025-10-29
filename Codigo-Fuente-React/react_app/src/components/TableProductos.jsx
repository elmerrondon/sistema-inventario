import { useProductos } from "../hooks/useProductos.jsx";
import TableRow from "./TableRow.jsx";

const TableProductos = () => {

    const {productos} = useProductos();

    return(
        <section className="productos-section">
        <h2>Inventario General de Productos</h2>
        <div className="table-responsive">
        <table className="minimal-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Proveedor</th>
            </tr>
          </thead>
          <tbody>
            {productos && productos.map(producto => <TableRow key={producto.producto_id} producto={producto}></TableRow>)}
          </tbody>
        </table>
        </div>
        
        </section>
    );
}



export default TableProductos;