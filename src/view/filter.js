import AbstractView from "./abstract.js";

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

class Filter extends AbstractView {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }
}

export default Filter;
