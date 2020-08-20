import AbstractView from "./abstract.js";

const createUserProfileTemplate = (count) => {
  let profileRating = ``;

  if (count > 0 && count <= 10) {
    profileRating = `novice`;
  } else if (count >= 11 && count <= 20) {
    profileRating = `fan`;
  } else if (count >= 21) {
    profileRating = `movie buff`;
  }

  return (
    `<section class="header__profile profile">
    <p class="profile__rating">${profileRating}</p>
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
