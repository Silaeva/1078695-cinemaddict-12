import {render, remove} from "../utils/render.js";
import StatisticsView from "../view/statistics.js";
import FilterModel from "../model/filter.js";
import {UpdateType} from "../const.js";

class Statistics {
  constructor(siteMainElement, films) {
    this._films = films;
    this._siteMainElement = siteMainElement;
    this._filterModel = new FilterModel();

    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();
    this._staticticsComponent = new StatisticsView(this._films, this._currentFilter);
    this._staticticsComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    render(this._siteMainElement, this._staticticsComponent);
  }

  destroy() {
    remove(this._staticticsComponent);
  }

  _handleModelEvent(updateType) {

    switch (updateType) {
      case UpdateType.MAJOR:
        this.destroy();
        this.init();
        break;
    }
  }

  _handleFilterTypeChange(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }
}

export default Statistics;
