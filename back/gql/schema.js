const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID
    name: String
    username: String
    email: String
    siteWeb: String
    description: String
    password: String
    avatar: String
    createAt: String
  }
  type Token {
    token: String
  }
  type UpdateAvatar {
    status: Boolean
    urlAvatar: String
  }
  type Publish {
    status: Boolean
    urlFile: String
  }
  type Publication {
    id: ID
    idUser: ID
    file: String
    typeFile: String
    createdAt: String
  }
  type Comment {
    idPublication: ID
    idUser: User
    comment: String
    createdAt: String
  }
  type FeedPublication {
    id: ID
    idUser: User
    file: String
    typeFile: String
    createdAt: String
  }
  input UserUpdateInput {
    name: String
    email: String
    currentPassword: String
    newPassword: String
    siteWeb: String
    description: String
  }
  input UserInput {
    name: String!
    username: String!
    email: String!
    password: String!
  }
  input LoginInput {
    email: String!
    password: String!
  }
  input CommentInput {
    idPublication: ID
    comment: String
  }
  type Query {
    #user
    getUser(id: ID, username: String): User
    search(search: String): [User]

    #follow
    isFollow(username: String!): Boolean
    getFollowers(username: String!): [User]
    getFolloweds(username: String!): [User]
    getNotFolloweds: [User]

    #publication
    getPublications(username: String!): [Publication]
    getPublicationsFolloweds: [FeedPublication]

    #Comment
    getComments(idPublication: ID!): [Comment]

    isLike(idPublication: ID!): Boolean
    countLike(idPublication: ID!): Int
  }
  type Mutation {
    #users
    register(input: UserInput): User
    login(input: LoginInput): Token
    updateAvatar(file: Upload): UpdateAvatar
    deleteAvatar: Boolean
    updateUser(input: UserUpdateInput): Boolean

    #follow
    follow(username: String!): Boolean
    unFollow(username: String!): Boolean

    #publication
    publish(file: Upload): Publish

    #comment
    addComment(input: CommentInput): Comment

    #like
    addLike(idPublication: ID!): Boolean
    deleteLike(idPublication: ID!): Boolean
  }
`;

module.exports = typeDefs;
