var searchContainer = document.querySelector("#search-container")
var userInput = document.querySelector("#user-input");
var dropDown = document.querySelector("#drop-down");
var searchForm = document.querySelector("#search-form");
var checkBoxContainer = document.querySelector("#checkbox-container");
var filmCheck = document.querySelector("#film");
var tvCheck = document.querySelector("#tv");
var searchButton = document.querySelector("#search-button");
var movieList = document.querySelector("#movie-list");
var closeBtn = document.querySelector(".modal-background");
var clearBtn = document.querySelector("#clear-Btn");

function submitFunction(e) {

    e.preventDefault();

    if (userInput.value) {

        var selectOptions = dropDown.value;
        var tvcheckBox = tvCheck.checked;
        var filmcheckBox = filmCheck.checked;

        if (selectOptions != "title" && selectOptions != "genre") {

            // Change alert to modal?
            var modalBox = document.getElementById("modal");
            modalBox.classList.add("is-active")


        }

        movieList.textContent = "";

        // Sets an empty item in local storage for later use
        localStorage.setItem("streamingServices", JSON.stringify("empty"));


        // calls searchTitles function
        searchTitles(selectOptions, tvcheckBox, filmcheckBox);

    }
}

// Event listener for search form
searchButton.addEventListener("click", submitFunction);

closeBtn.addEventListener("click", function(){
    var modalBox = document.getElementById("modal");
    modalBox.classList.remove("is-active")
})

//the searchTitles function will go through multiple if statements depending on what the user specifies and fetches the API request and puts it into a array called data
function searchTitles(selectOptions, tvcheckBox, filmcheckBox) {

    // Delete later
    console.log(userInput.value);

    // Checks if user selected "title" from drop down menu
    if (selectOptions === "title") {

        // Checks if both boxes are checked
        if ((tvcheckBox === true) && (filmcheckBox === true)) {
            var imdbAPI = "https://imdb-api.com/API/AdvancedSearch/k_z14oaao9?title=" + userInput.value + "&title_type=feature,tv_series";

            // Delete later - logs the api url
            console.log(imdbAPI);

            // Fetches data
            fetch(imdbAPI).then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {

                        // Delete later
                        console.log("--MOVIE DATA--");
                        console.log(data);

                        // Calls dataSorter function
                        dataSorter(data);
                        return;
                    })
                }
            })

            // Checks if only film box is checked
        } else if ((tvcheckBox === false) && (filmcheckBox === true)) {
            var imdbAPI = "https://imdb-api.com/API/AdvancedSearch/k_z14oaao9?title=" + userInput.value + "&title_type=feature";

            // Fetches data
            fetch(imdbAPI).then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {

                        // Delete log later
                        console.log("--MOVIE DATA--");
                        console.log(data);

                        // Calls dataSorter function
                        dataSorter(data);
                        return;
                    })
                }
            })

            // Checks if only tv series box is checked 
        } else if ((tvcheckBox === true) && (filmcheckBox === false)) {
            var imdbAPI = "https://imdb-api.com/API/AdvancedSearch/k_z14oaao9?title=" + userInput.value + "&title_type=tv_series";

            // Fetches data
            fetch(imdbAPI).then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {

                        // Delete later
                        console.log("--MOVIE DATA--");
                        console.log(data);

                        // Calls dataSorter function
                        dataSorter(data);
                        return;
                    })
                }
            })

            // Runs the api without any parameters if no boxes are checked
        } else {
            var imdbAPI = "https://imdb-api.com/API/AdvancedSearch/k_z14oaao9?title=" + userInput.value;

            // Fetches data
            fetch(imdbAPI).then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {

                        // Delete later
                        console.log("--MOVIE DATA--");
                        console.log(data);

                        // Calls dataSorter function
                        dataSorter(data);
                        return;
                    })
                }
            })
        }

        // Runs if user chooses "genre" from the drop down menu
    } else {

        // Checks if both boxes are checked
        if ((tvcheckBox === true) && (filmcheckBox === true)) {
            var imdbAPI = "https://imdb-api.com/API/AdvancedSearch/k_z14oaao9?title_type=feature,tv_series&genres=" + userInput.value;

            // Fetches data
            fetch(imdbAPI).then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {

                        // Delete later
                        console.log("--MOVIE DATA--");
                        console.log(data);

                        // Calls dataSorter function
                        dataSorter(data);
                        return;
                    })
                }
            })

            // Checks if only film is checked
        } else if ((tvcheckBox === false) && (filmcheckBox === true)) {
            var imdbAPI = "https://imdb-api.com/API/AdvancedSearch/k_z14oaao9?title_type=feature&genres=" + userInput.value;

            // Fetches data
            fetch(imdbAPI).then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {

                        // Delete later
                        console.log("--MOVIE DATA--");
                        console.log(data);

                        // Calls dataSorter function
                        dataSorter(data);
                        return;
                    })
                }
            })

            // Checks if only tv is checked
        } else if ((tvcheckBox === true) && (filmcheckBox === false)) {

            var imdbAPI = "https://imdb-api.com/API/AdvancedSearch/k_z14oaao9?title_type=tv_series&genres=" + userInput.value;

            // Fetches data
            fetch(imdbAPI).then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {

                        // Delete later
                        console.log("--MOVIE DATA--");
                        console.log(data);

                        // Calls dataSorter function
                        dataSorter(data);
                        return;
                    })
                }
            })

            // Runs if no boxes are checked
        } else {

            var imdbAPI = "https://imdb-api.com/API/AdvancedSearch/k_z14oaao9?genres=" + userInput.value;

            // Fetches data
            fetch(imdbAPI).then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {

                        // Delete later
                        console.log("--MOVIE DATA--");
                        console.log(data);

                        // Runs dataSorter function
                        dataSorter(data);
                        return;
                    })
                }
            })
        }
    }
}

//dataSorter function loops through the data to find the major info and inputs it into an array of objects
function dataSorter(data) {

    

    for (i = 0; i < data.results.length; i++) {
        
        if (data.results[i].imDbRating !== null && data.results[i].contentRating !== null) {

            // Sets data to variables
            let title = data.results[i].title;
            let year = data.results[i].description;
            let rating = data.results[i].imDbRating;
            let image = data.results[i].image;
            let plot = data.results[i].plot;
            let id = data.results[i].id
            
            // Calls the streaming data function and passes all data to it
            getStreamingData(title, year, rating, image, plot, id);

        }

    }

}

// Gets streaming data
function getStreamingData(title, year, rating, image, plot, id) {
    var watchModeApiUrl = "https://api.watchmode.com/v1/title/" + id + "/sources/?apiKey=CHaTBGbxzalxosZzN41WhPCqsQ10Qz3548I4Bghc";

    fetch(watchModeApiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {

                console.log(data);
                
                // Varaibles
                let nameArray = [];
                let streamingArray = [];

                // Remove previously saved data
                localStorage.removeItem("streamingServices");

                for (let i = 0; i < data.length; i++) {

                    // Checks if name array does not include the current name and pushes in a new object if true
                    if (!nameArray.includes(data[i].name)) {


                        let streamingObject = {
                            name: data[i].name,
                            url: data[i].web_url
                        };

                        streamingArray.push(streamingObject);
                        nameArray.push(data[i].name)
                    }

                }

                addMovieData(title, year, rating, image, plot, streamingArray); 
            });

        }

    });

}


// add movie data to "movie-container"
function addMovieData(title, year, rating, image, plot, streamingArray) {
    let movieDescription = document.createElement("div");
    let movieCard = document.createElement("div");
    let movieImage = document.createElement("img");
    let movieTitle = document.createElement("h3");
    let movieYear = document.createElement("p");
    let movieRating = document.createElement("p");
    let moviePlot = document.createElement("p");
    let movieStreaming = document.createElement("div");
    let streamingListUl = document.createElement("ul");
    let listEl = document.createElement("li");
    let topRow = document.createElement("div");
    let contentDiv = document.createElement("div");
    let ratingIcon = document.createElement("i");
    let figureEl = document.createElement("figure");
    let buttonDiv = document.createElement("div");
    let addButtonEl = document.createElement("button");

    movieDescription.classList.add("movie-desc");
    movieCard.classList.add("movie-card", "rounded");
    streamingListUl.classList.add("streaming-list");
    movieTitle.classList.add("movie-title");
    topRow.classList.add("top-row");
    ratingIcon.classList.add("fa-solid", "fa-star");
    contentDiv.classList.add("content");
    figureEl.classList.add("image");
    buttonDiv.classList.add("add-btn-container");
    addButtonEl.classList.add("add-button")

    movieImage.src = image;
    movieTitle.textContent = title;
    movieYear.textContent = year;
    movieRating.textContent = rating;
    moviePlot.textContent = plot;
    addButtonEl.textContent = "+ Add to Watchlist"

    figureEl.appendChild(movieImage);
    movieCard.appendChild(figureEl);
    movieRating.appendChild(ratingIcon);
    topRow.appendChild(movieTitle);
    topRow.appendChild(movieRating);
    contentDiv.appendChild(topRow);
    contentDiv.appendChild(movieYear);
    contentDiv.appendChild(moviePlot);
    movieDescription.appendChild(contentDiv);
    
    // render streaming service
    for (let i = 0; i < streamingArray.length; i++) {
        
        console.log("it works!")
        let streamListEl = document.createElement("li");
        let streamLink = document.createElement("a")
        
        let thisService = streamingArray[i].name;
        let thisURL = streamingArray[i].url;
        
        streamLink.setAttribute("href", thisURL);
        streamLink.setAttribute("target", "_blank");
        streamLink.setAttribute("class", "stream-link");

        streamLink.textContent = thisService;
        
        streamListEl.appendChild(streamLink);
        streamingListUl.appendChild(streamListEl);
        // streamingListUl.append(streamListEl);
    }
    
    movieStreaming.appendChild(streamingListUl);
    movieDescription.appendChild(movieStreaming);

    buttonDiv.appendChild(addButtonEl);
    movieDescription.appendChild(buttonDiv);

    movieCard.appendChild(movieDescription);
    listEl.appendChild(movieCard);
    movieList.appendChild(listEl);

    // Applies event lister to all add to watchlist buttons
    addButtonEl.addEventListener("click", addToWatchlist);
    
}
// Adds title to watchlist and saves data to local storgage
function addToWatchlist() {

    // May need to use "this" and assign values from movie card
    var newTitle = $(this).parent(".add-btn-container").siblings(".content").children(".top-row").children(".movie-title").text();
    console.log(newTitle);
    console.log(typeof newTitle);

    // Looks for savedTitles in local storage
    var titleArray = JSON.parse(localStorage.getItem("savedTitles"));

    // renderWatchlistFirst(titleArray);

    // If titleArray is not there, then it is created
    if (titleArray === null) {
        titleArray = [];
        titleArray.push(newTitle);
        localStorage.setItem("savedTitles", JSON.stringify(titleArray));
    } else {
        // if savedTitles does exist, then new title is pushed into the array and it is set in local storage again
        titleArray.push(newTitle);
        localStorage.setItem("savedTitles", JSON.stringify(titleArray));
    }
    console.log(titleArray);
    renderWatchlistFirst(newTitle);
    // Calls renderWatchlist fucntion

    renderWatchlistFirst(newTitle);

};

// Renders watchlist per each click
function renderWatchlistFirst(titleArray){
    console.log("hello");
    console.log("hello");
    var watchList = document.querySelector("#watchlist-items");
    var listMaker = document.createElement("li");
    var h4Maker = document.createElement("h4");
    watchList.appendChild(listMaker).appendChild(h4Maker);
    h4Maker.innerHTML = titleArray;
}
// Renders watchlist when page loads

function renderWatchlist(titleArrayFinal){
    console.log("hello");
    for(i=0;i<titleArrayFinal.length;i++){

    console.log("hello");
    var watchList = document.querySelector("#watchlist-items");
    var listMaker = document.createElement("li");
    var h4Maker = document.createElement("h4");
    watchList.appendChild(listMaker).appendChild(h4Maker);
    h4Maker.innerHTML = titleArrayFinal[i];

    }
}

//when page is deployed automatically 
$(document).ready(function(){
    var titleArrayFinal = JSON.parse(localStorage.getItem("savedTitles"));
    renderWatchlist(titleArrayFinal);

})

//clear Button for watchlist
clearBtn.addEventListener("click", function(){
    localStorage.clear();   
    location.reload();
    return false;
})

