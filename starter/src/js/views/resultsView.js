// This file is in charge of rendering the recipes that are loaded in the sidebar

import View from "./View.js";
import icons from "url:../../img/icons.svg";

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = "No recipes found for your query. Please try again.";
  _message = "";

  // Returns the html
  _generateMarkup() {
    return this._data
      .map((res) => {
        `<li class="preview">
          <a class="preview__link preview__link--active" href="#${res.id}">
            <figure class="preview__fig">
              <img src="${res.image}" alt="${res.title}" />
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">${res.title} ...</h4>
              <p class="preview__publisher">${res.publisher}</p>
            </div>
          </a>
        </li>`;
      })
      .join("");

    return `
        <li class="preview">
            <a class="preview__link preview__link--active" href="#23456">
              <figure class="preview__fig">
                <img src="src/img/test-1.jpg" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">Pasta with Tomato Cream ...</h4>
                <p class="preview__publisher">The Pioneer Woman</p>
                <div class="preview__user-generated">
                  <svg>
                    <use href="src/img/icons.svg#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
        </li>
    `;
  }
}

export default new ResultsView();
