import SockJS from "sockjs-client";
import Stomp from "stompjs";
import authenticationService from "./services/authenticationService";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//"https://subasta-express-arsw.herokuapp.com
//"http://localhost:8080
var stompClient = null;
/**
 * It's a function that returns a form with a button that sends a message to a websocket server.
 * @returns The component is being returned.
 */
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

  /* It's a hook that is called when the component is mounted. */
  useEffect(() => {
    setInitialValues();
    handleOnStartSubasta();
  }, []);

  /**
   * The function setInitialValues() is called when the component is mounted, and it sets the initial
   * values of the state variables username, comprador, vendedor, and precio.
   */
  function setInitialValues() {
    const usuario = authenticationService.getActualUser();
    const username = usuario.username;
    setUsername(username);
    setComprador(usuario.roles.includes("Comprador"));
    setVendedor(usuario.roles.includes("Vendedor"));
    setPrecio(precio);
  }

  /**
   * It connects to a websocket and subscribes to a topic
   */
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
            alert(ganador);
            alert("El ganador es: " + ganador);
          }
        } else if (response.body === precio) {
          alert("Se mantuvo el precio");
        } else {
          let lista = response.body.split("-");
          setPrecio(lista[0]);
          setGanador(lista[1]);
        }
      });
    });
  }

  /**
   * It takes the values of the form and sends them to the server.
   * @param evt - The event object.
   */
  function handleOnSubmit(evt) {
    evt.preventDefault();
    let mensajes = [mensaje, producto, precio, username];
    stompClient.send("/app/subasta", {}, JSON.stringify(mensajes));
  }

  /**
   * The function takes an event as an argument, prevents the default action of the event, and then
   * calls the setMensaje function with the value of the event target.
   * @param evt - The event object.
   */
  function handleOnChange(evt) {
    evt.preventDefault();
    setMensaje(evt.target.value);
  }

  /**
   * It sends a message to the server with the name of the product and the status of the user.
   * </code>
   * @param evt - The event object.
   */
  function handleOnEntrySubasta(evt) {
    evt.preventDefault();
    let status = true;
    let nombre = [status, producto];
    stompClient.send("/app/subasta", {}, JSON.stringify(nombre));
  }

  /**
   * It sends a message to the server with the product name, the winner and a boolean value.
   * </code>
   * @param evt - the event object
   */
  function handleOnEndSubasta(evt) {
    evt.preventDefault();
    let status = false;
    let nombre = [status, producto, ganador];
    stompClient.send("/app/subasta", {}, JSON.stringify(nombre));
  }

  return (
    <div>
      {console.log(estado)}
      <form onSubmit={handleOnSubmit}>
        Precio Actual: {pprecio}
        <div>
          {ganador} : {pprecio}
        </div>
        {comprador && estado ? (
          <div>
            <input type="number" onChange={handleOnChange} />
            <button type="submit">Ofertar</button>
          </div>
        ) : (
          <div>No se subasta</div>
        )}
        {vendedor && (
          <div>
            <button onClick={handleOnEndSubasta}>Finalizar Subasta</button>
            <button onClick={handleOnEntrySubasta}>Empezar Subasta</button>
          </div>
        )}
      </form>
    </div>
  );
}

export default Subasta;
