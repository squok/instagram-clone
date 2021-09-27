import React from "react";
import "./EmailForm.scss";

import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../gql/user";

import * as Yup from "yup";
import { Form, Button } from "semantic-ui-react";
import { toast } from "react-toastify";

export default function EmailForm(props) {
  const { setShowModal, currentEmail, refetch } = props;
  const [updateUser] = useMutation(UPDATE_USER);

  const formik = useFormik({
    initialValues: {
      email: currentEmail || "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
    }),
    onSubmit: async (formData) => {
      console.log(formData);
      try {
        await updateUser({
          variables: {
            input: formData,
          },
        });
        refetch();
        setShowModal(false);
      } catch (error) {
        toast.error("Error al actualizar el Email");
        console.log(error);
      }
    },
  });
  return (
    <Form className="email-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        placeholder="Escribe tu nuevo email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.errors.email && true}
      />
      <Button className="btn-submit" type="submit">
        Actualizar
      </Button>
    </Form>
  );
}
