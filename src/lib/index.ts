import config from "../config.json";

export * from "./utils";

export const USER_AGENT_PREFIX = "Livemap/";

export const MAP_SIZE = 850;

export const secrets: Record<string, { name: string; url: string; code: string; }> = config;

export const serverHrefs = Object.entries(secrets).map(([key, { name }]) => ({ href: "/servers/" + key, name }));