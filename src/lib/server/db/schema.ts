import { pgTable, text } from "drizzle-orm/pg-core";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const authorized_clients = pgTable("authorized_clients", {
    discordId: text("discord_id").primaryKey(),
    discordDisplayName: text("discord_display_name").notNull(),
    clientTokens: text("client_tokens").array().notNull()
});
