/**
 * The MovableObject class extends Drawableobject and adds properties and methods 
 * to control movement, gravity, and collision handling. It is designed for objects 
 * that can move, such as characters, enemies, or throwable objects.
 */
class MovableObject extends Drawableobject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    isInvincible = false;
    invincibilityDuration = 800;

    /**
     * Applies gravity to the object, making it fall down or move up when jumping.
     * Updates the vertical position based on speedY and acceleration.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 40);
    }

    /**
     * Checks if the object is above the ground level.
     * @returns {boolean} True if the object is above the ground, otherwise false.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 140;
        }
    }

    /**
     * Checks if this object is colliding with another enemy object.
     * @param {Object} enemy - The enemy object to check collision with.
     * @returns {boolean} True if the objects are colliding, otherwise false.
     */
    isColliding(enemy) {
        if (enemy.noDmg) return false;
        if (this.isInvincible) return false;
        return (
            this.x + this.width > enemy.x &&
            this.x < enemy.x + enemy.width &&
            this.y + this.height > enemy.y &&
            this.y < enemy.y + enemy.height
        );
    }

    /**
     * Decreases the object's energy when hit and triggers invincibility.
     */
    hit() {
        if (!this.isInvincible) {
            this.energy -= 10;
            if (this.energy < 0) {
                this.energy = 0;
            } else {
                this.lastHit = new Date().getTime();
                this.isInvincible = true;
                this.startInvincibility();
            }
        }
    }

    /**
     * Starts the invincibility timer, preventing the object from taking damage.
     */
    startInvincibility() {
        setTimeout(() => {
            this.isInvincible = false;
        }, this.invincibilityDuration);
    }

    /**
     * Checks if the object is hurt (has been hit within the last second).
     * @returns {boolean} True if the object was hit recently, otherwise false.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        return timePassed < 1000;
    }

    /**
     * Checks if the object is dead (energy is 0).
     * @returns {boolean} True if the object is dead, otherwise false.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Plays an animation by cycling through an array of images.
     * @param {Array<string>} images - The array of image paths for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];

        if (this.img) {
            this.currentImage++;
        } else {
            console.error('Bild konnte nicht geladen werden:', path);
        }
    }

    /**
     * Moves the object to the right by increasing its x position.
     */
    moveRight() {
        this.x += this.speed + 18;
    }

    /**
     * Moves the object to the left by decreasing its x position.
     */
    moveLeft() {
        this.x -= this.speed + 18;
    }

    /**
     * Causes the object to bounce off an enemy, simulating a jump.
     */
    bounceOffEnemy() {
        if (!this.isBouncing) {
            this.isBouncing = true;
            this.speedY = 10;
            this.applyBounceGravity();
        }
    }

    /**
     * Applies gravity to the object when it bounces off an enemy.
     */
    applyBounceGravity() {
        const gravityInterval = setInterval(() => {
            this.y -= this.speedY;
            this.speedY -= 1;

            if (this.y >= this.groundLevel) {
                this.y = this.groundLevel;
                this.speedY = 0;
                this.isBouncing = false;
                clearInterval(gravityInterval);
            }
        }, 1000 / 60);
    }
}
