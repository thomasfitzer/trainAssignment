var config = {
    apiKey: "AIzaSyBoGA0cetE4ZjWF3BjRa1MtBYWRYRGHbKQ",
    authDomain: "trainschedule-f36ee.firebaseapp.com",
    databaseURL: "https://trainschedule-f36ee.firebaseio.com",
    projectId: "trainschedule-f36ee",
    storageBucket: "trainschedule-f36ee.appspot.com",
    messagingSenderId: "235122739408"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
//Setting the initial values to blank.
  var nameTrain = "";
  var destTrain = "";
  var initialTrain = "";
  var freq = "";



$("#addtrain").on("click", function(){
  
  //Takes the spaces on the HTML and associates them with a variable.
  nameTrain = $("#name-input").val().trim();
  destTrain = $("#dest-input").val().trim();
  initialTrain = $("#initial-input").val().trim();
  freq = $("#freq-input").val().trim();
  

  var newTrain = {
    nameTrain: nameTrain,
    destTrain: destTrain,
    initialTrain: initialTrain,
    freq: freq

  };
//Pushes the values entered into the form into the Firebase
  database.ref().push(newTrain);
      
  $("#name-input").val("");
  $("#dest-input").val("");
  $("#initial-input").val("");
  $("#freq-input").val("");

  return false;
  
});



//Takes the info from the Firebase and puts it on the HTML (I think?)
database.ref().on("child_added", function(childSnapshot){
   console.log(childSnapshot.val());
   nameTrain = childSnapshot.val().nameTrain;
   destTrain = childSnapshot.val().destTrain;
   initialTrain = childSnapshot.val().initialTrain;
   freq = childSnapshot.val().freq;
    
   
    var firstTrain = moment(initialTrain, 'HH:mm');
    var currentTime = moment();
    //This calculates the time till the next train.
    var timeSinceFirst = currentTime.diff(firstTrain, 'minutes');
    var timeSinceLast = timeSinceFirst % freq;
    var timeAway = freq - timeSinceLast;

    var nextTrain = currentTime.add(timeAway, 'minutes');
    var formatNextTrain = nextTrain.format("HH:mm");
    console.log(formatNextTrain);
    //In theory, this would add the info entered into the form and put it into the table.
    
    
    
    //This does add the info onto the table. Unfortunately, when you enter a second
    //train into there, it puts it on the same row. And I couldn't figure out how to
    //add another row. Also, I couldn't figure out how to reset the form after clicking "Add Train"
    
    $('#fresh-trains > tbody').append("<tr><td>" + nameTrain + "</td><td>" + destTrain + "</td><td>" + 
    initialTrain + "</td><td>" + freq + "</td><td>" + formatNextTrain + "</td><tr>" );
   
  //   // Add each train's data into the table
  //   $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" +
  //           tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");
  // });
    
    

}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);

    
});



