/**
 * Represents a background object in the game.
 * Inherits from MovableObject and is used to display static or moving background images.
 */
class BackgroundObject extends MovableObject {
    /**
     * The width of the background object.
     * @type {number}
     */
    width = 1086;

    /**
     * The height of the background object.
     * @type {number}
     */
    height = 480;

    /**
     * Constructs a new BackgroundObject.
     * Loads the image for the background and sets its position.
     *
     * @param {string} imagePath - The path to the background image.
     * @param {number} x - The initial x-coordinate for the background object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);  // Load the background image
        this.x = x;  // Set the x-coordinate
        this.y = 0;  // Set the y-coordinate to 0 (top of the screen)
    }
}
