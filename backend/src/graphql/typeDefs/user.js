import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        userLogin: User! @isAuth
        showUserProfile : User!
        userAuthenticate(username: String!, password: String!): AuthResponse!
    }
    extend type Mutation {
        userRegister(newUser: UserInput!): AuthResponse!
    }

    input UserInput {
        username: String!
        password: String!
        email: String!
        firstName: String!
        lastName: String!
        avatarImage: String
    }

    type User {
        id:ID!
        username: String!
        email: String!
        firstName: String!
        lastName: String!
        avatarImage: String
    }

    type AuthResponse {
        user: User!,
        token: String!
    }
`;
