import {getRandomInteger, getRandomArray, getRandomItem, getRandomDate, humanizeDate} from "../utils.js";
import {TITLES, GENRES, POSTERS, DESCRIPTIONS, DIRECTORS, WRITERS, ACTORS, COUNTRIES} from "../const.js";

const generateFilmCards = (number) => {
  return new Array(number).fill().map(generateFilmCard);
};

const generateFilmCard = () => {
  return {
    title: getRandomItem(TITLES),
    titleOriginal: getRandomItem(TITLES),
    rating: `${getRandomInteger(1, 9)}.${getRandomInteger(1, 9)}`,
    year: getRandomInteger(1900, 2020),
    duration: getRandomInteger(1200000, 10800000),
    genres: getRandomArray(GENRES, 1, 3),
    poster: getRandomItem(POSTERS),
    description: getRandomArray(DESCRIPTIONS, 1, 5).join(` `),
    commentsCount: getRandomInteger(0, 5),
    ageRating: getRandomInteger(0, 18),
    director: getRandomItem(DIRECTORS),
    writers: getRandomArray(WRITERS, 1, 5).join(`, `),
    actors: getRandomArray(ACTORS, 1, 5).join(`, `),
    releaseDate: humanizeDate(getRandomDate(new Date(getRandomInteger(1900, 2020), 0, 1), new Date())),
    country: getRandomItem(COUNTRIES),
    onWatchList: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1))
  };
};

export {generateFilmCards};
