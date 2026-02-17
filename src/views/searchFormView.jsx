<<<<<<< HEAD
export const SearchFormView = function (props) {
    const {
        dishTypeOptions, // Array med tillgängliga maträttstyper
        text, // Söktext
        type, // Vald maträttstyp
        onTextChange, // Callback för ändring av söktext
        onTypeChange, // Callback för ändring av maträttstyp
        handleSearch, // Callback för att hantera sökning
    } = props;
    function handleTextChange(evt) {
        if (onTextChange) {
            onTextChange(evt.target.value);
        }
    }
    function handleTypeChange(evt) {
        if (onTypeChange) {
            onTypeChange(evt.target.value);
        }
    }
    return (
        <div>
            <input
                type="text"
                value={text || ""}
                onChange={handleTextChange}
                placeholder="Search for a dish..."
            />
            <select
                value={type || ""}
                onChange={handleTypeChange}
            >
                <option value="">Choose:</option>
                {(dishTypeOptions || []).map(function (option) {
                    return (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    );
                })}
            </select>
  
            <button onClick={handleSearch}>Search</button>
        </div>
    );
  };
  
=======
>>>>>>> 0c00480e026979f8f3db99e96a76ea68bce62b03
