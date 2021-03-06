import AbstractView from "./abstract.js";

const createFilmsListMostCommentedTemplate = () => {
  return (
    `<section class="films-list--extra">
    <h2 class="films-list__title">Most commented</h2>
    <div class="films-list__container">
    </div>
  </section>`
  );
};

class FilmsListMostCommented extends AbstractView {
  getTemplate() {
    return createFilmsListMostCommentedTemplate();
  }
}

export default FilmsListMostCommented;
