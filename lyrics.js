//stores the removed word from the lyrics
var missingWord;
//stores the score
var score = 0;
//reference to the timer
var timer;
//store the count of question number
var questionCount =0;

//CORs prefilter
jQuery.ajaxPrefilter(function (options) {
  if (options.crossDomain && jQuery.support.cors) {
    options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
  }
});

//checks if a word consists of only alphabets 
function onlyAlphabets(word){
  for(var i =0;i<word.length; i++){
    //for alphabets uppercase will not be same as lowercase
    if(word[i].toUpperCase() === word[i].toLowerCase()){
      return false;
    }
  }
  return true;
}

//shuffle the options array so that the position of correct option changes with every question
function shuffle(options) {
  var j, x, i;
  //find a random index and swap the last unswapped element with the its element
  for (i = options.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = options[i];
    options[i] = options[j];
    options[j] = x;
  }
  return options;
}

//shows the next question on page
function showNextQuestion(){

  //keep a track of number of questions
  questionCount++;
  console.log("Question number " , questionCount);
  //empty the options area on the web page
  $("#card-quiz-area .answer .custom-radio").remove();
  //clear the question area on the page
  $("#card-quiz-area .question").html("");

  //if number of questions has reached 10, end the quiz and store the score in database
  if(questionCount < 11){
    //api call to get lyrics of a random song from chart top 100 tracks 
    var apiKey = "a731b06ce37dbb83ac69163abef82fef";
    queryURL = "http://api.musixmatch.com/ws/1.1/chart.tracks.get?page_size=100&f_has_lyrics=1&apikey=" + apiKey;
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function(response){

      //get the list of tracks returned
      var trackList = JSON.parse(response).message.body.track_list;
               
      //filter the track list for explicit content
      var cleanLyricsList = trackList.filter(function(elem) {
        return elem.track.explicit === 0;
      });

      //find a random index in the filtered tracks list
      var randomIndex = Math.floor(Math.random() * cleanLyricsList.length);
      
      //get the random track from the clean track list
      var trackId = cleanLyricsList[randomIndex].track.track_id;
      var artist = cleanLyricsList[randomIndex].track.artist_name;

      //api call to get the lyrics of the selected track
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

        console.log(missingWord);
        //once we found the random word we are going to remove from the question,
        //replace that word with blank ("______")
        strArray[randomIndex] = "________";
      
        //make the question with the blank into a string
        strOutput="";
        for(var i = 0;i<strArray.length;i++){
          strOutput = strOutput + strArray[i] + " ";
        }
        //append the question to the question area on the page
        $("#card-quiz-area .question").html(artist+"<br>"+strOutput);

        //api call to find similar sounding words as our missing word to create options for quiz
        apiKey = "a731b06ce37dbb83ac69163abef82fef"
        var word = missingWord;
        var queryURL = "http://api.datamuse.com/words/?rel_rhy=" + word + "&max=10";
        $.ajax({
          url: queryURL,
          method: "GET",
        }).then(function(response){
      
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
          var options = shuffle(options);

          //for all the 4 options create radio buttons and append to the options are on page
          for(var j =0; j<options.length ;j++){

            //create a radio button with id=customRadio1, customRadio2
            var optionRadio = $("<input type='radio'>");
            optionRadio.attr("id","customRadio"+parseInt(j+1));
            //give the radio button name of customRadio
            optionRadio.attr("name","customRadio");
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

          //clear the timer
          clearInterval(timer);
          //set start time to 20 seconds
          var startTime = 20;
          //set the timer
          timer = setInterval(function(){
            //update the time on screen
            $("#time-left").html(startTime+" seconds <img src='images/timer_2.gif'>");
            //decrement time
            startTime--;
            //if timer has reached 0 seconds
            if(startTime < 0){
              //stop the timer
              clearInterval(timer);
              //show next question
              showNextQuestion();
            }
          },1000);
        });
      });
    });
  }
  //if 10 questions are over, finish the quiz and update the score in database
  else{
    updateScore(score);
  }
}

$(document).ready(function () {

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
    }

    //stop the timer
    clearInterval(timer);
    //show next question
    showNextQuestion();
  });

});
  