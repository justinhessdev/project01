// represent a player
var player=[{symbol: '1', score: '0'},
            {symbol: '2', score: '0'}];

// represents which player has turn
var currentPlayerIndex = 0;

// represents our 9 tiles
var $tiles = $('.tiles');

// array containing each letter of alphabet
var letterArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

// represents the area where clicked letters appear on board
var $clickedWord = $('#clickedWord');

// represents the countdown timer contained in the word container
var $countdownTimer = $('#countdownTimer');

// global variable to keep track of interval and stop timer at 0
var $myInterval;

// keeps track of red tiles and stops interval when completeß
var $redInterval;

// fill each tile a random letter from the alphabet
function fillTileWithRandomLetter() {
  for(var i=0; i<$('.tile').length; i++){
      $('.tile')[i].innerHTML = letterArr[Math.floor(Math.random()*letterArr.length)];
  }
}

// on click add letter to word div
// make tile change color to symbolize clicked
function tileLogic() {
  if($(this).hasClass('selectedTile')){
    var currentWord = $clickedWord.text();
    var newWord = currentWord.replace($(this).text(), '');
    $clickedWord.text(newWord);
  } else {
    $clickedWord.text($clickedWord.text() + $(this).text());
  }

    $(this).toggleClass('selectedTile');

}

function wordLogic() {
  if (words.indexOf($clickedWord.text()) >= 0){
    $('#playerOneBoard').append('<div class="addedWordClass"><p class="addedWordP">' + $clickedWord.text() + '</p></div>');
    $clickedWord.text("");
    $('.selectedTile').slideUp("fast", repopulateLogic);
  } else {
    $clickedWord.text("");
    $('.selectedTile').addClass("redTile");
    $redInterval = setInterval(removeRed, 1000);
    
  }
}

function removeRed() {
  var $selectedTiles = $('.selectedTile');
  $selectedTiles.removeClass("redTile");
  $selectedTiles.removeClass("selectedTile");
  clearInterval($redInterval);
}

function startLogic() {
  $('#navBar').slideUp("fast", showTimer);
}

function showTimer() {
  $('#countdownTimer').slideDown("fast", startInterval);
}

function repopulateLogic() {
  var $selectedTiles = $('.selectedTile');
  $selectedTiles.slideDown("fast");
  $selectedTiles.removeClass("selectedTile");
}

function startInterval() {
  $myInterval = setInterval(startTimer, 1000);
}

function startTimer() {
  var $countdownTimer = $('#countdownTimer');
  $countdownTimer.text($countdownTimer.text()-1);

  if($countdownTimer.text() === "0"){
    clearInterval($myInterval);
    currentPlayerIndex = 1;
  }

}

/*
 * IMPLEMENTING FUNCTIONS
 */

$('#countdownTimer').hide();
$('.tile').on('click', tileLogic);
$('#enterButton').on('click', wordLogic);
$('#startButton').on('click', startLogic);
fillTileWithRandomLetter();
