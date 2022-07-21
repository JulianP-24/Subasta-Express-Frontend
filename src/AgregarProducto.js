import React from "react";
import productService from "./services/productService";

class AgregarProducto extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productName: "",
            descripcion: "",
            precio: ""
        };
        this.handleProductName = this.handleProductName.bind(this);
        this.handleDescripcion = this.handleDescripcion.bind(this);
        this.handlePrecio = this.handlePrecio.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this)
        //this.productService = new productService();
    }

    handleProductName(evt) {
        this.setState({
            productName: evt.target.value
        });
    }

    handleDescripcion(evt) {
        this.setState({
            descripcion: evt.target.value
        });
    }

    handlePrecio(evt) {
        this.setState({
            precio: evt.target.value
        })
    }

    handleOnSubmit(evt) {
        evt.preventDefault();
        productService.saveProduct(this.state.productName, this.state.descripcion, this.state.precio)
        alert("Se agrego correctamente el producto");
        window.location = '/vendedor';     
    }

    render() {

    return (
      <div>
        <div>
          <form onSubmit={this.handleOnSubmit}>
            <label htmlFor="productName"> Nombre </label>
            <input
              type="text"
              name="productName"
              id="productName"
              onChange={this.handleProductName}          
              
            />
            <label htmlFor="descripcion"> Descripcion </label>
            <input
              type="text"
              name="descripcion"
              id="descripcion"
              onChange={this.handleDescripcion}
             
            />
            <label htmlFor="precio"> Precio </label>
            <input
              type="text"
              name="precio"
              id="precio"
              onChange={this.handlePrecio}
              
            />
            <button type="submit">Guardar Producto</button>
          </form>
        </div>
      </div>
    );
  }

}

export default AgregarProducto;