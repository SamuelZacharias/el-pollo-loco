/**
 * Represents a bottle object in the game, which can be collected or thrown by the character.
 * Inherits from DrawableObject and manages the positioning and rendering of bottles.
 */
class Bottle extends Drawableobject {
    /**
     * The x-coordinate of the bottle on the game canvas.
     * @type {number}
     */
    x = 0;

    /**
     * The y-coordinate of the bottle on the game canvas.
     * @type {number}
     */
    y = 360;

    /**
     * Array of image paths representing the possible appearances of the bottle when placed on the ground.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    /**
     * Static array that keeps track of the x-coordinates of all existing bottles.
     * Ensures that new bottles are not placed too close to each other.
     * @type {number[]}
     */
    static existingBottles = [];

    /**
     * Constructs a new Bottle object.
     * Loads the bottle images and ensures the bottle is placed at a random position with a minimum distance from other bottles.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_WALKING);

        // Set the bottle's position randomly within the range, ensuring it's not too close to other bottles.
        this.setPositionWithMinDistance(300, 1700, 100);
        
        // Select a random image for the bottle.
        const randomImageIndex = Math.floor(Math.random() * this.IMAGES_WALKING.length);
        this.img = this.imageCache[this.IMAGES_WALKING[randomImageIndex]];

        // Log an error if the image failed to load.
        if (!this.img) {
            console.error('Das Bild wurde nicht korrekt geladen.', this.IMAGES_WALKING[randomImageIndex]);
        }

        // Add the bottle's x-coordinate to the list of existing bottles.
        Bottle.existingBottles.push(this.x);
    }

    /**
     * Sets the x-position of the bottle, ensuring that it is not placed too close to other bottles.
     * The position is chosen randomly between the minX and maxX values, and it will retry until a valid position is found.
     * 
     * @param {number} minX - The minimum x-coordinate for the bottle's position.
     * @param {number} maxX - The maximum x-coordinate for the bottle's position.
     * @param {number} minDistance - The minimum distance the bottle must be placed from any existing bottle.
     */
    setPositionWithMinDistance(minX, maxX, minDistance) {
        let attempts = 0;
        const maxAttempts = 100;

        do {
            attempts++;
            this.x = minX + Math.random() * (maxX - minX);  // Set random x position within range
            let isTooClose = false;

            // Check if the new position is too close to any existing bottles
            for (let bottleX of Bottle.existingBottles) {
                if (Math.abs(this.x - bottleX) < minDistance) {
                    isTooClose = true;
                    break;
                }
            }

            // If the new position is valid (not too close), exit the loop
            if (!isTooClose) {
                return;
            }
        } while (attempts < maxAttempts);

        // If no valid position is found after maxAttempts, set a default position
        this.x = minX;
    }
}
