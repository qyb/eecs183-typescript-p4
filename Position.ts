import {
    MAX_GRID_SIZE,
    charCodeA
} from './utility';


class Position {
    /**
     * Requires: Nothing.
     * Modifies: row, col.
     * Effects:  Default constructor. Sets position to origin (0,0).
     */
    // constructor();

    /**
     * Requires: Nothing.
     * Modifies: row, col.
     * Effects:  Constructs a position and sets row and col positions.
     *
     * Note:     You will need to implement the member function
     *           check_range() before implementing this one. This will
     *           help make sure row_in and col_in are valid.
     */
    // constructor(row_in: number, col_in: number);

    /**
     * Requires: Nothing.
     * Modifies: row, col.
     * Effects:  Constructs a position and sets row and col positions.
     *           You must convert the character position to its integer
     *           equivalent position (see example). Also, case should not matter for col_in.
     *
     * Example:
     *           '1' should be 0 for row, '2' should be 1 for row, and so on.
     *           'A' or 'a' should be 0 for col, 'B' or 'b' should be 1 for col and so on.
     *
     * Note:     You will need to implement the member function
     *           check_range() before implementing this one. This will
     *           help make sure row_in and col_in are valid.
     */
    // constructor(row_in: string, col_in: string);
    constructor(row_in?: number | string, col_in?: number | string) {
        if (typeof(row_in) === "number" && typeof(col_in) === "number") {
            this.#row = this.#check_range(row_in);
            this.#col = this.#check_range(col_in);
        } else if (typeof(row_in) === "string" && typeof(col_in) === "string") {
            this.#row = this.#check_range(parseInt(row_in) - 1);
            this.#col = this.#check_range(col_in.toUpperCase().charCodeAt(0) - charCodeA);
        } else {
            this.#row = 0;
            this.#col = 0;
        }
    }

    /**
     * Requires: Nothing.
     * Modifies: Nothing.
     * Effects:  Returns row position.
     */
    get_row(): number {
        return this.#row;
    }

    /**
     * Requires: Nothing.
     * Modifies: row.
     * Effects:  Sets row position.
     *           Note: must call check_range.
     */
    set_row(row_in: number): void {
        this.#row = this.#check_range(row_in);
    }

    /**
     * Requires: Nothing.
     * Modifies: Nothing.
     * Effects:  Returns col position.
     */
    get_col(): number {
        return this.#col;
    }

    /**
     * Requires: Nothing.
     * Modifies: col.
     * Effects:  Sets col position.
     *           Note: must call check_range.
     */
    set_col(col_in: number): void {
        this.#col = this.#check_range(col_in);
    }

    /**
     * Requires: Nothing.
     * Modifies: row, col.
     * Effects:  Parse position in format rowcol, e.g., "1A". If it is not in
     *           that format or the operation fails, it will try to read
     *           position using format (row,col), e.g., "(1,A)"
     *           col is NOT case senstive, so reading should work for,
     *           e.g., "(1,a)" or "1a".
     *
     * Example:  An input of (1,A) should result in row being 0 and col being 0.
     *           An input of 1A should result in row being 0 and col being 0.
     *
     * Note:     You will need to implement the member function
     *           check_range() before implementing this one.
     */
    parse(input: string): void {
        let _input = input.toUpperCase();
        let row: number;
        let col: number;
        if (_input.length === 2) {
            row = parseInt(_input[0]) - 1;
            col = _input.charCodeAt(1) - charCodeA;

        } else if (_input.length == 5) {
            row = parseInt(_input[1]) - 1;
            col = _input.charCodeAt(3) - charCodeA;

        } else {
            row = col = 0;
        }
        this.#row = this.#check_range(row);
        this.#col = this.#check_range(col);
    }

    /**
     * Requires: Nothing.
     * Modifies: Nothing.
     * Effects:  Return position in form (row,col) where row is in range [1, 8]
     *           and col should be an uppercase letter in range [A, H].
     */
    format(): string {
        let colChar = String.fromCharCode(this.#col + charCodeA);
        return `(${this.#row+1},${colChar})`;
    }

    /**
     * Requires: nothing
     * Modifies: nothing
     * Effects:  Returns val if val is in range [0,MAX_GRID_SIZE),
     *           otherwise returns the closest of 0 and MAX_GRID_SIZE - 1 to val.
     *
     * Example: check_range(-10) would return 0
     */
    #check_range(val: number): number {
        if (val < 0) {
            return 0;
        } else if (val >= MAX_GRID_SIZE) {
            return MAX_GRID_SIZE - 1;
        } else {
            return val;
        }
    }

    // Your code goes above this line.
    // Don't change the implementations below!

    #row: number;
    #col: number;

    // 没有发现有特别好的支持 copy #private member 的方案
    clone(): Position {
        let _clone = new Position(this.#row, this.#col);
        return _clone;
    }
};

export default Position;
