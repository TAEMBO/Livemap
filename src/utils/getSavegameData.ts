import { FSCSG } from '../typings.js';
import { formatNumber } from './formatNumber.js';

export function getSavegameData(game: FSCSG) {
    const gameSettings = game.careerSavegame?.settings;

    return {
        isNewServer: Boolean(game.careerSavegame),
        money: formatNumber(parseInt(game.careerSavegame.statistics.money._text ?? "0"), ' $'),
        mapTitle: gameSettings?.mapTitle._text ?? 'No map selected',
        timeScale: formatNumber(parseInt(gameSettings?.timeScale._text ?? "0"), 'x'),
        saveInterval: formatNumber(parseInt(gameSettings?.autoSaveInterval._text ?? "0"), ' mins'),
        economicDifficulty: gameSettings?.economicDifficulty._text ?? 1,
        fixedSeasonalVisuals: gameSettings?.fixedSeasonalVisuals?._text ?? 'nil',
        growthMode: gameSettings?.growthMode._text ?? '3',
        fuelUsage: gameSettings?.fuelUsage._text ?? '3',
        dirtInterval: gameSettings?.dirtInterval._text ?? '3',
        savegameName: gameSettings?.savegameName._text ?? 'No save',
        helperBuyFuel: gameSettings?.helperBuyFuel._text ?? 'false',
        helperBuySeeds: gameSettings?.helperBuySeeds._text ?? 'false',
        helperBuyFertilizer: gameSettings?.helperBuyFertilizer._text ?? 'false',
        helperSlurrySource: formatNumber(parseInt(gameSettings?.helperSlurrySource._text ?? "1"), ''),
        helperManureSource: formatNumber(parseInt(gameSettings?.helperManureSource._text ?? "1"), ''),
        slotUsage: Number(game.careerSavegame.slotSystem._attributes.slotUsage ?? 0).toLocaleString('en-US'),
        creationDate: gameSettings?.creationDate._text ?? "0000-00-00",
        fruitDestruction: gameSettings?.fruitDestruction._text ?? 'true',
        plowingRequiredEnabled: gameSettings?.plowingRequiredEnabled._text ?? 'true',
        automaticMotorStartEnabled: gameSettings?.automaticMotorStartEnabled._text ?? 'true',
    }
}