import React from "react";
import authenticationService from "./services/authenticationService";
import productService from "./services/productService";

class Profile extends React.Component{
    constructor(props) {
        super(props)
        this.productService = new productService();
        this.state = {
            actualUser: authenticationService.getActualUser(),
            comprador: false,
            vendedor: false,
        }
    }

    componentDidMount() {
        this.setState({ 
            comprador: this.state.actualUser.roles.includes("Comprador"),
            vendedor: this.state.actualUser.roles.includes("Vendedor")
        })
    }

    render() {
        const { actualUser } = this.state;
        return (
          <div className="container">
            <header className="jumbotron">
                {this.state.comprador ? (<h3>
                    <strong>{actualUser.username} Perfil Comprador</strong>
                </h3>):(<h3>
                    <strong>{actualUser.username} Perfil Vendedor</strong>
                </h3>)}
            </header>
            <strong>email: {actualUser.email} </strong>
          </div>  
        );
    }
}

export default Profile;