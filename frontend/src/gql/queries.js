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