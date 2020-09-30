import {Request, Response, NextFunction} from 'express';

export class HttpError {
    public message: string;
    public status: number;

    constructor(status:number, message:string) {
        this.message = message;
        this.status = status;
    }
}

export function logErrors(err: any, req: any, res: any, next: any) {
    console.error(err.stack);
    console.error(err)
    console.log("!!!!!!!!!!!!!!!!!!");
    next(err);
}

export async function errorHandler(req: any, res: any, next: any) {
    try{
        await next();
    }catch(e){
        console.log("!");

        res.status(e.status !== undefined ? 500 : e.status).json({msg: e.msg});
    }
}