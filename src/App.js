import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import './Login.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import React from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import SignUp from './SignUp';
import authenticationService from './services/authenticationService';


export class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      viewComprador: false,
      viewVendedor: false,
      actualUser: undefined
    }
  }

  componentDidMount() {
    const usuario = authenticationService.getActualUser();
    if (usuario) {
      this.setState({
        actualUser: usuario,
        viewComprador: usuario.roles.includes("Comprador"),
        viewVendedor: usuario.roles.includes("Vendedor")
      })
    }
  }

  render() {
    const { actualUser, viewComprador, viewVendedor } = this.state;
    return (
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <div className="navbar-nav">
              <li className="nav-item">
                <Link to={"/signup"} className="nav-link">
                  Registrate
                </Link>
              </li>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
