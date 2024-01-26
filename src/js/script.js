function start() {
  $("#start").hide();

  $("#backgroundGame").append("<div id='player' class='anima1'></div>");
  $("#backgroundGame").append("<div id='enemy1' class='anima2'></div>");
  $("#backgroundGame").append("<div id='enemy2' ></div>");
  $("#backgroundGame").append("<div id='ally' class='anima3'></div>");

  const game = {
    timer: setInterval(loop, 30),
    keyPressed: [],
  };

  const KEYBINDS = {
    W: 87,
    S: 83,
    D: 68,
  };

  const enemyVelocity = 5;
  let canShoot = true;
  let enemyPosY = parseInt(Math.random() * 334);

  $(document).keydown(function (e) {
    game.keyPressed[e.which] = true;
  });

  $(document).keyup(function (e) {
    game.keyPressed[e.which] = false;
  });

  function loop() {
    moveBackground();
    movePlayer();
    moveEnemy1();
    moveEnemy2();
    moveAlly();
  }

  function moveBackground() {
    left = parseInt($("#backgroundGame").css("background-position"));
    $("#backgroundGame").css("background-position", left - 1);
  }

  function movePlayer() {
    if (game.keyPressed[KEYBINDS.W]) {
      let top = parseInt($("#player").css("top"));
      $("#player").css("top", top - 10);

      if (top <= 0) {
        $("#player").css("top", top + 10);
      }
    }

    if (game.keyPressed[KEYBINDS.S]) {
      let top = parseInt($("#player").css("top"));
      $("#player").css("top", top + 10);
      if (top >= 434) {
        $("#player").css("top", top - 10);
      }
    }

    if (game.keyPressed[KEYBINDS.D]) {
      shooting();
    }
  }

  function moveEnemy1() {
    posX = parseInt($("#enemy1").css("left"));
    $("#enemy1").css("left", posX - enemyVelocity);
    $("#enemy1").css("top", enemyPosY);

    if (posX <= 0) {
      enemyPosY = parseInt(Math.random() * 334);
      $("#enemy1").css("left", 694);
      $("#enemy1").css("top", enemyPosY);
    }
  }

  function moveEnemy2() {
    posX = parseInt($("#enemy2").css("left"));
    $("#enemy2").css("left", posX - 3);

    if (posX <= 0) {
      $("#enemy2").css("left", 775);
    }
  }

  function moveAlly() {
    posX = parseInt($("#ally").css("left"));
    $("#ally").css("left", posX + 1);

    if (posX > 906) {
      $("#ally").css("left", 0);
    }
  }

  function shooting() {
    debugger;
    if (canShoot == true) {
      canShoot = false;

      posY = parseInt($("#player").css("top"));
      posX = parseInt($("#player").css("left"));
      shootX = posX + 190;
      shootY = posY + 37;
      $("#backgroundGame").append("<div id='shooting'></div");
      $("#shooting").css("top", shootY);
      $("#shooting").css("left", shootX);

      var timeShooting = window.setInterval(executeShoot, 30);
    }

    function executeShoot() {
      posX = parseInt($("#shooting").css("left"));
      $("#shooting").css("left", posX + 15);

      if (posX > 900) {
        window.clearInterval(timeShooting);
        timeShooting = null;
        $("#shooting").remove();
        canShoot = true;
      }
    }
  }
}
