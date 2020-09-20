import moment from "moment";

import {MAX_DESCRIPTION_LENGTH} from "../const.js";

const cropDescription = (text) => {
  if (text.length > MAX_DESCRIPTION_LENGTH) {
    return text.slice(0, MAX_DESCRIPTION_LENGTH) + `...`;
  } else {
    return text;
  }
};

const sortFilmByReleaseDate = (filmA, filmB) => {
  return new Date(filmB.releaseDate) - new Date(filmA.releaseDate);
};

const sortFilmByRating = (filmA, filmB) => {
  return filmB.rating - filmA.rating;
};

const getFormatReleaseDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

const getFormatReleaseYear = (date) => {
  return moment(date).format(`YYYY`);
};

const getFormatDuration = (duration) => {
  const time = moment.utc().startOf(`day`).add({minutes: duration});

  return duration > 60 ? time.format(`H[h] mm[m]`) : time.format(`mm[m]`);
};

const getFormatCommentDate = (date) => {
  return moment(date).format(`YYYY/MM/DD hh:mm`);
};

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

export {cropDescription, sortFilmByReleaseDate, sortFilmByRating, getFormatReleaseDate, getFormatReleaseYear, getFormatCommentDate, getFormatDuration, generateId};
