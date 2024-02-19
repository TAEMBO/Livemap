import express from 'express';
import App from '../app.js';

export default class APIRouter {
    public readonly router = express.Router();

    constructor(private readonly _app: typeof App) {
        this.router
            .get('/geo.json', async (_, res) => res.json({
                type: "FeatureCollection",
                features: this._app.cachedVehicles.map(vehicle => ({
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [vehicle.posx, vehicle.posy]
                    },
                    properties: vehicle
                }))
            }));

            for (const key of this._app.serverKeys) {
                this.router.get(`/${key}/map.jpg`, async (_, res) => {
                    const server = this._app.config.servers[key];

                    const mapRes = await fetch(
                        `http://${server.ip}/feed/dedicated-server-stats-map.jpg?code=${server.code}&quality=120&size=2048`,
                        { headers: { 'User-Agent': `${this._app.userAgentString}CSG` } }
                    );

                    res.send(Buffer.from(await mapRes.arrayBuffer()));
                });
            }
    }
}