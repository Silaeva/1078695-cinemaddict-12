import AbstractView from "./abstract.js";

const createFilmsSectionTemplate = () => {
  return (
    `<section class="films">
    </section>`
  );
};

class FilmsSection extends AbstractView {
  getTemplate() {
    return createFilmsSectionTemplate();
  }
}

export default FilmsSection;
