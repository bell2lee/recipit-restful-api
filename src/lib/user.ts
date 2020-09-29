import * as User from '../model/user';
const securityConfig = require(__dirname + '/../../config/security.config.json');
import crypto from 'crypto';
import {HttpError} from "../middleware/errorHandler";

export function makePassword(password: User.PassWord){
    return crypto.createHash('sha256').update(password + securityConfig.secret).digest('base64');
}

export async function verificationUser(
    ctx: any,
    args: {
        username: User.UserName,
        password: User.PassWord,
    },
){
    let user = await User.readUser(ctx,{
        username: args.username,
        password: makePassword(args.password),
    });
    delete user.password;

    return user;



}

export async function signup(ctx: any, args: {
    username: User.UserName,
    password: User.PassWord,
    name: User.Name,
    email: User.Email,
})
{
    await User.createUser(ctx, {
        username: args.username,
        password: makePassword(args.password),
        name: args.name,
        email: args.email,
        isActive: true,
        isAdmin: false,
    });
}