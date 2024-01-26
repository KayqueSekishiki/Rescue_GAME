function start() {
  $("#start").hide();

  $("#backgroundGame").append("<div id='player' class='anima1'></div>");
  $("#backgroundGame").append("<div id='enemy1' class='anima2'></div>");
  $("#backgroundGame").append("<div id='enemy2' ></div>");
  $("#backgroundGame").append("<div id='friend' class='anima3'></div>");

  const game = {
    timer: setInterval(loop, 30),
    keyPressed: [],
  };

  const KEYBINDS = {
    W: 87,
    S: 83,
    D: 68,
  };

  $(document).keydown(function (e) {
    game.keyPressed[e.which] = true;
  });

  $(document).keyup(function (e) {
    game.keyPressed[e.which] = false;
  });

  function loop() {
    moveBackground();
    movePlayer();
  }

  function moveBackground() {
    left = parseInt($("#backgroundGame").css("background-position"));
    $("#backgroundGame").css("background-position", left - 1);
  }

  function movePlayer() {
    if (game.keyPressed[KEYBINDS.W]) {
      let top = parseInt($("#player").css("top"));
      $("#player").css("top", top - 10);
    }

    if (game.keyPressed[KEYBINDS.S]) {
      let top = parseInt($("#player").css("top"));
      $("#player").css("top", top + 10);
    }

    if (game.keyPressed[KEYBINDS.D]) {
    }
  }
}
