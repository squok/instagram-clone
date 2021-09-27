import React from "react";
import "./UserNotFound.scss";
import { Link } from "react-router-dom";
export default function UserNotFound() {
  return (
    <div className="user-not-found">
      <p>Usuario no Encontrado</p>
      <p>
        Es posible que el usuario que estas buscando este mal escrito, o este
        fue eliminado
      </p>
      <Link to="/">Volver a la Pagina principal</Link>
    </div>
  );
}
