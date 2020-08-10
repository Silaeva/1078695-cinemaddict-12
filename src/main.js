import {createUserProfileTemplate} from "./view/user-profile.js";
import {createFilterTemplate} from "./view/filter.js";
import {createSortimgTemplate} from "./view/sorting.js";
import {createFilmsSectionTemplate} from "./view/films-section.js";
import {createFilmsListTemplate} from "./view/films-list.js";
import {createFilmsListExtraTemplate} from "./view/films-list-extra.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createShowMoreButtonTemplate} from "./view/show-more-button.js";
import {createStatisticsTemplate} from "./view/statistics.js";
import {createFilmDetailsTemplate} from "./view/details-film.js";
import {generateFilmCards} from "./mock/film-card.js";
import {generateFilter, filmCardsToFilter} from "./mock/filter.js";
import {CountCards, ESC_KEY_CODE} from "./const.js";

// const comments = generateComments(getRandomInteger(0, 5));

const filmCards = generateFilmCards(CountCards.ALL);

const filters = generateFilter(filmCards);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

render(siteHeaderElement, createUserProfileTemplate(filmCardsToFilter.history(filmCards)));

render(siteMainElement, createFilterTemplate(filters));
render(siteMainElement, createSortimgTemplate());
render(siteMainElement, createFilmsSectionTemplate());

const filmsElement = siteMainElement.querySelector(`.films`);

render(filmsElement, createFilmsListTemplate());

const filmsListElement = filmsElement.querySelector(`.films-list`);
const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

for (let i = 0; i < Math.min(filmCards.length, CountCards.PER_STEP); i++) {
  render(filmsListContainerElement, createFilmCardTemplate(filmCards[i]));
}

if (filmCards.length > CountCards.PER_STEP) {
  let renderedFilmCards = CountCards.PER_STEP;

  render(filmsListElement, createShowMoreButtonTemplate());

  const showMoreButton = filmsListElement.querySelector(`.films-list__show-more`);

  showMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    filmCards
    .slice(renderedFilmCards, renderedFilmCards + CountCards.PER_STEP)
    .forEach((filmCard) => render(filmsListContainerElement, createFilmCardTemplate(filmCard)));

    renderedFilmCards += CountCards.PER_STEP;

    if (renderedFilmCards >= filmCards.length) {
      showMoreButton.remove();
    }
  });
}

const topRatedClass = `top-rated`;
const moctCommentedClass = `most-commented`;
render(filmsElement, createFilmsListExtraTemplate(`Top rated`, topRatedClass));
render(filmsElement, createFilmsListExtraTemplate(`Most commented`, moctCommentedClass));

const topRatedContainer = filmsElement.querySelector(`.films-list__container--top-rated`);
const mostCommentedContainer = filmsElement.querySelector(`.films-list__container--most-commented`);

const topRatedFilmCards = filmCards.slice().sort((a, b) => b.rating - a.rating).splice(0, CountCards.EXTRA);
const mostCommentedFilmCards = filmCards.slice().sort((a, b) => b.commentsCount - a.commentsCount).splice(0, CountCards.EXTRA);

topRatedFilmCards.forEach((filmCard) => render(topRatedContainer, createFilmCardTemplate(filmCard)));
mostCommentedFilmCards.forEach((filmCard) => render(mostCommentedContainer, createFilmCardTemplate(filmCard)));

const openPopup = () => {
  render(siteMainElement, createFilmDetailsTemplate(filmCards[0]));

  const filmDetails = siteMainElement.querySelector(`.film-details`);
  const filmDetailsBtnClose = filmDetails.querySelector(`.film-details__close-btn`);

  filmDetailsBtnClose.addEventListener(`click`, () => filmDetails.remove());
  document.addEventListener(`keydown`, (evt) => evt.keyCode === ESC_KEY_CODE ? filmDetails.remove() : ``);
};

const filmCardClickHandler = (evt) => {
  const target = evt.target;
  if (target.classList.contains(`film-card__poster`) ||
      target.classList.contains(`film-card__title`) ||
      target.classList.contains(`film-card__comments`)) {
    openPopup();
  }
};

filmsElement.addEventListener(`click`, filmCardClickHandler);

render(footerStatisticsElement, createStatisticsTemplate(filmCards.length));
