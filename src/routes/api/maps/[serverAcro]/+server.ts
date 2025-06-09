import { Feeds } from "farming-simulator-types/2025";
import { secrets } from "$lib/server";

export async function GET({ params: { serverAcro } }) {
    const serverObj = secrets[serverAcro];

    if (!serverObj) return new Response(undefined, { status: 404 });

    const res = await fetch(serverObj.url + Feeds.dedicatedServerStatsMap(serverObj.code, 120, 2048));

    return new Response(await res.arrayBuffer(), { status: 200 });
}