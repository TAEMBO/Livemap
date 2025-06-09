import { arrayContains } from "drizzle-orm";
import { authorized_clients, db, serverHrefs } from "$lib/server";
import type { RouteDataServersDynamicServerAcro } from "../typings";

export async function load({ cookies }) {
    const authToken = cookies.get("authToken");
    let loginText = "Login";

    if (authToken) {
        const data = await db.select().from(authorized_clients).where(arrayContains(authorized_clients.clientTokens, [authToken]));
        const foundUser = data[0] as typeof authorized_clients.$inferSelect | undefined;

        if (foundUser) loginText = "👤 " + foundUser.discordDisplayName;
    }

    return {
        serverHrefs,
        loginText
    } satisfies Pick<RouteDataServersDynamicServerAcro, "serverHrefs" | "loginText">;
}
