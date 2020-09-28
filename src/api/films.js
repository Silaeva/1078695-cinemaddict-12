import FilmsModel from "../model/films.js";
import {Method} from "../const.js";
import ApiAbstract from "./abstract.js";

class ApiFilms extends ApiAbstract {
  constructor(endPoint, authorization) {
    super();
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getFilms() {
    return this._load({url: `movies`})
      .then(ApiFilms.toJSON)
      .then((films) => films.map(FilmsModel.adaptToClient));
  }

  updateFilm(film) {
    return this._load({
      url: `movies/${film.id}`,
      method: Method.PUT,
      body: JSON.stringify(FilmsModel.adaptToServer(film)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(ApiFilms.toJSON)
      .then(FilmsModel.adaptToClient);
  }

  sync(films) {
    return this._load({
      url: `movies/sync`,
      method: Method.POST,
      body: JSON.stringify(films),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(ApiFilms.toJSON);
  }
}

export default ApiFilms;
