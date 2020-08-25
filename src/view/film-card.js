import {cropDescription, getMovieDuration} from "../utils/film.js";
import AbstractView from "./abstract.js";

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

class FilmCard extends AbstractView {
  constructor(filmCard) {
    super();
    this._filmCard = filmCard;

    this._filmClickHandler = this._filmClickHandler.bind(this);
    this._toWatchlistClickHandler = this._toWatchlistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._filmCard);
  }

  _filmClickHandler(evt) {
    evt.preventDefault();
    if (evt.target.classList.contains(`film-card__poster`) ||
        evt.target.classList.contains(`film-card__title`) ||
        evt.target.classList.contains(`film-card__comments`)) {
      this._callback.filmClick();
    }
  }

  _toWatchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.toWatchlistClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setFilmClickHandler(callback) {
    this._callback.filmClick = callback;
    this.getElement().addEventListener(`click`, this._filmClickHandler);
  }

  setToWatchlistClickHandler(callback) {
    this._callback.toWatchlistClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._toWatchlistClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._watchedClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }

}

export default FilmCard;
