import Position from "./Position";

class Ship {
    /**
     * Requires: Nothing.
     * Modifies: start, end, size, num_hits.
     * Effects:  Default constructor. Sets start and end to origin (0,0),
     *           num_hits to 0, and size to 0.
     */
    // constructor();

    /**
     * Requires: start_in and end_in both represent valid and distinct
     *           positions on the grid and align either vertically or horizontally.
     *           Diagonal or L-shaped ships are not allowed.
     * Modifies: start, end, size, num_hits.
     * Effects:  Non-default constructor. Sets start and end to start_in and
     *           end_in respectively and num_hits to 0.
     *           The size should be determined by the start and end positions.
     *
     * Note:     You will want to implement the member function
     *           is_horizontal() before implementing this constructor.
     */
    constructor(start_in?: Position, end_in?: Position) {
        // TODO: write implementation here.
        this.#start = new Position();
        this.#end = new Position();
        this.#size = 0;
        this.#num_hits = 0;
    }

    /**
     * Requires: Nothing.
     * Modifies: Nothing.
     * Effects:  Returns the start position of the ship.
     */
    get_start(): Position {
        // TODO: write implementation here.
        return new Position();
    }

    /**
     * Requires: Nothing.
     * Modifies: Nothing.
     * Effects:  Returns the end position of the ship.
     */
    get_end(): Position {
        // TODO: write implementation here.
        return new Position();
    }

    /**
     * Requires: Nothing.
     * Modifies: Nothing.
     * Effects:  Returns the size of the ship.
     */
    get_size(): number {
        // TODO: write implementation here.
        return -1;
    }

    /**
     * Requires: Nothing.
     * Modifies: Nothing.
     * Effects:  Returns true if the ship is horizontal and false if the ship
     *           is vertical. For example, if start and end have the same row value,
     *           the ship is horizontal, so return true.
     *
     * Note:     This function may be useful in implementing has_position()
     */
    is_horizontal(): boolean {
        // TODO: write implementation here.
        return false;
    }

    /**
     * Requires: pos must be a valid position in the grid.
     * Modifies: Nothing.
     * Effects:  Returns true if pos is in the range [start, end] or [end, start].
     *           Otherwise, return false.
     */
    has_position(pos: Position): boolean {
        // TODO: write implementation here.
        return false;
    }

    /**
     * Requires: Nothing.
     * Modifies: Nothing.
     * Effects:  Increments the num_hits if num_hits is less than size
     */
    hit(): void {
        // TODO: write implementation here.
        return;
    }

    /**
     * Requires: Nothing.
     * Modifies: Nothing.
     * Effects:  Returns true if the num_hits equals the size of the ship.
     *           Otherwise, return false.
     */
    has_sunk(): boolean {
        // TODO: write implementation here.
        return false;
    }

    // Your code goes above this line.
    // Don't change the implementations below!

    #start: Position;
    #end: Position;
    #size: number;
    #num_hits: number;
}

export default Ship;
