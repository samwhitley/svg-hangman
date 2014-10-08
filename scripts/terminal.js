var terminal = (function (win, doc, $) {

  var terminal = {},
      cursor, // jQuery object for the active cursor
      body = $("body"),
      active = null, // holds the blink event
      scrollPaneAPI, // contains methods for the scroll pane plugin
      throttleTimeout;

  var _blink = function () {
    cursor.toggleClass("hide");
  };

  var _readKey = function (e) {
    var code,
        charStr = "";

    e.preventDefault();

    if (e.keyCode == 0) {
      code = e.which;
    } else {
      code = e.keyCode;
    }

    charStr = String.fromCharCode(code);
    _printChar(charStr);
    $(doc).trigger("characterEntered", charStr);
  };

  var _printChar = function (charStr) {
    var currentTextEntry = cursor.prev(".textEntry"),
        currentTextStr = currentTextEntry.text();

    currentTextStr += charStr;
    currentTextEntry.html(currentTextStr);
  };

  terminal.toggleFocus = function (isActive) {
    if (isActive) {
      this.printMessage("<p><span class='lineStart'>&gt;&nbsp;</span><span class='textEntry'></span><span id='cursor'>&#9608;</span></p>");
      cursor = $("#cursor");
      active = win.setInterval(_blink, 750);
      body.on("keypress", _readKey);
    }
    else {
      win.clearInterval(active);
      body.off("keypress");

      cursor.remove();
      active = null;
    }
  };

  terminal.printMessage = function (htmlString) {
    $(".terminalText .jspPane").append(htmlString);
    scrollPaneAPI.reinitialise();
    scrollPaneAPI.scrollTo(0, scrollPaneAPI.getContentHeight());
  };

  terminal.init = function() {
    var terminalText = $(".terminalText");
    terminalText.jScrollPane({
      animateScroll: true,
      showArrows: $(this).is('.arrow'),
      animateDuration: 500
    });
    scrollPaneAPI = terminalText.data('jsp');
    $(window).bind(
      'resize',
      function() {
        // IE fires multiple resize events while you are dragging the browser window which
        // causes it to crash if you try to update the scrollpane on every one. So we need
        // to throttle it to fire a maximum of once every 50 milliseconds...
        if (!throttleTimeout) {
          throttleTimeout = setTimeout(
            function() {
              scrollPaneAPI.reinitialise();
              scrollPaneAPI.scrollTo(0, scrollPaneAPI.getContentHeight());
              throttleTimeout = null;
            },
            50
          );
        }
      }
    );
  };

  return terminal;

}(window, document, jQuery));
