import { config } from 'dotenv';
config();

import express, { Express } from 'express';
import bodyParser from 'body-parser';
import Controller from './interfaces/controller.interface';
import useJwtStartegy from './passport/jwt.strategy';
import mongoose from 'mongoose';
import errorMiddleware from './middlewares/error.middleware';

export default class App {
    public app: Express = express();

    constructor(controllers: Controller[]) {
        this.initMiddlewares();
        this.initPassport();
        this.connectDatabase();
        this.useControllers(controllers);
        this.app.use(errorMiddleware);
    }

    private initMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    private initPassport() {
        useJwtStartegy();
    }

    private connectDatabase() {
        const databaseURL = process.env.DATABASE_URL;
        if (!databaseURL) {
            console.log('Please, provide database url to connect database');
            return;
        }
        mongoose.connect(databaseURL, {}).then(() => {
            console.log('database connected');
        });
    }

    private useControllers(controllers: Controller[]) {
        controllers.forEach((controller) => {
            this.app.use(controller.path, controller.router);
        });
    }

    public listen(port: string | number | undefined = process.env.PORT) {
        this.app.listen(port || 8080, () => {
            console.log(`Sever is started, listen: localhost:${port}`);
        });
    }
}
