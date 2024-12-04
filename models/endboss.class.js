/**
 * The Endboss class represents the main boss enemy in the game. 
 * It extends the MovableObject class and defines specific behaviors 
 * such as animations for walking, getting hurt, and dying.
 */
class Endboss extends MovableObject {
    energy = 100;                // Energy level of the Endboss.
    height = 400;                // Height of the Endboss.
    width = 250;                 // Width of the Endboss.
    y = 60;                      // Y-coordinate position of the Endboss.
    isDeadAnimationPlaying = false; // Flag to indicate if the death animation is playing.
    speed = 0.8;                 // Speed of movement.

    // Hitbox offset to handle collision calculations more precisely.
    offset = {
        top: -70,
        bottom: -10,
        left: -60,
        right: -30,
    };

    // Image paths for different animations of the Endboss.
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    /**
     * Constructs an Endboss object by loading the walking, hurt, and dead images.
     * Sets the starting position of the Endboss and initiates movement.
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2800;
        this.animate();
        this.moveLeft();
    }

    /**
     * Moves the Endboss to the left by reducing its x-coordinate.
     */
    moveLeft() {
        this.x -= this.speed + 10;
    }

    /**
     * Checks if the Endboss is dead based on its energy level.
     * @returns {boolean} True if the Endboss's energy is zero or less, otherwise false.
     */
    isDead() {
        return this.energy <= 0;
    }

    /**
     * Animates the Endboss, switching between walking, hurt, and dead animations.
     * Handles movement and animation updates at intervals.
     */
    animate() {
        setInterval(() => {
            if (this.isDead() && !this.isDeadAnimationPlaying) {
                this.isDeadAnimationPlaying = true;
                this.playDeadAnimation();
            } else if (!this.isDead() && !this.isDeadAnimationPlaying) {
                if (this.isHurt()) {
                    this.playAnimation(this.IMAGES_HURT);
                } else {
                    this.moveLeft();
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 250);
    }

    /**
     * Plays the death animation for the Endboss and resets the animation state afterwards.
     */
    playDeadAnimation() {
        this.playAnimation(this.IMAGES_DEAD);

        setTimeout(() => {
            this.isDeadAnimationPlaying = false;
        }, this.getDeadAnimationDuration());
    }

    /**
     * Calculates the total duration of the death animation based on the number of frames.
     * @returns {number} The duration of the death animation in milliseconds.
     */
    getDeadAnimationDuration() {
        return this.IMAGES_DEAD.length * 750;
    }

    /**
     * Checks if the Endboss is colliding with another object (e.g., the player character).
     * Adjusts the collision area using the hitbox offset for more precise detection.
     * 
     * @param {MovableObject} mo - The object to check for a collision with.
     * @returns {boolean} True if a collision is detected, otherwise false.
     */
    isColliding(mo) {
        const endbossHitbox = {
            x: this.x + this.offset.left,
            y: this.y + this.offset.top,
            width: this.width - this.offset.left - this.offset.right,
            height: this.height - this.offset.top - this.offset.bottom
        };

        return endbossHitbox.x + endbossHitbox.width > mo.x &&
               endbossHitbox.y + endbossHitbox.height > mo.y &&
               endbossHitbox.x < mo.x + mo.width &&
               endbossHitbox.y < mo.y + mo.height;
    }
}
