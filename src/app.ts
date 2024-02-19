import express from 'express';
import engines from 'consolidate';
import path from 'node:path';
import cookieParser from 'cookie-parser';
import IndexRouter from './routes/index.js';
import APIRouter from './routes/api.js';
import config from './config.json' assert { type: "json" };
import createError from 'http-errors';
import { Config } from './typings.js';

export default new class App {
    readonly server = express();
    readonly config = config as Config;
    readonly serverKeys = Object.keys(this.config.servers);
    readonly serverLabels = Object.entries(this.config.servers).map(([key, { name }]) => ({ key, name }));
    readonly indexRouter = new IndexRouter(this);
    readonly apiRouter = new APIRouter(this);
    readonly userAgentString = "Livemap /";
    cachedVehicles: any[] = [];

    constructor() {
        this.server
            .set('views', path.join(process.cwd(), '../client'))
            .set('view engine', 'pug')
            .engine('pug', engines.pug)
            .use(express.json())
            .use(express.urlencoded({ extended: false }))
            .use(express.static(path.join(process.cwd(), '../public')))
            .use(cookieParser())
            .use('/', this.indexRouter.router)
            .use('/api', this.apiRouter.router)
            .use((_, res, next) => {
                if (res.status(404)) {
                  next(createError(404));
                } else {
                  next(createError(res.status(503)));
                }
            })
            .listen(this.config.port, () => console.log(`[${(new Date()).toLocaleString("en-GB")}] Livemap live on port`, this.config.port));
    }
}();
