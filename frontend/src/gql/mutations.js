import gql from 'graphql-tag'

export const REGISTER_USER = gql `
    mutation REGISTER_USER($username:String!, $password:String!, $email:String!, $firstName:String!, $lastName:String!, $avatarImage:String) {
    userRegister(
        newUser:{
            username:$username,
            password:$password,
            email:$email,
            firstName:$firstName,
            lastName:$lastName,
            avatarImage:$avatarImage
        }){
        token
            user{
                id
                username
                email
                firstName
                lastName
                avatarImage
            }
        }
    } 
`;

export const BUY_ARTEFACT = gql `
    mutation CREATE_ARTEFACT{
        createArtefact {
            id
            name
            image
            multilpier
            stat
            rarity
            cost
        }
    }
`;

export const KILL_MONSTER = gql `
    mutation CREATE_AND_REPLACE {
        createAndReplace{
            monster {
                health
                type
                gold
                image
                drop_chance
            }
            award
            drop_chance
            defeated
            level
            owner {
                level
                balance
                damage
                resurection_points
                critical_chance
                critical_damage
                damage
                all_damage
                companion_damage
                hero_damage
            }
        }
    }
`

export const ROLL_GEAR = gql `
    mutation CREATE_GEAR {
        createGear{
            id
            name
            image
            type
            rarity
            multilpier
            equipped
        }
    }
`

export const GEAR_EQUIP = gql `
    mutation GEAR_EQUIP($id:ID!){
        equipGear(id:$id){
            id
            name
            image
            type
            rarity
            multilpier
            equipped
            owner{
                boss_gold
                companion_damage
                critical_chance
                critical_damage
                luck
                hero_damage
            }
        }
    }
`

export const GEAR_UNEQUIP = gql `
    mutation GEAR_UNEQUIP($id:ID!){
        unEquipGear(id:$id){
            id
            name
            image
            type
            rarity
            multilpier
            equipped
            owner{
                boss_gold
                companion_damage
                critical_chance
                critical_damage
                luck
                hero_damage
            }
        }
    }
`

export const ARTEFACT_LEVEL_UP = gql `
        mutation ARTEFACT_LEVEL_UP($id:ID){
        level_up_artefact(id:$id){
            HeroArtefact {
                id
                artefact {
                    id
                    name
                    image
                    multilpier
                    stat
                    rarity
                    cost
                }
                level
            }
            resurection_points
            multilpier
            playerstat
        }
    }
`

export const HERO_LEVEL_UP = gql `
    mutation HERO_LEVEL_UP($levels:Int!) {
        level_up(levels:$levels){
            id
            level
            balance
            damage
            level_up
            resurection_points
            resurection_bonus
            critical_chance
            critical_damage
            all_damage
            companion_damage
            hero_damage
            boss_gold
            upgrade_cost
            luck
            companions {
                id
                companion {
                    id
                    name
                    dps
                    image
                    cost
                }
                level
            }
            artefacts {
                id
                artefact {
                    id
                    name
                    image
                    multilpier
                    stat
                    rarity
                    cost
                }
                level
            }
            gearpieces {
                id
                image
                multilpier
                type
                rarity
                name
                equipped
            }
            zone {
                monster {
                    health
                    image
                    type
                    drop_chance
                    gold
                }
                award
                drop_chance
                level
                defeated
            }
            owner {
                id
                username
                email
            }
        }
    }
`

export const BUY_COMPANION = gql `
    mutation CREATE_COMPANION($id:ID!){
        createCompanion(id:$id){
            HeroCompanion {
                id
                companion {
                    id
                    name
                    dps
                    image
                    cost
                }
                level
            }
            balance
        }
    }
`

export const COMPANION_LEVEL_IP = gql `
    mutation COMPANION_LEVEL_UP($id:ID!,$levels:Int!) {
        level_up_companion(id:$id,levels:$levels) {
            HeroCompanion {
                id
                companion {
                    id
                    name
                    dps
                    image
                    cost
                }
                level
            }
            balance
        }
    }
`

export const CREATE_HERO = gql `
    mutation CREATE_HERO {
	createHero{
    id
    level
    balance
    damage
    level_up
    resurection_points
    resurection_bonus
    critical_chance
    critical_damage
    all_damage
    companion_damage
    hero_damage
    boss_gold
    upgrade_cost
    luck
    companions{
      companion{
        id
        name
        dps
        image
        cost
      }
      level
    }
    artefacts{
      artefact{
        id
        name
        image
        multilpier
        stat
        rarity
        cost
      }
      level
    }
    gearpieces{
      id
      image
      multilpier
      type
      rarity
      name
      equipped
    }
    zone{
      monster{
        health
        image
        type
        drop_chance
        gold
      }
      award
      drop_chance
      level
    }
    owner{
      id
      username
      email
    }
  }
}
`

export const RESURECT_HERO = gql `
    mutation RESURECT_HERO {
  resetHero{
    id
    level
    balance
    damage
    level_up
    resurection_points
    resurection_bonus
    critical_chance
    critical_damage
    all_damage
    companion_damage
    hero_damage
    boss_gold
    upgrade_cost
    luck
    companions{
      id
      companion{
        id
        name
        dps
        image
        cost
      }
      level
    }
    artefacts{
      id
      artefact{
        id
        name
        image
        multilpier
        stat
        rarity
        cost
      }
      level
    }
    gearpieces{
      id
      image
      multilpier
      type
      rarity
      name
      equipped
    }
    zone{
      monster{
        health
        image
        type
        drop_chance
        gold
      }
      award
      defeated
      drop_chance
      level
    }
    owner{
      id
      username
      email
    }
  }
}
`