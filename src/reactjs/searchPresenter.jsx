import { observer } from "mobx-react-lite";
import { SearchFormView } from "../views/searchFormView";
import { SearchResultsView } from "../views/searchResultsView";

const DISH_TYPES = ["starter", "main course", "dessert"];

const Search = observer(function (props) {
    const { model } = props;

    function renderResults() {
        const { promise, data, error } = model.searchResultsPromiseState;

        if (promise && !data && !error) {
            return (
                <div className="loading-wrapper">
                    <img
                        src="https://brfenergi.se/iprog/loading.gif"
                        alt="Loading results..."
                    />
                </div>
            );
        }
        if (error) {
            return <div className="error-message">Error occurred: {error}</div>;
        }
        if (!data || data.length === 0) {
            return <p>No data</p>;
        }
        return (
            <SearchResultsView
                searchResults={data}
                onDishClick={function (dish) {
                    if (dish?.id) {
                        model.setCurrentDishId(dish.id);
                    } else {
                        console.warn("Dish is missing an ID:", dish);
                    }
                }}
            />
        );
    }

    return (
        <div className="search-container">
            <SearchFormView
                dishTypeOptions={DISH_TYPES}
                text={model.searchParams.query || ""}
                type={model.searchParams.type || ""}
                onTextChange={function (text) {
                    model.setSearchQuery(text);
                }}
                onTypeChange={function (type) {
                    model.setSearchType(type);
                }}
                handleSearch={function () {
                    model.doSearch(model.searchParams);
                }}
            />
            <div className="results-section">{renderResults()}</div>
        </div>
    );
});

export { Search };
