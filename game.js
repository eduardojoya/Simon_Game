var buttonColors = ["red", "blue", "green", "yellow"]; //Array for Colors

var gamePattern = []; //array for Game Pattern
var userClickedPattern = []; //Empty array for Clicked Pattern

var gameStarted = false; //to track if game has started

var level = 0; //start level at 0

//Detect if keyboard key has been pressed, when that happens call nextSequence() to start the game;
$(document).keypress(function() {
  if (!gameStarted) {
    //if game has started //
    $("#level-title").text("Level " + level); //When game has started, changed h1 to say Level 0
    nextSequence();
    gameStarted = true;
  }
});

//Handler function when buttons are clicked
$(".btn").click(function() {
  var userChosenColor = this.id; //whichever button the user clicks on
  // var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  //Call  checkAnswer after user has clicked their answer by passing index of
  checkAnswer(userClickedPattern.length - 1); //last answer in users sequence (checks for last color added to User's array)
});

//Check User's Answers with Game's Sequence
function checkAnswer(currentLevel) {
  //Check if most recent answer matches the gamePattern
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Winner!");

    //If user's asnwer is right, then check that user has finished new sequence
    if (userClickedPattern.length === gamePattern.length) {
      //timeout for nextSequence() with 1000 millisecond delay
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Boo, you got it wrong!");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("YOU MESSED UP! Press any Key to try again");

    Reset();
  }
}

//nextSequence function
function nextSequence() {
  userClickedPattern = []; //reset User's array with each level increase;

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4); //generates random number from 1-3
  var randomChosenColor = buttonColors[randomNumber]; //Choose a random color from the buttonColors array
  gamePattern.push(randomChosenColor); //push the color into gamePattern array

  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100); //randoom button animates
  playSound(randomChosenColor);
}

//Play Sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Add animations to User Clicks
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//Reset function
function Reset() {
  console.log("Begin Again!");
  gameStarted = false;
  level = 0;
  gamePattern = [];
}
