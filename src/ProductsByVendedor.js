import React from "react";

class ProductsByVendedor extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            productos: [],
            vendedor: ""
        }
    }

    componentDidMount() {
        this.setState({
            productos: this.props.state.vendedor.productos,
            vendedor: this.props.state.vendedor.name
        })
    }

  viewProducts() {
        if (this.state.productos) {
            return this.state.productos.map((product) => {
                return (
                  <tr key={product.id}>
                    <td>{product.descripcion}</td>
                    <td>{product.productName}</td>
                    <td>{product.precio}</td>
                  </tr>
                );
            })
        }
    }

    render() {
        return (
          <div>
            <strong>Vendedor: {this.state.vendedor}</strong>
            <table>
              <thead >
                <tr>
                  <th>Descripcion</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>{this.viewProducts()}</tbody>
            </table>
          </div>
        );
    }
}

export default ProductsByVendedor;
