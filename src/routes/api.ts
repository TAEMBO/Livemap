import express from "express";
import { Feeds } from "farming-simulator-types/2022";
import App from "../app.js";

export default class APIRouter {
    public readonly router = express.Router();

    public constructor(private readonly _app: typeof App) {
        this.router
            .get("/geo.json", async (_, res) => res.json({
                type: "FeatureCollection",
                features: this._app.cachedVehicles.map(vehicle => ({
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [vehicle.posx, vehicle.posy]
                    },
                    properties: vehicle
                }))
            }));

        for (const key of this._app.serverKeys) {
            this.router.get(`/${key}/map.jpg`, async (_, res) => {
                const server = this._app.config.servers[key];

                const mapRes = await fetch(
                    server.url + Feeds.dedicatedServerStatsMap(server.code, 120, 2048),
                    { headers: { "User-Agent": `${this._app.userAgentString}CSG` } }
                );
                
                res.send(Buffer.from(await mapRes.arrayBuffer()));
            });
        }
    }
}