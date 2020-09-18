import FooterStatisticsView from "./view/footer-statistics.js";
import {generateFilmCards} from "./mock/film-card.js";
import {CountCards} from "./const.js";
import {render} from "./utils/render.js";
import FilmListPresenter from "./presenter/film-list.js";
import NavPresenter from "./presenter/nav.js";
import UserPresenter from "./presenter/user.js";
import FilmsModel from "./model/films.js";
import NavModel from "./model/nav.js";

const filmCards = generateFilmCards(CountCards.ALL);

const filmsModel = new FilmsModel();
filmsModel.setFilms(filmCards);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);

const userPresenter = new UserPresenter(siteHeaderElement, filmsModel);
userPresenter.init();

const navModel = new NavModel();

const navPresenter = new NavPresenter(siteMainElement, navModel, filmsModel);

const filmListPresenter = new FilmListPresenter(siteMainElement, filmsModel, navModel);

navPresenter.init();
filmListPresenter.init();

render(footerStatisticsElement, new FooterStatisticsView(filmsModel.getFilms().length));
