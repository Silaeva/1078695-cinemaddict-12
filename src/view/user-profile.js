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
    `  <section class="header__profile profile">
    <p class="profile__rating">${profileRating}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
  );
};

export {createUserProfileTemplate};
