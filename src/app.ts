import express from 'express';
import engines from 'consolidate';
import path from 'node:path';
import cookieParser from 'cookie-parser';
import IndexRouter from './routes/index.js';
import APIRouter from './routes/api';
import config from './config.json';
import createError from 'http-errors';
import { Config } from './typings.js';

export default class App {
    readonly server = express();
    readonly config = config as Config;
    readonly serverKeys = Object.keys(this.config.servers);
    readonly indexRouter = new IndexRouter(this);
    readonly apiRouter = new APIRouter(this);
    readonly userAgentString = "Livemap /";
    cachedVehicles = [];

    constructor() {
        this.server
            .set('views', path.join(__dirname, '../client'))
            .set('view engine', 'pug')
            .engine('pug', engines.pug)
            .use(express.json())
            .use(express.urlencoded({ extended: false }))
            .use(express.static(path.join(__dirname, '../public')))
            .use(cookieParser())
            .use('/', this.indexRouter.router)
            .use('/api', this.apiRouter.router)
            .use((req, res, next) => {
                if (res.status(404)) {
                  next(createError(404));
                } else {
                  next(createError(res.status(503)));
                }
            })
            .use((err, _, res, __) => res.status(500).render('error', {
                dss: { server: { name: "Error" } },
                year: new Date().getFullYear(),
                error: err
            }))
            .listen(this.config.port, () => console.log(`[${(new Date()).toLocaleString("en-GB")}] Livemap live on port`, this.config.port));
    }
}