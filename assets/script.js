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