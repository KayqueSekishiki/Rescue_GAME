function start() {
  $("#start").hide();

  $("#backgroundGame").append("<div id='player' class='anima1'></div>");
  $("#backgroundGame").append("<div id='enemy1' class='anima2'></div>");
  $("#backgroundGame").append("<div id='enemy2' ></div>");
  $("#backgroundGame").append("<div id='ally' class='anima3'></div>");
  $("#backgroundGame").append("<div id='score'></div>");
  $("#backgroundGame").append("<div id='energy'></div>");

  const game = {
    timer: setInterval(loop, 30),
    keyPressed: [],
  };

  const KEYBINDS = {
    W: 87,
    S: 83,
    D: 68,
  };

  let enemyVelocity = 5;
  let canShoot = true;
  let enemyPosY = parseInt(Math.random() * 334);
  let gameOver = false;
  let score = 0;
  let allySave = 0;
  let allyDie = 0;
  let currentEnergy = 3;

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
    collision();
    updateScore();
    updateEnergy();
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

  function collision() {
    let collision1 = $("#player").collision($("#enemy1"));
    var collision2 = $("#player").collision($("#enemy2"));
    var collision3 = $("#shooting").collision($("#enemy1"));
    var collision4 = $("#shooting").collision($("#enemy2"));
    var collision5 = $("#player").collision($("#ally"));
    var collision6 = $("#enemy2").collision($("#ally"));

    if (collision1.length > 0) {
      currentEnergy--;
      enemy1X = parseInt($("#enemy1").css("left"));
      enemy1Y = parseInt($("#enemy1").css("top"));
      explosion1(enemy1X, enemy1Y);

      enemyPosY = parseInt(Math.random() * 334);
      $("#enemy1").css("left", 694);
      $("#enemy1").css("top", enemyPosY);
    }

    if (collision2.length > 0) {
      currentEnergy--;
      enemy2X = parseInt($("#enemy2").css("left"));
      enemy2Y = parseInt($("#enemy2").css("top"));
      explosion2(enemy2X, enemy2Y);

      $("#enemy2").remove();

      repositionEnemy2();
    }

    if (collision3.length > 0) {
      enemy1X = parseInt($("#enemy1").css("left"));
      enemy1Y = parseInt($("#enemy1").css("top"));

      explosion1(enemy1X, enemy1Y);
      score += 100;
      enemyVelocity += 1;
      $("#shooting").css("left", 950);

      enemyPosY = parseInt(Math.random() * 334);
      $("#enemy1").css("left", 694);
      $("#enemy1").css("top", enemyPosY);
    }

    if (collision4.length > 0) {
      score += 50;
      enemy2X = parseInt($("#enemy2").css("left"));
      enemy2Y = parseInt($("#enemy2").css("top"));
      $("#enemy2").remove();

      explosion2(enemy2X, enemy2Y);
      $("#shooting").css("left", 950);

      repositionEnemy2();
    }

    if (collision5.length > 0) {
      allySave++;
      repositionAlly();
      $("#ally").remove();
    }

    if (collision6.length > 0) {
      allyDie++;
      allyX = parseInt($("#ally").css("left"));
      allyY = parseInt($("#ally").css("top"));
      explosion3(allyX, allyY);
      $("#ally").remove();

      repositionAlly();
    }
  }

  function explosion1(enemy1X, enemy1Y) {
    $("#backgroundGame").append("<div id='explosion1'></div");
    $("#explosion1").css(
      "background-image",
      "url(src/assets/imgs/explosao.png)"
    );
    let div = $("#explosion1");
    div.css("top", enemy1Y);
    div.css("left", enemy1X);
    div.animate({ width: 200, opacity: 0 }, "slow");

    let timeExplosion = window.setInterval(removeExplosion, 1000);

    function removeExplosion() {
      div.remove();
      window.clearInterval(timeExplosion);
      timeExplosion = null;
    }
  }

  function explosion2(enemy2X, enemy2Y) {
    $("#backgroundGame").append("<div id='explosion2'></div");
    $("#explosion2").css(
      "background-image",
      "url(src/assets/imgs/explosao.png)"
    );
    var div2 = $("#explosion2");
    div2.css("top", enemy2Y);
    div2.css("left", enemy2X);
    div2.animate({ width: 200, opacity: 0 }, "slow");

    var timeExplosion2 = window.setInterval(removeexplosion2, 1000);

    function removeexplosion2() {
      div2.remove();
      window.clearInterval(timeExplosion2);
      timeExplosion2 = null;
    }
  }

  function explosion3(allyX, allyY) {
    $("#backgroundGame").append("<div id='explosion3' class='anima4'></div");
    $("#explosion3").css("top", allyY);
    $("#explosion3").css("left", allyX);
    var timeExplosion3 = window.setInterval(resetExplosion3, 1000);

    function resetExplosion3() {
      $("#explosion3").remove();
      window.clearInterval(timeExplosion3);
      timeExplosion3 = null;
    }
  }

  function repositionEnemy2() {
    var timeCollision4 = window.setInterval(reposition4, 5000);

    function reposition4() {
      window.clearInterval(timeCollision4);
      timeCollision4 = null;

      if (gameOver == false) {
        $("#backgroundGame").append("<div id=enemy2></div");
      }
    }
  }

  function repositionAlly() {
    var timeAlly = window.setInterval(reposition6, 6000);

    function reposition6() {
      window.clearInterval(timeAlly);
      timeAlly = null;

      if (gameOver == false) {
        $("#backgroundGame").append("<div id='ally' class='anima3'></div>");
      }
    }
  }

  function updateScore() {
    $("#score").html(
      "<h2> Pontos: " +
        score +
        "  Salvos: " +
        allySave +
        "  Perdidos: " +
        allyDie +
        "</h2>"
    );
  }

  function updateEnergy() {
    if (currentEnergy == 3) {
      $("#energy").css("background-image", "url(src/assets/imgs/energia3.png)");
    }

    if (currentEnergy == 2) {
      $("#energy").css("background-image", "url(src/assets/imgs/energia2.png)");
    }

    if (currentEnergy == 1) {
      $("#energy").css("background-image", "url(src/assets/imgs/energia1.png)");
    }

    if (currentEnergy == 0) {
      $("#energy").css("background-image", "url(src/assets/imgs/energia0.png)");
    }
  }
}
