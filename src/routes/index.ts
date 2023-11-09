import express from 'express';
import App from '../app.js';

export default class IndexRouter {
    public readonly router = express.Router();
    private _server: any = null;
    private _savegame: any = null;

    constructor(private readonly _app: App) {

        this.router
            .get('*', (req, res, next) => {
                next();
                
                const ip = req.header('x-forwarded-for') || req.socket.remoteAddress.replace('::ffff:', '');

                if (!req.originalUrl.includes('api')) console.log(`[${(new Date()).toLocaleString("en-GB")}] ${ip} - ${req.originalUrl}`);
            })
            .get('/', async (req, res, next) => {
                this._server = await this._app.fetchEntities();
                this._savegame = await this._app.fetchCSG();
                res.locals.isNewServer = this._savegame.isNewServer;
                res.locals._server = this._server;
            
                res.render('serverlist.pug', {
                    server: this._server.server,
                    name: this._server.server.name = 'Server list'
                });
            });
        
        for (const key of this._app.serverKeys) this.router.get(`/${key}`, async (req, res, next) => {
            this._app.chosenServer = key;
            this._server = await this._app.fetchEntities();
            this._savegame = await this._app.fetchCSG();
            res.locals.isNewServer = this._savegame.isNewServer;
            res.locals._server = this._server;
        
            res.render('home.pug', {
                game: this._savegame,
                slots: this._server.slots,
                server: this._server.server,
                players: this._server.players
            });
        });
    }
}