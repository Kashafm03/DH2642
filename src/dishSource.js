import { PROXY_URL, PROXY_KEY } from "./apiConfig";

export function searchDishes(searchParams) {
    const queryString = new URLSearchParams(searchParams).toString();
    const fullUrl = `${PROXY_URL}/recipes/complexSearch?${queryString}`;

    return fetch(fullUrl, {
        method: "GET",
        headers: {
            "X-DH2642-Key": PROXY_KEY,
            "X-DH2642-Group": "27"
        }
    })
        .then(function (response) {
            if (!response.ok) {
                throw new Error("HTTP error! status: " + response.status);
            }
            return response.json();
        })
        .then(function (data) {
            return data.results;
        });
}

export async function getMenuDetails(ids_array) {
    const queryString = new URLSearchParams({ ids: ids_array.join(",") }).toString();
    const fullUrl = `${PROXY_URL}/recipes/informationBulk?${queryString}`;

    return fetch(fullUrl, {
        method: "GET",
        headers: {
            "X-DH2642-Key": PROXY_KEY,
            "X-DH2642-Group": "27",
        },
    })
        .then(function (response) {
            if (!response.ok) {
                throw new Error("HTTP error! status: " + response.status);
            }
            return response.json();
        });
}

export function getDishDetails(id) {
    return getMenuDetails([id])
        .then(function (dishesArray) {
            return dishesArray[0];
        });
}
