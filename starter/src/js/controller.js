import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

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
    console.log(id);

    if (!id) return;

    // renders the spinner
    recipeView.renderSpiner();

    // loading the data
    await model.loadRecipe(id);

    // rendering to ui
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

// on change or load of window run the function
["hashchange", "load"].forEach((ev) =>
  window.addEventListener(ev, controlRecipes)
);
