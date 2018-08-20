$(document).ready(function () {

<<<<<<< HEAD
    var artistInfo = {};

    function musixmatch (type, term){

        jQuery.ajaxPrefilter(function (options) {
            if (options.crossDomain && jQuery.support.cors) {
              options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
            }
          });

          var apiKey = "a731b06ce37dbb83ac69163abef82fef"
          var queryURL = "";

          if(type === "artist"){
            queryURL = "http://api.musixmatch.com/ws/1.1/artist.search?q_artist=" + term + "&f_has_lyrics&apikey=" + apiKey;
          }
          else if(type === "tracks"){
              queryURL = "http://api.musixmatch.com/ws/1.1/tracks.search?f_artist_id=" + term + "&s_track_rating&page=10&f_has_lyrics&apikey=" + apiKey;
          }
          else if(type === "lyrics"){
              queryURL = "http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=" + term + "&apikey=" + apiKey;
          }
          else if(type === "top"){
              queryURL = "http://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=100&f_has_lyrics=1&apikey=" + apiKey;
          }

          console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET",
    
        }).then(function(response){
            var output = JSON.parse(response);
            console.log(output);
            if(type === "artist"){
                var path = output.message.body.artist_list[0].artist;
                artistInfo.name = path.artist_name;
                musixmatch("tracks", path.artist_id);
            }
            else if(type === "tracks"){
                console.log(artistInfo);
                for(var i = 0; i < output.message.body.track_list.length; i++){
                    var path = output.message.body.track_list[i].track;
                    artistInfo["track" + path.track_id] = {
                        name: path.track_name,
                        rating: path.track_rating};
                }
            }
            else if(type === "lyrics"){
                
            }
        })

=======
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
>>>>>>> 6cad743c35a9c4adbd95a2f9962f1c077fe62869
    }



musixmatch("top")    
    

})