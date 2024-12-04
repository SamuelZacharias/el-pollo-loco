/**
 * Represents a chicken enemy in the game. Chickens move left across the screen, can die,
 * and play a sound when they are close to the player.
 * Extends the MovableObject class to include movement and animation.
 */
class Chicken extends MovableObject {
    
    /**
     * The chicken's energy level, used to determine if it's alive or dead.
     * @type {number}
     */
    energy = 1;

    /**
     * Indicates if the chicken sound is currently playing.
     * @type {boolean}
     */
    playSound = false;

    /**
     * Determines if the chicken can take damage (used when it is dead).
     * @type {boolean}
     */
    noDmg = false;

    /**
     * Array of image paths representing the walking animation frames.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    /**
     * Array of image paths representing the dead animation frame.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    /**
     * Constructs the chicken object, initializes its images, position, and speed,
     * and starts the animation and movement.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.chicken_sound = audioManager.sounds.chicken;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 700 + Math.random() * 5000;
        this.y = 360;
        this.width = 60;
        this.height = 80;
        this.speed = 0.15 + Math.random() / 12;
        this.chicken_sound.volume = 0.1;
        this.animate();
    }

    /**
     * Starts the animation and movement of the chicken.
     * It updates the walking or dead animation and plays the chicken sound when near the player.
     */
    animate() {
        this.chicken_sound.pause();
        this.moveChicken();

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                this.chicken_sound.pause();
            } else {
                this.playAnimation(this.IMAGES_WALKING);
                this.playChickenSound();
            }
        }, 200);
    }

    /**
     * Moves the chicken to the left while it is alive.
     */
    moveChicken() {
        this.moveLeftInterval = setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 7);
    }

    /**
     * Determines if the chicken is dead.
     * @returns {boolean} True if the chicken's energy is 0, otherwise false.
     */
    isDead() {
        return this.energy <= 0;
    }

    /**
     * Kills the chicken, stops its movement, and prevents it from taking further damage.
     */
    die() {
        this.energy = 0;
        this.noDmg = true;
        clearInterval(this.moveLeftInterval);
    }

    /**
     * Plays the chicken sound when the chicken is within a certain distance of the player.
     * The sound stops when the chicken is further away.
     */
    playChickenSound() {
        if (this.x < 700 && this.x > 0) {
            if (!this.playSound) {
                this.playSound = true;
                this.chicken_sound.currentTime = 0;
                this.chicken_sound.play();
            }
        } else {
            if (this.playSound) {
                this.playSound = false;
                this.chicken_sound.pause();
            }
        }
    }
}
