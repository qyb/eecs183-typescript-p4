import startTests from "./test";
import battleship from "./battleship";
import {prompt} from './utility';

(function() {

    console.log("-------------------------------");
    console.log("EECS 183 Project 4 Menu Options");
    console.log("-------------------------------");
    console.log("1) Execute testing functions in test.cpp");
    console.log("2) Execute battleship() function to play game");
    let choice = prompt("Choice --> ");

    if (choice == "1") {
        startTests();
    } else if (choice == "2") {
        battleship();
    }
})();
