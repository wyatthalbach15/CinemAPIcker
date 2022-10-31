var searchContainer = document.querySelector("#search-container")
var userInput = document.querySelector("#user-input");
var searchBtn = document.querySelector("#search-button");
var dropDown = document.querySelector("#drop-down");
var searchForm = document.querySelector("#search-form");
var checkBoxContainer = document.querySelector("#checkbox-container");
var filmCheck = document.querySelector("#film");
var tvCheck = document.querySelector("#tv");
var userInput = document.querySelector("#user-input");
var dropDown = document.querySelector("#drop-down");
var searchButton = document.querySelector("#search-button");
var form = document.getElementById("search-form");

var movieTitle = [];
var moviePoster = [];
var plotDescription = [];
var rating = [];
var id = [];

if (userInput.value) {
     console.log(userInput.value);

 }

 function submitFunction(e) {
     e.preventDefault();
     console.log(userInput.value)
};

form.addEventListener("submit", submitFunction);
//the function selectionsValue gets the input of the user from the drop-down menu and checklist and puts it to its corresponding variable
function selectionsValue(e) {
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
    for(i=0;i<data.results.length;i++){
        // console.log(data.results[1].title);
        // console.log(typeof data.results[i].title);
        movieTitle.push(data.results[i].title);
        moviePoster.push(data.results[i].image);
        plotDescription.push(data.results[i].plot);
        rating.push(data.results[i].imDbRating);
        id.push(data.results[i].id);
    }
    console.log(movieTitle);
    console.log(moviePoster);
    console.log(plotDescription);
    console.log(rating);
    console.log(id);
    idStringify = JSON.stringify(id);
    localStorage.setItem("idSaved",id);
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
