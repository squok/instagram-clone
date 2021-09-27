import React from "react";
import "./HeaderProfile.scss";
import { useQuery, useMutation } from "@apollo/client";
import { IS_FOLLOW, FOLLOW, UN_FOLLOW } from "../../../../gql/follow";
import { Button } from "semantic-ui-react";
export default function HeaderProfile(props) {
  const { getUser, auth, handleModal } = props;
  const { data, loading, refetch } = useQuery(IS_FOLLOW, {
    variables: { username: getUser.username },
  });
  const [follow] = useMutation(FOLLOW);

  const [unFollow] = useMutation(UN_FOLLOW);

  const buttonFollow = () => {
    if (data.isFollow) {
      return (
        <Button className="btn-danger" onClick={onUnFollow}>
          UnFollow
        </Button>
      );
    } else {
      return (
        <Button className="btn-action" onClick={onFollow}>
          Follow!
        </Button>
      );
    }
  };

  const onFollow = async () => {
    try {
      await follow({
        variables: {
          username: getUser.username,
        },
      });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };
  const onUnFollow = async () => {
    try {
      await unFollow({
        variables: {
          username: getUser.username,
        },
      });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="header-profile">
      <h2>{getUser.username}</h2>
      {getUser.username === auth.username ? (
        <Button onClick={() => handleModal("settings")}>Ajustes</Button>
      ) : (
        !loading && buttonFollow()
      )}
    </div>
  );
}
