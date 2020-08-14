import {createElement} from "../utils.js";

const createFilterItemTemplate = (filter) => {
  const {name, count} = filter;

  const filterTitle = name === `all` ? `all movies` : name;
  const filterCount = name === `all` ? `` : ` <span class="main-navigation__item-count">${count}</span>`;
  const filterActiveClassName = name === `all` ? ` main-navigation__item--active` : ``;

  return (
    `<a href="#${name}" class="main-navigation__item ${filterActiveClassName}">${filterTitle}${filterCount}</a>`
  );
};

const createFilterTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems.map((filter) => createFilterItemTemplate(filter)).join(``);
  return (
    `<nav class="main-navigation">
    <div class="main-navigation__items">
    ${filterItemsTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

class Filter {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
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

export default Filter;
