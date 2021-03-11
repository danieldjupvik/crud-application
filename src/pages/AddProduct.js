import { useHistory } from "react-router-dom";
import useAxios from "../utils/useAxios";
import { useState, useContext } from "react";
import Item from "../components/Item";
import { PRODUCTS_PATH } from "../utils/constants";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema } from "../utils/schemas";
import AuthContext from "../context/AuthContext";

const AddProduct = () => {
  const [product, setProduct] = useState(null);
  const http = useAxios();
  const history = useHistory();

  const [auth] = useContext(AuthContext);

  if (!auth) {
    history.push("/login");
  }

  const [submitting, setSubmitting] = useState(false);
  const [postError, setPostError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(productSchema),
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    setPostError(null);
    console.log(data);

    try {
      const response = await http.post(`${PRODUCTS_PATH}`, data);
      console.log(response);
      setProduct(response.data);
      setSuccess(true);
    } catch (e) {
      console.log("error" + e);
      setPostError(e.toString());
    } finally {
      setSubmitting(false);
    }
  };

  // useEffect(() => {
  //   const getProduct = async () => {
  //     try {
  //       const response = await http.get(`${PRODUCTS_PATH}/${id}`);
  //       console.log(response);
  //       setProduct(response.data);
  //     } catch (e) {
  //       console.log("error" + e);
  //     }
  //   };
  //   getProduct();
  // }, [id]);

  // if (!product) {
  //   return <h2>Loading...</h2>;
  // }

  return (
    <>
      <h1>Add</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {postError && <p>{postError}</p>}
        <fieldset disabled={submitting}>
          <div>
            <input name="title" placeholder="Title" ref={register} />
            {errors.title && <p>{errors.identifier.message}</p>}
          </div>

          <div>
            <input
              name="price"
              placeholder="Price"
              ref={register}
              type="number"
            />
            {errors.price && <p>{errors.price.message}</p>}
          </div>
          <div>
            <textarea
              name="description"
              placeholder="Description"
              ref={register}
              type="text"
            />
            {errors.description && <p>{errors.description.message}</p>}
          </div>
          <div>
            <input
              name="image_url"
              placeholder="Image URL"
              ref={register}
              type="text"
            />
            {errors.image_url && <p>{errors.image_url.message}</p>}
          </div>

          <button type="submit">{submitting ? "Adding ..." : "Add"}</button>
        </fieldset>
      </form>
      {success ? (
        <>
          {" "}
          <p>{product.title} is added!</p>
          <Item {...product} />{" "}
        </>
      ) : null}
    </>
  );
};

export default AddProduct;
