// -------------------- 'fight' function triggers whenever the fight option is chosen with a character -------------------- //

function fight() {
    for (i = 0; i <= 3; i++){
        if (i == activeCharVar && charStats[i].status == "alive"){
            enemyDemo.currentHp = enemyDemo.currentHp + charStats[i].baseAttack;
            addWep(i);
            
            if(i == 0) {
                attackCan();
            }
            
            if(i == 1) {
                attackPickle();
            }
            
            if(i == 2) {
                attackKitkat();
            }
            
            if(i == 3) {
                attackChopstick();
            }
            
            enemyDamagePopup(charStats[i].baseAttack);
            delayHPAction();
            delayAction(enemyHit, 0.25);
        }
    }
}

// -------------------- Functions for making damage popups and weapons appear (and removing them) -------------------- //

function enemyDamagePopup(damage) {
    var popup = document.createElement("div");
    popup.className += "enemyDPU";
    popup.innerText = damage;
    enemyDiv.appendChild(popup);
    setTimeout(
            function() {
                enemyDiv.removeChild(popup);
                }, 
            1000);
}

function playerDamagePopup(damage, dingDong) {
    var popup = document.createElement("div");
    popup.className += "playerDPU";
    popup.innerText = damage;
    chars[dingDong].appendChild(popup);
    setTimeout(
            function() {
                chars[dingDong].removeChild(popup);
                }, 
            1000);
}
function addWep(wep) {
    var weapon = document.createElement("img");
    weapon.className += "wepImg";
    if (activeCharVar <= 1) {
        weapon.className += " attack1";
    }
    else if (activeCharVar >= 2) {
        weapon.className += " attack2";
    }
    weapon.src = wepImgs[wep];
    chars[wep].appendChild(weapon);
    
    setTimeout(
        function() {
            chars[wep].removeChild(weapon);
            }, 
        1000);

}

function addEnemyWep() {
    var enemyWeapon = document.createElement("img");
    enemyWeapon.className += "enemyWepImg";
    enemyWeapon.className += " attack1";
    enemyWeapon.src = "../artwork/weapons/weapon-dragonScimitar.png";
    enemyDiv.appendChild(enemyWeapon);
    delayAction(createEnemySound, 0.25);
    
    setTimeout(
        function() {
            enemyDiv.removeChild(enemyWeapon);
            }, 
        1000);
}

// -------------------- Define character / enemy hp div (enemy hp will probably remain hidden except in testing) -------------------- //

var enemyHpSpan = document.getElementById("enemyHpSpan");
var charHpSpans = document.getElementsByClassName("charHpSpan");

// -------------------- Update the character and enemy hp divs with new currentHp value, also ensure hp doesn't dip below 0 -------------------- //

function menuUpdate() {
    if (enemyDemo.currentHp <= 0) {
        enemyDemo.currentHp = 0;
    }
    
    for(i = 0; i <= 3; i++){
        if(charStats[i].currentHp <= 0){
            charStats[i].currentHp = 0;
            charStats[i].status = "dead";
            // making them turn sideways works but need to implement a function to check if dead at the beggining of a battle. well i think that funciton already exists but we need to add a thing to turn them sideways in that function, and make it happen by default without being animated //
            charImgs[i].classList.add("deadChar");
        }
        
        charHpSpans[i].innerHTML = charStats[i].currentHp + " / " + charStats[i].maxHp + " HP <br/>";
    }
    
//    enemyHpSpan.innerHTML = "<br/>" + enemyDemo.name + ": " + enemyDemo.currentHp + " / " + enemyDemo.maxHp + " HP <br/>";
}

//delays menuUpdate so the values don't update as soon as the enemy attack animation starts
function delayHPAction() {
    var charVar = setTimeout(menuUpdate, 500);
}

// -------------------- Functions for the enemy's attack. Uses RNG to determine which attack to use -------------------- //

function enemyAttack() {
    
    switch(RNG(6)) {
        case 1:
        case 2:
        case 3:
            enemyDemo.attackType[0]();
            break;
        case 4:
        case 5:
            enemyDemo.attackType[1]();
            break;
        case 6: 
            enemyDemo.attackType[2]();
            break;
    }
    delayHPAction();
    delayAction(theAction2, 1);
    
}

function RNG(randNum) {
    return Math.floor(((Math.random()) * randNum) + 1); 
}

// -------------------- Function for delaying other functions -------------------- //

function delayAction(fun, s) {
    var charVar = setTimeout(fun, ((s)*1000));
}

// -------------------- Function for making the next character in line active, also resets cursorPos to 1-------------------- //

function theAction() {
    for(i = activeCharVar; i <= 2; i++){
        
        activeCharVar++;
        
        chars[i].classList.remove("activeChar");
        
        if(charStats[activeCharVar].status == "alive"){
            console.log("activeCharVar: " + activeCharVar);
            chars[0].classList.remove("activeChar");
            chars[1].classList.remove("activeChar");
            chars[2].classList.remove("activeChar");
            chars[activeCharVar].classList.add("activeChar");
            cursorPos = 1;
            break;
        }
    }
    
/*  ~~~~~~~~~~~~~~  RE-ADD event listener after to prevent multiple "enter" instances  ~~~~~~~~~~~~~~  */ 
    document.addEventListener("keyup", menuInputs);
    
    checkDeath();
}

// -------------------- Similar to theAction, but designed for when the last player attacks - resets active character to 0 -------------------- //

function theAction2() {

        activeCharVar = 0;
//        console.log("activeCharVar: " + activeCharVar);
        chars[activeCharVar].classList.add("activeChar");
        cursorPos = 1;

    
/*  ~~~~~~~~~~~~~~  RE-ADD event listener after to prevent multiple "enter" instances  ~~~~~~~~~~~~~~  */ 
        document.addEventListener("keyup", menuInputs);
        checkDeath();
}

// -------------------- Damage popups -------------------- //

function charHit(character) {
    var toDo = 0;
    for (k = 0; k <= 1; k++) {
        toDo += ((k+1) + (250*(1/3)));
        setTimeout(function() { charImgs[character].src =  sprite[character][1];}, toDo);
        toDo += ((k+1) + (250*(1/3)));
        setTimeout(function() { charImgs[character].src =  sprite[character][2];}, toDo);
        toDo += ((k+1) + (250*(1/3)));
        setTimeout(function() { charImgs[character].src =  sprite[character][0];}, toDo);
    }
    playerDamagePopup(enemyAttackValue, character);
    
}

function enemyHit() {
    var toDo2 = 0;
    for (j = 0; j <= 1; j++) {
        toDo2 += ((j+1) + (250*(1/3)));
        setTimeout(function() { enemyImgs[0].src =  elfmanSprite[1];}, toDo2);
        toDo2 += ((j+1) + (250*(1/3)));
        setTimeout(function() { enemyImgs[0].src =  elfmanSprite[2];}, toDo2);
        toDo2 += ((j+1) + (250*(1/3)));
        setTimeout(function() { enemyImgs[0].src =  elfmanSprite[0];}, toDo2);
        
    }
}