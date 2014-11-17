var menu = (function() {
  var menu = {},
      instructions = {
        anchor: $("#instructionsLink"),
        anchorText: "Instructions",
        icon: $("#instructionsIcon"),
        bodyText: $("#instructionsText")
      },
      about = {
        anchor: $("#aboutLink"),
        anchorText: "About",
        icon: $("#aboutIcon"),
        bodyText: $("#aboutText")
      },
      logo = {
        icon: $("#logoIcon"),
        heading: $("#logoText")
      },
      overlay = {
        element: $("#overlay"),
        visible: false
      };

  var _iconFocus = function(icon) {
    if (overlay.visible === false) {
      icon.velocity("stop").velocity({fill : "#336699"});
    }
  };

  var _iconUnfocus = function(icon) {
    if (overlay.visible === false) {
      icon.velocity("stop").velocity({fill : "#FFF"});
    }
  };

  var _showOverlay = function(showSection, hideSection) {
    hideSection.anchor.velocity({opacity: 0});
    hideSection.icon.velocity({opacity: 0});

    logo.icon.velocity({opacity: 0});
    logo.heading.velocity({opacity: 0});

    overlay.element.velocity({opacity: 0.90}, {display: "block"});
    overlay.visible = true;

    showSection.anchor.velocity({color: "#FFF"}).text("Close");
    showSection.icon.velocity({fill: "#FFF"});
    showSection.bodyText.velocity({opacity: 1}, {display: "block"});
  };

  var _hideOverlay = function(showSection, hideSection) {
    showSection.bodyText.velocity({opacity: 0}, {display: "none"});
    showSection.anchor.velocity({color: "#336699"}).text(showSection.anchorText);

    overlay.element.velocity({opacity: 0}, {display: "none"});
    overlay.visible = false;

    logo.icon.velocity({opacity: 1});
    logo.heading.velocity({opacity: 1});

    hideSection.anchor.velocity({opacity: 1});
    hideSection.icon.velocity({opacity: 1});
  };

  menu.init = function() {
    instructions.anchor.hover(
      function() {
        _iconFocus(instructions.icon);
      },
      function() {
        _iconUnfocus(instructions.icon);
      }
    );

    instructions.anchor.click(function(event) {
      event.preventDefault();
      if(overlay.visible === false) {
        _showOverlay(instructions, about);
      }
      else {
        _hideOverlay(instructions, about);
      }
    });

    about.anchor.hover(
      function() {
        _iconFocus(about.icon);
      },
      function() {
        _iconUnfocus(about.icon);
      }
    );

    about.anchor.click(function(event) {
      event.preventDefault();
      if(overlay.visible === false) {
        _showOverlay(about, instructions);
      }
      else {
        _hideOverlay(about, instructions);
      }
    });
  };

  return menu;
}());
