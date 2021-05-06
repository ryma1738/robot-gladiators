window.alert("Welcome to Robot Gladiators!");
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerBaseHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

console.log(playerName, playerHealth, playerAttack);

var enemysName = ["Roborto", "Galotron", "Exo-bot", "X-69420", "Ultron The Destroyer"];
var enemysHealth = [50, 75, 90, 110, 150];
var enemysAttack = [12, 14, 17, 20, 30];
var enemysReward = [10, 20, 30, 40, 50];
var indexEnemy = 0;
var enemyName = enemysName[indexEnemy];
var enemyHealth = enemysHealth[indexEnemy];
var enemyAttack = enemysAttack[indexEnemy];
var newRound = true;
var heal = true;
var hasFought = 0;
var end_Game = false;

function fight() {
    if (indexEnemy === 5) {
        window.alert("Congragulations you defeated all the enemy robots! YOU WIN!");
        return end_Game = true;
    }
    else if (newRound) {
        window.alert("Enemy " + enemyName + " has entered the battle! They have " + enemyHealth + " total health and " + enemyAttack + " attack.");
        newRound = false;
        window.alert("Your health is: " + playerHealth + " and your attack is: " + playerAttack + " and you have: " + playerMoney + " dollars.");
    }
    else {
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this round? Enter 'FIGHT' or 'SKIP' to chose.");
        promptFight = promptFight.toUpperCase().trim();
        if (promptFight === "FIGHT") {

            enemyHealth = enemyHealth - playerAttack;

            if (enemyHealth <= 0) {
                window.alert(playerName + " killed " + enemyName + "!");
                window.alert(playerName + " Won and gained " + enemysReward[indexEnemy] + " dollars!");
                playerMoney = playerMoney + enemysReward[indexEnemy];
                indexEnemy = indexEnemy + 1;
                enemyName = enemysName[indexEnemy];
                enemyAttack = enemysAttack[indexEnemy];
                enemyHealth = enemysHealth[indexEnemy];
                newRound = true;
            }

            else {
                window.alert(playerName + " attacked " + enemyName +". " + enemyName + " now has " + enemyHealth + " health left. You gained $" + (enemysReward[indexEnemy] / 10));
                playerMoney = playerMoney + (enemysReward[indexEnemy] / 10);
                playerHealth = playerHealth - enemyAttack;

                if (playerHealth <= 0) {
                    window.alert(enemyName + " killed " + playerName + "!");
                    window.alert("Game Over");
                    return end_Game = true;
                }
        
                else {
                    window.alert(enemyName + " attacked " + playerName +". " + playerName + " now has " + playerHealth + " health left.");
                }
            }
            hasFought = hasFought + 1;

        }

        else if (promptFight == "SKIP") {
            var skip = window.confirm("If you skip this round  you will lose 2 dollars. You currently have $" + playerMoney + ". Do you still want to skip? YES or NO?");
            if (skip) {
                if ((playerMoney - 2) < 0) {
                    window.alert("You do not have enough money to skip you must attack.")
                }
                else {
                    window.alert("You have skiped the round and lost 2 dollars");
                    playerMoney = playerMoney - 2;
                    store_or_heal();
                }
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
        var store = window.prompt("Would you like to heal your self by 25% for free or buy items at the shop? Enter 'HEAL' or 'SHOP' or 'EXIT' (To return to battling).");
        store = store.toUpperCase().trim();
        if (store === "HEAL") {
            if (hasFought >= 2) {
                var playerHealthTemp = playerHealth + (playerBaseHealth * .25);
                hasFought = 0;
                if (playerHealthTemp > playerBaseHealth) {
                    playerHealth = playerBaseHealth;
                }
                else {
                    playerHealth = playerHealthTemp;
                }
                window.alert(playerName + "'s health is now " + playerHealth + "!");
            }
            else {
                window.alert("You can only heal after fighting at least 2 times, and you can not heal back to back.");
            }
        }

        else if (store === "SHOP") {
            while (true) {
                window.alert("You currently have $" + playerMoney + ".");
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
                        else if (playerHealth === playerBaseHealth) {
                            window.alert("Your Health is already at its max! Please purchase more health to heal more.");
                        }
                        else {
                            playerMoney = playerMoney - 10;
                            if ((playerHealth + 20) > playerBaseHealth) {
                                playerHealth = playerBaseHealth;
                            }
                            else {
                                playerHealth = playerHealth + 20;
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
}

function confirmPurchase(dollars, option) {
    var purchase = window.confirm("Please confirm your purchase of $" + dollars + " to " + option + ".");
    return purchase;
}

function endGame() {
    end_Game = true;
    return end_game;
}

while (true) {
    if (end_Game) {
        break;
    }
    else {
        fight();
    }
    
}
window.alert("Thank you for playing! Refresh the page to play again.");