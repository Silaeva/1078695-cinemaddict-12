import {getRandomInteger, getRandomArray, getRandomItem, getRandomDate, humanizeDate} from "../utils.js";
import {TITLES, YEARS, DURATIONS, GENRES, POSTERS, DESCRIPTIONS, AGE_RATINGS, DIRECTORS, WRITERS, ACTORS, COUNTRIES} from "../const.js";
import {generateComments} from "./comment.js";

const generateFilmCard = () => {
  return {
    title: getRandomItem(TITLES),
    rating: `${getRandomInteger(1, 9)}.${getRandomInteger(1, 9)}`,
    year: getRandomItem(YEARS),
    duration: getRandomItem(DURATIONS),
    genre: getRandomArray(GENRES, 1, 5).join(` `),
    poster: `./images/posters/${getRandomItem(POSTERS)}`,
    description: getRandomArray(DESCRIPTIONS, 1, 5).join(` `),
    comments: generateComments(getRandomInteger(0, 5)).length,
    ageRating: getRandomItem(AGE_RATINGS),
    director: getRandomItem(DIRECTORS),
    writer: getRandomArray(WRITERS, 1, 5).join(`, `),
    actors: getRandomArray(ACTORS, 1, 5).join(`, `),
    releaseDate: humanizeDate(getRandomDate(new Date(getRandomItem(YEARS), 0, 1), new Date())),
    country: getRandomItem(COUNTRIES),
    onWatchList: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1))
  };
};

export {generateFilmCard};
