import React from "react";
import { useMutation } from "@apollo/client";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import "./RegisterForm.scss";
import { REGISTER } from "../../../gql/user";

export default function RegisterForm(props) {
  const { setShowLogin } = props;

  //usar mutation

  const [register] = useMutation(REGISTER);

  //formik
  const formik = useFormik({
    initialValues: initialValue(),
    validationSchema: Yup.object({
      name: Yup.string().required("Tu nombre es obligatorio"),
      username: Yup.string()
        .matches(/^[a-zA-Z0-9-]*$/, "El nombre no puede tener espacios")
        .required("El nombre de usuario es Obligatorio"),
      email: Yup.string()
        .email("El email no es valido")
        .required("El mail es obligatorio"),
      password: Yup.string()
        .required("la contraseña es obligatoria")
        .oneOf([Yup.ref("repeatpassword")], "Las contraseña no son iguales"),
      repeatpassword: Yup.string()
        .required("la contraseña es obligatoria")
        .oneOf([Yup.ref("password")], "Las contraseñas no son iguales"),
    }),
    onSubmit: async (formData) => {
      try {
        const newUser = formData;
        delete newUser.repeatpassword;
        await register({
          variables: {
            input: newUser,
          },
        });
        toast.success("El usuario se registro Correctamente");
        setShowLogin(true);
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return (
    <>
      <h2 className="register-form-title">
        Registrate para ver Videos de tus amigos
      </h2>
      <Form className="register-form" onSubmit={formik.handleSubmit}>
        <Form.Input
          type="text"
          name="name"
          placeholder="Nombre y Apellido"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.errors.name && true}
        />
        <Form.Input
          type="text"
          name="username"
          placeholder="Nombre de Usuario"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.errors.username && true}
        />
        <Form.Input
          type="text"
          name="email"
          placeholder="Correo Electronico"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email && true}
        />
        <Form.Input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.errors.password && true}
        />
        <Form.Input
          type="password"
          name="repeatpassword"
          placeholder="Confirma tu Contraseña"
          value={formik.values.repeatpassword}
          onChange={formik.handleChange}
          error={formik.errors.repeatpassword && true}
        />
        <Button type="submit" className="btn-submit">
          Registrarse
        </Button>
      </Form>
    </>
  );
}
function initialValue() {
  return {
    name: "",
    username: "",
    email: "",
    password: "",
    repeatpassword: "",
  };
}
