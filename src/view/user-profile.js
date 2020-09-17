import AbstractView from "./abstract.js";
import {getProfileRating} from "../utils/common.js";

const createUserProfileTemplate = (watchedFilms) => {
  return (
    `<section class="header__profile profile">
    <p class="profile__rating">${getProfileRating(watchedFilms)}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
  );
};

class UserProfile extends AbstractView {
  constructor(count) {
    super();
    this._count = count;
  }

  getTemplate() {
    return createUserProfileTemplate(this._count);
  }
}

export default UserProfile;
