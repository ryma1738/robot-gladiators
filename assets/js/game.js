var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;

console.log(playerName, playerHealth, playerAttack);

var enemyName = "Roborto"
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function() {
    window.alert("Welcome to Robot Gladiators!");
    enemyHealth = enemyHealth - playerAttack;
    window.alert("Enemy " + enemyName + "'s health now at: " + enemyHealth);
    playerHealth= playerHealth - enemyAttack;
    window.alert(playerName +"'s health now at: " + playerHealth);
    
}

fight();