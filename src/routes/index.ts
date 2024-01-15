import express from 'express';
import App from '../app.js';

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
            this._app.chosenServer = key;
            const server = await this._app.fetchEntities();
            const savegame = await this._app.fetchCSG();
        
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