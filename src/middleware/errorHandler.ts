import {Request, Response, NextFunction} from 'express';

export class HttpError {
    public message: string;
    public status: number;

    constructor(status:number, message:string) {
        this.message = message;
        this.status = status;
    }
}

export function errorHandler(err: any, req: any, res: any, next: any) {
    console.log("!");
    res.status(err.status !== undefined ? 500 : err.status).json({msg: err.msg});
}