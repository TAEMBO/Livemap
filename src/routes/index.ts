import express from 'express';
import App from '../app.js';
import Game from '../model/game.js';
import { xml2js } from 'xml-js';
import { FSCSG, FSDSS } from '../typings.js';
import { calcCoords, formatTime } from '../libraries/utility.js';
import { getIcon, getIconPopup } from '../libraries/icons.js';

export default class IndexRouter {
    public readonly router = express.Router();

    constructor(private readonly _app: App) {
        this.router
            .get('*', (req, _, next) => {
                const ip = req.header('x-forwarded-for') || req.socket.remoteAddress.replace('::ffff:', '');

                if (!req.originalUrl.includes('api')) console.log(`[${(new Date()).toLocaleString("en-GB")}] ${ip} - ${req.originalUrl}`);

                next();
            })
            .get('/', (_, res) => res.render('serverlist.pug', {
                dss: { server: { name: "Home" } },
                year: new Date().getFullYear()
            }));
        
        for (const key of this._app.serverKeys) this.router.get(`/${key}`, async (_, res) => {
            const serverObj = this._app.config.servers[key];

            const server = await (async () => {
                const stats: FSDSS = await (await fetch(`http://${serverObj.ip}/feed/dedicated-server-stats.json?code=${serverObj.code}`, { headers: { 'User-Agent': `${this._app.userAgentString}DSS` } })).json();

                this._app.cachedVehicles = stats.vehicles.map(vehicle => ({
                    name: vehicle.name,
                    posx: (vehicle.x / (stats.server.mapSize / 2)) * 375,
                    posy: ((vehicle.z / (stats.server.mapSize / 2)) * 375) * -1,
                    type: vehicle.type,
                    category: vehicle.category,
                    controller: vehicle.controller,
                    icon: getIcon(vehicle),
                    popup: getIconPopup(vehicle)
                }));
        
                return {
                    server: stats.server,
                    slots: stats.slots,
                    players: stats.slots.players.filter(x => x.isUsed).map(x => ({ ...x, uptime: formatTime(x.uptime) })),
                };
            })();

            const savegame = await (async () => {
                const result = await fetch(`http://${serverObj.ip}/feed/dedicated-server-savegame.html?code=${serverObj.code}&file=careerSavegame`, { headers: { 'User-Agent': `${this._app.userAgentString}CSG` } });
            
                return new Game(xml2js(await result.text(), { compact: true }) as FSCSG);
            })();

            res.render('home.pug', {
                dss: server,
                csg: savegame,
                isNewServer: savegame.isNewServer,
                year: new Date().getFullYear()
            });
        });
    }
}