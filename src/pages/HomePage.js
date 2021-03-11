import { useEffect } from "react";
import { BASE_URL, PRODUCTS_PATH } from "../utils/constants";
import axios from "axios";

const HomePage = () => {
  useEffect(() => {
    axios
      .get(`${BASE_URL}${PRODUCTS_PATH}`)
      .then((response) => console.log(response));
  }, []);

  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: "30px" }}> Homepage</h1>
      <img
        style={{ width: "80%", margin: "0 auto", display: "block" }}
        src="https://react-content.netlify.app/images/react-crud-1.png"
        alt="crud"
      />
    </>
  );
};

export default HomePage;
