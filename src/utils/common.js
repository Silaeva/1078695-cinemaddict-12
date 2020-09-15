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

export {getRandomArray, getRandomDate, getRandomItem, getRandomInteger};
