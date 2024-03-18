import { FSCSG } from "../typings.js";

export function getSavegameData(game: FSCSG) {
    const setting = (key: keyof FSCSG["careerSavegame"]["settings"]) => game.careerSavegame?.settings[key]?._text;
    const formatNumber = (number: number, icon?: string) => number.toLocaleString(undefined, { minimumFractionDigits: 0 }) + icon ?? "";

    return {
        isNewServer: !game.careerSavegame,
        money: formatNumber(+game.careerSavegame.statistics.money._text ?? 0, " $"),
        mapTitle: setting("mapTitle") ?? "No map selected",
        timeScale: formatNumber(+setting("timeScale") ?? 0, "x"),
        saveInterval: formatNumber(+setting("autoSaveInterval") ?? 0, " mins"),
        economicDifficulty: setting("economicDifficulty") ?? 1,
        fixedSeasonalVisuals: setting("fixedSeasonalVisuals") ?? "nil",
        growthMode: setting("growthMode") ?? "3",
        fuelUsage: setting("fuelUsage") ?? "3",
        dirtInterval: setting("dirtInterval") ?? "3",
        savegameName: setting("savegameName") ?? "No save",
        helperBuyFuel: setting("helperBuyFuel") ?? "false",
        helperBuySeeds: setting("helperBuySeeds") ?? "false",
        helperBuyFertilizer: setting("helperBuyFertilizer") ?? "false",
        helperSlurrySource: formatNumber(+setting("helperSlurrySource") ?? 1),
        helperManureSource: formatNumber(+setting("helperManureSource") ?? 1),
        slotUsage: (+game.careerSavegame.slotSystem._attributes.slotUsage ?? 0).toLocaleString("en-US"),
        creationDate: setting("creationDate") ?? "0000-00-00",
        fruitDestruction: setting("fruitDestruction") ?? "true",
        plowingRequiredEnabled: setting("plowingRequiredEnabled") ?? "true",
        automaticMotorStartEnabled: setting("automaticMotorStartEnabled") ?? "true",
    };
}