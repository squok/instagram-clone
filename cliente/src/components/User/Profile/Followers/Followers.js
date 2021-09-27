import React, { useEffect, useState } from "react";
import { size } from "lodash";

import ModalBasic from "../../../Modal/ModalBasic";
import { useQuery } from "@apollo/client";
import { GET_FOLLOWERS, GET_FOLLOWEDS } from "../../../../gql/follow";
import ListUsers from "../../ListUsers";
import "./Followers.scss";
export default function Followers(props) {
  const { username, totalPublications } = props;
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [childrenModal, setChildrenModal] = useState(null);

  const {
    data: dataFollowers,
    loading: loadingFollowers,
    startPolling: startPollingFollower,
    stopPolling: stopPollingFollower,
  } = useQuery(GET_FOLLOWERS, {
    variables: { username },
  });
  const {
    data: dataFolloweds,
    loading: loadingFolloweds,
    startPolling: startPollingFollowed,
    stopPolling: stopPollingFollowed,
  } = useQuery(GET_FOLLOWEDS, {
    variables: { username },
  });

  useEffect(() => {
    startPollingFollower(1000);
    return () => {
      stopPollingFollower();
    };
  }, [startPollingFollower, stopPollingFollower]);

  useEffect(() => {
    startPollingFollowed(1000);
    return () => {
      stopPollingFollowed();
    };
  }, [startPollingFollowed, stopPollingFollowed]);

  const openFollowers = () => {
    setTitleModal("Seguidores");
    setChildrenModal(
      <ListUsers users={getFollowers} setShowModal={setShowModal} />
    );
    setShowModal(true);
  };
  const openFolloweds = () => {
    setTitleModal("Seguidos");
    setChildrenModal(
      <ListUsers users={getFolloweds} setShowModal={setShowModal} />
    );
    setShowModal(true);
  };

  if (loadingFollowers || loadingFolloweds) return null;
  const { getFollowers } = dataFollowers;
  const { getFolloweds } = dataFolloweds;

  return (
    <>
      <div className="followers">
        <p>
          <span>{totalPublications}</span> Publicaciones
        </p>
        <p className="link" onClick={openFollowers}>
          <span>{size(getFollowers)}</span> Seguidores
        </p>
        <p className="link" onClick={openFolloweds}>
          <span>{size(getFolloweds)}</span> Seguidos
        </p>
      </div>
      <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
        {childrenModal}
      </ModalBasic>
    </>
  );
}
