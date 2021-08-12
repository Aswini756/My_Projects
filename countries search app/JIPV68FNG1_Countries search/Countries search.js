let textInputEl = document.getElementById("searchInput");
let resultCountriesEl = document.getElementById("resultCountries");
let spinnerElement = document.getElementById("spinner");
let searchInputValue = "";
let countriesList = [];

function createAndAppendCountry(country) {
    //creating div container
    let countryContainer = document.createElement("div");
    countryContainer.classList.add("country-card", "col-11", "col-md-5", "mr-auto", "ml-auto", "d-flex", "flex-row");
    resultCountriesEl.appendChild(countryContainer);

    // creating image element 
    let countryImageElement = document.createElement("img");
    countryImageElement.src = country.flag;
    countryImageElement.classList.add("country-flag", "mt-auto", "mb-auto");
    countryContainer.appendChild(countryImageElement);

    // creating info container
    let infoContainer = document.createElement("div");
    infoContainer.classList.add("d-flex", "flex-column", "ml-4");
    countryContainer.appendChild(infoContainer);

    // creating Country name
    let countryName = document.createElement("p");
    countryName.textContent = country.name;
    countryName.classList.add("country-name");
    infoContainer.appendChild(countryName);

    // creating popoulation eleemnt
    let populationElement = document.createElement("p");
    populationElement.textContent = country.population;
    populationElement.classList.add("country-population");
    infoContainer.appendChild(populationElement)
}

function displaySingleCountry(countriesList) {
    for (let country of countriesList) {
        console.log(country)
        let countryName = country.name;

        if (countryName.includes(searchInputValue)) {
            createAndAppendCountry(country);
        }
    }
}

function gettingCountries(event) {
    let url = "https://restcountries.eu/rest/v2/all?fields=name;population;flag";
    let options = {
        method: "GET"
    };
    resultCountriesEl.textContent = "";

    spinnerElement.classList.remove("d-none");
    resultCountriesEl.classList.add("d-none");

    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {

            spinnerElement.classList.add("d-none");
            resultCountriesEl.classList.remove("d-none");

            countriesList = jsonData;
            displaySingleCountry(countriesList);
        });
}

function onChangeSearchInput(event) {
    searchInputValue = event.target.value;
    gettingCountries();
}
gettingCountries();
textInputEl.addEventListener('keyup', onChangeSearchInput);