import {getRandomInteger, getRandomArray, getRandomItem, getRandomDate, humanizeDate} from "../utils.js";
import {TITLES, YEARS, DURATIONS, GENRES, POSTERS, DESCRIPTIONS, AGE_RATINGS, DIRECTORS, WRITERS, ACTORS, COUNTRIES} from "../const.js";
import {generateComments} from "./comment.js";

const generateFilmCards = (number) => {
  return new Array(number).fill().map(generateFilmCard);
};

const generateFilmCard = () => {
  return {
    title: getRandomItem(TITLES),
    titleOriginal: getRandomItem(TITLES),
    rating: `${getRandomInteger(1, 9)}.${getRandomInteger(1, 9)}`,
    year: getRandomItem(YEARS),
    duration: getRandomItem(DURATIONS),
    genres: getRandomArray(GENRES, 1, 5),
    poster: getRandomItem(POSTERS),
    description: getRandomArray(DESCRIPTIONS, 1, 5).join(` `),
    comments: generateComments(getRandomInteger(0, 5)).length,
    ageRating: getRandomItem(AGE_RATINGS),
    director: getRandomItem(DIRECTORS),
    writers: getRandomArray(WRITERS, 1, 5).join(`, `),
    actors: getRandomArray(ACTORS, 1, 5).join(`, `),
    releaseDate: humanizeDate(getRandomDate(new Date(getRandomItem(YEARS), 0, 1), new Date())),
    country: getRandomItem(COUNTRIES),
    onWatchList: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1))
  };
};

export {generateFilmCards};
