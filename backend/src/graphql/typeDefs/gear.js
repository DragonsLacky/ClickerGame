import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        getEquippedGear: [Gear]
        getAllGear: [Gear]
    }
    
    extend type Mutation {
        createGear: Gear!
        equipGear(id:ID!): Gear!
        unEquipGear(id:ID!): Gear!
    }

    type Gear {
        id:ID!
        image: String!
        multilpier: Int!
        type: String!
        rarity: String!
        name: String!
        equipped: Boolean!
    }
`;
