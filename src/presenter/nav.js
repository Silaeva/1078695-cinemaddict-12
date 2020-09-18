import NavView from "../view/nav.js";
import {render, remove, replace} from "../utils/render.js";
import {NavType, UpdateType} from "../const.js";
import {nav} from "../utils/nav.js";

class Nav {
  constructor(siteMainElement, navModel, filmsModel) {
    this._siteMainElement = siteMainElement;
    this._navModel = navModel;
    this._filmsModel = filmsModel;
    this._currentNav = null;

    this._navComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleNavTypeChange = this._handleNavTypeChange.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._navModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentNav = this._navModel.getNav();

    const navs = this._getNavs();
    const prevNavComponent = this._navComponent;

    this._navComponent = new NavView(navs, this._currentNav);
    this._navComponent.setNavTypeChangeHandler(this._handleNavTypeChange);

    if (prevNavComponent === null) {
      render(this._siteMainElement, this._navComponent);
      return;
    }

    replace(this._navComponent, prevNavComponent);
    remove(prevNavComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleNavTypeChange(navType) {
    if (this._currentNav === navType) {
      return;
    }

    if (navType === `stats`) {
      this._navModel.setNav(UpdateType.STATS, navType);
      return;
    }

    this._navModel.setNav(UpdateType.MAJOR, navType);
  }

  _getNavs() {
    const films = this._filmsModel.getFilms();

    return [
      {
        type: NavType.ALL,
        name: `All movies`,
        count: nav[NavType.ALL](films).length
      },
      {
        type: NavType.WATCHLIST,
        name: `Watchlist`,
        count: nav[NavType.WATCHLIST](films).length
      },
      {
        type: NavType.HISTORY,
        name: `History`,
        count: nav[NavType.HISTORY](films).length
      },
      {
        type: NavType.FAVORITES,
        name: `Favorites`,
        count: nav[NavType.FAVORITES](films).length
      }
    ];
  }
}

export default Nav;
