import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        getCompanions: [Companion!]!
        getHeroCompanions: [HeroCompanion]!
    }

    extend type Mutation {
        createCompanion(id:ID!): Companion!
        level_up_companion(id:ID!): HeroCompanion!
    }
    
    type Companion {
        id:ID!
        name: String!
        dps: Float!
        image: String!
        cost: Float!
    }
`;
