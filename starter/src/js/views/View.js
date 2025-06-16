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

  // Updates the markup without rendering it to the UI
  update(data) {
    this._data = data;

    // gets the html to edit it
    const newMarkup = this._generateMarkup();

    // creates a dom from the new markup
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*")); // gets all the dom elements
    const currElements = Array.from(this._parentElement.querySelectorAll("*"));

    // compares the dom elements and switches if needed
    newElements.forEach((newEl, i) => {
      const curEl = currElements[i];

      // updates changed text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        curEl.textContent = newEl.textContent;
      }

      // updates changed attributes
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attr) => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
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
