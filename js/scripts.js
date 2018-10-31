// Business Logic for Pig Dice

function Game () {
  this.players = [],
  this.playerTurn = 1,
  this.playerNumbers = 0
}
Game.prototype.addPlayer = function(player) {
  player.id = this.assignId();
  this.players.push(player);
  }

Game.prototype.assignId = function() {
  this.playerNumbers += 1;
  return this.playerNumbers;
}
Game.prototype.turn = function(currentPlayer) {
  if (currentPlayer === 1 ) {
   this.playerTurn = 2;
   return 1;
 }
   else if (currentPlayer === 2) {
    this.playerTurn = 1;
    return 2;
  }
}
function Player (name, currentScore, turn, id) {
  this.name = name,
  this.currentScore = currentScore,
  this.turn = turn,
  this.id = id
}
var diceResult = function(num) {
  var dice = Math.floor(Math.random() * num) +1;
  return dice;
  }

var turnScoreFunction = function(dice) {
  if (dice === 1) {
    return turnScore = 0;
  } else {
      return turnScore = turnScore + dice;
  }
}
Player.prototype.totalScore = function(turnScore) {
   return this.currentScore += turnScore;
}
// User Interface
var newGame = new Game()
var turnScore = 0;
var currentPlayer = 1;
function showPlayer(player1, player2) {
 $(".result-show").show();
 $(".outputName1").html(player1.name);
 $(".totalScore").html(player1.totalScore);
 $(".outputName2").html(player2.name);
 $(".totalScore").html(player2.totalScore);
}

var endTurn = function() {
    var player1 = newGame.players[0];
    var playingPlayer = newGame.turn(currentPlayer);
    console.log(playingPlayer)
    player1.totalScore(turnScore);
    console.log(player1.currentScore);
};

$(document).ready(function() {
  $("form#dice").submit(function(event) {
    event.preventDefault();
    var inputtedName1 = $("input#name1").val();
    var inputtedName2 = $("input#name2").val();
    $("input#name1").val("");
    $("input#name2").val("");
    var player1 = new Player(inputtedName1, 0)
    var player2 = new Player(inputtedName2, 0)
    newGame.addPlayer(player1);
    newGame.addPlayer(player2);
    showPlayer(player1, player2);

//Dice Roll
    $("#diceRoller").click(function() {
      var diceRoll = diceResult(6);
      $("#diceResult").html(diceRoll);
      $(".turn-score").html(turnScoreFunction(diceRoll));
    });

    $("#endTurn").click(function() {
      endTurn();
    });
});
});
