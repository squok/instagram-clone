import React, { useState, useEffect } from "react";
import "./Feed.scss";
import { Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import ImageNoFound from "../../../assets/png/avatar.png";
import { map } from "lodash";
import { GET_PUBLICATION_FOLLOWEDS } from "../../../gql/publication";
import Action from "../../Modal/ModalPublication/Actions";
import CommentForm from "../../Modal/ModalPublication/CommentForm";
import ModalPublication from "../../Modal/ModalPublication";
export default function Feed() {
  const { data, loading, startPolling, stopPolling } = useQuery(
    GET_PUBLICATION_FOLLOWEDS
  );
  const [showModal, setShowModal] = useState(false);
  const [publicationSelect, setPublicationSelect] = useState(null);

  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (loading) return null;
  const { getPublicationsFolloweds } = data;
  const openPublication = (publication) => {
    setPublicationSelect(publication);
    setShowModal(true);
  };

  return (
    <>
      <div className="feed">
        {map(getPublicationsFolloweds, (publication, index) => (
          <div key={index} className="feed__box">
            <Link to={`/${publication.idUser.username}`}>
              <div className="feed__box-user">
                <Image src={publication.idUser.avatar || ImageNoFound} avatar />
                <span>{publication.idUser.name}</span>
              </div>
            </Link>
            <div
              className="feed__box-photo"
              onClick={() => openPublication(publication)}
              style={{ backgroundImage: `url("${publication.file}")` }}
            />
            <div className="feed__box-action">
              <Action publication={publication} />
            </div>
            <div className="feed__box-form">
              <CommentForm publication={publication} />
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <ModalPublication
          show={showModal}
          setShow={setShowModal}
          publication={publicationSelect}
        />
      )}
    </>
  );
}
