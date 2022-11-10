
var randomNumber = Math.floor(Math.random() * 6) + 1;
var randomNumber2 = Math.floor(Math.random() * 6) + 1;
var randomImage = "images/" + "dice" + randomNumber + ".png";
var randomImage2 = "images/" + "dice" + randomNumber2 + ".png";
// var randomSource ="images"+
var v1 = document.querySelectorAll("img")[0];
var v2 = document.querySelectorAll("img")[1];
v1.setAttribute("src", randomImage);
v2.setAttribute("src", randomImage2);

if (randomNumber > randomNumber2) {
    document.querySelector("h1").innerHTML = "Player1 won !!"
}
else if (randomNumber == randomNumber2) {
    document.querySelector("h1").innerHTML = "Draw!!"
}
else {
    document.querySelector("h1").innerHTML = "Player2 won !!"
}