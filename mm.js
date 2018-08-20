$(document).ready(function () {

    jQuery.ajaxPrefilter(function (options) {
      if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
      }
    });

    var apiKey = "a731b06ce37dbb83ac69163abef82fef"
    var artist = "Adele"
    var queryURL = "http://api.musixmatch.com/ws/1.1/artist.search?q_artist=" + artist + "&apikey=" + apiKey;
    $.ajax({
        url: queryURL,
        method: "GET",

    }).then(function(response){
        $("#output").text(JSON.parse(response));
        console.log(JSON.parse(response));
        console.log(JSON.parse(response). )
    }

    )
})