// opening animations
var pressAB = new Audio("https://sndup.net/y7cs/d");
pressAB.volume = 0.5;
var albinCry = new Audio("https://sndup.net/wg5y/d");
var enemyCry = new Audio("https://sndup.net/kbn2/d");
var pokeballPoof = new Audio("https://sndup.net/xn3q/d");
var sus = new Audio("https://dl.sndup.net/gmjn/susmid.mp3");
var battle = new Audio("https://dl.sndup.net/tbyj/wild-pokemon-battlemid.mp3");
var strongerIntro = new Audio(
  "https://dl.sndup.net/2q84/Stonebank-Stronger-ft-Emel-intro.mp3"
);
var stronger = new Audio(
  "https://dl.sndup.net/xhtg/Stonebank-Stronger-ft-Emel.mp3"
);
var battleTheme = new Audio(
  "https://vgmsite.com/soundtracks/pokemon-red-green-blue-yellow/mbvahztywh/14%20Battle%21%20%28Wild%20Pok%C3%A9mon%29.mp3"
);
var firstTimeMenu = true;
var nextLine = false;
var waitingForNextLine = false;
var WaitingForUserInput = false;
var startFight = false;
var fourPressed = true;
var releaseAlbin = false;
var gameState = 'INTRO'
var itemIndex = 0
var SelectedMainMenuButton = [0,0]
// disable arrowkey scroll
window.addEventListener('load', function () {
    document.getElementById("four").style.opacity = "100%";
    document.getElementById("loading").style.opacity = "0%";
    fourPressed = false
  })

window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

// Button presses and mouse clicks
document.getElementById("four").onclick = function () {
    startGame();
};


$(document).on("keypress", function (event) {
    let keycode = event.keyCode ? event.keyCode : event.which;
        if (keycode == "120" ) {
            buttonAPress();
    }
    if (keycode == "122") {
        buttonBPress();
}
});
$(document).on("keydown", function (event) {
    let keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode == "40") {
        buttonDownPress();
}
if (keycode == "39") {
    buttonRightPress();
}
if (keycode == "38") {
    buttonUpPress();
}
if (keycode == "37") {
    buttonLeftPress();
}
});

const animatedExclamation = document.querySelector(".exclamation");
animatedExclamation.addEventListener("animationend", function (ev) {
  if (ev.animationName === "exclamation-up") {
    document.getElementById("exclamation").style.opacity = "100%";
    document.getElementById("exclamation").style.animation = "flashing 0.3s 5";
    document.getElementById("four").style.animation = "flashing 0.3s 5";
  }
  if (ev.animationName === "flashing") {
    document.getElementById("transition").style.animation =
      "transition-start 2s linear";
      document.getElementById("exclamation").style.animation = "flashing2 0.3s 5";
      document.getElementById("four").style.animation = "flashing2 0.3s 5";
  }
});

const animatedTransition = document.querySelector(".transition");
animatedTransition.addEventListener("animationend", function (ev) {
  if (ev.animationName === "transition-start") {
    document.getElementById("helpText").style.opacity = "100%";
    document.getElementById("intro").style.filter = "opacity(0%)";
    document.getElementById("trainer").style.animation =
      " trainer-move-in 1.3s linear";
    document.getElementById("err404").style.animation =
      " enemy-move-in 1.3s linear";
  }
});

const animatedTrainer = document.querySelector(".trainer");
animatedTrainer.addEventListener("animationend", function (ev) {
  if (ev.animationName === "trainer-move-in") {
    document.getElementById("trainer").style.filter = "brightness(100%)";
    document.getElementById("pokeBalls").style.filter = "opacity(100%)";
    typewriter(["A wild 404-PAGE appeared!"]);
    WaitingForUserInput = true;
    enemyCry.loop = false;
    enemyCry.play();
  }
  if (ev.animationName === "trainer-move-out") {
    document.getElementById("trainer").style.opacity = "0%";
    typewriter(["Go!   Albin!"]);
    releaseAlbin = true;
  }
});

const animatedAlbin = document.querySelector(".albin");
animatedAlbin.addEventListener("animationend", function (ev) {
  if (ev.animationName === "albin-up") {
    openMainMenu();
    albinCry.loop = false;
    albinCry.play();
  }
});
animatedAlbin.addEventListener("animationstart", function (ev) {
    if (ev.animationName === "albin-up") {
      pokeballPoof.loop = false;
      pokeballPoof.play();
    }
  });

const animatedEnemy = document.querySelector(".err404");
animatedEnemy.addEventListener("animationend", function (ev) {
  if (ev.animationName === "enemy-move-in") {
    document.getElementById("err404").style.filter = "brightness(100%)";
  }
});

function playStronger() {
  sus.loop = false;
  sus.play();
  sus.addEventListener("ended", function () {
    sus.currentTime = 0;
    strongerIntro.loop = false;
    strongerIntro.play();
    strongerIntro.addEventListener("ended", function () {
      strongerIntro.currentTime = 0;
      stronger.loop = true;
      stronger.play();
    });
  });
}
function playBattleTheme() {
    pressAB.loop = false;
    pressAB.play();
  pressAB.addEventListener("ended", function () {
    pressAB.currentTime = 0;
      battleTheme.loop = true;
      battleTheme.play();
  });
}
// typewriter effet for text
function typewriter(text) {
  // array with texts to type in typewriter
  var firstIteration = true;
  var dataText = text;
  // type one text in the typwriter
  // keeps calling itself until the text is finished
  function typeWriter(text, i, fnCallback) {
    // chekc if text isn't finished yet
    if (i < text.length) {
      // add next character to h1
      document.querySelector("h1").innerHTML =
        text.substring(0, i + 1) + '<span aria-hidden="true"></span>';

      // wait for a while and call this function again for next character
      setTimeout(function () {
        typeWriter(text, i + 1, fnCallback);
      }, 100);
    }
    // text finished, call callback if there is a callback function
    else if (typeof fnCallback == "function") {
      // call callback after timeout
      setTimeout(fnCallback, 300);
    }
  }
  // start a typewriter animation for a text in the dataText array
  function StartTextAnimation(i) {
    // check if dataText[i] exists
    if (i < dataText.length) {
      // text exists! start typewriter animation
      typeWriter(dataText[i], 0, function () {
        // after callback (and whole text has been animated), start next text
        if (WaitingForUserInput) {
          document.getElementById("arrowDown").style.opacity = "100%";
        }
        if (releaseAlbin) {
          document.getElementById("albinHealth").style.opacity = "100%";
          document.getElementById("albin").style.opacity = "100%";
          document.getElementById("albin").style.animation =
            " albin-up 0.5s linear";
        }
        dataText.shift();
        StartTextAnimation(0);
        waitingForNextLine = true;
      });
    } else {
    }
  }
  // start the text animation
  if (firstIteration) {
    firstIteration = false
      StartTextAnimation(0);
  }
}

function buttonAPress() {
    if (gameState == "INTRO") {
        nextWord()
    }
    if (gameState == "MAINMENU") {
        if (JSON.stringify(SelectedMainMenuButton) === JSON.stringify([0,0])) {
            // fight
        }
        if (JSON.stringify(SelectedMainMenuButton) === JSON.stringify([1,0])) {
            // pokemon
        }
        if (JSON.stringify(SelectedMainMenuButton) === JSON.stringify([0,1])) {
            //item
            openItemMenu()
        }
        if (JSON.stringify(SelectedMainMenuButton) === JSON.stringify([1,1])) {
            // run

        }
    }
    if (gameState == "ITEMMENU") {
        {
            setItemText(itemIndex);
        }
    }
}
function buttonBPress() {
    if (gameState == "INTRO") {
        nextWord()
    }
    if (gameState == "ITEMMENU") {
        openMainMenu()
    }
}
function buttonDownPress() {
    if (gameState == "MAINMENU") {
        SelectedMainMenuButton[1] = 1
        document.getElementById("menuArrow").style.bottom = "6.5%";
    }
    if (gameState == "ITEMMENU") {
        if (itemIndex<  Object.keys(items).length - 1){
            itemIndex = itemIndex +1;
            document.getElementById("itemMenuArrow").style.top = ((2 * itemIndex) + 7.6) + "vw";
        }


    }
}
function buttonRightPress() {
    if (gameState == "MAINMENU") {
        SelectedMainMenuButton[0] = 1
        document.getElementById("menuArrow").style.right = "22%";
    }
}
function buttonUpPress() {
    if (gameState == "MAINMENU") {
        SelectedMainMenuButton[1] = 0
        document.getElementById("menuArrow").style.bottom = "17.5%";
    }
    if (gameState == "ITEMMENU") {
        if (itemIndex> 0){
            itemIndex = itemIndex - 1;
            document.getElementById("itemMenuArrow").style.top = ((2 * itemIndex) + 8) + "vw";
        }

    }

}
function buttonLeftPress() {
    if (gameState == "MAINMENU") {
        SelectedMainMenuButton[0] = 0
        document.getElementById("menuArrow").style.right = "51%";
    }
}
function nextWord() {
  if (waitingForNextLine && WaitingForUserInput) {
    if (gameState == "INTRO") {
        playButtonPressSound()
        albinIntroAnimation()
    } else {
        playButtonPressSound()
        waitingForNextLine = true;
        WaitingForUserInput = true;
        typewriter(["Next word"])
    }
  }
}
function SetMainMenuArrow(){
    document.getElementById("pokeBalls").style.right = "51%";
}

function playButtonPressSound() {
    pressAB.loop = false;
    pressAB.play();
}

function albinIntroAnimation() {
    document.getElementById("arrowDown").style.opacity = "0%";
    typewriter([" "]);
    waitingForNextLine = false;
    WaitingForUserInput = false;
    startFight = true;
    document.getElementById("trainer").style.animation =
      " trainer-move-out 1.3s linear";
    document.getElementById("err404Health").style.opacity = "100%";
    document.getElementById("pokeBalls").style.opacity = "0%";
}

function startGame() {
    if (!fourPressed) {
        playBattleTheme();
        document.getElementById("exclamation").style.animation =
          "exclamation-up 0.2s ease-in-out";
        fourPressed = true;
      }
}



function fightMove(){
    if (startFight){
        openFightMenu()
        playButtonPressSound()
        startFight = false;
    }
}

function runMove(){
    if (startFight){
        openRunMenu()
        playButtonPressSound()
        startFight = false;
    }
}

function itemMove(){
    if (startFight){
        openItemMenu()
        playButtonPressSound()
        startFight = false;
    }
}

function pokemonMove(){
    if (startFight){
        openPokemonMenu()
        playButtonPressSound()
        startFight = false;
    }
}

function openMainMenu() {
    if (!firstTimeMenu){
        playButtonPressSound()
    }
    firstTimeMenu = false
    typewriter([" "]);
    document.getElementById("menu").style.opacity = "100%";
    document.getElementById("menuArrow").style.opacity = "100%";
    document.getElementById("itemMenu").style.opacity = "0%";
    document.getElementById("itemMenuArrow").style.opacity = "0%";
    document.getElementById("itemList").style.opacity = "0%";
    gameState = 'MAINMENU'
  }

function openFightMenu(){
    playButtonPressSound()
    document.getElementById("menu").style.opacity = "0%";
    document.getElementById("fightMenu").style.opacity = "100%";
    gameState = 'FIGHTMENU'
}

function openRunMenu(){
    playButtonPressSound()
    document.getElementById("menu").style.opacity = "0%";
    typewriter([" "]);

    typewriter("You can't run from a 404-PAGE!");
}

function openItemMenu(){
    playButtonPressSound()
    document.getElementById("menu").style.opacity = "0%";
    typewriter([" "]);
    document.getElementById("menuArrow").style.opacity = "0%";
    document.getElementById("itemMenu").style.opacity = "100%";
    document.getElementById("itemMenuArrow").style.opacity = "100%";
    document.getElementById("itemList").style.opacity = "100%";
    // items can be tfif korv, tentarkiv, ES, schilkin
    gameState = 'ITEMMENU'
}

function openPokemonMenu(){
    playButtonPressSound()
    document.getElementById("menu").style.opacity = "0%";
    typewriter([" "]);

    document.getElementById("pokemonMenu").style.opacity = "100%";
    // fru och herrkanin, rosaflamingo, drickamaskin, grillen och albin
    gameState = 'POKEMONMENU'
}

function setItemText(index) {
    if (waitingForNextLine) {
        var mess = items[Object.keys(items)[index]].messages
        typewriter(mess);
    }
    waitingForNextLine = false;
}
const items = {
  korv: {
      name: 'TFIF korv',
      messages: ['Albin ate TFIF korv!','Tack TFIF!' ]
  },
  kaffe: {
      name: 'Kansli kaffe',
      messages: ['Albin drank Kansli kaffe!','SPEED UP!', 'Tastes funky' ]
  },
  es: {
      name: 'ES',
      messages: ['Ebin! :DD', 'Albin drang Euro Shobber! :DD','SBEED UB! :DD' ]
  },
  tentarkiv: {
      name: 'Tentarkiv',
      messages: ['Theres no time to study!' ]
  },
  schilkin: {
      name: 'Schilkin',
      messages: ['Albin drank Schilkin!','SPEED UP!', 'Feels like silliz' ]
  },
  cuzzi_water: {
    name: 'Cuzzi Water',
    message: ['Albin drank cuzzi water', 'Albin feels regrets', 'Feels sick _(´ཀ`」 ∠)_']
  },
  hartsport: {
    name: 'Hartsport',
    message: ['Albin drank hartsport', 'Cures Krapula', 'would taste great with Schilkin']
  }
}

const attacks = {
  stronger: {
      name: 'stronger',
      messages: ['Date takeover in 1 minute!', 'Albin feels pumped up' ]
  },

  donkero: {
    name: 'Donkero',
    message: ['Albin mixes donkero', 'Albin drinks donkero', 'Albin feels slightly tipsy']
  },

}

const run = {
name: 'run',
message: ['You try to run away','An exit is not found', '404 is still present']

}

const pokemon = {
fruKanin:{
  name:'asd'
}
}

let list = document.getElementById("itemList");

Object.keys(items).forEach((item)=>{
  let li = document.createElement("li");
  li.innerText = items[item].name;
  list.appendChild(li);
})