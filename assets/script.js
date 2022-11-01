var searchContainer = document.querySelector("#search-container")
var userInput = document.querySelector("#user-input");
var dropDown = document.querySelector("#drop-down");
var searchForm = document.querySelector("#search-form");
var checkBoxContainer = document.querySelector("#checkbox-container");
var filmCheck = document.querySelector("#film");
var tvCheck = document.querySelector("#tv");
var searchButton = document.querySelector("#search-button");
var movieList = document.querySelector("#movie-list")



function submitFunction(e) {

    e.preventDefault();

    if (userInput.value) {

        var selectOptions = dropDown.value;
        var tvcheckBox = tvCheck.checked;
        var filmcheckBox = filmCheck.checked;

        // Delete Later
        console.log(userInput.value);
        console.log(selectOptions);
        console.log(tvcheckBox);
        console.log(filmcheckBox);

        if (selectOptions != "title" && selectOptions != "genre") {

            // Change alert to modal?
            alert("Please pick either Title or Genre");

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

//the searchTitles function will go through multiple if statements depending on what the user specifies and fetches the API request and puts it into a array called data
function searchTitles(selectOptions, tvcheckBox, filmcheckBox) {

    // Delete later
    console.log(userInput.value);

    // Checks if user selected "title" from drop down menu
    if (selectOptions === "title") {

        // Checks if both boxes are checked
        if ((tvcheckBox === true) && (filmcheckBox === true)) {
            var imdbAPI = "https://imdb-api.com/API/AdvancedSearch/k_sce48n42?title=" + userInput.value + "&title_type=feature,tv_series";

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
            var imdbAPI = "https://imdb-api.com/API/AdvancedSearch/k_sce48n42?title=" + userInput.value + "&title_type=feature";

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
            var imdbAPI = "https://imdb-api.com/API/AdvancedSearch/k_sce48n42?title=" + userInput.value + "&title_type=tv_series";

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
            var imdbAPI = "https://imdb-api.com/API/AdvancedSearch/k_sce48n42?title=" + userInput.value;

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
            var imdbAPI = "https://imdb-api.com/API/AdvancedSearch/k_sce48n42?title_type=feature,tv_series&genres=" + userInput.value;

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
            var imdbAPI = "https://imdb-api.com/API/AdvancedSearch/k_sce48n42?title_type=feature&genres=" + userInput.value;

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

            var imdbAPI = "https://imdb-api.com/API/AdvancedSearch/k_sce48n42?title_type=tv_series&genres=" + userInput.value;

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

            var imdbAPI = "https://imdb-api.com/API/AdvancedSearch/k_sce48n42?genres=" + userInput.value;

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

            // Calls the get streaming services function
            // getStreamingData(data.results[i].id);

            // let streamingArray = JSON.parse(localStorage.getItem("streamingServices"));

            // let titleObject = {
            //     title: data.results[i].title,
            //     year: data.results[i].description,
            //     rating: data.results[i].imDbRating,
            //     image: data.results[i].image,
            //     plot: data.results[i].plot,
            //     id: data.results[i].id
            // }

            let title = data.results[i].title;
            let year = data.results[i].description;
            let rating = data.results[i].imDbRating;
            let image = data.results[i].image;
            let plot = data.results[i].plot;
            let id = data.results[i].id
            
            // Calls the streaming data function and passes all data to it
            getStreamingData(title, year, rating, image, plot, id);

            //  Calls add data function
            // addMovieData(titleObject);
        }

    }


}

// Gets streaming data
function getStreamingData(title, year, rating, image, plot, id) {
    var watchModeApiUrl = "https://api.watchmode.com/v1/title/" + id + "/sources/?apiKey=9N19VEvmCdwvA93rucNoqy9DXPXegly8lYdQNRxU";

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


                // localStorage.setItem("streamingServices", JSON.stringify(streamingArray));

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

    movieDescription.classList.add("movie-desc");
    movieCard.classList.add("movie-card", "rounded");
    streamingListUl.classList.add("streaming-list");
    movieTitle.classList.add("movie-title");
    topRow.classList.add("top-row");
    ratingIcon.classList.add("fa-solid", "fa-star");
    contentDiv.classList.add("content");
    figureEl.classList.add("image");

    movieImage.src = image;
    movieTitle.textContent = title;
    movieYear.textContent = year;
    movieRating.textContent = rating;
    moviePlot.textContent = plot;

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
    // let streamingArray = JSON.parse(localStorage.getItem("streamingServices"));
   

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

    movieCard.appendChild(movieDescription);
    listEl.appendChild(movieCard);
    movieList.appendChild(listEl);
    
}

// Gets streaming data and sets it to local storage
function addStreamingData(streamingArray) {

    // let streamingDiv = document.createElement("div");
    // let streamingListUl = document.createElement("ul");

    streamingListUl.setAttribute("class", "streaming-list");

    // render streaming service
    for (let i = 0; i < streamingArray.length; i++) {

        let thisService = streamingArray[i].name;
        let thisURL = streamingArray[i].url;

        let streamListEl = document.createElement("li");
        let streamLink = document.createElement("a")

        streamLink.setAttribute("src", thisURL);
        streamLink.setAttribute("target", "_blank");
        streamLink.setAttribute("class", "stream-link");

        streamLink.textContent = thisService;

        streamListEl.appendChild(streamLink);
        streamingListUl.appendChild(streamListEl);
    }

    streamingDiv.appendChild(streamingListUl);

    return streamingDiv;
}

// Adds title to watchlist and saves data to local storgage
function addToWatchlist(newTitle, newRating, newImage, newPlotSum, newStreaming) {

    // May need to use "this" and assign values from movie card

    // Makes an object to save in local storage
    var addTitle = {
        title: newTitle,
        rating: newRating,
        image: newImage,
        plot: newPlotSum,
        streaming: newStreaming
    }

    // Sets addTitle to local storage
    // localStorage.setItem(newTitle, JSON.stringify(addTitle));

    // Looks for savedTitles in local storage
    // var titleArray = JSON.parse(localStorage.getItem("savedTitles"));

    // If titleArray is not there, then it is created
    // if (titleArray === null) {
    //     titleArray = [];
    //     titleArray.push(newTitle);
    //     localStorage.setItem("savedTitles", JSON.stringify(titleArray));
    // } else {
    //     // if savedTitles does exist, then new title is pushed into the array and it is set in local storage again
    //     titleArray.push(newTitle);
    //     localStorage.setItem("savedTitles", JSON.stringify(titleArray));
    // }

    // Calls renderWatchlist fucntion
};

// Renders watchlist when page loads

// Open watch list goes here

