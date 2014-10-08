var controller = (function(win, doc, $, puzzle, terminal, gameScreen) {

  var controller = {};
  var guesses = 5;
  var availableLetters = "";
  var gameOver = false;

  var _printStatus = function() {
    terminal.printMessage("<p class='infoMessage'>Current word:</p>");
    terminal.printMessage("<p class='currentAnswer'>" + puzzle.getCurrent() + "</p>");
    terminal.printMessage("<p class='infoMessage'>Remaining letters:</p>");
    terminal.printMessage("<p>" + availableLetters + "</p>");
  };

  var _printAnswer = function() {
    terminal.printMessage("<p>ANSWER: " + puzzle.getSolution() + "</p>");
  };

  var _setPlayAgainState = function() {
    terminal.printMessage("<p>Play again? Y/N</p>");
    terminal.toggleFocus(true);
  };

  var _setResumeState = function() {
    _printStatus();
    terminal.toggleFocus(true);
  };

  var _handleVictory = function() {
    terminal.printMessage("<p class='goodMessage'>Congratulations! You won the game.</p>");
    _printAnswer();
    gameOver = true;
    puzzle.removeCurrentWord();
    if (puzzle.getRemainingWords() > 0) {
      _setPlayAgainState();
    }
    else {
      terminal.printMessage("<p class='goodMessage'>You solved all of the puzzles. Thanks for playing!</p>");
    }
  };

  var _handleGameOver = function() {
    terminal.printMessage("<p class='badMessage'>You lost the game!</p>");
    _printAnswer();
    gameOver = true;
    _setPlayAgainState();
  };

  var _victoryBranch = function() {
    if (puzzle.isWon()) {
      _handleVictory();
    } // Game continues
    else {
      _setResumeState();
    }
  };

  var _handleCorrectAnswer = function() {
    terminal.printMessage("<p class='goodMessage'>Good job! That letter is in the word.</p>");

    win.setTimeout(_victoryBranch, 1500);
  };

  var _handleWrongAnswer = function() {
    terminal.printMessage("<p class='badMessage'>That letter is not in the answer.</p>");

    if (guesses === 0) { // The game is over because no more guesses remain
      win.setTimeout(gameScreen.gameOver, 1500);
    }
    else { // Guesses are left, so the game continues
      gameScreen.showWarning();
    }
  };

  var _updateAvailableLetters = function(ltr) {
    ltr += " "; // Adding trailing space for the string lookup

    var ltrIndex = availableLetters.indexOf(ltr);

    availableLetters = availableLetters.substring(0,ltrIndex) + availableLetters.substring(ltrIndex + 1);
  };

  var _scoreLetter = function(e, ltr) {
    var message = "";
    ltr = ltr.toUpperCase();
    terminal.toggleFocus(false);

    if (gameOver) {
      if (ltr === "Y") {
        controller.startGame();
      }
      else if (ltr === "N") {
        message = "<p>Well, your browser's address bar and back button should still be working. Thanks for playing!</p>";
        terminal.printMessage(message);
      }
      else {
        message = "<p>Only 'Y' or 'N' are valid responses.</p>";
        terminal.printMessage(message);
        _setPlayAgainState();
      }
    }
    else {
      if (ltr >= "A" && ltr <= "Z") { // user has entered a letter
        if (availableLetters.indexOf(ltr) > -1) { // letter has not been used before
          _updateAvailableLetters(ltr);

          if (puzzle.inSolution(ltr)) { // letter is correct
            puzzle.setCurrent(ltr);
            gameScreen.flashGood();
          }
          else {
            guesses--;
            gameScreen.flashBad();
          }
        }
        else { // User has already guessed the letter
          message = "<p>" + ltr + " has already been guessed.</p>";
          terminal.printMessage(message);
          win.setTimeout(_setResumeState, 1500);
        }
      }
      else { // User has entered a non letter character
        message = "<p>This terminal only accepts letters.</p>";
        terminal.printMessage(message);
        win.setTimeout(_setResumeState, 1500);
      }
    }
  };

  controller.init = function() {
    $(doc).on("characterEntered", _scoreLetter);
    $(doc).on("warningComplete", _setResumeState);
    $(doc).on("gameOverComplete", _handleGameOver);
    $(doc).on("correctComplete", _handleCorrectAnswer);
    $(doc).on("wrongComplete", _handleWrongAnswer);
    this.startGame();
  };

  controller.startGame = function() {
    gameScreen.reset();
    gameScreen.init();
    gameOver = false;
    puzzle.newPuzzle();
    availableLetters = "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z ";
    _printStatus();
    terminal.toggleFocus(true);
    guesses = 6;
  };

  return controller;
}(window, document, jQuery, puzzle, terminal, gameScreen));
