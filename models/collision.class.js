/**
 * Handles all collision detection and response logic for the game.
 * This class manages interactions between the character, enemies, bottles, and other game objects.
 */
class CollisionHandler {

    /**
     * Constructs a CollisionHandler instance associated with the given game world.
     * 
     * @param {World} world - The game world containing all relevant objects for collision detection.
     */
    constructor(world) {
        this.world = world;
    }

    /**
     * Handles all collision checks in the game, including enemy collisions, throwable object collisions,
     * bottle collisions, and coin collisions.
     */
    handleCollisions() {
        this.checkEnemyCollisions();
        this.checkThrowableObjectCollisions();
        this.checkBottleCollisions();
        this.checkCoinCollisions();
    }

    /**
     * Checks for collisions between the character and enemies in the game world.
     * Handles specific logic for chickens, end bosses, and generic enemies.
     */
    checkEnemyCollisions() {
        this.world.level.enemies.forEach((enemy, index) => {
            if (enemy instanceof Chicken && this.checkChickenCollision(enemy, index)) return;
            if (enemy instanceof Endboss && this.checkEndbossCollision(enemy)) return;
            this.checkGenericEnemyCollision(enemy);
        });
    }

    /**
     * Checks for collisions between the character and a chicken enemy.
     * If a collision occurs and the character is above the chicken, the chicken dies; otherwise, the character is hit.
     * 
     * @param {Chicken} enemy - The chicken enemy object.
     * @param {number} index - The index of the chicken enemy in the enemy array.
     * @returns {boolean} - True if a collision was handled, false otherwise.
     */
    checkChickenCollision(enemy, index) {
        if (!enemy.noDmg && this.world.character.isColliding(enemy)) {
            if (this.world.character.isAboveGround() && this.world.character.speedY < 0) {
                this.handleChickenDeath(enemy, index);
                return true;
            } else {
                this.handleCharacterHit();
            }
        }
        return false;
    }

    /**
 * Checks for collisions between the character and the end boss.
 * If a collision occurs, the character is hit and blocked from moving past the boss.
 * 
 * @param {Endboss} enemy - The end boss object.
 * @returns {boolean} - True if a collision was handled, false otherwise.
 */
    checkEndbossCollision(enemy) {
        if (this.world.character.isColliding(enemy)) {
            this.handleCharacterHit();

            // Block the character from moving past the boss
            if (this.world.character.x + this.world.character.width > enemy.x) {
                this.world.character.x = enemy.x - this.world.character.width;
            }

            return true;
        }
        return false;
    }


    /**
     * Checks for collisions between the character and any generic enemy (excluding bottles and coins).
     * If a collision occurs, the character is hit.
     * 
     * @param {Object} enemy - The generic enemy object.
     */
    checkGenericEnemyCollision(enemy) {
        if (!(enemy instanceof Bottle) && !(enemy instanceof Coin) && this.world.character.isColliding(enemy)) {
            this.handleCharacterHit();
        }
    }

    /**
     * Handles the logic when a chicken dies after a collision with the character.
     * The character bounces off the chicken, and the chicken is removed after a delay.
     * 
     * @param {Chicken} enemy - The chicken enemy object.
     * @param {number} index - The index of the chicken in the enemy array.
     */
    handleChickenDeath(enemy, index) {
        enemy.die();
        this.world.character.bounceOffEnemy();
        setTimeout(() => {
            this.world.level.enemies.splice(index, 1);
        }, 1000);
    }

    /**
     * Handles the logic when the character is hit by an enemy.
     * Updates the character's energy and displays the game-over screen if the character dies.
     */
    handleCharacterHit() {
        this.world.character.hit();
        this.world.statusbar.setPercentage(this.world.character.energy);
        if (this.world.character.energy <= 0 && !this.world.characterDead) {
            this.world.characterDead = true;
            this.world.showGameOverScreen();
        }
    }

    /**
     * Checks for collisions between the character and coins in the game world.
     * Increases the character's coin bar percentage and removes the coin if collected.
     */
    checkCoinCollisions() {
        this.world.level.enemies.forEach((enemy, index) => {
            if (enemy instanceof Coin && this.world.character.isColliding(enemy)) {
                this.world.coinbar.increasePercentage(20);
                this.world.level.enemies.splice(index, 1);
            }
        });
    }

    /**
     * Checks for collisions between throwable objects (e.g., bottles) and enemies.
     * Handles specific logic for when a bottle hits a chicken or the end boss.
     */
    checkThrowableObjectCollisions() {
        this.world.throwableObjects.forEach((bottle, bottleIndex) => {
            this.world.level.enemies.forEach((enemy, enemyIndex) => {
                if (bottle.isColliding(enemy) && !bottle.isCollided) {
                    this.handleThrowableCollision(bottle, bottleIndex, enemy, enemyIndex);
                }
            });
        });
    }

    /**
     * Handles the logic when a throwable object (e.g., bottle) collides with an enemy.
     * Plays the hit sound and handles specific behavior for chickens and the end boss.
     * 
     * @param {ThrowableObject} bottle - The bottle object.
     * @param {number} bottleIndex - The index of the bottle in the throwable objects array.
     * @param {Object} enemy - The enemy object hit by the bottle.
     * @param {number} enemyIndex - The index of the enemy in the enemies array.
     */
    handleThrowableCollision(bottle, bottleIndex, enemy, enemyIndex) {
        bottle.isCollided = true;
        audioManager.playHitSound();
        if (enemy instanceof Chicken) {
            this.handleChickenDeath(enemy, enemyIndex);
        } else if (enemy instanceof Endboss) {
            this.handleEndbossHit(bottle, bottleIndex, enemy);
        }
    }

    /**
     * Handles the logic when the end boss is hit by a throwable object.
     * Reduces the end boss's energy and plays the bottle splash animation.
     * Displays the win screen if the end boss is defeated.
     * 
     * @param {ThrowableObject} bottle - The bottle object that hit the end boss.
     * @param {number} bottleIndex - The index of the bottle in the throwable objects array.
     * @param {Endboss} enemy - The end boss object hit by the bottle.
     */
    handleEndbossHit(bottle, bottleIndex, enemy) {
        enemy.energy -= 20;
        this.world.statusbarendboss.setPercentage(enemy.energy);
        enemy.lastHit = new Date().getTime();
        bottle.playAnimation(bottle.IMAGES_SPLASH);
        setTimeout(() => {
            this.world.throwableObjects.splice(bottleIndex, 1);
        }, 500);

        if (enemy.energy <= 0) {
            this.world.bossDefeated = true;
            enemy.playDeadAnimation();
            setTimeout(() => {
                this.world.showWinScreen();
            }, enemy.getDeadAnimationDuration());
        }
    }

    /**
     * Checks for collisions between the character and bottles in the game world.
     * Increases the character's bottle bar percentage and removes the bottle if collected.
     */
    checkBottleCollisions() {
        this.world.level.enemies.forEach((enemy, index) => {
            if (enemy instanceof Bottle && this.world.character.isColliding(enemy)) {
                if (this.world.bottlebar.percentage < 100) {
                    this.world.bottlebar.increasePercentage(20);
                    this.world.level.enemies.splice(index, 1);
                }
            }
        });
    }
}