/**
 * The World class represents the game world where the character, enemies, and background objects exist.
 * It handles the main game loop, drawing objects to the canvas, managing collisions, and other gameplay logic.
 */
class World {
    character = new Character();
    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    statusbar = new Statusbar();
    coinbar = new Coinbar();
    bottlebar = new Bottlebar();
    statusbarendboss = new Statusbarendboss();
    throwableObjects = [];
    bottle = new Bottle();
    coin = new Coin();
    bottlesSpawned = false;
    bossDefeated = false;
    characterDead = false;
    collisionHandler;
    isGameOver = false;

    /**
     * Constructor for the World class.
     * Initializes the game world and sets up the canvas, keyboard, and collision handler.
     * 
     * @param {HTMLCanvasElement} canvas - The canvas element for rendering the game.
     * @param {Keyboard} keyboard - The keyboard input handler.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.collisionHandler = new CollisionHandler(this);
        this.setWorld();
        this.run();
    }

    /**
     * Links the world instance to the character.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Starts the game loop, checks for collisions, throwable objects, and renders the world.
     */
    run() {
        const gameLoop = () => {
            this.collisionHandler.handleCollisions();
            this.checkThrowObjects();
            this.draw();

            if (!this.isGameOver) {
                requestAnimationFrame(gameLoop);
            }
        };
        gameLoop();
    }

    /**
     * Resets the enemies, bottles, and coins in the current level.
     */
    resetLevelObjects() {
        this.level.enemies = [];
        this.level.bottles = [];
        this.level.coins = [];
    }

    /**
     * Checks if the player can throw a bottle and creates a new throwable object if possible.
     */
    checkThrowObjects() {
        const swordButtonPressed = document.getElementById('sword-btn')?.classList.contains('active');

        if ((this.keyboard.Q || swordButtonPressed) && ThrowableObject.canThrow() && this.bottlebar.percentage > 0) {
            let direction = this.character.otherDirection ? -1 : 1;
            let bottle = new ThrowableObject(this.character.x, this.character.y, direction);
            this.throwableObjects.push(bottle);
            this.bottlebar.decreasePercentage(20);

            ThrowableObject.startCooldown();
        }
    }

    /**
     * Draws all game elements (character, enemies, objects) on the canvas.
     * This method clears the canvas, sets the camera position, and renders each object.
     */
    draw() {
        if (this.isGameOver) {
            return;
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0);
        this.checkExistenceEndboss();
        this.addToMap(this.statusbar);
        this.addToMap(this.coinbar);
        this.addToMap(this.bottlebar);
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.restore();
        if (this.bossDefeated || this.characterDead) {
            return;
        }
    }

    /**
     * Checks whether the end boss exists and adds bottles if the player is close to the boss.
     */
    checkExistenceEndboss() {
        let endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
        if (endboss && endboss.energy > 0 && this.character.x >= 608) {
            this.addToMap(this.statusbarendboss);
        }
        if (this.character.x >= 808 && !this.bottlesSpawned) {
            this.spawnNewBottles(5);
            this.bottlesSpawned = true;
        }
    }

    /**
     * Spawns a given number of new bottles in the game.
     * 
     * @param {number} count - The number of bottles to spawn.
     */
    spawnNewBottles(count) {
        for (let i = 0; i < count; i++) {
            let newBottle = new Bottle();
            newBottle.x = 100 + Math.random() * 650;
            this.level.enemies.push(newBottle);
        }
    }

    /**
     * Displays the victory screen when the game is won.
     */
    showWinScreen() {
        this.isGameOver = true;
        let img = new Image();
        img.src = 'img/9_intro_outro_screens/win/win_2.png';
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            document.getElementById('end-game-buttons').style.display = 'block';
        };
    }

    /**
     * Displays the game over screen when the character dies.
     */
    showGameOverScreen() {
        this.isGameOver = true;
        let img = new Image();
        img.src = 'img/9_intro_outro_screens/game_over/game over.png';
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            document.getElementById('end-game-buttons').style.display = 'block';
        };
    }

    /**
     * Adds an array of game objects to the map.
     * 
     * @param {Array} objects - Array of game objects to add.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => this.addToMap(o));
    }

    /**
     * Draws a single movable object to the map, with support for flipping the object.
     * 
     * @param {MovableObject} mo - The object to draw on the map.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips the image horizontally by modifying the canvas context.
     * 
     * @param {MovableObject} mo - The object to flip horizontally.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the flipped image back to its original position.
     * 
     * @param {MovableObject} mo - The object to restore after flipping.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}
