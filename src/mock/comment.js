import {getRandomItem, getRandomInteger} from "../utils.js";
import {COMMENTS_TEXTS, EMOTIONS, AUTHORS} from "../const.js";

const addZero = (n) => n < 10 ? `0` + n : n;

const getFormattedCurDate = (ms) => {
  const date = new Date(ms);
  return `${date.getFullYear()}/${addZero(date.getMonth() + 1)}/${addZero(date.getDate())} ${addZero(date.getHours())}:${addZero(date.getMinutes())}`;
};

const generateComments = (number) => {
  return new Array(number).fill().map(generateComment);
};

const generateComment = () => {
  return {
    text: getRandomItem(COMMENTS_TEXTS),
    emotion: getRandomItem(EMOTIONS),
    date: getFormattedCurDate(getRandomInteger(0, (new Date()).getTime())),
    author: getRandomItem(AUTHORS)
  };
};

export {generateComments};
