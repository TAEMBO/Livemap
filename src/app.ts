import express from 'express';
import { version } from './libraries/version';
import engines from 'consolidate';
import path from 'node:path';
import { icons } from './libraries/iconList';
import cookieParser from 'cookie-parser';
import IndexRouter from './routes/index.js';
import APIRouter from './routes/api';
import config from './config.json';
import createError from 'http-errors';
import { Server, Slots } from './model/server';
import Game from './model/game';
import player from './model/player';
import vehicle from './model/vehicle';
import { FSCSG } from './typings.js';
import { xml2js } from 'xml-js';

export default class App {
    readonly server = express();
    readonly config = config;
    readonly serverKeys = Object.keys(this.config.servers);
    readonly indexRouter = new IndexRouter(this);
    readonly apiRouter = new APIRouter(this);
    readonly userAgentString = "Livemap /";
    cachedEntities = {} as Awaited<ReturnType<typeof this.fetchEntities>>;
    chosenServer = "gs";

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
            .use(async (err, req, res, next) => {
                console.log(err.statusCode);
                res.status(err.statusCode);

                res.render('error', {
                    server: { name: "Error" },
                    error: err
                });
            })
            .listen(this.config.port, () => console.log(`[${(new Date()).toLocaleString("en-GB")}] Livemap live on port`, this.config.port));
    }

    async fetchEntities() {
        const server = this.config.servers[this.chosenServer];
        const stats = await (await fetch(`http://${server.ip}/feed/dedicated-server-stats.json?code=${server.code}`, { headers: { 'User-Agent': `${this.userAgentString}DSS` } })).json();
        const results = {
            server: new Server(stats.server),
            slots: new Slots(stats.slots),
            players: player.getPlayers(stats.slots.players),
            vehicles: vehicle.getVehicles(stats.vehicles, stats.server.mapSize)
        };

        this.cachedEntities = results;

        return results;
    }
    
    async fetchCSG() {
        const server = this.config.servers[this.chosenServer];
    
        const result = await fetch(`http://${server.ip}/feed/dedicated-server-savegame.html?code=${server.code}&file=careerSavegame`, { headers: { 'User-Agent': `${this.userAgentString}CSG` } });
        
        return new Game(xml2js(await result.text(), { compact: true }) as FSCSG);
    }
}