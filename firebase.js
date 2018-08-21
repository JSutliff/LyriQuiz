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
    var database = firebase.database();
    var userRef = database.ref("/users");
    var uid;
    var exsistingNames = [];
    $("#username-input").hide();

    var provider = new firebase.auth.GoogleAuthProvider();

    $("#google-logIn").on("click", function(e){
        firebase.auth().signInWithRedirect(provider);
    })

    $("body").on("click", "#createUsername", function (e) {
        e.preventDefault();
        var username = $("#alias-box").val();
        console.log(exsistingNames);
        if (exsistingNames.indexOf(username.toLowerCase()) === -1) {
            database.ref("/users/" + uid).set({
                username: username,
                score: 0
            })
            $("#signIn").hide();
        }
        else {
            $("#usernameLabel").text("Enter different alias, that one is taken");
        }

    })

    userRef.on("value", function(snap){
        snap.forEach(function(childSnap){
            var childData = childSnap.val();
            if(childData.username){
                exsistingNames.push(childData.username.toLowerCase());
            }
        })
    })

    userRef.orderByChild("score").limitToLast(3).on("value", function(snap){
        console.log(snap.val());
        var ranked = [];
        snap.forEach(function(childSnap){
            ranked.push([childSnap.val().username, childSnap.val().score]);
        })
        ranked.sort(function(a, b) {
            return b[1] - a[1];
        })
        console.log(ranked);

        $("#top-champions").html(ranked[0][0] + " " + ranked[0][1] + "<br>"
                                +ranked[1][0] + " " + ranked[1][1] + "<br>"
                                +ranked[2][0] + " " + ranked[2][1])
    })

    firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
          var user = result.user;
          $("#google-logIn").hide();
          $("#name").text(user.displayName);
          uid = user.uid;

          userRef.child(user.uid).once('value', function(snap){
              if(snap.val() == null){
                $("#username-input").show();
              }
              else{
                  console.log(snap.val().username);
                  $("#signIn").hide();
              }
          })

        }
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
