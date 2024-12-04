/**
 * Represents the bottle status bar in the game, showing the player's bottle collection progress.
 * Inherits from DrawableObject and manages the visual representation of the bottle bar.
 */
class Bottlebar extends Drawableobject {
    /**
     * Array of image paths representing different states of the bottle bar based on the percentage.
     * @type {string[]}
     */
    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];

    /**
     * The current percentage of the bottle bar (0-100).
     * @type {number}
     */
    percentage = 0;

    /**
     * Constructs a new Bottlebar object.
     * Sets the position, size, and initializes the bottle bar with the default percentage (0).
     */
    constructor() {
        super();
        this.x = 40;       // x-coordinate of the bottle bar
        this.y = 85;       // y-coordinate of the bottle bar
        this.width = 200;  // Width of the bottle bar
        this.height = 40;  // Height of the bottle bar
        this.loadImages(this.IMAGES);  // Load bottle bar images
        this.setPercentage(0);         // Set the initial percentage to 0
    }

    /**
     * Updates the bottle bar's percentage and the corresponding image.
     * @param {number} percentage - The new percentage to set (0-100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Increases the bottle bar's percentage by a specified amount.
     * Ensures that the percentage does not exceed 100%.
     * 
     * @param {number} amount - The amount to increase the percentage by.
     */
    increasePercentage(amount) {
        this.percentage += amount;
        if (this.percentage > 100) {
            this.percentage = 100;
        }
        this.setPercentage(this.percentage);
    }

    /**
     * Decreases the bottle bar's percentage by a specified amount.
     * Ensures that the percentage does not go below 0%.
     * 
     * @param {number} amount - The amount to decrease the percentage by.
     */
    decreasePercentage(amount) {
        this.percentage -= amount;
        if (this.percentage < 0) {
            this.percentage = 0;
        }
        this.setPercentage(this.percentage);
    }

    /**
     * Resolves the index of the bottle bar image based on the current percentage.
     * 
     * @returns {number} The index of the image that corresponds to the current percentage.
     */
    resolveImageIndex() {
        if (this.percentage == 100) return 5;
        else if (this.percentage > 79) return 4;
        else if (this.percentage > 59) return 3;
        else if (this.percentage > 39) return 2;
        else if (this.percentage > 19) return 1;
        else return 0;
    }
}
