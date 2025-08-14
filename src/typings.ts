import type { PlayerUsed, Server, Slots } from "farming-simulator-types/2025";
import type { getSavegameData } from "$lib/server";

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            readonly DB_URI: string;
            readonly REDIRECT_URI: string
            readonly OAUTH_URI: string;
            readonly GUILD_ID: string;
            readonly REQUIRED_ROLES: string;
            readonly CLIENT_ID: string;
            readonly CLIENT_SECRET: string;
        }
    }
};

export interface RouteDataServersDynamicServerAcro {
    dss: {
        server: Server;
        slots: Slots;
        players: (Omit<PlayerUsed, "uptime"> & { uptime: string })[];
    }
    csg: ReturnType<typeof getSavegameData>;
    isNewServer: boolean;
    vehicles: LeafletVehicle[];
    serverAcro: string;
    loginText: string;
    serverHrefs: {
        href: string;
        name: string;
    }[];
}

export type ListsHelperSettings = RouteDataServersDynamicServerAcro["csg"];

export type ListsPlayerSlots = RouteDataServersDynamicServerAcro["dss"];

export type ListsServerDetails = RouteDataServersDynamicServerAcro;

type SettingValue<TValue> = { readonly _text: TValue };

export interface FSCSG {
    readonly careerSavegame?: {
        readonly settings?: {
            readonly savegameName: SettingValue<string>;
            readonly creationDate: SettingValue<string>;
            readonly mapId: SettingValue<string>;
            readonly mapTitle: SettingValue<string>;
            readonly saveDateFormatted: SettingValue<string>;
            readonly saveDate: SettingValue<string>;
            readonly initialMoney: SettingValue<string>;
            readonly initialLoan: SettingValue<string>;
            readonly economicDifficulty: SettingValue<"EASY" | "NORMAL" | "HARD">;
            readonly hasInitiallyOwnedFarmlands: SettingValue<"true" | "false">;
            readonly loadDefaultFarm: SettingValue<"true" | "false">;
            readonly startWithGuidedTour: SettingValue<"true" | "false">;
            readonly trafficEnabled: SettingValue<"true" | "false">;
            readonly stopAndGoBraking: SettingValue<"true" | "false">;
            readonly trailerFillLimit: SettingValue<"true" | "false">;
            readonly automaticMotorStartEnabled: SettingValue<"true" | "false">;
            readonly growthMode: SettingValue<"1" | "2" | "3">;
            readonly fixedSeasonalVisuals?: SettingValue<string>;
            readonly plannedDaysPerPeriod: SettingValue<string>;
            readonly fruitDestruction: SettingValue<"true" | "false">;
            readonly plowingRequiredEnabled: SettingValue<"true" | "false">;
            readonly stonesEnabled: SettingValue<"true" | "false">;
            readonly weedsEnabled: SettingValue<"true" | "false">;
            readonly limeRequired: SettingValue<"true" | "false">;
            readonly isSnowEnabled: SettingValue<"true" | "false">;
            readonly fuelUsage: SettingValue<"1" | "2" | "3">;
            readonly helperBuyFuel: SettingValue<"true" | "false">;
            readonly helperBuySeeds: SettingValue<"true" | "false">;
            readonly helperBuyFertilizer: SettingValue<"true" | "false">;
            readonly helperSlurrySource: SettingValue<"1" | "2">;
            readonly helperManureSource: SettingValue<"1" | "2">;
            readonly densityMapRevision: SettingValue<string>;
            readonly terrainTextureRevision: SettingValue<string>;
            readonly terrainLodTextureRevision: SettingValue<string>;
            readonly splitShapesRevision: SettingValue<string>;
            readonly tipCollisionRevision: SettingValue<string>;
            readonly placementCollisionRevision: SettingValue<string>;
            readonly navigationCollisionRevision: SettingValue<string>;
            readonly mapDensityMapRevision: SettingValue<string>;
            readonly mapTerrainTextureRevision: SettingValue<string>;
            readonly mapTerrainLodTextureRevision: SettingValue<string>;
            readonly mapSplitShapesRevision: SettingValue<string>;
            readonly mapTipCollisionRevision: SettingValue<string>;
            readonly mapPlacementCollisionRevision: SettingValue<string>;
            readonly mapNavigationCollisionRevision: SettingValue<string>;
            readonly disasterDestructionState: SettingValue<"DISABLED" | "VISUALS_ONLY" | "ENABLED">;
            readonly dirtInterval: SettingValue<"1" | "2" | "3" | "4">;
            readonly timeScale: SettingValue<string>;
            readonly autoSaveInterval: SettingValue<string>;
        };
        readonly statistics: {
            readonly money: SettingValue<string>;
            readonly playTime: SettingValue<string>;
        };
        readonly slotSystem?: {
            readonly _attributes: {
                readonly slotUsage: string;
            };
        };
    }
}

export interface LeafletVehicle {
    name: string;
    posx: number;
    posy: number;
    type: string;
    category: string;
    controller?: string;
    icon: string;
    popup: string;
}