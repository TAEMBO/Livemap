import express from 'express';
import App from '../app.js';

export default class APIRouter {
    public readonly router = express.Router();

    constructor(private readonly _app: App) {
        this.router.get('/geo.json', async (_, res) => res.json({
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
    }
}