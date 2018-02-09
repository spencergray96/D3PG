var mainContent = document.getElementById("mainContent");

// -------------------- Menu Variables -------------------- //

// variables for the divs that the cursor can appear in
var iconCell1 = document.getElementById("iconCell1"),
    iconCell2 = document.getElementById("iconCell2"),
    iconCell3 = document.getElementById("iconCell3"),
    iconCell4 = document.getElementById("iconCell4");

// sets the background of the first iconCell to have the cursor
iconCell1.style.backgroundImage = "url(./artwork/ui/cursor.svg)";

// array for the 'options' in the menu. they correspond with the iconCells
var optionCells = document.getElementsByClassName("optionCell");

// variable that keeps track of where the cursor is. 1 is top left, 2 is top right, 3 is bottom left, 4 is bottom right
var cursorPos = 1;

// Menu variables to determine which menu is 'open' / active. used in combination with the cursorPos variable to determine what action is taken when enter is pressed
var mainMenu = true;
var subMenu1 = false;

// -------------------- Character Variables -------------------- //

// Active character variable - cycles from 0 - 1, 1 - 2, 2 - 3, 3 - 0. increases by 1 when the current character does their turn. resets to 0 after the enemy attacks
var activeCharVar = 0;

// array for the divs that the characters reside in. this is the space alloted for their image, weapons, and damage popups when they get hit
var chars = document.getElementsByClassName("char");

// grabs the first character's div and sets it as the active one when the battle starts
chars[0].classList.add("activeChar");

// character HP window
var charHpDiv = document.getElementById("charHpDiv");

// arrays for player sprites and enemy sprite
var charImgs = document.getElementsByClassName("charImg");
var enemyImgs = document.getElementsByClassName("enemyImg");

// writes character health when battle starts, checks if any characters are dead
menuUpdate();
checkDeath();

// div that the enemy appears in
var enemyDiv = document.getElementById("enemyDiv");

// -------------------- Image Arrays -------------------- //

// images for the weapons
var wepImgs = [
    "./artwork/weapons/weapon-monster2.png",
    "./artwork/weapons/weapon-pickleRick.png",
    "./artwork/weapons/weapon-kitkat.png",
    "./artwork/weapons/weapon-chopstick.png"
]

// these arrays are for the alternate sprites that flash when the characters get hit or take damage

var spencerSprite = [
    "./artwork/characters/spencer/Spencer.png",
    "./artwork/characters/spencer/SpencerRed.png",
    "./artwork/characters/spencer/SpencerBlack.png"
]

var doveSprite = [
    "./artwork/characters/dove/Dove.png",
    "./artwork/characters/dove/DoveRed.png",
    "./artwork/characters/dove/DoveBlack.png"
]

var jamesSprite = [
    "./artwork/characters/james/james2.png",
    "./artwork/characters/james/james2Red.png",
    "./artwork/characters/james/james2Black.png"
]

var raymondSprite = [
    "./artwork/characters/raymond/Raymond.png",
    "./artwork/characters/raymond/RaymondRed.png",
    "./artwork/characters/raymond/RaymondBlack.png"
]

var elfmanSprite = [
    "./artwork/enemies/gnomeChild/gnomeChildPixel2.png",
    "./artwork/enemies/gnomeChild/gnomeChildPixel2Red.png",
    "./artwork/enemies/gnomeChild/gnomeChildPixel2Black.png"
]

var sprite = [
    spencerSprite,
    doveSprite,
    jamesSprite,
    raymondSprite
]

// -------------------- Functions for navigating the menu -------------------- //

document.addEventListener("keyup", menuInputs);
    
function menuInputs(ev){

    if(mainMenu || subMenu1) {
    //WASD    

        if (ev.keyCode == 87){
                up();
        }

        if (ev.keyCode == 65){
                left();
        }

        if (ev.keyCode == 83){
                down();
        }

        if (ev.keyCode == 68){
                right();
        }

    //enter and back buttons

        if (ev.keyCode == 13){
            createSelectSound();
            if(mainMenu){
                if (cursorPos == 1) {
                    clearMenu();
                    delayAction(fight, 0.25);
//                    fight();
                    changeActiveChar();
                    if (activeCharVar != 3) {
                        delayAction(resetMenu, 1);
                    }  
                    else if (activeCharVar == 3){
//                        setTimeout((chars[3].classList.remove("activeChar")), 2000);
                        delayAction(resetMenu, 3);
                    }
                }

                if (cursorPos == 2){
                    createSelectSound();
                    mainMenu = false;
                    subMenu1 = true;
                    openSubMenu();
                    cursorPos = 1;
                    console.log("items");
                }

                if (cursorPos == 3) {
                    clearMenu();
                    console.log("you chose option 3 - ???");
                    changeActiveChar();
                    if (activeCharVar != 3) {
                        delayAction(resetMenu, 1);
                    }  
                    else if (activeCharVar == 3){
                        delayAction(resetMenu, 3);
                    }
                }

                if (cursorPos == 4) {
                    clearMenu();
                    console.log("you chose option 4 - Run");
                    changeActiveChar();
                    if (activeCharVar != 3) {
                        delayAction(resetMenu, 1);
                    }  
                    else if (activeCharVar == 3){
                        delayAction(resetMenu, 3);
                    }
                }
            }

            else if (subMenu1) {
                mainMenu = true;
                subMenu1 = false;
                clearMenu();                
                changeActiveChar();
                if (activeCharVar != 3) {
                        delayAction(resetMenu, 1);
                    }  
                    else if (activeCharVar == 3){
                        delayAction(resetMenu, 3);
                    }
                if (cursorPos == 1) {
                    console.log("you chose option 1 - ???");
                }

                if (cursorPos == 2){
                    console.log("you chose option 2 - ???");
                }

                if (cursorPos == 3) {
                    console.log("you chose option 3 - ???");
                }

                if (cursorPos == 4) {
                    console.log("you chose option 4 - ???");
                }
                
            }
            
        }
        
        if (ev.keyCode == 8){
            if(mainMenu) {
                createBumpSound();
            }
            if(subMenu1) {
                createBumpSound();
                subMenu1 = false;
                mainMenu = true;
                clearMenu();
                cursorPos = 1;
                delayAction(resetMenu, 0.25);
            }
        }
        
    }
    
}

// -------------------- Directional key functions on the menu -------------------- //

function up(){
    if (cursorPos == 1){
        createBumpSound();
    }

    else if (cursorPos == 2){
        createBumpSound();
    }

    else if (cursorPos == 3){
        createMoveSound();
        cursorPos = 1;
        
// visuals 3 - 1
        
        if (mainMenu || subMenu1){
            iconCell3.style.backgroundImage = "url()";
            iconCell1.style.backgroundImage = "url(./artwork/ui/cursor.svg)";
        }
    }

    else if (cursorPos == 4){
        createMoveSound();
        cursorPos = 2;
        
// visuals 4 - 2
        if (mainMenu || subMenu1){
            iconCell4.style.backgroundImage = "url()";
            iconCell2.style.backgroundImage = "url(./artwork/ui/cursor.svg)";
        }
    }

}

function left(){
    if (cursorPos == 1){
        createBumpSound();
    }

    else if (cursorPos == 2){
        createMoveSound();
        cursorPos = 1;
        
// visuals 2 - 1
        if (mainMenu || subMenu1){
            iconCell2.style.backgroundImage = "url()";
            iconCell1.style.backgroundImage = "url(./artwork/ui/cursor.svg)";
        }
    }

    else if (cursorPos == 3){
        createBumpSound();
    }

    else if (cursorPos == 4){
        createMoveSound();
        cursorPos = 3;
        
// visuals 4 - 3
        if (mainMenu || subMenu1){
            iconCell4.style.backgroundImage = "url()";
            iconCell3.style.backgroundImage = "url(./artwork/ui/cursor.svg)";
        }
    }

}

function down(){
    if (cursorPos == 1){
        createMoveSound();
        cursorPos = 3;
        
// visuals 1 - 3
        if(mainMenu || subMenu1){
            iconCell1.style.backgroundImage = "url()";
            iconCell3.style.backgroundImage = "url(./artwork/ui/cursor.svg)";
        }
    }

    else if (cursorPos == 2){
        createMoveSound();
        cursorPos = 4;
        
// visuals 2 - 4
        if(mainMenu || subMenu1){
            iconCell2.style.backgroundImage = "url()";
            iconCell4.style.backgroundImage = "url(./artwork/ui/cursor.svg)";
        }
    }

    else if (cursorPos == 3){
        createBumpSound();
    }

    else if (cursorPos == 4){
        createBumpSound();
    }

}

function right(){
    if (cursorPos == 1){
        createMoveSound();
        cursorPos = 2;
        
// visuals 1 - 2
        if(mainMenu || subMenu1){
            iconCell1.style.backgroundImage = "url()";
            iconCell2.style.backgroundImage = "url(./artwork/ui/cursor.svg)";
        }
    }

    else if (cursorPos == 2){
        createBumpSound();
    }

    else if (cursorPos == 3){
        createMoveSound();
        cursorPos = 4;
        
// visuals 3 - 4
        if(mainMenu || subMenu1){
            iconCell3.style.backgroundImage = "url()";
            iconCell4.style.backgroundImage = "url(./artwork/ui/cursor.svg)";
        }
    }

    else if (cursorPos == 4){
        createBumpSound();
    }
    
}

// -------------------- Open sub menus -------------------- //

function openSubMenu(){
    
    if (subMenu1) {
        clearMenu();
        delayAction(itemMenu, 0.25);
    }
    
}

// -------------------- Change the active character -------------------- //

function changeActiveChar(){

    switch(activeCharVar){
        case 0:
        case 1:
        case 2:
/*  ~~~~~~~~~~~~~~  REMOVE event listener after to prevent multiple "enter" instances  ~~~~~~~~~~~~~~  */ 
            document.removeEventListener("keyup", menuInputs);
//            activeCharVar++;
            delayAction(theAction, 1);
            break;
        case 3:
/*  ~~~~~~~~~~~~~~  REMOVE event listener after to prevent multiple "enter" instances  ~~~~~~~~~~~~~~  */
            document.removeEventListener("keyup", menuInputs);
            setTimeout(removePlayer4, 1000);
            delayAction(enemyAttack, 2);
            break;
    }
}

// function specifically for making the 4th player 'inactive'
function removePlayer4(){
    chars[3].classList.remove("activeChar");
}

// -------------------- Check if characters are dead + skip their turn -------------------- //

function checkDeath(){
    
    if (charStats[activeCharVar].status == "dead") {
        if (charStats[0].status == "dead" && charStats[1].status == "dead" && charStats[2].status == "dead" && charStats[3].status == "dead") {
            
            BGAudio.pause();
            deathAudio.play();
            deathAudio.volume = 0.05;
            
            var gameOverBlack = document.createElement("div");
            gameOverBlack.className += "gameOverBlack";
            gameOverBlack.className += " gameOverBlack2";
            mainContent.appendChild(gameOverBlack);
            
            console.log("please work");
            chars[0].classList.remove("activeChar");
            document.removeEventListener("keyup", menuInputs);
            var contDiv = document.createElement("div");
            contDiv.className += "contDiv";
            contDiv.innerText = "You died!";
            gameOverBlack.appendChild(contDiv);
            
            contDiv.addEventListener("click", function() {
                deathAudio.pause();
                addDisplay();
            });
        }
        
        else if(activeCharVar > 2){
            delayAction(enemyAttack, 1);
            (theAction2, 1);
        }
        
        else if (activeCharVar == 1 && charStats[2].status == "dead" && charStats[3].status == "dead") {
            delayAction(enemyAttack, 1);
            delayAction(theAction2, 1);        
        }
        
        else if (activeCharVar <= 2) {
            theAction();
        }
        
    }
    else {

    }
    
}

// -------------------- Functions for clearing and rewriting the text in the menu -------------------- //

function itemMenu() {
    document.addEventListener("keyup", menuInputs);
    iconCell2.style.backgroundImage = "url()";
    iconCell1.style.backgroundImage = "url(./artwork/ui/cursor.svg)";
    optionCells[0].innerText = "??? 1";
    optionCells[1].innerText = "??? 2";
    optionCells[2].innerText = "??? 3";
    optionCells[3].innerText = "??? 4";    
}

function clearMenu() {
    document.removeEventListener("keyup", menuInputs);
    iconCell1.style.backgroundImage = "url()";
    iconCell2.style.backgroundImage = "url()";
    iconCell3.style.backgroundImage = "url()";
    iconCell4.style.backgroundImage = "url()";
    optionCells[0].innerText = "";
    optionCells[1].innerText = "";
    optionCells[2].innerText = "";
    optionCells[3].innerText = "";    
}

function resetMenu() {
    document.addEventListener("keyup", menuInputs);
    iconCell1.style.backgroundImage = "url(./artwork/ui/cursor.svg)";
    iconCell2.style.backgroundImage = "url()";
    iconCell3.style.backgroundImage = "url()";
    iconCell4.style.backgroundImage = "url()";
    optionCells[0].innerText = "Fight";
    optionCells[1].innerText = "Items";
    optionCells[2].innerText = "???";
    optionCells[3].innerText = "RUN";      
}

// -------------------- Audio functions -------------------- //

function createMoveSound() {
    var moveAudio = new Audio("./audio/menu/UIMove.wav");
    moveAudio.volume = 0.1;
    moveAudio.play();
}

function createBumpSound() {
    var moveAudio = new Audio("./audio/menu/UIBump.wav");
    moveAudio.volume = 0.025;
    moveAudio.play();
}

function createSelectSound() {
    var moveAudio = new Audio("./audio/menu/UISelect2.wav");
    moveAudio.volume = 0.25;
    moveAudio.play();
}

function createEnemySound() {
    var moveAudio = new Audio("./audio/attacks/UISlash.wav");
    moveAudio.volume = 0.5;
    moveAudio.play();
}

function attackCan() {
    var moveAudio = new Audio("./audio/attacks/UICan.wav");
    moveAudio.volume = 0.8;
    moveAudio.play();
}

function attackPickle() {
    var moveAudio = new Audio("./audio/attacks/UIPickle.wav");
    moveAudio.volume = 0.5;
    moveAudio.play();
}

function attackKitkat() {
    var moveAudio = new Audio("./audio/attacks/UIKitKat.wav");
    moveAudio.volume = 0.15;
    moveAudio.play();
}

function attackChopstick() {
    var moveAudio = new Audio("./audio/attacks/UIChopstick.wav");
    moveAudio.volume = 0.5;
    moveAudio.play();
}

// -------------------- Demo version logo popup -------------------- //

// logo popup at beginning
var logoDiv = document.getElementById("logoDiv");
logoDiv.addEventListener("click", removeDisplay1);

// background and death audio
var BGAudio = new Audio("./audio/FinalFantasy.mp3");
var deathAudio = new Audio("./audio/FinalFantasyDead.mp3");

// remove initial logo

function removeDisplay1() {
    logoDiv.className += "logoDivAnim";
    delayAction(removeDisplay2, 1.5);
    logoDiv.removeEventListener("click", removeDisplay1);
    
    BGAudio.volume = 0.1;
    BGAudio.play();
};

function removeDisplay2(){
    logoDiv.style.display = "none";
    logoDiv.className = "";
}

// add logo at end

function addDisplay(){
    logoDiv.style.display = "initial";
    logoDiv.className += "logoDivAnim2";
    delayAction(addDisplayP2, 1.5);
}

function addDisplayP2 (){
    logoDiv.style.opacity = 1;
}