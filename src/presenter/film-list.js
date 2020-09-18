import FilmsSectionView from "../view/films-section.js";
import FilmsListView from "../view/films-list.js";
import SortView from "../view/sort.js";
import FilmsListTopRatedView from "../view/films-list-top-rated.js";
import FilmsListMostCommentedView from "../view/films-list-most-commented.js";
import ShowMoreButtonView from "../view/show-more-button.js";
import NoFilmsView from "../view/no-films.js";
import FilmPresenter from "./film.js";
import StatisticsPresenter from "./statistics.js";
import {CountCards, SortType, UpdateType} from "../const.js";
import {sortFilmByReleaseDate, sortFilmByRating} from "../utils/film.js";
import {render, remove} from "../utils/render.js";
import {nav} from "../utils/nav.js";

class FilmList {
  constructor(filmsContainer, filmsModel, navModel) {
    this._filmsContainer = filmsContainer;
    this._filmsModel = filmsModel;
    this._navModel = navModel;
    this._renderedFilmCards = CountCards.PER_STEP;
    this._currentSortType = SortType.DEFAULT;
    this._filmPresenter = {};
    this._filmTopRatedPresenter = {};
    this._filmMostCommentedPresenter = {};

    this._sortComponent = null;
    this._showMoreButtonComponent = null;

    this._filmsSectionComponent = new FilmsSectionView();
    this._filmsListComponent = new FilmsListView();
    this._noFilmsComponent = new NoFilmsView();
    this._filmsListTopRatedComponent = new FilmsListTopRatedView();
    this._filmsListMostCommentedComponent = new FilmsListMostCommentedView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleResetPopups = this._handleResetPopups.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._navModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderFilmList();
  }

  _getFilms() {
    const navType = this._navModel.getNav();
    const films = this._filmsModel.getFilms().slice();
    const filtredFilms = nav[navType](films);

    switch (this._currentSortType) {
      case SortType.BY_DATE:
        return filtredFilms.sort(sortFilmByReleaseDate);
      case SortType.BY_RATING:
        return filtredFilms.sort(sortFilmByRating);
    }

    return filtredFilms;
  }

  _handleResetPopups() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView());
    Object
      .values(this._filmTopRatedPresenter)
      .forEach((presenter) => presenter.resetView());
    Object
      .values(this._filmMostCommentedPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(updateType, update) {
    this._filmsModel.updateFilm(updateType, update);
  }

  _handleModelEvent(updateType, film) {
    switch (updateType) {
      case UpdateType.PATCH:
        if (this._filmPresenter[film.id]) {
          this._filmPresenter[film.id].init(this._filmsContainer, film);
        }
        if (this._filmTopRatedPresenter[film.id]) {
          this._filmTopRatedPresenter[film.id].init(this._filmsListTopRatedComponent, film);
        }
        if (this._filmMostCommentedPresenter[film.id]) {
          this._filmMostCommentedPresenter[film.id].init(this._filmsListMostCommentedComponent, film);
        }
        break;
      case UpdateType.MINOR:
        this._clearFilmList();
        this._renderFilmList();
        break;
      case UpdateType.MAJOR:
        this._clearStatistics();
        this._clearFilmList({resetRenderedCardCount: true, resetSortType: true});
        this._renderFilmList();
        break;
      case UpdateType.STATS:
        this._clearFilmList({resetRenderedCardCount: true, resetSortType: true});
        this._renderStatistics();
        break;
    }
  }

  _renderStatistics() {
    this._staticticsPresenter = new StatisticsPresenter(this._filmsContainer, this._filmsModel.getFilms());
    this._staticticsPresenter.init();
  }

  _clearStatistics() {
    if (this._staticticsPresenter) {
      this._staticticsPresenter.destroy();
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearFilmList({resetRenderedCardCount: true});
    this._renderFilmList();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._filmsContainer, this._sortComponent);
  }

  _renderFilm(listComponent, filmCard, presenter) {
    const filmPresenter = new FilmPresenter(listComponent, this._handleViewAction, this._handleResetPopups);
    filmPresenter.init(this._filmsContainer, filmCard);
    presenter[filmCard.id] = filmPresenter;
  }

  _renderFilms(films) {
    films.forEach((film) => this._renderFilm(this._filmsListComponent, film, this._filmPresenter));
  }

  _renderNoFilms() {
    render(this._filmsContainer, this._noFilmsComponent);
  }

  _handleShowMoreButtonClick() {
    const filmsCount = this._getFilms().length;
    const newRenderedfilmsCount = Math.min(filmsCount, this._renderedFilmCards + CountCards.PER_STEP);
    const films = this._getFilms().slice(this._renderedFilmCards, newRenderedfilmsCount);
    this._renderFilms(films);
    this._renderedFilmCards = newRenderedfilmsCount;

    if (this._renderedFilmCards >= filmsCount) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    if (this._showMoreButtonComponent !== null) {
      this._showMoreButtonComponent = null;
    }

    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);

    render(this._filmsListComponent, this._showMoreButtonComponent);
  }

  _clearFilmList({resetRenderedCardCount = false, resetSortType = false} = {}) {
    const cardsCount = this._getFilms().length;

    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};

    remove(this._sortComponent);
    remove(this._noFilmsComponent);
    remove(this._showMoreButtonComponent);

    Object
      .values(this._filmTopRatedPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmTopRatedPresenter = {};

    Object
    .values(this._filmMostCommentedPresenter)
    .forEach((presenter) => presenter.destroy());
    this._filmMostCommentedPresenter = {};

    remove(this._filmsListTopRatedComponent);
    remove(this._filmsListMostCommentedComponent);

    if (resetRenderedCardCount) {
      this._renderedFilmCards = CountCards.PER_STEP;
    } else {
      this._renderedFilmCards = Math.min(cardsCount, this._renderedFilmCards);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderFilmList() {
    const filmCards = this._getFilms();
    const filmsCount = filmCards.length;

    if (filmsCount === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderSort();
    render(this._filmsContainer, this._filmsSectionComponent);
    render(this._filmsSectionComponent, this._filmsListComponent);

    this._renderFilms(filmCards.slice(0, Math.min(filmsCount, this._renderedFilmCards)));

    if (filmsCount > CountCards.PER_STEP) {
      this._renderShowMoreButton();
    }

    this._renderExtra();
  }

  _renderExtra() {
    render(this._filmsSectionComponent, this._filmsListTopRatedComponent);
    render(this._filmsSectionComponent, this._filmsListMostCommentedComponent);

    const topRatedFilmCards = this._getFilms().slice().sort((a, b) => b.rating - a.rating).splice(0, CountCards.EXTRA);
    const mostCommentedFilmCards = this._getFilms().slice().sort((a, b) => b.comments.length - a.comments.length).splice(0, CountCards.EXTRA);

    topRatedFilmCards.forEach((filmCard) => this._renderFilm(this._filmsListTopRatedComponent, filmCard, this._filmTopRatedPresenter));
    mostCommentedFilmCards.forEach((filmCard) => this._renderFilm(this._filmsListMostCommentedComponent, filmCard, this._filmMostCommentedPresenter));
  }
}

export default FilmList;
