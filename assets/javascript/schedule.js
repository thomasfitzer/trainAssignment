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

  var nameTrain = "";
  var destTrain = "";
  var initialTrain = "";
  var freq = "";


  $("#addtrain").on("click", function(){

  
  nameTrain = $("#name-input").val().trim();
  destTrain = $("#dest-input").val().trim();
  initialTrain = $("#initial-input").val().trim();
  freq = $("#freq-input").val().trim();
  document.getElementById('.form-control').reset();
  

  console.log(nameTrain);
  console.log(destTrain);
  console.log(initialTrain);
  console.log(freq);


  database.ref().push({
      nameTrain: nameTrain,
      destTrain: destTrain,
      initialTrain: initialTrain,
      freq: freq
  });
  return false;
});

database.ref().on("child_added", function(snapshot){
   console.log(snapshot.val());
   nameTrain = snapshot.val().nameTrain;
   destTrain = snapshot.val().destTrain;
   initialTrain = snapshot.val().initialTrain;
   freq = snapshot.val().freq;
    
   
    var firstTrain = moment(initialTrain, 'HH:mm');
    var currentTime = moment();

    var timeSinceFirst = currentTime.diff(firstTrain, 'minutes');
    var timeSinceLast = timeSinceFirst % freq;
    var timeAway = freq - timeSinceLast;

    var nextTrain = currentTime.add(timeAway, 'minutes');
    var formatNextTrain = nextTrain.format("HH:mm");
    
    freshTrains = $('#fresh-trains');
    var nameTable = $('<td>');
    var destTable = $('<td>');
    var nextTable = $('<td>');
    var freqTable = $('<td>');
    var awayTable = $('<td>');
    
    nameTable.append(nameTrain);
    destTable.append(destTrain);
    nextTable.append(formatNextTrain);
    freqTable.append(freq);
    awayTable.append(timeAway);
    
    
    
    
    $('#fresh-trains').append(nameTable, destTable, nextTable, freqTable, awayTable);
   
    
    

}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);

    
});



