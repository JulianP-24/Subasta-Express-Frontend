import axios from "axios";
import authenticationService from "./authenticationService";

const url = "https://subasta-express-arsw.herokuapp.com";
//const url = "http://localhost:8080";
/* I'm trying to get the id of the user that is logged in and then save a product with that id.
 */
class productService {
  /**
   * It returns a promise that resolves to the data property of the response object.
   * @returns The data from the response.
   */
  getAllProductos() {
    return axios
      .get(url + "/Comprador/productos")
      .then((response) => response.data);
  }

  /**
   * It returns a promise that resolves to the data property of the response object.
   * @param id - The id of the seller
   * @returns The response.data is being returned.
   */
  getProductsById(id) {
    return axios
      .get(url + "/Vendedor/productos/" + id)
      .then((response) => response.data);
  }

  /**
   * It takes a string as a parameter and returns a promise that resolves to an array of objects.
   * @param name - the name of the product
   * @returns The response.data is being returned.
   */
  getProductosByName(name) {
    return axios
      .get(url + "/Comprador/productos/listar/" + name)
      .then((response) => response.data);
  }

  /**
   * It returns a promise that resolves to an array of products
   * @param prize - the prize of the product
   * @returns The data that is being returned is the data that is being requested from the server.
   */
  getProductsByPrize(prize) {
    return axios
      .get(url + "/Comprador/productos/buscar/" + prize)
      .then((response) => response.data);
  }

  /**
   * It gets the current user's name and then uses that name to get the user's data from the
   * database.
   * @returns The response.data is being returned.
   */
  getCompradorByName() {
    const usuario = authenticationService.getActualUser();
    const name = usuario.name;
    return axios
      .get(url + "/Comprador/comprador" + name)
      .then((response) => response.data);
  }

  /**
   * It gets the name of the user from the authentication service and then uses that name to get the
   * user's data from the database.
   * @returns The response.data is an object with the following structure:
   */
  getVendedorByName() {
    const usuario = authenticationService.getActualUser();
    const name = usuario.name;
    return axios
      .get(url + "/Vendedor/vendedor/" + name)
      .then((response) => response.data);
  }

  /**
   * It returns a promise that resolves to the data property of the response object
   * @param name - the name of the seller
   * @returns The response.data is being returned.
   */
  getVendedorByNameByParam(name) {
    return axios
      .get(url + "/Vendedor/vendedor/" + name)
      .then((response) => response.data);
  }

  /**
   * It gets the user's name, then it gets the user's id, then it saves the product.
   * @param productName - String
   * @param descripcion - "string"
   * @param precio - number
   * @returns The response of the post request.
   */
  saveProduct(productName, descripcion, precio) {
    let vendedor;
    const usuario = authenticationService.getActualUser();
    const name = usuario.name;
    return axios.get(url + "/Vendedor/vendedor/" + name).then((response) => {
      vendedor = response.data.id;
      return axios.post(url + "/Vendedor/productos/" + vendedor, {
        productName,
        descripcion,
        precio,
      });
    });
  }

  /**
   * It deletes a product from the database.
   * @param id - the id of the product
   */
  deleteProduct(id) {
    axios
      .delete(url + "/Vendedor/productos/" + id)
      .then((response) => response.data);
  }
}

export default new productService();
