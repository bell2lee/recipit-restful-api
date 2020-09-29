import express, {Request, Response, NextFunction} from 'express';
import fs from 'fs';
import {dbConnect} from './middleware/db';
import {errorHandler} from "./middleware/errorHandler";
import ErrnoException = NodeJS.ErrnoException;

export type RestAPIMethod = 'get'|'post'|'patch'|'options'|'put';

function main(){
    const authConfig = require(__dirname + '/../config/auth.config.json');
    const app = express();
    app.use(function(req:Request, res:Response, next:NextFunction){next('err')});
    app.use(express.json());
    app.use(dbConnect);
    app.set('jwt-secret', authConfig['secret']);
    fs.readdir('./src/api', function(err:ErrnoException | null, filelist:string[]){
        filelist.forEach(file => {
            const routeName = file.replace('.ts', '');
            const route = require('./api/' + file);
            route.forEach((rut:{url:string, method: RestAPIMethod, handler:any}) => {
                app[rut.method]('/' + routeName + rut.url, rut.handler);
            });
        });
    });

    app.use(errorHandler);

    app.listen(4000,()=>{
        console.log('start on http://127.0.0.1:4000/')
    });
}

main();
