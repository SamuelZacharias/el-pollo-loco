/**
 * Represents the main character in the game, including all actions, animations, and interactions.
 * Extends the MovableObject class to include movement, jumping, animations, and collision handling.
 */
class Character extends MovableObject {
    
    /**
     * Array of image paths representing the walking animation frames.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    /**
     * Array of image paths representing the jumping animation frames.
     * @type {string[]}
     */
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    /**
     * Array of image paths representing the dead animation frames.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    /**
     * Array of image paths representing the hurt animation frames.
     * @type {string[]}
     */
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    /**
     * Array of image paths representing the idle animation frames.
     * @type {string[]}
     */
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    /**
     * Array of image paths representing the long idle animation frames.
     * @type {string[]}
     */
    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    /**
     * The character's height.
     * @type {number}
     */
    height = 300;

    /**
     * The character's width.
     * @type {number}
     */
    width = 150;

    /**
     * A reference to the game world the character is in.
     * @type {World}
     */
    world;

    /**
     * Tracks the current image in the animation sequence.
     * @type {number}
     */
    currentImage = 0;

    /**
     * The time the character has been idle.
     * @type {number}
     */
    idleStartTime = null;

    /**
     * The amount of time (in milliseconds) the character must be idle before showing the regular idle animation.
     * @type {number}
     */
    idleThreshold = 3000;

    /**
     * The amount of time (in milliseconds) the character must be idle before showing the long idle animation.
     * @type {number}
     */
    longIdleThreshold = 7000;

    /**
     * Whether the character is currently bouncing after jumping on an enemy.
     * @type {boolean}
     */
    isBouncing = false;

    /**
     * The ground level the character is standing on.
     * @type {number}
     */
    groundLevel = 150;

    /**
     * The vertical speed of the character during jumping.
     * @type {number}
     */
    speedY = 0;

    /**
     * Constructs the character object and initializes its images, animations, and gravity.
     */
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.keyboard = keyboard;
        this.y = this.groundLevel;
        this.walking_sound = audioManager.sounds.walking;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity();
        this.animate();
    }

    /**
     * Animates the character by updating its movement, animations, and camera position in regular intervals.
     */
    animate() {
        setInterval(() => {
            this.walking_sound.pause();
            this.handleMovement();
            this.handleCamera();
        }, 125);

        setInterval(() => {
            this.handleAnimations();
        }, 125);
    }

    /**
     * Handles the character's movement based on keyboard inputs for walking, jumping, and idle behavior.
     */
    handleMovement() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            this.playWalkingSound();
            this.resetIdleTimer();
        } else if (this.world.keyboard.LEFT && this.x > 107) {
            this.moveLeft();
            this.otherDirection = true;
            this.playWalkingSound();
            this.resetIdleTimer();
        } else if (!this.isAboveGround()) {
            this.handleIdleAnimation();
        }
        if (this.world.keyboard.UP && !this.isAboveGround()) {
            this.jump();
            this.resetIdleTimer();
        }
    }

    /**
     * Updates the camera position based on the character's current x-coordinate.
     */
    handleCamera() {
        this.world.camera_x = -this.x + 100;
    }

    /**
     * Handles the character's animations for walking, jumping, being hurt, or being idle.
     */
    handleAnimations() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
        } else {
            this.handleIdleAnimation();
        }
    }

    /**
     * Plays the walking sound effect when the character is on the ground.
     */
    playWalkingSound() {
        if (this.y >= 149) {
            this.walking_sound.play();
        }
    }

    /**
     * Handles the idle animation, switching between regular idle and long idle animations based on idle time.
     */
    handleIdleAnimation() {
        const now = new Date().getTime();

        if (!this.idleStartTime) {
            this.idleStartTime = now;
        }

        const elapsed = now - this.idleStartTime;

        if (elapsed >= this.longIdleThreshold) {
            this.playAnimation(this.IMAGES_LONG_IDLE);
        } else if (elapsed >= this.idleThreshold) {
            this.playAnimation(this.IMAGES_IDLE);
        } else {
            this.img = this.imageCache['img/2_character_pepe/1_idle/idle/I-1.png'];
        }
    }

    /**
     * Resets the idle timer when the character becomes active again.
     */
    resetIdleTimer() {
        this.idleStartTime = null;
    }

    /**
     * Makes the character jump by adjusting its vertical speed.
     */
    jump() {
        this.speedY = 30;
    }
}
