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
var searchContainer = document.querySelector("#search-container")
var userInput = document.querySelector("#user-input");
var searchBtn = document.querySelector("#search-button");
var dropDown = document.querySelector("#drop-down");
var searchForm = document.querySelector("#search-form");
var checkBoxContainer = document.querySelector("#checkbox-container");
var filmCheck =document.querySelector("#film");
var tvCheck = document.querySelector("#tv");

function selectionsValue (e) {
    e.preventDefault();
    var selectOptions = dropDown.value;
    var selectOptions = dropDown.value;
    console.log(selectOptions);
    var tvcheckBox = tvCheck.checked;
    var filmcheckBox = filmCheck.checked;
    console.log(tvcheckBox);
    console.log(filmcheckBox);
    if(selectOptions != "title" && selectOptions != "genre"){
        alert("Please pick a different option either Title or Genre");
        var selectOptions = dropDown.value;
        console.log(selectOptions);
        var tvcheckBox = tvCheck.checked;
        var filmcheckBox = filmCheck.checked;
        console.log(tvcheckBox);
        console.log(filmcheckBox);
    }
}
searchForm.addEventListener("submit", selectionsValue);
