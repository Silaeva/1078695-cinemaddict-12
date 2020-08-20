import {MAX_DESCRIPTION_LENGTH} from "../const.js";

const cropDescription = (text) => {
  if (text.length > MAX_DESCRIPTION_LENGTH) {
    return text.slice(0, MAX_DESCRIPTION_LENGTH) + `...`;
  } else {
    return text;
  }
};

const getMovieDuration = (ms) => {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  return hours === 0 ? `${minutes}m` : `${hours}h ${minutes}m`;
};

export {cropDescription, getMovieDuration};
