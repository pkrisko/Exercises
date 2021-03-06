 // Get your shorts on - this is an array workout!
// ## Array Cardio Day 1

// Some data we can work with
const inventors = [
    { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
    { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
    { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
    { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
    { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
    { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
    { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
    { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
    { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
    { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
    { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
    { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 }
];

const people = [
    'Beck, Glenn', 'Becker, Carl', 'Beckett, Samuel', 'Beddoes, Mick', 'Beecher, Henry', 'Beethoven, Ludwig',
    'Begin, Menachem', 'Belloc, Hilaire', 'Bellow, Saul', 'Benchley, Robert', 'Benenson, Peter','Ben-Gurion, David',
    'Benjamin, Walter', 'Benn, Tony', 'Bennington, Chester', 'Benson, Leana', 'Bent, Silas', 'Bentsen, Lloyd',
    'Berger, Ric', 'Bergman, Ingmar', 'Berio, Luciano', 'Berle, Milton', 'Berlin, Irving', 'Berne, Eric', 'Bernhard, Sandra',
    'Berra, Yogi', 'Berry, Halle', 'Berry, Wendell', 'Bethea, Erin', 'Bevan, Aneurin', 'Bevel, Ken', 'Biden, Joseph',
    'Bierce, Ambrose', 'Biko, Steve', 'Billings, Josh', 'Biondo, Frank', 'Birrell, Augustine', 'Black, Elk',
    'Blair, Robert', 'Blair, Tony', 'Blake, William'
];

// Array.prototype.filter()
console.log("1. Filter the list of inventors for those who were born in the 1500's");
console.log(inventors.filter((inventor) => inventor.year >= 1500 && inventor.year < 1600));

// Array.prototype.map()
console.log("2. Give us an array of the inventors' first and last names");
console.log(inventors.map((inventor) => (inventor.first + " " + inventor.last)));

// Array.prototype.sort()
console.log("3. Sort the inventors by birthdate, oldest to youngest");
// Comparator that sorts by birth year
const birthyearSorter = (inventor1, inventor2) => {
    inventor1.year == inventor2.year ? 0 : (inventor1.year < inventor2.year ? -1 : 1);
};
console.log(inventors.sort(birthyearSorter));

// Array.prototype.reduce()
console.log("4. How many years did all the inventors live?");
const lifespanReducer = (accumulator, inventor) => accumulator + (inventor.passed - inventor.year);
console.log(inventors.reduce(lifespanReducer, 0));

// 5. Array.prototype.sort()
console.log("5. Sort the inventors by years lived");
// Comparator that sorts by lifespan
const lifespanSorter = (inventor1, inventor2) => {
    let lifespan1 = inventor1.passed - inventor1.year;
    let lifespan2 = inventor2.passed - inventor2.year;
    return lifespan1 == lifespan2 ? 0 : (lifespan1 < lifespan2 ? 1 : -1);
}
console.log(inventors.sort(lifespanSorter));

// 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
// https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris
/**
 * const category = document.querySelector('.mw-category');
 * const links = Array.from(category.querySelectorAll('a'));
 * const de = links
 *      .map(link => link.textContent)
 *      .filter(streetName => streetName.includes('de'));
 */

// 7. sort Exercise
console.log("Sort the people alphabetically by last name");
const lastNameSorter = (person1, person2) => {
    // Split the string by comma, then parse out the last name, and set to lowercase
    let lowercased1 = person1.split(",")[1].toLowerCase();
    let lowercased2 = person2.split(",")[1].toLowerCase();
    return lowercased1 == lowercased2 ? 0 : (lowercased1 < lowercased2 ? -1 : 1);
}
console.log(people.sort(lastNameSorter));

// 8. Reduce Exercise
// Sum up the instances of each of these
const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck' ];
const instanceReducer = ((accumulator, vehicle) => {
    // If vehicle is in accumulator add 1, otherwise set to 1
    accumulator[vehicle] = (vehicle in accumulator) ? accumulator[vehicle] + 1 : accumulator[vehicle] = 1;
    return accumulator;
});
console.log(data.reduce(instanceReducer, {}));