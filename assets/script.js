var searchContainer = document.querySelector("#search-container")
var userInput = document.querySelector("#user-input");
var dropDown = document.querySelector("#drop-down");
var searchForm = document.querySelector("#search-form");
var checkBoxContainer = document.querySelector("#checkbox-container");
var filmCheck = document.querySelector("#film");
var tvCheck = document.querySelector("#tv");
var searchButton = document.querySelector("#search-button");

var movieTitle = [];
var moviePoster = [];
var plotDescription = [];
var rating = [];
var id = [];

function submitFunction(e) {

  e.preventDefault();
  
if (userInput.value) {
    console.log(userInput.value);
    console.log(dropDown.value);
    console.log(filmCheck.checked);
    console.log(tvCheck.checked);

}
}

//Event listener for search form
searchButton.addEventListener("click", submitFunction);

function selectionsValue (e) {

    e.preventDefault();
    var selectOptions = dropDown.value;
    var selectOptions = dropDown.value;
    console.log(selectOptions);

    var tvcheckBox = tvCheck.checked;
    var filmcheckBox = filmCheck.checked;
    console.log(tvcheckBox);
    console.log(filmcheckBox);

    if (selectOptions != "title" && selectOptions != "genre") {

        alert("Please pick a different option either Title or Genre");
        var selectOptions = dropDown.value;
        console.log(selectOptions);
        var tvcheckBox = tvCheck.checked;
        var filmcheckBox = filmCheck.checked;
        console.log(tvcheckBox);
        console.log(filmcheckBox);
    }
    console.log(typeof selectOptions);
    searchTitles(selectOptions, tvcheckBox, filmcheckBox);
}
//the searchTitles function will go through multiple if statements depending on what the user specifies and fetches the API request and puts it into a array called data
function searchTitles(selectOptions, tvcheckBox, filmcheckBox) {
    console.log(userInput);
    if (selectOptions === "title") {
        if ((tvcheckBox === true) && (filmcheckBox === true)) {
            var imdbAPI = "https://imdb-api.com/API/AdvancedSearch/k_zns86b2w?title=" + userInput + "&title_type=feature,tv_series";
            console.log(imdbAPI);
            fetch(imdbAPI).then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        console.log(data);
                        dataSorter(data);
                        return;
                    })
                }
            })
        } else if ((tvcheckBox === false) && (filmcheckBox === true)) {
            var imdbAPI = "https://imdb-api.com/API/AdvancedSearch/k_zns86b2w?title=" + userInput + "&title_type=feature";
            fetch(imdbAPI).then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        console.log(data);
                        dataSorter(data);
                        return;
                    })
                }
            })
        } else if ((tvcheckBox === true) && (filmcheckBox === false)) {
            var imdbAPI = "https://imdb-api.com/API/AdvancedSearch/k_zns86b2w?title=" + userInput + "&title_type=tv_series";
            fetch(imdbAPI).then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        console.log(data);
                        dataSorter(data);
                        return;
                    })
                }
            })
        } else{
            var imdbAPI = "https://imdb-api.com/API/AdvancedSearch/k_zns86b2w?title=" + userInput;
            fetch(imdbAPI).then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        console.log(data);
                        dataSorter(data);
                        return;
                    })
                }
            })
        }
    }else{
        if ((tvcheckBox === true) && (filmcheckBox === true)) {
            var imdbAPI = "https://imdb-api.com/API/AdvancedSearch/k_zns86b2w?title_type=feature,tv_series&genres=" + userInput;
            fetch(imdbAPI).then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        console.log(data);
                        dataSorter(data);
                        return;
                    })
                }
            })
        } else if ((tvcheckBox === false) && (filmcheckBox === true)) {
            var imdbAPI = "https://imdb-api.com/API/AdvancedSearch/k_zns86b2w?title_type=feature&genres=" + userInput;
            fetch(imdbAPI).then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        console.log(data);
                        dataSorter(data);
                        return;
                    })
                }
            })
        } else if ((tvcheckBox === true) && (filmcheckBox === false)) {
            var imdbAPI = "https://imdb-api.com/API/AdvancedSearch/k_zns86b2w?title_type=tv_series&genres=" + userInput;
            fetch(imdbAPI).then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        console.log(data);
                        dataSorter(data);
                        return;
                    })
                }
            })
        } else{
            var imdbAPI = "https://imdb-api.com/API/AdvancedSearch/k_zns86b2w?genres=" + userInput;
            fetch(imdbAPI).then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        console.log(data);
                        dataSorter(data);
                        return;
                    })
                }
            })
        }
    }
}
//dataSorter function loops through the data to find the major info and inputs it into seperate arrays and id is saved as a string
//not sure if this is good or if it would have been better to put all of the info into a single array
function dataSorter(data){
    console.log("hello");
    var movieObjectArray = {
    // console.log(data.results[1].title);
    // console.log(typeof data.results[i].title);
    title: [],
    poster: [],
    plot: [],
    rating: [],
    id: [],
    }
    for(i=0;i<data.results.length;i++){
        console.log("hello");
        movieObjectArray.title.push(data.results[i].title);
        movieObjectArray.poster.push(data.results[i].image);
        movieObjectArray.plot.push(data.results[i].plot);
        movieObjectArray.rating.push(data.results[i].imDbRating);
        movieObjectArray.id.push(data.results[i].id);
    };
    console.log(movieObjectArray);
    idStringify = JSON.stringify(movieObjectArray);
    localStorage.setItem("MovieObj",movieObjectArray);
}



// function testfunction(){
//     var imdbAPI = "https://imdb-api.com/API/AdvancedSearch/k_zns86b2w?title=the lord of the rings&title_type=feature,tv_series";
//     fetch(imdbAPI).then(function (response) {
//         if (response.ok) {
//             response.json().then(function (data) {
//                 console.log(data);
//                 return;
//             })
//         }
//     })
// }
// testfunction();
 searchForm.addEventListener("submit", selectionsValue);

//Delete later
// var imdbApiUrl = "https://imdb-api.com/en/API/AdvancedSearch/k_zns86b2w/?title=the lord of the rings";
