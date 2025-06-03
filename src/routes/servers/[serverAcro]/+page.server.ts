import { error } from "@sveltejs/kit";
import { constants } from "http2";
import {
    USER_AGENT_TEXT,
    getIcon,
    getIconPopup,
    secrets,
    formatTime,
    getSavegameData,
    MAP_SIZE
} from "$lib";
import { DSSExtension, DSSFile, Feeds, filterUnused, type DSSResponse } from "farming-simulator-types/2025";
import type { FSCSG, RouteDataServersDynamicServerAcro } from "../../../typings";
import { xml2js } from "xml-js";

export async function load({ fetch, params: { serverAcro }, request: { headers }, getClientAddress }) {
    const serverObj = secrets[serverAcro];
    const address = headers.get("x-forwarded-for") ?? getClientAddress();

    console.log(`[${(new Date()).toLocaleString("en-GB")}] ${address} - ${serverAcro}`);

    if (!serverObj) return error(404, `Unknown server "${serverAcro}"`);

    const dss = await (async () => {
        const res = await fetch(
            serverObj.url + Feeds.dedicatedServerStats(serverObj.code, DSSExtension.JSON),
            {
                signal: AbortSignal.timeout(3_000),
                headers: { "User-Agent": USER_AGENT_TEXT }
            }
        ).catch(err => console.log("DSS Fetch error:", err.message));

        if (!res || res.status !== constants.HTTP_STATUS_OK) return null;

        const data: DSSResponse | void = await res.json().catch(err => console.log("DSS Parse error:", err.message));

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
        ).catch(err => console.log("CSG Fetch error:", err.message));

        if (!res || res.status !== constants.HTTP_STATUS_OK) return null;

        const body = await res.text().catch(err => console.log("CSG Parse error:", err.message));

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
        serverAcro
    } satisfies RouteDataServersDynamicServerAcro;
}