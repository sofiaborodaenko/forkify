import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

const recipeContainer = document.querySelector(".recipe");

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    // gets the id of the webpage
    const id = window.location.hash.slice(1);

    if (!id) return;

    // renders the spinner
    recipeView.renderSpinner();

    // loading the data
    await model.loadRecipe(id);

    // rendering to ui
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // renders spinner
    resultsView.renderSpinner();

    // gets the search query
    const query = searchView.getQuery();

    if (!query) return;

    // loads the search results
    await model.loadSearchResults(query);

    // render results
    console.log(model.state.search.results);
    
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
