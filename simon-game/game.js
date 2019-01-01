
var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern = [];
var started = false;
var level = 0;

//Add listener for key press
$(document).keypress(function() {
  if (!started) {
    startGame();
  }
});

function startGame(){
  started = true;
  nextSequence();


  $(".btn").click(function() {

    if(started){
      //GET the button pressed
      var userChosenColour = $(this).attr("id");

      //Save user selection in array
      userClickedPattern.push(userChosenColour);

      //efects
      playSound(userChosenColour);
      animatePress(userChosenColour);
      console.log("gamePattern: " + gamePattern);
      console.log("userPattern: " + userClickedPattern);

      checkAnswer();
    }
  });
}

function checkAnswer(){
  var lastIndex=userClickedPattern.length-1;
  if(userClickedPattern[lastIndex]==gamePattern[lastIndex]){

    console.log("success");

    if(lastIndex==gamePattern.length-1){
      setTimeout(function(){
        nextSequence();
      }, 1000);
      userClickedPattern=[]; //clear user clicked pattern
    }

  }else{
    console.log("wrong");
    resetGame();
    gameOver();

  }
}

function resetGame(){
  started = false;
  level=0;
  gamePattern=[];
  userClickedPattern = [];
}

function gameOver(){
  //play wrong sound
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();

  //play gameover animation
  $("body").addClass("game-over");

  setTimeout(function () {
    $("body").removeClass("game-over");
    location.reload();
  }, 2000);


  // $("#level-title").text("Game Over. Press a key to restart.");

}

function nextSequence() {
//update level
  level++;
  $("#level-title").text("Level " + level);

//generate random color
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  //Add random color to the game pattern
  gamePattern.push(randomChosenColour);

//BLink new random button and Play the corresponding sound
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
