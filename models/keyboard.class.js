/**
 * The Keyboard class represents the state of various key presses used to control the character in the game.
 * It tracks whether keys like LEFT, RIGHT, UP, DOWN, SPACE, and Q are being pressed or not.
 * 
 * This class does not have any methods, as it primarily serves as a data structure 
 * to hold the boolean states of each key.
 */
class Keyboard extends MovableObject {
    LEFT = false;   // Tracks if the LEFT arrow key is pressed.
    RIGHT = false;  // Tracks if the RIGHT arrow key is pressed.
    UP = false;     // Tracks if the UP arrow key is pressed.
    DOWN = false;   // Tracks if the DOWN arrow key is pressed.
    SPACE = false;  // Tracks if the SPACE key is pressed (e.g., for jumping or attacking).
    Q = false;      // Tracks if the 'Q' key is pressed (e.g., for throwing objects).
}
