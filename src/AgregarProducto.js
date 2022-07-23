import React from "react";
import productService from "./services/productService";


/* It's a form that allows the user to add a product to the database */
class AgregarProducto extends React.Component {
  /**
   * The constructor function is a special method for creating and initializing an object created
   * within a class.
   * @param props - The props that are passed to the component.
   */
  constructor(props) {
    super(props);
    this.state = {
      productName: "",
      descripcion: "",
      precio: "",
    };
    this.handleProductName = this.handleProductName.bind(this);
    this.handleDescripcion = this.handleDescripcion.bind(this);
    this.handlePrecio = this.handlePrecio.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  /**
   * The above function is a method that is called when the user types in the input field. It takes the
   * value of the input field and sets it as the state of the component.
   * @param evt - The event object
   */
  handleProductName(evt) {
    this.setState({
      productName: evt.target.value,
    });
  }

  /**
   * The function handleDescripcion is called when the user types in the textarea. The function then
   * updates the state of the component with the value of the textarea.
   * @param evt - The event object
   */
  handleDescripcion(evt) {
    this.setState({
      descripcion: evt.target.value,
    });
  }

  /**
   * The function handlePrecio is an event handler that takes an event as an argument and sets the
   * state of the component to the value of the event.
   * @param evt - The event object
   */
  handlePrecio(evt) {
    this.setState({
      precio: evt.target.value,
    });
  }

  /**
   * When the form is submitted, prevent the default action, save the product, alert the user, and
   * redirect to the seller page.
   * @param evt - The event object.
   */
  handleOnSubmit(evt) {
    evt.preventDefault();
    productService.saveProduct(
      this.state.productName,
      this.state.descripcion,
      this.state.precio
    );
    alert("Se agrego correctamente el producto");
    window.location = "/vendedor";
  }

  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.handleOnSubmit}>
            <label htmlFor="productName">
              <strong>Nombre:</strong>
            </label>
            <input
              type="text"
              name="productName"
              id="productName"
              onChange={this.handleProductName}
            />
            <br></br>
            <label htmlFor="descripcion"><strong>Descripcion:</strong></label>
            <input
              type="text"
              name="descripcion"
              id="descripcion"
              onChange={this.handleDescripcion}
            />
            <br></br>
            <label htmlFor="precio"><strong>Precio:</strong></label>
            <input
              type="text"
              name="precio"
              id="precio"
              onChange={this.handlePrecio}
            />
            <br></br>
            <button type="submit" className="btn btn-success btn-rounded">
              Guardar Producto
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default AgregarProducto;
