import App from '../app.js';
import express from 'express';
import { DSSExtension, DSSFile, type DSSResponse, Feeds, filterUnused } from 'farming-simulator-types/2022';
import { xml2js } from 'xml-js';
import { formatTime, getIcon, getIconPopup, getSavegameData } from "../utils/index.js";
import { BaseLocalOptions, FSCSG } from '../typings.js';

export default class IndexRouter {
    public readonly router = express.Router();

    constructor(private readonly _app: typeof App) {
        this.router
            .get('*', (req, _, next) => {
                const ip = req.header('x-forwarded-for') || req.socket.remoteAddress?.replace('::ffff:', '');

                if (!req.originalUrl.includes('api')) console.log(`[${(new Date()).toLocaleString("en-GB")}] ${ip} - ${req.originalUrl}`);

                next();
            })
            .get('/', (_, res) => res.render('serverlist.pug', {
                dss: { server: { name: "Home" } },
                year: new Date().getFullYear(),
                keys: this._app.serverLabels
            } satisfies BaseLocalOptions));
        
        for (const key of this._app.serverKeys) this.router.get(`/${key}`, async (_, res) => {
            const serverObj = this._app.config.servers[key];

            const dssRes = await fetch(
                serverObj.url + Feeds.dedicatedServerStats(serverObj.code, DSSExtension.JSON),
                { headers: { 'User-Agent': `${this._app.userAgentString}DSS` } }
            );
            const dss: DSSResponse = await dssRes.json();

            if (!dss.slots) throw new Error("Missing DSS object: " + serverObj.name);

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
                serverObj.url + Feeds.dedicatedServerSavegame(serverObj.code, DSSFile.CareerSavegame),
                { headers: { 'User-Agent': `${this._app.userAgentString}CSG` } }
            );
            const csg = getSavegameData(xml2js(await csgRes.text(), { compact: true }) as FSCSG);

            res.render('home.pug', {
                dss: {
                    server: dss.server,
                    slots: dss.slots,
                    players: filterUnused(dss.slots.players).map(x => ({ ...x, uptime: formatTime(x.uptime) }))
                },
                csg,
                isNewServer: csg.isNewServer,
                year: new Date().getFullYear(),
                keys: this._app.serverLabels
            } satisfies BaseLocalOptions);
        });
    }
}