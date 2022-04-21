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
        if (start_in && end_in) {
            this.#start = start_in;
            this.#end = end_in;
            this.#num_hits = 0;
            if (this.is_horizontal()) {
                this.#size = Math.abs(this.#start.get_col() - this.#end.get_col()) + 1;
            } else {
                this.#size = Math.abs(this.#start.get_row() - this.#end.get_row()) + 1;
            }
        } else {
            this.#start = new Position();
            this.#end = new Position();
            this.#size = 0;
            this.#num_hits = 0;
        }
    }

    /**
     * Requires: Nothing.
     * Modifies: Nothing.
     * Effects:  Returns the start position of the ship.
     */
    get_start(): Position {
        return this.#start.clone();
    }

    /**
     * Requires: Nothing.
     * Modifies: Nothing.
     * Effects:  Returns the end position of the ship.
     */
    get_end(): Position {
        return this.#end.clone();
    }

    /**
     * Requires: Nothing.
     * Modifies: Nothing.
     * Effects:  Returns the size of the ship.
     */
    get_size(): number {
        return this.#size;
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
        if (this.#start.get_row() == this.#end.get_row()) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Requires: pos must be a valid position in the grid.
     * Modifies: Nothing.
     * Effects:  Returns true if pos is in the range [start, end] or [end, start].
     *           Otherwise, return false.
     */
    has_position(pos: Position): boolean {
        let col = pos.get_col();
        let row = pos.get_row();
        let startCol = this.#start.get_col();
        let startRow = this.#start.get_row();
        let endCol = this.#end.get_col();
        let endRow = this.#end.get_row();

        if (startRow == endRow) {
            if (row == startRow) {
                if ((startCol >= col && col >= endCol) ||
                    (startCol <= col && col <= endCol)) {
                    return true;
                }
            }
        } else {
            if (col == startCol) {
                if ((startRow >= row && row >= endRow) ||
                (startRow <= row && row <= endRow)) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Requires: Nothing.
     * Modifies: Nothing.
     * Effects:  Increments the num_hits if num_hits is less than size
     */
    hit(): void {
        if (this.#num_hits < this.#size) {
            this.#num_hits ++;
        }
    }

    /**
     * Requires: Nothing.
     * Modifies: Nothing.
     * Effects:  Returns true if the num_hits equals the size of the ship.
     *           Otherwise, return false.
     */
    has_sunk(): boolean {
        if (this.#size == this.#num_hits) {
            return true;
        }
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
