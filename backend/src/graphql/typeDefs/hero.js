import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        getHero: Hero!
    }
    
    extend type Mutation {
        createHero: Hero!
        level_up(levels:Int!): Hero!
        resetHero: Hero!
    }

    input HeroInput {
        owner: ID! 
    }

    type Hero {
        id:ID!
        level: Int!
        balance: Int!
        damage: Float!
        resurection_points: Int!
        resurection_bonus: Float!
        critical_chance: Float!
        critical_damage: Float!
        all_damage: Float!
        companion_damage: Float!
        hero_damage:Float!
        boss_gold:Float!
        upgrade_cost:Float!
        luck: Float!
        level_up: Float!
        owner : User!
        companions: [HeroCompanion]
        artefacts: [HeroArtefact]
        gearpieces: [Gear]
        zone: Zone
    }

    type HeroArtefact {
        id:ID!
        artefact: Artefact!
        level: Int!
    }
    type HeroCompanion {
        id:ID!
        companion: Companion
        level: Int
    }
`;
