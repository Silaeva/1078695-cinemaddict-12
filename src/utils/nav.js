import {NavType} from "../const";

const nav = {
  [NavType.ALL]: (filmCards) => filmCards,
  [NavType.WATCHLIST]: (filmCards) => filmCards.filter((filmCard) => filmCard.onWatchList),
  [NavType.HISTORY]: (filmCards) => filmCards.filter((filmCard) => filmCard.isWatched),
  [NavType.FAVORITES]: (filmCards) => filmCards.filter((filmCard) => filmCard.isFavorite),
  [NavType.STATISTICS]: (filmCards) => filmCards
};

export {nav};
