window.alert("Welcome to Robot Gladiators!");
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

console.log(playerName, playerHealth, playerAttack);

var enemysName = ["Roborto", "Galotron", "Exo-bot", "X-69420", "Ultron - The Destroyer"];
var enemysHealth = [50, 75, 90, 110, 150];
var enemysAttack = [12, 14, 17, 20, 25];
var indexEnemy = 0;
var enemyName = enemysName[indexEnemy];
var enemyHealth = enemysHealth[indexEnemy];
var enemyAttack = enemysAttack[indexEnemy];
var newRound = true;
var heal = true;

function fight() {
    if (newRound) {
        window.alert("Enemy " + enemyName + " has entered the battle! They have " + enemyHealth + " total health and " + enemyAttack + " attack.");
        newRound = false;
    }
    else {
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this round? Enter 'FIGHT' or 'SKIP' to chose.");
        promptFight = promptFight.toUpperCase().trim();
        if (promptFight === "FIGHT") {

            enemyHealth = enemyHealth - playerAttack;

            if (enemyHealth <= 0) {
                window.alert(playerName + " killed " + enemyName + "!");
                window.alert(playerName + " Won!");
                indexEnemy = indexEnemy + 1;
                enemyName = enemysName[indexEnemy];
                enemyAttack = enemysAttack[indexEnemy];
                enemyHealth = enemysHealth[indexEnemy];
                playerMoney = playerMoney + 25;
                newRound = true;
            }

            else {
                window.alert(playerName + " attacked " + enemyName +". " + enemyName + " now has " + enemyHealth + " health left.");
                playerHealth = playerHealth - enemyAttack;

                if (playerHealth <= 0) {
                    window.alert(enemyName + " killed " + playerName + "!");
                    window.alert("Game Over: Refresh the page to play again!");
                    stop();
                }
        
                else {
                    window.alert(enemyName + " attacked " + playerName +". " + playerName + " now has " + playerHealth + " health left.");
                }
            }
             hasFought = true;

        }

        else if (promptFight == "SKIP") {
            var skip = window.confirm("If you skip this round  you will lose 2 dollars. Do you still want to skip? YES or NO?");
            if (skip) {
                window.alert("You have skiped the round and lost 2 dollars");
                playerMoney = playerMoney - 2;
                store_or_heal();
            }

            else {
                fight();
            }
        }

        else {
            fight();
        }
    }
}

function store() {
    //give players the option to heal or go to store
    //    *if they chose to heal check to see if they healed last time
    //     *If they did heal last time push them back to fight with a error message
    //Give players multiple options for things they can buy and display current health, attack, and money
    //     * Have it be a text field options for catagories with a while loop
    //      * One of the options should be a leave store option which pushes them back to the fight
}

while (playerHealth > 0) {
    fight();
}