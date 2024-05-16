import { secrets } from "$lib";
import { Feeds } from "farming-simulator-types/2022";

export async function GET(requestEvent) {
    const { params: { serverAcro } } = requestEvent;
    const serverObj = secrets[serverAcro];

    if (!serverObj) return new Response(undefined, { status: 404 });

    const arrayBuffer = await fetch(serverObj.url + Feeds.dedicatedServerStatsMap(serverObj.code, 120, 2048)).then(x => x.arrayBuffer());

    return new Response(arrayBuffer, { status: 200 });
}