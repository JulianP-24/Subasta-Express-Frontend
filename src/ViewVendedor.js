import React from "react";
import productService from "./services/productService";
import { Button } from "reactstrap";
import authenticationService from "./services/authenticationService";

class ViewVendedor extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            usuario: ""
        }
        this.productService = new productService();
    }

    componentDidMount() {
        const usuario = authenticationService.getActualUser();
        this.setState({
            usuario: usuario
        })
        this.viewProductsByVendedor();
    }

    viewProductsByVendedor() {
        this.productService.getVendedorByName()
            .then(response => {
                this.state({
                productos: response
            })
        })
    }

    viewProducts() {
        if (this.state.productos) {
            return this.state.productos.map((products) => {
                return (
                  <tr key={products.id}>
                    <td>{products.descripcion}</td>
                    <td>{products.productName}</td>
                    <td>{products.precio}</td>

                    <td><Button>Eliminar</Button></td>
                    <td><Button>Editar</Button></td>
                    <td><Button>Subastar</Button></td>
                  </tr>
                );
            })
        }
    }

    render() {
        return (
          <div>
            <h3>{this.setState.usuario}</h3>
            <Button>Crear Producto</Button>
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