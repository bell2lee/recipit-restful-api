import {NextFunction, Request, Response, Router} from "express";
import mongo from "mongodb";
import {HttpError} from "../middleware/errorHandler";
import * as User from "../model/user";
import * as UserLib from "../lib/user";
import jwt from "jsonwebtoken";

const auth = [
    {
        url: '/',
        method: 'get',
        handler: async function(req:any, res:Response, next: NextFunction){
            // const members = await User.readUsers(req.ctx);

            // throw(new HttpError(500, "TEST"));
            res.status(500);
            res.json({test:"TEST"});
            // throw(new Error("TESt"));
            // res.json(members);
        },
    },
    {
        url: '/',
        method: 'post',
        handler: async function(req:any, res:Response, next: NextFunction){
            const [username, password] = [req.body.username, req.body.password];
            try
            {
                const user = await UserLib.verificationUser(req.ctx, {username, password});
                res.json(user);
            }
            catch (e)
            {
                if(e instanceof TypeError)
                {
                    throw(new HttpError(404, '해당 회원은 존재하지 않거나 올바르지 않은 입력입니다.'))
                }
                else
                {
                    throw(new HttpError(500, '백엔드 서버 처리 과정에서 Error가 발생했습니다.'))
                }
            }

        },
    },
]

module.exports = auth;