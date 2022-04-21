import Position from './Position';
import Ship from './Ship';
import Player from './Player';

import {prompt} from './utility';

function test_position(): void {
    let p1 = new Position();
    console.log(p1.get_row());

    p1.set_row(5);
    p1.set_col(3);

    console.log(`${p1.get_row()}, ${p1.get_col()}`);

    let p2 = new Position(3, 9);
    process.stdout.write(p2.format() + "\n");

    let p3 = new Position('4', 'C');
    process.stdout.write(p3.format() + "\n");

    let input = prompt('Input Position-Init-Data:');
    p1.parse(input);
    process.stdout.write(p1.format() + "\n");
}

function test_ship(): void {
    let start1 = new Position('1', 'A');
    let end1 = new Position('1', 'E');
    let ship1 = new Ship(start1, end1);
    display_ship(ship1);

    ship1.hit();
    ship1.hit();
    ship1.hit();
    ship1.hit();
    display_ship(ship1);
    ship1.hit();
    display_ship(ship1);

    let start2 = new Position('2', 'A');
    let end2 = new Position('4', 'A');
    let ship2 = new Ship(start2, end2);
    display_ship(ship2);

    let test = new Position('3', 'A');
    console.log(ship1.has_position(start2),
    ship2.has_position(start2),
    ship2.has_position(test),
    ship2.has_position(end2));
}

function test_player(): void {
    let Alice = new Player("Alice");
    let Bob = new Player("Bob");

    /*
    Alice.add_ship(new Ship(new Position('1', 'C'), new Position('1', 'A')));
    Alice.add_ship(new Ship(new Position('2', 'C'), new Position('2', 'D')));
    Alice.add_ship(new Ship(new Position('4', 'E'), new Position('8', 'E')));
    Bob.attack(Alice, new Position('1', 'A'));
    Bob.attack(Alice, new Position('1', 'A'));
    Bob.attack(Alice, new Position('2', 'A'));
    Bob.attack(Alice, new Position('2', 'C'));
    Bob.attack(Alice, new Position('2', 'D'));
    Bob.attack(Alice, new Position('5', 'E'));
    Alice.print_grid();
    Bob.attack(Alice, new Position('6', 'E'));
    Bob.attack(Alice, new Position('7', 'E'));
    Bob.attack(Alice, new Position('8', 'E'));
    Bob.attack(Alice, new Position('1', 'B'));
    Alice.print_grid();
    Bob.attack(Alice, new Position('4', 'E'));
    Bob.attack(Alice, new Position('1', 'C'));
    */

    Alice.load_grid_file('grid1.txt');
    Bob.load_grid_file('grid2.txt');
    Alice.print_grid();
    Bob.print_grid();
}

function display_ship(s: Ship): void {
    console.log(s.is_horizontal()?"水平":"垂直",
    `Size: ${s.get_size()}`,
    s.has_sunk()?"已被击沉":"还活着");
}

function startTests(): void {
    test_position();
    test_ship();
    test_player();
}

export default startTests;
