import UserProfileView from "./view/user-profile.js";
import StatisticsView from "./view/statistics.js";
import {generateFilmCards} from "./mock/film-card.js";
import {CountCards} from "./const.js";
import {render} from "./utils/render.js";
import MovieListPresenter from "./presenter/movie-list.js";
import FilterPresenter from "./presenter/filter.js";
import MoviesModel from "./model/movies.js";
import FilterModel from "./model/filter.js";

const filmCards = generateFilmCards(CountCards.ALL);

const moviesModel = new MoviesModel();
moviesModel.setFilms(filmCards);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);

const countWatched = filmCards.filter((card) => card.isWatched === true).length;
render(siteHeaderElement, new UserProfileView(countWatched)); // количество взять из модели

const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter(siteMainElement, filterModel, moviesModel);

const movieListPresenter = new MovieListPresenter(siteMainElement, moviesModel, filterModel);

filterPresenter.init();
movieListPresenter.init();

render(footerStatisticsElement, new StatisticsView(filmCards.length));
