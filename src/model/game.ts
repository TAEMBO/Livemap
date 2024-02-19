import { FSCSG } from '../typings.js';
import * as utility from '../libraries/utility.js';

export default function Game(game: FSCSG) {
    const gameSettings = game.careerSavegame?.settings;
    const gameSlotSystem = game.careerSavegame?.slotSystem._attributes;
    const gameStatistics = game.careerSavegame?.statistics;

    return {
        isNewServer: game.careerSavegame === undefined ? true : false,
        money: gameStatistics?.money._text == undefined ? '0 $' : utility.formatNumber(parseInt(gameStatistics.money._text), 0, ' $'),
        mapTitle: gameSettings?.mapTitle._text == undefined ? 'No map selected' : gameSettings.mapTitle._text,
        timeScale: utility.formatNumber(gameSettings?.timeScale._text == undefined ? 0 : Number(gameSettings.timeScale._text), 0, 'x'),
        saveInterval: gameSettings?.autoSaveInterval._text == undefined ? '? mins' : utility.formatNumber(parseInt(gameSettings.autoSaveInterval._text), 0, ' mins'),
        economicDifficulty: gameSettings?.economicDifficulty._text == undefined ? 1 : gameSettings.economicDifficulty._text,
        fixedSeasonalVisuals: gameSettings?.fixedSeasonalVisuals?._text == undefined ? 'nil' : gameSettings.fixedSeasonalVisuals._text,
        growthMode: gameSettings?.growthMode._text == undefined ? '3' : gameSettings.growthMode._text,
        fuelUsage: gameSettings?.fuelUsage._text == undefined ? '3' : gameSettings.fuelUsage._text,
        dirtInterval: gameSettings?.dirtInterval._text == undefined ? '3' : gameSettings.dirtInterval._text,
        savegameName: gameSettings?.savegameName._text == undefined ? 'No save' : gameSettings.savegameName._text,
        helperBuyFuel: (gameSettings?.helperBuyFuel._text) == undefined ? 'false' : (gameSettings.helperBuyFuel._text),
        helperBuySeeds: (gameSettings?.helperBuySeeds._text) == undefined ? 'false' : (gameSettings.helperBuySeeds._text),
        helperBuyFertilizer: (gameSettings?.helperBuyFertilizer._text) == undefined ? 'false' : (gameSettings.helperBuyFertilizer._text),
        helperSlurrySource: gameSettings?.helperSlurrySource._text == undefined ? 1 : utility.formatNumber(parseInt(gameSettings.helperSlurrySource._text), 0, ''),
        helperManureSource: gameSettings?.helperManureSource._text == undefined ? 1 : utility.formatNumber(parseInt(gameSettings.helperManureSource._text), 0, ''),
        slotUsage: gameSlotSystem?.slotUsage == undefined ? 0 : Number(gameSlotSystem.slotUsage).toLocaleString('en-US'),
        creationDate: gameSettings?.creationDate == undefined ? '31/12/1969' : (gameSettings.creationDate._text).split('-').reverse().join('/'),
        fruitDestruction: gameSettings?.fruitDestruction._text == undefined ? 'true' : gameSettings.fruitDestruction._text,
        plowingRequiredEnabled: gameSettings?.plowingRequiredEnabled._text == undefined ? 'true' : gameSettings.plowingRequiredEnabled._text,
        automaticMotorStartEnabled: gameSettings?.automaticMotorStartEnabled._text == undefined ? 'true' : gameSettings.automaticMotorStartEnabled._text,


    }
}