import FooterStatisticsView from "./view/footer-statistics.js";
import {render} from "./utils/render.js";
import FilmListPresenter from "./presenter/film-list.js";
import NavPresenter from "./presenter/nav.js";
import UserPresenter from "./presenter/user.js";
import FilmsModel from "./model/films.js";
import NavModel from "./model/nav.js";
import ApiFilms from "./api/films.js";
import {UpdateType, AUTHORIZATION, END_POINT} from "./const.js";
import Store from "./api/store.js";
import Provider from "./api/provider.js";

const STORE_PREFIX = `cimemaddict-localstorage`;
const STORE_VER = `v12`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);

const apiFilms = new ApiFilms(END_POINT, AUTHORIZATION);

const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(apiFilms, store);

const filmsModel = new FilmsModel();

const onResponse = () => {
  navPresenter.init();
  render(footerStatisticsElement, new FooterStatisticsView(filmsModel.getFilms().length));
};

apiWithProvider.getFilms()
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

const filmListPresenter = new FilmListPresenter(siteMainElement, filmsModel, navModel, apiWithProvider);

filmListPresenter.init();

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`)
    .then(() => {
      console.log(`ServiceWorker available`); // eslint-disable-line
    }).catch(() => {
      console.error(`ServiceWorker isn't available`); // eslint-disable-line
    });
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
