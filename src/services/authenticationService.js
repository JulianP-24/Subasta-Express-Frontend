import axios from "axios";

let url = "https://subasta-express-arsw.herokuapp.com/SubastaExpress";
//const url = "http://localhost:8080/SubastaExpress";

/* It's a class that handles the authentication of the user. */
class authenticationService {
  /**
   * It takes a username and password, and then sends a GET request to the server with the username
   * and password as parameters.
   * @param username - user username
   * @param password - user password
   * @returns The response.data is an object with the following properties:
   */
  login(username, password) {
    return axios
      .get(url + "/login/" + username + "/" + password, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      })
      .then((response) => {
        sessionStorage.setItem("user", JSON.stringify(response.data));
        console.log(response.data);
      });
  }

  /**
   * I'm trying to send a POST request to my backend server.
   * @param username - user username
   * @param password - user password
   * @param name - user name
   * @param surname - user surname
   * @param email - user email
   * @param roles - user rol
   */
  signUp(username, password, name, surname, email, roles) {
    return axios.post(url + "/signUp", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
      username,
      password,
      name,
      surname,
      email,
      roles,
    });
  }

  /**
   * It removes the user from the session storage.
   */
  logOut() {
    sessionStorage.removeItem("user");
  }

  /**
   * It gets the user from the session storage and parses it to a JSON object.
   * </code>
   * @returns The user object.
   */
  getActualUser() {
    return JSON.parse(sessionStorage.getItem("user"));
  }
}

export default new authenticationService();
