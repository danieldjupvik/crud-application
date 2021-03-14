import { useHistory } from "react-router-dom";
import useAxios from "../utils/useAxios";
import { useState, useContext } from "react";
import Item from "../components/Item";
import { PRODUCTS_PATH } from "../utils/constants";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema } from "../utils/schemas";
import AuthContext from "../context/AuthContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

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

  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: "30px" }}>Add</h1>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        style={{ maxWidth: "350px", margin: "0 auto", marginTop: "60px" }}
      >
        {postError && <p>{postError}</p>}
        <fieldset disabled={submitting}>
          <Form.Group>
            <Form.Control name="title" placeholder="Title" ref={register} />
            {errors.title && <p>{errors.title.message}</p>}
          </Form.Group>

          <Form.Group>
            <Form.Control
              name="price"
              placeholder="Price"
              ref={register}
              type="number"
            />
            {errors.price && <p>{errors.price.message}</p>}
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              placeholder="Description"
              ref={register}
              type="text"
            />
            {errors.description && <p>{errors.description.message}</p>}
          </Form.Group>
          <Form.Group>
            <Form.Control
              name="image_url"
              placeholder="Image URL"
              ref={register}
              type="text"
            />
            {errors.image_url && <p>{errors.image_url.message}</p>}
          </Form.Group>

          <Button type="submit">{submitting ? "Adding ..." : "Add"}</Button>
        </fieldset>
      </Form>
      {success ? (
        <>
          {" "}
          <p style={{ textAlign: "center", fontWeight: "bold" }}>
            {product.title} is added!
          </p>
          <div
            style={{
              margin: "0 auto",
              width: "fit-content",
              marginTop: "60px",
            }}
          >
            <Item {...product} />
          </div>
        </>
      ) : null}
    </>
  );
};

export default AddProduct;
