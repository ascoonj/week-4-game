$(document).ready(function() {
//DECLARING GLOBAL VARIABLES
//-----------------------------------------------------------------------------------------------------


//create an audio variable, and set it to play on repeat when the page loads
var x = document.getElementById("myAudio"); 
x.play();
x.loop = true;

//An array of objects, each of which holds and individual panther character
var panthers = [

    {
        name: "M'baku",
        healthPoints: 165,
        attackPower: 5,
        pantherImg: "assets/images/mbaku1.jpg",
        container: $("<div>")
    },

    {
        name: "Okoye",
        healthPoints: 160,
        attackPower: 6,
        pantherImg: "assets/images/okoye1.jpg",
        container: $("<div>")

    },

    {
        name: "T'challah",
        healthPoints: 145,
        attackPower: 10,
        pantherImg: "assets/images/tchallah1.jpg",
        container: $("<div>")
    },

    {
        name: "Nakia",
        healthPoints: 150,
        attackPower: 13,
        pantherImg: "assets/images/nakia1.jpg",
        container: $("<div>")
    },

    {
        name: "W'kabi",
        healthPoints: 140,
        attackPower: 15,
        pantherImg: "assets/images/wkabi1.jpg",
        container: $("<div>")
    },

];

var yourChar;
var yourCharIndex;
var opponentChar;
var oppoCharIndex;
var opponents = [];


// Create a clickable image of each character within a div
// that can be called to display characters in any part of the DOM

var displayPanther = function (index, location) {

    //empty the individual panther character's container
    panthers[index].container.empty();

    //create a new div, with a new class, and assign the panther's name as text
    var charHeading = $("<div>");
    charHeading.addClass("char-name");
    charHeading.text(panthers[index].name);

    //create a new div, wih a new class, to hold the panther's image
    var charImg = $("<img>");
    charImg.addClass("char-img");
    charImg.attr("src", panthers[index].pantherImg);

    //create a new div, with a new class, and add the panther's HP as text
    var charHP = $("<div>");
    charHP.addClass("char-healthpower");
    charHP.text("HP: " + panthers[index].healthPoints);

    //for each character in the panther's array, add a data element with a value equal to the array index, and add a new class
    panthers[index].container.attr("data-pIndex", index).addClass("eachChar");
    //add the newly created divs to each panther's div
    (panthers[index].container).append(charHeading).append(charImg).append(charHP);
    //append each panther's div to a location on the DOM
    location.append(panthers[index].container);

};

//Loop through the panthers array, printing each panther's container to the the screen in the div displaying 
//all characters from which the user will select their player
for (var i = 0; i < panthers.length; i++) {

    displayPanther(i, $("#allCharacters"));
};

//Function created to allow the user to choose a player, and to subsequently display and hide elements as needed
var chooseYourChar = function () {

    $("#allCharacters").on("click", ".eachChar", function () {
        $(this).addClass("myChar").removeClass("eachChar");
        $(".myChar").removeClass("eachChar");
        $(this).appendTo("#selectedChar");
        $(".eachChar").addClass("enemyChar").removeClass("eachChar");
        $(".enemyChar").appendTo("#availableEnemies");
        $("#selectheader").hide();
        $("#yourCharHeader").show();


    });
};

chooseYourChar();

//Function created to allow the user to choose an opponent, and to subsequently display and hide elements as needed
var chooseYourOppo = function () {

    // if ($("#selectedChar").children().length == 1) {
    // console.log(($("#selectedChar").children().length));

    $("#availableEnemies").on("click", ".enemyChar", function () {
        $(this).addClass("oppoChar").removeClass("enemyChar");
        $(this).appendTo("#selectedOpp");
        $("#availableEnemies").hide();
        $("#enemiesHeader").hide();
        $("#oppHeader").show();
        $(".gameMsg").show();

        console.log(($(".oppoChar").children().length));
        console.log(($("#selectedChar").children().length));

    });
    
};

chooseYourOppo();


$(".newGame").on("click", function () {
    location.reload();
});


var fightOppo = function () {

//Use this variable to set multiples of player character's attack power to hit opponent with.
    var numOfAttacks = 0; 


    //when the user clicks the attach button:
    $("#attackbutton").on("click", function () {
        console.log($("#selectedChar").children().length == 1);
        //make sure that exactly one opponent has been selected
        if ($("#selectedOpp").children().length == 1) {
            numOfAttacks++; //If there is an opponent, increase the player's HP multiplier by 1.

            //save the player and opponent's data-pIndex values into variables (previously declared globally)
            yourCharIndex = ($(".myChar").attr("data-pIndex"));
            oppoCharIndex = ($(".oppoChar").attr("data-pIndex"));
            
            //decrease the player's health points by the opponents attack power
            panthers[yourCharIndex].healthPoints -= panthers[oppoCharIndex].attackPower;
            //and decrease the opponent's health points by the player's current attack power
            panthers[oppoCharIndex].healthPoints -= (panthers[yourCharIndex].attackPower * numOfAttacks);

            console.log("Your Health Power: " + panthers[yourCharIndex].healthPoints);
            console.log("Opponent's Health Power: " + panthers[oppoCharIndex].healthPoints);

            displayPanther(yourCharIndex, $("#selectedChar")); //re-display the player's card to reflect updated HP
            displayPanther(oppoCharIndex, $("#selectedOpp")); //re-display the opponents's card to reflect updated HP

            //display a message informing the player's and opponent's attack values
            $("#gameUpdates").text("You hit " +
                panthers[oppoCharIndex].name +
                " for " + (panthers[yourCharIndex].attackPower * numOfAttacks) + " damage. " +
                panthers[oppoCharIndex].name + " hit you for " + panthers[oppoCharIndex].attackPower + " damage.");

            //if the player loses, display a loss message on screen, hide the attack button and reveal the restart button so the player has
            //the option to restart the game
            if (panthers[yourCharIndex].healthPoints <= 0) {
                $("#gameFinal").text("Your Health Power has been depleted. You lose! Click the 'Restart' button to begin a new game.");
                $("#attackbutton").hide();
                $(".newGame").show();

            // if the opponent beats the current opponent display a message indicating that the opponent was defeated
            } else if (panthers[oppoCharIndex].healthPoints <= 0) {
                //display a message indicating that the opponent was defeated
                $("#gameUpdates").text("You have defeated " + panthers[oppoCharIndex].name + ".")
                //check to see if there any other opponents left to be to played
                if ($("#availableEnemies").children().length > 0) {
                    //if there are, display instruction to select another opponent
                    $("#gameUpdates").append(" Select another opponent to continue fighting.");
                }
                //display the enemies left to be played and the correpsonding header
                $("#enemiesHeader").show();
                $("#availableEnemies").show();
                //empty the selected opponent div, and hide the corresponding header
                $("#selectedOpp").empty();
                $("#oppHeader").hide();
                //allow the player to select a new opponent
                chooseYourOppo();

                //console.log("available Enemies: " + $("#availableEnemies").children().length);

                //check to see if all opponents have been played
                if ($("#availableEnemies").children().length == 0) {
                    //display winning message
                    $("#gameFinal").text("You have defeated all your opponents! You reign!");
                    //hide all irrelevant divs/ messages
                    $("#fightHeader, #enemiesHeader, #attackbutton, #gameUpdates").hide();
                    //display the restart button to give the user the option to restart the game
                    $(".newGame").show();
                }

            }
        //check to see if there is an opponent to play the game
        //if there is no opponent (and the attack button has been clicked), display an error message
        } else if ($("#selectedOpp").children().length == 0) {
            $("#gameUpdates").text("No enemy here. Select an opponent.")
        };
    });
};

fightOppo();

});