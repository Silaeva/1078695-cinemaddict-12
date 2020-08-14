import {createElement} from "../utils.js";

const createFilmsSectionTemplate = () => {
  return (
    `<section class="films">
    </section>`
  );
};

class FilmsSection {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsSectionTemplate();
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

export default FilmsSection;
