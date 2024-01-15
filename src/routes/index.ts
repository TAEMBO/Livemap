import express from 'express';
import App from '../app.js';
import Game from '../model/game.js';
import { xml2js } from 'xml-js';
import { FSCSG, FSDSS } from '../typings.js';
import player from '../model/player';
import vehicle from '../model/vehicle';
import { Server, Slots } from '../model/server.js';
import { formatTime } from '../libraries/utility.js';

export default class IndexRouter {
    public readonly router = express.Router();

    constructor(private readonly _app: App) {
        this.router
            .get('*', (req, res, next) => {
                const ip = req.header('x-forwarded-for') || req.socket.remoteAddress.replace('::ffff:', '');

                if (!req.originalUrl.includes('api')) console.log(`[${(new Date()).toLocaleString("en-GB")}] ${ip} - ${req.originalUrl}`);

                next();
            })
            .get('/', (req, res) => res.render('serverlist.pug', { server: { name: "Home" }, year: new Date().getFullYear() }));
        
        for (const key of this._app.serverKeys) this.router.get(`/${key}`, async (req, res) => {
            const serverObj = this._app.config.servers[key];

            const server = await (async () => {
                const stats: FSDSS = await (await fetch(`http://${serverObj.ip}/feed/dedicated-server-stats.json?code=${serverObj.code}`, { headers: { 'User-Agent': `${this._app.userAgentString}DSS` } })).json();
                const results = {
                    server: stats.server,
                    slots: stats.slots,
                    players: stats.slots.players.filter(x => x.isUsed).map(x => ({ ...x, uptime: formatTime(x.uptime) })),
                    vehicles: vehicle.getVehicles(stats.vehicles, stats.server.mapSize)
                };
        
                this._app.cachedVehicles = results.vehicles;
        
                return results;
            })();

            const savegame = await (async () => {
                const result = await fetch(`http://${serverObj.ip}/feed/dedicated-server-savegame.html?code=${serverObj.code}&file=careerSavegame`, { headers: { 'User-Agent': `${this._app.userAgentString}CSG` } });
            
                return new Game(xml2js(await result.text(), { compact: true }) as FSCSG);
            })();
        

    
            res.render('home.pug', {
                game: savegame,
                isNewServer: savegame.isNewServer,
                players: server.players,
                slots: server.slots,
                server: server.server,
                year: new Date().getFullYear()
            });
        });
    }
}