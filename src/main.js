import UserProfileView from "./view/user-profile.js";
import StatisticsView from "./view/statistics.js";
import {generateFilmCards} from "./mock/film-card.js";
import {CountCards} from "./const.js";
import {render} from "./utils/render.js";
import FilmListPresenter from "./presenter/film-list.js";
import FilterPresenter from "./presenter/filter.js";
import FilmsModel from "./model/films.js";
import FilterModel from "./model/filter.js";

const filmCards = generateFilmCards(CountCards.ALL);

const filmsModel = new FilmsModel();
filmsModel.setFilms(filmCards);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);

const countWatched = filmCards.filter((card) => card.isWatched === true).length;
render(siteHeaderElement, new UserProfileView(countWatched));

const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);

const filmListPresenter = new FilmListPresenter(siteMainElement, filmsModel, filterModel);

filterPresenter.init();
filmListPresenter.init();

render(footerStatisticsElement, new StatisticsView(filmsModel.getFilms().length));
