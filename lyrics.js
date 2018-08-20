var missingWord;
var score = 0;
var timer;
var questionCount =0;

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCyReM-YdixMVFjlHkqf9LW7Q-V_9FF3bo",
  authDomain: "farley-87f66.firebaseapp.com",
  databaseURL: "https://farley-87f66.firebaseio.com",
  projectId: "farley-87f66",
  storageBucket: "farley-87f66.appspot.com",
  messagingSenderId: "568494919953"
};
firebase.initializeApp(config);
var database = firebase.database();



jQuery.ajaxPrefilter(function (options) {
  if (options.crossDomain && jQuery.support.cors) {
    options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
  }
});

  
function onlyAlphabets(word){
  for(var i =0;i<word.length; i++){
    if(word[i].toUpperCase() === word[i].toLowerCase()){
      return false;
    }
  }
  return true;
}
  
function shuffle(options) {
  var j, x, i;
  for (i = options.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = options[i];
    options[i] = options[j];
    options[j] = x;
  }
  return options;
}

function showNextQuestion(){

  questionCount++;
  console.log("Question number " , questionCount);
  //empty the options area on the web page
  $("#card-quiz-area .answer .custom-radio").remove();
  //append the question to the question area on the page
  $("#card-quiz-area .question").html("");
  if(questionCount < 11){
    //api call to get lyrics of a random song from chart top 100 tracks 
    var apiKey = "a731b06ce37dbb83ac69163abef82fef";
    queryURL = "http://api.musixmatch.com/ws/1.1/chart.tracks.get?page_size=100&f_has_lyrics=1&apikey=" + apiKey;
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function(response){
      //get the number of tracks in the response
      var limit = JSON.parse(response).message.body.track_list.length;
      //find a random index < number of tracks(limit)
      var randomIndex = Math.floor(Math.random() * limit);
      //get the trackId of the random track selected
      var trackId = JSON.parse(response).message.body.track_list[randomIndex].track.track_id;

      queryURL = "http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=" + trackId + "&apikey=" + apiKey;
      $.ajax({
        url: queryURL,
        method: "GET",
      }).then(function(response){
        //get the track lyrics in str
        var str = JSON.parse(response).message.body.lyrics.lyrics_body;

        //find start index of (***COPYRIGHT**) at the end of the lyrics and slice the lyrics
        str = str.slice(0,str.indexOf("*"));

        //split the lyrics on space (" ") and store it in strArray
        var strArray = str.split(" ");
        //find length of the  strArray
        var limit = strArray.length;
        //find a random index between 0 and limit-30 (because we are picking 30 words from 
        //the lyrics and (limit-30) makes sure that we are not picking any index from last 30 words)
        var randomNum = Math.floor(Math.random()* (limit-30));

        //grab 30 words starting from the random index found
        strArray = strArray.slice(randomNum, randomNum+30);

        //variable to store the piece of the lyrics we found to be the question
        // var strOutput="";
        // for(var i = 0;i<strArray.length;i++){
        //   strOutput = strOutput + strArray[i] + " ";
        // }
        // console.log(strOutput);
      
        //find a random index to remove a word from the question
        randomIndex = Math.floor(Math.random()*30);
        //get the word using the random index
        missingWord = strArray[randomIndex];
      
        //checks
        //1. words length should be >=4 
        //2. word should not contain any newline character
        //3. It should contain only alphabets(no "'",",","." etc)
        //if any of these conditions are dissatisfied, find a new random word from the question
        while(missingWord.length<4 || missingWord.split("\n").length !== 1 || !onlyAlphabets(missingWord)){
          randomIndex = Math.floor(Math.random()*30);
          missingWord = strArray[randomIndex];
        }

        //once we found the random word we are going to remove from the question,
        //replace that word with blank ("______")
        strArray[randomIndex] = "________";
      
        //make the question with the blank into a string
        strOutput="";
        for(var i = 0;i<strArray.length;i++){
          strOutput = strOutput + strArray[i] + " ";
        }
        //append the question to the question area on the page
        $("#card-quiz-area .question").html(strOutput);
        //console.log(missingWord);

        //api call to find similar sounding words as our missing word to create options for quiz
        apiKey = "a731b06ce37dbb83ac69163abef82fef"
        var word = missingWord;
        var queryURL = "http://api.datamuse.com/words/?rel_rhy=" + word + "&max=10";
        $.ajax({
          url: queryURL,
          method: "GET",
        }).then(function(response){
          // console.log("some Words similar to " + word + " are" );
          // console.log(response);
      
          //create an array of options and push the missingword we found in this array
          var options = [missingWord];
          //for other 3 options, find the first 3 similar sounding words from the api response
          //and push it in the options array
          //we now have 4 options in the options array
          for(var i =0;i<3 ;i++){
            options.push(response[i].word);
          }

          //But, the first element in the options array will always be the correct answer
          //so we shuffle the options array
          //console.log(options);
          var options = shuffle(options);

          //for all the 4 options create radio buttons and append to the options are on page
          for(var j =0; j<options.length ;j++){

            //create a radio button with id=customRadio1, customRadio2
            var optionRadio = $("<input type='radio'>");
            optionRadio.attr("id","customRadio"+parseInt(j+1));
            //give the radio button name of customRadio
            optionRadio.attr("name","customRadio");
            //give the radio button class ofcustom-control-input
            optionRadio.attr("class","custom-control-input");
            //give it the value from the option array
            optionRadio.val(options[j]);

            //craete a label and give it text from the option array
            var label = $("<label for=customRadio"+parseInt(j+1)+">"); 
            label.text(options[j]);

            //create a new div and append radio button to it and give it the label created earlier
            var optionDiv = $("<div class ='custom-control custom-radio'>");
            optionDiv.append(optionRadio);
            optionDiv.append(label);
            
            //append the new div to the options area on the page
            $("#card-quiz-area .answer").append(optionDiv);
          }

          //start the timer
          // $("#time-left").html("20 seconds"+ "<img src='images/timer_2.gif'>");

          clearInterval(timer);
          var startTime = 20;
          timer = setInterval(function(){
            $("#time-left").html(startTime+" seconds <img src='images/timer_2.gif'>");
            startTime--;
            if(startTime < 0){
              clearInterval(timer);
              showNextQuestion();
            }
          },1000);
        });
      });
    });
  }
  else{
    updateScore(score);
  }
}

$(document).ready(function () {
  
  showNextQuestion();

  //event handler on value change on database root
  // database.ref().on("value",function(snapshot){
  //   if(snapshot.val())
  //     $("#your-score").text(snapshot.val().score + " points");
  // });

  //when user clicks submit button to register their answer
  $("#submit-answer").on("click", function(event){

    //prevent page to be refreshed
    event.preventDefault();
    //if checked radio button's value matches with the missing word
    if($("input[name=customRadio]:checked").val() === missingWord){
      //then answer is correct
      console.log("correct");
      //increment the score
      score++;

      //show it on DOM
      $("#your-score").text(score + " Points");
      //Save it in database
      // database.ref().set({
      //   score:score
      // });
    }
    //if checked radio button's value does not match with the missing word
    else
      //then answer is correct
      console.log("incorrect");

    //wait for 3 second before showing the next queston
    clearInterval(timer);
    showNextQuestion();
    //setTimeout(showNextQuestion,3000);
  });

});
  