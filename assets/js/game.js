// Made By Ryan Jepson

var player = {
    name: "",
    health: 100,
    baseHealth: 100,
    attack: 7,
    money: 10,
    totalDamage: 0,
    reset: function() {
        this.health = 100;
        this.baseHealth = 100;
        this.money = 10;
        this.attack = 7;
    },
    attackPlus: function() {
        this.money -= 15;
        this.attack += 5;
    },
    baseHealthPlus: function() {
        this.money -= 20;
        this.baseHealth += 20;
    },
    heal: function() {
        this.money -= 10;
        this.health += 20;
    }
}

var enemysName = ["Roborto", "Galotron", "Exo-bot", "X-69420", "Ultron The Destroyer"];
var enemysHealth = [randomBetween(10, 45), randomBetween(10, 65), randomBetween(15, 82), randomBetween(15, 102), randomBetween(20, 140)];
var enemysAttack = [7, 10, 14, 18, 25];
var enemysReward = [10, 20, 30, 40, 50];
var indexEnemy = 0;
var enemyName = enemysName[indexEnemy];
var enemyHealth = enemysHealth[indexEnemy];
var enemyAttack = enemysAttack[indexEnemy];
var newRound = true;
var heal = true;
var hasFought = 0;
var end_Game = false;
var start_Game = true;
var finish = false;
    
function randomBetween(a, b) {
    var value = Math.floor(Math.random() * a + b);
    return value;
   }

function start_game() {
    window.alert("Welcome to Robot Gladiators!");
    player.name = window.prompt("What is your robot's name?");
    
    return player.name;
}

function end_game() {
    window.alert("Your final stats were: Health: " + player.health + " Base Attack: " + (player.attack + 3) + " Total Money: " + player.money + " Total Attack Damage: " + player.totalDamage + ".");
    var again = window.confirm("Thank you for playing! Would you like to play again?");
    if (again) {
        return start_Game = true;
    }
    else {
        return end_Game = true;
    }
}

function fight() {
    if (indexEnemy === 5) {
        window.alert("Congragulations you defeated all the enemy robots! YOU WIN!");
        return finish = true;
    }
    else if (newRound) {
        window.alert("Enemy " + enemyName + " has entered the battle! They have " + enemyHealth + " total health and " + (enemyAttack + 3) + " base attack.");
        newRound = false;
        window.alert("Your health is: " + player.health + " and your base attack is: " + (player.attack + 3) + " and you have: " + player.money + " dollars.");
    }
    var damagePlayer = randomBetween(7, player.attack);
    player.totalDamage = player.totalDamage + damagePlayer;
    enemyHealth = Math.max(0, enemyHealth - damagePlayer);

    if (enemyHealth <= 0) {
        window.alert(player.name + " killed " + enemyName + "!");
        window.alert(player.name + " Won and gained " + enemysReward[indexEnemy] + " dollars!");
        player.money = player.money + enemysReward[indexEnemy];
        indexEnemy = indexEnemy + 1;
        enemyName = enemysName[indexEnemy];
        enemyAttack = enemysAttack[indexEnemy];
        enemyHealth = enemysHealth[indexEnemy];
        newRound = true;
    }

    else {
        window.alert(player.name + " attacked " + enemyName + " and delt " + damagePlayer + " damage. " + enemyName + " now has " + enemyHealth + " health left. You gained $" + (enemysReward[indexEnemy] / 10));
        player.money = player.money + (enemysReward[indexEnemy] / 10);
        var damageEnemy = randomBetween(7, enemyAttack);
        player.health = Math.max(0, player.health - damageEnemy);

        if (player.health <= 0) {
            window.alert(enemyName + " killed " + player.name + "!");
            window.alert("Game Over");
            return finish = true;
        }

        else {
            window.alert(enemyName + " attacked " + player.name + " and delt " + damageEnemy + " damage. " +  player.name + " now has " + player.health + " health left.");
        }
    }
    hasFought = hasFought + 1;
}

function skip() {
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this round? Enter 'FIGHT' or 'SKIP' to chose.");
        promptFight = promptFight.toUpperCase().trim();
    if (promptFight === "SKIP") {
        var skip = window.confirm("If you skip this round  you will lose 2 dollars. You currently have $" + player.money + ". Do you still want to skip? YES or NO?");
        if (skip) {
            if ((player.money - 2) < 0) {
                window.alert("You do not have enough money to skip you must attack.")
                return "Fight";
            }
            else {
                window.alert("You have skiped the round and lost 2 dollars");
                player.money = player.money - 2;
                return "Store";
            }
        }
        else {
            return "Fight";
        }
    }

    else if (promptFight === "FIGHT") {
        return "Fight";
    }

    else {
        return "Error";
    }
}

function store_or_heal() {
    while (true) {
        var store = window.prompt("Would you like to heal your self by 25% of your BASE HEALTH for free or buy items at the shop? Enter 'HEAL' or 'SHOP' or 'EXIT' (To return to battling).");
        store = store.toUpperCase().trim();
        if (store === "HEAL") {
            if (hasFought >= 2) {
                var playerHealthTemp = player.health + (player.baseHealth * .25);
                hasFought = 0;
                if (player.healthTemp > player.baseHealth) {
                    player.health = player.baseHealth;
                }
                else {
                    player.health = player.healthTemp;
                }
                window.alert(player.name + "'s health is now " + player.health + "!");
            }
            else {
                window.alert("You can only heal after fighting at least 2 times, and you can not heal back to back.");
            }
        }

        else if (store === "SHOP") {
            while (true) {
                window.alert("You currently have $" + player.money + ".");
                var item = window.prompt("What would like to buy? Increase Max Health (IMH) $20, Increase Attack Damage (AD) $15, or Heal 20 Damage (H) $10? Please enter either IMH, AD, H or E to exit the store.");
                item = item.toUpperCase().trim();

                if (item === "IMH") {
                    var confirmBuy = confirmPurchase(20, "Increase Max Health");
                    if (confirmBuy) {
                        if ((player.money - 20) < 0) {
                            window.alert("You Dont have enough money to buy this.");
                        }
                        else {
                            player.baseHealthPlus();
                            window.alert("Your max health is now " + player.baseHealth + " and you now have " + player.money + " dollars left.");
                        }
                    }
                    else {
                        store_or_heal();
                    }
                }

                else if (item === "AD") {
                    var confirmBuy = confirmPurchase(15, "Increase Attack Damage");
                    if (confirmBuy) {
                        if ((player.money - 15) < 0) {
                            window.alert("You Dont have enough money to buy this.");
                        }
                        else {
                            player.attackPlus();
                            window.alert("Your base attack damage is now " + (player.attack + 3)+ " and you now have " + player.money + " dollars left.");
                        }
                    } 
                }

                else if (item === "H") {
                    var confirmBuy = confirmPurchase(10, "Increase Health by 20");
                    if (confirmBuy) {
                        if ((player.money - 10) < 0) {
                            window.alert("You Dont have enough money to buy this.");
                        }
                        else if (player.health === player.baseHealth) {
                            window.alert("Your Health is already at its max! Please purchase more health to heal more.");
                        }
                        else {
                            player.money = player.money - 10;
                            if ((player.health + 20) > player.baseHealth) {
                                player.health = player.baseHealth;
                            }
                            else {
                                player.heal();
                            }
                            window.alert("Your health is now " + player.health + " and you now have " + player.money + " dollars left.");
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
            fight();
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

while (true) {
    if (finish) {
        end_game();
        if (end_Game){
            window.alert("Thank you for playing Robot Gladiators!");
            break;
        } 
        else {
            finish = false;
        }
    }

    else if (start_Game) {
        start_game();
        console.log(player.name);
        start_Game = false;
        player.reset();

        indexEnemy = 0;
        enemyName = enemysName[indexEnemy];
        enemyHealth = enemysHealth[indexEnemy];
        enemyAttack = enemysAttack[indexEnemy];
        newRound = true;
        heal = true;
        hasFought = 0;

    }

    else {
        var fightOrFlight = skip();
        if (fightOrFlight === "Fight") {
            fight();
        }
        else if (fightOrFlight === "Store") {
            store_or_heal();
        }
        else {
            continue;
        }
    }
    
}
