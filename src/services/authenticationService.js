import axios from "axios";

let url = "https://subasta-express-arsw.herokuapp.com/SubastaExpress";

class authenticationService {
    
    login(username) {
        return axios
          .get(url + "/login/" + username, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            }
          })
          .then((response) => {
            localStorage.setItem("user", JSON.stringify(response.data));
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
        localStorage.removeItem("user"); 
    }

    getActualUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

}

export default new authenticationService();