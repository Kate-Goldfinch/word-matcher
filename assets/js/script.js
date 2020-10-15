var gameOver = false;
var player1Turn = true;
var p1Score = 0;
var p2Score = 0;
var p1Name = "Player 1";
var p2Name = "Player 2";


var topRow;
var middleRow;
var bottomRow;
var leftColumn;
var middleColumn;
var rightColumn;
var diagRight;
var diagLeft;
var winStates;

$("#p1Name").change(function () {
  p1Name = $(this).val();
})

$("#p2Name").change(function () {
  p2Name = $(this).val();
})

$(".tile").on("click", (function() {
if (!gameOver) {
  if (!$(this).hasClass("active")) {
    if (player1Turn) {
      $(this).text("X");
      }
    else {
      $(this).text("O");
      }
    $(this).addClass("active");
  }
  updateBoard();
  checkWin();
  player1Turn = !player1Turn;
  }
}));

var el;

function checkWin() {
  $(winStates).each(function(index, element){
     el = element;
    if(element.every( (val, i, arr) => val === arr[0])&&element[0]!=="") {
      gameOver = true;
      $('hr').addClass("index"+index);
      }
    })
    onWin();
}

function onWin() {
  if (gameOver) {
    if (player1Turn) {
      $("#msg").text(p1Name + " Wins!");
      p1Score++;
      $("#p1Score").text(p1Score);
    }
    else {
      $("#msg").text(p2Name + " Wins!");
      p2Score++;
      $("#p2Score").text(p2Score);
    }
  }
}

function updateBoard() {
     topRow = $(".tile:nth-of-type(-n+3)").map(getValues).get();
     middleRow = $(".tile:nth-of-type(-n+6):not(:nth-of-type(-n+3))").map(getValues).get();
     bottomRow = $(".tile:nth-last-of-type(-n+3)").map(getValues).get();
     leftColumn = $(".tile:nth-of-type(3n+1)").map(getValues).get();
     middleColumn = $(".tile:nth-of-type(3n+2)").map(getValues).get();
     rightColumn = $(".tile:nth-of-type(3n+3").map(getValues).get();
     diagRight = $(".tile:nth-of-type(4n+1").map(getValues).get();
     diagLeft = $(".tile:nth-of-type(2n+3):not(:last-of-type)").map(getValues).get();
     winStates = [topRow, middleRow, bottomRow, leftColumn, middleColumn, rightColumn, diagRight, diagLeft];
}

function getValues() {
  return $(this).text();
}

$("#reset").on("click",function() {
  $(".tile").text("");
  $(".tile").removeClass("active");
  $("hr").removeClass();
  gameOver = false;
  $("#msg").text("");
});
