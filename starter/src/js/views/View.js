// Parent class for the view files (main rendering functions)

import icons from "url:../../img/icons.svg";

export default class View {
  _data;

  // Renders the data
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;

    // gets the html
    const markup = this._generateMarkup();
    this._clear(); // clears the html container
    this._parentElement.insertAdjacentHTML("afterbegin", markup); // displays html
  }

  // Clears the html container
  _clear() {
    this._parentElement.innerHTML = "";
  }

  // Adds the loading spinner
  renderSpinner() {
    const markup = `
          <div class="spinner">
            <svg>
              <use href="${icons}.svg#icon-loader"></use>
            </svg>
          </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
        <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
        `;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderMessage(message = this._message) {
    const markup = `
        <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
        `;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
