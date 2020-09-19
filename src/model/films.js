import Observer from "../utils/observer.js";

class Films extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  setFilms(updateType, films) {
    this._films = films.slice();

    this._notify(updateType);
  }

  getFilms() {
    return this._films;
  }

  updateFilm(updateType, update) {

    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting film`);
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1)
    ];

    this._notify(updateType, update);
  }


  static adaptToClient(film) {
    const adaptedFilm = Object.assign(
        {},
        film,
        {
          comments: film.comments,
          title: film.film_info.title,
          titleOriginal: film.film_info.alternative_title,
          rating: film.film_info.total_rating,
          duration: film.film_info.runtime,
          genres: film.film_info.genre,
          poster: film.film_info.poster,
          description: film.film_info.description,
          ageRating: film.film_info.age_rating,
          director: film.film_info.director,
          writers: film.film_info.writers,
          actors: film.film_info.actors,
          releaseDate: film.film_info.release.date,
          country: film.film_info.release.release_country,
          onWatchList: film.user_details.watchlist,
          isWatched: film.user_details.already_watched,
          isFavorite: film.user_details.favorite,
          watchedDate: film.user_details.watching_date
        }
    );

    delete adaptedFilm.film_info;
    delete adaptedFilm.user_details;

    return adaptedFilm;
  }

  static adaptToServer(film) {
    const adaptedFilm = Object.assign(
        {},
        {
          "id": film.id,
          "comments": film.comments,
          "film_info": {
            "title": film.title,
            "alternative_title": film.titleOriginal,
            "total_rating": film.rating,
            "runtime": film.duration,
            "genre": film.genres,
            "poster": film.poster,
            "description": film.description,
            "age_rating": film.ageRating,
            "director": film.director,
            "writers": film.writers,
            "actors": film.actors,
            "release": {
              "date": film.releaseDate,
              "release_country": film.country,
            },
          },
          "user_details": {
            "watchlist": film.onWatchList,
            "already_watched": film.isWatched,
            "favorite": film.isFavorite,
            "watching_date": film.watchedDate
          }
        }
    );

    return adaptedFilm;
  }
}

export default Films;
