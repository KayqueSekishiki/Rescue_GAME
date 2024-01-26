function start() {
  $("#start").hide();

  $("#backgroundGame").append("<div id='player' class='anima1'></div>");
  $("#backgroundGame").append("<div id='enemy1' class='anima2'></div>");
  $("#backgroundGame").append("<div id='enemy2' ></div>");
  $("#backgroundGame").append("<div id='friend' class='anima3'></div>");

  const game = {
    timer: setInterval(loop, 30),
  };

  function loop() {
    moveBackground();
  }

  function moveBackground() {
    left = parseInt($("#backgroundGame").css("background-position"));
    $("#backgroundGame").css("background-position", left - 1);
  }
}
