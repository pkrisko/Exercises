const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = []; // Array updated with matches from JSON document
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

// Fetch entire JSON array from endpoint, and then parse through the two promises
// returned to get the useable array of locations.
const prom = fetch(endpoint)
    .then((blob) => blob.json()
    .then((data) => cities.push(...data)));

/**
 * Helper function which returns a string of numbers, seperating every 3 digits
 * from the right with a comma.
 * @param {*} num A number, here the city's population
 */
function numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        // here we need to figure out if the city or state matches what was searched
        const regex = new RegExp(wordToMatch, 'gi'); // two flags: g is global, i is insensitive
        return place.city.match(regex) || place.state.match(regex);
    });
}

/**
 * Calls findMatches(..., ...) and then displays those matches below the search
 * box where the user types in. This function is called every keyUp event, so
 * each time a new letter is typed, the matches are displayed again, and the HTML
 * is reset for the suggestions class.
 */
function displayMatches() {
    const matchArray = findMatches(this.value, cities);
    const html = matchArray.map((place) => {
        const regex = new RegExp(this.value, 'gi'); // two flags: g is global, i is insensitive
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
        const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
        return `
            <li>
                 <span class="name">${cityName}, ${stateName}</span>
                 <span>${numberWithCommas(place.population)}</span>
            </li>
        `
    }).join('');
    suggestions.innerHTML = html;
}

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);