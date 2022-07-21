import React from "react";
import productService from "./services/productService";
import { Button } from "reactstrap";
import authenticationService from "./services/authenticationService";
import { Link } from "react-router-dom";

class ViewVendedor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
      products: [],
    };
    //this.productService = new productService();
  }

  componentDidMount() {
    const usuario = authenticationService.getActualUser();
    const name = usuario.name;
    this.setState({
      usuario: name,
    });
    this.viewProductsByVendedor();
  }

  viewProductsByVendedor() {
    productService.getVendedorByName().then((response) => {
      this.setState({
        products: response.productos,
      });
    });
  }

  remove(id) {
    productService.deleteProduct(id);
    let updateProducts = [...this.state.products].filter((i) => i.id != id);
    this.setState({
      products: updateProducts,
    });
    alert("Se elimino correctamente el producto")
  }


  viewProducts() {
    if (this.state.products) {
      return this.state.products.map((productos) => {
        return (
          <tr key={productos.id}>
            <td>{productos.descripcion}</td>
            <td>{productos.productName}</td>
            <td>{productos.precio}</td>

            <td>
              <Button onClick={() => this.remove(productos.id)}>
                Eliminar
              </Button>
            </td>
            <td>
              <Button>Editar</Button>
            </td>
            <td>
              <button>
                <Link
                  to={{
                    pathname: `/subasta/${productos.productName}/${productos.precio}`,
                  }}
                >
                  Subastar
                </Link>
              </button>
            </td>
          </tr>
        );
      });
    }
  }

  render() {
    return (
      <div>
        <div>
          <h3>{this.state.usuario}</h3>
        </div>
        <Button tag={Link} to="/agregar">
          Crear Producto
        </Button>
        <div>
          <table>
            <thead>
              <tr>
                <th>Descripcion</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Eliminar</th>
                <th>Editar</th>
                <th>Subastar</th>
              </tr>
            </thead>
            <tbody>{this.viewProducts()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ViewVendedor