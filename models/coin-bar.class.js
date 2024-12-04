/**
 * Represents a coin status bar in the game that visually tracks the player's collected coins.
 * Extends the Drawableobject class to handle image loading and rendering functionality.
 */
class Coinbar extends Drawableobject {
    
    /**
     * Array of images representing different states of the coin bar, 
     * depending on the percentage of coins collected.
     * @type {string[]}
     */
    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    /**
     * The current percentage of the coin bar (how full it is based on collected coins).
     * @type {number}
     */
    percentage = 0;

    /**
     * Constructs the coin status bar, setting its initial position, size, and percentage.
     * Loads the images for the different states of the coin bar.
     */
    constructor() {
        super();
        this.x = 40;
        this.y = 50;
        this.width = 200;
        this.height = 40;
        this.loadImages(this.IMAGES);
        this.setPercentage(0);  // Initialize the coin bar at 0% by default
    }

    /**
     * Sets the current percentage of the coin bar and updates the displayed image accordingly.
     * @param {number} percentage - The new percentage to set for the coin bar.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];  // Load the appropriate image based on the percentage
    }

    /**
     * Increases the percentage of the coin bar by a specified amount, up to a maximum of 100%.
     * @param {number} amount - The amount to increase the percentage by.
     */
    increasePercentage(amount) {
        this.percentage += amount;
        if (this.percentage > 100) {
            this.percentage = 100;  // Ensure the percentage does not exceed 100%
        }
        this.setPercentage(this.percentage);
    }

    /**
     * Decreases the percentage of the coin bar by a specified amount, down to a minimum of 0%.
     * @param {number} amount - The amount to decrease the percentage by.
     */
    decreasePercentage(amount) {
        this.percentage -= amount;
        if (this.percentage < 0) {
            this.percentage = 0;  // Ensure the percentage does not fall below 0%
        }
        this.setPercentage(this.percentage);
    }

    /**
     * Determines which image index should be used based on the current percentage.
     * @returns {number} - The index of the image corresponding to the current percentage.
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
