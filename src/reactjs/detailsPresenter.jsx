import { observer } from "mobx-react-lite";
import { DetailsView } from "/src/views/detailsView.jsx";

const Details = observer(({ model }) => {
  const { promise, data, error } = model.currentDishPromiseState;

  // 1. Kontrollera om promise saknas
  // 1. Kontrollera om promise saknas
  if (!promise) {
    return <div>no data</div>; // Testet kräver just "no data" (liten bokstav, utan fallback-text!)
}

// 2. Visa laddningsbild medan promise är aktivt men data inte har hämtats
if (promise && !data && !error) {
    return <img src="https://brfenergi.se/iprog/loading.gif" alt="Loading..." />;
}

// 3. Visa felmeddelande om ett fel inträffade
if (error) {
    return <div>{error}</div>;
}

// 4. Visa fallback om data saknas trots att promise är löst
if (!data) {
    return <div>no data</div>; // Även här säkerställs testet med "no data"
}

// 5. Kontrollera om rätten redan finns i menyn
var isDishInMenu = model.dishes.some(function (menuDish) {
    return menuDish.id === data.id;
});

// 6. Lägg till rätt i menyn
function addDishToMenuHandler() {
    model.addToMenu(data);
}

// 7. Rendera DetailsView med nödvändiga props
return (
    <DetailsView
        dishData={data} // Skickar maträttens data som props
        guests={model.numberOfGuests} // Skickar antal gäster från modellen
        isDishInMenu={isDishInMenu} // Skickar boolean om maträtten finns i menyn
        onAddToMenu={addDishToMenuHandler} // Skickar callback-funktion för att lägga till maträtt
        />
  );
});

export { Details };