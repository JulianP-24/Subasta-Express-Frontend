import axios from "axios";

let url = "https://subasta-express-arsw.herokuapp.com";
//const url = "http://localhost:8080";

/* It's a class that has two methods, one that gets all the vendedores and one that gets a vendedor by
name. */
class compradorService {
  /**
   * It returns a promise that resolves to the data property of the response object
   * @returns The response.data is being returned.
   */
  getAllVendedores() {
    return axios
      .get(url + "/Comprador/vendedor")
      .then((response) => response.data);
  }

  /**
   * It returns a promise that resolves to the data property of the response object.
   * @param name - the name of the seller
   * @returns The response.data is being returned.
   */
  async getVendedoresByName(name) {
    return await axios
      .get(url + "/Vendedor/vendedor/" + name)
      .then((response) => response.data);
  }
}

export default compradorService;
