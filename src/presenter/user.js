import {render, remove, replace} from "../utils/render.js";
import {getProfileRating} from "../utils/common.js";
import UserView from "../view/user.js";

export default class User {
  constructor(headerContainer, filmsModel) {
    this._headerContainer = headerContainer;
    this._filmsModel = filmsModel;

    this._userComponent = null;
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._filmsModel.addObserver(this._handleModelEvent);
  }

  init() {
    const user = this._getUser();
    const prevUserComponent = this._userComponent;
    this._userComponent = new UserView(user);

    if (prevUserComponent === null) {
      render(this._headerContainer, this._userComponent);
      return;
    }

    if (prevUserComponent) {
      replace(this._userComponent, prevUserComponent);
      return;
    }

    remove(prevUserComponent);
  }

  destroy() {
    remove(this._userComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _getUser() {
    const watchedFilms = this._filmsModel.getFilms().filter((item) => item.isWatched).length;
    const user = getProfileRating(watchedFilms);
    return user;
  }
}
