import FilmCardView from "../view/film-card.js";
import {render, remove, replace} from "../utils/render.js";
import {UpdateType} from "../const.js";
import CommentsModel from "../model/comments.js";
import DetailsFilmPresenter from "./details-film.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  DETAILS: `DETAILS`
};

class Film {
  constructor(filmContainer, changeData, resetAllPopups) {
    this._filmListContainer = filmContainer;
    this._changeData = changeData;
    this._resetAllPopups = resetAllPopups;

    this._filmCardComponent = null;
    this._mode = Mode.DEFAULT;

    this._commentsModel = new CommentsModel();

    this._onFilmCardClick = this._onFilmCardClick.bind(this);
    this._handleToWatchlistClick = this._handleToWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleCommentsEvent = this._handleCommentsEvent.bind(this);
  }

  init(mainContainer, filmCard) {
    this._filmCard = filmCard;
    this._mainContainer = mainContainer;

    this._commentsModel.addObserver(this._handleCommentsEvent);

    const prevFilmCardComponent = this._filmCardComponent;

    this._filmCardComponent = new FilmCardView(filmCard);

    this._filmCardComponent.setFilmClickHandler(this._onFilmCardClick);
    this._filmCardComponent.setToWatchlistClickHandler(this._handleToWatchlistClick);
    this._filmCardComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    const filmsListContainer = this._filmListContainer.getElement().querySelector(`.films-list__container`);

    if (prevFilmCardComponent === null) {
      render(filmsListContainer, this._filmCardComponent);
      return;
    }

    replace(this._filmCardComponent, prevFilmCardComponent);

    remove(prevFilmCardComponent);
  }

  destroy() {
    remove(this._filmCardComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._detailsFilmPresenter.destroy();
      this._mode = Mode.DEFAULT;
    }
  }

  _showDetails() {
    this._detailsFilmPresenter = new DetailsFilmPresenter(this._mainContainer, this._changeData, this._resetAllPopups);
    this._detailsFilmPresenter.init(this._filmCard, this._commentsModel);
  }

  _onFilmCardClick() {
    this._resetAllPopups();
    this._mode = Mode.DETAILS;
    this._showDetails();
  }

  _handleToWatchlistClick() {
    this._changeData(
        UpdateType.MINOR,
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
        UpdateType.MINOR,
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
        UpdateType.MINOR,
        Object.assign(
            {},
            this._filmCard,
            {
              isFavorite: !this._filmCard.isFavorite
            }
        )
    );
  }

  _handleCommentsEvent() {
    this._changeData(
        UpdateType.PATCH,
        Object.assign(
            {},
            this._filmCard,
            {comments: this._commentsModel.getComments()}
        )
    );

    this._detailsFilmPresenter.init(this._filmCard, this._commentsModel);
  }
}

export default Film;
