import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        getArtefacts: [Artefact!]!
        getHeroArtefacts: [HeroArtefact]!
    }
    extend type Mutation {
        createArtefact: Artefact!
        level_up_artefact(id:ID): HeroArtefactResPoints!
    }
    type Artefact {
        id:ID!
        name: String!
        image: String!
        multilpier: Float!
        stat: String!
        rarity: String!
        cost: Float!
    }

    type HeroArtefactResPoints {
        HeroArtefact: HeroArtefact!
        resurection_points: Int!
        playerstat: String!
        multilpier: Float!
    }
`;
