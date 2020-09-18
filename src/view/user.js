import AbstractView from "./abstract.js";

const createUserTemplate = (profileRating) => {
  return (
    `<section class="header__profile profile">
    <p class="profile__rating">${profileRating}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
  );
};

class User extends AbstractView {
  constructor(profileRating) {
    super();
    this._profileRating = profileRating;
  }

  getTemplate() {
    return createUserTemplate(this._profileRating);
  }
}

export default User;
