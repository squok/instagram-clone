import { gql } from "@apollo/client";

export const PUBLISH = gql`
  mutation publish($file: Upload) {
    publish(file: $file) {
      status
      urlFile
    }
  }
`;
export const GET_PUBLICATIONS = gql`
  query getPublications($username: String!) {
    getPublications(username: $username) {
      id
      idUser
      typeFile
      file
    }
  }
`;
export const GET_PUBLICATION_FOLLOWEDS = gql`
  query getPublicationsFolloweds {
    getPublicationsFolloweds {
      id
      idUser {
        name
        username
        avatar
      }
      file
      typeFile
    }
  }
`;
