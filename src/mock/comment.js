import {getRandomItem} from "../utils.js";
import {COMMENTS_TEXTS, EMOTIONS, AUTHORS} from "../const.js";

const addZero = (n) => n < 10 ? `0` + n : n;

const getFormattedCurDate = () => {
  const currentDate = new Date();
  return `${currentDate.getFullYear()}/${addZero(currentDate.getMonth() + 1)}/${addZero(currentDate.getDate())} ${addZero(currentDate.getHours())}:${addZero(currentDate.getMinutes())}`;
};

const generateComments = (number) => {
  return new Array(number).fill().map(generateComment);
};

const generateComment = () => {
  return {
    text: getRandomItem(COMMENTS_TEXTS),
    emotion: getRandomItem(EMOTIONS),
    date: getFormattedCurDate(),
    author: getRandomItem(AUTHORS)
  };
};

export {generateComments};
