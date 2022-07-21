
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import authenticationService from "./services/authenticationService";
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
//"https://subasta-express-arsw.herokuapp.com
//"http://localhost:8080
var stompClient = null;
function Subasta() {
    const [username, setUsername] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [comprador, setComprador] = useState("");
    const [vendedor, setVendedor] = useState("");
    const [pprecio, setPrecio] = useState("");
    const [estado, setEstado] = useState("false");
    const [ganador, setGanador] = useState("");
    const { precio } = useParams();
    const { producto } = useParams();
  
    useEffect(() => {
        setInitialValues();
        handleOnStartSubasta();
    },[])
  
  function setInitialValues() {
    const usuario = authenticationService.getActualUser();
    const username = usuario.username;
    alert(precio);
    setUsername(username);
    setComprador(usuario.roles.includes("Comprador"));
    setVendedor(usuario.roles.includes("Vendedor"));
    setPrecio(precio);
  }
  
    function handleOnStartSubasta() {
      
      var socket = new SockJS("https://subasta-express-arsw.herokuapp.com/stompendpoint");
      stompClient = Stomp.over(socket);
      stompClient.connect({}, (frame) => {
        console.log("Connected: " + frame);
        stompClient.subscribe("/topic/subasta" + producto, (response) => {
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

  function handleOnSubmit(evt) {
    evt.preventDefault();
    
    let mensajes = [
      mensaje,
      producto,
      precio,
      username,
    ];
    stompClient.send("/app/subasta", {}, JSON.stringify(mensajes));
  };

  function handleOnChange(evt) {
    evt.preventDefault();
    setMensaje(evt.target.value);
  };

  function handleOnEntrySubasta(evt) {
    evt.preventDefault();
    
    let status = true;
    let nombre = [status, producto];
    stompClient.send("/app/subasta", {}, JSON.stringify(nombre));
  };

  function handleOnEndSubasta(evt) {
    evt.preventDefault();
    let status = false;
    let nombre = [status, producto, ganador];
    stompClient.send("/app/subasta", {}, JSON.stringify(nombre));
  };
    
   
  return (
      <div>
          {console.log(estado)}
          <form onSubmit={handleOnSubmit}>
              Precio Actual: {pprecio}
              <div >
                  {ganador} : {pprecio}
              </div>
              {comprador && estado ? (
                  <div >
                      <input type="number" onChange={handleOnChange} />
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
                      
                          onClick={handleOnEndSubasta}
                      >
                          Finalizar Subasta
                      </button>
                      <button
                      
                          onClick={handleOnEntrySubasta}
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