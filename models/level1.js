/**
 * Initializes the level1 object by setting up enemies, clouds, and background objects.
 * This function creates the first level of the game and defines its elements.
 */
function initLevel() {
    const numberOfClouds = 10;
    const cloudSpacing = 800;

    /** 
     * Array to store Cloud objects for the level's background.
     * @type {Array<Cloud>}
     */
    const clouds = [];
    
    // Create and position clouds with equal spacing
    for (let i = 0; i < numberOfClouds; i++) {
        const xPosition = i * cloudSpacing;
        clouds.push(new Cloud(xPosition));
    }

    /**
     * Initializes level1 with the enemies, clouds, and background objects.
     * The level contains chickens, an endboss, bottles, coins, and background layers.
     */
    level1 = new Level(
        [
            new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(),
            new Endboss(),
            new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle(),
            new Coin(), new Coin(), new Coin(), new Coin(), new Coin()
        ],
        clouds,
        [
            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/air.png', 1085),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 1085),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 1085),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 1085),
            new BackgroundObject('img/5_background/layers/air.png', 1085 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 1085 * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 1085 * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 1085 * 2)
        ]
    );
}
