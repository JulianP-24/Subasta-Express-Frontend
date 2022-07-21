import axios from "axios";

let url = "https://subasta-express-arsw.herokuapp.com/SubastaExpress";
//const url = "http://localhost:8080/SubastaExpress";

class authenticationService {
    
    login(username, password) {
        return axios
          .get(url + "/login/" + username + "/" + password, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            }
          })
          .then((response) => {
            sessionStorage.setItem("user", JSON.stringify(response.data));
            console.log(response.data);
          });
    }

    signUp(username, password, name, surname, email, roles) {
        return axios.post(url + '/signUp', {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            },
            username,
            password,
            name,
            surname,
            email,
            roles
        });
    }

    logOut() {
        sessionStorage.removeItem("user"); 
    }

    getActualUser() {
        return JSON.parse(sessionStorage.getItem('user'));
    }

}

export default new authenticationService();