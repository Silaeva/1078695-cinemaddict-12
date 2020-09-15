import {FilterType} from "../const";

const filter = {
  [FilterType.ALL]: (filmCards) => filmCards,
  [FilterType.WATCHLIST]: (filmCards) => filmCards.filter((filmCard) => filmCard.onWatchList),
  [FilterType.HISTORY]: (filmCards) => filmCards.filter((filmCard) => filmCard.isWatched),
  [FilterType.FAVORITES]: (filmCards) => filmCards.filter((filmCard) => filmCard.isFavorite)
};

export {filter};
