export function formatTime(oldTime: number) {
  var Hours = 0;
  var Days = 0
  oldTime = Math.floor(oldTime);

  if (oldTime >= 60) {
    var Hours = Math.floor(oldTime / 60);
    var Minutes = (oldTime - (Hours * 60));
  } else Minutes = oldTime;

  if (Hours >= 24) {
    Days = Math.floor(Hours / 24);
    Hours = (Hours - (Days * 24));
  }
  return (Days > 0 ? Days + 'd ' : '') + (Hours > 0 ? Hours + 'h ' : '') + (Minutes > 0 ? Minutes + 'm' : '');
}

export function formatNumber(number: number, digits: number, icon: string) {
    return number.toLocaleString(undefined, { minimumFractionDigits: digits }) + icon;
}