import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        getMonster: Monster!
    }
    
    extend type Mutation {
        createMonster: Monster!
        createAndReplace: Monster!
    }

    type Monster {
        health: Int!
        image: String!
        type: String!
        drop_chance: Float!
        gold: Int!
    }
`;
