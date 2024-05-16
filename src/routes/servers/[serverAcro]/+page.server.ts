import { error } from "@sveltejs/kit";
import { USER_AGENT_PREFIX, getIcon, getIconPopup, secrets, cachedVehicles, formatTime, getSavegameData } from "$lib";
import { DSSExtension, DSSFile, Feeds, filterUnused, type DSSResponse } from "farming-simulator-types/2022";
import type { FSCSG, RouteDataServersDynamicServerAcro } from "../../../typings";
import { xml2js } from "xml-js";

export const csr = false;

export async function load({ fetch, params: { serverAcro } }) {
    const serverObj = secrets[serverAcro];

    if (!serverObj) return error(404, `Unknown server key "/servers/${serverAcro}"`);

    const dssRes = await fetch(
        serverObj.url + Feeds.dedicatedServerStats(serverObj.code, DSSExtension.JSON),
        { headers: { "User-Agent": `${USER_AGENT_PREFIX}DSS` } }
    );
    const dss: DSSResponse = await dssRes.json();

    if (!dss.slots) return error(500, "Insufficient DSS data");

    cachedVehicles[serverAcro] = dss.vehicles.map(vehicle => ({
        name: vehicle.name,
        posx: (vehicle.x / (dss.server.mapSize / 2)) * 375,
        posy: ((vehicle.z / (dss.server.mapSize / 2)) * 375) * -1,
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
        isNewServer: csg.isNewServer
    } satisfies RouteDataServersDynamicServerAcro;
}