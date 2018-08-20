<!-- Put the name of the project after the # -->
<!-- the # means h1  -->
# Group Project (Lyric-Quiz)

<!-- Put a description of what the project is -->
We utilized our skillsets in HTML5, CSS3, Javascript, JQuery, Bootstrap, Firebase 
and AJAX to make a lyrical quiz. The website allows friends to test their knowledge
of lyrics from the current top 100 songs. 

# Link to deployed site
<!-- make a link to the deployed site --> 
<!-- [What the user will see](the link to the deployed site) -->
[Lyric-Quiz](https://jsutliff.github.io/LyriQuiz/)

# Images
<!-- take a picture of the image and add it into the readme  -->
<!-- ![image title](path or link to image) -->
[screen shot of completed assignment](assets/images/screenShot.png)


<img src="assets/images/gifGenScreenShot.jpeg">
# technology used
<!-- make a list of technology used -->
<!-- what you used for this web app, like html css -->
- HTML5
- jQuery
  -AJAX API Calls
- CSS3
- Bubble.JS
- Firebase
- Bootstrap


<!-- 
1. First ordered list item
2. Another item
⋅⋅* Unordered sub-list. 
1. Actual numbers don't matter, just that it's a number
⋅⋅1. Ordered sub-list
4. And another item. 
-->


# code snippets
<!-- put snippets of code inside ``` ``` so it will look like code -->
<!-- if you want to put blockquotes use a > -->

```javascript
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

      var trackList = JSON.parse(response).message.body.track_list;
                    
      var cleanLyricsList = trackList.filter(function(elem) {
        return elem.track.explicit === 0;
      });

      var limit = cleanLyricsList.length;
      var randomIndex = Math.floor(Math.random() * limit);
      
      var trackId = cleanLyricsList[randomIndex].track.track_id;

      queryURL = "http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=" + trackId + "&apikey=" + apiKey;
      $.ajax({
        url: queryURL,
        method: "GET",
      }).then(function(response){
        //get the track lyrics in str
        var str = JSON.parse(response).message.body.lyrics.lyrics_body;

```
# Explanation of code
This code shows interaction with elements on the DOM and ajax calls being performed.
We also implemented .filter to remove any explicit lyrics from out game. If the user
has answered less than 10 questions asjax call is made to return another set of lyrics. 

# Learning points
<!-- Learning points where you would write what you thought was helpful -->
This assignment was a lot of fun. It was challenging yet rewarding and really highlights
some of the posibilites for programming with an API. Making the ajax call and working 
with someone elses data is a lot of fun and a new experience for me. I look forward
to learning more and implementing future use cases. 

# Author 
<!-- make a link to the deployed site and have your name as the link -->
[Ajita Srivastava](https://ajitas.github.io/Basic-Portfolio/)
[Andrew W.](https://andypants152.github.io/Responsive-Portfolio/)
[Jason P. Sutliff](https://jsutliff.github.io/Basic-Portfolio/)
[Nasibeh N.](https://nasibnia.github.io/Bootstrap-Portfolio/)
