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
var fightIndex = 0
var SelectedMainMenuButton = [0,0]
var attackType = "BUG"
var menuKeyUp = false
var donkeroIteration = 0
var strongerPlaying = false
var donkeroStringArr = ["Albin takes another sip of donkero!", "Albin drinks more...", "Slow down Albin!", "Albin take it easy with the drinking", "NOOO Albin! I SAID SLOW DOWN! THIS WILL END BADLY!", "I WON'T CARRY YOU HOME WHEN YOU PASS OUT!", "...", "Here's the reason for the donkero prohibition", "Albin fainted!     You take him to TYKS!"]
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
const animatedtransitionEnd = document.querySelector(".transition");
animatedtransitionEnd.addEventListener("animationend", function (ev) {
  if (ev.animationName === "setVisible") {
    document.getElementById("textBox").style.color = "white";
    document.getElementById("textBox").style.zIndex = "200";
    typewriter(["Och så kom ambulansen,  Weeuueeuueeuu!   Albin till TYKS:sen!"])
  }
});

const animatedGlas = document.querySelector(".glas");
animatedGlas.addEventListener("animationend", function (ev) {
  if (ev.animationName === "setVisible") {
    typewriter(["Albin takes a glass..."])
    setDonkeroTime();
    document.getElementById("glas").style.opacity = "100%";
    document.getElementById("lonkero").style.animation = "setVisible 1s";
  }
});

const animatedLonkero = document.querySelector(".lonkero");
animatedLonkero.addEventListener("animationend", function (ev) {
  if (ev.animationName === "setVisible") {
    document.getElementById("lonkero").style.opacity = "100%";
    document.getElementById("lonkero").style.animation = "pour ease-out 3s";
    document.getElementById("glas").style.animation = "setInvisible 3s";
    document.getElementById("donkero").style.animation = "setVisible 3s";
  }
  if (ev.animationName === "pour") {
    typewriter(["...and pours up a lonkero!"])
    document.getElementById("glas").style.opacity = "0%";
    document.getElementById("donkero").style.opacity = "100%";
    document.getElementById("lonkero").style.transform = "rotate(-145deg)"
    document.getElementById("lonkero").style.animation = "liftUp ease-in-out 3s";
  }
  if (ev.animationName === "liftUp") {
    document.getElementById("lonkero").style.transform = " rotate(-145deg)"
    document.getElementById("lonkero").style.animation = "throw ease-in-out 1s";
  }
  if (ev.animationName === "throw") {
    document.getElementById("lonkero").style.opacity = "0%";
    document.getElementById("kossu").style.animation = "setVisible 1s";
  }
});
const animatedKossu = document.querySelector(".kossu");
animatedKossu.addEventListener("animationend", function (ev) {
  if (ev.animationName === "setVisible") {
    typewriter(["Albin adds four shots of vodka!"])
    document.getElementById("kossu").style.opacity = "100%";
    document.getElementById("kossu").style.animation = "pour ease-out 3s";
  }
  if (ev.animationName === "pour") {
    document.getElementById("kossu").style.transform = "rotate(-145deg)"
    document.getElementById("kossu").style.animation = "liftUp ease-in-out 3s";
  }
  if (ev.animationName === "liftUp") {
    document.getElementById("kossu").style.transform = "rotate(-145deg)"
    document.getElementById("kossu").style.animation = "putDown ease-in-out 3s, setInvisible ease-in-out 3s";
  }
  if (ev.animationName === "setInvisible") {
    typewriter(["Albin enjoys a sip of donkero!"])
    document.getElementById("kossu").style.opacity = "0%";
    document.getElementById("donkero").style.animation = "drink ease-in-out 7s";
  }
});
const animatedDonkero = document.querySelector(".donkero");
animatedDonkero.addEventListener("animationend", function (ev) {
  if (ev.animationName === "drink") {
    document.getElementById("donkero").style.animation = 'none';
    document.getElementById("donkero").style.animation = null;
    openMainMenu();
    donkeroIteration = donkeroIteration +1;
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
    if (!strongerPlaying){
        strongerPlaying = true
    openMainMenu()
    playButtonPressSound()
    menuKeyUp = false
    battleTheme.pause();
    battleTheme.volume = 0;
    strongerIntro.loop = false;
    strongerIntro.play();
    strongerIntro.addEventListener("ended", function () {
      strongerIntro.currentTime = 0;
      stronger.loop = true;
      stronger.play();
    });
}
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
            openFightMenu()
            // fight
        }
        if (JSON.stringify(SelectedMainMenuButton) === JSON.stringify([1,0])) {
            // pokemon
            setPokemonText()
        }
        if (JSON.stringify(SelectedMainMenuButton) === JSON.stringify([0,1])) {
            //item
            openItemMenu()
        }
        if (JSON.stringify(SelectedMainMenuButton) === JSON.stringify([1,1])) {
            // run

            setRunText()

        }
    }
    if (gameState == "ITEMMENU" ) {
        $(document).on("keyup", function (event) {
            let keycode = event.keyCode ? event.keyCode : event.which;
                if (keycode == "88" ) {

                    menuKeyUp = true
            }
        });
        if (menuKeyUp){
        {
            setItemText(itemIndex);
        }
    }
    }

    if (gameState == "FIGHTMENU" ) {
        $(document).on("keyup", function (event) {
            let keycode = event.keyCode ? event.keyCode : event.which;
                if (keycode == "88" ) {

                    menuKeyUp = true
            }
        });
        if (menuKeyUp){
            if (!strongerPlaying){
            if (fightIndex == 0){
                playStronger()
            }
        }

            if (fightIndex == 1){
                makeDonkero()
            }
        }
    }
}
function buttonBPress() {
    if (gameState == "INTRO") {
        nextWord()
    }
    if (gameState == "ITEMMENU" || gameState == "FIGHTMENU") {
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
    if (gameState == "FIGHTMENU") {
        if (fightIndex<  Object.keys(attacks).length - 1){
            fightIndex = fightIndex +1;
            document.getElementById("fightMenuArrow").style.top = ((2 * fightIndex) + 30) + "vw";
            document.getElementById("moveType").innerHTML = attacks[Object.keys(attacks)[fightIndex]].attackType;
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
    if (gameState == "FIGHTMENU") {
        if (fightIndex> 0){
            fightIndex = fightIndex - 1;
            document.getElementById("fightMenuArrow").style.top = ((2 * fightIndex) + 30) + "vw";
            document.getElementById("moveType").innerHTML = attacks[Object.keys(attacks)[fightIndex]].attackType;
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
    menuKeyUp = false;
    firstTimeMenu = false
    typewriter([" "]);
    document.getElementById("menu").style.opacity = "100%";
    document.getElementById("menuArrow").style.opacity = "100%";
    document.getElementById("itemMenu").style.opacity = "0%";
    document.getElementById("itemMenuArrow").style.opacity = "0%";
    document.getElementById("itemList").style.opacity = "0%";
    document.getElementById("fightMenu").style.opacity = "0%";
    document.getElementById("fightMenuArrow").style.opacity = "0%";
    document.getElementById("fightList").style.opacity = "0%";
    document.getElementById("moveType").style.opacity = "0%";
    gameState = 'MAINMENU'
  }

function openFightMenu(){
    playButtonPressSound()
    document.getElementById("menu").style.opacity = "0%";
    document.getElementById("menuArrow").style.opacity = "0%";
    document.getElementById("fightMenu").style.opacity = "100%";
    document.getElementById("fightMenuArrow").style.opacity = "100%";
    document.getElementById("fightList").style.opacity = "100%";
    document.getElementById("moveType").style.opacity = "100%";
    document.getElementById("moveType").innerHTML = attacks[Object.keys(attacks)[fightIndex]].attackType;
    gameState = 'FIGHTMENU'
}

function openRunMenu(){
    playButtonPressSound()
    document.getElementById("menu").style.opacity = "0%";
    typewriter([" "]);

    typewriter(["You can't run from a 404-PAGE!"]);
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

function makeDonkero(){
    setDonkeroTime()
    playButtonPressSound()
    gameState = "DONKEROTIME"
    if (donkeroIteration == 0){
        document.getElementById("glas").style.animation = "setVisible 1s";
    }
    if (donkeroIteration == 1){
        document.getElementById("donkero").style.animation = "drink ease-in-out 5s";
        typewriter([donkeroStringArr[donkeroIteration-1]])
    }
    if (donkeroIteration == 2){
        document.getElementById("donkero").style.animation = "drink ease-in-out 3s";
        typewriter([donkeroStringArr[donkeroIteration-1]])
    }
    if (donkeroIteration == 3){
        document.getElementById("donkero").style.animation = "drink ease-in-out 3 1s";
        typewriter([donkeroStringArr[donkeroIteration-1]])
    }
    if (donkeroIteration == 4){
        document.getElementById("donkero").style.animation = "drink ease-in-out 1 5s";
        typewriter([donkeroStringArr[donkeroIteration-1]])
    }
    if (donkeroIteration == 5){
        document.getElementById("donkero").style.animation = "drink ease-in-out 7 1s";
        typewriter([donkeroStringArr[donkeroIteration-1]])
    }
    if (donkeroIteration == 6){
        document.getElementById("donkero").style.animation = "drink ease-in-out 10 0.5s";
        typewriter([donkeroStringArr[donkeroIteration-1]])
    }
    if (donkeroIteration == 7){
        document.getElementById("donkero").style.animation = "drink ease-in-out 7 1s";
        document.getElementById("kossu").style.transformOrigin = "top center";
        document.getElementById("kossu").style.opacity = "100%";
        document.getElementById("kossu").style.opacity = "100%";
        document.getElementById("kossu").style.right = "66%";
        document.getElementById("kossu").style.top = "19vw";
        document.getElementById("kossu").style.animation = "supa ease-in-out infinite 1s";
        typewriter([donkeroStringArr[donkeroIteration-1]])
    }
    if (donkeroIteration == 8){
        document.getElementById("donkero").style.animation = "drink ease-in-out 7 1s";
        typewriter([donkeroStringArr[donkeroIteration-1]])
    }
    if (donkeroIteration > 8){
        gameState = "END"
        battleTheme.pause();
        battleTheme.volume = 0;
        stronger.pause();
        stronger.volume = 0;
        document.getElementById("transition").style.animation = "setVisible linear 8s";
        document.getElementById("transition").style.width = "50vw";
        typewriter([donkeroStringArr[8]])
    }

}
function setDonkeroTime() {
    document.getElementById("fightMenu").style.opacity = "0%";
    document.getElementById("fightMenuArrow").style.opacity = "0%";
    document.getElementById("fightList").style.opacity = "0%";
    document.getElementById("moveType").style.opacity = "0%";
}

function setItemText(index) {
    if (waitingForNextLine) {
        var mess = items[Object.keys(items)[index]].messages
        typewriter(mess);
    }
    waitingForNextLine = false;
}




function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function setRunText() {
    document.getElementById("menu").style.opacity = "0%";
    typewriter(["You try to run from the 404-PAGE!", "But you can't escape!", "You are trapped in the 404-PAGE untill you defeat it!"]);

    await sleep(11500);
    typewriter([""])
    document.getElementById("menu").style.opacity = "100%";

}

async function setPokemonText() {
  document.getElementById("menu").style.opacity = "0%";
  typewriter(["herr and fru kanin have fainted, you have no other fighters"]);
    sleep(5000);
    typewriter([""])
    document.getElementById("menu").style.opacity = "100%";
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
      messages: ['Albin drank Schilkin!','Balmers peak intensifies', 'Feels like silliz' ]
  },
  cuzziWater: {
      name: 'Cuzzi water',
      messages: ['Albin drank cuzzi water!', 'Albin feels regrets!', '_(´ཀ`」 ∠)_' ]
  },
  hartsport: {
      name: 'Hartsport',
      messages: ['Albin drank hartsport!', 'Cures Krapula!', 'Would taste great with Schilkin' ]
  }
}

const attacks = {
  stronger: {
      name: 'Stronger',
      messages: ['Albin used Stronger!' , 'Date takeover in 1 minute!', 'Music is playing!' ,'Albin feels pumped up!' ],
      attackType: "PSYCHIC"
  },

  donkero: {
    name: 'Donkero',
    message: ['Albin mixes donkero', 'Albin drinks donkero', 'Albin feels slightly tipsy'],
    attackType: "POISON"
  },

}

const run = {
    name: 'Run',
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

let fightList = document.getElementById("fightList");

Object.keys(attacks).forEach((item)=>{
  let li = document.createElement("li");
  li.classList.add('listpadding')
  li.innerText = attacks[item].name;
  fightList.appendChild(li);
})