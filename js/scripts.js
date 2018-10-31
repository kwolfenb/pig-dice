// Business Logic for Pig Dice

function Game () {
  this.players = [],
  this.playerTurn = 0,
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
Game.prototype.turn = function() {
  if (this.playerTurn === 0 ) {
    this.playerTurn = 1;
    return 0;
  }
  else if (this.playerTurn === 1) {
    this.playerTurn = 0;
    return 1;
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
function showPlayer(player1, player2) {
  $(".result-show").show();
  $(".outputName1").html(player1.name);
  $(".outputName2").html(player2.name);
}

function showPlayerScores() {
  $(".total-score1").html(newGame.players[0].currentScore);
  $(".total-score2").html(newGame.players[1].currentScore);
  $(".turn-score").html(turnScoreFunction(0));
}

var endTurn = function() {
  var turnCounter = newGame.turn();
  var activePlayer = newGame.players[turnCounter];
  activePlayer.totalScore(turnScore);
  turnScore = 0;
  if(activePlayer.currentScore > 20) {
    alert("congratulations " + activePlayer.name +"! You are the winner!")
  }
  if (turnCounter === 0) {
    $("#player1").css("color", "black");
    $("#player2").css("color", "red");

  } else if (turnCounter === 1) {
    $("#player1").css("color", "red");
    $("#player2").css("color", "black");

  }
};

$(document).ready(function() {
  $("form#dice").submit(function(event) {
    event.preventDefault();
    $("#player1").css("color", "red");
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
      $("#diceResult").html("<img src='img/" +diceRoll + ".png'>");
      $(".turn-score").html(turnScoreFunction(diceRoll));
    });

    $("#endTurn").click(function() {
      endTurn();
      showPlayerScores();

    });
  });
});
