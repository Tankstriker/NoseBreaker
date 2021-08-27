+kaboom({
  global: true,
  fullscreen: true,
  scale: 2,
  debug: true,
  clearColor: [0, 0, 0, 1],
});

const MOVE_SPEED = 150;
const JUMP_FORCE = 450;

loadRoot("https://i.imgur.com/");
loadSprite("block", "pogC9x5.png");
loadSprite("mario", "Wb1qfhK.png");
loadSprite("chrisHans", "SOuNmF8.jpeg");
loadSprite("brick", "M6rwarW.png");

scene("game", () => {
  layers(["bg", "obj", "ui"], "obj");

  const map = [
    "                               = ",
    "                   ==============",
    "£                              = ",
    "=                              = ",
    "=  #   #   #   #    £     £    = ",
    "£                              = ",
    "=                      £       = ",
    "=     #   #   #                = ",
    "£                 £        £   = ",
    "=                  ££££££££    = ",
    "=      #   #                   = ",
    "£                              = ",
    "=    #   #   #                 = ",
    "=                              = ",
    "£                              = ",
    "£                              = ",
    "=================================",
  ];

  const levelCfg = {
    width: 20,
    height: 20,
    "=": [sprite("block"), solid()],
    "@": [sprite("mario"), body()],
    "£": [sprite("chrisHans"), solid(), scale(0.1)],
    "#": [sprite("brick"), solid(), "suprise"],
  };

  const gameLevel = addLevel(map, levelCfg);

  function transform() {
    let timer = 0;
    let isTransformed = false;
    return {
      if(transformed) {
        timer -= dt();
        if (timer <= 0) {
          this.smallify();
        }
      },
      isTransformed() {
        return isTransformed;
      },
      smallify() {
        this.scale = vec2(1);
        timer = 0;
        isTransformed = false;
      },
      biggify() {
        this.scale = vec(2);
        timer = timer;
        isTransformed = true;
      },
    };
  }

  const player = add([sprite("mario"), body(), solid(), pos()]);

  player.on("headbump", (obj) => {
    if (obj.is("suprise")) {
      gameLevel.spawn("£", obj.gridPos.sub(0, 1));
      gameLevel.spawn("}", obj.gridPos.sub(0, 0));
    }
    if (obj.is("mushroom-surprise")) {
      gameLevel.spawn("#", obj.gridPos.sub(0, 1));
      destroy(obj);true
      gameLevel.spawn("}", obj.gridPos.sub(0, 1));
    }
  });

  keyDown("left", () => {
    player.move(-MOVE_SPEED, 0);
  });

  keyDown("right", () => {
    player.move(MOVE_SPEED, 0);
  });

  keyPress("space", () => {
    if (player.grounded()) {
      player.jump(JUMP_FORCE);
    }
  });
});

start("game");