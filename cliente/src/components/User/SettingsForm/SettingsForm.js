import React from "react";
import { Button } from "semantic-ui-react";
import useAuth from "../../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import PasswordForm from "../PasswordForm";
import DescriptionForm from "../DescriptionForm";
import SiteWebForm from "../SiteWebForm";
import "./SettingsForm.scss";
import EmailForm from "../EmailForm";
export default function SettingsForm(props) {
  const {
    setShowModal,
    setChildrenModal,
    setTitleModal,
    getUser,
    refetch,
  } = props;
  const history = useHistory();
  const client = useApolloClient();
  const { logOut } = useAuth();

  const onChangePassword = () => {
    setTitleModal("Cambiar tu Password");
    setChildrenModal(<PasswordForm onLogout={onLogout} />);
  };

  const onChangeEmail = () => {
    setTitleModal("Cambia tu email");
    setChildrenModal(
      <EmailForm
        refetch={refetch}
        setShowModal={setShowModal}
        currentEmail={getUser.email}
      />
    );
  };
  const onChangeSiteWeb = () => {
    setTitleModal("Cambia la direccion de tu sitio Web");
    setChildrenModal(
      <SiteWebForm
        refetch={refetch}
        setShowModal={setShowModal}
        currentSiteWeb={getUser.siteWeb}
      />
    );
  };

  const onChangeDescription = () => {
    setTitleModal("Actualizar tu Descripcion");
    setChildrenModal(
      <DescriptionForm
        setShowModal={setShowModal}
        currentDescription={getUser.description}
        refetch={refetch}
      />
    );
  };
  const onLogout = () => {
    client.clearStore();
    logOut();
    history.push("/");
  };
  return (
    <div className="settings-form">
      <Button onClick={onChangePassword}>Cambiar Contraseña</Button>
      <Button onClick={onChangeEmail}>Cambiar Email</Button>
      <Button onClick={onChangeDescription}>Cambiar Descripcion</Button>
      <Button onClick={onChangeSiteWeb}>Cambiar Sitio Web</Button>
      <Button onClick={onLogout}>Cerrar Sesion</Button>
      <Button onClick={() => setShowModal(false)}>Cancelar</Button>
    </div>
  );
}
