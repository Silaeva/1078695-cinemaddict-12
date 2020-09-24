import {Method, SuccessHTTPStatusRange} from "../const.js";

class ApiAbstract {
  constructor() {
    this._endPoint = null;
    this._authorization = null;
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers()
  }) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`,
        {method, body, headers})
      .then(ApiAbstract.checkStatus)
      .catch(ApiAbstract.catchError);
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN &&
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}

export default ApiAbstract;
