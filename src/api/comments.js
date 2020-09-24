import CommentsModel from "../model/comments.js";
import {Method} from "../const.js";
import ApiAbstract from "./abstract.js";

class ApiComments extends ApiAbstract {
  constructor(endPoint, authorization, filmId) {
    super();
    this._endPoint = endPoint;
    this._authorization = authorization;
    this._filmId = filmId;
  }

  getComments() {
    return this._load({url: `comments/${this._filmId}`})
      .then(ApiComments.toJSON)
      .then((comments) => comments.map(CommentsModel.adaptToClient));
  }

  addComment(comment) {
    return this._load({
      url: `comments/${this._filmId}`,
      method: Method.POST,
      body: JSON.stringify(CommentsModel.adaptToServer(comment)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(ApiComments.toJSON)
      .then(CommentsModel.adaptToClient);
  }

  deleteComment([comment]) {
    return this._load({
      url: `comments/${comment.id}`,
      method: Method.DELETE
    });
  }
}

export default ApiComments;
