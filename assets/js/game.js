window.alert("Welcome to Robot Gladiators!");
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

console.log(playerName, playerHealth, playerAttack);

var enemyName = "Roborto"
var enemyHealth = 50;
var enemyAttack = 10;

function fight() {
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to chose.");
    promptFight = promptFight.toUpperCase().trim();
    console.log(promptFight);
    if (promptFight === "FIGHT") {

        enemyHealth = enemyHealth - playerAttack;

        if (enemyHealth <= 0) {
            window.alert(playerName + " killed " + enemyName + "!");
            window.alert(playerName + " Won!");
            stop();
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


    }

    else if (promptFight == "SKIP") {
        var skip = window.confirm("If you skip this fight you will lose 2 dollars. Do you still want to skip? YES or NO?");
        if (skip) {
            window.alert("You have skiped the battle and lost 2 dollars");
            playerMoney = playerMoney - 2;
        }

        else {
            fight();
        }
    }

    else {
        fight();
    }

    
}

while (playerHealth => 0) {
    fight();
}
