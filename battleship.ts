import Player from "./Player";
import Game from "./Game";
import {
    prompt,
    EASY, MEDIUM, EMULATE,
    MAX_ROUNDS,
    print_initial_header,
    print_closer,
    get_menu_choice
} from "./utility";

function battleship(): void {
    // print the welcome message and get p1 name
    print_initial_header();
    let p1_name = prompt("Enter your name: ")

    // create two Player instances, p2 is always named CPU
    let p1 = new Player(p1_name);
    let p2 = new Player("CPU");

    // initialize grid from file or random
    let p1_mode = prompt("Read your grid from file grid1.txt? (y or n): ");
    let p2_mode = prompt("Read your grid from file grid2.txt? (y or n): ");

    // declare and Game instance, set values
    let battleship: Game;
    if (p1_mode == 'y' && p2_mode == 'y') {
        battleship = new Game(p1, "grid1.txt", p2, "grid2.txt");
    } else if (p1_mode == 'y' && p2_mode == 'n') {
        battleship = new Game(p1, "grid1.txt", p2, "");
    } else if (p1_mode == 'n' && p2_mode == 'y') {
        battleship = new Game(p1, "", p2, "grid2.txt");
    } else if (p1_mode == 'n' && p2_mode == 'n') {
        battleship = new Game(p1, "", p2, "");
    } else {
        console.log("Error in input");
        return;
    }

    // get menu choice and play game
    let menu_choice = get_menu_choice();
    if (menu_choice == 1) {
        console.log("Starting game with EASY AI\n");
        battleship.start(EASY, MAX_ROUNDS);
    } else if (menu_choice == 2) {
        console.log("Starting game with MEDIUM AI\n");
        battleship.start(MEDIUM, MAX_ROUNDS);
    } else if (menu_choice == 3) {
        console.log("Starting game with CPU EMULATION\n");
        battleship.start(EMULATE, MAX_ROUNDS);
    }

    print_closer();
}

export default battleship;
