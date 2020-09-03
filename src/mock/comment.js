import {getRandomItem, getRandomInteger} from "../utils/common.js";
import {COMMENTS_TEXTS, EMOTIONS, AUTHORS} from "../const.js";

const generateComments = (number) => {
  return new Array(number).fill().map(generateComment);
};

const generateComment = () => {
  return {
    text: getRandomItem(COMMENTS_TEXTS),
    emotion: getRandomItem(EMOTIONS),
    date: getRandomInteger(0, (new Date()).getTime()),
    author: getRandomItem(AUTHORS)
  };
};

export {generateComments};
