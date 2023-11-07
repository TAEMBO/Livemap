/**
 * All icons need to have the following format:
 * Filetype: png
 * Size: 32x32
 * 
 * Dimension should be between 10 and 32.
 * Default: 12 for equipment, 16 for pallets.
 */

const icons = {
    'default': {
        icon: 'default.png',
        desc: 'No icon',
        dimension: 12
    },
    'harvesters': {
        icon: 'harvester.png',
        desc: 'Harvester',
        dimension: 12
    },
    'forageharvesters': {
        icon: 'harvester.png',
        desc: 'Forage Harvester',
        dimension: 12
    },
    'foragewagon': {
        icon: 'trailer.png',
        desc: 'Loading Wagon',
        dimension: 12
    },
    'tractorsl': {
        icon: 'vehicle.png',
        desc: 'Large Tractors',
        dimension: 12
    },
    'tractorsm': {
        icon: 'vehicle.png',
        desc: 'Medium Tractors',
        dimension: 12
    },
    'tractorss': {
        icon: 'vehicle.png',
        desc: 'Small Tractors',
        dimension: 12
    },
    'miscvehicles': {
        icon: 'ropa.png',
        desc: 'Misc. Vehicles',
        dimension: 12
    },
    'windrower': {
        icon: 'tool.png',
        desc: 'Windrowers',
        dimension: 12
    },
    'planters': {
        icon: 'tool.png',
        desc: 'Planters',
        dimension: 12
    },
    'trailer': {
        icon: 'trailer.png',
        desc: 'Traielrs',
        dimension: 12
    },
    'car': {
        icon: 'vehicle.png',
        desc: 'Cars',
        dimension: 12
    },
    'trucks': {
        icon: 'vehicle.png',
        desc: 'Trucks',
        dimension: 12
    },
    'cultivator': {
        icon: 'tool.png',
        desc: 'Cultivators',
        dimension: 12
    },
    'fertilizerspreaders': {
        icon: 'tool.png',
        desc: 'Fertilizer Spreaders',
        dimension: 12
    },
    'forklifts': {
        icon: 'vehicle.png',
        desc: 'Forklifts',
        dimension: 12
    },
    'watertrailer': {
        icon: 'trailer.png',
        desc: 'Water Trailers',
        dimension: 12
    },
    'seeders': {
        icon: 'tool.png',
        desc: 'Seeders',
        dimension: 12
    },
    'traintrailer': {
        icon: 'train.png',
        desc: 'Train carts',
        dimension: 12
    },
    'traintimbertrailer': {
        icon: 'train.png',
        desc: 'Train timber carts',
        dimension: 12
    },
    'bigbags': {
        icon: 'crate.png',
        desc: 'Bigbags',
        dimension: 16
    },
    'bigbagpallets': {
        icon: 'crate.png',
        desc: 'Bigbag Pallets',
        dimension: 16
    },
    'pallets': {
        icon: 'crate.png',
        desc: 'Pallets',
        dimension: 16
    },
    'wheelloadertools': {
        icon: 'tool.png',
        desc: 'Wheel loader tools',
        dimension: 12
    },
    'wheelloadervehicles': {
        icon: 'vehicle.png',
        desc: 'Wheel loaders',
        dimension: 12
    },
    'teleloadertools': {
        icon: 'tool.png',
        desc: 'Telehandler tools',
        dimension: 12
    },
    'teleloadervehicles': {
        icon: 'vehicle.png',
        desc: 'Telehandlers',
        dimension: 12
    },
    'frontloadertools': {
        icon: 'tool.png',
        desc: 'Front-loader tools',
        dimension: 12
    },
    'skidsteertools': {
        icon: 'tool.png',
        desc: 'Skidsteer tools',
        dimension: 12
    },
    'skidsteervehicles': {
        icon: 'vehicle.png',
        desc: 'Skidsteers',
        dimension: 12
    },
    'forageharvestercutters': {
        icon: 'tool.png',
        desc: 'Forage Harvester Cutters',
        dimension: 12
    },
    'mowervehicles': {
        icon: 'mower.png',
        desc: 'Self-propelled Mowers',
        dimension: 12
    },
    'selfpropelledsprayer': {
        icon: 'vehicle.png',
        desc: 'Self-propelled Sprayers',
        dimension: 12
    },
    'augerwagon': {
        icon: 'trailer.png',
        desc: 'Auger wagons',
        dimension: 12
    },
    'baleloaders': {
        icon: 'tool.png',
        desc: 'Bale loaders',
        dimension: 12
    },
    'baler': {
        icon: 'tool.png',
        desc: 'Balers',
        dimension: 12
    },
    'balewrapper': {
        icon: 'tool.png',
        desc: 'Bale Wrappers',
        dimension: 12
    },
    'cutter': {
        icon: 'tool.png',
        desc: 'Combine Harvester Cutters',
        dimension: 12
    },
    'handtoolmower': {
        icon: 'mower.png',
        desc: 'Hand-tool Mowers',
        dimension: 12
    },
    'plows': {
        icon: 'tool.png',
        desc: 'Plows',
        dimension: 12
    },
    'weights': {
        icon: 'tool.png',
        desc: 'Weights',
        dimension: 12
    },
    'cuttertrailers': {
        icon: 'trailer.png',
        desc: 'Cutter trailers',
        dimension: 12
    },
    'rollers': {
        icon: 'tool.png',
        desc: 'Field rollers',
        dimension: 12
    },
    'attachablefrontloader': {
        icon: 'tool.png',
        desc: 'Front-loaders',
        dimension: 12
    },
    'mower': {
        icon: 'mower.png',
        desc: 'Mowers',
        dimension: 12
    },
    'tedders': {
        icon: 'tool.png',
        desc: 'Tedders',
        dimension: 12
    },
    'slurrytanks': {
        icon: 'tool.png',
        desc: 'Slurry Tankers',
        dimension: 12
    },
    'slurryvehicles': {
        icon: 'vehicle.png',
        desc: 'Slurry Vehicles',
        dimension: 12
    },
    'drivablemixerwagon': {
        icon: 'vehicle.png',
        desc: 'Self-propelled TMR Mixers',
        dimension: 12
    },
    'grapetools': {
        icon: 'tool.png',
        desc: 'Grape tools',
        dimension: 12
    },
    'vineharvester': {
        icon: 'harvester.png',
        desc: 'Vineyard Harvesters',
        dimension: 12
    },
    'mixerwagon': {
        icon: 'tool.png',
        desc: 'Mixer Wagons',
        dimension: 12
    },
    'cranetrailer': {
        icon: 'trailer.png',
        desc: 'Forestry Trailers',
        dimension: 12
    },
    'stumpcutter': {
        icon: 'tool.png',
        desc: 'Stump Cutters',
        dimension: 12
    },
    'misc': {
        icon: 'ropa.png',
        desc: 'Misc.',
        dimension: 12
    },
    'controller': {
        icon: 'controller.png',
        desc: 'Player',
        dimension: 12
    }
}

const types = {
    'default': icons.default,
    'harvesters': icons.harvesters,
    'forageharvesters': icons.forageharvesters,
    'foragewagon': icons.foragewagon,
    'tractorsl': icons.tractorsl,
    'tractorsm': icons.tractorsm,
    'tractorss': icons.tractorss,
    'miscvehicles': icons.miscvehicles,
    'windrower': icons.windrower,
    'planters': icons.planters,
    'trailer': icons.trailer,
    'car': icons.car,
    'trucks': icons.trucks,
    'cultivator': icons.cultivator,
    'fertilizerspreaders': icons.fertilizerspreaders,
    'forklifts': icons.forklifts,
    'watertrailer': icons.watertrailer,
    'seeders': icons.seeders,
    'traintrailer': icons.traintrailer,
    'traintimbertrailer': icons.traintimbertrailer,
    'bigbags': icons.bigbags,
    'bigbagpallets': icons.bigbagpallets,
    'pallets': icons.pallets,
    'wheelloadertools': icons.wheelloadertools,
    'wheelloadervehicles': icons.wheelloadervehicles,
    'teleloadertools': icons.teleloadertools,
    'teleloadervehicles': icons.teleloadertools,
    'frontloadertools': icons.frontloadertools,
    'skidsteertools': icons.skidsteertools,
    'skidsteervehicles': icons.skidsteervehicles,
    'forageharvestercutters': icons.forageharvestercutters,
    'mowervehicles': icons.mowervehicles,
    'selfpropelledsprayer': icons.selfpropelledsprayer,
    'augerwagon': icons.augerwagon,
    'baleloader': icons.baleloaders,
    'baler': icons.baler,
    'balewrapper': icons.balewrapper,
    'cutter': icons.cutter,
    'handtoolmower': icons.handtoolmower,
    'plows': icons.plows,
    'weights': icons.weights,
    'cuttertrailers': icons.cuttertrailers,
    'rollers': icons.rollers,
    'attachablefrontloader': icons.attachablefrontloader,
    'mower': icons.mower,
    'tedders': icons.tedders,
    'slurrytanks': icons.slurrytanks,
    'slurryvehicles': icons.slurryvehicles,
    'drivablemixerwagon': icons.drivablemixerwagon,
    'grapetools': icons.grapetools,
    'vineharvester': icons.vineharvester,
    'mixerwagon': icons.mixerwagon,
    'cranetrailer': icons.cranetrailer,
    'stumpcutter': icons.stumpcutter,
    'misc': icons.misc,
    'controller': icons.controller
};

export {
    icons,
    types
};