import { API_URL } from "./config.js";
import { getJSON } from "./helpers.js";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
  },
};

// Gets the recipe from the api and adds it to the state
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    // rewriting the variables
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceURl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    console.log(state.recipe);
  } catch (err) {
    console.log(`${err} 💥💥💥`);
    throw err;
  }
};

// Gets the data from the api based on a given search keyword
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log(data);

    // gets the array of all the results
    state.search.results = data.data.recipes.map((rec) => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });

  } catch (err) {
    console.log(`${err} 💥💥💥`);
    throw err;
  }
};

loadSearchResults("pizza");
