import React from "react";
import { Link } from "react-router-dom";
import authenticationService from "./services/authenticationService";
import productService from "./services/productService";



class ListProducts extends React.Component {
  /**
   * The constructor function is a special method for creating and initializing an object created
   * within a class.
   * @param props - The props that are passed to the component.
   */
  constructor(props) {
    super(props);
    this.state = {
      buscar: "",
      comprador: "",
      precio: 0,
      products: [],
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnChangePrize = this.handleOnChangePrize.bind(this);
  }

  /**
   * ComponentDidMount() is a function that is called when the component is mounted.
   */
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

  /**
   * When the component mounts, it calls the viewProducts function, which calls the getAllProductos
   * function in the productService, which returns a response, which is then set as the state of the
   * component.
   */
  viewProducts() {
    productService.getAllProductos().then((response) => {
      this.setState({
        products: response,
      });
    });
  }

  /**
   * It returns a list of products, and if the user is a buyer, it will show a button to enter the
   * auction.
   * @returns a list of products.
   */
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
                <button className="btn btn-success btn-rounded">
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

  /**
   * It takes a name as a parameter, if the name is not null or empty, it calls the getProductosByName
   * function from the productService and logs the response.
   * @param name - string
   */
  viewProductsByName(name) {
    if (name != null && name !== " ") {
      productService
        .getProductosByName(name)
        .then((response) => console.log(response));
    }
  }

  /**
   * It takes a prize as a parameter and if the state of the component is not equal to 0, it calls the
   * getProductsByPrize function from the productService and then logs the response
   * @param prize - number
   */
  viewProductsByPrize(prize) {
    if (this.state.precio != 0) {
      productService
        .getProductsByPrize(prize)
        .then((response) => console.log(response));
    }
  }

  /**
   * "When the user types in the search bar, the function will update the state of the search bar and
   * then call the viewProductsByName function to display the products that match the search."
   * 
   * @param evt - The event object.
   */
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

  /**
   * It takes the value of the input and sets it to the state of the component.
   * @param evt - The event object
   */
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
            <table className="table table-striped table-responsive align-middle ">
              <thead>
                <tr className="table-dark">
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

export default ListProducts;
