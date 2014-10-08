var puzzle = (function(win, $) {
  var puzzle = {};

  var words = [
    "TRANSMISSION CONTROL PROTOCOL",
    "FILE TRANSFER PROTOCOL",
    "HYPERTEXT MARKUP LANGUAGE",
    "EXTENSIBLE MARKUP LANGUAGE",
    "CASCADING STYLE SHEETS",
    "HYPERTEXT TRANSFER PROTOCOL",
    "DOCUMENT OBJECT MODEL",
    "JAVASCRIPT OBJECT NOTATION",
    "SCALABLE VECTOR GRAPHICS",
    "UNIFORM RESOURCE LOCATOR",
    "SECURE SOCKETS LAYER",
    "DOMAIN NAME SYSTEM",
    "REPRESENTATIONAL STATE TRANSFER",
    "SIMPLE OBJECT ACCESS PROTOCOL",
    "SIMPLE MAIL TRANSFER PROTOCOL",
    "STRUCTURED QUERY LANGUAGE",
    "WORLD WIDE WEB",
    "SECURE SHELL"
  ];

  var solution = "";
  var currentAnswer = "";

  var _random = function (n) {
    return Math.floor(Math.random() * n);
  };

  var _pickWord = function () {
    var index = _random(words.length);
    var currentWord = words[index];

    return currentWord;
  };

  var _initCurrent = function () {
    var solutionLength = solution.length,
        str = "";

    for (var i = 0; i < solutionLength; i++) {
      if (solution.charAt(i) >= "A" && solution.charAt(i) <= "Z") {
        str += "_";
      } else {
        str += solution.charAt(i);
      }
    }

    return str;
  };

  puzzle.removeCurrentWord = function() {
    for (var i = 0; i < words.length; i++) {
      if (solution === words[i]) {
        words.splice(i, 1);
      }
    }
  };

  puzzle.inSolution = function (ltr) {
    if (solution.indexOf(ltr) > -1) {
      return true;
    }
    else {
      return false;
    }
  };

  puzzle.setCurrent = function (ltr) {
    var solutionLength = solution.length;

    for (var i = 0; i < solutionLength; i++) {
      if (ltr === solution.charAt(i)) {
        currentAnswer = currentAnswer.substring(0,i) + ltr + currentAnswer.substring(i + 1);
      }
    }
  };

  puzzle.newPuzzle = function () {
    solution = _pickWord();
    currentAnswer = _initCurrent();
  };

  puzzle.isWon = function () {
    return solution === currentAnswer;
  };

  puzzle.getSolution = function () {
    return solution;
  };

  puzzle.getCurrent = function () {
    return currentAnswer;
  }

  puzzle.getRemainingWords = function () {
    return words.length;
  }

  return puzzle;
}(window, jQuery));
