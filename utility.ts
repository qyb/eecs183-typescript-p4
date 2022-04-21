const MAX_GRID_SIZE = 8;

const MAX_NUM_SHIPS = 5;
const MAX_ROUNDS = 20;

const EASY = 'E';
const MEDIUM = 'M';
const EMULATE = 'S';

const EMPTY_LETTER = "-".charCodeAt(0);
const SHIP_LETTER = "*".charCodeAt(0);
const HIT_LETTER = "O".charCodeAt(0);
const MISS_LETTER = "X".charCodeAt(0);

const charCodeA = "A".charCodeAt(0);

/**
 * Requires: Nothing.
 * Modifies: cout.
 * Effects:  Prints grid.
 */
function print_grid(grid: Int8Array): void {
    process.stdout.write("    ");
    for (let i = 0; i < MAX_GRID_SIZE; i++) {
        process.stdout.write(`${String.fromCharCode(charCodeA + i)}   `);
    }
    process.stdout.write("\n\n");

    for (let i = 0; i < MAX_GRID_SIZE; i++) {
        // letter
        process.stdout.write(`${i+1}   `);
        for (let j = 0; j < MAX_GRID_SIZE; j++) {
            process.stdout.write(`${String.fromCharCode(grid[i * MAX_GRID_SIZE + j])}   `);
        }
        process.stdout.write("\n\n");
    }
}

/**
 * Requires: Nothing.
 * Modifies: cout.
 * Effects:  Prints initial header.
 */
function print_initial_header(): void {
    console.log("----------------------------------------");
    console.log("               EECS 183                 ");
    console.log("              Battleship                ");
    console.log("----------------------------------------\n");
}

/**
 * Requires: Nothing.
 * Modifies: cout.
 * Effects:  Prints menu.
 */
function print_menu(): string {
    console.log("\n         Menu Options         ");
    console.log("------------------------------");
    console.log("1) Play against easy AI");
    console.log("2) Play against medium AI (S'more)");
    console.log("3) Play while emulating CPU (CPU moves entered by player)");
    console.log("4) Quit\n");
    return prompt("Choice --> ");
}

/**
 * Requires: Nothing.
 * Modifies: cout.
 * Effects:  Prints closer.
 */
function print_closer(): void {
    console.log("\n----------------------------------------");
    console.log("           Thanks for playing           ");
    console.log("              Battleship                ");
    console.log("----------------------------------------\n");
}

/**
 * Requires: Nothing.
 * Modifies: Nothing.
 * Effects:  Returns a random integer.
 */
function get_random_number(): number {
    let seconds = Math.round(Date.now() / 1000);
    return Math.floor(Math.random() * seconds);
}

/**
 * Requires: Nothing.
 * Modifies: cin, cout.
 * Effects:  Prints menu and continously gets menu choice from
 *           keyboard input until a choice in the valid range is entered.
 */
function get_menu_choice(): number {
    let menu_choice = parseInt(print_menu());
    while (menu_choice < 1 || menu_choice > 4) {
        console.log("Invalid menu choice");
        menu_choice = parseInt(print_menu());
    }
    console.log("");
    return menu_choice;
}


import PromptSync from 'prompt-sync';
const prompt = PromptSync({
    sigint: true
});

export {
    MAX_GRID_SIZE,
    MAX_NUM_SHIPS,
    MAX_ROUNDS,
    EASY, MEDIUM, EMULATE,
    EMPTY_LETTER, SHIP_LETTER, HIT_LETTER, MISS_LETTER,
    charCodeA,
    print_grid,
    print_initial_header,
    print_closer,
    get_random_number,
    get_menu_choice,
    prompt
};
