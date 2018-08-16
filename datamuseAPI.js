$(document).ready(function () {

    jQuery.ajaxPrefilter(function (options) {
      if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
      }
    });

var apiKey = "a731b06ce37dbb83ac69163abef82fef"
    var word = "wondering"
    var queryURL = "http://api.datamuse.com/words/?sl=" + word + "&max=10";
    $.ajax({
        url: queryURL,
        method: "GET",

    }).then(function(response){
        // $("#output").text(JSON.parse(response));
        console.log("some Words similar to " + word + "  are" );
        console.log(response);
        // console.log(JSON.parse(response) )
    });

});