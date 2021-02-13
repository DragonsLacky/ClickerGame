import { gql } from 'apollo-server-express';

export default gql`
    directive @isAuth on FIELD_DEFINITION
    type Query {
        _:String!
        Hello: String!
    }
    type Mutation {
        _:String!
    }
    type Subscriptions {
        _:String!
    }
`;