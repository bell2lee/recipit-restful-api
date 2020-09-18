import {Request, Response, NextFunction} from 'express';

export class HttpError {
    public message: string;
    public status: number;

    constructor(status:number, message:string) {
        this.message = message;
        this.status = status;
    }
}

export const errorHandler = async (req: Request, res:Response, next:NextFunction) => {
    try{
        await next();
    }catch(e){
        console.log(e);
    }
};
