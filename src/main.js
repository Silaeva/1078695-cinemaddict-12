import {createUserProfileTemplate} from "./view/user-profile.js";
import {createMenuTemplate} from "./view/menu.js";
import {createSortimgTemplate} from "./view/sorting.js";
import {createFilmsSectionTemplate} from "./view/films-section.js";
import {createFilmsListTemplate} from "./view/films-list.js";
import {createFilmsListExtraTemplate} from "./view/films-list-extra.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createShowMoreButtonTemplate} from "./view/show-more-button.js";
import {createStatisticsTemplate} from "./view/statistics.js";
import {generateFilmCard} from "./mock/film-card.js";
import {generateComments} from "./mock/comment.js";
import {CARDS_COUNT, EXTRA_CARDS_COUNT} from "./const.js";
import {getRandomInteger} from "./utils.js";

const comments = generateComments(getRandomInteger(0, 5));

const filmCards = new Array(CARDS_COUNT).fill().map(generateFilmCard);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

render(siteHeaderElement, createUserProfileTemplate());

render(siteMainElement, createMenuTemplate());
render(siteMainElement, createSortimgTemplate());
render(siteMainElement, createFilmsSectionTemplate());

const filmsElement = siteMainElement.querySelector(`.films`);

render(filmsElement, createFilmsListTemplate());

const filmsListElement = filmsElement.querySelector(`.films-list`);
const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

for (let i = 0; i < CARDS_COUNT; i++) {
  render(filmsListContainerElement, createFilmCardTemplate(filmCards[i]));
}

render(filmsListElement, createShowMoreButtonTemplate());

render(filmsElement, createFilmsListExtraTemplate(`Top rated`));
render(filmsElement, createFilmsListExtraTemplate(`Most commented`));

const filmsListExtraElements = filmsElement.querySelectorAll(`.films-list--extra`);

filmsListExtraElements.forEach((item) => {
  const filmsExtraContainerElement = item.querySelector(`.films-list__container`);
  for (let i = 0; i < EXTRA_CARDS_COUNT; i++) {
    render(filmsExtraContainerElement, createFilmCardTemplate(filmCards[i]));
  }
});

render(footerStatisticsElement, createStatisticsTemplate());
