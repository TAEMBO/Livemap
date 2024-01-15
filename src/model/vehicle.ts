import lodash from 'lodash';
import * as utility from '../libraries/utility';
import {getIcon, getIconPopup} from '../libraries/icons';

var mapSize:number;

function getVehicles(vehicles, map: number) {
  const results = [];
  mapSize = map;

  vehicles.forEach(vehicle => {
    if (!lodash.isEmpty(vehicle)) results.push(new Vehicle(vehicle));
  });

  return results;
}

function Vehicle(vehicle) {
  const coords = utility.calcCoords(mapSize, vehicle.x, vehicle.z);

  this.name = vehicle.name;
  this.posx = coords.x;
  this.posy = coords.y;
  this.type = vehicle.type;
  this.category = vehicle.category;
  this.controller = vehicle.controller;
  this.icon = getIcon(vehicle);
  this.popup = getIconPopup(vehicle);
}

export default { getVehicles, Vehicle };