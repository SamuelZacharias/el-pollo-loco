/**
 * The Level class represents the structure and elements of a game level.
 * It contains enemies, clouds, and background objects, as well as the defined end point of the level.
 */
class Level {
    /** 
     * Array of enemy objects that exist in the level.
     * @type {Array<MovableObject>}
     */
    enemies;

    /**
     * Array of cloud objects that appear in the level's background.
     * @type {Array<Cloud>}
     */
    clouds;

    /**
     * Array of background objects that decorate the level.
     * @type {Array<BackgroundObject>}
     */
    backgroundObjects;

    /**
     * The x-coordinate that marks the end of the level.
     * The character needs to reach this point to finish the level.
     * @type {number}
     * @default 2355
     */
    level_end_x = 2355;

    /**
     * Creates an instance of the Level class.
     * 
     * @param {Array<MovableObject>} enemies - The enemies that will be present in the level.
     * @param {Array<Cloud>} clouds - The clouds that will be shown in the background.
     * @param {Array<BackgroundObject>} backgroundObjects - The background objects that add visual depth to the level.
     */
    constructor(enemies, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}
