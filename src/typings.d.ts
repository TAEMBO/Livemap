import type { PlayerUsed, Server, Slots } from "farming-simulator-types/2022";
import type { getSavegameData } from "$lib";

export interface RouteDataServersDynamicServerAcro {
    dss: {
        server: Server;
        slots: Slots;
        players: (Omit<PlayerUsed, "uptime"> & { uptime: string })[];
    }
    csg: ReturnType<typeof getSavegameData>;
    isNewServer: boolean;
}

export type ListsHelperSettings = RouteDataServersDynamicServerAcro["csg"];

export type ListsPlayerSlots = RouteDataServersDynamicServerAcro["dss"];

export type ListsServerDetails = RouteDataServersDynamicServerAcro;

export interface FSCSG {
    readonly careerSavegame?: {
        readonly settings: {
            readonly savegameName: { readonly _text: string; };
            readonly creationDate: { readonly _text: string; },
            readonly mapId: { readonly _text: string; };
            readonly mapTitle: { readonly _text: string; };
            readonly saveDateFormatted: { readonly _text: string; };
            readonly saveDate: { readonly _text: string; };
            readonly resetVehicles: { readonly _text: "true" | "false"; };
            readonly trafficEnabled: { readonly _text: "true" | "false"; };
            readonly stopAndGoBraking: { readonly _text: "true" | "false"; };
            readonly trailerFillLimit: { readonly _text: "true" | "false"; };
            readonly automaticMotorStartEnabled: { readonly _text: "true" | "false"; };
            readonly growthMode: { readonly _text: "1" | "2" | "3"; };
            readonly fixedSeasonalVisuals?: { readonly _text: string; };
            readonly plannedDaysPerPeriod: { readonly _text: string; };
            readonly fruitDestruction: { readonly _text: "true" | "false"; };
            readonly plowingRequiredEnabled: { readonly _text: "true" | "false"; };
            readonly stonesEnabled: { readonly _text: "true" | "false"; };
            readonly weedsEnabled: { readonly _text: "true" | "false"; };
            readonly limeRequired: { readonly _text: "true" | "false"; };
            readonly isSnowEnabled: { readonly _text: "true" | "false"; };
            readonly fuelUsage: { readonly _text: "1" | "2" | "3"; };
            readonly helperBuyFuel: { readonly _text: "true" | "false"; };
            readonly helperBuySeeds: { readonly _text: "true" | "false"; };
            readonly helperBuyFertilizer: { readonly _text: "true" | "false"; };
            readonly helperSlurrySource: { readonly _text: "1" | "2"; };
            readonly helperManureSource: { readonly _text: "1" | "2"; };
            readonly densityMapRevision: { readonly _text: string; };
            readonly terrainTextureRevision: { readonly _text: string; };
            readonly terrainLodTextureRevision: { readonly _text: string; };
            readonly splitShapesRevision: { readonly _text: string; };
            readonly tipCollisionRevision: { readonly _text: string; };
            readonly placementCollisionRevision: { readonly _text: string; };
            readonly navigationCollisionRevision: { readonly _text: string; };
            readonly mapDensityMapRevision: { readonly _text: string; };
            readonly mapTerrainTextureRevision: { readonly _text: string; };
            readonly mapTerrainLodTextureRevision: { readonly _text: string; };
            readonly mapSplitShapesRevision: { readonly _text: string; };
            readonly mapTipCollisionRevision: { readonly _text: string; };
            readonly mapPlacementCollisionRevision: { readonly _text: string; };
            readonly mapNavigationCollisionRevision: { readonly _text: string; };
            readonly difficulty: { readonly _text: "1" | "2" | "3"; };
            readonly economicDifficulty: { readonly _text: "1" | "2" | "3"; };
            readonly dirtInterval: { readonly _text: "1" | "2" | "3" | "4"; };
            readonly timeScale: { readonly _text: string; };
            readonly autoSaveInterval: { readonly _text: string; };
        };
        readonly statistics: {
            readonly money: { readonly _text: string; };
            readonly playTime: { readonly _text: string; };
        };
        readonly slotSystem: {
            readonly _attributes: {
                readonly slotUsage: string;
            };
        };
    }
}

export interface CachedVehicle {
    name: string;
    posx: number;
    posy: number;
    type: string;
    category: string;
    controller?: string;
    icon: {
        icon: string;
        desc: string;
        dimension: number;
    };
    popup: string;
}