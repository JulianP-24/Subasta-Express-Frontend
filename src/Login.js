import { editableInputTypes } from "@testing-library/user-event/dist/utils";
import React from "react";
import Logo from './Logo.png';
import authenticationService from './services/authenticationService'
import { Link } from "react-router-dom";



class Login extends React.Component{
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.manejadorUsername = this.manejadorUsername.bind(this);
        this.manejadorPassword = this.manejadorPassword.bind(this);

        this.state = {
            username: "",
            password: "",
            loading: false,
            msg: ""
        }
    }

    manejadorUsername(evt) {
        this.setState({
            username: evt.target.value
        })
    }

    manejadorPassword(evt) {
        this.setState({
            password: evt.target.value
        })
    }

    handleLogin(evt) {
        evt.preventDefault();
        this.setState({
            msg: "",
            loading: true
        });

        authenticationService.login(this.state.username).then(
            () => {
                //this.props.history.push("/dashboard");
                window.location = '/profile';
                alert("Inicio de sesion exitoso");
            },
            error => {
                const resMessage =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();
                
                    this.setState({
                        loading: false,
                        msg: resMessage
                    })
                    alert("Error al iniciar sesion")
                }
        )
    }

    render() {
        return (
          <div className="wrapper fadeInDown">
            <div id="formContent">
              <div className="fadeIn first">
                <br></br>
                <img src={Logo} width="100px" alt="User Icon" />
                <br></br>
              </div>

              <form onSubmit={this.handleLogin}>
                <input
                  type="text"
                  className="fadeIn second"
                  name="username"
                  placeholder="User"
                  onChange={this.manejadorUsername}
                />
                <input
                  type="password"
                  className="fadeIn third"
                  name="password"
                  placeholder="password"
                  onChange={this.manejadorPassword}
                />
                <input
                  type="submit"
                  className="fadeIn fourth"
                  value="Log In"
                />
              </form>

              <div id="formFooter">
                <a className="underlineHover" href="#">
                  Forgot Password?
                </a>
              </div>
            </div>
          </div>
        );
    } 
}

export default Login