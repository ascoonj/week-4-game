$(document).ready(function () {


    //DECLARING GLOBAL VARIABLES
    //-----------------------------------------------------------------------------------------------------

    // Create an array of character options
    var panthers = [

        {
            name: "M'baku",
            healthPoints: 170,
            attackPower: 10,
            pantherImg: "assets/images/mbaku1.jpg"
        },

        {
            name: "Okoye",
            healthPoints: 160,
            attackPower: 15,
            pantherImg: "assets/images/okoye1.jpg"
        },

        {
            name: "T'challah",
            healthPoints: 145,
            attackPower: 18,
            pantherImg: "assets/images/tchallah1.jpg"
        },

        {
            name: "Nakia",
            healthPoints: 130,
            attackPower: 22,
            pantherImg: "assets/images/nakia1.jpg"
        },

        {
            name: "W'kabi",
            healthPoints: 120,
            attackPower: 25,
            pantherImg: "assets/images/wkabi1.jpg"
        },

    ];

    var yourChar;
    var opponentChar;
    var opponents = [];
    var haveChar = false;
    var haveDefender = false;
    var wins = 0;
    var losses = 0;
    var charsDiv = $("#allCharacters");

// Create a clickable image of each character within a div

for (var i = 0; i< panthers.length; i++) {

var charHolder = $("<div">);
charHolder.addClass("eachChar");
charHolder.attr("id", panthers[i].name)


var charHeading = $("<div>");
charHeading.addClass("char-name");
charHeading.text(panthers[i].name);

var charImg = $("<img>");
charImg.addClass("char-img");
charImg.attr("src", panthers[i].pantherImg);

var charHP = $("<div>");
charHP.addClass("char-healthpower");
charHP.text("HP: " + panthers[i].healthPoints);

charHolder.append(charHeading).appeand(charImg).append(charHP);

charsDiv.append(charHolder);

};












});