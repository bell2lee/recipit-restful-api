import express, {Request, Response, NextFunction} from 'express';
import fs from 'fs';
import {dbConnect} from './middleware/db';
import {errorHandler} from "./middleware/errorHandler";

export type RestAPIMethod = 'get'|'post'|'patch'|'options'|'put';

function main(){
    const authConfig = require(__dirname + '/../config/auth.config.json');
    const app = express();
    app.use(express.json());
    app.use(dbConnect);
    app.set('jwt-secret', authConfig['secret'])
    app.use(errorHandler);

    fs.readdir('./src/api', function(err, filelist){
        filelist.forEach(file => {
            const routeName = file.replace('.ts', '');
            const route = require('./api/' + file);
            route.forEach((rut:{url:string, method: RestAPIMethod, handler:any}) => {
                app[rut.method]('/' + routeName + rut.url, rut.handler);
            });
        });
    });

    app.listen(4000,()=>{
        console.log('start on http://127.0.0.1:4000/')
    });
}

main();
