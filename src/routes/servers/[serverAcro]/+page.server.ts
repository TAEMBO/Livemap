import { arrayContains } from "drizzle-orm";
import { constants } from "http2";
import { DSSExtension, DSSFile, Feeds, filterUnused, type DSSResponse } from "farming-simulator-types/2025";
import { error } from "@sveltejs/kit";
import { xml2js } from "xml-js";
import {
    USER_AGENT_TEXT,
    authorized_clients,
    db,
    getIcon,
    getIconPopup,
    formatTime,
    getSavegameData,
    log,
    secrets,
    serverHrefs,
} from "$lib/server";
import { MAP_SIZE } from "$lib";
import type { FSCSG, RouteDataServersDynamicServerAcro } from "../../../typings";

export async function load({ fetch, params: { serverAcro }, request: { headers }, getClientAddress, cookies }) {
    const authToken = cookies.get("authToken");
    const serverObj = secrets[serverAcro];
    const address = headers.get("x-forwarded-for") ?? getClientAddress();

    log(`${address} - ${serverAcro}`);

    if (!serverObj) return error(404, `Unknown server "${serverAcro}"`);

    if (!authToken) return error(403, "Not logged in");

    const data = await db.select().from(authorized_clients).where(arrayContains(authorized_clients.clientTokens, [authToken]));
    const foundUser = data[0] as typeof authorized_clients.$inferSelect | undefined;
    
    if (!foundUser) return error(403, "Access denied");

    const dss = await (async () => {
        const res = await fetch(
            serverObj.url + Feeds.dedicatedServerStats(serverObj.code, DSSExtension.JSON),
            {
                signal: AbortSignal.timeout(3_000),
                headers: { "User-Agent": USER_AGENT_TEXT }
            }
        ).catch(err => log("DSS Fetch error:", err.message));

        if (!res || res.status !== constants.HTTP_STATUS_OK) return null;

        const data: DSSResponse | void = await res.json().catch(err => log("DSS Parse error:", err.message));

        if (!data?.slots) return null;

        return data;
    })();

    const csg = await (async () => {
        if (!dss) return null;

        const res = await fetch(
            serverObj.url + Feeds.dedicatedServerSavegame(serverObj.code, DSSFile.CareerSavegame),
            {
                signal: AbortSignal.timeout(3_000),
                headers: { "User-Agent": USER_AGENT_TEXT }
            }
        ).catch(err => log("CSG Fetch error:", err.message));

        if (!res || res.status !== constants.HTTP_STATUS_OK) return null;

        const body = await res.text().catch(err => log("CSG Parse error:", err.message));

        if (!body) return null;

        return getSavegameData(xml2js(body, { compact: true }) as FSCSG);
    })();

    if (!dss || !csg) return error(500, `${serverObj.name} not responding`);

    const vehicles = dss.vehicles.map(vehicle => ({
        name: vehicle.name,
        posx: (vehicle.x / (dss.server.mapSize / 2)) * (MAP_SIZE / 2),
        posy: ((vehicle.z / (dss.server.mapSize / 2)) * (MAP_SIZE / 2)) * -1,
        type: vehicle.type,
        category: vehicle.category,
        controller: vehicle.controller,
        icon: getIcon(vehicle),
        popup: getIconPopup(vehicle)
    }));

    return {
        dss: {
            server: dss.server,
            slots: dss.slots,
            players: filterUnused(dss.slots.players).map(x => ({ ...x, uptime: formatTime(x.uptime) })),
        },
        csg,
        isNewServer: csg.isNewServer,
        vehicles,
        serverAcro,
        serverHrefs,
        loginText: "👤 " + foundUser.discordDisplayName
    } satisfies RouteDataServersDynamicServerAcro;
}