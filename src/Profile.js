import React from "react";
import authenticationService from "./services/authenticationService";

class Profile extends React.Component {
  /**
   * The constructor function is a special method for creating and initializing an object created
   * within a class.
   * @param props - The props that are passed to the component.
   */
  constructor(props) {
    super(props);
    this.state = {
      actualUser: authenticationService.getActualUser(),
      comprador: false,
      vendedor: false,
    };
  }

  /**
   * When the component mounts, set the state of comprador and vendedor to the actualUser's roles.
   */
  componentDidMount() {
    this.setState({
      comprador: this.state.actualUser.roles.includes("Comprador"),
      vendedor: this.state.actualUser.roles.includes("Vendedor"),
    });
  }

  render() {
    const { actualUser } = this.state;
    return (
      <div className="container">
        <header className="jumbotron">
          {this.state.comprador ? (
            <h3>
              <strong>{actualUser.username} Perfil Comprador</strong>
            </h3>
          ) : (
            <h3>
              <strong>{actualUser.username} Perfil Vendedor</strong>
            </h3>
          )}
        </header>
        <strong>email: {actualUser.email} </strong>
      </div>
    );
  }
}

export default Profile;
