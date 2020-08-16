import {createElement} from "../utils.js";

const createNoFilmsTemplate = () => {
  return (
    `<h2 class="films-list__title">There are no movies in our database</h2>`
  );
};

class NoFilms {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createNoFilmsTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate().trim());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default NoFilms;
