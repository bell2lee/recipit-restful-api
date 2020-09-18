import {Request, Response, NextFunction} from 'express';
import * as mongo from 'mongodb';

const dbConfig = require(__dirname + '/../../config/db.config.json');

export const dbConnect = async (req: any, res:Response, next:NextFunction) => {
    const client = await mongo.MongoClient.connect(
        "mongodb://localhost:27017",
        {useUnifiedTopology: true}
    );
    const db = client.db("taric");
    req.ctx = {};
    req.ctx['datetime'] = new Date();
    req.ctx['db'] = db;
    await next();
};
