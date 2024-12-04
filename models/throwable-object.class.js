/**
 * The ThrowableObject class represents a throwable item, such as a salsa bottle, in the game.
 * This class extends the MovableObject class and includes logic for throwing and animating
 * the object as well as handling collision states.
 */
class ThrowableObject extends MovableObject {
    
    /**
     * Array of image paths for the rotating bottle animation.
     * @type {string[]}
     */
    IMAGES_ROTATING = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    /**
     * Array of image paths for the splash animation when the bottle hits something.
     * @type {string[]}
     */
    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    /**
     * Static property representing whether the object is in cooldown, preventing further throws.
     * @type {boolean}
     */
    static cooldown = false;

    /**
     * Static property defining the cooldown duration (in milliseconds) between throws.
     * @type {number}
     */
    static cooldownDuration = 800;

    /**
     * The direction in which the object is thrown (1 for right, -1 for left).
     * @type {number}
     */
    direction = 1;

    /**
     * Constructor for the ThrowableObject class.
     * Initializes the object with a position, direction, and sets up the image and animation.
     * 
     * @param {number} x - The starting x-coordinate of the object.
     * @param {number} y - The starting y-coordinate of the object.
     * @param {number} direction - The direction in which the object is thrown (1 for right, -1 for left).
     */
    constructor(x, y, direction) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_ROTATING);
        this.loadImages(this.IMAGES_SPLASH);
        
        this.direction = direction;
        if (this.direction === 1) {
            this.x = x + 65;  // Adjust starting position when throwing right
        } else {
            this.x = x - 60;  // Adjust starting position when throwing left
        }
        this.y = y;
        this.height = 70;
        this.width = 50;
        this.throw();
        this.isCollided = false;
    }

    /**
     * Initiates the throw action for the object, applying gravity and moving it in the defined direction.
     * The object will continue to animate as it travels.
     */
    throw() {
        this.speedY = 30;
        this.applyGravity();
        this.rotationInterval = setInterval(() => {
            this.animate();
            this.x += this.direction * 10;
        }, 25);
    }

    /**
     * Checks if the object can be thrown by verifying the cooldown state.
     * 
     * @returns {boolean} True if the object can be thrown, false if it's still in cooldown.
     */
    static canThrow() {
        return !ThrowableObject.cooldown;
    }

    /**
     * Starts the cooldown timer to prevent immediate subsequent throws.
     */
    static startCooldown() {
        ThrowableObject.cooldown = true;
        setTimeout(() => {
            ThrowableObject.cooldown = false;
        }, ThrowableObject.cooldownDuration);
    }

    /**
     * Animates the throwable object as it rotates. Stops animating if the object has collided with something.
     */
    animate() {
        if (!this.isCollided) {
            this.playAnimation(this.IMAGES_ROTATING);
        }
    }
}
