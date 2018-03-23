var ceil = document.getElementsByClassName("game-item");
var reset = document.getElementById("reset-game");
var message = document.getElementById("message");
var winCombinations = [
    [1, 2, 3],
    [1, 4, 7],
    [1, 5, 9],
    [2, 5, 8],
    [3, 6, 9],
    [3, 5, 7],
    [4, 5, 6],
    [7, 8, 9]
  ];

if (location.hash == '') {
  var data = {X : [], O : [], step : 0, player : "X"};
} else {
  var data = JSON.parse(decodeURI(location.hash.substring(1)));
}

for (var i = 0; i < ceil.length; i++) {
  num = +ceil[i].getAttribute("data-ceil");
  if (data.X.includes(num)) {
    ceil[i].classList.add("x");
    ceil[i].innerText = "X";
  } else if (data.O.includes(num)) {
    ceil[i].classList.add("o");
    ceil[i].innerText = "O";
  } else {
    ceil[i].addEventListener("click", currentStep);
  }
}

function currentStep() {
  var num = +this.getAttribute("data-ceil");
  if (!this.textContent) {
    this.innerText = data.player;
    data.step++;
    data.player === "X" ? data.X.push(num) && this.classList.add("x") : data.O.push(num) && this.classList.add("o");
    if ((data.O.length > 2 || data.X.length > 2) && (checkWin(data.O, num) || checkWin(data.X, num))) {
      for (var i = 0; i < ceil.length; i++) {
        ceil[i].removeEventListener("click", currentStep);
      }
      return (message.innerText = "Победил игрок " + data.player + ", Всего ходов " + data.step);
    }
    changePlayer();
    data.step === 9 ? (message.innerText = "Ничья, Всего ходов " + data.step) : (message.innerText = "Ходит игрок " + data.player);
    location.hash = JSON.stringify(data);
  }
   
}

function changePlayer() {
  data.player === "X" ? (data.player = "O") : (data.player = "X");
}

reset.addEventListener("click", function() {
  for (var i = 0; i < ceil.length; i++) {
    ceil[i].innerText = "";
  }
  data.O = [];
  data.X = [];
  changePlayer();
  data.step = 0;
  location.hash = JSON.stringify(data);
  message.innerText = "Ходит игрок " + data.player;
  for (var i = 0; i < ceil.length; i++) {
    ceil[i].addEventListener("click", currentStep);
    ceil[i].classList.remove("x", "o");
  }
});

function checkWin(arr, number) {
  for (var w = 0, wLen = winCombinations.length; w < wLen; w++) {
    var someWinArr = winCombinations[w],
      count = 0;
    if (someWinArr.indexOf(number) !== -1) {
      for (var k = 0, kLen = someWinArr.length; k < kLen; k++) {
        if (arr.indexOf(someWinArr[k]) !== -1) {
          count++;
          if (count === 3) {
            return true;
          }
        }
      }
      count = 0;
    }
  }
}
