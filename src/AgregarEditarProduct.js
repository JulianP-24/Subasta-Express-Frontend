import React from "react";
import productService from "./services/productService";

class AgregarEditarProduct extends React.Component {
  productoVcio = {
    productName: "",
    descpripcion: "",
    precio: "",
  }
  constructor(props) {
    super(props);
      this.state = {
        producto: this.productoVcio
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.productService = new productService();
  }

    componentDidMount() {
    if (this.props.match.params.id != "nuevo") {
      const item = this.productService.getProductsById(this.props.match.params.id);
      this.setState({
        producto: item,
      });
    }
  }

  handleOnChange(evt) {
    const target = evt.target;
    const value = target.value;
    const nombre = target.name;
    //console.log(nombre);
    let producto = { ...this.state.producto };
    producto[nombre] = value;
    this.setState({
      producto,
    });
  }

  handleOnSubmit(evt) {
    evt.preventDefault();
    const { producto } = this.state;
    console.log(producto);
    if (producto.id) {
      this.productService.saveProduct(producto);
      alert("El producto se actualizo correctamente");
    } else {
      this.productService.saveProduct(producto);
      alert("El producto se creo correctamente");
    }
  }

  render() {
    const { product } = this.state;
    //const title = <h3>{ product.id ? 'Editar producto' : 'Crear Producto'}</h3>
    return (
      <div>
        <div>
          <form onSubmit={this.handleOnSubmit}>
            <label htmlFor="nombre"> Nombre </label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              
              onChange={this.handleOnChange}
            />
            <label htmlFor="descripcion"> Descripcion </label>
            <input
              type="text"
              name="descripcion"
              id="descripcion"
             
              onChange={this.handleOnChange}
            />
            <label htmlFor="precio"> Precio </label>
            <input
              type="text"
              name="precio"
              id="precio"
              
              onChange={this.handleOnChange}
            />
            <button type="submit">Guardar Producto</button>
          </form>
        </div>
      </div>
    );
  }
}

export default AgregarEditarProduct;