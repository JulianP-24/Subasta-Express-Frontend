import React from "react";
import { Link } from "react-router-dom";
import authenticationService from "./services/authenticationService";
import productService from "./services/productService";

class ListProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buscar: "",
      comprador: "",
      precio: 0,
    };
    this.productService = new productService();
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnChangePrize = this.handleOnChangePrize.bind(this);
  }

  componentDidMount() {
    const usuario = authenticationService.getActualUser();
    if (usuario) {
      this.setState({
        comprador: usuario.roles.includes("Comprador"),
      });
    }
    this.viewProducts();
  }

  viewProducts() {
    this.productService.getAllProductos().then((response) => {
      this.setState({
        productos: response,
      });
    });
  }

  listProducts() {
    console.log(this.state.productos);
    if (this.state.productos) {
      return this.state.productos.map((products) => {
        return (
          <tr key={products.id}>
            <td>{products.descripcion}</td>
            <td>{products.productName}</td>
            <td>{products.precio}</td>
            <td>{products.vendedor.name}</td>
            {this.state.comprador && (
              <td>
                <Link>{products.precio}</Link>Entar
              </td>
            )}
          </tr>
        );
      });
    }
  }

  viewProductsByName(name) {
    if (name != null && name !== " ") {
      this.productService
        .getProductosByName(name)
        .then((response) => console.log(response));
    }
  }

  viewProductsByPrize(prize) {
    if (this.state.precio != 0) {
      this.productService
        .getProductsByPrize(prize)
        .then((response) => console.log(response));
    }
  }

  handleOnChange(evt) {
    const target = evt.target;
    const value = target.value;
    this.setState({
      buscar: value,
    });
    console.log(value);
    if (value !== " ") {
      this.viewProductsByName(this.state.buscar);
    } else {
      this.viewProducts();
    }
  }

  handleOnChangePrize(evt) {
    const target = evt.target;
    const value = target.value;
    this.setState({
      precio: value,
    });
    console.log(this.state.precio);
  }

  render() {
    return (
      <div>
        <div>
          <input
            onChange={this.handleOnChange}
            placeholder="Buscar Producto"
          ></input>
          <input
            onChange={this.handleOnChangePrize}
            placeholder="Ingresar Precio"
          ></input>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Descripcion</th>
                  <th>Precio</th>
                  <th>Vendedor</th>
                  {this.state.comprador && <th>Subasta</th>}
                </tr>
              </thead>
              <tbody>{this.listProducts()}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default ListProducts
