import axios from "axios";

let url = "http://localhost:8080";

class compradorService {
    getAllVendedores() {
        return axios.get(url + '/Comprador/vendedor')
            .then(response => response.data);
    }

    getVendedoresByName(name) {
        return axios.get(url + '/Vendedor/vendedor' + name)
            .then(response => response.data);
    }
}

export default compradorService;