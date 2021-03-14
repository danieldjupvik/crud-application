import { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { PRODUCTS_PATH } from "../utils/constants";
import useAxios from "../utils/useAxios";
import Item from "../components/Item";
import Button from "react-bootstrap/Button";

const Products = () => {
  const [auth] = useContext(AuthContext);
  const history = useHistory();
  const [products, setProducts] = useState(null);
  const http = useAxios();
  const [render, setRender] = useState(1);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await http.get(PRODUCTS_PATH);
        console.log(response);
        setProducts(response.data);
      } catch (e) {
        console.log("error" + e);
      }
    };
    getProducts();
  }, [render]);

  const deleteProduct = async (id, productTitle, e) => {
    try {
      const response = await http.delete(`${PRODUCTS_PATH}/${id}`);
      console.log(response);
      alert(`${productTitle} has been deleted.`);
    } catch (error) {
      console.log(error);
    } finally {
      setRender(render + 1);
    }
  };

  if (!auth) {
    history.push("/login");
  }

  if (!products) {
    return (
      <h1 style={{ textAlign: "center", marginTop: "150px" }}>Loading...</h1>
    );
  }

  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: "30px" }}>Products</h1>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {products.map((product) => {
          return (
            <div
              key={product.id}
              style={{ width: "fit-content", margin: "30px" }}
            >
              <Link
                to={`/edit/${product.id}`}
                style={{ textDecoration: "none" }}
              >
                <Item {...product} />
              </Link>
              <Button
                style={{ margin: "0 auto", width: "100%", display: "block" }}
                variant="danger"
                onClick={() => deleteProduct(product.id, product.title)}
              >
                Delete
              </Button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Products;
