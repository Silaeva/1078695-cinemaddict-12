import {getFormatDuration, getFormatReleaseDate, getFormatCommentDate} from "../utils/film.js";
import {createElement, render} from "../utils/render.js";
import {generateId} from "../mock/film-card.js";
import {keyCode} from "../const.js";
import CommentView from "../view/comment.js";
import SmartView from "./smart.js";

const createFilmDetailsTemplate = (filmCard) => {
  const {title, titleOriginal, rating, director, writers, actors, releaseDate, country, duration, genres, poster, description, onWatchList, isWatched, isFavorite, ageRating, comments} = filmCard;

  const genreTitle = genres.length > 1 ? `genres` : `genre`;

  const createGenresTemplate = (genreItems) => {
    return genreItems.map((genreItem) => `<span class="film-details__genre">${genreItem}</span>`).join(``);
  };

  const isChecked = (boolean) => boolean ? `checked` : ``;

  return (
    `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

          <p class="film-details__age">${ageRating}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${titleOriginal}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${getFormatReleaseDate(releaseDate)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${getFormatDuration(duration)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${genreTitle}</td>
              <td class="film-details__cell">
                ${createGenresTemplate(genres)}
              </td>
            </tr>
          </table>

          <p class="film-details__film-description">
            ${description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isChecked(onWatchList)}>
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isChecked(isWatched)}>
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isChecked(isFavorite)}>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>

    <div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
        <ul class="film-details__comments-list">
        </ul>
        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`
  );
};

class DetailsFilm extends SmartView {
  constructor(filmCard, comments) {
    super();
    this._filmCard = filmCard;
    this._comments = comments;

    this._closeBtnHandler = this._closeBtnHandler.bind(this);
    this._escPressHandler = this._escPressHandler.bind(this);
    this._onWatchListToggleHandler = this._onWatchListToggleHandler.bind(this);
    this._isWatchedToggleHandler = this._isWatchedToggleHandler.bind(this);
    this._isFavoriteToggleHandler = this._isFavoriteToggleHandler.bind(this);
    this._addCommentHandler = this._addCommentHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);

    this._selectEmojiHandler = this._selectEmojiHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._filmCard);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate().trim());
      this._renderComments(this._comments);
    }
    return this._element;
  }

  _renderComments(comments) {
    const commentsContainer = this.getElement().querySelector(`.film-details__comments-list`);
    comments.map((comment) => {
      return render(commentsContainer, new CommentView(comment));
    });
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setCloseBtnHandler(this._callback.closeClick);
    this.setDeleteCommentHandler(this._callback.deleteClick);
    this.setAddCommentHandler(this._callback.addComment);
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, this._onWatchListToggleHandler);
    this.getElement().querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, this._isWatchedToggleHandler);
    this.getElement().querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, this._isFavoriteToggleHandler);
    this.getElement().querySelector(`.film-details__emoji-list`)
      .addEventListener(`click`, this._selectEmojiHandler);
  }

  _onWatchListToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      onWatchList: !this._filmCard.onWatchList
    });
  }

  _isWatchedToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      isWatched: !this._filmCard.isWatched
    });
  }

  _isFavoriteToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      isFavorite: !this._filmCard.isFavorite
    });
  }

  _selectEmojiHandler(evt) {
    if (evt.target.tagName === `INPUT`) {
      const emoji = evt.target.value;
      const emojiContainer = this.getElement().querySelector(`.film-details__add-emoji-label`);
      emojiContainer.innerHTML = `<img class="film-details__add-emoji-img" src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji" data-emoji="${emoji}">`;
    }
  }

  _closeBtnHandler(evt) {
    evt.preventDefault();
    this._callback.closeClick(this._filmCard);
  }

  setCloseBtnHandler(callback) {
    this._callback.closeClick = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._closeBtnHandler);
  }

  _escPressHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      this._callback.escPress(this._filmCard);
    }
  }

  setEscPressHandler(callback) {
    this._callback.escPress = callback;
    document.addEventListener(`keydown`, this._escPressHandler);
  }

  _addCommentHandler(evt) {
    if (evt.keyCode === keyCode.ENTER && (evt.ctrlKey || evt.metaKey)) {
      const message = this.getElement().querySelector(`.film-details__comment-input`).value.trim();
      const emoji = this.getElement().querySelector(`.film-details__add-emoji-img`).dataset.emoji;

      if (message && emoji) {
        const newComment = {
          id: generateId(),
          author: `User`,
          emotion: emoji,
          text: message,
          date: getFormatCommentDate(new Date())
        };

        this._callback.addComment(newComment);
      }
    }
  }

  setAddCommentHandler(callback) {
    this._callback.addComment = callback;
    this.getElement().addEventListener(`keydown`, this._addCommentHandler);
  }

  _deleteClickHandler(evt) {
    evt.preventDefault();
    const currentCommentId = evt.target.closest(`.film-details__comment`).dataset.id;
    const currentComment = this._comments.filter((comment) => comment.id === +currentCommentId);
    this._callback.deleteClick(currentComment);
  }

  setDeleteCommentHandler(callback) {
    this._callback.deleteClick = callback;
    const deleteButtons = this.getElement().querySelectorAll(`.film-details__comment-delete`);

    deleteButtons.forEach((button) => button.addEventListener(`click`, this._deleteClickHandler));
  }

}

export default DetailsFilm;
