export function DetailsView({ dishData, guests, isDishInMenu, onAddToMenu }) {
    if (!dishData) return null; // Säkerhet om Presentern misslyckas

    return (
        <div className="details-view">
            <button onClick={onAddToMenu} disabled={isDishInMenu}>
                {isDishInMenu ? "In Menu" : "Add to Menu"}
            </button>

            <h1>{dishData.title}</h1>

            <div className="details-image">
                <img src={dishData.image} alt={dishData.title} height="100" />
                <div>
                    <h3>Price:</h3>
                    <p>Price per serving: {dishData.pricePerServing}</p>
                    <p>Price for {guests} guests: {dishData.pricePerServing * guests}</p>
                </div>
            </div>

            <h3>Ingredients:</h3>
            {dishData.extendedIngredients.map(function (ingredient) {
                return (
                    <div key={ingredient.id}>
                        {ingredient.name}: {ingredient.amount} {ingredient.unit}
                    </div>
                );
            })}

            <h3>Instructions:</h3>
            <p>{dishData.instructions}</p>

            <a href={dishData.sourceUrl}>More information</a>
        </div>
    );
}
  