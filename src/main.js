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
import DetailsFilmView from "./view/details-film.js";
import NoFilmsView from "./view/no-films.js";
import {generateFilmCards} from "./mock/film-card.js";
import {generateFilter} from "./mock/filter.js";
import {CountCards, ESC_KEY_CODE} from "./const.js";
import {renderElement} from "./utils.js";

const filmCards = generateFilmCards(CountCards.ALL);
const filters = generateFilter(filmCards);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);

const watchedCount = (filters.filter((filter) => filter.name === `history`))[0].count;
renderElement(siteHeaderElement, new UserProfileView(watchedCount).getElement());

renderElement(siteMainElement, new FilterView(filters).getElement());

const filmsSectionComponent = new FilmsSectionView();

if (filmCards.length === 0) {
  renderElement(siteMainElement, new NoFilmsView().getElement());
} else {
  renderElement(siteMainElement, new SortView().getElement());
  renderElement(siteMainElement, filmsSectionComponent.getElement());
}

const filmsListComponent = new FilmsListView();
renderElement(filmsSectionComponent.getElement(), filmsListComponent.getElement());

const filmsListContainerElement = filmsListComponent.getElement().querySelector(`.films-list__container`);

const renderFilm = (container, filmCard) => {
  const filmCardComponent = new FilmCardView(filmCard);
  const filmDetailsComponent = new DetailsFilmView(filmCard);

  const showDetails = () => {
    siteMainElement.appendChild(filmDetailsComponent.getElement());
  };

  const closeDetails = () => {
    siteMainElement.removeChild(filmDetailsComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.keyCode === ESC_KEY_CODE) {
      evt.preventDefault();
      closeDetails();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const onFilmCardClick = () => {
    showDetails();
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  filmCardComponent.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, onFilmCardClick);
  filmCardComponent.getElement().querySelector(`.film-card__title`).addEventListener(`click`, onFilmCardClick);
  filmCardComponent.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, onFilmCardClick);

  filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, () => {
    closeDetails();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  renderElement(container, filmCardComponent.getElement());
};

for (let i = 0; i < Math.min(filmCards.length, CountCards.PER_STEP); i++) {
  renderFilm(filmsListContainerElement, filmCards[i]);
}

// показ кнопки

if (filmCards.length > CountCards.PER_STEP) {
  let renderedFilmCards = CountCards.PER_STEP;

  const showMoreButtonComponent = new ShowMoreButtonView();
  renderElement(filmsListComponent.getElement(), showMoreButtonComponent.getElement());

  showMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    filmCards
      .slice(renderedFilmCards, renderedFilmCards + CountCards.PER_STEP)
      .forEach((filmCard) => renderFilm(filmsListContainerElement, filmCard));

    renderedFilmCards += CountCards.PER_STEP;

    if (renderedFilmCards >= filmCards.length) {
      showMoreButtonComponent.getElement().remove();
      showMoreButtonComponent.removeElement();
    }
  });
}

// extra блоки

const filmsListTopRatedComponent = new FilmsListTopRatedView();
const filmsListMostCommentedComponent = new FilmsListMostCommentedView();

renderElement(filmsSectionComponent.getElement(), filmsListTopRatedComponent.getElement());
renderElement(filmsSectionComponent.getElement(), filmsListMostCommentedComponent.getElement());

const topRatedContainer = filmsListTopRatedComponent.getElement().querySelector(`.films-list__container`);
const mostCommentedContainer = filmsListMostCommentedComponent.getElement().querySelector(`.films-list__container`);

const topRatedFilmCards = filmCards.slice().sort((a, b) => b.rating - a.rating).splice(0, CountCards.EXTRA);
const mostCommentedFilmCards = filmCards.slice().sort((a, b) => b.comments.length - a.comments.length).splice(0, CountCards.EXTRA);

topRatedFilmCards.forEach((filmCard) => renderFilm(topRatedContainer, filmCard));
mostCommentedFilmCards.forEach((filmCard) => renderFilm(mostCommentedContainer, filmCard));


renderElement(footerStatisticsElement, new StatisticsView(filmCards.length).getElement());
