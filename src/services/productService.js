import axios from "axios";
import authenticationService from "./authenticationService";

const url = "https://subasta-express-arsw.herokuapp.com";
//const url = "http://localhost:8080";
class productService{
    getAllProductos() {
        return axios.get(url + '/Comprador/productos')
            .then(response => response.data);
    }

    getProductsById(id) {
        return axios.get(url + '/Vendedor/productos/' + id)
            .then(response => response.data);
    }

    getProductosByName(name) {
        return axios.get(url + '/Comprador/productos/listar/' + name)
            .then(response => response.data);
    }

    getProductsByPrize(prize) {
        return axios.get(url + '/Comprador/productos/buscar/' + prize)
            .then(response => response.data);
    }

    getCompradorByName() {
        const usuario = authenticationService.getActualUser();
        const name = usuario.name;
        return axios.get(url + '/Comprador/comprador' + name)
            .then(response => response.data);
    }

    getVendedorByName() {
        const usuario = authenticationService.getActualUser();
        const name = usuario.name;
        return axios.get(url + '/Vendedor/vendedor/' + name)
            .then(response => response.data);
    }

    getVendedorByName(name) {
        return axios.get(url + '/Vendedor/vendedor/' + name)
            .then(response => response.data);
    }


    saveProduct(productName, descripcion, precio) {
            let vendedor;
            const usuario = authenticationService.getActualUser();
            const name = usuario.name;
            return axios.get(url + '/Vendedor/vendedor/' + name)
                .then(response => {
                    vendedor = response.data.id
                    return axios.post(url + '/Vendedor/productos/' + vendedor, {
                        productName,
                        descripcion,
                        precio
                    })
                    
            })
        }
    

    deleteProduct(id) {
        axios.delete(url + '/Vendedor/productos/' + id)
            .then(response => response.data);
    }
}

export default new productService();