import React from "react";
import "./ModalPublication.scss";
import { Modal, Grid } from "semantic-ui-react";
import Comment from "./Comment";
import Actions from "./Actions";
import CommentForm from "./CommentForm";
export default function ModalPublication(props) {
  const { show, setShow, publication } = props;
  console.log(publication);
  const onClose = () => setShow(false);
  return (
    <Modal open={show} onClose={onClose} className="modal-publication">
      <Grid>
        <Grid.Column
          className="modal-publication__left"
          width={10}
          style={{ backgroundImage: `url("${publication.file}")` }}
        />
        <Grid.Column className="modal-publication__right" width={6}>
          <Comment publication={publication} />
          <Actions publication={publication} />
          <CommentForm publication={publication} />
        </Grid.Column>
      </Grid>
    </Modal>
  );
}
