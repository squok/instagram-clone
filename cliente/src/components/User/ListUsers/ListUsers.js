import React from "react";
import "./ListUsers.scss";
import { Image } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import ImageNoFound from "../../../assets/png/avatar.png";
import { size, map } from "lodash";

export default function ListUsers(props) {
  const { users, setShowModal } = props;
  const history = useHistory();

  const goToUser = (username) => {
    setShowModal(false);
    history.push(`/${username}`);
  };

  return (
    <div className="list-users">
      {size(users) === 0 ? (
        <p className="list-users__not-users">No se Encontraron usuarios</p>
      ) : (
        map(users, (user, index) => (
          <div
            className="list-users__user"
            onClick={() => goToUser(user.username)}
            key={index}
          >
            <Image src={user.avatar || ImageNoFound} avatar />
            <div>
              <p>{user.name}</p>
              <p>{user.username}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
