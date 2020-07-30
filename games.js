alert("Raluca is in danger, she is too beautiful");
var gamePattern= [];
var userClickedPattern=[];
var started = false;
var buttonColours =["red","blue","green","yellow"];
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
function nextSequence(){
  userClickedPattern = []
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100)
  playSound(randomChosenColour);

  $("#level-title").text("Level "+level);
level++;
  }

  $(".btn").on("click", function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
  })

function playSound(name){
  var sound=new Audio("sounds/"+name+".mp3");
  sound.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
  $("#"+currentColour).removeClass("pressed");
  }, 100);
}
var level=0

function checkAnswer(currentLevel){
if (userClickedPattern[currentLevel]===gamePattern[currentLevel]){
  console.log("succes");
  if (userClickedPattern.length === gamePattern.length){


    setTimeout(function () {
      nextSequence();
    }, 1000);

  }
}
else{
  var fail=new Audio("sounds/wrong.mp3");
  fail.play();
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  startOver();
}
  }
function startOver(){
  level=0;
  gamePattern=[];
started=false;
}
