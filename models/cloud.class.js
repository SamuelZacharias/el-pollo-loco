/**
 * Represents a cloud object in the game. Clouds move from right to left across the screen.
 * Extends the MovableObject class to include movement and position functionality.
 */
class Cloud extends MovableObject {
    
    /**
     * The y-coordinate (vertical position) of the cloud.
     * @type {number}
     */
    y = 0;

    /**
     * The height of the cloud object.
     * @type {number}
     */
    height = 370;

    /**
     * Constructs the cloud object, sets its initial position, size, and starts its movement.
     * @param {number} x - The initial x-coordinate (horizontal position) of the cloud.
     */
    constructor(x) {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = x;
        this.y = Math.random() * 100;  // Random y-position to create variation in cloud height
        this.width = 550;
        this.height = 420;

        this.animate();
    }

    /**
     * Starts the cloud's movement to the left.
     * Clouds continuously move across the screen at a constant speed.
     */
    animate() {
        this.moveLeft();
    }
}
