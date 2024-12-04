/**
 * The Statusbarendboss class represents the health status bar for the end boss.
 * It displays different images based on the boss's current health percentage.
 * This class extends Drawableobject.
 */
class Statusbarendboss extends Drawableobject {
    /**
     * Array of image paths representing the different states of the boss's health bar.
     */
    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue100.png'
    ];

    /**
     * The current health percentage of the end boss.
     * @type {number}
     */
    percentage = 100;

    /**
     * Constructor for the Statusbarendboss class.
     * Initializes the status bar with the highest health image.
     */
    constructor() {
        super().loadImage('img/7_statusbars/2_statusbar_endboss/blue/blue100.png');
        this.x = 680;
        this.y = 10;
        this.width = 300;
        this.height = 60;
        this.loadImages(this.IMAGES);
    }

    /**
     * Sets the health percentage of the end boss and updates the image 
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
        else if (this.percentage > 79) return 4;
        else if (this.percentage > 59) return 3;
        else if (this.percentage > 39) return 2;
        else if (this.percentage > 19) return 1;
        else return 0;
    }
}
