import {NextFunction, Request, Response, Router} from "express";


const user = [
    {
        url: '/',
        method: 'get',
        handler: async function(req:Request, res:Response, next: NextFunction){
            console.log(req.ctx);
            res.send('hello');
        },
    },
]

module.exports = user;