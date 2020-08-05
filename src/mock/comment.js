import {getFormattedDate, getRandomItem} from "../utils.js";
import {COMMENTS_TEXTS, EMOTIONS, AUTHORS} from "../const.js";

const generateComments = (number) => {
  return new Array(number).fill(``).map(generateComment);
};

const generateComment = () => {
  return {
    text: getRandomItem(COMMENTS_TEXTS),
    emotion: getRandomItem(EMOTIONS),
    date: getFormattedDate(),
    author: getRandomItem(AUTHORS)
  };
};

export {generateComments};
