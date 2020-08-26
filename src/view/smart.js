import Abstract from "./abstract";

class Smart extends Abstract {
  constructor() {
    super();
    this._filmCard = {};
  }

  updateData(update, justDataUpdating) {
    if (!update) {
      return;
    }

    this._filmCard = Object.assign(
        {},
        this._filmCard,
        update
    );

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    let prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);
    prevElement = null;

    this.restoreHandlers();
  }

  restoreHandlers() {
    throw new Error(`Abstract method not implemented: restoreHandlers`);
  }

}

export default Smart;
