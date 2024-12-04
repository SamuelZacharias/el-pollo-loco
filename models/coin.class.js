/**
 * Represents a coin object in the game, which can be collected by the player.
 * Extends the Drawableobject class to handle image loading and rendering functionality.
 */
class Coin extends Drawableobject {
    
    /**
     * The X position of the coin in the game world.
     * @type {number}
     */
    x = 0;

    /**
     * The Y position of the coin in the game world.
     * @type {number}
     */
    y = 360;

    /**
     * The width of the coin.
     * @type {number}
     */
    width = 125;

    /**
     * The height of the coin.
     * @type {number}
     */
    height = 125;

    /**
     * Array of images representing different states of the coin.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    /**
     * Array that stores the X positions of all existing coins to avoid overlap.
     * @type {number[]}
     */
    static existingCoins = [];

    /**
     * Constructs a new coin object, setting its position with a minimum distance from other coins
     * and loading the corresponding image.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_WALKING);
        this.setPositionWithMinDistance(300, 1600, 100);
        this.y = 330;  // Sets the vertical position for all coins
        const randomImageIndex = Math.floor(Math.random() * this.IMAGES_WALKING.length);
        this.img = this.imageCache[this.IMAGES_WALKING[randomImageIndex]];

        if (!this.img) {
            console.error('Das Bild wurde nicht korrekt geladen.', this.IMAGES_WALKING[randomImageIndex]);
        }
        Coin.existingCoins.push(this.x);  // Stores the X position to avoid coin overlap
    }

    /**
     * Sets the position of the coin along the X axis, ensuring a minimum distance from other coins.
     * The method tries a number of random positions until the coin is far enough from others.
     *
     * @param {number} minX - The minimum X position for the coin.
     * @param {number} maxX - The maximum X position for the coin.
     * @param {number} minDistance - The minimum distance between this coin and other coins.
     */
    setPositionWithMinDistance(minX, maxX, minDistance) {
        let attempts = 0;
        const maxAttempts = 100;

        // Try finding a position with enough distance from other coins
        do {
            attempts++;
            this.x = minX + Math.random() * (maxX - minX);
            let isTooClose = false;
            for (let coinX of Coin.existingCoins) {
                if (Math.abs(this.x - coinX) < minDistance) {
                    isTooClose = true;
                    break;
                }
            }
            if (!isTooClose) {
                return;
            }
        } while (attempts < maxAttempts);

        // If no suitable position found after maximum attempts, use the minimum X value
        this.x = minX;
    }
}
