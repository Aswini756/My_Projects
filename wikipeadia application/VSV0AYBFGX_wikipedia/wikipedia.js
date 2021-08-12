let searchInputEl = document.getElementById("searchInput");
let searchResultEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendOfResult(result) {
    let {
        link,
        title,
        description
    } = result;
    // creating div container
    let resultContainer = document.createElement("div");
    resultContainer.classList.add("result-item");
    // creating title anchor eleemnt
    let titleElement = document.createElement("a");
    titleElement.classList.add("result-title");
    titleElement.href = link;
    titleElement.target = "_blank";
    titleElement.textContent = title;
    resultContainer.appendChild(titleElement);
    // ceating break Element
    let breakElement = document.createElement("br");
    resultContainer.appendChild(breakElement);
    // creating link element 
    let urlElement = document.createElement("a");
    urlElement.classList.add("result-url");
    urlElement.href = link;
    urlElement.target = "_blank";
    urlElement.textContent = link;
    resultContainer.appendChild(urlElement);
    // ceating break Element
    let linkbreakEl = document.createElement("br");
    resultContainer.appendChild(linkbreakEl);
    // creating description element 
    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("link-description");
    descriptionEl.textContent = description;
    resultContainer.appendChild(descriptionEl);

    searchResultEl.appendChild(resultContainer);

}

function displaySingleResult(search_results) {
    spinnerEl.classList.add("d-none");

    for (let result of search_results) {
        createAndAppendOfResult(result);
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.remove("d-none");
        searchResultEl.textContent = "";
        let inputValue = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + inputValue;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displaySingleResult(search_results);
            });
    }
}
searchInputEl.addEventListener('keydown', searchWikipedia);