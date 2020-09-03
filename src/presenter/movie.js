import FilmCardView from "../view/film-card.js";
import DetailsFilmView from "../view/details-film.js";
import {render, append, remove, replace} from "../utils/render.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  DETAILS: `DETAILS`
};

class Movie {
  constructor(filmContainer, changeData, resetAllPopups) {
    this._filmListContainer = filmContainer;
    this._changeData = changeData;
    this._resetAllPopups = resetAllPopups;

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
    this._mode = Mode.DEFAULT;

    this._onFilmCardClick = this._onFilmCardClick.bind(this);
    this._handleToWatchlistClick = this._handleToWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
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


    this._filmCardComponent.setFilmClickHandler(this._onFilmCardClick);
    this._filmCardComponent.setToWatchlistClickHandler(this._handleToWatchlistClick);
    this._filmCardComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmDetailsComponent.setCloseBtnHandler(this._onCloseBtnClick);

    const filmsListContainer = this._filmListContainer.getElement().querySelector(`.films-list__container`);

    if (prevFilmCardComponent === null || prevFilmDetailsComponent === null) {
      render(filmsListContainer, this._filmCardComponent);
      return;
    }

    replace(this._filmCardComponent, prevFilmCardComponent);

    if (this._mode === Mode.DETAILS) {
      replace(this._filmDetailsComponent, prevFilmDetailsComponent);
    }

    remove(prevFilmCardComponent);
    remove(prevFilmDetailsComponent);

  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._filmDetailsComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closeDetails();
      this._changeData(this._filmCard);
    }
  }

  _showDetails() {
    append(this._mainContainer, this._filmDetailsComponent);
    this._filmDetailsComponent.setEscPressHandler(this._onEscKeyDown);

    this._resetAllPopups();
    this._mode = Mode.DETAILS;
  }

  _onEscKeyDown(filmCard) {
    this._closeDetails();
    this._changeData(filmCard);
  }

  _onFilmCardClick() {
    this._showDetails();
  }

  _closeDetails() {
    remove(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._mode = Mode.DEFAULT;
  }

  _handleToWatchlistClick() {
    this._changeData(
        Object.assign(
            {},
            this._filmCard,
            {
              onWatchList: !this._filmCard.onWatchList
            }
        )
    );
  }

  _handleWatchedClick() {
    this._changeData(
        Object.assign(
            {},
            this._filmCard,
            {
              isWatched: !this._filmCard.isWatched
            }
        )
    );
  }

  _handleFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._filmCard,
            {
              isFavorite: !this._filmCard.isFavorite
            }
        )
    );
  }

  _onCloseBtnClick(filmCard) {
    this._closeDetails();
    this._changeData(filmCard);
  }
}

export default Movie;
