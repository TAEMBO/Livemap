import * as utility from './utility.js';
import { icons } from './iconList.js';

interface FillData {
    type: string[];
    level: number[];
}

function getIcon(object) {
    if ('controller' in object) return icons['controller']
    else if (icons.hasOwnProperty(object.category.toLowerCase())) return icons[object.category.toLowerCase()]
    else if (icons.hasOwnProperty(object.type.toLowerCase())) return icons[object.type.toLowerCase()]

    return icons['default']
}

function getIconPopup(object) {
    var popup = '<b>'+ object.name +'</b>';
    popup += '<small>';

    const fillData = {
        type: object.fills && object.fills.map((x: FillData) => x.type.toString().toLowerCase().replace('grass_windrow', 'grass')),
        level: object.fills && object.fills.map((x: FillData) => x.level)
    }

    if (!isNaN(utility.filterFloat(fillData.level))) {
        if (fillData.type != 'unknown') popup += '<br><span style="text-transform: capitalize;">'+ fillData.type +'</span> ('+ parseInt(fillData.level).toLocaleString('en-US') +')';
        else if (fillData.type.includes('unknown')) popup += '<br>Empty';
    }

    if (object.isAIActive === 'true') popup += '<br>Helper: Active';
    if (object.controller) popup += '<br>Player: '+ object.controller;

    popup += '</small>';

    return popup;
}

export {
    getIcon,
    getIconPopup
}