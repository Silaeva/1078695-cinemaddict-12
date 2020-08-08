import {createUserProfileTemplate} from "./view/user-profile.js";
import {createFilterTemplate} from "./view/filter.js";
import {createSortimgTemplate} from "./view/sorting.js";
import {createFilmsSectionTemplate} from "./view/films-section.js";
import {createFilmsListTemplate} from "./view/films-list.js";
import {createFilmsListExtraTemplate} from "./view/films-list-extra.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createShowMoreButtonTemplate} from "./view/show-more-button.js";
import {createStatisticsTemplate} from "./view/statistics.js";
import {createFilmDetails} from "./view/details-film.js";
import {createCommentsTamplate} from "./view/comment.js";
import {generateFilmCards} from "./mock/film-card.js";
import {generateComments} from "./mock/comment.js";
import {generateFilter, filmCardsToFilter} from "./mock/filter.js";
import {CountCards, ESC_KEY_CODE} from "./const.js";
import {getRandomInteger} from "./utils.js";

const comments = generateComments(getRandomInteger(0, 5));

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

render(filmsElement, createFilmsListExtraTemplate(`Top rated`));
render(filmsElement, createFilmsListExtraTemplate(`Most commented`));

const filmsListExtraElements = filmsElement.querySelectorAll(`.films-list--extra`);

filmsListExtraElements.forEach((item) => {
  const filmsExtraContainerElement = item.querySelector(`.films-list__container`);
  for (let i = 0; i < CountCards.EXTRA; i++) {
    render(filmsExtraContainerElement, createFilmCardTemplate(filmCards[i]));
  }
});

render(footerStatisticsElement, createStatisticsTemplate(filmCards.length));

const filmCardElements = siteMainElement.querySelectorAll(`.film-card`);

const openPopup = () => {
  render(siteMainElement, createFilmDetails(filmCards[0]));
  const filmDetails = siteMainElement.querySelector(`.film-details`);


  const commentsListElement = filmDetails.querySelector(`.film-details__comments-list`);

  render(commentsListElement, createCommentsTamplate(comments));

  const filmDetailsBtnClose = filmDetails.querySelector(`.film-details__close-btn`);
  filmDetailsBtnClose.addEventListener(`click`, () => filmDetails.remove());
  document.addEventListener(`keydown`, (evt) => evt.keyCode === ESC_KEY_CODE ? filmDetails.remove() : ``);
};

filmCardElements.forEach((element) => {
  element.addEventListener(`click`, (evt) => {
    const target = evt.target;

    if (target.classList.contains(`film-card__poster`) ||
        target.classList.contains(`film-card__title`) ||
        target.classList.contains(`film-card__comments`)) {
      openPopup();
    }
  });
});

export {comments};
