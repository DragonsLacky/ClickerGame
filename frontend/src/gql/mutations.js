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