var gameScreen = (function(doc) {

  var gameScreen = {},
      floatGroup = $("#floatGroup"), // group of the iceberg and penguins
      water = $("#water"),
      orca = $("#orca"),
      leftFin = $("#leftFin"),
      rightFin = $("#rightFin"),
      background = $("#gameScreen"),
      iceberg = $("#iceberg"),
      screenFlash = $("#screenFlash");

  var orcaProps = { // holds the state of the fin animation
    exitedRight : false, // true if the last fin animation ended on the right side
    animating : false, // true if animations are running
    jawsAttack : false // false if the orca head has surfaced
  };

  var icebergProps = { // holds state of the iceberg sink animation
    sinkDistance : 30, // distance to sink the iceberg
    sinkCount : 0 // number of times the iceberg has been sunk
  };

  var _flashScreen = function(hexString, eventString) {
    screenFlash.velocity({backgroundColor: hexString, opacity: 0.30}, {duration: 500})
      .velocity({opacity: 0}, { duration: 500, complete: function() { $(doc).trigger(eventString); }});
  };

  var _orcaFin = function() {
    if (orcaProps.animating === false) {
      orcaProps.animating = true;
      if (orcaProps.exitedRight === true) {
        rightFin.velocity({translateY: "-=250", translateX: "-=400"},{duration: 900, easing: "linear"})
          .velocity({translateY: "+=75", translateX: "-=650"},{duration: 1350, easing: "linear"})
          .velocity(
            {
              translateY: "+=175",
              translateX: "-=400"
            },
            {
              duration: 1000,
              easing: "linear",
              complete: function () {
                orcaProps.exitedRight = false;
                orcaProps.animating = false;
                rightFin.velocity({translateX: "+=1450"}); // return to origin
                $(doc).trigger("orcaFinComplete");
              }
            }
          );
      }
      else { // Send fin from left
        leftFin.velocity({translateY: "-=250", translateX: "+=400"},{duration: 900, easing: "linear"})
         .velocity({translateY: "+=75", translateX: "+=650"},{duration: 1350, easing: "linear"})
         .velocity(
          {
            translateY: "+=175",
            translateX: "+=400"
          },
          {
            duration: 1000,
            easing: "linear",
            complete: function() {
              orcaProps.exitedRight = true;
              orcaProps.animating = false;
              leftFin.velocity({translateX: "-=1450"});
              $(doc).trigger("orcaFinComplete");
            }
          }
        );
      }
    }
  };

  var _startIcebergBob = function() {
    floatGroup.velocity(
      {
        translateY: "+=10"
      },
      {
        loop: true,
        duration: 1000
      }
    );
  };

  var _startWaterMotion = function() {
    water.velocity({height: "+=1%"}, {loop: true, duration: 1000});
  };

  gameScreen.flashGood = function() {
    _flashScreen("#98fc66", "correctComplete");
  };

  gameScreen.flashBad = function() {
    _flashScreen("#fd3301", "wrongComplete");
  };

  gameScreen.init = function() {
    _startWaterMotion();
    _startIcebergBob();
    screenFlash.velocity({opacity: 0});
  };

  gameScreen.showWarning = function() {
    var translateYString = "+=" + icebergProps.sinkDistance;
    icebergProps.sinkCount++;

    floatGroup.velocity("stop", true).velocity("reverse");

    floatGroup.velocity(
      {
        translateY: translateYString
      },
      {
        duration: 1000,
        complete: function() {
          _startIcebergBob();
          _orcaFin();
          $(doc).trigger("warningComplete");
        }
      }
    );
  };

  gameScreen.reset = function() {
    var resetIcebergDist = parseInt(icebergProps.sinkCount, 10) * parseInt(icebergProps.sinkDistance, 10),
        resetIcebergStr = "-=" + resetIcebergDist;


    if (orcaProps.jawsAttack) { // Only lower the orca if the head is above water
      orca.velocity({translateY: "+=475"}, {duration: 500});
    }
    water.velocity(
      {
        backgroundColor: "#336699",
        height: "39%"
      },
      {
        duration: 500
      }
    );
    iceberg.velocity({fill: "#dcd6fc"},{duration: 500});
    background.velocity({backgroundColor: "#aaccee"},{duration: 500});
    floatGroup.velocity(
      {
        translateY : 0,
        duration: 500,
        complete: function() {
          _startWaterMotion();
          _startIcebergBob();
        }
      }
    );
    icebergProps.sinkCount = 0;
    orcaProps.jawsAttack = false;
  };

  gameScreen.gameOver = function() {
    $(doc).off("orcaFinComplete");
    if (orcaProps.animating === true) { // If the fin is still animating, call this function again when it ends
      $(doc).on("orcaFinComplete", gameScreen.gameOver);
    }
    else {
      floatGroup.velocity("stop", true).velocity("reverse");
      water.velocity("stop", true);
      orca.velocity(
        {
          translateY: "-=475"
        },
        {
          duration: 500,
          easing: 'linear',
          complete: function() {
            background.velocity({backgroundColor: "#980101"},{duration: 1500, queue: false});
            iceberg.velocity({fill: "#336699"},{duration: 1500, queue: false});
            water.velocity(
              {
                backgroundColor: "#002b3d"
              },
              {
                duration: 1500,
                queue: false,
                complete: function() {
                  orcaProps.jawsAttack = true;
                  $(doc).trigger("gameOverComplete");
                }
              }
            );
          }
        }
      );
    }
  };

  return gameScreen;
}(document));
