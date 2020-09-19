import {NextFunction, Request, Response, Router} from "express";
import {HttpError} from "../middleware/errorHandler";
import * as User from "../model/user";

const userCollectionName = 'User';

const user = [
    {
        url: '/',
        method: 'get',
        handler: async function(req:any, res:Response, next: NextFunction){
            res.send('hello');
            throw new HttpError(500, "test");
        },
    },
    {
        url: '/',
        method: 'post',
        handler: async function(req:any, res:Response, next: NextFunction){
            await User.createUser(req.ctx, {
                ...req.body,
            });
            res.status(200);
            res.json({msg: "test"})
        },
    },
    {
        url: '/',
        method: 'patch',
        handler: async function(req:any, res:Response, next: NextFunction){
            await User.updateUser(req.ctx, {
                ...req.body,
            });
            res.status(200);
            res.json({msg: "test"})
        },
    },

]

module.exports = user;