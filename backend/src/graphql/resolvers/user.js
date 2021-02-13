import { ApolloError } from "apollo-server-express";
import { hash, compare } from 'bcryptjs';
import { issueToken, serializeUser } from './../../functions'
import {UserRegistrationRules, UserAuthenticationRules} from '../../validators'

export default{
    Query: {
        showUserProfile: async (_, args, {user}) => user  ,
        userAuthenticate: async (_, {username, password}, {User}) => {

            await UserAuthenticationRules.validate({ username, password }, { abortEarly: false })

            try {
                
                let user = await User.findOne({username});
                
                if(!user){
                    throw new ApolloError("Invalid username or password")
                }
                
                let match = await compare(password, user.password);
                if(!match){
                    throw new ApolloError("Invalid username or password");
                }
                
                user = user.toObject();
                user.id = user._id;
                user = serializeUser(user);


                let token = await issueToken(user);

                return {
                    user,
                    token
                }

            } catch (err){
                throw new ApolloError(err.message, 404);
            }
        }
    },
    Mutation: {
        userRegister: async (_, { newUser }, { User } ) => {

            const {username, password, email, firstName, lastName} = newUser;

            await UserRegistrationRules.validate({username, password, email, firstName, lastName  }, { abortEarly: false });


            try {
                
                let user;
                user = await User.findOne({ username });
                if(user){
                    throw new ApolloError("Username is already in use")
                }

                user = await User.findOne({ email });

                if(user){
                    throw new ApolloError("Email is already in use");
                }

                user = new User(newUser);

                user.password = await hash(newUser.password,10);
                
                let result = await user.save();

                result = result.toObject();
                result.id = result._id;
                result = serializeUser(result);
                
                let token = await issueToken(result);

                return {
                    token,
                    user: result 
                }
                
            } catch(err){
                throw new ApolloError(err.message, 400);
            }
            
        }
    }
}