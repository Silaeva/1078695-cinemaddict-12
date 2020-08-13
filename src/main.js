import UserProfileView from "./view/user-profile.js";
import FilterView from "./view/filter.js";
import SortView from "./view/sort.js";
import FilmsSectionView from "./view/films-section.js";
import FilmsListView from "./view/films-list.js";
import FilmsListTopRatedView from "./view/films-list-top-rated.js"; //
import FilmsListMostCommentedView from "./view/films-list-most-commented.js"; //
import FilmCardView from "./view/film-card.js";
import ShowMoreButtonView from "./view/show-more-button.js";
import StatisticsView from "./view/statistics.js";
import DetailsFilm from "./view/details-film.js";
import {generateFilmCards} from "./mock/film-card.js";
import {generateFilter, filmCardsToFilter} from "./mock/filter.js";
import {CountCards, ESC_KEY_CODE} from "./const.js";
import {renderElement} from "./utils.js";

const filmCards = generateFilmCards(CountCards.ALL);

const filters = generateFilter(filmCards);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);

renderElement(siteHeaderElement, new UserProfileView(filmCardsToFilter.history(filmCards)).getElement()); // НЕ ОТРИСОВЫВАЕТСЯ!!!!!!!!!!!!!!!!!!

renderElement(siteMainElement, new FilterView(filters).getElement());
renderElement(siteMainElement, new SortView().getElement());

const filmsSectionComponent = new FilmsSectionView();
renderElement(siteMainElement, filmsSectionComponent.getElement());

const filmsListComponent = new FilmsListView();
renderElement(filmsSectionComponent.getElement(), filmsListComponent.getElement());

const filmsListContainerElement = filmsListComponent.getElement().querySelector(`.films-list__container`);

for (let i = 0; i < Math.min(filmCards.length, CountCards.PER_STEP); i++) {
  renderElement(filmsListContainerElement, new FilmCardView(filmCards[i]).getElement());
}

if (filmCards.length > CountCards.PER_STEP) {
  let renderedFilmCards = CountCards.PER_STEP;

  const showMoreButtonComponent = new ShowMoreButtonView();
  renderElement(filmsListComponent.getElement(), showMoreButtonComponent.getElement());

  showMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    filmCards
      .slice(renderedFilmCards, renderedFilmCards + CountCards.PER_STEP)
      .forEach((filmCard) => renderElement(filmsListContainerElement, new FilmCardView(filmCard).getElement()));

    renderedFilmCards += CountCards.PER_STEP;

    if (renderedFilmCards >= filmCards.length) {
      showMoreButtonComponent.getElement().remove();
      showMoreButtonComponent.removeElement();
    }
  });
}

const filmsListTopRatedComponent = new FilmsListTopRatedView();
const filmsListMostCommentedComponent = new FilmsListMostCommentedView();

renderElement(filmsSectionComponent.getElement(), filmsListTopRatedComponent.getElement());
renderElement(filmsSectionComponent.getElement(), filmsListMostCommentedComponent.getElement());

const topRatedContainer = filmsListTopRatedComponent.getElement().querySelector(`.films-list__container`);
const mostCommentedContainer = filmsListMostCommentedComponent.getElement().querySelector(`.films-list__container`);

const topRatedFilmCards = filmCards.slice().sort((a, b) => b.rating - a.rating).splice(0, CountCards.EXTRA);
const mostCommentedFilmCards = filmCards.slice().sort((a, b) => b.comments.length - a.comments.length).splice(0, CountCards.EXTRA);

topRatedFilmCards.forEach((filmCard) => renderElement(topRatedContainer, new FilmCardView(filmCard).getElement()));
mostCommentedFilmCards.forEach((filmCard) => renderElement(mostCommentedContainer, new FilmCardView(filmCard).getElement()));

renderElement(footerStatisticsElement, new StatisticsView(filmCards.length).getElement());

// открытие попапа

const openPopup = () => {
  const detailsFilmComponent = new DetailsFilm(filmCards[0]);
  renderElement(siteMainElement, detailsFilmComponent.getElement());

  const filmDetailsBtnClose = detailsFilmComponent.getElement().querySelector(`.film-details__close-btn`);

  filmDetailsBtnClose.addEventListener(`click`, () => {
    detailsFilmComponent.getElement().remove();
    detailsFilmComponent.removeElement();
  });
  document.addEventListener(`keydown`, (evt) => {
    if (evt.keyCode === ESC_KEY_CODE) {
      detailsFilmComponent.getElement().remove();
      detailsFilmComponent.removeElement();
    }
  });
};

const filmCardClickHandler = (evt) => {
  const target = evt.target;
  if (target.classList.contains(`film-card__poster`) ||
    target.classList.contains(`film-card__title`) ||
    target.classList.contains(`film-card__comments`)) {
    openPopup();
  }
};

filmsSectionComponent.getElement().addEventListener(`click`, filmCardClickHandler);
