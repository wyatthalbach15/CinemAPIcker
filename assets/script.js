var imdbApiUrl = "https://imdb-api.com/en/API/AdvancedSearch/k_zns86b2w/?genres=fantasy";

fetch(imdbApiUrl).then(function(response) {
    if (response.ok){
        response.json().then(function(data) {
            console.log("--IMDb--");
            console.log(data);
        });
    }
});

var watchModeApiUrl = "https://api.watchmode.com/v1/title/tt11198330/sources/?apiKey=B5EKPpGzVjzybQt6fdVSnprxP9IXaVfuAUPtCiVC";

fetch(watchModeApiUrl).then(function(response) {
    if (response.ok){
        response.json().then(function(data) {
            console.log("--Streaming--");
            console.log(data);
        });
    }
});