import React from "react";
import productService from "./services/productService";
import compradorService from "./services/compradorService";
import authenticationService from "./services/authenticationService";
import { Link } from "react-router-dom";

class viewComprador extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            busqueda: "",
            contenido: "",
            ususario: ""
        };
        this.productService = new productService();
        this.compradorService = new compradorService();
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    componentDidMount() {
        const usuario = authenticationService.getActualUser();
        this.getAllVendedores();
    }

    handleOnChange(evt) {
        const target = evt.target;
        const value = target.value;
        this.setState({
            vendedor: value
        })
        console.log(value);
        if (value !== " ") {
            this.findVendedorByName(this.state.vendedor);
        } else {
            this.getAllVendedores();
        }
    }

    findVendedorByName(name) {
        if (name != null && name != " ") {
            this.compradorService.getVendedoresByName(name)
                .then(response => {
                this.setState({
                    vendedores: response
                })
             console.log(this.state.vendedores)   
            })
        }
    }

    getAllVendedores() {
        this.compradorService.getAllVendedores()
            .then(response => {
                this.setState({
                vendedores: response
            })
        })
    }

    viewVendedor() {
        if (this.state.vendedores) {
            return this.state.vendedores.map((vendedor) => {
                return (
                    <tr key={vendedor.id}>
                        <td>{vendedor.nombre}</td>
                        <td>{vendedor.email}</td>
                        <td><Link to={{pathname: "/productsbyVendedor", search:vendedor.nombre, state: {vendedor: vendedor}}}>Ver Productos</Link></td>
                    </tr>
                )
            })
        }
    }

    render() {
        return (
          <div>
            <input
              type="text"
              id="name"
              onChange={this.handleOnChange}
              placeholder="Buscar Vendedor">  
            </input>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Productos</th>    
                    </tr>        
                </thead>
                <tbody>
                    {this.viewVendedor()}        
                </tbody>    
            </table>
          </div>
        );
    }
}

export default viewComprador;