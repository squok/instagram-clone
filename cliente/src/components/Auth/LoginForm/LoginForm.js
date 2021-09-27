import React, { useState } from "react";
import "./LoginForm.scss";
import { Form, Button } from "semantic-ui-react";
import * as Yup from "yup";

import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import { setToken, decodeToken } from "../../../utils/token";
import { LOGIN } from "../../../gql/user";
import useAuth from "../../../hooks/useAuth";

export default function LoginForm() {
  const [error, setError] = useState("");
  const [login] = useMutation(LOGIN);

  const { setUser } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email no valido")
        .required("Email Obligatorio"),
      password: Yup.string().required("La contraseña es obligatoria"),
    }),
    onSubmit: async (formData) => {
      setError("");
      try {
        const { data } = await login({
          variables: {
            input: formData,
          },
        });

        const { token } = data.login;
        setToken(token);
        setUser(decodeToken(token));
      } catch (error) {
        setError(error.message);
      }
    },
  });
  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <h2 className="login-form-title">Inicia Sesión</h2>
      <Form.Input
        type="text"
        placeholder="Correo Electronico"
        onChange={formik.handleChange}
        value={formik.values.email}
        name="email"
        error={formik.errors.email && true}
      />
      <Form.Input
        type="password"
        onChange={formik.handleChange}
        placeholder="Correo Electronico"
        name="password"
        value={formik.values.password}
        error={formik.errors.password && true}
      />
      <Button type="submit" className="btn-submit">
        Iniciar Sesión
      </Button>
      {error && <p className="submit-errpr">{error}</p>}
    </Form>
  );
}
function initialValues() {
  return {
    email: "",
    password: "",
  };
}
