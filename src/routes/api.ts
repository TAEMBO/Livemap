import express from 'express';
import App from '../app.js';

export default class APIRouter {
    public readonly router = express.Router();

    constructor(private readonly _app: App) {
        this.router.get('/geo.json', async (req, res) => {
            const geos = [];
                
            for (const obj of this._app.cachedEntities.vehicles) {
                if (obj.posx !== null) geos.push({
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [obj.posx, obj.posy]
                    },
                    properties: obj
                });
            }
        
            res.json({ type: "FeatureCollection", features: geos });
        });
    }
}