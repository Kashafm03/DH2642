import { getDishDetails, searchDishes } from "/Users/merry/Documents/GitHub/dsherif-kashafm-DH2642-HT24/src/dishSource.js";
import { resolvePromise } from "/Users/merry/Documents/GitHub/dsherif-kashafm-DH2642-HT24/src/resolvePromise.js";
/*
The Model keeps the state of the application (Application State).
It is an abstract object, i.e. it knows nothing about graphics and interaction.
*/
const model = {
  numberOfGuests: 2,
  dishes: [],
  currentDishId: null, // null means "intentionally empty"
  searchParams: {}, // Sökparametrar för maträtter
  searchResultsPromiseState: {},// Tillstånd för löfte kopplat till sökresultat
  currentDishPromiseState: {}, // Tillstånd för löfte kopplat till vald maträtt

  // TW 1.1.1 - Sätter egenskaper för objekt
  setCurrentDishId(dishId) {
    // TW 2.3 - Undvik API-anrop om ID är ogiltigt eller redan valt
    if (!dishId || this.currentDishId === dishId) return;

    this.currentDishId = dishId;
// Uppdatera det valda maträtts-ID:t

    // TW 2.3 - Återställ löftets tillstånd för den aktuella maträtten
    this.currentDishPromiseState = {
      promise: null,
      data: null,
      error: null,
    };

    // TW 2.3 - Skapa ett nytt löfte för maträttens detaljer
    const promise = getDishDetails(dishId);
    // TW 2.3 - Uppdatera löftet i promiseState och lös det
    this.currentDishPromiseState.promise = promise;
    resolvePromise(promise, this.currentDishPromiseState);
  },

  // TW 1.1.1 - practice if-statement & throw error
  setNumberOfGuests(number) {
    if (number > 0 && Number.isInteger(number)) {
      this.numberOfGuests = number;
    } else {
      throw new Error("number of guests not a positive integer");
    }
  },

  // TW 1.1.1 - Förstår array spread-syntax [...array, element]
  addToMenu(dishToAdd) {
    // TW 1.1.1 - Lägg till en maträtt i menyn med hjälp av array spread-syntax
    this.dishes = [...this.dishes, dishToAdd];
  },

  // TW 1.1.3 - Here we remove a specific dish from the dishes array in the model, it creates a new array of dishes that were not removed
  // filter callback exercise
  removeFromMenu(dishToRemove) {
    function shouldWeKeepDishCB(dish) {
      return dish.id !== dishToRemove.id; // this callback function will decide if a dish should be kept or not,
      // it returns true if a dish should not be removed and false if one should be removed
    }

    this.dishes = this.dishes.filter(shouldWeKeepDishCB); // filter() will iterate over the dishes array and apply the callback function we created to each of them,
    // and create a new array with all dishes that were kept (returns true)
  },

  // more methods will be added here, don't forget to separate them with comma!

  // TW 2.3 - Metoder för att uppdatera sökparametrar korrekt
  setSearchQuery(query) {
    this.searchParams.query = query;// Uppdatera söktexten i parametrarna
  },

  setSearchType(type) {
    this.searchParams.type = type; // Uppdatera maträttstypen i parametrarna
  },

  // TW 2.3 - Metod för att trigga sökprocessen och uppdatera modellen
  doSearch(searchParams = this.searchParams) {
    // Start a new search with the given parameters
    const promise = searchDishes(searchParams);
  
    // Resolve the search promise and update the model
    resolvePromise(promise, this.searchResultsPromiseState);
  }
};

export { model }; // Exportera modellen för användning i andra delar av applikationen
