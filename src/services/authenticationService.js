import axios from "axios";

let url = "http://localhost:8080/SubastaExpress";

class authenticationService {
    
    login(username) {
        return axios
          .get(url + '/login/' + username,)
          .then((response) => {
            localStorage.setItem("user", JSON.stringify(response.data));
            console.log(response.data);
          });
    }

    signUp(username, password, name, surname, email, roles) {
        return axios.post(url + '/signUp', {
            username,
            password,
            name,
            surname,
            email,
            roles
        });
    }

    getActualUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

}

export default new authenticationService();