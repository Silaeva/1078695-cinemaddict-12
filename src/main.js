import FooterStatisticsView from "./view/footer-statistics.js";
import {render} from "./utils/render.js";
import FilmListPresenter from "./presenter/film-list.js";
import NavPresenter from "./presenter/nav.js";
import UserPresenter from "./presenter/user.js";
import FilmsModel from "./model/films.js";
import NavModel from "./model/nav.js";
import ApiFilms from "./api/films.js";
import {UpdateType, AUTHORIZATION, END_POINT} from "./const.js";


const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);

const apiFilms = new ApiFilms(END_POINT, AUTHORIZATION);

const filmsModel = new FilmsModel();

const onResponse = () => {
  navPresenter.init();
  render(footerStatisticsElement, new FooterStatisticsView(filmsModel.getFilms().length));
};

apiFilms.getFilms()
  .then((films) => {
    filmsModel.setFilms(UpdateType.INIT, films);
    onResponse();
  })
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
    onResponse();
  });

const userPresenter = new UserPresenter(siteHeaderElement, filmsModel);
userPresenter.init();

const navModel = new NavModel();

const navPresenter = new NavPresenter(siteMainElement, navModel, filmsModel);

const filmListPresenter = new FilmListPresenter(siteMainElement, filmsModel, navModel, apiFilms);

filmListPresenter.init();
