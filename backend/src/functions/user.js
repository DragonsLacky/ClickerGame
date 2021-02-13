import { sign } from 'jsonwebtoken';
import { SECRET } from '../config'

export const issueToken = async (user) => {
    let token = await sign(user, SECRET, { expiresIn: 84600 });
    return `Bearer ${token}`;
}

export const serializeUser = (user) => {
    const {id,username, email, firstName, lastName, avatarImage } = user;
    return {id,username, email, firstName, lastName, avatarImage };
}