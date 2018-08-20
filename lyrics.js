var artistId;
  jQuery.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
      options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
  });

$(document).ready(function () {

    var apiKey = "a731b06ce37dbb83ac69163abef82fef";
    // var queryURL = "http://api.musixmatch.com/ws/1.1/artist.search?q_artist=" + artist + "&apikey=" + apiKey;
    // $.ajax({
    //     url: queryURL,
    //     method: "GET",

    // }).then(function(response){
    //     $("#output").text(JSON.parse(response));
    //     console.log(JSON.parse(response).message.body.artist_list[0].artist.artist_id);
    //     artistId = JSON.parse(response).message.body.artist_list[0].artist.artist_id;

        // preFilter();
    //     queryURL = "http://api.musixmatch.com/ws/1.1/artist.albums.get?artist_id=" + artistId + "&apikey=" + apiKey;
    //         $.ajax({
    //           url: queryURL,
    //           method: "GET",
    //       }).then(function(response){
    //           $("#output").text(JSON.parse(response));
    //           console.log(response);
    //           var limit = JSON.parse(response).message.body.album_list.length;
    //           var randomIndex = Math.floor(Math.random() * limit);
    //           var albumId = JSON.parse(response).message.body.album_list[randomIndex].album.album_id;
    //           console.log(albumId);

              queryURL = "http://api.musixmatch.com/ws/1.1/chart.tracks.get?page_size=100&f_has_lyrics=1&apikey=" + apiKey;
                  $.ajax({
                    url: queryURL,
                    method: "GET",
                }).then(function(response){
                    $("#output").text(JSON.parse(response));
                    console.log(response);
                    var trackList = JSON.parse(response).message.body.track_list;
                    
                    var cleanLyricsList = trackList.filter(function(elem) {
                      return elem.track.explicit === 0;
                    });

                    var limit = cleanLyricsList.length;
                    var randomIndex = Math.floor(Math.random() * limit);
                    
                    var trackId = cleanLyricsList[randomIndex].track.track_id;
                    console.log(trackId);
                    
                    queryURL = "http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=" + trackId + "&apikey=" + apiKey;
                        $.ajax({
                          url: queryURL,
                          method: "GET",
                      }).then(function(response){
                          $("#output").text(JSON.parse(response));
                          console.log(response);
                          console.log(JSON.parse(response).message.body.lyrics.lyrics_body);
                      
                          apiKey = "a731b06ce37dbb83ac69163abef82fef"
                          var word = "rain"
                          var queryURL = "http://api.datamuse.com/words/?rel_rhy=" + word + "&max=10";
                          $.ajax({
                              url: queryURL,
                              method: "GET",
                      
                          }).then(function(response){
                              // $("#output").text(JSON.parse(response));
                              console.log("some Words similar to " + word + "  are" );
                              console.log(response);
                              // console.log(JSON.parse(response) )
                          });
                      
                } );
          } );
    } );

//   });
// });