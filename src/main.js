import FooterStatisticsView from "./view/footer-statistics.js";
import {render} from "./utils/render.js";
import FilmListPresenter from "./presenter/film-list.js";
import NavPresenter from "./presenter/nav.js";
import UserPresenter from "./presenter/user.js";
import FilmsModel from "./model/films.js";
import NavModel from "./model/nav.js";
import Api from "./api.js";
import {UpdateType, AUTHORIZATION, END_POINT} from "./const.js";


const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);

const api = new Api(END_POINT, AUTHORIZATION);

const filmsModel = new FilmsModel();

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(UpdateType.INIT, films);
    navPresenter.init();
    render(footerStatisticsElement, new FooterStatisticsView(films.length));
  })
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
    navPresenter.init();
    render(footerStatisticsElement, new FooterStatisticsView(filmsModel.getFilms().length));

  });

const userPresenter = new UserPresenter(siteHeaderElement, filmsModel);
userPresenter.init();

const navModel = new NavModel();

const navPresenter = new NavPresenter(siteMainElement, navModel, filmsModel);

const filmListPresenter = new FilmListPresenter(siteMainElement, filmsModel, navModel, api);

filmListPresenter.init();
