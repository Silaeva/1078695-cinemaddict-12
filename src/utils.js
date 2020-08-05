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

const getFormattedDate = () => {
  const currentDate = new Date();
  return `${currentDate.getFullYear()}/${currentDate.getMonth() + 1}/${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}`;
};

const getRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};


const humanizeDate = (date) => {
  return date.toLocaleString(`en-US`, {day: `numeric`, month: `long`, year: `numeric`});
};

export {getRandomInteger, getRandomArray, getRandomItem, getFormattedDate, getRandomDate, humanizeDate};
