import FilmCardView from "../view/film-card.js";
import DetailsFilmView from "../view/details-film.js";
import {render, append, remove, replace} from "../utils/render.js";
import {ESC_KEY_CODE} from "../const.js";

class Movie {
  constructor(filmContainer) {
    this._filmListContainer = filmContainer;

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;

    this._onFilmCardClick = this._onFilmCardClick.bind(this);
    this._onCloseBtnClick = this._onCloseBtnClick.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  init(mainContainer, filmCard) {
    this._filmCard = filmCard;
    this._mainContainer = mainContainer;

    const prevFilmCardComponent = this._filmCardComponent;
    const prevFilmDetailsComponent = this._filmDetailsComponent;

    this._filmCardComponent = new FilmCardView(filmCard);
    this._filmDetailsComponent = new DetailsFilmView(filmCard);

    const filmsListContainer = this._filmListContainer.getElement().querySelector(`.films-list__container`);

    this._filmCardComponent.setFilmClickHandler(this._onFilmCardClick);
    this._filmDetailsComponent.setCloseBtnHandler(this._onCloseBtnClick);

    if (prevFilmCardComponent === null || prevFilmDetailsComponent === null) {
      render(filmsListContainer, this._filmCardComponent);
      return;
    }

    if (this._filmListContainer.getElement().contains(prevFilmCardComponent.getElement())) {
      replace(this._filmCardComponent, prevFilmCardComponent);
    }

    if (this._filmListContainer.getElement().contains(prevFilmDetailsComponent.getElement())) {
      replace(this._filmDetailsComponent, prevFilmDetailsComponent);
    }

    remove(prevFilmCardComponent);
    remove(prevFilmDetailsComponent);

  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._filmDetailsComponent);
  }

  _showDetails() {
    append(this._mainContainer, this._filmDetailsComponent);
  }

  _closeDetails() {
    remove(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _onCloseBtnClick() {
    this._closeDetails();
  }

  _onEscKeyDown(evt) {
    if (evt.keyCode === ESC_KEY_CODE) {
      evt.preventDefault();
      this._closeDetails();
    }
  }

  _onFilmCardClick() {
    this._showDetails();
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

}

export default Movie;
