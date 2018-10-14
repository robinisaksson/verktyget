// import {MapValueInRange} from 'verktyget';
// var degree = MapValueInRange(progress, 0, 1, -45, 215);
const MapValueInRange = (value, fromLow, fromHigh, toLow, toHigh) => {
  const fromRangeSize = fromHigh - fromLow;
  const toRangeSize = toHigh - toLow;
  const valueScale = (value - fromLow) / fromRangeSize;

  return toLow + (valueScale * toRangeSize);
}
export {MapValueInRange};


// import {RandomNumFromRange} from 'verktyget';
// var num = RandomNumFromRange(10, 90);
const RandomNumFromRange = (min, max) => {
	return Math.floor(Math.random()*(max-min+1)+min);
}
export {RandomNumFromRange};

// import {Lerp} from 'verktyget';
// var num = Lerp(from, to, degradeValue);
// var num = Lerp(1, 10, 0.01);
const Lerp = (from, to, degrade) => {
	return from*(1-degrade)+to*degrade;
}
export {Lerp};
