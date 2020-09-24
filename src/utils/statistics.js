const sortGenres = (films) => {
  let allGenres = [];

  films.forEach((film) => {
    allGenres = allGenres.concat(film.genres);
  });
  const numberWatchedGenres = {};
  allGenres.forEach((genre) => {
    numberWatchedGenres[genre] = numberWatchedGenres[genre] + 1 || 1;
  });
  return numberWatchedGenres; // получаем объект с подсчитаными жанрами (не сортиовоанный)
};

const getTopGenre = (films) => {
  const numberWatchedGenres = sortGenres(films);

  function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }

  return getKeyByValue(numberWatchedGenres, Math.max.apply(null, Object.values(numberWatchedGenres)));
};

export {sortGenres, getTopGenre};
