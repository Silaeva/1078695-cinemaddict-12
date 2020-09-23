const rankCount = {
  NOVICE_TO: 10,
  FAN_TO: 20,
  MOVIE_BUFF_FROM: 21
};

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

const getProfileRating = (watchedFilms) => {
  let profileRating = ``;
  if (watchedFilms > 0 && watchedFilms <= rankCount.NOVICE_TO) {
    profileRating = `novice`;
  } else if (watchedFilms > rankCount.NOVICE_TO && watchedFilms <= rankCount.FAN_TO) {
    profileRating = `fan`;
  } else if (watchedFilms >= rankCount.MOVIE_BUFF_FROM) {
    profileRating = `movie buff`;
  }
  return profileRating;
};

export {getRandomArray, getRandomDate, getRandomItem, getRandomInteger, getProfileRating};
