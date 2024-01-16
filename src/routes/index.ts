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

            const dssRes = await fetch(
                `http://${serverObj.ip}/feed/dedicated-server-stats.json?code=${serverObj.code}`,
                { headers: { 'User-Agent': `${this._app.userAgentString}DSS` } }
            );
            const dss: FSDSS = await dssRes.json();

            this._app.cachedVehicles = dss.vehicles.map(vehicle => ({
                name: vehicle.name,
                posx: (vehicle.x / (dss.server.mapSize / 2)) * 375,
                posy: ((vehicle.z / (dss.server.mapSize / 2)) * 375) * -1,
                type: vehicle.type,
                category: vehicle.category,
                controller: vehicle.controller,
                icon: getIcon(vehicle),
                popup: getIconPopup(vehicle)
            }));

            const csgRes = await fetch(
                `http://${serverObj.ip}/feed/dedicated-server-savegame.html?code=${serverObj.code}&file=careerSavegame`,
                { headers: { 'User-Agent': `${this._app.userAgentString}CSG` } }
            );
        
            const csg = new Game(xml2js(await csgRes.text(), { compact: true }) as FSCSG);

            res.render('home.pug', {
                dss: {
                    server: dss.server,
                    slots: dss.slots,
                    players: dss.slots.players.filter(x => x.isUsed).map(x => ({ ...x, uptime: formatTime(x.uptime) }))
                },
                csg,
                isNewServer: csg.isNewServer,
                year: new Date().getFullYear()
            });
        });
    }
}