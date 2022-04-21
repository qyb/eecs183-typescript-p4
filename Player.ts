import { readFileSync } from 'fs';
import Position from './Position';
import Ship from './Ship';
import {
    MAX_NUM_SHIPS, MAX_GRID_SIZE,
    EMPTY_LETTER, SHIP_LETTER, HIT_LETTER, MISS_LETTER,
    print_grid
} from './utility';

class Player {
    /**
     * Requires: Nothing.
     * Modifies: grid, guess_grid.
     * Effects:  Sets each element in both grid and guess_grid to
     *           EMPTY_LETTER.
     */
    init_grid(): void{
        for (let i = 0; i < MAX_GRID_SIZE; i++) {
            for (let j = 0; j < MAX_GRID_SIZE; j++) {
                this.#grid[i*MAX_GRID_SIZE + j] = EMPTY_LETTER;
                this.#guess_grid[i*MAX_GRID_SIZE + j] = EMPTY_LETTER;
            }
        }
    }

    /**
     * Requires: Nothing.
     * Modifies: Nothing.
     * Effects:  Returns the name of the player.
     */
    get_name(): string {
        return this.#name;
    }

    /**
     * Requires: Nothing.
     * Modifies: Nothing.
     * Effects:  Returns the number of ships of the player.
     */
    get_num_ships(): number {
        return this.#num_ships;
    }

    /**
     * Requires: Nothing.
     * Modifies: Nothing.
     * Effects:  Returns the number of remaining ships of the player.
     */
    get_remaining_ships(): number {
        return this.#remaining_ships;
    }

    /**
     * Requires: row and col are valid positions in grid.
     * Modifies: Nothing.
     * Effects:  Returns the element at row, col of grid.
     */
    get_grid_at(row: number, col: number): number {
        return this.#grid[row * MAX_GRID_SIZE + col];
    }

    /**
     * Requires: row and col are valid positions in guess_grid.
     * Modifies: Nothing.
     * Effects:  Returns the element at row, col of guess_grid.
     */
    get_guess_grid_at(row: number, col: number): number {
        return this.#guess_grid[row * MAX_GRID_SIZE + col];
    }

    /**
     * Requires: ship is a valid ship with start/end positions that
     *           do not intersect with previously added ships.
     * Modifies: ships, num_ships, remaining_ships, grid.
     * Effects:  Adds the ship to the next available index of ships and
     *           increment num_ships and remaining_ships.
     *           Set the positions on grid with SHIP_LETTER based on the
     *           start and end of ship.
     *           If num_ships is already equall to MAX_NUM_SHIPS,
     *           the function should return without making any changes.
     */
    add_ship(ship: Ship): void {
        if (this.#num_ships >= MAX_NUM_SHIPS) {
            return;
        }
        this.#ships[this.#num_ships] = ship;
        this.#num_ships++;
        this.#remaining_ships++;

        let start = ship.get_start();
        let end = ship.get_end();
        if (ship.is_horizontal()) {
            let row = start.get_row();
            let s = Math.min(start.get_col(), end.get_col());
            let e = Math.max(start.get_col(), end.get_col());
            for (let i = s; i <= e; i++) {
                this.#grid[row * MAX_GRID_SIZE + i] = SHIP_LETTER;
            }
        } else {
            let col = start.get_col();
            let s = Math.min(start.get_row(), end.get_row());
            let e = Math.max(start.get_row(), end.get_row());
            for (let j = s; j <= e; j++) {
                this.#grid[j * MAX_GRID_SIZE + col] = SHIP_LETTER;
            }
        }
    }

    /**
     * Requires: pos is a valid position.
     * Modifies: opponent, guess_grid, cout.
     * Effects:  If the pos is part of an opponent's ship that hasn't been hit
     *           yet, hit that ship and mark both the opponent's grid and
     *           the current player's guess_grid as HIT_LETTER at pos.
     *
     *           Otherwise, if pos is not a position in the opponent's ships
     *           (i.e. a miss), mark both the opponent's grid and the current
     *           player's guess_grid as MISS_LETTER.
     *
     *           If pos is already hit or miss for the opponent, the move is
     *           considered as a miss.
     *
     *           On hit, print the attacking player's name, the position,
     *           and "hit".
     *           On miss, print the attacking player's name, the position,
     *           and "miss".
     *
     *           If hitting the ship causes that ship to
     *           sink, decrement the opponent's remaining_ships, and use
     *           announce_ship_sunk() to print message.
     *
     * Example:
     *           [name] [pos] hit
     *           [name] [pos] miss
     */
    attack(opponent: Player, pos: Position): void {
        let row = pos.get_row();
        let col = pos.get_col();
        if (opponent.#grid[row * MAX_GRID_SIZE + col] == SHIP_LETTER) {
            opponent.#grid[row * MAX_GRID_SIZE + col] = HIT_LETTER;
            this.#guess_grid[row * MAX_GRID_SIZE + col] = HIT_LETTER;
            console.log(`${this.#name} ${pos.format()} hit`);
            for (let i = 0; i < opponent.#num_ships; i++) {
                if (opponent.#ships[i].has_position(pos)) {
                    opponent.#ships[i].hit();
                    if (opponent.#ships[i].has_sunk()) {
                        opponent.#remaining_ships--;
                        this.announce_ship_sunk(opponent.#ships[i].get_size());
                    }
                    break;
                }
            }
        } else {
            if (opponent.#grid[row * MAX_GRID_SIZE + col] != HIT_LETTER) {
                opponent.#grid[row * MAX_GRID_SIZE + col] = MISS_LETTER;
                this.#guess_grid[row * MAX_GRID_SIZE + col] = MISS_LETTER;
            }
            console.log(`${this.#name} ${pos.format()} miss`);
        }
    }

    /**
     * Requires: size is [2, 5].
     * Modifies: cout.
     * Effects:  Prints a congratulating message followed by the name and the
     *           type of ships that was sunk.
     *
     * Example:
     *           if size = 2: "Congratulations [name]! You sunk a Destroyer"
     *           if size = 3: "Congratulations [name]! You sunk a Submarine"
     *           if size = 4: "Congratulations [name]! You sunk a Battleship"
     *           if size = 5: "Congratulations [name]! You sunk a Carrier"
     */
    announce_ship_sunk(size: number): void {
        let shipType = "";
        switch (size){
            case 2:
                shipType = "Destroyer";
                break;
            case 3:
                shipType = "Submarine";
                break;
            case 4:
                shipType = "Battleship";
                break;
            default:
                shipType = "Carrier";
                break;
        }
        console.log(`Congratulations ${this.#name}! You sunk a ${shipType}`);
    }

    /**
     * Requires: Nothing.
     * Modifies: ships, num_ships, remaining_ships, grid.
     * Effects: use filename to open a file stream and read in the start
     *          and end positions for each ship to be added. Returns true
     *          if the file opened successfully; false otherwise.
     *
     *          Note: should call add_ship function.
     *
     *          Note: The number of ships in the file <filename> may not
     *                be exactly MAX_NUM_SHIPS.
     */
    load_grid_file(filename: string): boolean {
        try {
            let data = readFileSync(filename, 'utf-8');
            let lines = data.split('\n');
            lines.forEach(line => {
                let pos = line.split(' ');
                let start = new Position();
                let end = new Position();
                start.parse(pos[0]);
                end.parse(pos[1]);
                this.add_ship(new Ship(start, end));
            })
            return true;
        } catch (err) {
            return false;
        }
    }

    /**
     * Requires: Nothing.
     * Modifies: Nothing.
     * Effects:  Returns true if remaining_ships equal zero.
     *           Otherwise return false.
     */
    destroyed(): boolean {
        return this.#remaining_ships == 0 ? true:false;
    }

    // Your code goes above this line.
    // Don't change the implementations below!

    /**
     * Requires: Nothing.
     * Modifies: Nothing.
     * Effects:  Prints grid.
     */
    print_grid(): void {
        print_grid(this.#grid);
    }

     /**
      * Requires: Nothing.
      * Modifies: Nothing.
      * Effects:  Prints guess_grid.
      */
    print_guess_grid(): void {
        print_grid(this.#guess_grid);
    }

    #name: string;
    #num_ships: number;
    #remaining_ships: number;
    #ships: Array<Ship>;
    #grid: Int8Array;
    #guess_grid: Int8Array;
    /**
     * Requires: Nothing.
     * Modifies: name, num_ships, remaining_ships, grid, guess_grid.
     * Effects:  Default constructor. Sets name to an empty string,
     *           num_ships to 0, remaining_ships to 0, and initialize the grid.
     *
     * Note:     You will want to implement the member function
     *           init_grid() before implementing this constructor.
     */
    // constructor();

    /**
     * Requires: name_val is not an empty string.
     * Modifies: name, num_ships, remaining_ships, grid, guess_grid.
     * Effects:  Non-default constructor. Sets name to name_val,
     *           num_ships to 0, remaining_ships to 0, and initialize the grid.
     *
     * Note:     You will want to implement the member function
     *           init_grid() before implementing this constructor.
     */
     constructor(name_val?: string) {
        if (name_val) {
            this.#name = name_val;
        } else {
            this.#name = '';
        }
        this.#num_ships = 0;
        this.#remaining_ships = 0;
        this.#ships = new Array<Ship>(MAX_NUM_SHIPS);
        this.#grid = new Int8Array(MAX_GRID_SIZE * MAX_GRID_SIZE);
        this.#guess_grid = new Int8Array(MAX_GRID_SIZE * MAX_GRID_SIZE);
        this.init_grid();
    }
}

export default Player;
