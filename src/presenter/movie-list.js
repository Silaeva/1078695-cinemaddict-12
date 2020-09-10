import FilmsSectionView from "../view/films-section.js";
import FilmsListView from "../view/films-list.js";
import SortView from "../view/sort.js";
import FilmsListTopRatedView from "../view/films-list-top-rated.js";
import FilmsListMostCommentedView from "../view/films-list-most-commented.js";
import ShowMoreButtonView from "../view/show-more-button.js";
import NoFilmsView from "../view/no-films.js";
import MoviePresenter from "./movie.js";
import {CountCards, SortType, UpdateType, UserAction} from "../const.js";
import {sortFilmByReleaseDate, sortFilmByRating} from "../utils/film.js";
import {render, remove} from "../utils/render.js";
import {filter} from "../utils/filter.js";

class MovieList {
  constructor(filmsContainer, moviesModel, filterModel) {
    this._filmsContainer = filmsContainer;
    this._moviesModel = moviesModel;
    this._filterModel = filterModel;
    this._renderedFilmCards = CountCards.PER_STEP;
    this._currentSortType = SortType.DEFAULT;
    this._moviePresenter = {};
    this._movieExtraPresenter = {};

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

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderMovieList();
  }

  _getFilmCards() {
    const filterType = this._filterModel.getFilter();
    const films = this._moviesModel.getFilms();
    const filtredFilms = filter[filterType](films);

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
      .values(this._moviePresenter)
      .forEach((presenter) => presenter.resetView());
    Object
      .values(this._movieExtraPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._moviesModel.updateFilm(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this._moviesModel.updateFilm(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this._moviesModel.updateFilm(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType) {
    switch (updateType) {
      case UpdateType.MINOR:
        this._clearMovieList();
        this._renderMovieList();
        break;
      case UpdateType.MAJOR:
        this._clearMovieList({resetRenderedCardCount: true, resetSortType: true});
        this._renderMovieList();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearMovieList({resetRenderedCardCount: true});
    this._renderMovieList();
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
    const moviePresenter = new MoviePresenter(listComponent, this._handleViewAction, this._handleResetPopups);
    moviePresenter.init(this._filmsContainer, filmCard);
    presenter[filmCard.id] = moviePresenter;
  }

  _renderFilms(films) {
    films.forEach((film) => this._renderFilm(this._filmsListComponent, film, this._moviePresenter));
  }

  _renderNoFilms() {
    render(this._filmsContainer, this._noFilmsComponent);
  }

  _handleShowMoreButtonClick() {
    const filmsCount = this._getFilmCards().length;
    const newRenderedfilmsCount = Math.min(filmsCount, this._renderedFilmCards + CountCards.PER_STEP);
    const films = this._getFilmCards().slice(this._renderedFilmCards, newRenderedfilmsCount);

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

  _clearMovieList({resetRenderedCardCount = false, resetSortType = false} = {}) {
    const cardsCount = this._getFilmCards().length;

    Object
      .values(this._moviePresenter)
      .forEach((presenter) => presenter.destroy());
    this._moviePresenter = {};

    remove(this._sortComponent);
    remove(this._noFilmsComponent);
    remove(this._showMoreButtonComponent);

    Object
      .values(this._movieExtraPresenter)
      .forEach((presenter) => presenter.destroy());
    this._movieExtraPresenter = {};

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

  _renderMovieList() {
    const filmCards = this._getFilmCards();
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

    const topRatedFilmCards = this._getFilmCards().slice().sort((a, b) => b.rating - a.rating).splice(0, CountCards.EXTRA);
    const mostCommentedFilmCards = this._getFilmCards().slice().sort((a, b) => b.comments.length - a.comments.length).splice(0, CountCards.EXTRA);

    topRatedFilmCards.forEach((filmCard) => this._renderFilm(this._filmsListTopRatedComponent, filmCard, this._movieExtraPresenter));
    mostCommentedFilmCards.forEach((filmCard) => this._renderFilm(this._filmsListMostCommentedComponent, filmCard, this._movieExtraPresenter));
  }
}

export default MovieList;
