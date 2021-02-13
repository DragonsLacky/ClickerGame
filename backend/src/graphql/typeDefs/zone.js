import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        getZone: Zone!
    }
    
    extend type Mutation {
        createZone: Zone!
    }

    type Zone {
        monster: Monster!
        award: Int!
        drop_chance: Float!
        defeated: Int!
        level: Int!
        owner: Hero!
    }
`;
