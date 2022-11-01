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
            var imdbAPI = "https://imdb-api.com/API/AdvancedSearch/k_zns86b2w?title=" + userInput.value + "&title_type=feature,tv_series";

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
            var imdbAPI = "https://imdb-api.com/API/AdvancedSearch/k_zns86b2w?title=" + userInput.value + "&title_type=feature";

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
            var imdbAPI = "https://imdb-api.com/API/AdvancedSearch/k_zns86b2w?title=" + userInput.value + "&title_type=tv_series";

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
            var imdbAPI = "https://imdb-api.com/API/AdvancedSearch/k_zns86b2w?title=" + userInput.value;

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
            var imdbAPI = "https://imdb-api.com/API/AdvancedSearch/k_zns86b2w?title_type=feature,tv_series&genres=" + userInput.value;

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
            var imdbAPI = "https://imdb-api.com/API/AdvancedSearch/k_zns86b2w?title_type=feature&genres=" + userInput.value;

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

            var imdbAPI = "https://imdb-api.com/API/AdvancedSearch/k_zns86b2w?title_type=tv_series&genres=" + userInput.value;

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

            var imdbAPI = "https://imdb-api.com/API/AdvancedSearch/k_zns86b2w?genres=" + userInput.value;

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
        // console.log(data.results[1].title);
        // console.log(typeof data.results[i].title);

        if (data.results[i].imDbRating !== null && data.results[i].contentRating !== null) {

            // Creates an empty arrat for the getStreamingData to push objects into
            var streamingArray = [];
            getStreamingData(streamingArray, data.results[i].id);
            
            let titleObject = {
                title: data.results[i].title,
                year: data.results[i].description,
                rating: data.results[i].imDbRating,
                image: data.results[i].image,
                plot: data.results[i].plot,
                streaming: streamingArray
            }

            // Send title object array to generate movie card function
            console.log(data.results[i].title + " data");
            console.log(titleObject);
           
        }

    }


}

// Gets streaming data
function getStreamingData(streamingArray, movieId) {
    var watchModeApiUrl = "https://api.watchmode.com/v1/title/" + movieId + "/sources/?apiKey=GxDnEWsxu9BHe88iX3i9jGGcQZ0Z7rNGuo805kOG";

    fetch(watchModeApiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                // console.log("--Streaming--");
                // console.log(data);
                
                let nameArray = []

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

            });

        }

    });

}

// Delete later
// getStreamingData("tt0167260");

// Add movie card function goes here


function addStreamingData(streamingArray) {

    let streamingDiv = document.createElement("div");
    let streamingListUl = document.createElement("ul");

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
    localStorage.setItem(newTitle, JSON.stringify(addTitle));

    // Looks for savedTitles in local storage
    var titleArray = JSON.parse(localStorage.getItem("savedTitles"));

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

    // Calls renderWatchlist fucntion
};

// Renders watchlist when page loads

// Open watch list goes here
