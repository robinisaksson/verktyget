const MapValueInRange = (value, fromLow, fromHigh, toLow, toHigh) => {
  const fromRangeSize = fromHigh - fromLow;
  const toRangeSize = toHigh - toLow;
  const valueScale = (value - fromLow) / fromRangeSize;

  return toLow + (valueScale * toRangeSize);
}
export {MapValueInRange};



const RandomNumFromRange = (min, max) => {
	return Math.floor(Math.random()*(max-min+1)+min);
}
export {RandomNumFromRange};
