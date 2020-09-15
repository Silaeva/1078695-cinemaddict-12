import {render, remove, replace} from "../utils/render.js";
import DetailsFilmView from "../view/details-film.js";
import {UpdateType} from "../const.js";

class DetailsFilm {
  constructor(mainContainer, changeData, resetAllPopups) {
    this._mainContainer = mainContainer;
    this._filmDetailsComponent = null;

    this._changeData = changeData;
    this._resetAllPopups = resetAllPopups;

    this._handleToWatchlistClick = this._handleToWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);

    this._onCloseBtnClick = this._onCloseBtnClick.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._handleAddComment = this._handleAddComment.bind(this);
    this._handleDeleteComment = this._handleDeleteComment.bind(this);
  }

  init(film, commentsModel) {
    this._film = film;
    this._commentsModel = commentsModel;

    this._commentsModel.setComments(film.comments);

    const prevFilmDetailsComponent = this._filmDetailsComponent;

    this._filmDetailsComponent = new DetailsFilmView(this._film, this._commentsModel.getComments());


    this._filmDetailsComponent.setWatchlistCardClickHandler(this._handleToWatchlistClick);
    this._filmDetailsComponent.setFavoriteCardClickHandler(this._handleFavoriteClick);
    this._filmDetailsComponent.setWatchedCardClickHandler(this._handleWatchedClick);
    this._filmDetailsComponent.setCloseBtnHandler(this._onCloseBtnClick);
    this._filmDetailsComponent.setEscPressHandler(this._onEscKeyDown);
    this._filmDetailsComponent.setAddCommentHandler(this._handleAddComment);
    this._filmDetailsComponent.setDeleteCommentHandler(this._handleDeleteComment);

    if (prevFilmDetailsComponent === null) {
      render(this._mainContainer, this._filmDetailsComponent);
      return;
    }

    if (prevFilmDetailsComponent) {
      replace(this._filmDetailsComponent, prevFilmDetailsComponent);
      return;
    }

    remove(prevFilmDetailsComponent);
  }

  destroy() {
    remove(this._filmDetailsComponent);
  }

  _handleToWatchlistClick(data) {
    this._changeData(
        UpdateType.PATCH,
        Object.assign({}, this._film, data));
  }

  _handleFavoriteClick(data) {
    this._changeData(
        UpdateType.PATCH,
        Object.assign({}, this._film, data));
  }

  _handleWatchedClick(data) {
    this._changeData(
        UpdateType.PATCH,
        Object.assign({}, this._film, data));
  }

  _onEscKeyDown(filmCard) {
    this._changeData(
        UpdateType.MINOR,
        filmCard);
    this.destroy();
  }

  _onCloseBtnClick(filmCard) {
    this._changeData(
        UpdateType.MINOR,
        filmCard);
    this.destroy();
  }

  _handleAddComment(comment) {
    this._commentsModel.addComment(UpdateType.MINOR, comment);
  }

  _handleDeleteComment(comment) {
    this._commentsModel.deleteComment(UpdateType.MINOR, comment);
  }
}

export default DetailsFilm;
