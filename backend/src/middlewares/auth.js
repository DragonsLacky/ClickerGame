import { SECRET } from '../config'
import { verify } from 'jsonwebtoken'
import { User } from '../models'

const AuthMiddleware = async (req, res, next) => {
    const authHeaders = req.get("Authorization");
    if(!authHeaders){
        req.isAuth = false;
        return next(); 
    }
    let token = authHeaders.split(' ')[1];
    if(!token || token === ''){
        req.isAuth = false;
        return next();
    }

    let decodedToken;

    try {
         decodedToken = verify(token, SECRET);
    } catch(err){
        req.isAuth = false;
        return next();
    }

    if(!decodedToken){
        req.isAuth = false;
        return next();
    }

    let user = await User.findById(decodedToken.id);
    if(!user){
        req.isAuth = false;
        return next();
    }

    req.user = user;
    req.isAuth = true;

    return next();
}

export default AuthMiddleware;