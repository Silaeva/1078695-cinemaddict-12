const createFilmsListExtraTemplate = (title, extraClass) => {
  return (
    `<section class="films-list--extra">
    <h2 class="films-list__title">${title}</h2>
    <div class="films-list__container  films-list__container--${extraClass}">
    </div>
  </section>`
  );
};

export {createFilmsListExtraTemplate};
