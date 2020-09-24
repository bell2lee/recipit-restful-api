import {NextFunction, Request, Response, Router} from "express";
import mongo from "mongodb";
import {HttpError} from "../middleware/errorHandler";
import * as User from "../model/user";
import * as UserLib from "../lib/user";

const userCollectionName = 'User';

const user = [
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
            await UserLib.signup(req.ctx, {
                ...req.body,
            });
            res.status(200);
            res.json({msg: "test"});
        },
    },
    {
        url: '/:id',
        method: 'patch',
        handler: async function(req:any, res:Response, next: NextFunction){
            await User.updateUser(req.ctx, {
                ...req.body,
                id: new mongo.ObjectId(new mongo.ObjectId(req.params['id'])),
            });
            res.status(200);
            res.json({msg: "test"})
        },
    },
    {
        url: '/:id',
        method: 'get',
        handler: async function(req:any, res:Response, next: NextFunction){
            const member = await User.readUser(req.ctx, {id: new mongo.ObjectId(req.params['id'])});
            res.json(member);
        },
    },
    {
        url: '/:id',
        method: 'delete',
        handler: async function(req:any, res:Response, next: NextFunction){
            const member = await User.deleteUser(req.ctx, {id: new mongo.ObjectId(req.params['id'])});
            res.json(member);
        },
    },
]

module.exports = user;