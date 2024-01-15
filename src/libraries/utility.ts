import xjs from 'xml-js';

export function c2json(xml) {
  var res = xjs.xml2js(xml, { compact:true });
  return res;
}

export function filterFloat(value: string) {
  if (/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/.test(value)) {
    return Number(value);
  } else return NaN;
}

export function calcCoords(size: number, x: number, y: number) {
  var newX = null;
  var newY = null;
  if (x != null && y != null) {
    newX = (x / (size / 2)) * 375;
    newY = ((y / (size / 2)) * 375) * (-1);
  }
  return { x: newX, y: newY };
}

export function formatTime(oldTime: number) {
  var Hours = 0;
  oldTime = Math.floor(oldTime);

  if (oldTime >= 60) {
    var Hours = Math.floor(oldTime / 60);
    var Minutes = (oldTime - (Hours * 60));
  } else Minutes = oldTime;

  if (Hours >= 24) {
    var Days = Math.floor(Hours / 24);
    var Hours = (Hours - (Days * 24));
  }
  return (Days > 0 ? Days + 'd ' : '') + (Hours > 0 ? Hours + 'h ' : '') + (Minutes > 0 ? Minutes + 'm' : '');
}

export function formatNumber(number: number, digits: number, icon: string) {
  var n = number;
  return n.toLocaleString(undefined, { minimumFractionDigits: digits }) + icon;
}