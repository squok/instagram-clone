import React from "react";
import "./PasswordForm.scss";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../gql/user";
import * as Yup from "yup";
import { Form, Button } from "semantic-ui-react";

import { toast } from "react-toastify";

export default function PasswordForm(props) {
  const { onLogout } = props;
  const [updateUser] = useMutation(UPDATE_USER);
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object({
      currentPassword: Yup.string().required(),
      newPassword: Yup.string()
        .required()
        .oneOf([Yup.ref("repeatNewPassword")]),
      repeatNewPassword: Yup.string()
        .required()
        .oneOf([Yup.ref("newPassword")]),
    }),
    onSubmit: async (formValues) => {
      try {
        const result = await updateUser({
          variables: {
            input: {
              currentPassword: formValues.currentPassword,
              newPassword: formValues.newPassword,
            },
          },
        });
        if (!result.data.updateUser) {
          toast.error("Error al cambiar la contraseña");
        } else {
          onLogout();
        }
      } catch (error) {
        toast.error("error al cambiar la contraseña");
      }
    },
  });

  return (
    <Form className="password-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        type="password"
        placeholder="Contraseña Actual"
        name="currentPassword"
        value={formik.values.currentPassword}
        onChange={formik.handleChange}
        error={formik.errors.currentPassword && true}
      />
      <Form.Input
        type="password"
        placeholder="Contraseña Nueva"
        name="newPassword"
        value={formik.values.newPassword}
        onChange={formik.handleChange}
        error={formik.errors.newPassword && true}
      />
      <Form.Input
        type="password"
        placeholder="Repetir nueva Contraseña"
        name="repeatNewPassword"
        value={formik.values.repeatNewPassword}
        onChange={formik.handleChange}
        error={formik.errors.repeatNewPassword && true}
      />
      <Button className="btn-submit" type="submit">
        Actualizar
      </Button>
    </Form>
  );
}
function initialValues() {
  return {
    currentPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  };
}
