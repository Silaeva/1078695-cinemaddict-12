import {MAX_DESCRIPTION_LENGTH} from "./const.js";

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArray = (array, min, max) => {
  const newArray = [];
  while (newArray.length < getRandomInteger(min, max)) {
    newArray.push(getRandomItem(array));
  }
  return newArray;
};

const getRandomItem = (items) => {
  const randomIndex = getRandomInteger(0, items.length - 1);
  return items[randomIndex];
};

const getRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const humanizeDate = (date) => {
  return date.toLocaleString(`en-US`, {day: `numeric`, month: `long`, year: `numeric`});
};

const cropDescription = (text) => {
  if (text.length > MAX_DESCRIPTION_LENGTH) {
    return text.slice(0, MAX_DESCRIPTION_LENGTH) + `...`;
  } else {
    return text;
  }
};

const getMovieDuration = (ms) => {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  return hours === 0 ? `${minutes}m` : `${hours}h ${minutes}m`;
};

export {getRandomInteger, getRandomArray, getRandomItem, getRandomDate, humanizeDate, cropDescription, getMovieDuration};
