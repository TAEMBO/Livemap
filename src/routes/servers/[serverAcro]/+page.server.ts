import { error } from "@sveltejs/kit";
import {
    USER_AGENT_PREFIX,
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

    if (!serverObj) return error(404, `Unknown server key "/servers/${serverAcro}"`);

    const dssRes = await fetch(
        serverObj.url + Feeds.dedicatedServerStats(serverObj.code, DSSExtension.JSON),
        { headers: { "User-Agent": `${USER_AGENT_PREFIX}DSS` } }
    );
    const dss: DSSResponse = await dssRes.json();

    if (!dss.slots) return error(500, "Insufficient DSS data");

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
    const csgRes = await fetch(
        serverObj.url + Feeds.dedicatedServerSavegame(serverObj.code, DSSFile.CareerSavegame),
        { headers: { "User-Agent": `${USER_AGENT_PREFIX}CSG` } }
    );
    const csg = getSavegameData(xml2js(await csgRes.text(), { compact: true }) as FSCSG);

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