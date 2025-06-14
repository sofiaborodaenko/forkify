// File is in charge of the seach UI which sends the query to controller file and calls the handler function that is connected to controller -> model 

class SearchView {
  #parentElement = document.querySelector(".search");

  // Returns the search value that user inputed
  getQuery() {
    const query = this.#parentElement.querySelector(".search__field").value;
    this.#clearInput();
    return query;
  }

  #clearInput() {
    this.#parentElement.querySelector(".search__field").value = "";
  }

  // Calls the function to get the searched recipes
  addHandlerSearch(handler) {
    this.#parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
