var userInput = document.querySelector("#user-input");
var dropDown = document.querySelector("#drop-down");
var searchButton = document.querySelector("#search-button");
var form = document.getElementById("search-form");


if (userInput.value) {
    console.log(userInput.value);

}

function submitFunction(e){
    e.preventDefault();
    console.log(userInput.value)
};

form.addEventListener("submit", submitFunction);


var imdbApiUrl = "https://imdb-api.com/en/API/AdvancedSearch/k_zns86b2w/?genres=fantasy";

// fetch(imdbApiUrl).then(function(response) {
//     if (response.ok){
//         response.json().then(function(data) {
//             console.log("--IMDb--");
//             console.log(data);
//         });
//     }
// });

var watchModeApiUrl = "https://api.watchmode.com/v1/title/tt0167260/sources/?apiKey=B5EKPpGzVjzybQt6fdVSnprxP9IXaVfuAUPtCiVC";

// fetch(watchModeApiUrl).then(function(response) {
//     if (response.ok){
//         response.json().then(function(data) {
//             console.log("--Streaming--");
//             console.log(data);
//         });
//     }
// });

// Gets streaming data
function getStreamingData(movieId) {
    var watchModeApiUrl = "https://api.watchmode.com/v1/title/" + movieId + "/sources/?apiKey=B5EKPpGzVjzybQt6fdVSnprxP9IXaVfuAUPtCiVC";

    fetch(watchModeApiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log("--Streaming--");
                console.log(data);
                console.log(data[5].web_url);

                let streamingArray = [];
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

                
                console.log("Name Array");
                console.log(nameArray);
                
                console.log("Streaming Array");
                console.log(streamingArray);

                return;
            });
        }
    });
}

// getStreamingData("tt0167260");


// Gets movie data
function getMovieData(movieId) {
    var imdbApiUrl = "https://imdb-api.com/en/API/Title/k_zns86b2w/" + movieId;

    fetch(imdbApiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log("--IMDb--");
                console.log(data);
                console.log(data.fullTitle);

                let movieObject = {
                    title: data.fullTitle,
                    year: data.year,
                    rating: data.imDbRating,
                    image: data.image,
                    plot: data.plot,
                    streaming: getStreamingData(data.id)
                };

                console.log(movieObject);

                return;
            });
        }
    });
}

// add movie data to "movie-container"
function addMovieData(movieObject) {
    let movieContainer = document.querySelector("#movie-container");
    let movieCard = document.createElement("div");
    let movieImage = document.createElement("img");
    let movieTitle = document.createElement("h2");
    let movieYear = document.createElement("p");
    let movieRating = document.createElement("p");
    let moviePlot = document.createElement("p");
    let movieStreaming = document.createElement("p");

    movieCard.classList.add("movie-card");
    movieImage.classList.add("movie-image");
    movieTitle.classList.add("movie-title");
    movieYear.classList.add("movie-year");
    movieRating.classList.add("movie-rating");
    moviePlot.classList.add("movie-plot");
    movieStreaming.classList.add("movie-streaming");

    movieImage.src = movieObject.image;
    movieTitle.textContent = movieObject.title;
    movieYear.textContent = movieObject.year;
    movieRating.textContent = movieObject.rating;
    moviePlot.textContent = movieObject.plot;
    movieStreaming.textContent = movieObject.streaming;

    movieCard.appendChild(movieImage);
    movieCard.appendChild(movieTitle);
    movieCard.appendChild(movieYear);
    movieCard.appendChild(movieRating);
    movieCard.appendChild(moviePlot);
    movieCard.appendChild(movieStreaming);

    movieContainer.appendChild(movieCard);
}

// Add event listener to “Select” button for each movie (for retrieve streaming data function)
function SelectButton(movieId) {
    let selectButton = document.querySelector("#select-button-" + movieId);
    selectButton.addEventListener("click", function (event) {
        event.preventDefault();
        getStreamingData(movieId);
    });
}