import { serverHrefs } from "$lib/server";
import type { RouteDataServersDynamicServerAcro } from "../typings";

export async function load() {
    return { serverHrefs } satisfies Pick<RouteDataServersDynamicServerAcro, "serverHrefs">;
}