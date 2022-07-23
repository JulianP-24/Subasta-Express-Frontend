import React from "react";
import productService from "./services/productService";
import compradorService from "./services/compradorService";
import authenticationService from "./services/authenticationService";
import { Link } from "react-router-dom";


class viewComprador extends React.Component {
  /**
   * The constructor is a special method for creating and initializing an object created within a
   * class.
   * @param props - The props that are passed to the component.
   */
  constructor(props) {
    super(props);
    this.state = {
      ususario: "",
    };
    this.compradorService = new compradorService();
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  /**
   * ComponentDidMount() is a function that is called when the component is mounted.
   */
  componentDidMount() {
    const usuario = authenticationService.getActualUser();
    this.setState({
      usuario: usuario,
    });
    this.getAllVendedores();
  }

  /**
   * "When the user types in the input field, the value of the input field is set to the state
   * variable vendedor, and then the function findVendedorByName is called with the value of the
   * state variable vendedor as a parameter."
   * </code>
   * @param evt - The event object
   */
  handleOnChange(evt) {
    const value = evt.target.value;
    // const value = target.value;
    this.setState({
      vendedor: value,
    });
    console.log(value);
    if (value !== " ") {
      this.findVendedorByName(this.state.vendedor);
    } else {
      this.getAllVendedores();
    }
  }

  /**
   * It takes a name as a parameter, and if the name is not null or empty, it calls a service that
   * returns a list of vendors, and then sets the state of the component with the list of vendors.
   * @param name - the name of the seller
   */
  findVendedorByName(name) {
    if (name != null && name != " ") {
      this.compradorService.getVendedoresByName(name).then((response) => {
        this.setState({
          vendedores: response,
        });
        console.log(this.state.vendedores);
      });
    }
  }

  /**
   * It gets all the vendedores from the database and sets the state of the vendedores to the
   * response.
   */
  getAllVendedores() {
    this.compradorService.getAllVendedores().then((response) => {
      this.setState({
        vendedores: response,
      });
    });
  }

  /**
   * I'm trying to get the name of the vendedor and pass it to the pathname of the Link component.
   * @returns A function that returns a table row for each vendedor in the state.
   */
  viewVendedor() {
    console.log(this.state.vendedores);
    if (this.state.vendedores) {
      return this.state.vendedores.map((vendedor) => {
        return (
          <tr key={vendedor.id}>
            <td>{vendedor.name}</td>
            <td>{vendedor.email}</td>
            <td>
              <Link
                className="btn btn-success btn-rounded"
                to={{
                  pathname: `/productsbyVendedor/${vendedor.name}`,
                }}
              >
                Ver Productos
              </Link>
            </td>
          </tr>
        );
      });
    }
  }

  render() {
    return (
      <div>
        <input
          type="text"
          id="name"
          placeholder="Buscar Vendedor"
          onChange={this.handleOnChange}
        ></input>
        <table className="table table-striped table-responsive align-middle">
          <thead>
            <tr className="table-dark">
              <th>Nombre</th>
              <th>Email</th>
              <th>Productos</th>
            </tr>
          </thead>
          <tbody>{this.viewVendedor()}</tbody>
        </table>
      </div>
    );
  }
}

export default viewComprador;
