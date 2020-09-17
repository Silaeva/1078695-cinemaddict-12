import {getRandomInteger, getRandomArray, getRandomItem, getRandomDate} from "../utils/common.js";
import {TITLES, GENRES, POSTERS, DESCRIPTIONS, DIRECTORS, WRITERS, ACTORS, COUNTRIES} from "../const.js";
import {generateComments} from "../mock/comment.js";

const generateFilmCards = (number) => {
  return new Array(number).fill().map(generateFilmCard);
};

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const generateFilmCard = () => {
  return {
    title: getRandomItem(TITLES),
    titleOriginal: getRandomItem(TITLES),
    rating: `${getRandomInteger(1, 9)}.${getRandomInteger(1, 9)}`,
    duration: getRandomInteger(20, 180),
    genres: getRandomArray(GENRES, 1, 3),
    poster: getRandomItem(POSTERS),
    description: getRandomArray(DESCRIPTIONS, 1, 5).join(` `),
    comments: generateComments(getRandomInteger(0, 5)),
    ageRating: getRandomInteger(0, 18),
    director: getRandomItem(DIRECTORS),
    writers: getRandomArray(WRITERS, 1, 5).join(`, `),
    actors: getRandomArray(ACTORS, 1, 5).join(`, `),
    releaseDate: getRandomDate(new Date(getRandomInteger(1900, 2020), 0, 1), new Date()),
    country: getRandomItem(COUNTRIES),
    onWatchList: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    watchedDate: getRandomDate(new Date(getRandomInteger(2019, 2020), 0, 1), new Date()),
    id: generateId()
  };
};

export {generateFilmCards, generateFilmCard, generateId};
