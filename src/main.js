import UserProfileView from "./view/user-profile.js";
import FilterView from "./view/filter.js";
import StatisticsView from "./view/statistics.js";
import {generateFilmCards} from "./mock/film-card.js";
import {generateFilter} from "./mock/filter.js";
import {CountCards} from "./const.js";
import {render} from "./utils/render.js";
import MovieListPresenter from "./presenter/movie-list.js";

const filmCards = generateFilmCards(CountCards.ALL);
const filters = generateFilter(filmCards);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);

const filterHistoryCount = filters.reduce((newFilter, curfilter) => {
  newFilter[curfilter.name] = curfilter.count;
  return newFilter;
}, {}).history;

render(siteHeaderElement, new UserProfileView(filterHistoryCount));

render(siteMainElement, new FilterView(filters));

const movieListPresenter = new MovieListPresenter(siteMainElement);
movieListPresenter.init(filmCards);

render(footerStatisticsElement, new StatisticsView(filmCards.length));
