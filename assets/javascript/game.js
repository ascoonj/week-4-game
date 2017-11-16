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
        attackPower: 18,
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
    (panthers[i].container).append(charHeading).append(charImg).append(charHP);
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
        // yourCharIndex = ($(this).attr("data-pindex"));
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


var fightOppo = function () {

    var numOfAttacks = 0;
    if ($(".oppoChar").children().length == 1) {

        $("#attackbutton").on("click", function () {
            numOfAttacks++;

            yourCharIndex = ($(".myChar").attr("data-pindex"));
            oppoCharIndex = ($(".oppoChar").attr("data-pindex"));
            console.log(yourCharIndex); //undefined? why?
            console.log(yourCharIndex); //undefined? why?

            panthers[yourCharIndex].healthPower + -panthers[oppoCharIndex].attackPower;
            panthers[oppoCharIndex].healthPower + -(panthers[yourCharIndex].attackPower * numOfAttacks);

            $("#gameUpdates").text("You hit " +
                panthers[oppoCharIndex].name + " for " + (panthers[yourCharIndex].attackPower * numOfAttacks) + " damage.");

        });
    } else {
        $("#gameUpdates").text("No enemy here.")
    };

};

fightOppo();