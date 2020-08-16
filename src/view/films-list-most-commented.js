import {createElement} from "../utils.js";

const createFilmsListMostCommentedTemplate = () => {
  return (
    `<section class="films-list--extra">
    <h2 class="films-list__title">Most commented</h2>
    <div class="films-list__container">
    </div>
  </section>`
  );
};

class FilmsListMostCommented {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsListMostCommentedTemplate();
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

export default FilmsListMostCommented;
