var charStats = [];

var char1stats = {
    name: "Player1",
    maxHp: 100,
    currentHp: 100,
    baseAttack: -666,
    weapon: "bare",
    status: "alive",
    runChance: 6
};

var char2stats = {
    name: "Player2",
    maxHp: 100,
    currentHp: 100,
    baseAttack: -420,
    weapon: "bare",
    status: "alive",
    runChance: 6
};

var char3stats = {
    name: "Player3",
    maxHp: 100,
    currentHp: 100,
    baseAttack: -69,
    weapon: "bare",
    status: "alive",
    runChance: 6
};

var char4stats = {
    name: "Player4",
    maxHp: 100,
    currentHp: 100,
    baseAttack: -1,
    weapon: "bare",
    status: "alive",
    runChance: 6
};

charStats.push(char1stats, char2stats, char3stats, char4stats);

var enemyAttackValue = 0;

var enemyDemo = {
    name: "Enemy",
    maxHp: 10000,
    currentHp: 10000,
    attackType: [
        
        function() {
            console.log("Single Target Attack");
            var target = RNG(4);
            console.log(target);
            if (charStats[target - 1].currentHp <= 0) {
                enemyDemo.attackType[0]();
                
            }
            if (charStats[target - 1].currentHp > 0) {
                enemyAttackValue = enemyDemo.attack[RNG(3) - 1];
                charHit(target-1);
                charStats[target - 1].currentHp = charStats[target - 1].currentHp + enemyAttackValue;
                addEnemyWep();
            }
        },
        
        function() {
            console.log("AOE Attack");
            for (var i = 0; i <= 3; i++) {
                if(charStats[i].status == "alive") {
                    enemyAttackValue = enemyDemo.attack[RNG(3) - 1];
                    charStats[i].currentHp = charStats[i].currentHp + enemyAttackValue;
                    charHit(i);
                }
            }
            addEnemyWep();
        },
        
        function () {
            console.log("enemy Heal");
            enemyDemo.currentHp = enemyDemo.currentHp + (Math.floor(enemyDemo.maxHp * 0.05));
        }
    ],
    attack: [
        -50,
        -50,
        -50
    ]
}
                   
                   