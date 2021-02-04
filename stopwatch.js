$(function () {
  // variables

  var mode = 0; // app mode
  var timeCounter = 0; // time counter
  var lapCounter = 0; // lap counter
  var action; // variable for setInterval
  var lapNumber = 0; // Number of laps

  // minutes, seconds, centiseconds for time and lap
  var timeMinutes,
    timeSeconds,
    timeCentiseconds,
    lapMinutes,
    lapSeconds,
    lapCentiseconds;

  // on app load show start and lap buttons
  hideshowButtons("#startButton", "#lapButton");

  // click on startButton
  $("#startButton").click(function () {
    // mode on
    mode = 1;
    // show stop and lap buttons
    hideshowButtons("#stopButton", "#lapButton");
    // start counter
    startAction();
  });

  // click on stopButton
  $("#stopButton").click(function () {
    // show resume and reset buttons
    hideshowButtons("#resumeButton", "#resetButton");
    // stop counter
    clearInterval(action);
  });

  // click on resumeButton
  $("#resumeButton").click(function () {
    // show stop and lap buttons
    hideshowButtons("#stopButton", "#lapButton");
    // start action
    startAction();
  });

  // click on resetButton
  $("#resetButton").click(function () {
    // reload the page
    location.reload();
  });

  // click on lapButton
  $("#lapButton").click(function () {
    // if mode is ON
    if (mode) {
      // stop action
      clearInterval(action);
      // resetLap and print lap details
      lapCounter = 0;
      addLap();
      // start action
      startAction();
    }
  });

  // FUNCTIONS

  //   shows two  buttons
  function hideshowButtons(x, y) {
    $(".control").hide();
    $(x).show();
    $(y).show();
  }

  //   updateTime function converts counters to minutes, seconds, and centiseconds
  function updateTime() {
    //   1min = 60*100 centiseconds = 6000 centiseconds
    timeMinutes = Math.floor(timeCounter / 6000);
    // 1sec =100 centiseconds
    timeSeconds = Math.floor((timeCounter % 6000) / 100);
    timeCentiseconds = (timeCounter % 6000) % 100;

    $("#timeminute").text(format(timeMinutes));
    $("#timesecond").text(format(timeSeconds));
    $("#timecentisecond").text(format(timeCentiseconds));

    //   1min = 60*100 centiseconds = 6000 centiseconds
    lapMinutes = Math.floor(lapCounter / 6000);
    // 1sec =100 centiseconds
    lapSeconds = Math.floor((lapCounter % 6000) / 100);

    lapCentiseconds = (lapCounter % 6000) % 100;

    $("#lapminute").text(format(lapMinutes));
    $("#lapsecond").text(format(lapSeconds));
    $("#lapcentisecond").text(format(lapCentiseconds));
  }

  //   starts the counter
  function startAction() {
    action = setInterval(function () {
      timeCounter++;
      if (timeCounter == 200 * 60 * 100) {
        timeCounter = 0;
      }
      lapCounter++;
      if (lapCounter == 200 * 60 * 100) {
        lapCounter = 0;
      }
      updateTime();
    }, 10);
  }

  //   format numbers
  function format(number) {
    if (number < 10) {
      return "0" + number;
    } else {
      return number;
    }
  }

  //   addLap function: print lap details inside the lap box
  function addLap() {
    lapNumber++;
    var myLapDetails =
      "<div class='lap'>" +
      "<div class='laptimeTitle'>" +
      "Lap" +
      lapNumber +
      "</div>" +
      "<div class='laptime'>" +
      "<span>" +
      format(lapMinutes) +
      "</span>" +
      ":<span>" +
      format(lapSeconds) +
      "</span>" +
      ":<span>" +
      format(lapCentiseconds) +
      "</span>" +
      "</div>" +
      "</div>";
    $(myLapDetails).appendTo("#laps");
  }
});
