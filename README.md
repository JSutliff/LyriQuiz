<!-- Put the name of the project after the # -->
<!-- the # means h1  -->
# Group Project (Lyric-Quiz)

<!-- Put a description of what the project is -->
We utilized our skillsets in HTML5, CSS3, Javascript, JQuery, Bootstrap, Firebase 
and AJAX to make a lyrical quiz. The website allows friends to test their knowledge
of lyrics from the current top 100 songs. 

## Link to deployed site
<!-- make a link to the deployed site --> 
<!-- [What the user will see](the link to the deployed site) -->
[Lyric-Quiz](https://jsutliff.github.io/LyriQuiz/)

<!-- # Images
<!-- take a picture of the image and add it into the readme  -->
<!-- ![image title](path or link to image) -->
<!-- [screen shot of completed assignment](assets/images/screenShot.png) --> 
## Images
![Lyric-Quiz]()

## Technologies used
<!-- make a list of technology used -->
<!-- what you used for this web app, like html css -->
1. HTML5
2. CSS3/ Bootstrap/ Bubble.JS
  * grid layout
3. jQuery
  * Event handling
  * Dynamically create new elements
  * Appending and removing newly created elements to other html elements
  * Providing attributes to the newly dynamically created elements
4. AJAX API Calls
  * Building querystrings for the AJAX call to APIs
  * Utilizing the response received from the API
5. Firebase
  * Keeping data persistent
  * Configuring and initializing firebase 
  * Event handlers(child_added, value)
  * Saving and retreiving data from the application to the database
6. Github
  * version control working with collaborators
  * Branching from master branch
  * Merging back to master branch

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
<!------------JASON--------------------------------->
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
<!----------------------------Jason-------------------------------------------->

<!------------ajita--------------------------------->
```javascript

```
# Explanation of code

<!----------------------------ajita-------------------------------------------->

<!------------Andrew--------------------------------->
```javascript

```
# Explanation of code

<!----------------------------Andrew-------------------------------------------->

<!------------nasib--------------------------------->
```javascript

```
# Explanation of code

<!----------------------------nasib-------------------------------------------->

# Learning points
<!-- Learning points where you would write what you thought was helpful -->
1. Working with Github with collaborators was a new learning experience
  * Branching and Merging with master branch
  * Communicating when changes made to master
2. Agile way of application development
  * Communicationg within group members
  * Updating members every day about the progress
  * Making changes as they came

# Author 
<!-- make a link to the deployed site and have your name as the link -->
[Ajita Srivastava](https://ajitas.github.io/Basic-Portfolio/)
[Andrew M.](https://andypants152.github.io/Responsive-Portfolio/)
[Jason P. Sutliff](https://jsutliff.github.io/Basic-Portfolio/)
[Nasibeh N.](https://nasibnia.github.io/Bootstrap-Portfolio/)
