import "/src/style.css";

// Funktion för att rendera varje maträtt
function renderDish(item, index, onDishClick) {
    const dishTitle = item?.title; // Om titeln saknas
    const dishImage = item?.image; // Om bilden saknas

    return (
        <span
            key={item.id || `key-${index}`} // Unik nyckel för varje element
            className="search-results" // CSS-klass för styling
            onClick={function () {
                onDishClick(item); // Kör onDishClick när användaren klickar
            }}
            style={{ cursor: "pointer", textAlign: "center", margin: "10px" }}
        >
            {/* Bild för maträtten */}
            <img
                src={dishImage} // URL för maträttens bild
                alt={`Dish: ${dishTitle}`} // Alternativ text för tillgänglighet
                height="100" // Bildens höjd i pixlar
                width="100" // Bildens bredd i pixlar
            />
            {/* Titel på maträtten */}
            <div>{dishTitle}</div>
        </span>
    );
}

// Funktion för att hantera rendering av sökresultat
function mapSearchResults(searchResults, onDishClick) {
    return searchResults.map(function (item, index) {
        return renderDish(item, index, onDishClick);
    });
}

// Komponent för att visa sökresultat
export function SearchResultsView({ searchResults = [], onDishClick }) {
    // Kontrollera om searchResults inte är en array eller om arrayen är tom
    if (!Array.isArray(searchResults) || searchResults.length === 0) {
        // Om det inte finns några resultat, visa ett meddelande till användaren
        return <p>No results found. Try another search!</p>;
    }

    // Om det finns resultat, returnera en lista med maträtter
    return (
        <div className="search-results-wrapper">
            {mapSearchResults(searchResults, onDishClick)}
        </div>
    );
}
