// This file is in charge of rendering the recipes that are loaded in the sidebar

import View from "./View.js";
import icons from "url:../../img/icons.svg";

// Force Parcel to treat it as a used asset
const _forceInclude = new Image();
_forceInclude.src = icons;

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = "No recipes found for your query. Please try again.";
  _message = "";

  // Returns the html
  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join("");
  }

  _generateMarkupPreview(result) {
    const id = window.location.hash.slice(1);

    return `
        <li class="preview">
          <a class="preview__link ${
            result.id === id ? "preview__link--active" : ""
          }" href="#${result.id}">
            <figure class="preview__fig">
              <img src="${result.image}" alt="${result.title}" />
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">${result.title} ...</h4>
              <p class="preview__publisher">${result.publisher}</p>
              <div class="recipe__user-generated ${
                result.key ? "" : "hidden"
              }">
                <svg>
                    <use href="${icons}#icon-user"></use>
                </svg>
              </div>
            </div>
          </a>
        </li>`;
  }
}

export default new ResultsView();
