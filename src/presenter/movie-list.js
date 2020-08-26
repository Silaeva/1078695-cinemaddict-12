import FilmsSectionView from "../view/films-section.js";
import FilmsListView from "../view/films-list.js";
import SortView from "../view/sort.js";
import FilmsListTopRatedView from "../view/films-list-top-rated.js";
import FilmsListMostCommentedView from "../view/films-list-most-commented.js";
import ShowMoreButtonView from "../view/show-more-button.js";
import NoFilmsView from "../view/no-films.js";
import MoviePresenter from "./movie.js";
import {CountCards, SortType} from "../const.js";
import {sortFilmByDate, sortFilmByRating} from "../utils/film.js";
import {render, remove} from "../utils/render.js";
import {updateItem} from "../utils/common.js";

class MovieList {
  constructor(filmsContainer) {
    this._filmsContainer = filmsContainer;
    this._renderedFilmCards = CountCards.PER_STEP;
    this._currentSortType = SortType.DEFAULT;
    this._moviePresenter = {};

    this._filmsSectionComponent = new FilmsSectionView();
    this._filmsListComponent = new FilmsListView();
    this._sortComponent = new SortView();
    this._noFilmsComponent = new NoFilmsView();
    this._filmsListTopRatedComponent = new FilmsListTopRatedView();
    this._filmsListMostCommentedComponent = new FilmsListMostCommentedView();
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._handleFilmCardChange = this._handleFilmCardChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(filmCards) {
    this._filmCards = filmCards.slice();

    this._sourcedFilmCards = filmCards.slice();

    this._renderMovieList();
    this._renderExtra(filmCards);
  }

  _handleModeChange() {
    Object
      .values(this._moviePresenter)
      .forEach((presenter) => presenter.resetView());
  }


  _handleFilmCardChange(updatedCard) {
    this._filmCards = updateItem(this._filmCards, updatedCard);
    this._sourcedFilmCards = updateItem(this._sourcedFilmCards, updatedCard);
    this._moviePresenter[updatedCard.id].init(this._filmsContainer, updatedCard);
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
    const moviePresenter = new MoviePresenter(listComponent, this._handleFilmCardChange, this._handleModeChange);
    moviePresenter.init(this._filmsContainer, filmCard);
    this._moviePresenter[filmCard.id] = moviePresenter;
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
    Object
    .values(this._moviePresenter)
    .forEach((presenter) => presenter.destroy());
    this._moviePresenter = {};
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
