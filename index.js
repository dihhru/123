let nym = [
  [300, 60],
  [500, 5],
  [700, 45],
  [930, 35],
  [1150, 25]
];
function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
class Game {
  constructor() {
    this.score = 0;
    this.frogsong = null;
    this.currentSound = "11";
    this.start = this.start.bind(this);
    this.isStarted = false;
    this.isMusic = false;
    this.buildLevel = this.buildLevel.bind(this);
    this.frogSound = this.frogSound.bind(this);
    this.playButton = this.playButton.bind(this);
    this.showFrogs = this.showFrogs.bind(this);
    this.correct = this.correct.bind(this);
    this.frogX = null;
    this.frogY = null;
    this.nym = null;
  }
  frogJump() {
    let frog = document.getElementById("frog");
    let _this = this;
    let start = 0;
    let start1 = 0;
    let up;
    let timer = setInterval(function() {
      start++;
      up = _this.frogY - Number(start);
      frog.style.transform = "translate(" + _this.frogX + "px, " + up + "px)";
      if (start >= 25) {
        _this.frogY = up;
        start = 0;
        clearInterval(timer);
        let timer1 = setInterval(function() {
          start++;
          up = _this.frogY + Number(start);
          frog.style.transform =
            "translate(" + _this.frogX + "px, " + up + "px)";
          if (start >= 25) {
            clearInterval(timer1);
            document.getElementById(_this.nym).classList.add("dropzone1");
            return;
          }
        }, 10);
      }
    }, 5);
  }
  correct() {
    let prevSound = document.getElementById(this.currentSound);
    prevSound.currentTime = 0;
    prevSound.pause();
    let frog = document.getElementById("frog");
    let bg = document.getElementById("bg");
    let img = document.createElement("img");
    this.isMusic = true;
    this.currentSound = "bravo";
    let _this = this;
    let bravo = document.getElementById("bravo");
    frog.style.display = "none";
    img.src = "./images/frog-mute.gif";
    img.className = "frogs";
    img.id = "frogs";
    bg.classList.add("container");
    bg.appendChild(img);
    bg.classList.add("container");
    setTimeout(function() {
      bravo.play();
      document.getElementById("frogs").classList.add("frogsMoved");
    }, 1000);
    setTimeout(function() {
      frog.style.display = "";
      _this.isMusic = false;
      bravo.currentTime = 0;
      bravo.pause();
      bg.removeChild(img);
    }, 6000);
  }
  showFrogs() {
    let frog = document.getElementById("frog");
    let bg = document.getElementById("bg");
    let img = document.createElement("img");
    this.isMusic = true;
    this.currentSound = "bravo";
    let _this = this;
    let bravo = document.getElementById("bravo");
    frog.style.display = "none";
    img.src = "images/transfrogs4.png";
    img.className = "frogs";
    img.id = "frogs";
    bg.classList.add("container");
    bg.appendChild(img);
    bg.classList.add("container");
    setTimeout(function() {
      bravo.play();
      document.getElementById("frogs").classList.add("frogsMoved");
    }, 1000);
    setTimeout(function() {
      frog.style.display = "";
      _this.isMusic = false;
      bravo.currentTime = 0;
      bravo.pause();
      bg.removeChild(img);
    }, 6000);
  }
  buildLevel() {
    let _this = this;
    let bg = document.getElementById("bg");
    for (let i = 0; i < nym.length; i++) {
      let n = Number(i) + 1;
      let div = document.createElement("div");
      let img = document.createElement("img");
      console.log(n)
      img.className = "img";
      img.src = "./images/nym.png";
      div.className = "dropzone";
      div.id = n;
      div.style.left = nym[i][0] + "px";
      div.style.top = nym[i][1] + "px";
      let randomN = randomInteger(1, 2);
      let id = `${n}` + randomN;
      div.onclick = function() {
        if (_this.isStarted) {
          return;
        }
        let prevSound = document.getElementById(_this.currentSound);
        prevSound.currentTime = 0;
        prevSound.pause();
        _this.isMusic = true;
        setTimeout(function() {
          _this.isMusic = false;
        }, 6000);
        document.getElementById(id).play();
        _this.currentSound = id;
      };
      div.appendChild(img);
      bg.appendChild(div);
    }
  }
  frogSound() {
    let frog = document.getElementById("frog");
    frog.innerHTML = "";
    let _this = this;
    let img = document.createElement("img");
    img.src = "images/play_button.png";
    img.id = "play";
    img.className = "playButton";
    frog.appendChild(img);
    _this.frogsong = randomInteger(1, 5);
    document.getElementById("num").innerHTML =
      "Correct nymphea: " + this.frogsong;

    this.playButton();
  }
  playButton() {
    let _this = this;
    let frog = document.getElementById("frog");
    let play = document.getElementById("play");
    frog.onmouseover = function() {
      if (_this.isMusic === false) {
        play.style.display = "block";
      }
    };
    frog.onmouseout = function() {
      play.style.display = "none";
    };
    frog.onclick = function() {
      if (_this.isStarted) {
        return;
      }
      play.style.display = "none";
      frog.style.backgroundImage = 'url("./images/frog-mute.gif")';
      let top = frog.style.top;
      let left = frog.style.left;
      top = parseInt(top);
      left = parseInt(left);
      frog.style.bottom = 95 + "px";
      frog.style.left = 105 + "px";
      let prevSound = document.getElementById(_this.currentSound);
      prevSound.currentTime = 0;
      prevSound.pause();
      let id = `${_this.frogsong}1`;
      _this.currentSound = id;
      document.getElementById(id).play();
      _this.isMusic = true;
      setTimeout(function() {
        frog.style.backgroundImage = 'url("./images/frog-quiete.gif")';
        _this.isMusic = false;
        frog.style.bottom = 107 + "px";
        frog.style.left = 107 + "px";
      }, 6000);
    };
  }
  frogAnimation() {
    let _this = this;
    let frog = document.getElementById("frog");
    let n = this.frogsong;
    interact(frog).draggable({
      // enable inertial throwing
      inertia: false,
      // keep the element within the area of it's parent
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: "self",
          endOnly: true
        })
      ],
      // enable autoScroll
      autoScroll: true,
      // call this function on every dragmove event
      onmove: dragMoveListener,
      // call this function on every dragend event
      onend: function(event) {
        var textEl = event.target.querySelector("p");
        textEl &&
          (textEl.textContent =
            "moved a distance of " +
            Math.sqrt(
              (Math.pow(event.pageX - event.x0, 2) +
                Math.pow(event.pageY - event.y0, 2)) |
                0
            ).toFixed(2) +
            "px");
        setTimeout(function() {
          _this.isStarted = false;
        }, 500);
      }
    });
    function dragMoveListener(event) {
      if (_this.isMusic) {
        return;
      }
      _this.isStarted = true;
      document.getElementById("play").style.display = "none";
      var target = event.target;
      // keep the dragged position in the data-x/data-y attributes
      var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
      var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;
      // translate the element
      target.style.webkitTransform = target.style.transform =
        "translate(" + x + "px, " + y + "px)";
      // update the posiion attributes
      target.setAttribute("data-x", x);
      target.setAttribute("data-y", y);
      _this.frogX = x;
      _this.frogY = y;
    }
    interact(".dropzone").dropzone({
      // only accept elements matching this CSS selector
      accept: "#frog",
      // Require a 75% element overlap for a drop to be possible
      overlap: 0.0001,
      // listen for drop related events:
      ondropactivate: function(event) {
        // add active dropzone feedback
        event.target.classList.add("drop-active");
      },
      ondragenter: function(event) {
        var draggableElement = event.relatedTarget;
        var dropzoneElement = event.target;

        // feedback the possibility of a drop
        dropzoneElement.classList.add("drop-target");
        draggableElement.classList.add("can-drop");
      },
      ondragleave: function(event) {
        // remove the drop feedback style
        event.target.classList.remove("drop-target");
        event.relatedTarget.classList.remove("can-drop");
      },
      ondrop: function(event) {
        _this.nym = event.target.id;
        _this.frogJump();
        setTimeout(function() {
          frog.style.transform = "";
          event.relatedTarget.classList.remove("can-drop");
          event.relatedTarget.setAttribute("data-y", 0);
          event.relatedTarget.setAttribute("data-x", 0);
          document.getElementById(_this.nym).classList.remove("dropzone1");
          if (_this.frogsong == event.target.id) {
            let bg = document.getElementById("bg");
            let img = document.getElementById("img");
            _this.score++;
            _this.isMusic = false;
            if (_this.score >= 3) {
              _this.frogSound();
              _this.showFrogs();
              _this.score = 0;
              var elements = document.getElementsByClassName("dropzone");
              while (elements.length > 0) {
                elements[0].parentNode.removeChild(elements[0]);
              }
              _this.buildLevel();
            } else {
              _this.frogSound();
              _this.correct();
            }
          }
          document.getElementById("score").innerHTML = "Scores:" + _this.score;
        }, 1000);
      },
      ondropdeactivate: function(event) {
        // remove active dropzone feedback
        event.target.classList.remove("drop-active");
        event.target.classList.remove("drop-target");
      }
    });
  }
  start() {
    this.frogsong = randomInteger(1, 5);
    this.buildLevel();
    this.frogAnimation();
    this.frogSound();
  }
}
let game = new Game();
game.start();
