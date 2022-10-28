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