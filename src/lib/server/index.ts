import config from "../../config.json";

export * from "./utils";

export * from "./db";

export const USER_AGENT_TEXT = "Livemap";

export const secrets: Record<string, { name: string; url: string; code: string; }> = config;

export const serverHrefs = Object.entries(secrets).map(([key, { name }]) => ({ href: "/servers/" + key, name }));

export function log(...message: any) {
    console.log(`[${(new Date()).toLocaleString("en-GB")}]`, ...message);
}
