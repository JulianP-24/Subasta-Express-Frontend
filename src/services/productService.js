import axios from "axios";
import authenticationService from "./authenticationService";

const url = "htpp://localhost:8080"
class productService{
    getAllProductos() {
        axios.get(url + '/Comprador/productos')
            .then(response => response.data);
    }

    getProductsById(id) {
        axios.get(url + '/Comprador/productos/' + id)
            .then(response => response.data);
    }

    getProductosByName(name) {
        axios.get(url + '/Comprador/productos/listar/' + name)
            .then(response => response.data);
    }

    getProductsByPrize(prize) {
        axios.get(url + '/Comprador/productos/buscar/' + prize)
            .then(response => response.data);
    }

    getCompradorByName() {
        const usuario = authenticationService.getActualUser();
        const name = usuario.name;
        return axios.get(url + '/Comprador/' + name)
            .then(response => response.data);
    }

    getVendedorByName() {
        const usuario = authenticationService.getActualUser();
        const name = usuario.name;
        return axios.get(url + '/Vendedor/' + name)
            .then(response => response.data);
    }

    saveProduct(producto) {
        if (producto.id) {
            return axios.put(url + '/Vendedor/productos/' + producto.id, producto)
                .then(response => console.log(response.data));
        } else {
            let vendedor;
            const usuario = authenticationService.getActualUser();
            const name = usuario.name;
            axios.get(url + '/Vendedor/' + name)
                .then(response => {
                    vendedor = response.data.id
                    axios.post(url + '/Vendedor/productos/' + vendedor, producto)
            })
        }
    }

    deleteProduct(id) {
        axios.delete(url + '/Vendedor/productos/' + id)
            .then(response => console.log("Se elimino correctamente", response.data));
    }
}

export default productService;