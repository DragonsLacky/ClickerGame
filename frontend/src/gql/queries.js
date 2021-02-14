import gql from 'graphql-tag';

export const AUTHENTICATED_USER = gql`
    query USER_PROFILE{
        showUserProfile{
            id
            username
            email
            firstName
            lastName
            avatarImage
        }
    }
`

export const AUTHENTICATE_USER = gql`
    query LOGIN_USER($username:String!, $password:String!) {
        userAuthenticate(username:$username,password:$password) {
        user {
            id
            username
            email
            firstName
            lastName
            avatarImage
        }
        token
        }
    }
`

export const GET_COMPANIONS = gql `
query GET_COMPANIONS {
  getCompanions{
    id
    name
    image
    cost
    dps
  }
}`

export const GET_HERO = gql `
query GET_HERO {
    getHero{
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
            drop_chance
            level
            defeated
        }
        owner{
            id
            username
            email
        }
    }
    getCompanions{
        id
        name
        image
        cost
        dps
    }
}`