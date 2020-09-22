import {render, remove, replace} from "../utils/render.js";
import DetailsFilmView from "../view/details-film.js";
import {UpdateType, AUTHORIZATION, END_POINT} from "../const.js";
import ApiComments from "../api-comments.js";

const SHAKE_ANIMATION_TIMEOUT = 600;

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

    this._apiComments = new ApiComments(END_POINT, AUTHORIZATION, film.id);

    this._apiComments.getComments(film.id)
    .then((comments) => {
      this._commentsModel.setComments(comments, true);
      this._renderPopup();
    })
    .catch(() => {
      this._commentsModel.setComments([], false);
      this._renderPopup();
    });


  }

  _renderPopup() {
    const prevFilmDetailsComponent = this._filmDetailsComponent;

    this._filmDetailsComponent = new DetailsFilmView(this._film, this._commentsModel);

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

  _onEscKeyDown() {
    this.destroy();
  }

  _onCloseBtnClick() {
    this.destroy();
  }

  _blockForm(boolean) {
    this._filmDetailsComponent.getElement().querySelectorAll(`INPUT`).forEach((input) => {
      input.disabled = boolean;
    });
    this._filmDetailsComponent.getElement().querySelector(`TEXTAREA`).disabled = boolean;
  }

  _shake(element, callback) {
    element.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      element.style.animation = ``;
      callback();
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  _handleAddComment(comment) {
    this._blockForm(true);
    this._apiComments.addComment(comment)
    .then((response) => {
      const newComment = response.comments[response.comments.length - 1];
      this._commentsModel.addComment(UpdateType.MINOR, newComment);
    })
    .catch(() => {
      this._shake(this._filmDetailsComponent.getElement(), () => {
        this._blockForm(false);
      });
    });
  }

  _handleDeleteComment(comment, currentCommentId) {
    const deletingComment = this._filmDetailsComponent.getElement().querySelector(`.film-details__comment[data-id="${currentCommentId}"]`);

    this._apiComments.deleteComment(comment)
    .then(() => {
      this._commentsModel.deleteComment(UpdateType.MINOR, comment);
    })
    .catch(() => {
      this._shake(deletingComment, () => {
        this.init(this._film, this._commentsModel);
      });
    });
  }
}

export default DetailsFilm;
