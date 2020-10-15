let unscrambleBtn = document.querySelector("#unscramble");
let missingBtn = document.querySelector("#missing");
let input = document.querySelector("#input");

var string;
var str;
var active = false;
var wordList;
var result = [];

$.getJSON("index.json", function(json) {
  wordList = json; // this will show the info it in firebug console
});

function replaceBlanks(arr, val) {
  var input = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === val) {
      input.push("[a-z]");
    } else {
      input.push(arr[i]);
    }
  }
  var output = input.join("");
  return output;
}

input.addEventListener("focus", function() {
  clear();
});

unscrambleBtn.addEventListener("click", function() {
  string = input.value.toLowerCase();
  unscrambleWord();
});

missingBtn.addEventListener("click", function() {
  string = input.value.toLowerCase();
  str = replaceBlanks(string, "_");
  missingWord();
});

input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    string = input.value.toLowerCase();
    str = replaceBlanks(string, "_");
    if (string.includes("_")) {
      missingWord();
    } else {
      unscrambleWord();
    }
  }
});

function missingWord() {
  if (!active) {
    missingBtn.classList.add("active");
    unscrambleBtn.classList.add("inactive");
    var regex = new RegExp("" + str + "");
    for (var i = 0; i < wordList.length; i++) {
      if (regex.test(wordList[i]) && wordList[i].length === string.length) {
        result.push(wordList[i]);
      }
    }
    writeResults();
  }
}

function unscrambleWord(params) {
  if (!active) {
    unscrambleBtn.classList.add("active");
    missingBtn.classList.add("inactive");
    strArr = Array.from(string).sort();
    for (var i = 0; i < wordList.length; i++) {
      var sortAnswer = Array.from(wordList[i]).sort();
      if (sortAnswer.join("") === strArr.join("")) {
        result.push(wordList[i]);
      }
    }
    writeResults();
  }
}
function writeResults() {
  document.getElementById("content").classList.add("active");
  let ul = document.createElement("ul");
  if (result.length === 0) {
    document.getElementById("message").innerHTML = "No results found";
  } else {
    document.querySelector("#content").appendChild(ul);
    result.forEach(function(item) {
      let li = document.createElement("li");
      ul.appendChild(li);
      li.innerHTML += item;
    });
  }
  active = true;
}

function clear() {
  if (active) {
    result = [];
    $("ul").remove();
    document.getElementById("message").innerHTML = "";
    unscrambleBtn.classList.remove("active", "inactive");
    missingBtn.classList.remove("active", "inactive");
    input.value = "";
  }
  active = false;
}
