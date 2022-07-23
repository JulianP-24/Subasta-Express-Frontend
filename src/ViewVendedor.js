import React from "react";
import productService from "./services/productService";
import { Button } from "reactstrap";
import authenticationService from "./services/authenticationService";
import { Link } from "react-router-dom";

class ViewVendedor extends React.Component {
  /**
   * The constructor function is a special function that is called when a new instance of the class is
   * created.
   * @param props - The props that are passed to the component.
   */
  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
      products: [],
    };
  }

  /**
   * ComponentDidMount() is a function that is called when the component is mounted.
   */
  componentDidMount() {
    const usuario = authenticationService.getActualUser();
    const name = usuario.name;
    this.setState({
      usuario: name,
    });
    this.viewProductsByVendedor();
  }

  /**
   * "I'm calling a function that returns a promise, and when that promise resolves, I'm setting the
   * state of my component to the response of that promise."
   * </code>
   */
  viewProductsByVendedor() {
    productService.getVendedorByName().then((response) => {
      this.setState({
        products: response.productos,
      });
    });
  }

  /**
   * It removes a product from the state and from the database
   * @param id - The id of the product to be deleted
   */
  remove(id) {
    productService.deleteProduct(id);
    let updateProducts = [...this.state.products].filter((i) => i.id != id);
    this.setState({
      products: updateProducts,
    });
    alert("Se elimino correctamente el producto");
  }

  /**
   * It returns a table row for each product in the state
   * @returns the productos.map() function.
   */
  viewProducts() {
    if (this.state.products) {
      return this.state.products.map((productos) => {
        return (
          <tr key={productos.id}>
            <td>{productos.descripcion}</td>
            <td>{productos.productName}</td>
            <td>{productos.precio}</td>

            <td>
              <Button
                className="btn btn-danger btn-rounded"
                onClick={() => this.remove(productos.id)}
              >
                Eliminar
              </Button>
            </td>
            <td>
              <button type="button" className="btn btn-success btn-rounded">
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
        <Button
          className="btn btn-primary btn-rounded"
          tag={Link}
          to="/agregar"
        >
          Crear Producto
        </Button>
        <div>
          <table className="table table-striped table-responsive align-middle">
            <thead>
              <tr className="table-dark">
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

export default ViewVendedor;
