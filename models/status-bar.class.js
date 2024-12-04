/**
 * The Statusbar class represents the player's health status bar.
 * It displays different images based on the player's current health percentage.
 * This class extends Drawableobject.
 */
class Statusbar extends Drawableobject {
    /**
     * Array of image paths representing the different states of the health bar.
     */
    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    /**
     * The current health percentage of the player.
     * @type {number}
     */
    percentage = 100;

    /**
     * Constructor for the Statusbar class.
     * Initializes the status bar with the highest health image.
     */
    constructor() {
        super().loadImage('img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png');
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
        this.x = 40;
        this.y = 15;
        this.width = 200;
        this.height = 40;
    }

    /**
     * Sets the health percentage of the player and updates the image
     * to match the corresponding health status.
     * 
     * @param {number} percentage - The new health percentage to display.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the index of the image based on the current health percentage.
     * 
     * @returns {number} The index of the image that corresponds to the current percentage.
     */
    resolveImageIndex() {
        if (this.percentage == 100) return 5;
        else if (this.percentage > 80) return 4;
        else if (this.percentage > 60) return 3;
        else if (this.percentage > 40) return 2;
        else if (this.percentage > 20) return 1;
        else return 0;
    }
}
