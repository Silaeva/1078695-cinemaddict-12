const filmCardsToFilter = {
  all: (filmCards) => filmCards.length,
  watchlist: (filmCards) => filmCards.filter((filmCard) => filmCard.onWatchList).length,
  history: (filmCards) => filmCards.filter((filmCard) => filmCard.isWatched).length,
  favorites: (filmCards) => filmCards.filter((filmCard) => filmCard.isFavorite).length
};

const generateFilter = (filmCards) => {
  return Object.entries(filmCardsToFilter).map(([filterName, countFilmCards]) => {
    return {
      name: filterName,
      count: countFilmCards(filmCards),
    };
  });
};

export {generateFilter, filmCardsToFilter};
