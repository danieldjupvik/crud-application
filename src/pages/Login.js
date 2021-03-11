import { useState, useContext } from "react";
import { loginSchema } from "../utils/schemas";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { AUTH_PATH, BASE_URL } from "../utils/constants";
import AuthContext from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Login = () => {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const history = useHistory();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const [auth, setAuth] = useContext(AuthContext);

  if (auth) {
    history.push("/products");
  }
  const onSubmit = async (data) => {
    setSubmitting(true);
    setLoginError(null);

    console.log(data);
    try {
      const response = await axios.post(`${BASE_URL}${AUTH_PATH}`, data);
      console.log(response.data);
      setAuth(response.data);
    } catch (error) {
      console.log(error);
      setLoginError(error);
    } finally {
      setSubmitting(false);
      history.push("/products");
    }
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      style={{ maxWidth: "350px", margin: "0 auto", marginTop: "80px" }}
    >
      <h2>Login</h2>
      {loginError && <p>{loginError}</p>}
      <fieldset disabled={submitting}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="identifier"
            placeholder="Username"
            ref={register}
            type="text"
          />
          {errors.identifier && <p>{errors.identifier.message}</p>}
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            placeholder="Password"
            ref={register}
            type="password"
          />
          {errors.password && <p>{errors.password.message}</p>}
        </Form.Group>
        <Button type="submit">{submitting ? "Loggin in..." : "Login"}</Button>
      </fieldset>
    </Form>
  );
};

export default Login;
