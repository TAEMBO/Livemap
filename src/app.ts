import express, { Request, Response } from "express";
import engines from "consolidate";
import path from "node:path";
import cookieParser from "cookie-parser";
import IndexRouter from "./routes/index.js";
import APIRouter from "./routes/api.js";
import config from "./config.json" assert { type: "json" };
import createError, { HttpError } from "http-errors";
import { BaseLocalOptions, Config } from "./typings.js";

export default new class App {
    public readonly server = express();
    public readonly config = config as Config;
    public readonly serverKeys = Object.keys(this.config.servers);
    public readonly serverLabels = Object.entries(this.config.servers).map(([key, { name }]) => ({ key, name }));
    public readonly indexRouter = new IndexRouter(this);
    public readonly apiRouter = new APIRouter(this);
    public readonly userAgentString = "Livemap /";
    public cachedVehicles: any[] = [];

    public constructor() {
        this.server
            .set("views", path.join(process.cwd(), "../client"))
            .set("view engine", "pug")
            .engine("pug", engines.pug)
            .use(express.json())
            .use(express.urlencoded({ extended: false }))
            .use(express.static(path.join(process.cwd(), "../public")))
            .use(cookieParser())
            .use("/", this.indexRouter.router)
            .use("/api", this.apiRouter.router)
            .use((_, res, next) => {
                if (res.status(404)) {
                    next(createError(404));
                } else {
                    next(createError(res.status(503)));
                }
            })
            .use((err: HttpError, _: Request, res: Response) => {
                res.status(err.statusCode);
                res.render("error.pug", {
                    dss: { server: { name: "Error" } },
                    year: new Date().getFullYear(),
                    keys: this.serverLabels,
                    error: err
                } satisfies BaseLocalOptions);
            })
            .listen(this.config.port, () => console.log(`[${(new Date()).toLocaleString("en-GB")}] Livemap live on port`, this.config.port));

        process.on("uncaughtException", console.error);
        process.on("unhandledRejection", console.error);
        
    }
}();
