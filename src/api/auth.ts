import {NextFunction, Request, Response, Router} from "express";
import mongo from "mongodb";
import {HttpError} from "../middleware/errorHandler";
import * as User from "../model/user";
import * as UserLib from "../lib/user";

const auth = [
    {
        url: '/',
        method: 'get',
        handler: async function(req:any, res:Response, next: NextFunction){
            const members = await User.readUsers(req.ctx);
            res.json(members);
        },
    },
    {
        url: '/',
        method: 'post',
        handler: async function(req:any, res:Response, next: NextFunction){
            const [username, password] = [req.body.username, req.body.password];
            // console.log(await UserLib.login(username, password));
            // console.log(username, password);
            res.json({msg:'ok'});
        },
    },
]

module.exports = auth;