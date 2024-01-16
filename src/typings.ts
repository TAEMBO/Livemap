import config from './config.json';

export interface ServerTyping {
    name: string;
    version: string;
}

export interface SlotsTyping {
    used: number;
    capacity: number;
}

export type Empty<T> = {
    [K in keyof T]: undefined;
};

export interface FSCSG {
    readonly careerSavegame: {
        readonly settings?: {
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
            readonly fixedSeasonalVisuals: { readonly _text: string; };
            readonly plannedDaysPerPeriod: { readonly _text: string; };
            readonly fruitDestruction: { readonly _text: "true" | "fase"; };
            readonly plowingRequiredEnabled: { readonly _text: "true" | "fase"; };
            readonly stonesEnabled: { readonly _text: "true" | "false"; };
            readonly weedsEnabled: { readonly _text: "true" | "false"; };
            readonly limeRequired: { readonly _text: "true" | "false"; };
            readonly isSnowEnabled: { readonly _text: "true" | "false"; };
            readonly fuelUsage: { readonly _text: string; };
            readonly helperBuyFuel: { readonly _text: "true" | "false"; };
            readonly helperBuySeeds: { readonly _text: "true" | "false"; };
            readonly helperBuyFertilizer: { readonly _text: "true" | "false"; };
            readonly helperSlurrySource: { readonly _text: string; };
            readonly helperManureSource: { readonly _text: string; };
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
            readonly difficulty: { readonly _text: string; };
            readonly economicDifficulty: { readonly _text: string; };
            readonly dirtInterval: { readonly _text: string; };
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

interface FSDSSPlayerCoordinates {
    readonly x: number;
    readonly y: number;
    readonly z: number;
}

export type FSDSSPlayer = {
    readonly isUsed: boolean;
    readonly isAdmin: boolean;
    readonly uptime: number;
    readonly name: string;
} & (Empty<FSDSSPlayerCoordinates> | FSDSSPlayerCoordinates);

interface FSDSSServer {
    readonly dayTime: number;
    readonly game: string;
    readonly mapName: string;
    readonly mapSize: number;
    readonly mapOverviewFilename: string;
    readonly money: number;
    readonly name: string;
    readonly server: string;
    readonly version: string;
}

interface FSDSSSlots {
    readonly capacity: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16;
    readonly used: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16;
    readonly players: FSDSSPlayer[];
}

interface FSDSSVehicle {
    readonly name: string;
    readonly category: string;
    readonly type: string;
    readonly x: number;
    readonly y: number;
    readonly z: number;
    readonly fills: {
        readonly type: string;
        readonly level: number;
    }[];
    readonly controller?: string;
}

interface FSDSSMod {
    readonly author: string;
    readonly hash: string;
    readonly name: string;
    readonly version: string;
    readonly description: string;
}

interface FSDSSField {
    readonly id: number;
    readonly isOwned: boolean;
    readonly x: number;
    readonly z: number;
}

export interface FSDSS {
    readonly server: FSDSSServer;
    readonly slots: FSDSSSlots;
    readonly vehicles: FSDSSVehicle[];
    readonly mods: FSDSSMod[];
    readonly fields: FSDSSField[];
}

export interface Config {
    readonly port: number;
    readonly servers: Record<string, {
        readonly name: string;
        readonly ip: string;
        readonly code: string;
    }>;
}

export interface BaseLocalOptions extends Record<string, any>{
    year: number;
    keys: {
        key: string;
        name: string;
    }[];
}