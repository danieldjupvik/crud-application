import { useState, useContext } from "react";
import { loginSchema } from "../utils/schemas";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { AUTH_PATH, BASE_URL } from "../utils/constants";
import AuthContext from "../context/AuthContext";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const history = useHistory();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const [, setAuth] = useContext(AuthContext);

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
    <form onSubmit={handleSubmit(onSubmit)}>
      {loginError && <p>{loginError}</p>}
      <fieldset disabled={submitting}>
        <div>
          <input
            name="identifier"
            placeholder="Username"
            ref={register}
            type="text"
          />
          {errors.identifier && <p>{errors.identifier.message}</p>}
        </div>

        <div>
          <input
            name="password"
            placeholder="Password"
            ref={register}
            type="password"
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit">{submitting ? "Loggin in..." : "Login"}</button>
      </fieldset>
    </form>
  );
};

export default Login;
