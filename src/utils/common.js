import {SHAKE_ANIMATION_TIMEOUT, rankCount} from "../const.js";

const getProfileRating = (watchedFilms) => {
  let profileRating = ``;
  if (watchedFilms > 0 && watchedFilms <= rankCount.NOVICE_TO) {
    profileRating = `Novice`;
  } else if (watchedFilms > rankCount.NOVICE_TO && watchedFilms <= rankCount.FAN_TO) {
    profileRating = `Fan`;
  } else if (watchedFilms >= rankCount.MOVIE_BUFF_FROM) {
    profileRating = `Movie buff`;
  }
  return profileRating;
};


const shake = (element, callback) => {
  element.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
  setTimeout(() => {
    element.style.animation = ``;
    if (callback) {
      callback();
    }
  }, SHAKE_ANIMATION_TIMEOUT);
};


export {getProfileRating, shake};
