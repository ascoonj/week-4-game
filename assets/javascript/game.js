//DECLARING GLOBAL VARIABLES
//-----------------------------------------------------------------------------------------------------

// Create an array of character options
var panthers = [

    {
        name: "M'baku",
        healthPoints: 170,
        attackPower: 10,
        pantherImg: "assets/images/mbaku1.jpg",
        container: $("<div>")
    },

    {
        name: "Okoye",
        healthPoints: 160,
        attackPower: 15,
        pantherImg: "assets/images/okoye1.jpg",
        container: $("<div>")

    },

    {
        name: "T'challah",
        healthPoints: 145,
        attackPower: 28,
        pantherImg: "assets/images/tchallah1.jpg",
        container: $("<div>")
    },

    {
        name: "Nakia",
        healthPoints: 130,
        attackPower: 22,
        pantherImg: "assets/images/nakia1.jpg",
        container: $("<div>")
    },

    {
        name: "W'kabi",
        healthPoints: 120,
        attackPower: 25,
        pantherImg: "assets/images/wkabi1.jpg",
        container: $("<div>")
    },

];

var yourChar;
var yourCharIndex;
var opponentChar;
var oppoCharIndex;

var opponents = [];
var haveChar = false;
var haveDefender = false;
var wins = 0;
var losses = 0;
//var charsDiv = $("#allCharacters");

// Create a clickable image of each character within a div

var displayPanther = function (index, location) {

    panthers[index].container.empty();

    var charHeading = $("<div>");
    charHeading.addClass("char-name");
    charHeading.text(panthers[index].name);

    var charImg = $("<img>");
    charImg.addClass("char-img");
    charImg.attr("src", panthers[index].pantherImg);

    var charHP = $("<div>");
    charHP.addClass("char-healthpower");
    charHP.text("HP: " + panthers[index].healthPoints);

    panthers[index].container.attr("data-pIndex", index).addClass("eachChar");
    (panthers[index].container).append(charHeading).append(charImg).append(charHP);
    location.append(panthers[index].container);

    // if (yourChar == false) {
    //     yourCharIndex = i;
    //     yourChar = 
    // }

};


for (var i = 0; i < panthers.length; i++) {

    displayPanther(i, $("#allCharacters"));
};


var chooseYourChar = function () {

    $("#allCharacters").on("click", ".eachChar", function () {
        // yourCharIndex = ($(this).attr("data-pIndex"));
        // yourChar = panthers[yourCharIndex].name;
        // console.log(yourChar);
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


var chooseYourOppo = function () {

    //   if ($("#selectedChar").children().length == 1) {
    console.log(($("#selectedChar").children().length));

    $("#availableEnemies").on("click", ".enemyChar", function () {
        //opponentChar = ($(this).attr("data-pIndex"));
        // console.log(opponentChar);    
        $(this).addClass("oppoChar").removeClass("enemyChar");
        $(this).appendTo("#selectedOpp");
        //$(".myChar").removeClass("eachChar");
        $("#availableEnemies").hide();
        $("#enemiesHeader").hide();
        $("#oppHeader").show();
        $(".gameMsg").show();

        console.log(($(".oppoChar").children().length));
        console.log(($("#selectedChar").children().length));

    });
    //};
};

chooseYourOppo();


$(".newGame").on("click", function () {
    location.reload();
});


var fightOppo = function () {

    var numOfAttacks = 0;

    $("#attackbutton").on("click", function () {
        console.log($("#selectedChar").children().length == 1);
        if ($("#selectedOpp").children().length == 1) {
            numOfAttacks++;

            yourCharIndex = ($(".myChar").attr("data-pIndex"));
            oppoCharIndex = ($(".oppoChar").attr("data-pIndex"));
            console.log(yourCharIndex); //undefined? why?
            console.log(oppoCharIndex); //undefined? why?

            panthers[yourCharIndex].healthPoints -= panthers[oppoCharIndex].attackPower;
            panthers[oppoCharIndex].healthPoints -= (panthers[yourCharIndex].attackPower * numOfAttacks);

            console.log("Your Health Power: " + panthers[yourCharIndex].healthPoints);
            console.log("Opponent's Health Power: " + panthers[oppoCharIndex].healthPoints);

            displayPanther(yourCharIndex, $("#selectedChar"));
            displayPanther(oppoCharIndex, $("#selectedOpp"));


            $("#gameUpdates").text("You hit " +
                panthers[oppoCharIndex].name +
                " for " + (panthers[yourCharIndex].attackPower * numOfAttacks) + " damage. " +
                panthers[oppoCharIndex].name + " hit you for " + panthers[oppoCharIndex].attackPower +
                " damage.");

            if (panthers[yourCharIndex].healthPoints <= 0) {
                $("#gameFinal").text("Your Health Power has been depleted. You lose! Click the 'Restart' button to begin a new game.");
                $("#attackbutton").hide();
                $(".newGame").show();

            } else if (panthers[oppoCharIndex].healthPoints <= 0) {
                $("#gameUpdates").text("You have defeated " + panthers[oppoCharIndex].name + ".")
                if ($("#availableEnemies").children().length > 0) {
                    $("#gameUpdates").append(" Select another opponent to continue fighting.");
                }
                $("#enemiesHeader").show();
                $("#availableEnemies").show();
                $("#selectedOpp").empty();
                $("#oppHeader").hide();
                chooseYourOppo();

                console.log("available Enemies: " + $("#availableEnemies").children().length);
                if ($("#availableEnemies").children().length == 0) {
                    $("#gameFinal").text("You have defeated all your opponents! You reign!");
                    $("#fightHeader, #enemiesHeader, #attackbutton, #gameUpdates").hide();
                    $(".newGame").show();
                }

            }

        } else if ($("#selectedOpp").children().length == 0) {
            $("#gameUpdates").text("No enemy here. Select an opponent.")
        };
    });
};

fightOppo();