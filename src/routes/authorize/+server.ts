import { OAuth2API, UsersAPI } from "@discordjs/core";
import { type DiscordAPIError, REST } from "@discordjs/rest";
import { eq } from "drizzle-orm";
import { error, redirect } from "@sveltejs/kit";
import { v4 as uuidv4 } from "uuid";
import { authorized_clients, db, log } from "$lib/server";

export async function GET({ url: { searchParams }, cookies, request: { headers }, getClientAddress }) {
    const code = searchParams.get("code");
    const address = headers.get("x-forwarded-for") ?? getClientAddress();

    log(address, "- Auth started");

    if (!code) return error(400);
    
    const rest = new REST({ authPrefix: "Bearer" });
    let oauthData;
    let member;

    try {
        oauthData = await new OAuth2API(rest).tokenExchange({
            code,
            grant_type: "authorization_code",
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            redirect_uri: process.env.REDIRECT_URI
        });
    } catch (err) {
        console.error(err);

        return error(500, "Discord API error (exchange)");
    }

    try {
        member = await new UsersAPI(rest.setToken(oauthData.access_token)).getGuildMember(process.env.GUILD_ID);
    } catch (err) {
        if ((err as DiscordAPIError).code === 10004) {
            log(address, "Failed guild req.");

            return error(403, "Missing required Discord server membership");
        }

        console.error(err);

        return error(500, "Discord API error (membership)");
    }

    const requiredRoles = process.env.REQUIRED_ROLES.split(",");

    if (!member.roles.some(x => requiredRoles.includes(x))) {
        log(address, "Failed role req. as", member.user.id);

        return error(403, "Missing required role(s)");
    }

    const token = uuidv4();
    const dbResult = await db
        .select()
        .from(authorized_clients)
        .where(eq(authorized_clients.discordId, member.user.id));
    const existingClientData = dbResult[0] as typeof authorized_clients.$inferSelect | undefined;

    if (existingClientData) {
        await db
            .update(authorized_clients)
            .set({
                discordDisplayName: member.user.global_name ?? member.user.username,
                clientTokens: [...existingClientData.clientTokens, token]
            })
            .where(eq(authorized_clients.discordId, member.user.id));
    } else {
        await db
            .insert(authorized_clients)
            .values({
                discordId: member.user.id,
                discordDisplayName: member.user.global_name ?? member.user.username,
                clientTokens: [token]
            });
    }

    log(address, "- Authorized as", member.user.id);

    cookies.set("authToken", token, {
        httpOnly: true,
        sameSite: true,
        path: "/"
    });

    throw redirect(303, "/?auth=true");
}
