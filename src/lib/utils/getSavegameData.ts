import type { FSCSG } from "../../typings";

type SavegameKeys = NonNullable<FSCSG["careerSavegame"]>["settings"];

export function getSavegameData(game: FSCSG) {
    const setting = <TKey extends keyof SavegameKeys, >(key: TKey) => {
        return game.careerSavegame?.settings[key]?._text as NonNullable<SavegameKeys[TKey]>["_text"] | undefined;
    };
    const formatNumber = (number: number, icon = "") => number.toLocaleString(undefined, { minimumFractionDigits: 0 }) + icon;

    return {
        isNewServer: !game.careerSavegame,
        money: formatNumber(+(game.careerSavegame?.statistics.money._text ?? 0), " $"),
        difficulty: ({
            "1": "New Farmer",
            "2": "Farm-Manager",
            "3": "Start from scratch",
            "0": "Unknown"
        })[setting("difficulty") ?? "0"],
        mapTitle: setting("mapTitle") ?? "Unknown",
        timeScale: formatNumber(+(setting("timeScale") ?? 0), "x"),
        saveInterval: formatNumber(+(setting("autoSaveInterval") ?? 0), " mins"),
        economicDifficulty: ({
            "1": "Easy",
            "2": "Normal",
            "3": "Hard",
            "0": "Unknown"
        })[setting("economicDifficulty") ?? "0"],
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
        })[setting("fixedSeasonalVisuals") ?? "0"],
        growthMode: ({
            "1": "Yes",
            "2": "No",
            "3": "Paused",
            "0": "Unknown"
        })[setting("growthMode") ?? "0"],
        fuelUsage: ({
            "1": "Low",
            "2": "Normal",
            "3": "High",
            "0": "Unknown"
        })[setting("fuelUsage") ?? "0"],
        dirtInterval: ({
            "1": "Off",
            "2": "Slow",
            "3": "Normal",
            "4": "Fast",
            "0": "Unknown"
        })[setting("dirtInterval") ?? "0"],
        savegameName: setting("savegameName") ?? "Unknown",
        helperBuyFuel: ({
            "true": "Buy",
            "false": "Off",
            "0": "Unknown"
        })[setting("helperBuyFuel") ?? "0"],
        helperBuySeeds: ({
            "true": "Buy",
            "false": "Off",
            "0": "Unknown"
        })[setting("helperBuySeeds") ?? "0"],
        helperBuyFertilizer: ({
            "true": "Buy",
            "false": "Off",
            "0": "Unknown"
        })[setting("helperBuyFertilizer") ?? "0"],
        helperSlurrySource: ({
            "1": "Off",
            "2": "Buy",
            "0": "Unknown"
        })[setting("helperSlurrySource") ?? "0"],
        helperManureSource: ({
            "1": "Off",
            "2": "Buy",
            "0": "Unknown"
        })[setting("helperSlurrySource") ?? "0"],
        slotUsage: (+(game.careerSavegame?.slotSystem._attributes.slotUsage ?? 0)).toLocaleString("en-US"),
        creationDate: (setting("creationDate") ?? "0000-00-00").split("-").reverse().join("/"),
        fruitDestruction: ({
            "true": "On",
            "false": "Off",
            "0": "Unknown"
        })[setting("fruitDestruction") ?? "0"],
        plowingRequiredEnabled: ({
            "true": "On",
            "false": "Off",
            "0": "Unknown"
        })[setting("plowingRequiredEnabled") ?? "0"],
        automaticMotorStartEnabled: ({
            "true": "On",
            "false": "Off",
            "0": "Unknown"
        })[setting("automaticMotorStartEnabled") ?? "0"],
    };
}