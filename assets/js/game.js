window.alert("Welcome to Robot Gladiators!");
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerBaseHealth = 100;
var playerAttack = 10;
var playerMoney = 10;
var playerHealthTemp = 0;

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
var hasFought = false;

function fight() {
    if (indexEnemy === 5) {
        window.alert("Congragulations you defeated all the enemy robots! YOU WIN!");
        break;
    }
    else if (newRound) {
        window.alert("Enemy " + enemyName + " has entered the battle! They have " + enemyHealth + " total health and " + enemyAttack + " attack.");
        newRound = false;
    }
    else {
        window.alert("Your health is: " + playerHealth + " and you have: " + playerMoney + " dollars.");
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this round? Enter 'FIGHT' or 'SKIP' to chose.");
        promptFight = promptFight.toUpperCase().trim();
        if (promptFight === "FIGHT") {

            enemyHealth = enemyHealth - playerAttack;

            if (enemyHealth <= 0) {
                window.alert(playerName + " killed " + enemyName + "!");
                window.alert(playerName + " Won and gained 10 dollars!");
                indexEnemy = indexEnemy + 1;
                enemyName = enemysName[indexEnemy];
                enemyAttack = enemysAttack[indexEnemy];
                enemyHealth = enemysHealth[indexEnemy];
                playerMoney = playerMoney + 10;
                newRound = true;
            }

            else {
                window.alert(playerName + " attacked " + enemyName +". " + enemyName + " now has " + enemyHealth + " health left. You gained 1 dollar");
                playerMoney = playerMoney + 1;
                playerHealth = playerHealth - enemyAttack;

                if (playerHealth <= 0) {
                    window.alert(enemyName + " killed " + playerName + "!");
                    window.alert("Game Over: Refresh the page to play again!");
                    break;
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

function store_or_heal() {
    while (true) {
        var store = window.prompt("Would you like to heal your self by 15% for free or buy items at the shop? Enter 'HEAL' or 'SHOP' or 'EXIT' (To return to battling).");
        store = store.toUpperCase().trim();
        if (store === "HEAL") {
            if (hasFought) {
                playerHealthTemp = playerHealth + (playerBaseHealth * .15);
                hasFought = false;
                if (playerHealthTemp > playerBaseHealth) {
                    playerHealth = playerBaseHealth;
                }
                else {
                    playerhealth = playerHealthTemp;
                }
                window.alert(playerName + "'s health is now " + playerHealth + "!");
            }
            else {
                window.alert("You can only heal after fighting at least 1 time, and you can not heal back to back.");
            }
        }

        else if (store === "STORE") {
            while (true) {
                window.alert("Your currently have $" + playerMoney + ".");
                var item = window.prompt("What would like to buy? Increase Max Health (IMH) $20, Increase Attack Damage (AD) $15, or Heal 20 Damage (H) $10? Please enter either IMH, AD, H or E to exit the store.");
                item = item.toUpperCase().trim();

                if (item === "IMH") {
                    var confirmBuy = confirmPurchase(20, "Increase Max Health");
                    if (confirmBuy) {
                        if ((playerMoney - 20) < 0) {
                            window.alert("You Dont have enough money to buy this.");
                        }
                        else {
                            playerMoney = playerMoney - 20;
                            playerBaseHealth = playerBaseHealth + 20;
                            window.alert("Your max health is now " + playerBaseHealth + " and you now have " + playerMoney + " dollars left.");
                        }
                    }
                    else {
                        store_or_heal();
                    }
                }

                else if (item === "AD") {
                    var confirmBuy = confirmPurchase(15, "Increase Attack Damage");
                    if (confirmBuy) {
                        if ((playerMoney - 15) < 0) {
                            window.alert("You Dont have enough money to buy this.");
                        }
                        else {
                            playerMoney = playerMoney - 15;
                            playerAttack = playerAttack + 5;
                            window.alert("Your attack damage is now " + playerAttack + " and you now have " + playerMoney + " dollars left.");
                        }
                    } 
                }

                else if (item === "H") {
                    var confirmBuy = confirmPurchase(10, "Increase Health by 20");
                    if (confirmBuy) {
                        if ((playerMoney - 10) < 0) {
                            window.alert("You Dont have enough money to buy this.");
                        }
                        else if (playerHealth = playerBaseHealth) {
                            window.alert("Your Health is already at its max! Please purchase more health to heal more.");
                        }
                        else {
                            playerMoney = playerMoney - 10;
                            if ((playerHealth + 20) > playerBaseHealth) {
                                playerHealth = playerBaseHealth;
                            }
                            else {
                                playerhealth = playerhealth + 20;
                            }
                            window.alert("Your health is now " + playerHealth + " and you now have " + playerMoney + " dollars left.");
                        }
                    } 
                }

                else if (item === "E") {
                    break;
                }

                else {
                    
                }
            }
        }

        else if (store === "EXIT") {
            break;
        }

        else {
            store_or_heal();
        }
    }
    //give players the option to heal or go to store
    //    *if they chose to heal check to see if they healed last time
    //     *If they did heal last time push them back to fight with a error message
    //Give players multiple options for things they can buy and display current health, attack, and money
    //     * Have it be a text field options for catagories with a while loop
    //      * One of the options should be a leave store option which pushes them back to the fight
}

function confirmPurchase(dollars, option) {
    var purchase = window.confirm("Please confirm your purchase of $" + dollars + " to " + option + ".");
    return purchase;
}

while (true) {
    fight();
}