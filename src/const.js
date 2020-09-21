const CountCards = {
  PER_STEP: 5,
  EXTRA: 2
};

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const MAX_DESCRIPTION_LENGTH = 140;

const SortType = {
  DEFAULT: `default`,
  BY_DATE: `by-date`,
  BY_RATING: `by-rating`
};

const NavType = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`,
  STATISTICS: `stats`
};

const FilterType = {
  ALL: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`
};

const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  STATS: `STATS`,
  INIT: `INIT`,
  COMMENT: `COMMENT`
};

const UserAction = {
  UPDATE_FILM: `UPDATE_FILM`,
  ADD_COMMENT: `ADD_COMMENT`,
  DELETE_COMMENT: `DELETE_COMMENT`
};

const keyCode = {
  ENTER: 13,
  CTRL: 17
};

const Method = {
  GET: `GET`,
  PUT: `PUT`,
  POST: `POST`,
  DELETE: `DELETE`
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299
};

const AUTHORIZATION = `Basic fklchnslekfhwsecf56weuyvhblehf78`;
const END_POINT = `https://12.ecmascript.pages.academy/cinemaddict`;

export {MAX_DESCRIPTION_LENGTH, RenderPosition, SortType, NavType, UpdateType, UserAction, keyCode, FilterType, Method, SuccessHTTPStatusRange, AUTHORIZATION, END_POINT, CountCards};
