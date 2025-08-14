import { formatString } from "./formatString";
import type { FSCSG } from "../../../typings";

type SettingsKeys = NonNullable<NonNullable<FSCSG["careerSavegame"]>["settings"]>;

export function getSavegameData(game: FSCSG) {
    function getSetting<TKey extends keyof SettingsKeys, TPlaceholder extends string>(key: TKey, placeholder: TPlaceholder) {
        const settings = game.careerSavegame?.settings;

        if (!settings) return placeholder;

        return settings[key] ? settings[key]._text as NonNullable<SettingsKeys[TKey]>["_text"] : placeholder;
    }
    const formatNumber = (number: number, icon = "") => number.toLocaleString(undefined, { minimumFractionDigits: 0 }) + icon;

    return {
        isNewServer: !game.careerSavegame?.settings,
        money: formatNumber(parseInt((game.careerSavegame?.statistics.money._text ?? "0")), " $"),
        mapTitle: getSetting("mapTitle", "Unknown"),
        timeScale: formatNumber(parseFloat(getSetting("timeScale", "0")), "x"),
        saveInterval: formatNumber(parseInt(getSetting("autoSaveInterval", "0")), " min"),
        economicDifficulty: formatString(getSetting("economicDifficulty", "Unknown")),
        fixedSeasonalVisuals: ({
            "1": "March",
            "2": "April",
            "3": "May",
            "4": "June",
            "5": "July",
            "6": "August",
            "7": "September",
            "8": "October",
            "9": "November",
            "10": "December",
            "11": "January",
            "12": "February",
            "0": "Off"
        })[getSetting("fixedSeasonalVisuals", "0")] ?? "Off",
        growthMode: ({
            "1": "Yes",
            "2": "No",
            "3": "Paused",
            "0": "Unknown"
        })[getSetting("growthMode", "0")],
        fuelUsage: ({
            "1": "Low",
            "2": "Normal",
            "3": "High",
            "0": "Unknown"
        })[getSetting("fuelUsage", "0")],
        dirtInterval: ({
            "1": "Off",
            "2": "Slow",
            "3": "Normal",
            "4": "Fast",
            "0": "Unknown"
        })[getSetting("dirtInterval", "0")],
        savegameName: getSetting("savegameName", "Unknown"),
        helperBuyFuel: ({
            "true": "Buy",
            "false": "Off",
            "0": "Unknown"
        })[getSetting("helperBuyFuel", "0")],
        helperBuySeeds: ({
            "true": "Buy",
            "false": "Off",
            "0": "Unknown"
        })[getSetting("helperBuySeeds", "0")],
        helperBuyFertilizer: ({
            "true": "Buy",
            "false": "Off",
            "0": "Unknown"
        })[getSetting("helperBuyFertilizer", "0")],
        helperSlurrySource: ({
            "1": "Off",
            "2": "Buy",
            "0": "Unknown"
        })[getSetting("helperSlurrySource", "0")],
        helperManureSource: ({
            "1": "Off",
            "2": "Buy",
            "0": "Unknown"
        })[getSetting("helperSlurrySource", "0")],
        slotUsage: (parseInt(game.careerSavegame?.slotSystem?._attributes.slotUsage ?? "0")).toLocaleString("en-US"),
        creationDate: getSetting("creationDate", "0000-00-00").split("-").reverse().join("/"),
        fruitDestruction: ({
            "true": "On",
            "false": "Off",
            "0": "Unknown"
        })[getSetting("fruitDestruction", "0")],
        plowingRequiredEnabled: ({
            "true": "On",
            "false": "Off",
            "0": "Unknown"
        })[getSetting("plowingRequiredEnabled", "0")],
        automaticMotorStartEnabled: ({
            "true": "On",
            "false": "Off",
            "0": "Unknown"
        })[getSetting("automaticMotorStartEnabled", "0")],
    };
}