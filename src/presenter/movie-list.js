import FilmsSectionView from "../view/films-section.js";
import FilmsListView from "../view/films-list.js";
import SortView from "../view/sort.js";
import FilmsListTopRatedView from "../view/films-list-top-rated.js";
import FilmsListMostCommentedView from "../view/films-list-most-commented.js";
import FilmCardView from "../view/film-card.js";
import ShowMoreButtonView from "../view/show-more-button.js";
import DetailsFilmView from "../view/details-film.js";
import NoFilmsView from "../view/no-films.js";
import {render, append, remove} from "../utils/render.js";
import {CountCards, ESC_KEY_CODE, SortType} from "../const.js";
import {sortFilmByDate, sortFilmByRating} from "../utils/film.js";

class MovieList {
  constructor(filmsContainer) {
    this._filmsContainer = filmsContainer;
    this._renderedFilmCards = CountCards.PER_STEP;
    this._currentSortType = SortType.DEFAULT;

    this._filmsSectionComponent = new FilmsSectionView();
    this._filmsListComponent = new FilmsListView();
    this._sortComponent = new SortView();
    this._noFilmsComponent = new NoFilmsView();
    this._filmsListTopRatedComponent = new FilmsListTopRatedView();
    this._filmsListMostCommentedComponent = new FilmsListMostCommentedView();
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(filmCards) {
    this._filmCards = filmCards.slice();

    this._sourcedFilmCards = filmCards.slice();

    this._renderMovieList();
    this._renderExtra(filmCards);
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.BY_DATE:
        this._filmCards.sort(sortFilmByDate);
        break;
      case SortType.BY_RATING:
        this._filmCards.sort(sortFilmByRating);
        break;
      default:
        this._filmCards = this._sourcedFilmCards.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortFilms(sortType);
    this._clearFilmCardsList();
    this._renderFilmCardsList();
  }

  _renderSort() {
    render(this._filmsContainer, this._sortComponent);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilm(listComponent, filmCard) {
    const filmCardComponent = new FilmCardView(filmCard);
    const filmDetailsComponent = new DetailsFilmView(filmCard);

    const showDetails = () => {
      append(this._filmsContainer, filmDetailsComponent);
    };

    const closeDetails = () => {
      remove(filmDetailsComponent);
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

    filmCardComponent.setFilmClickHandler(onFilmCardClick);

    filmDetailsComponent.setCloseBtnHandler(() => {
      closeDetails();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    const filmsListContainer = listComponent.getElement().querySelector(`.films-list__container`);
    render(filmsListContainer, filmCardComponent);
  }

  _renderFilms(from, to) {
    this._filmCards
      .slice(from, to)
      .forEach((filmCard) => this._renderFilm(this._filmsListComponent, filmCard));
  }

  _renderNoFilms() {
    render(this._filmsContainer, this._noFilmsComponent);
  }

  _handleShowMoreButtonClick() {
    this._renderFilms(this._renderedFilmCards, this._renderedFilmCards + CountCards.PER_STEP);
    this._renderedFilmCards += CountCards.PER_STEP;

    if (this._renderedFilmCards >= this._filmCards.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    render(this._filmsListComponent, this._showMoreButtonComponent);
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _clearFilmCardsList() {
    this._filmsListComponent.getElement().querySelector(`.films-list__container`).innerHTML = ``;
    this._renderedFilmCards = CountCards.PER_STEP;
  }

  _renderFilmCardsList() {
    this._renderFilms(0, Math.min(this._filmCards.length, CountCards.PER_STEP));

    if (this._filmCards.length > CountCards.PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderMovieList() {
    if (this._filmCards.length < 1) {
      this._renderNoFilms();
      return;
    }

    this._renderSort();
    render(this._filmsContainer, this._filmsSectionComponent);
    render(this._filmsSectionComponent, this._filmsListComponent);
    this._renderFilmCardsList();
  }

  _renderExtra(filmCards) {
    render(this._filmsSectionComponent, this._filmsListTopRatedComponent);
    render(this._filmsSectionComponent, this._filmsListMostCommentedComponent);

    const topRatedFilmCards = filmCards.slice().sort((a, b) => b.rating - a.rating).splice(0, CountCards.EXTRA);
    const mostCommentedFilmCards = filmCards.slice().sort((a, b) => b.comments.length - a.comments.length).splice(0, CountCards.EXTRA);

    topRatedFilmCards.forEach((filmCard) => this._renderFilm(this._filmsListTopRatedComponent, filmCard));
    mostCommentedFilmCards.forEach((filmCard) => this._renderFilm(this._filmsListMostCommentedComponent, filmCard));
  }
}

export default MovieList;
