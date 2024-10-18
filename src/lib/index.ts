import config from "../config.json";
import type { CachedVehicle } from "../typings";

export * from "./utils";

export const USER_AGENT_PREFIX = "Livemap/";

export const secrets: Record<string, { name: string; url: string; code: string; }> = config;

export const serverHrefs = Object.entries(secrets).map(([key, { name }]) => ({ href: "/servers/" + key, name }));

export const cachedVehicles = Object.fromEntries(Object.keys(secrets).map(x => ([x, [] as CachedVehicle[]])));
