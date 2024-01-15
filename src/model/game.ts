import { FSCSG } from '../typings.js';
import * as utility from '../libraries/utility';

export default function Game(game: FSCSG) {
    this.isNewServer = game.careerSavegame === undefined ? true : false

    const gameSettings = game.careerSavegame?.settings;
    const gameSlotSystem = game.careerSavegame?.slotSystem._attributes;
    const gameStatistics = game.careerSavegame?.statistics;

    this.money = gameStatistics?.money._text == undefined ? '0 $' : utility.formatNumber(parseInt(gameStatistics.money._text), 0, ' $')
    this.mapTitle = gameSettings?.mapTitle._text == undefined ? 'No map selected' : gameSettings.mapTitle._text
    this.timeScale = utility.formatNumber(gameSettings?.timeScale._text == undefined ? 0 : Number(gameSettings.timeScale._text), 0, 'x')
    this.saveInterval = gameSettings?.autoSaveInterval._text == undefined ? '? mins' : utility.formatNumber(parseInt(gameSettings.autoSaveInterval._text), 0, ' mins')
    this.economicDifficulty = gameSettings?.economicDifficulty._text == undefined ? 1 : gameSettings.economicDifficulty._text
    this.fixedSeasonalVisuals = gameSettings?.fixedSeasonalVisuals?._text == undefined ? 'nil' : gameSettings.fixedSeasonalVisuals._text
    this.growthMode = gameSettings?.growthMode._text == undefined ? '3' : gameSettings.growthMode._text
    this.fuelUsage = gameSettings?.fuelUsage._text == undefined ? '3' : gameSettings.fuelUsage._text
    this.dirtInterval = gameSettings?.dirtInterval._text == undefined ? '3' : gameSettings.dirtInterval._text
    this.savegameName = gameSettings?.savegameName._text == undefined ? 'No save' : gameSettings.savegameName._text
    this.helperBuyFuel = (gameSettings?.helperBuyFuel._text) == undefined ? 'false' : (gameSettings.helperBuyFuel._text)
    this.helperBuySeeds = (gameSettings?.helperBuySeeds._text) == undefined ? 'false' : (gameSettings.helperBuySeeds._text)
    this.helperBuyFertilizer = (gameSettings?.helperBuyFertilizer._text) == undefined ? 'false' : (gameSettings.helperBuyFertilizer._text)
    this.helperSlurrySource = gameSettings?.helperSlurrySource._text == undefined ? 1 : utility.formatNumber(parseInt(gameSettings.helperSlurrySource._text), 0, '')
    this.helperManureSource = gameSettings?.helperManureSource._text == undefined ? 1 : utility.formatNumber(parseInt(gameSettings.helperManureSource._text), 0, '')
    this.slotUsage = gameSlotSystem?.slotUsage == undefined ? 0 : Number(gameSlotSystem.slotUsage).toLocaleString('en-US')
    this.creationDate = gameSettings?.creationDate == undefined ? '31/12/1969' : (gameSettings.creationDate._text as string).split('-').reverse().join('/')
    this.fruitDestruction = gameSettings?.fruitDestruction._text == undefined ? 'true' : gameSettings.fruitDestruction._text
    this.plowingRequiredEnabled = gameSettings?.plowingRequiredEnabled._text == undefined ? 'true' : gameSettings.plowingRequiredEnabled._text
    this.automaticMotorStartEnabled = gameSettings?.automaticMotorStartEnabled._text == undefined ? 'true' : gameSettings.automaticMotorStartEnabled._text
}