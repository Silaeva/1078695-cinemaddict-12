import {SHAKE_ANIMATION_TIMEOUT, rankCount, UserRank} from "../const.js";

const getProfileRating = (watchedFilms) => {
  let profileRating = ``;
  if (watchedFilms > 0 && watchedFilms <= rankCount.NOVICE_TO) {
    profileRating = UserRank.NOVICE;
  } else if (watchedFilms > rankCount.NOVICE_TO && watchedFilms <= rankCount.FAN_TO) {
    profileRating = UserRank.FAN;
  } else if (watchedFilms >= rankCount.MOVIE_BUFF_FROM) {
    profileRating = UserRank.MOVIE_BUFF;
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
