import React, { useState, useCallback } from "react";
import "./ModalUpload.scss";
import { Modal, Icon, Button, Dimmer, Loader } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { PUBLISH } from "../../../gql/publication";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
export default function ModalUpload(props) {
  const { show, setShow } = props;
  const [fileUpload, setFileUpload] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [publish] = useMutation(PUBLISH);

  const onDrop = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    setFileUpload({
      type: "image",
      file,
      preview: URL.createObjectURL(file),
    });
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    onKeyboard: true,
    multiple: false,
    onDrop,
  });

  const onClose = () => {
    setIsLoading(false);
    setFileUpload(null);
    setShow(false);
  };
  const onPublish = async () => {
    setIsLoading(true);
    try {
      const result = await publish({
        variables: {
          file: fileUpload.file,
        },
      });
      const { data } = result;
      if (!data.publish.status) {
        toast.warning("Error en la publicación");
        isLoading(false);
      } else {
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal size="small" open={show} className="modal-upload" onClose={onClose}>
      <div
        {...getRootProps()}
        className="dropzone"
        style={fileUpload && { border: 0 }}
      >
        {!fileUpload && (
          <>
            <Icon name="cloud upload" />
            <p>Arrastra la Foto que quieres publicar</p>
          </>
        )}
        <input {...getInputProps()} />
      </div>
      {fileUpload?.type === "image" && (
        <div
          className="image"
          style={{ backgroundImage: `url("${fileUpload.preview}")` }}
        />
      )}

      {fileUpload && (
        <Button className="btn-upload btn-action" onClick={onPublish}>
          Publicar
        </Button>
      )}
      {isLoading && (
        <Dimmer active className="publishing">
          <Loader />
          <p>Publicando....</p>
        </Dimmer>
      )}
    </Modal>
  );
}
