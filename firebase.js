    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAuQ0fr-1h-rskTuGynwUWxxptp-HfI0K8",
        authDomain: "bootcamp-project1-4325b.firebaseapp.com",
        databaseURL: "https://bootcamp-project1-4325b.firebaseio.com",
        projectId: "bootcamp-project1-4325b",
        storageBucket: "bootcamp-project1-4325b.appspot.com",
        messagingSenderId: "396935707440"
    };
    firebase.initializeApp(config);

    var provider = new firebase.auth.GoogleAuthProvider();

    $("#signin").on("click", function(e){
        console.log("click!");
        firebase.auth().signInWithRedirect(provider);
    })

    firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          console.log(token);
          // ...
          var user = result.user;
          console.log(user.displayName);
          $("#signin").removeClass("show");
          $("#signin").addClass("hide");
          var displayWelcome = $("<h1>").text("Hello " + user.displayName)
          $("body").append(displayWelcome);
        }
        // The signed-in user info.


      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });

      console.log(firebase.auth().currentUser);
      
      if(!firebase.auth().currentUser){
          $("#signin").removeClass("hide");
          $("#signin").addClass("show");
      }