import axios from "axios";

let url = "https://subasta-express-arsw.herokuapp.com";
//const url = "http://localhost:8080";

class compradorService {
    getAllVendedores() {
        return axios.get(url + '/Comprador/vendedor')
            .then(response => response.data);
    }

    async getVendedoresByName(name) {
        return await axios.get(url + '/Vendedor/vendedor/' + name)
            .then(response => response.data);
    }
}

export default compradorService;