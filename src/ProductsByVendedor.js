import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import productService from "./services/productService";

function ProductsByVendedor() {
  const [productos, setProductos] = useState([]);
  const [vendedorr, setVendedor] = useState("");
  const { vendedor } = useParams();

  useEffect(() => {
    setInitialValues();
  }, [])

  function setInitialValues() {
    productService.getVendedorByNameByParam(vendedor).then((response) => {
      setProductos(response.productos)
    });
    setVendedor(vendedor);
  }

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
            })
        }
    }

    
        return (
          <div>
            <strong>Vendedor: {vendedorr}</strong>
            <table>
              <thead >
                <tr>
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
