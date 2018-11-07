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
    
  //  var currentTime = moment().unix();
  //  console.log(currentTime);
    // var firstTrain = moment(initialTrain, 'HH:mm');
    
    //This calculates the time till the next train.
    // var timeSinceFirst = currentTime.diff(firstTrain, 'minutes');
    // console.log(initialTrain.unix());
    // var newInitialTrain = moment(initialTrain, "HH:mm").unix();
    var timeArrival = initialTrain.split(":");
    var trainTime = moment().hours(timeArrival[0]).minutes(timeArrival[1]);
    console.log(trainTime);
    console.log(timeArrival);
    
    var mostMoment = moment.max(moment(), trainTime);
    console.log(mostMoment);
    var inMinutes;
    var nextArrival;

    if (mostMoment === trainTime) {
      nextArrival = trainTime.format("HH:mm");
      inMinutes = trainTime.diff(moment(), "minutes");
    } else {
      var diffTimes = moment().diff(trainTime, "minutes");
      var trainRemainder = diffTimes % freq;
      inMinutes = freq - trainRemainder;
      nextArrival = moment().add(inMinutes, "m").format("HH:mm");
      console.log(nextArrival);
    }

    // if (maxMoment === trainTime) {
    //   tArrival = trainTime.format("hh:mm A");
    //   tMinutes = trainTime.diff(moment(), "minutes");
    // } else {
  
    //   // Calculate the minutes until arrival using hardcore math
    //   // To calculate the minutes till arrival, take the current time in unix subtract the FirstTrain time
    //   // and find the modulus between the difference and the frequency.
    //   var differenceTimes = moment().diff(trainTime, "minutes");
    //   var tRemainder = differenceTimes % tFrequency;
    //   tMinutes = tFrequency - tRemainder;
    //   // To calculate the arrival time, add the tMinutes to the current time
    //   tArrival = moment().add(tMinutes, "m").format("hh:mm A");
    // }
    
    // var nextArrival = trainTime.diff(moment(), "minutes");
    // console.log(nextArrival);
    
    

    
    $('#fresh-trains').append("<tr><td>" + nameTrain + "</td><td>" + destTrain + "</td><td>" + 
    initialTrain + "</td><td>" + freq + "</td><td>" + inMinutes + "</td><tr>" );
   
  //   // Add each train's data into the table
  //   $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" +
  //           tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");
  // });
    
    

}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);

    
});



