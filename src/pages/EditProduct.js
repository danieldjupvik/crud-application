import { useHistory, useParams } from "react-router-dom";
import useAxios from "../utils/useAxios";
import { useEffect, useState, useContext } from "react";
import Item from "../components/Item";
import { PRODUCTS_PATH } from "../utils/constants";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema } from "../utils/schemas";
import AuthContext from "../context/AuthContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const EditProduct = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const http = useAxios();
  const history = useHistory();

  const [auth] = useContext(AuthContext);

  if (!auth) {
    history.push("/login");
  }

  const [submitting, setSubmitting] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(productSchema),
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    setUpdateError(null);
    console.log(data);

    try {
      const response = await http.put(`${PRODUCTS_PATH}/${id}`, data);
      console.log(response);
      setProduct(response.data);
      setSuccess(true);
    } catch (e) {
      console.log("error" + e);
      setUpdateError(e.toString());
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await http.get(`${PRODUCTS_PATH}/${id}`);
        console.log(response);
        setProduct(response.data);
      } catch (e) {
        console.log("error" + e);
      }
    };
    getProduct();
  }, [id]);

  if (!product) {
    return (
      <h1 style={{ textAlign: "center", marginTop: "150px" }}>Loading...</h1>
    );
  }

  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: "30px" }}>Edit</h1>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        style={{ maxWidth: "350px", margin: "0 auto", marginTop: "60px" }}
      >
        {updateError && <p>{updateError}</p>}
        <fieldset disabled={submitting}>
          <Form.Group>
            <Form.Control
              name="title"
              placeholder="Title"
              ref={register}
              defaultValue={product.title}
            />
            {errors.title && <p>{errors.identifier.message}</p>}
          </Form.Group>

          <Form.Group>
            <Form.Control
              name="price"
              placeholder="Price"
              defaultValue={product.price}
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
              defaultValue={product.description}
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
              defaultValue={product.image_url}
              type="text"
            />
            {errors.image_url && <p>{errors.image_url.message}</p>}
          </Form.Group>

          <Button type="submit">
            {submitting ? "Updating ..." : "Update"}
          </Button>
        </fieldset>
      </Form>
      {success ? <p>Listing of {product.title} was updated</p> : null}
      <div
        style={{ margin: "0 auto", width: "fit-content", marginTop: "60px" }}
      >
        <Item {...product} />
      </div>
    </>
  );
};

export default EditProduct;
