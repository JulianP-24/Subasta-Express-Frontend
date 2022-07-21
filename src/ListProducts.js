import { Button } from "bootstrap";
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
      products: []
    };
    //this.productService = new productService();
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnChangePrize = this.handleOnChangePrize.bind(this);
  }

  componentDidMount() {
    const usuario = authenticationService.getActualUser();
    console.log(usuario);
    if (usuario) {
      this.setState({
        comprador: usuario.roles.includes("Comprador"),
      });
    }
    this.viewProducts();
  }

  viewProducts() {
    productService.getAllProductos().then(response => {
      this.setState({
        products: response,
      });
    });
    
  }

  listProducts() {
    if (this.state.products) {
      return this.state.products.map((products) => {
        return (
          <tr key={products.id}>
            <td>{products.productName}</td>
            <td>{products.descripcion}</td>
            <td>{products.precio}</td>
            <td>{products.vendedor.name}</td>
            {this.state.comprador && (
              <td>
                <button>
                  <Link
                    to={{
                      pathname: `/subasta/${products.productName}/${products.precio}`,
                    }}
                  >
                    Entrar
                  </Link>
                </button>
              </td>
            )}
          </tr>
        );
      });
    }
  }

  viewProductsByName(name) {
    if (name != null && name !== " ") {
      productService
        .getProductosByName(name)
        .then((response) => console.log(response));
    }
  }

  viewProductsByPrize(prize) {
    if (this.state.precio != 0) {
      productService
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
