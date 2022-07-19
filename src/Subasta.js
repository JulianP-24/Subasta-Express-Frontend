
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import authenticationService from "./services/authenticationService";
import React, { useState } from 'react';
import { useParams } from "react-router-dom";

var stompClient = null;
function Subasta() {
    const [username, setUsername] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [comprador, setComprador] = useState("");
    const [vendedor, setVendedor] = useState("");
    const [precio, setPrecio] = useState("");
    const [estado, setEstado] = useState("false");
    const [ganador, setGanador] = useState("");
    HandleOnStartSubasta();

    //this.handleOnSubmit = this.handleOnSubmit.bind(this);
    //this.handleOnChange = this.handleOnChange.bind(this);
    //this.handleOnEntrySubasta = this.handleOnEntrySubasta.bind(this);
    //this.handleOnStartSubasta = this.handleOnStartSubasta.bind(this);
    //this.handleOnEndSubasta = this.handleOnEndSubasta.bind(this);
  

  /*function componentDidMount() {
    const usuario = authenticationService.getActualUser();
    const username = usuario.username;
    const { match: { params }} = this.props;
    const { precio } = params.precio;
    console.log(params.precio);
      setUsername(username);
      setComprador(usuario.roles.includes("Comprador"));
      setVendedor(usuario.roles.includes("Vendedor"));
      setPrecio(precio);
    /*this.setState({
      username: username,
      comprador: usuario.roles.includes("Comprador"),
      vendedor: usuario.roles.includes("Vendedor"),
      precio: precio,
    });

};*/

  function HandleOnStartSubasta() {
    const { product } = useParams();
    var socket = new SockJS("https://subasta-express-arsw.herokuapp.com/stompendpoint");
    stompClient = Stomp.over(socket);
    stompClient.connect({}, (frame) => {
      console.log("Connected: " + frame);
      stompClient.subscribe("/topic/subasta" + product, (response) => {
        if (response.body.includes("true") || response.body.includes("false")) {
          let lista = response.body.split(".");
          setEstado(lista[1]);
          if (response.body.includes("false")) {
            alert("El ganador de la subasta es: " + ganador);
          }
        } else if (response.body === precio) {
          alert("Se mantuvo el precio");
        } else {
          const usuario = authenticationService.getActualUser();
          let lista = response.body.split("-");
          setPrecio(lista[0]);
          setGanador(lista[1]);
        }
      });
    });
  };

  function HandleOnSubmit(evt) {
    evt.preventDefault();
    const { product } = useParams();
    let mensajes = [
      mensaje,
      product,
      precio,
      username,
    ];
    stompClient.send("/app/subasta", {}, JSON.stringify(mensajes));
  };

  function HandleOnChange(evt) {
    evt.preventDefault();
    setMensaje(evt.target.value);
  };

  function HandleOnEntrySubasta(evt) {
    evt.preventDefault();
    const usuario = authenticationService.getActualUser();
    const username = usuario.username;
    const { precio } = useParams();
    alert(precio);
    setUsername(username);
    setComprador(usuario.roles.includes("Comprador"));
    setVendedor(usuario.roles.includes("Vendedor"));
    setPrecio(precio);
    let status = true;
    const { product } = useParams();
    let nombre = [status, product];
    stompClient.send("/app/subasta", {}, JSON.stringify(nombre));
};

  function HandleOnEndSubasta(evt) {
    evt.preventDefault();
    let status = false;
    const { product } = useParams();
    let nombre = [status, product, ganador];
    stompClient.send("/app/subasta", {}, JSON.stringify(nombre));
};
    
   
  return (
      <div>
          {console.log(estado)}
          <form onSubmit={HandleOnSubmit}>
              Precio Actual: {precio}
              <div >
                  {ganador} : {precio}
              </div>
              {comprador && estado ? (
                  <div >
                      <input type="number" onChange={HandleOnChange} />
                      <button type="submit">
                          Ofertar
                      </button>
                  </div>
              ) : (
                  <div >No se subasta</div>
              )}
              {vendedor && (
                  <div >
                      <button
                      
                          onClick={HandleOnEndSubasta}
                      >
                          Finalizar Subasta
                      </button>
                      <button
                      
                          onClick={HandleOnEntrySubasta}
                      >
                          Empezar Subasta
                      </button>
                  </div>
              )}
          </form>
      </div>
    ); 
}         



export default Subasta;