import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import productService from "./services/productService";

function ProductsByVendedor() {
  const [productos, setProductos] = useState([]);
  const [vendedorr, setVendedor] = useState("");
  const { vendedor } = useParams();

  /* A hook that is called when the component is mounted. */
  useEffect(() => {
    setInitialValues();
  }, []);

  /**
   * I'm going to set the initial values of the productos and vendedor variables by calling the
   * getVendedorByNameByParam function of the productService object, and then I'm going to set the
   * productos and vendedor variables to the response.productos and vendedor parameters, respectively.
   */
  function setInitialValues() {
    productService.getVendedorByNameByParam(vendedor).then((response) => {
      setProductos(response.productos);
    });
    setVendedor(vendedor);
  }

  /**
   * It takes an array of objects, and returns an array of React elements.
   * @returns A function that returns a table row.
   */
  function viewProducts() {
    if (productos) {
      return productos.map((product) => {
        return (
          <tr key={product.id}>
            <td>{product.descripcion}</td>
            <td>{product.productName}</td>
            <td>{product.precio}</td>
          </tr>
        );
      });
    }
  }

  return (
    <div>
      <strong>Vendedor: {vendedorr}</strong>
      <table className="table table-striped table-responsive align-middle">
        <thead>
          <tr className="table-dark">
            <th>Descripcion</th>
            <th>Nombre</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>{viewProducts()}</tbody>
      </table>
    </div>
  );
}

export default ProductsByVendedor;
