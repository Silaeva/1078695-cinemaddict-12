import {cropDescription, getMovieDuration} from "../utils.js";

const createFilmCardTemplate = (filmCard) => {
  const {title, rating, year, duration, genres, poster, description, comments, onWatchList, isWatched, isFavorite} = filmCard;

  const checkStatus = (status) => {
    return status ? `film-card__controls-item--active` : ``;
  };
  const genresString = genres.join(` `);
  const cropedDescription = cropDescription(description);

  return (
    `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${year}</span>
      <span class="film-card__duration">${getMovieDuration(duration)}</span>
      <span class="film-card__genre">${genresString}</span>
    </p>
    <img src="./images/posters/${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${cropedDescription}</p>
    <a class="film-card__comments">${comments.length} ${comments.length === 1 ? `comment` : `comments`}</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${checkStatus(onWatchList)}">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${checkStatus(isWatched)}">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${checkStatus(isFavorite)}">Mark as favorite</button>
    </form>
  </article>`
  );
};

export {createFilmCardTemplate};
