import React from "react";
import { Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { map } from "lodash";
import { useQuery } from "@apollo/client";
import { GET_NOT_FOLLOWEDS } from "../../../gql/follow";
import "./UserNotFolloweds.scss";
import ImageNotFound from "../../../assets/png/avatar.png";
export default function UserNotFolloweds() {
  const { data, loading } = useQuery(GET_NOT_FOLLOWEDS);
  if (loading) return null;
  const { getNotFolloweds } = data;
  console.log(getNotFolloweds);
  return (
    <div className="users-not-followeds">
      <h3>Usuarios que no Sigues</h3>
      {map(getNotFolloweds, (user, index) => (
        <Link
          to={`/${user.username}`}
          key={index}
          className="users-not-followeds__user"
        >
          <Image src={user.avatar || ImageNotFound} avatar />
          <span>{user.name}</span>
        </Link>
      ))}
    </div>
  );
}
