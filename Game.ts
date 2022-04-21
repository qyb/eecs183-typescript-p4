import Player from "./Player";
import Position from "./Position";
import Ship from "./Ship";
import {
    get_random_number,
    MAX_GRID_SIZE,
    prompt,
    EMULATE, MEDIUM, EASY,
} from './utility';

class Game {
    /**
     * Requires: Nothing.
     * Modifies: p1, p2.
     * Effects:  Default constructor. Sets both p1 and p2 to a default-constructed player.
     */
    // constructor();

    /**
     * Requires: grid1 and grid2 are filenames and contain valid grid inputs.
     * Modifies: p1, p2, cout
     * Effects:  Non-default constructor.
     *           Sets p1 to player1 and p2 to player2.
     *
     *           If grid1 is an non-empty string, p1's grid should be read from
     *           file grid1 using Player::load_grid_file. If grid1 is empty or the grid
     *           file was not opened successfully, p1's grid should be randomly
     *           generated using a call to generate_random_grid.
     *
     *           If grid2 is an non-empty string, p2's grid should be read from
     *           file grid2 using Player::load_grid_file. If grid2 is empty or the grid
     *           file was not opened successfully, p2's grid should be randomly
     *           generated using a call to generate_random_grid.
     *
     *           When a random grid is generated, it should print the prompt:
     *           "Generating random grid for [name]" where [name] is the name
     *           of the player for which the grid was generated.
     *
     */
    constructor(player1: Player, grid1: string, player2: Player, grid2: string) {
        this.#p1 = player1;
        this.#p2 = player2;

        if (grid1 == "" || !this.#p1.load_grid_file(grid1)) {
            console.log(`Generating random grid for ${player1.get_name()}`);
            this.#generate_random_grid(this.#p1);
        }

        if (grid2 == "" || !this.#p2.load_grid_file(grid2)) {
            console.log(`Generating random grid for ${player2.get_name()}`);
            this.#generate_random_grid(this.#p2);
        }
    }

    /**
     * Requires: Nothing.
     * Modifies: Nothing.
     * Effects:  Returns p1.
     */
    get_p1(): Player {
        return this.#p1;
    }

    /**
     * Requires: Nothing.
     * Modifies: Nothing.
     * Effects:  Returns p2.
     */
     get_p2(): Player {
        return this.#p2;
    }

    /**
     * Requires: player_name is an existing player's name.
     * Modifies: cin, cout.
     * Effects:  Prompts the user for an input and returns it as a string.
     *           Note: no input validation is required here.
     *
     * Prompt:   <player_name> enter your move:
     */
    get_move(player_name: string): string {
        return prompt(`${player_name} enter your move: `);
    }

    /**
     * Requires: Nothing.
     * Modifies: cout.
     * Effects:  Checks if the move entered by player p1 is valid. Move is invalid if
     *           Error 1: it is not a string of length 2 or
     *           Error 2: the row or column is out of bounds on the grid (i.e.,
     *           row is not between 1 and 8 or col is not in between A and H).
     *           Errors should be checked in the above order.
     *           Note: Lowercase letters are considered valid input.
     *           If the move is invalid for either one of the errors, the appropriate
     *           error message should be printed. Returns false immediately
     *           after identifying an error; otherwise returns true.
     *
     * Prompt:   If error 1 occurs, print:
     *           "<p1 name> you entered an invalid input"
     *
     *           If error 2 occurs, print:
     *           "<p1 name> you entered an invalid position"
     *
     *           Note: move format is '[1-8][A-H]' i.e "1A", "3b"
     */
    check_valid_move(move: string): boolean {
        if (move.length != 2) {
            console.log(`${this.#p1.get_name()} you entered an invalid input`);
            return false;
        }

        let row = parseInt(move[0]);
        let col = move[1].toUpperCase();
        if (isNaN(row) || row < 1 || row > 8 || -1 == "ABCDEFGH".indexOf(col)) {
            console.log(`${this.#p1.get_name()} you entered an invalid position`);
            return false;
        }
        return true;
    }

    /**
     * Requires: Nothing.
     * Modifies: p1, p2, cout.
     * Effects:  Starts the game. The argument difficulty represents EASY or
     *           MEDIUM and max_num_rounds indicates the maximum number of rounds.
     *           p1 is prompted for a position to attack each turn, and p2's
     *           attack will be randomly generated. p1 should be continuously prompted
     *           until they enter a valid move. After each round, once both
     *           players have made a move, print out your grid and
     *           guess grid.
     *
     *           The game will continue until either p1 or p2  has all their ships sunk
     *           or the number of completed rounds has reached max_num_rounds.
     *           Once the game is over, the winner will be announced along with
     *           how many moves it took for the winner to win, followed by a
     *           closing message.
     *
     *           NOTE: The round in which either the `p1` or `p2` win should be
     *           counted. Also, the grids for both players should be printed
     *           regardless of whether the round is a winning round.
     *
     *           IMPORTANT: If either player has won during a round, the following
     *           player should not be able to make a move since they already lost.
     *
     * Prompt:  When printing YOUR grid:
     *           "<p1 name> enter your move: " <new line>
     *           "Your grid" <new line>
     *           <Your Grid>
     *
     *           When printing GUESS_GRID's grid:
     *           "<p2 name>'s grid" <new line>
     *           <Your Guess Grid>
     *
     *           When game is over, print:
     *           "Game over, winner is <winner name> in <num of rounds> rounds"
     *
     *           Hint: This function will call many other functions,
     *           check the function table in the spec.
     *
     * Functions called by start: Player::destroyed(), Game::get_move(),
     *           Game::check_valid_move(), Player::get_name(), Player::attack(),
     *           Player::print_grid(), Player::print_guess_grid(),
     *           Game::opponent_make_move()
     */
    start(difficulty: string, max_num_rounds: number): void {
        let roundCount = 0;
        while (true) {
            let move = this.get_move(this.#p1.get_name());
            while (!this.check_valid_move(move)) {
                move = this.get_move(this.#p1.get_name());
            }
            process.stdout.write("\n");

            this.#p1.attack(this.#p2, new Position(move[0], move[1]));

            this.#opponent_make_move(difficulty);

            process.stdout.write("\nYour grid\n");
            this.#p1.print_grid();
            process.stdout.write(`${this.#p2.get_name()}'s grid\n`);
            this.#p1.print_guess_grid();
            process.stdout.write("\n");

            roundCount++;
            if (this.#p1.destroyed() && this.#p2.destroyed()) {
                console.log(`Game over, winner is no one in ${roundCount} rounds`);
                break;
            }

            if (this.#p1.destroyed() || this.#p2.destroyed()) {
                let winner: string;
                if (this.#p1.destroyed()) {
                    winner = this.#p2.get_name();
                } else {
                    winner = this.#p1.get_name();
                }
                console.log(`Game over, winner is ${winner} in ${roundCount} rounds`);
                break;
            }

            if (roundCount == max_num_rounds) {
                console.log(`Game over, winner is no one in ${roundCount} rounds`);
                break;
            }
        }
    }

    // Your code goes above this line.
    // Don't change the implementations below!
    #p1: Player;
    #p2: Player;

    /**
     * Requires: Nothing.
     * Modifies: p2.
     * Effects:  Generates a random grid for p. p will have one
     *           ship of each of the following sizes: 2, 3, 4, and 5.
     */
    #generate_random_grid(p: Player): void {
        let grid: boolean[] = Array(MAX_GRID_SIZE * MAX_GRID_SIZE).fill(false);

        for (let k = 0; k < 10 && p.get_num_ships() < 5; k++) {
            // i is the length of the ship to be made
            // decrementing i to create 2 ships of size 3
            let i = p.get_num_ships() + 1;
            if (i > 2) {
                i--;
            } // i = {1, 2, 2, 3, 4}

            let row = get_random_number() % MAX_GRID_SIZE;
            let col = get_random_number() % MAX_GRID_SIZE;
            let pos1 = new Position(row, col);

            if (!grid[row * MAX_GRID_SIZE + col]) {
                let pos2:Position;
                // Check if creating position two is not off the grid relative to
                // position 1 inthe order of bottom, right, left, top
                if (row + i < MAX_GRID_SIZE) {
                    pos2 = new Position(row + i, col);
                } else if (col + i < MAX_GRID_SIZE) {
                    pos2 = new Position(row, col + i);
                } else if (col - i >= 0) {
                    pos2 = new Position(row, col - i);
                } else if (row - i >= 0) {
                    pos2 = new Position(row - i, col);
                } else {
                    continue;
                }

                let s = new Ship(pos1, pos2);

                let pos2_taken = false;
                if (s.is_horizontal()) {
                    // start and end depends on if pos1 is to the left of pos2
                    let start = pos1.get_col() < pos2.get_col() ?
                                pos1.get_col() : pos2.get_col();
                    let end = pos1.get_col() < pos2.get_col() ?
                              pos2.get_col() : pos1.get_col();
                    // Loop through start and end to check if any of the positions
                    // has been taken
                    for (let j = start; j <= end; j++) {
                        // break out of the loop if any of the position is taken
                        if (grid[pos1.get_row() * MAX_GRID_SIZE + j]) {
                            pos2_taken = true;
                            break;
                        }
                    }

                    // If none of the positions were taken, set them as taken
                    for (let j = start; j <= end; j++) {
                        grid[pos1.get_row() * MAX_GRID_SIZE + j] = true;
                    }
                } else {
                    // start and end depends on if pos1 is to the left of pos2
                    let start = pos1.get_row() < pos2.get_row() ?
                                pos1.get_row() : pos2.get_row();
                    let end = pos1.get_row() < pos2.get_row() ?
                              pos2.get_row() : pos1.get_row();
                    // Loop through start and end to check if any of the positions
                    // has been taken
                    for (let j = start; j <= end; j++) {
                        // break out of the loop if any of the position is taken
                        if (grid[j * MAX_GRID_SIZE + pos1.get_col()]) {
                            pos2_taken = true;
                            break;
                        }
                    }

                    // If none of the positions were taken, set them as taken
                    for (let j = start; j <= end; j++) {
                        grid[j * MAX_GRID_SIZE + pos1.get_col()] = true;
                    }
                }

                // Restart from beginning
                if (pos2_taken) {
                    continue;
                }

                // Add the ship to p2's ships
                p.add_ship(s);
            }
        }
    }

    /**
     * Requires: diffculty is either EASY or MEDIUM.
     * Modifies: p1, p2, cout.
     * Effects:  The opponent will make a random move. The difficulty of the
     *           opponent is determined by difficulty.
     *
     *           After your opponent makes a move print:
     *           "You received an attack at <position>"
     */
    #opponent_make_move(difficulty: string): void {
        if (difficulty == EMULATE) {
            let next = new Position();
            let input = prompt("Enter CPU emulation move: ");
            next.parse(input);
            this.#p2.attack(this.#p1, next);
            process.stdout.write(`You received an attack at ${next}\n\n`);
        } else if (difficulty == EASY) {
            let randRow = get_random_number() % MAX_GRID_SIZE;
            let randCol = get_random_number() % MAX_GRID_SIZE;
            let randCoord = new Position(randRow, randCol);
            this.#p2.attack(this.#p1, randCoord);
            process.stdout.write(`You received an attack at ${randCoord.format()}\n\n`);
        } else if (difficulty == MEDIUM) {
            // Simple AI that checks right, bottom, left, top of hit position
            // TODO: implement for S'more version
        }
    }
}

export default Game;
